import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types'

const UploadButton = ({ setHasUploaded }) => {
  const handleClick = () => {
    setHasUploaded(false);
  };
  return (
    <Button onClick={handleClick} style={{ marginBottom: '50px' }}>
      Back to Upload
    </Button>
  );
};
//Enforce prop types
UploadButton.propTypes = {
  setHasUploaded: PropTypes.func.isRequired,
};

export default UploadButton;
