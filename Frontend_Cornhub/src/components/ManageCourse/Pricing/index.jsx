import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import Button from "../../Button";
import FormPageLayout from "../../FormPageLayout";
import api from "../../../services/instructorAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Pricing = () => {
  const { user, course } = useAuthContext();
  const [pricing, setPricing] = useState("Free");
  const [price, setPrice] = useState("");

  const handlePricingChange = (event) => {
    setPricing(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCreatePrice = async () => {
    try {
      const data = {
        price: parseFloat(price),
        // courseTitle: course.course,
        // category: course.category,
      };
      const createdCourse = await api.createCourse(user.token, data);
      // localStorage.setItem("course", JSON.stringify(createdCourse));
      console.log("Course created successfully:", createdCourse);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const renderForm = () => {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-start">
          <p className="mr-4">
            How do you intend to offer your course? Select the monetization
            option.
          </p>
        </div>
        <RadioGroup
          row
          value={pricing}
          onChange={handlePricingChange}
          name="pricing"
        >
          <FormControlLabel value="Free" control={<Radio />} label="Free" />
          <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
        </RadioGroup>
        {pricing === "Paid" && (
          <TextField
            label="Price (in $)"
            type="number"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            variant="outlined"
            className="mt-3"
          />
        )}
      </div>
    );
  };

  return (
    <FormPageLayout title="Pricing" containerClass="pb-10" handleSave={handleCreatePrice}>
      {renderForm()}
    </FormPageLayout>
  );
};

export default Pricing;