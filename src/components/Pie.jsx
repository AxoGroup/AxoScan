import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import '../styles/Pie.css'

const DemoPie = () => {

  const config = {
    data: [
      { type: 'Dylan', value: 27 },
      { type: 'Aiden', value: 25 },
      { type: 'Sofia', value: 18 },
      { type: 'Austin', value: 15 },
      { type: 'Sean', value: 10 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return (
    <div className="pie-container" style={{height: '75%', marginLeft: '75px', marginTop: '25px'}}>
       <Pie {...config} />
    </div>
   
  )
};

export default DemoPie;

// ReactDOM.render(<DemoPie />, document.getElementById('container'));