import Single from "../components/Single";
import React from 'react';
import { singleUser } from '../data';

const User = (props) => {

  //Fetch data and send to Single Component
  
  return (
    <div className="">
      <Single {...singleUser}/>
    </div>
  )
}

export default User;