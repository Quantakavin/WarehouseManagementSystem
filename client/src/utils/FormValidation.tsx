export const EmailValidation = {
  required: "Email Address cannot be empty",
  pattern: { value: /^\S+@\S+\.\S+$/i, message: "Please enter a valid email" },
};
export const PasswordValidation = {
  required: "Password cannot be empty",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/i,
    message:
      "Password should be over 8 characters long with a mix of uppercase/lowercase letters and numbers",
  },
};
export const UsernameValidation = { required: "Username cannot be empty" };
export const NameValidation = { required: "Name cannot be empty" };
export const DescriptionValidation = {
  required: "Description cannot be empty",
};
export const PhoneNoValidation = {
  required: "Mobile no cannot be empty",
  pattern: {
    value: /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/i,
    message: "Please enter a valid mobile no",
  },
};
export const SelectValidation = {
  required: "Please select at least one option",
};
export const CompanyValidation = { required: "Company name cannot be empty" };
