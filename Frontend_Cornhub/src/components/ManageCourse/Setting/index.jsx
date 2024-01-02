import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { TextField, Snackbar } from "@mui/material";
import Button from "../../Button";
import api from "../../../services/instructorAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";
const Setting = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [switchState, setSwitchState] = useState({
    status: "updated",
  })
  const [settingDetail, setSettingDetail] = useState({
    status: "updated",
    totalLengthSeconds: 0,
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const getCourse = await api.getCourseById(user.token, id);
        setSettingDetail({
          status: getCourse.status || "updated",
          totalLengthSeconds: getCourse.totalLengthSeconds || 0,
        });
      } catch (error) {
        console.error("Error fetching course setting:", error);
      }
    };
    fetchCourseDetails();
  }, [id, user.token]);

  const updateSettingDetail = async () => {
    try {
      const datum = { totalLengthSeconds: settingDetail.totalLengthSeconds, status: settingDetail.status }
      await api.updateCourse(
        user.token,
        id,
        datum,
        datum,
        datum
      );
      setSnackbarMessage("Course setting updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating setting details:", error);
      setSnackbarMessage("Failed to update course setting");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (fieldName, value) => {
    setSettingDetail((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const renderField = (label, Component) => {
    return (
      <div className="grid items-center md:grid-cols-2">
        <p className="mb-1 text-left text-gray-600 md:mb-0">{label}</p>
        {Component}
      </div>
    );
  };

  const handleSwitchChange = () => {
    setSettingDetail((prevDetails) => ({
      ...prevDetails,
      status: prevDetails.status === "updated" ? "waiting_ac" : "updated",
    }));
  };
  
  const renderForm = () => {
    return (
      <form className="flex flex-col gap-8">
        {renderField(
          "Instructor",
          <TextField
            type="text"
            // onChange={(e) =>
            //   handleInputChange("", e.target.value)
            // }
          />
        )}
        {renderField(
          "Total course duration",
          <TextField
            type="number"
            onChange={(e) =>
              handleInputChange("totalLengthSeconds", e.target.value)
            }
            value={settingDetail.totalLengthSeconds}
          />
        )}
        {renderField(
          "Course status",
          <div className="flex items-center gap-1">
            <p>Unpublished</p>
            <Switch
              checked={settingDetail.status === "waiting_ac"}
              onChange={handleSwitchChange}
              value={settingDetail.status ? "waiting_ac" : "updated"}
            />
            <p>Request Published</p>
          </div>
        )}
      </form>
    );
  };

  return (
    <>
      <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button label="Save" type="submit" onClick={updateSettingDetail} />
      </div>
      {renderForm()}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default Setting;