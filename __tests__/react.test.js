jest.mock('@ant-design/plots', () => ({
    Pie: () => null, // Mock implementation
   }));
import React from 'react'
import App from '../src/App';
import { render, screen } from '@testing-library/react'


describe('App', () => {
  it('renders the App component', () => {
    console.log('running');
    render(<App />)
    screen.debug() // This will print the JSX of the App component to the console
  })
})