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
import RemoveIcon from '@mui/icons-material/Remove';

import CenterAligned from "../../../components/CenterAligned";
import InstructorPageLayout from "../../../components/InstructorPageLayout";
import Button from "../../../components/Button";
import CourseCard from "../../../components/CourseCard";

export default function Courses() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setError("");
    setTitle("");
    setCategory("");
  };

  const handleCreateCourse = () => {
    setLoading(true);

    setTimeout(() => {
      if (!title && !category) {
        setError("Please fill in the Title and Category.");
      } else if (!title) {
        setError("Please fill in the Title");
      } else if (title.length < 3 || title.length > 100) {
        setError("Title must be between 3 and 100 characters.");
      } else if (!category) {
        setError("Please fill in the Category.");
      } else {
        const newCourse = { title, category };
        setCourses((prevCourses) => [...prevCourses, newCourse]);
        handleCloseDialog();
      }
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleCourseClick = (course) => {
    navigate(`/instructor/courses/manage/?tab=d&id=${course.id}`);
  };

  const renderCourses = () => {
    return (
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-10'>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            handleClick={() => handleCourseClick(course)}
            hoverText='Manage course'
          />
        ))}
      </div>
    );
  };

  return (
    <InstructorPageLayout>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-medium">Courses</h1>
        <div className="flex space-x-4">
          <Button
            label="Create"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          />
          <Button
            label="Remove"
            startIcon={<RemoveIcon />}
          />
        </div>
      </div>
      {loading ? (
        <CenterAligned>
          <CircularProgress />
        </CenterAligned>
      ) : (
        <>
          <Dialog
            fullWidth={true}
            open={isDialogOpen}
            onClose={handleCloseDialog}
          >
            <DialogTitle>
              <div className="flex flex-col text-2xl font-medium">
                Create a new course
              </div>
            </DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  label="Title"
                  required
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
              </form>
            </DialogContent>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <div>{error}</div>
              </Alert>
            )}
            <DialogActions>
              <Button
                label="Cancel"
                variant="outlined"
                onClick={handleCloseDialog}
              />
              <Button label="Create" onClick={handleCreateCourse} />
            </DialogActions>
          </Dialog>
          {renderCourses()}
        </>
      )}
    </InstructorPageLayout>
  );
}