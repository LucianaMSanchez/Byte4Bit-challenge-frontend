import { User } from "@/interfaces/User"

const profileValidation = (profile: User) => {
    const validateName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const validatePassword =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/
  
      interface UserErrors extends Record<keyof User, string> {
        incomplete?: boolean;
      }
      
      const errors: Partial<UserErrors> = {};
      
    if (profile.name && (profile.name.length < 3 || profile.name.length > 20)) {
      errors.name = '*The profile name must be bettwen 3 an 25 characters'
    } else if (profile.name && !validateName.test(profile.name)) {
      errors.name = '*The profile name must be valid'
    }
  
    if (profile.email && profile.email.length > 100) {
      errors.email = '*The email must be less than 100 characters'
    } else if (profile.email && !validateEmail.test(profile.email)) {
      errors.email = '*The email must be valid'
    }
  
    if (
      profile.password_1 &&
      (profile.password_1.length < 8 || profile.password_1.length > 30)
    ) {
      errors.password_1 = '*The password must be bettwen larger than 8 characters'
    } else if (profile.password_1 && !validatePassword.test(profile.password_1)) {
      errors.password_1 =
        '*The password must contain at least one uppercase letter, one special character or number, and should not contain spaces.'
    }
  
    if (profile.password_2 && profile.password_1 !== profile.password_2) {
      errors.password_2 = '*both passwords must be the same'
    }
  

    errors.incomplete =
    !profile.name ||
    !profile.email ||
    !profile.password_1 ||
    !profile.password_2;

  
    return errors 
  }
  
  export default profileValidation
  