import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import Button from "../../components/Button";

import { Checkbox, FormControlLabel, TextField, Snackbar, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WarningIcon from "@mui/icons-material/Warning";

function Copyright(props) {
  return (
    <p className="text-sm text-center text-gray-500" {...props}>
      {"Copyright © "}
      <a href="#" className="text-blue-500">
        CornHub
      </a>{" "}
      {new Date().getFullYear()} {"."}
    </p>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log("err", err);
      setErrorAlert(true);
    }
  };

  const handleAlertClose = () => {
    setErrorAlert(false);
  };

  return (
    <div className="flex flex-col h-screen px-6 py-6 md:flex-row">
      <div
        className="flex flex-1 px-10 bg-center bg-cover md:bg-contain "
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-vector/boy-studying-with-computer-and-books-vector-illustration-concept-in-cartoon-style_113065-1082.jpg)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="flex flex-1 items-center justify-center rounded-[15px] shadow-[rgba(0,_0,_0,_0.3)_0px_20px_60px]">
        <div className="w-4/5 max-w-md">
          <div className="text-center">
            <div className="p-3 mx-auto rounded-full bg-secondary-main">
              <LockOutlinedIcon />
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Log in</h1>
          </div>
          <Snackbar
            open={errorAlert}
            autoHideDuration={5000}
            onClose={handleAlertClose}
            message={
              <div className="flex items-center">
                <WarningIcon color="error" style={{ marginRight: "8px" }} />
                <span>
                  There was a problem logging in. Please check your email and
                  password or create an account
                </span>
              </div>
            }
          />
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <div className="flex items-end justify-end flex-1">
                <Link
                  to="/notfound"
                  className="text-base font-semibold text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button label="Sign In" type="submit" className="mt-5" />
            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-base font-semibold text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </form>
          <Copyright className="mt-5" />
        </div>
      </div>
    </div>
  );
}