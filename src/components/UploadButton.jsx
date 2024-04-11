import React from 'react';
import { Button } from 'antd';

const App = ({ handleClick }) => {

  return (
    <Button onClick={handleClick} style={{ marginBottom: '50px' }}>
      Back to Upload
    </Button>
  );
};
export default App;
