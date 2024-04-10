import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import '../styles/Pie.css';

const DemoPie = ({ lineItems }) => {
  const config = {
    data: lineItems,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
      offset: 50,
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
        color: 'white',
      },
    },
  };
  return (
    <div className="pie-container" style={{ height: '75%', marginLeft: '125px', marginTop: '25px' }}>
      <Pie {...config} />
    </div>
  );
};

export default DemoPie;
