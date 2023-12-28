import React from "react";

const Points = ({ title, data }) => {
  if (!data) return null;

  const renderPoints = () => {
    return (
      <div className="text-sm">
        {data.map(({ points }, index) => (
          <p key={index} className="flex items-center">
            <span className="mr-4 text-2xl">&#8226;</span> {points}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      {renderPoints()}
    </div>
  );
};

export default Points;