import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Logo from "../Logo";

export default function CourseNavbar(props) {
  const { title, id } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="body">
        <Toolbar className="flex items-center gap-10">
          <Logo variant="header-md" />
          <Link href={`/course/${id}`}>
            <a>
              <p className="mb-1 text-lg font-medium cursor-pointer">{title}</p>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}