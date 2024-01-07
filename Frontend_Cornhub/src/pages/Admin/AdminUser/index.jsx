import Single from "../../../components/Admin/Single";
import React, {useEffect, useState} from 'react';
import api from "../../../services/adminAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const AdminUser = () => {
  const { user } = useAuthContext();
  const { id } = useParams();

  console.log(id);

  //Fetch data and send to Single Component
  const [singleUser, setSingleUser] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try{
        const detail = await api.getUserById(user.token, id);
        console.log(detail);
        setSingleUser(detail);
      }
      catch(err){
        console.error(err);
      }
    };
    fetchUserDetails();
  }, [user.token]);
  
  return (
    <div className="">
      {/* <h1>Hello</h1> */}
      <Single {...singleUser}/>
    </div>
  )
}

export default AdminUser;