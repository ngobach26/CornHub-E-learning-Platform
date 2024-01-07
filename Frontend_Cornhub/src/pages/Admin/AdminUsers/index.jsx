import React from "react";
import DataTable from "../../../components/Admin/DataTable";
import { useState, useEffect } from "react";
import api from "../../../services/adminAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const columns = [
    { 
      field: "_id", 
      headerName: "ID", 
      sortable: false,
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
      sortable: false,
      headerName: "Email",
      width: 150,
    },
    {
      field: "currentjob",
      headerName: "Current Position",
      width: 150,
      sortable: false,
      type: "string",
    },
    {
      field: "website",
      type: "string",
      sortable: false,
      headerName: "Website",
      width: 100,
    },
    {
      field: "linkedin",
      type: "string",
      sortable: false,
      headerName: "LinkedIn",
      width: 100,
    },
]; // width = 730

const Users = () => {
    const { user } = useAuthContext();
    const [ usersList, setUsersList ] = useState([]);

    console.log(user);

    const actionColumn = {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="flex gap-4">
            <Link to={`${params.row._id}`} target="_blank">
              <img src="/view.svg" className="w-5 h-5 cursor-pointer" />
            </Link>
            <div className="">
              <img src="/delete.svg" className="object-cover w-5 h-5 rounded-3xl" />
            </div>
          </div>
        );
      },
    };

    useEffect(() => {
      const fetchUserList = async () => {
        try{
          const users_list = await api.listUsers(user.token);
          setUsersList(users_list);
        }
        catch(err){
          console.log(err);
        }
      };
      fetchUserList();
    }, [user.token]);

    return (
        <div>
            <div className="text-white">
                <div className="justify-between">
                  <div className="my-10 ml-10 font-mono text-3xl ">Users Management</div>
                </div>
            </div>
            <DataTable slug="users" columns={[...columns,actionColumn]} rows={usersList}/> 
            
        </div>
    );
};

export default Users;