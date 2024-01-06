import React from "react";
// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { useState, useEffect } from "react";
import Add from "../components/Add";
import { userRows } from "../data";
// import api from "../services/adminAPI";
import { useAuthContext } from "../../../Frontend_Cornhub/src/hooks/useAuthContext";

const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      width: 50 
    },
    {
      field: "firstName",
      type: "string",
      headerName: "First name",
      width: 90,
    },
    {
      field: "lastName",
      type: "string",
      headerName: "Last name",
      width: 90,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 100,
    },
    {
      field: "password",
      type: "string",
      headerName: "Password",
      width: 100,
    },
    {
      field: "currentjob",
      headerName: "Current Position",
      width: 100,
      type: "string",
    },
    {
      field: "website",
      type: "string",
      headerName: "Website",
      width: 100,
    },
    {
      field: "linkedin",
      type: "string",
      headerName: "LinkedIn",
      width: 100,
    },
]; // width = 730

const Users = () => {
    const [user] = useAuthContext();

    const [open, setOpen] = useState(false);
    
    // useEffect(() => {
    //   const 
    // })

    return (
        <div>
            <div className="text-white">
                <div className="justify-between">
                  <div className="mt-10 ml-10 font-mono text-3xl ">Users Management</div>
                  <button className="p-2 mx-10 my-5 bg-red-500 rounded-lg cursor-pointer " onClick={() => setOpen(true)}>ADD USER</button>
                </div>
            </div>
            <DataTable slug="users" columns={columns} rows={list_of_users}/> 
            {open && <Add slug="users" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Users;