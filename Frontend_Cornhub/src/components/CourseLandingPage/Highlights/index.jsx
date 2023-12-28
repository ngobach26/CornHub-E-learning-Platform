import React from "react";
import DoneIcon from "@mui/icons-material/Done";

const Highlights = ({ highlights }) => {
  if (!highlights) return null;

  const renderPoints = () => {
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {highlights.map(({ points }, index) => (
          <p key={index} className="flex gap-3">
            <span>
              <DoneIcon fontSize="small" />
            </span>
            {points}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 border">
      <h3 className="mb-4 text-2xl font-bold">What you'll learn</h3>
      {renderPoints()}
    </div>
  );
};

export default Highlights;