import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import '../styles/DragAndDrop.css';
import axios from 'axios';
const { Dragger } = Upload;
import ProgressBar from './ProgressBar';

const DragAndDrop = ({ setHasUploaded, setLineItems }) => {
  const [fileList, setFileList] = useState([]);
  const [sumbitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);
    setSubmitted(true);
    let startTime = Date.now();
    let estimatedUploadTime = 10000; // Start with an initial estimate of 10 seconds for the upload

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const progressPercentage = Math.min((elapsedTime / estimatedUploadTime) * 100, 100);
      setProgress(progressPercentage);
    };

    let progressInterval = setInterval(updateProgress, 1000);

    const config = {
      onUploadProgress: (progressEvent) => {
        let percentage = (progressEvent.loaded * 100) / progressEvent.total;
        setProgress(percentage);
      },
    };

    // update url from backend
    try {
      const response = await axios.post('/api/upload', formData, config);
      clearInterval(progressInterval);
      setProgress(100);
      message.success(`${file.name}, file uploaded successfully`);
      console.log('Server Response: ', response.data);
      if (response.data) {
        setLineItems(response.data);
      }
      setHasUploaded(true);
      setSubmitted(false);
      setProgress(0);
      onSuccess(response.data);
    } catch (error) {
      console.error('Server Response: ', error);
      clearInterval(progressInterval);
      setProgress(0);
      message.error(`${file.name}, file upload failed`);
      setHasUploaded(false);
      onError(error);
    }
  };

  return (
    <>
      <Dragger name="file" multiple={false} fileList={fileList} onChange={handleChange} customRequest={customRequest} onRemove={() => setFileList([])} id="drag-and-drop">
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#f19cbb' }} />
        </p>
        <p className="ant-upload-text" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>
          {' '}
          Support for a single upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
      <div className="progress-container">{sumbitted && <ProgressBar percent={progress} className="progress-bar" />}</div>
    </>
  );
};
export default DragAndDrop;
