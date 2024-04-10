import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { test, assert, vi } from 'vitest'; // Import test from vitest
// import sinon from 'sinon';
import UploadButton from '../src/components/UploadButton.jsx';

test('wew', () => {
	assert(1, 1);
});

test('UploadButton', () => {
	test('should invoke handleClick when button is clicked', () => {
		// Arrange
		const handleClick = vi.spyOn(); // Create a spy on handleClick function  //vi.fn or vi.SpyOn
		render(<UploadButton handleClick={handleClick} />);

		// Act
		fireEvent.click(screen.getByText('Back to Upload')); // Simulate a click on the button

		// Assert
		assert(handleClick.toHaveBeenCalledTimes(1), true); // Check if handleClick was called once
	});
});

// test('UploadButton', () => {
//   test('should invoke handleClick when button is clicked', () => {
//     // Arrange
//     const handleClick = sinon.spy(); // Create a spy on handleClick function
//     render(<UploadButton handleClick={handleClick} />);

//     // Act
//     fireEvent.click(screen.getByText('Back to Upload')); // Simulate a click on the button

//     // Assert using Chai's expect
//     // expect(handleClick).to.have.been.calledOnce; // Check if handleClick was called once
//     expect(1).toEqual(1);
//   });
// });
