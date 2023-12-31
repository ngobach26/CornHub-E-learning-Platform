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
    coverImage: "",
    demoVideo: ""
  });
  const [coverImage, setCoverImage] = useState();
  const baseURL = 'http://localhost:3000/uploads/'

  const categories = ["Information Technology", "Business", "Finance and accouting", "Editing and design", "Music", "Fitness", "Self development"]

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
          imageName: getCourse.coverImage || "",
          demoVideo: getCourse.demoVideo || ""
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
    const formData = new FormData();
    Object.keys(courseDetail).forEach((key) => {
      formData.append(key, courseDetail[key]);
    });
    formData.append("coverImage", coverImage);
    try {
      const getCourse = await api.updateWithImage(
        user.token,
        id,
        formData
      );
      console.log("New image: ", getCourse.coverImage);
      setCourseDetails({
        courseTitle: getCourse.courseTitle || "",
        description: getCourse.description || "",
        language: getCourse.language || "English",
        level: getCourse.level || "",
        category: getCourse.category || "",
        subcategory: getCourse.subcategory || "",
        imageName: getCourse.coverImage || ""
      });
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

  const handleImage = (e) => {
      const image = e.target.files[0];
      setCoverImage(image);
  }

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
        <h6 className="text-left">Cover image</h6>
        {courseDetail.imageName && <img style={{ width: 300, height: 300 }} src={baseURL+courseDetail.imageName}/>}
        <TextField
          type="file"
          className="w-full"
          margin="normal"
          fullWidth
          id="image"
          name="image"
          onChange={handleImage}
        />
        <TextField
            className="w-full"
            margin="normal"
            required
            fullWidth
            id="demoVideo"
            label="Demo Video Link"
            name="demoVideo"
            placeholder="www.youtube.vn"
            value={courseDetail.demoVideo}
            onChange={(e) => handleInputChange("demoVideo", e.target.value)}
            autoFocus
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
            <FormControl margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                className="text-left"
                value={courseDetail.category}
                label="Category"
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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