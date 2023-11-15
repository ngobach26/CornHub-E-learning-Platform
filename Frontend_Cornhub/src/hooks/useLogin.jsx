import userService from "../services/userAPI";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    const response = await userService.login(email, password);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch({ type: "LOGIN", payload: response });
  };

  return login;
};