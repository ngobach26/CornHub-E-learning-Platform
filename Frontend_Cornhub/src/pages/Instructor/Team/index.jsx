import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "../../../components/Button";
import InstructorTable from "../../../components/InstructorTable";
import CenterAligned from "../../../components/CenterAligned";

const sampleData = [
  {
    _id: "1",
    name: "John Doe",
    headline: "Web Developer",
    email: "john.doe@example.com",
  },
  {
    _id: "2",
    name: "Jane Smith",
    headline: "UI/UX Designer",
    email: "jane.smith@example.com",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    headline: "Data Scientist",
    email: "bob.johnson@example.com",
  },
  {
    _id: "4",
    name: "Bob Johnson",
    headline: "Data Scientist",
    email: "bob.johnson@example.com",
  },
  {
    _id: "5",
    name: "Bob Johnson",
    headline: "Data Scientist",
    email: "bob.johnson@example.com",
  },
  {
    _id: "6",
    name: "Bob Johnson",
    headline: "Data Scientist",
    email: "bob.johnson@example.com",
  },
];

export default function Team() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleAddInstructorClick = () => {
    navigate("/instructor/team/add");
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(sampleData);
    };
    fetchData();
  }, []);

  const renderTeam = () => {
    return <InstructorTable data={data} />;
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-medium">Team</h1>
        <div className="flex space-x-4">
          <Button
            label="Add"
            startIcon={<AddIcon />}
            onClick={handleAddInstructorClick}
          />
          <Button label="Delete" startIcon={<RemoveIcon />} />
        </div>
      </div>
      {renderTeam()}
    </>
  );
}