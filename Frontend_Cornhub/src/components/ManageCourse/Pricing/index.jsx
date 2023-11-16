import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormPageLayout from "../../FormPageLayout";

const Pricing = () => {
  const [pricing, setPricing] = React.useState("Free");

  const handlePricingChange = (event) => {
    setPricing(event.target.value);
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
          <FormControlLabel
            value="Paid"
            control={<Radio />}
            label="Paid"
            disabled
          />
        </RadioGroup>
      </div>
    );
  };

  return (
    <FormPageLayout title="Pricing" containerClass="pb-10">
      {renderForm()}
    </FormPageLayout>
  );
};

export default Pricing;
