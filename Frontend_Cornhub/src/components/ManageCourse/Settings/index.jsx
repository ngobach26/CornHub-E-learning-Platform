import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";

import DropdownInput from "../../DropdownInput";
import FormPageLayout from "../../FormPageLayout";

const Settings = () => {
  const renderField = (label, Component) => {
    return (
      <div className="grid items-center md:grid-cols-2">
        <p className="mb-1 text-left text-gray-600 md:mb-0">{label}</p>
        {Component}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form className="flex flex-col gap-8">
        {renderField("Instructor", <DropdownInput />)}
        {renderField("Total course duration", <TextField type="time" />)}
        {renderField(
          "Course status",
          <div className="flex items-center gap-1">
            <p>Unpublished</p>
            <Switch />
            <p>Published</p>
          </div>
        )}
      </form>
    );
  };

  return <FormPageLayout title="Settings">{renderForm()}</FormPageLayout>;
};

export default Settings;