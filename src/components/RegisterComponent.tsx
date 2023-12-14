"use client"
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import profileValidation from '@/utils/profileValidations';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/redux/services/userApi';
import { NewProfile } from '@/interfaces/NewProfile';
import { ApiError } from '@/interfaces/ApiError';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react'


export default function RegisterComponent() {

  const [newProfile, setNewProfile] = useState<NewProfile>({
    name: "",
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState<NewProfile>({
    name: "",
    email: "",
    password: ""
  });

  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [createUserMutation, { error, data: register }] = useCreateUserMutation();
  const router = useRouter();
  const inputs: (keyof NewProfile)[] = Object.keys(newProfile) as (keyof NewProfile)[];
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    if (error) {
      const apiError = error as ApiError;
      if (apiError.data) {
        setErrors(apiError.data);
      }
    }
  },[error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [event.target.name]: event.target.value,
    }));
  
    setValidationErrors((prevProfile) => profileValidation({
      ...prevProfile,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedRole(value || "user");
  };

  const areAllFieldsCompleted = () => {
    const fields = Object.values(newProfile);
    return fields.every((field) => field !== "" && field !== null);
  };

  useEffect(() => {
      setAllFieldsCompleted(areAllFieldsCompleted());
  }, [newProfile]);

  const handleSubmit = async () => {
  
      const postProfile = {
        email: newProfile.email,
        password: newProfile.password,
        name: newProfile.name,
        role: selectedRole,
      }
    
    await createUserMutation(postProfile);   
    
  };

  useEffect(()=>{
    if(register && errors.length === 0) {
      router.push('/login')
    }
  },[register])

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-15rem)] mt-10 grid place-content-center gap-5">
      <Card color="white" shadow={false} className='flex flex-col items-center p-5 py-10 shadow-2xl' placeholder="">
        <Typography variant="h4" className='text-[#201e72] text-4xl' placeholder="">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal" placeholder="">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            {inputs.map((input, index) => (
              <div key={index}>
                <Input
                  key={index}
                  type={input.includes('password') ? 'password' : 'text'}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  value={newProfile[input]}
                  name={input}
                  label={`${input.includes('password') ? 'password' : input}`}
                  error={!!validationErrors[input]}
                  size="lg"
                  placeholder=""
                  crossOrigin=""
                  className="p-2 bg-gray-200"
                />
                {validationErrors[input] ? <p className='text-xs text-red-900'>{validationErrors[input]}</p> : null}
              </div>
            ))}
          </div>
          <div className="w-full">
            <select
              name="role"
              onChange={(event) => handleRoleChange(event)}
              className="w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button
            className="mt-6 p-2 rounded-md bg-[#160961] hover:shadow-m shadow-none"
            fullWidth
            onClick={handleSubmit}
            disabled={!allFieldsCompleted || Object.values(validationErrors).some(error => error !== "")}
            placeholder=""
          >
            Register
          </Button>
        </form>
        {errors && <span>{errors}</span>}
        <Typography color="gray" className="mt-1 font-normal" placeholder="">
          Already registered? <button className="text-blue-900" onClick={(()=> router.push("/login"))}>Sign in</button>
        </Typography>
      </Card>
    </div>
  );
}
