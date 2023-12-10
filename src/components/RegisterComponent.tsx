"use client"
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import profileValidation from '@/utils/profileValidations';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/redux/services/userApi';
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option
} from '@material-tailwind/react'

interface NewProfile {
  name: string;
  email: string;
  password: string
}

interface ValidationErrors extends Record<keyof NewProfile, string> {
  incomplete?: boolean;
}


export default function RegisterComponent() {
  const [newProfile, setNewProfile] = useState<NewProfile>({
    name: "",
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    password: ""
  });

  const [selectedRole, setSelectedRole] = useState<string>("user");
  const [createUserMutation, { isLoading, isError, data }] = useCreateUserMutation();
  const router = useRouter();

  const inputs: (keyof NewProfile)[] = Object.keys(newProfile) as (keyof NewProfile)[];

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

const handleRoleChange = (value: string | undefined) => {
  setSelectedRole(value || "user");
};

const handleSubmit = async () => {
  
  if (validationErrors.incomplete || Object.keys(validationErrors).length > 1) {
    alert('Incomplete fields or validation errors');
  } else {
    const postProfile = {
      email: newProfile.email,
      password: newProfile.password,
      name: newProfile.name,
      role: selectedRole,
    };
    
    await createUserMutation(postProfile);
    router.push('/login');
  }
};

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const incomplete = validationErrors.incomplete || Object.keys(validationErrors).length > 1;

  return (
    <div className="min-h-[calc(100vh-15rem)] mt-10 grid place-content-center gap-5">
      <Card color="white" shadow={false} className='flex flex-col items-center p-5 py-10 shadow-2xl' placeholder="">
        <Typography variant="h4" className='text-[#FAA917] text-4xl' placeholder="">
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
                  label={`${input.includes('password') ? 'password' : input}...`}
                  error={!!validationErrors[input]}
                  size="lg"
                  placeholder=""
                  crossOrigin=""
                />
                {validationErrors[input] ? <p className='text-xs text-red-900'>{validationErrors[input]}</p> : null}
              </div>
            ))}
          </div>
          <div className="w-72">
            <Select
              label="role"
              placeholder=""
              value={selectedRole}
              onChange={(value) => handleRoleChange(value)}
            >
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </div>
          <Button
            className="mt-6 bg-[#571B58] hover:shadow-m shadow-none"
            fullWidth
            onClick={handleSubmit}
            disabled={incomplete}
            placeholder=""
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
