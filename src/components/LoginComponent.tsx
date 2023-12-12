'use client'
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import {
  Card,
  Input,
  Button,
  Typography
} from '@material-tailwind/react'

export default function LoginComponent() {
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: ''
  } as { email: string; password: string });

  const [validationError, setValidationError] = useState<boolean>(false);
  const [incomplete, setIncomplete] = useState<boolean>(true);
  const [errors, setErrors] = useState("")
  const { data } = useSession();
  const router = useRouter();

  const inputs = Object.keys(logInInfo) as (keyof typeof logInInfo)[];

  useEffect(() => {
    if (data) {
      router.push('/');
    }
  }, [data, router]);

  const isValidate = (error: any) => {
    if (error === null) {
      setValidationError(false);
      router.push('/');
    } else {
      setLogInInfo({
        email: '',
        password: ''
      });
      setValidationError(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLogInInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));

    if (logInInfo.email.length > 0 || logInInfo.password.length > 7){
      setIncomplete(false)
    };
  };

  const handleSubmit = async () => {
    if (incomplete) {
      setErrors("Please complete your Sign in information");
    } else {
      try {
        const signInRes = await signIn('credentials', {
          email: logInInfo.email,
          password: logInInfo.password,
          redirect: false
        });

        if (!signInRes?.error ) {
          isValidate(null); 
        } else {
          isValidate(signInRes.error);
          console.log(signInRes.error)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-[calc(100vh-15rem)] mt-10 grid place-content-center gap-5">
      <Card color="white" shadow={true} className='flex flex-col items-center p-5 py-20 shadow-2xl' placeholder="">
        <Typography variant="h4" className='text-[#522797] text-4xl' placeholder="">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal" placeholder="">
          Enter your details to Log in.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6 p-2">
            {inputs.map((input, index) => (
              <Input
                key={index}
                type={input === 'password' ? 'password' : 'text'}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                value={logInInfo[input]}
                name={input}
                label={`${input.includes('password') ? 'password' : input}`}
                size='lg'
                placeholder=""
                crossOrigin=""
                className="p-2 bg-gray-200"
              />
            ))}
          </div>
          <p className='text-red-600'>
            {validationError ? 'Email or password incorrect' : null}
          </p>
          <Button
            className=" text-white mt-6 p-3 rounded-md bg-[#190858] hover:shadow-m shadow-none"
            fullWidth
            onClick={handleSubmit}
            disabled={incomplete}
            placeholder=""
          >
            Log In
          </Button>
        </form>
        {errors && <span>{errors}</span>}
      </Card>
    </div>
  );
}
