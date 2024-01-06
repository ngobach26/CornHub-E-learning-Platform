import Single from "../../../components/Admin/Single";
import React from "react";

const AdminCourse = () => {
    
  //Fetch data and send to Single Component

  const singleCourse = false;
  
  return (
    <div className="">
       <Single {...singleCourse}/>
    </div>
  )
}

export default AdminCourse;