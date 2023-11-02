import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export default function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return "Logging out...";
}