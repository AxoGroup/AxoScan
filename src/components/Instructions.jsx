import React from 'react';
import { Card, Space } from 'antd';
const App = () => (
  <Space direction="vertical" size={16} style={{ border: 'none' }}>
    <Card
      title="Effortless Upload Guide"
      // extra={<a href="#">More</a>}
      style={{
        width: 400,
        height: 200,
        marginBottom: 50,
        backgroundColor: '#272727',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.45)',
      }}
      styles={{ borderBottom: '1px solid #93d5a2', color: 'rgba(255, 255, 255, 0.65)' }}>
      <p>Welcome to our streamlined upload process! To ensure your files are uploaded seamlessly, simply drag and drop them into the area below. </p>
    </Card>
  </Space>
);
export default App;
