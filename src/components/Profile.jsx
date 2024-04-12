import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Flex } from 'antd';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [userDisplayInfo, setUserDisplayInfo] = useState([0, 0]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      // Grab web token
      const token = localStorage.getItem('token');

      // configures the request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Fetch profile data from the backend API
      const response = await axios.get('http://localhost:3000/api/profile', config);
      console.log('response', response);
      // Update state with the retrieved profile data
      setProfileData(response.data);
      setIsDataFetched(true);
      // setLoading(false);
    } catch (error) {
      // Handle errors
      toast.error('Error fetching user data');
      console.error('Error fetching user data:', error);
      // setError(error.message || 'An error occurred');
      // setLoading(false);
    }
  };

  const calculateCountAndTotalPrice = () => {
    const userDataArray = profileData;

    let count = 0;
    let totalPrice = 0;
    for (let i = 0; i < userDataArray.length; i++) {
      totalPrice += userDataArray[i].total;
      count++;
    }

    const finalDataArray = [count, totalPrice];

    return finalDataArray;
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    const newUserInfo = calculateCountAndTotalPrice();
    setUserDisplayInfo(newUserInfo);
  }, [profileData]);

  if (!isDataFetched) {
    return null; // Render nothing until data is fetched
  }

  return (
    <div>
      <h2 className="profileheader">Profile</h2>
      <div>
        <p>Receipts: {userDisplayInfo[0]}</p>
        <p>Total Cost: {`$${userDisplayInfo[1].toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default Profile;
