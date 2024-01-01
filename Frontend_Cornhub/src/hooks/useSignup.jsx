import authService from "../services/authAPI";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    const response = await authService.signup(data);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch({ type: "LOGIN", payload: response });
  };

  return signup;
};