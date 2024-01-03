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
  });
  const [courseDetail, setCourseDetails] = useState({
    totalLengthSeconds: "",
    status: "",
  });
  
  const handleInputChange = (fieldName, value) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const handleSwitchChange = () => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      status: prevDetails.status === "updated" ? "waiting_ac" : "updated",
    }));
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const getCourse = await api.getCourseById(user.token, id);
        setCourseDetails({
          totalLengthSeconds: getCourse.totalLengthSeconds || "",
          status: getCourse.status || "",
        });
      } catch (error) {
        console.error("Error fetching course setting:", error);
      }
    };
    fetchCourseDetails();
  }, [id, user.token]);

  const updateCourseDetails = async () => {
    try {
      await api.updateCourse(
        user.token,
        id,
        courseDetail, {}, {}
      );
      setSnackbarMessage("Course details updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating course details:", error);
      setSnackbarMessage("Failed to update course details");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderForm = () => {
    return (
      <div>
        <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button label="Save" type="submit" onClick={updateCourseDetails} />
        </div>
        <div className="flex flex-col gap-8">
          {/* <div className="grid items-center md:grid-cols-2">
            <p className="mb-1 text-left text-gray-600 md:mb-0">Instructor</p>
            <TextField type="text" />
          </div> */}
          <div className="grid items-center md:grid-cols-2">
            <p className="mb-1 text-left text-gray-600 md:mb-0">
              Total course duration
            </p>
            <TextField
              type="number"
              value={courseDetail.totalLengthSeconds}
              onChange={(e) =>
                handleInputChange("totalLengthSeconds", e.target.value)
              }
            />
          </div>
          <div className="grid items-center md:grid-cols-2">
            <p className="mb-1 text-left text-gray-600 md:mb-0">
              Course status
            </p>
            <div className="flex items-center gap-1">
              <p>Unpublished</p>
              <Switch
                checked={courseDetail.status === "waiting_ac"}
                onChange={handleSwitchChange}
              />
              <p>Request Published</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
