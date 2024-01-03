import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Snackbar } from "@mui/material";

import Button from "../../Button";

import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../services/instructorAPI";

export default function IntendedLearners() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const initialFormData = {
    details: {
      outcomes: [{ points: "" }],
      prerequisites: [{ points: "" }],
      target_audience: [{ points: "" }],
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user.token;
        const courseData = await api.getCourseById(token, id);
        const outcomes = JSON.parse(courseData.outcomes) || [{ points: "" }];
        const prerequisites = JSON.parse(courseData.prerequisites) || [
          { points: "" },
        ];
        const targetAudience = JSON.parse(courseData.target_audience) || [
          { points: "" },
        ];
        setFormData({
          details: {
            outcomes,
            prerequisites,
            target_audience: targetAudience,
          },
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchData(); 
  }, [id, user.token]);

  const handleInputChange = (category, index, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData.details[category][index].points = value;
      return updatedFormData;
    });
  };

  const handleAddField = (category) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData.details[category].push({ points: "" });
      return updatedFormData;
    });
  };

  const handleRemoveField = (category, index) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData.details[category].splice(index, 1);
      return updatedFormData;
    });
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submitted");
    try {
      const token = user.token;
      const outcomesString = JSON.stringify(formData.details.outcomes);
      const prerequisitesString = JSON.stringify(
        formData.details.prerequisites
      );
      const targetAudienceString = JSON.stringify(
        formData.details.target_audience
      );
      const datum = {
        outcomes: outcomesString,
        prerequisites: prerequisitesString,
        target_audience: targetAudienceString,
      };
      const updatedData = await api.updateCourse(
        token,
        id,
        datum,
        {}, {}
      );
      setSnackbarMessage("Course details updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to update course details");
      setSnackbarOpen(true);
    }
  };

  const renderForm = () => {
    return (
      <div>
        <form>
          <div className="flex flex-col gap-8 py-3">
            <div className="flex justify-between p-6 pt-0 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-left">
                Intended Learners
              </h1>
              <Button label="Save" type="submit" onClick={handleSubmit} />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-start">
                <p className="mb-1 mr-4 text-left">
                  The provided details will be openly displayed on your Course
                  Landing Page, influencing your course's overall performance.
                  These descriptions play a crucial role in assisting learners
                  in determining if your course aligns with their needs
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-left">
                What will students learn in your course?
              </h3>
              <p className="my-2 text-left">
                You are required to input a minimum of 4 learning objectives or
                outcomes that learners can expect to achieve after finishing
                your course.
              </p>
              {formData.details.outcomes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TextField
                    className="w-full"
                    margin="normal"
                    onChange={(e) =>
                      handleInputChange("outcomes", index, e.target.value)
                    }
                    fullWidth
                    value={item.points}
                    placeholder="Example: Define the roles and responsibilities of a project manager"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveField("outcomes", index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <div className="flex flex-start">
                <Button
                  label="Add more to your response"
                  className="mt-5 text-md "
                  variant="transparent"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddField("outcomes")}
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-left">
                What are the requirements or prerequisites for taking your
                course?
              </h3>
              <p className="my-2 text-left">
                Specify the essential skills, experience, tools, or equipment
                that learners should possess before enrolling in your course.
                <br />
                If there are no prerequisites, take advantage of this space to
                make the course more accessible for beginners.
              </p>
              {formData.details.prerequisites.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TextField
                    className="w-full"
                    margin="normal"
                    onChange={(e) =>
                      handleInputChange("prerequisites", index, e.target.value)
                    }
                    fullWidth
                    value={item.points}
                    placeholder="Example: No programming experience needed. You will learn everything you need to know"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveField("prerequisites", index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <div className="flex flex-start">
                <Button
                  label="Add more to your response"
                  className="mt-5 text-md align-left"
                  variant="transparent"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddField("prerequisites")}
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-left">Who is this course for?</h3>
              <p className="my-2 text-left">
                Provide a concise description of the target audience for your
                course, outlining those who will benefit from your course
                content.
                <br />
                This will help you attract the right learners to your course.
              </p>
              {formData.details.target_audience.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TextField
                    className="w-full"
                    margin="normal"
                    onChange={(e) =>
                      handleInputChange(
                        "target_audience",
                        index,
                        e.target.value
                      )
                    }
                    value={item.points}
                    fullWidth
                    placeholder="Example: Beginner Python developers curious about data science"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveField("target_audience", index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <div className="flex flex-start">
                <Button
                  label="Add more to your response"
                  className="mt-5 text-md align-left"
                  variant="transparent"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddField("target_audience")}
                />
              </div>
            </div>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </div>
    );
  };

  return <>{renderForm()}</>;
}