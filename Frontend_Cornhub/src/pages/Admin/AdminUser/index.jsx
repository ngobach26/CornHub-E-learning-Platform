import Single from "../../../components/Admin/Single";
import React from 'react';
import api from "../../../services/adminAPI";

const User = (props) => {

  //Fetch data and send to Single Component
  const singleUser = 1;
  
  return (
    <div className="">
      <h1>Hello</h1>
      {/* <Single {...singleUser}/> */}
    </div>
  )
}

export default User;