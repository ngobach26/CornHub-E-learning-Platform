import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Snackbar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../../Button";
import { languages } from "../../../fakedata/languages";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../services/instructorAPI";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [courseDetail, setCourseDetails] = useState({
    courseTitle: "",
    description: "",
    language: "English",
    level: "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const getCourse = await api.getCourseById(user.token, id);
        setCourseDetails({
          courseTitle: getCourse.courseTitle || "",
          description: getCourse.description || "",
          language: getCourse.language || "English",
          level: getCourse.level || "",
          category: getCourse.category || "",
          subcategory: getCourse.subcategory || "",
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [id, user.token]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const updateCourseDetails = async () => {
    try {
      await api.updateCourse(
        user.token,
        id,
        courseDetail,
        courseDetail,
        courseDetail
      );
      setSnackbarMessage("Course details updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating course details:", error);
      setSnackbarMessage("Failed to update course details");
      setSnackbarOpen(true);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const renderForm = () => {
    return (
      <form className="flex flex-col gap-5">
        <div className="grid items-center grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            className="w-full"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            placeholder="Course Name"
            value={courseDetail.courseTitle}
            onChange={(e) => handleInputChange("courseTitle", e.target.value)}
            autoFocus
          />
        </div>
        <TextField
          className="w-full"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={courseDetail.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          autoFocus
          multiline
          rows={4}
        />
        <div>
          <h3 className="mb-1 font-semibold">Basic information</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FormControl margin="normal">
              <InputLabel>Language</InputLabel>
              <Select
                className="text-left"
                value={courseDetail.language}
                label="Language"
                onChange={(e) => handleInputChange("language", e.target.value)}
              >
                {languages.map((language) => (
                  <MenuItem key={language.code} value={language.name}>
                    {language.nativeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal">
              <InputLabel>Level</InputLabel>
              <Select
                className="text-left"
                value={courseDetail.level}
                label="Level"
                onChange={(e) => handleInputChange("level", e.target.value)}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
                <MenuItem value="All Levels">All Levels</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={courseDetail.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              autoFocus
            />
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="subcategory"
              label="Subcategory"
              name="subcategory"
              value={courseDetail.subcategory}
              onChange={(e) => handleInputChange("subcategory", e.target.value)}
              autoFocus
            />
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
        <h1 className="text-2xl font-bold">Course Details</h1>
        <Button label="Save" type="submit" onClick={updateCourseDetails} />
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
}