import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function CourseNavbar(props) {
  const { title, slug } = props;

  return (
    <div className="w-full bg-body">
      <div className="flex items-center justify-between p-4">
        <Logo variant="header-md" />
        {/* <Link to={`/course/${slug}`}>
            <a>
              <p className="mb-1 text-lg font-medium cursor-pointer">{title}</p>
            </a>
          </Link> */}
      </div>
    </div>
  );
}