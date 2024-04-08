import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Progress } from 'antd';
const App = ({percent, setPercent}) => {

  return (
    <Flex vertical gap="small">
      <Flex vertical gap="small">
        <Progress percent={percent} type="line" style={{ width: '500px' }} />
        {/* <Progress percent={percent} type="circle" /> */}
      </Flex>
    </Flex>
  );
};
export default App;