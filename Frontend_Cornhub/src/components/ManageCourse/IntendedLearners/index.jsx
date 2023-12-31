import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";

import Button from "../../Button";
import FormPageLayout from "../../FormPageLayout";

export default function IntendedLearners() {
  const initialFormData = {
    details: {
      highlights: [{ points: "" }],
      prerequisites: [{ points: "" }],
      targetAudience: [{ points: "" }],
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!formData.details.highlights.length) {
      setFormData((prevFormData) => {
        return {
          details: {
            highlights: [
              ...(prevFormData.details.highlights || [{ points: "" }]),
              { points: "" },
            ],
            prerequisites: [
              ...(prevFormData.details.prerequisites || [{ points: "" }]),
              { points: "" },
            ],
            targetAudience: [
              ...(prevFormData.details.targetAudience || [{ points: "" }]),
              { points: "" },
            ],
          },
        };
      });
    }
  }, [formData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-3">
          <div>
            <h3 className="font-medium text-left">
              What will students learn in your course?
            </h3>
            <p className="my-2 text-left">
              You are required to input a minimum of 4 learning objectives or
              outcomes that learners can expect to achieve after finishing your
              course.
            </p>
            {formData.details.highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <TextField
                  className="w-full"
                  margin="normal"
                  onChange={(e) =>
                    handleInputChange("highlights", index, e.target.value)
                  }
                  fullWidth
                  placeholder="Example: Define the roles and responsibilities of a project manager"
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveField("highlights", index)}
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
                onClick={() => handleAddField("highlights")}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-left">
              What are the requirements or prerequisites for taking your course?
            </h3>
            <p className="my-2 text-left">
              Specify the essential skills, experience, tools, or equipment that
              learners should possess before enrolling in your course.
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
              course, outlining those who will benefit from your course content.
              <br />
              This will help you attract the right learners to your course.
            </p>
            {formData.details.targetAudience.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <TextField
                  className="w-full"
                  margin="normal"
                  onChange={(e) =>
                    handleInputChange("targetAudience", index, e.target.value)
                  }
                  fullWidth
                  placeholder="Example: Beginner Python developers curious about data science"
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveField("targetAudience", index)}
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
                onClick={() => handleAddField("targetAudience")}
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
        <h1 className="text-2xl font-bold">Intended Learners</h1>
        <Button label="Save" type="submit" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-start">
          <p className="mb-5 mr-4 text-left">
            The provided details will be openly displayed on your Course Landing
            Page, influencing your course's overall performance. These
            descriptions play a crucial role in assisting learners in
            determining if your course aligns with their needs
          </p>
        </div>
      </div>
      {renderForm()}
    </>
  );
}