import authService from "../services/authAPI";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch({ type: "LOGIN", payload: response });
  };

  return login;
};