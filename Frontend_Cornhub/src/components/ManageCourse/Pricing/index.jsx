import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import Button from "../../Button";
import FormPageLayout from "../../FormPageLayout";
import api from "../../../services/instructorAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Pricing = ({ courseID }) => {
  const { user } = useAuthContext();
  const [pricing, setPricing] = useState("Free");
  const [price, setPrice] = useState("");

  const handlePricingChange = (event) => {
    setPricing(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  useEffect(() => {
    // Fetch pricing details based on the courseId
    const fetchPricingDetails = async () => {
      try {
        // Replace this with your actual API call to get pricing details
        const response = await api.getPublishedCourse(user.token);
        setPricing(response.pricing || "Free");
        setPrice(response.price || "");
      } catch (error) {
        console.error("Error fetching pricing details:", error);
      }
    };

    if (courseID) {
      fetchPricingDetails();
    }
  }, [courseID]);

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
    <>
      <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <Button label="Save" type="submit" />
      </div>
      {renderForm()}
    </>
  );
};

export default Pricing;
