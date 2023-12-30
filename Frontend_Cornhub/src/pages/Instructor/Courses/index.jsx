import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";

import { useAuthContext } from "../../../hooks/useAuthContext";
import CenterAligned from "../../../components/CenterAligned";
import Button from "../../../components/Button";
import CourseCard from "../../../components/CourseCard";

import api from "../../../services/instructorAPI";

export default function Courses() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseTitle, setcourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // const handleCreate = async () => {
  //   try {
  //     const data = {
  //       courseTitle,
  //       category,
  //     };
  //     const createdCourse = await api.createCourse(data);
  //     // localStorage.setItem("course", JSON.stringify(createdCourse));
  //     console.log("Course created successfully:", createdCourse);
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //   }
  // };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setError("");
    setcourseTitle("");
    setCategory("");
  };

  const handleCreateCourse = async () => {
    try {
      if (!courseTitle && !category) {
        setError("Please fill in the Title and Category.");
      } else if (!courseTitle) {
        setError("Please fill in the Title");
      } else if (courseTitle.length < 3 || courseTitle.length > 100) {
        setError("Title must be between 3 and 100 characters.");
      } else if (!category) {
        setError("Please fill in the Category.");
      } else {
        const newCourse = { courseTitle, category };
        setCourses((prevCourses) => [...prevCourses, newCourse]);
        const createdCourse = await api.createCourse(user.token, newCourse);
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleCourseClick = (course) => {
    navigate(`/instructor/courses/manage/?tab=d&id=${course.courseTitle}`);
  };

  const renderCourses = () => {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-10">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            handleClick={() => handleCourseClick(course)}
            hoverText="Manage course"
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-medium">Courses</h1>
        <div className="flex space-x-4">
          <Button
            label="Create"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          />
          <Button label="Remove" startIcon={<RemoveIcon />} />
        </div>
      </div>
      <Dialog fullWidth={true} open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <div className="flex flex-col text-2xl font-medium">
            Create a new course
          </div>
        </DialogTitle>
        <form>
          <DialogContent>
            <TextField
              label="Title"
              required
              fullWidth
              value={courseTitle}
              onChange={(e) => setcourseTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              margin="normal"
            />
            <DialogActions>
              <Button
                label="Cancel"
                variant="outlined"
                onClick={handleCloseDialog}
              />
              <Button label="Create" onClick={handleCreateCourse} />
            </DialogActions>
          </DialogContent>
        </form>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <div>{error}</div>
          </Alert>
        )}
      </Dialog>
      {renderCourses()}
    </>
  );
}
