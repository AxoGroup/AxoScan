import React from 'react'
import assert from 'assert'
import { render, cleanup, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { describe, expect, it, beforeAll, afterAll, test, vi } from 'vitest'; // Import test from vitest
//import userEvent from '@testing-library/user-event';
// import sinon from 'sinon';
import UploadButton from '../src/components/UploadButton.jsx'


test('wew', () => {
	assert(1, 1);
});

describe('UploadButton', () => {
	test('should invoke handleClick when button is clicked', () => {
		// Arrange

		const handleClick = () => {
			console.log('I was called');
		}

		const mock = vi.fn().mockImplementation(handleClick) // Create a spy on handleClick function  //vi.fn or vi.SpyOn
		render(<UploadButton handleClick={mock} />);

		// Act
		fireEvent.click(screen.getByText('Back to Upload')); // Simulate a click on the button

		// Assert
		//assert(handleClick.toHaveBeenCalledTimes(1), true); // Check if handleClick was called once
		expect(mock).toHaveBeenCalledTimes(1);
	});
});
