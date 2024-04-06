import React, {useState} from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import Footer from './Footer';
import UploadButton from './UploadButton';
import Pie from './Pie';


export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);
  
  return (
    <div className="home-container">
      <TitleHeader className="header" />
    
      {!hasUploaded ? (
      <>
          <Pie />
          <UploadButton setHasUploaded={setHasUploaded} /> 
      </>
      ) : (
        <>
          <Instructions />
          <DragAndDrop setHasUploaded={setHasUploaded} />
        </>
      )}
      <Footer />
    </div>
  );
}
