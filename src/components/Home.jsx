import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import Footer from './Footer';
import UploadButton from './UploadButton';
import Pie from './Pie';
import ProgressBar from './ProgressBar';

export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const total = lineItems.reduce((acc, curr) => acc + curr.value, 0);
  console.log(total);
  const handleClick = (event) => {
    setHasUploaded(false);
  };

  return (
    <div className="home-container">
      <TitleHeader className="header" />

      {hasUploaded ? (
        <>
          <Pie lineItems={lineItems} />

          <p style={{ marginBottom: '25px', fontSize: '24px' }}>Total: ${+total.toFixed(2)}</p>

          <UploadButton style={{ marginRight: '10px' }} setHasUploaded={setHasUploaded} setLineItems={setLineItems} handleClick={handleClick}/>
        </>
      ) : (
        <>
          <Instructions />
          <DragAndDrop setHasUploaded={setHasUploaded} setLineItems={setLineItems} />
        </>
      )}
      <Footer />
    </div>
  );
}
