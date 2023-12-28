import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import FormPageLayout from "../../FormPageLayout";
import DropdownInput from "../../DropdownInput";
import { languages } from "../../../fakedata/languages";

export default function CourseDetails() {
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
            autoFocus
          />
          <TextField
            className="w-full"
            margin="normal"
            required
            fullWidth
            id="subtitle"
            label="Subtitle"
            name="subtitle"
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
          autoFocus
          multiline
          rows={4}
        />
        <div>
          <h3 className="mb-1 font-semibold">Basic information</h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* dropdownInput */}
            <DropdownInput
              label="Language"
              data={languages}
              valueExtractor={(datum) => datum.title}
              labelExtractor={(datum) => datum.title}
              required
            />
            <DropdownInput
              label="Level"
              data={["Beginner", "Intermediate", "Expert", "All Levels"]}
              valueExtractor={(datum) => datum.title}
              labelExtractor={(datum) => datum.title}
              required
            />
            <DropdownInput label="Category" required />
            <DropdownInput label="Subcategory" required />
          </div>
          <TextField
            className="w-full"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Promotional video URL"
            name="url"
            autoFocus
          />
        </div>
      </form>
    );
  };

  return (
    <FormPageLayout title="Course Details" containerClass="pb-10">
      {renderForm()}
    </FormPageLayout>
  );
}
