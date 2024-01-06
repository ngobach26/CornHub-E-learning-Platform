import authService from "../services/authAPI";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    localStorage.setItem("user", JSON.stringify(response));
    dispatch({ type: "LOGIN", payload: response });
    if(response.isAdmin){
      navigate(to='/admin/home');
    }
  };

  return login;
};