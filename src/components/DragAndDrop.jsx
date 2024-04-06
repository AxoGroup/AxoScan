import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import '../styles/DragAndDrop.css';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const App = () => (
  <Dragger {...props} id="drag-and-drop">
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
);
export default App;
