import React from "react";
import FormPageLayout from "../FormPageLayout";
import { TextField } from "@mui/material";
// import RichTextEditor from "../RichTextEditor";

export default function InstructorForm() {
  const renderForm = () => {
    return (
      <form className="flex flex-col gap-5">
        <div className="grid items-center grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            placeholder="Dinh Viet Quang"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="headline"
            label="Headline"
            name="headline"
            placeholder="Data Scientist or Software Engineer at CornHub"
            autoFocus
          />
        </div>
        {/* <RichTextEditor /> */}
        <div className="grid items-center grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            placeholder="name@company.com"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="website"
            label="Website"
            name="website"
            placeholder="https://cornhub.com"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="twitter"
            label="Twitter"
            name="twitter"
            placeholder="https://twitter.com/cornhub"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="youtube"
            label="Youtube"
            name="youtube"
            placeholder="https://youtube.com/"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="linkedin"
            label="LinkedIn"
            name="linkedin"
            placeholder="https://linkedin.com/"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="facebook"
            label="Facebook"
            name="facebook"
            placeholder="https://facebook.com/"
            autoFocus
          />
        </div>
      </form>
    );
  };

  return (
    <FormPageLayout title="Add new Instructor">{renderForm()}</FormPageLayout>
  );
}
