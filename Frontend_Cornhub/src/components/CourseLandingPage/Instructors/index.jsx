import React from "react";
import DOMPurify from "dompurify";

const Instructors = ({ data }) => {
  if (!data) return null;
  const instructor = data?.[0];

  const renderProfile = () => {
    return (
      <div>
        <p className="text-xl font-bold">
          {instructor.name}
          <span className="text-sm font-normal text-gray-400">
            , {instructor.headline}
          </span>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(instructor?.bio),
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold">Instructor</h3>
      {renderProfile()}
    </div>
  );
};

export default Instructors;