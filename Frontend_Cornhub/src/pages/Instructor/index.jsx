import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Instructor() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/instructor/courses");
  }, [navigate]);

  return null;
}