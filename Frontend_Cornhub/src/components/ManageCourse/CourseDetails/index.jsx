import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import FormPageLayout from "../../FormPageLayout";
import DropdownInput from "../../DropdownInput";
import Button from "../../Button";
import { languages } from "../../../fakedata/languages";

export default function CourseDetails({ courseID }) {
  const [courseDetail, setCourseDetails] = useState({
    courseTitle: "",
    description: "",
    language: "English",
    level: "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    // Fetch course details based on the courseId
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getCoursebyID/${courseID}`);
        const courseData = await response.json();

        setCourseDetails({
          courseTitle: courseData.courseTitle || "",
          description: courseData.description || "",
          language: courseData.language || "English",
          level: courseData.level || "",
          category: courseData.category || "",
          subcategory: courseData.subcategory || "",
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (courseID) {
      fetchCourseDetails();
    }
  }, [courseID]);

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
            defaultValue={courseDetail.courseTitle}
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
          defaultValue={courseDetail.description}
          autoFocus
          multiline
          rows={4}
        />
        <div>
          <h3 className="mb-1 font-semibold">Basic information</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* dropdownInput */}
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="langauge"
              label="Language"
              name="language"
              defaultValue={courseDetail.language}
              autoFocus
            />
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="level"
              label="Level"
              placeholder="'Beginner', 'Intermediate', 'Expert', 'All Levels'"
              name="level"
              defaultValue={courseDetail.level}
              autoFocus
            />
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="category"
              label="Category"
              name="category"
              defaultValue={courseDetail.category}
              autoFocus
            />
            <TextField
              className="w-full"
              margin="normal"
              fullWidth
              id="subcategory"
              label="Subcategory"
              name="subcategory"
              defaultValue={courseDetail.subcategory}
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
        <Button
          label="Save"
          type="submit"
        />
      </div>
      {renderForm()}
    </>
    // <FormPageLayout title="Course Details" containerClass="pb-10">
    // </FormPageLayout>
  );
}