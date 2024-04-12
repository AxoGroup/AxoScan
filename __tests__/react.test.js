jest.mock('@ant-design/plots', () => ({
    Pie: () => null, 
   }));
import React from 'react'
import App from '../src/App';
import Home from '../src/components/Home';
import TitleHeader from '../src/components/TitleHeader';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UploadButton from '../src/components/UploadButton';
import Footer from '../src/components/Footer';
import Instructions from '../src/components/Instructions';
import Pie from '../src/components/Pie';
import DragAndDrop from '../src/components/DragAndDrop';
import ProgressBar from '../src/components/ProgressBar';
import axios from 'axios';

// Mock axios post request
jest.mock('axios');

describe('Testing React components', () => {
  
  xdescribe('App', () => {
    it('renders the App component', () => {
      render(<App />);
    })
  });

  xdescribe('Title Header', () => {

    it('renders title header', () => {
      const { getByText } = render(<TitleHeader />);
      const titleElement = getByText('AxoScan')
      expect(titleElement).toBeInTheDocument();


    });
    it ('renders correct styles for title header', () => {
      const { getByTestId } = render(<TitleHeader />);
      const cardElement = getByTestId('title-header-card');
      // console.log(titleElement);
      expect(cardElement).toHaveStyle(`
      color: white;
      backgroundColor: '#272727',
      border: 'none',
      width: '100%',
      height: '80px',
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    `);
    });
  });
  
  xdescribe('UploadButton', () => {

    it('renders correctly', () => {
      const mockSetHasUploaded = jest.fn();
      render(<UploadButton setHasUploaded={mockSetHasUploaded} />);
      expect(screen.getByText(/Back to Upload/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveStyle('marginBottom: 50px');
    });
  
    it('calls setHasUploaded with false on click', () => {
      const mockSetHasUploaded = jest.fn();
      render(<UploadButton setHasUploaded={mockSetHasUploaded} />);
      fireEvent.click(screen.getByText(/Back to Upload/i));
      expect(mockSetHasUploaded).toHaveBeenCalledWith(false);
    });
  })

  xdescribe('Footer', ()=> {

    it('renders correctly', () => {
      render(<Footer />);
      expect(screen.getByText('AxoGroup')).toBeInTheDocument();
      expect(screen.getByText('Design Team:')).toBeInTheDocument();
    });
    it('renders the correct number of team member links', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');
      // Assuming there are 5 team members as per the given names array
      expect(links).toHaveLength(5);
    });
  })

  xdescribe('Instructions', () => {
    it('renders Instructions component', () => {
      render(<Instructions />);
      expect(screen.getByText('Effortless Upload Guide')).toBeInTheDocument();
      expect(screen.getByText('Welcome to our streamlined upload process! To ensure your files are uploaded seamlessly, simply drag and drop them into the area below.')).toBeInTheDocument();
    });
    it('renders proper styling', () => {
      render(<Instructions />);
      const cardElement = screen.getByText('Effortless Upload Guide');
      expect(cardElement).toHaveStyle(`
      width: 400,
      height: 200,
      marginBottom: 50,
      backgroundColor: '#272727',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.45)'
      `)
    });
  });

  xdescribe('Progress Bar', ()=> {
    test('renders without crashing', () => {
      render(<ProgressBar percent={50} />);
      const progressElement = screen.getByRole('progressbar');
      expect(progressElement).toBeInTheDocument();
    });
    test('displays correct percent', () => {
      const testPercent = 75;
      render(<ProgressBar percent={testPercent} />);
      const progressElement = screen.getByRole('progressbar');
      expect(progressElement).toHaveAttribute('aria-valuenow', String(testPercent));
    });

  });

  

  describe('DragAndDrop', () => {
    it('renders DragAndDrop component', () => {
      render(<DragAndDrop />);
      expect(screen.getByText('Click or drag file to this area to upload')).toBeInTheDocument();
    });
    it('handles file upload', async () => {
      const setHasUploaded = jest.fn();
      const setLineItems = jest.fn();
      const { getByTestId } = render(<DragAndDrop setHasUploaded={setHasUploaded} setLineItems={setLineItems} />);
  
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
  
      fireEvent.drop(getByTestId('drag-and-drop'), {
        dataTransfer: { files: [file] },
      });

      axios.post.mockResolvedValue({ data: {} });

      await waitFor(() => expect(axios.post).toHaveBeenCalled());

      expect(setHasUploaded).toHaveBeenCalledWith(true);
      expect(setLineItems).toHaveBeenCalled();
    });
  });
});
