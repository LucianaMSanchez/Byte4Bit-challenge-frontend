import { User } from "@/interfaces/User"

const profileValidation = (profile: User) => {
  const validateName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validatePassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;

  interface UserErrors extends Record<keyof User, string> {
    incomplete?: boolean;
  }

  const errors: UserErrors = {
    name: "",
    email: "",
    password: "",
    role: ""
  };

  if (profile.name && (profile.name.length < 3 || profile.name.length > 20)) {
    errors.name = '*The profile name must be between 3 and 25 characters';
  } else if (profile.name && !validateName.test(profile.name)) {
    errors.name = '*The profile name must be valid';
  }

  if (profile.email && profile.email.length > 100) {
    errors.email = '*The email must be less than 100 characters';
  } else if (profile.email && !validateEmail.test(profile.email)) {
    errors.email = '*The email must be valid';
  }

  if (
    profile.password &&
    (profile.password.length < 8 || profile.password.length > 30)
  ) {
    errors.password = '*The password must be between 8 and 30 characters';
  } else if (profile.password && !validatePassword.test(profile.password)) {
    errors.password =
      '*The password must contain at least one uppercase letter, one special character or number, and should not contain spaces.';
  }

  errors.incomplete = !profile.name || !profile.email || !profile.password;

  return errors;
};

export default profileValidation