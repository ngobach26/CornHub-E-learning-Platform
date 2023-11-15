import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useSignup } from "../../hooks/useSignup";
import Button from "../../components/Button";

import {
  Checkbox,
  FormControlLabel,
  TextField,
  Snackbar,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WarningIcon from "@mui/icons-material/Warning";

function Copyright(props) {
  return (
    <p className="text-sm text-center text-gray-500" {...props}>
      {"Copyright © "}
      <a href="#" className="text-blue-500">
        CornHub
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

function newEmptyData() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
}

export default function Signup() {
  const [formData, setFormData] = useState(newEmptyData);
  const [errorAlert, setErrorAlert] = useState(null);
  const signup = useSignup();
  const navigate = useNavigate();

  const handleFormChange = (...args) => {
    let fieldName = null;
    let fieldValue = null;
    if (args.length === 1) {
      const e = args[0];
      fieldName = e.target.name;
      fieldValue = e.target.value;
    } else if (args.length > 1) {
      [fieldName, fieldValue] = args;
    }

    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/login");
    } catch (err) {
      console.log("err", err);
      setErrorAlert(err.response.data.error);
    }
  };

  const handleAlertClose = () => {
    setErrorAlert(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Avatar sx={{ bgcolor: "#0077FF" }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <h1 className="mt-4 text-2xl font-semibold">
            Sign up and start learning
          </h1>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!errorAlert}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          message={
            <div className="flex items-center">
              <WarningIcon color="error" style={{ marginRight: "8px" }} />
              <span>
                {errorAlert}
              </span>
            </div>
          }
        />
        <form className="mt-8 mb-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className=" md:col-span-1">
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="md:col-span-1">
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="md:col-span-2">
              <div className="mb-3">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className="mb-3">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="flex mt-4 mb-4">
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive special offers, personalized recommendations and
                learning tips via email."
            />
          </div>
          <Button label="Sign Up" type="submit" className="mt-5" />

          <div className="mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-base font-semibold text-blue-500">
              Sign in
            </Link>
          </div>
        </form>
        <Copyright className="mt-5" />
      </div>
    </div>
  );
}
