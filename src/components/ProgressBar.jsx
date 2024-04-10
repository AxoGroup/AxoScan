import React from 'react';
import { Flex, Progress } from 'antd';
import PropTypes from 'prop-types'
const ProgressBar = ({ percent }) => {
  return (
    <Flex vertical gap="small">
      <Flex vertical gap="small">
        <Progress percent={percent} type="line" style={{ width: '500px' }} showInfo={percent > 0} status={percent < 100 ? 'active' : 'success'} strokeColor={percent < 100 ? '#f19cbb' : '#93d5a2'} strokeLinecap="round" />
        {/* <Progress percent={percent} type="circle" /> */}
      </Flex>
    </Flex>
  );
};
ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired
}
export default ProgressBar;
