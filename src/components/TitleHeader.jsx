import React from 'react';
import { Card } from 'antd';

const TitleHeader = () => (
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
    <h1>AxoScan</h1>
  </Card>
);
export default TitleHeader;
