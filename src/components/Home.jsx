import React from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="home-container">
      <TitleHeader className="header" />
      <Instructions />
      <DragAndDrop />
      <Footer />
    </div>
  );
}
