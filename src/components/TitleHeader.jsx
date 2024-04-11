import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const TitleHeader = () => {
  const navigate = useNavigate();


  return (

    <Card
      data-testid="title-header-card"
      style={{
        color: 'white',
        backgroundColor: '#272727',
        border: 'none',
        width: '100%',
        height: '80px',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <h1>CatSkan</h1>
      {/* <button type="button" className="alr-reg-btn" onClick={() => navigate('/profile')}>Profile</button> */}
    </Card>
  );
};

export default TitleHeader;