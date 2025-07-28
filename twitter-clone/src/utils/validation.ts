import validator from "email-validator";

export const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";
  if (!validator.validate(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 256) return "Password must be less than 256 characters";
  return "";
};

export const validateName = (name: string): string => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length > 512) return "Name must be less than 512 characters";
  return "";
};

export const validateTweet = (text: string): string => {
  if (!text.trim()) return "Tweet cannot be empty";
  if (text.length > 140) return "Tweet must be less than 140 characters";
  return "";
};
