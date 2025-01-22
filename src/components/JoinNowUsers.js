import React, { useEffect, useState } from 'react';

import { getJoinNowUsers } from "../Services/CommonServices";

const JoinNowUsers = () => {
  const [joinNowUsersData, setJoinNowUsersData] = useState([]);

  const getJoinNowUsersData = async () => {
    try {
      const response = await getJoinNowUsers();
      if (response?.status === 200) {
        setJoinNowUsersData(response?.data?.users);
      } else {
        setJoinNowUsersData([]);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(()=>{
    getJoinNowUsersData();
  },[])

  console.log('joinNowUsersData:===>',joinNowUsersData);
  
  return (
    <div className='main-container'>
    </div>
  );
};

export default JoinNowUsers;
