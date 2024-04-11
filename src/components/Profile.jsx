import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Flex } from 'antd';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from the backend API
        const response = await axios.get('/api/profile');

        // Update state with the retrieved profile data
        setProfileData(response.data);
        // setLoading(false);
      } catch (error) {
        // Handle errors
        toast.error('Error fetching user data');
        console.error('Error fetching user data:', error);
        // setError(error.message || 'An error occurred');
        // setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const calculateCountAndTotalPrice = () => {
    const userDataArray = profileData;

    let count = 0;
    let totalPrice = 0;
    for (let i = 0; i < userDataArray.length; i++){
      totalPrice += userDataArray[i].total;
      count++;
    }
    
    const finalDataArray = [count, totalPrice];

    return finalDataArray;
  };

  const userDisplayInfo = calculateCountAndTotalPrice();

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Receipts: {userDisplayInfo[0]}</p>
        <p>Total Cost: {userDisplayInfo[1]}</p>
      </div>
    </div>
  )

}

export default Profile;