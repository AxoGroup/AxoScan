import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import Footer from './Footer';
import UploadButton from './UploadButton';
import Pie from './Pie';
import ProgressBar from './ProgressBar'

export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [lineItems, setLineItems] = useState([]);

  return (
    <div className="home-container">
      <TitleHeader className="header" />

      {hasUploaded ? (
        <>
          <Pie  lineItems={lineItems} />
          <UploadButton style={{marginRight: '10px'}} setHasUploaded={setHasUploaded} setLineItems={setLineItems} />
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
