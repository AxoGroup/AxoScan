import React from 'react'
import assert from 'assert'
import { render, cleanup, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { describe, expect, it, beforeAll, afterAll, test, vi } from 'vitest';

import UploadButton from '../src/components/UploadButton.jsx'
import Instructions from '../src/components/Instructions.jsx'
import TitleHeader from '../src/components/TitleHeader.jsx'
import DragAndDrop from '../src/components/DragAndDrop.jsx'
import Footer from '../src/components/Footer.jsx'

test('wew', () => {
	assert(1, 1);
});

describe('UploadButton', () => {
	test('button should have uploadButton text', () => {
		render(<UploadButton/>);
		expect(screen.getByRole('button', { name: 'Back to Upload' })).toBeInTheDocument();

	});
	test('should invoke handleClick when button is clicked', () => {
		const handleClick = () => {
			console.log('I was called');
		}
		const mock = vi.fn().mockImplementation(handleClick);
		render(<UploadButton handleClick={mock} />);

		fireEvent.click(screen.getByText('Back to Upload')); 
		expect(mock).toHaveBeenCalledTimes(1);
	});
});

describe('Expected text to display on the page', () => {
	test('instructions display on page', () => {
		render(<Instructions/>);
		const instructionsText = 'Welcome to our streamlined upload process! To ensure your files are uploaded seamlessly, simply drag and drop them into the area below.'
		expect(screen.getByText(instructionsText)).toBeInTheDocument();
		expect(screen.getByText('Effortless Upload Guide')).toBeInTheDocument();

	});
	test('heading renders', () => {
		render(<TitleHeader/>);
		const headingText = 'AxoScan';
		expect(screen.getByText(headingText)).toBeInTheDocument();
	});
	test('drag and drop text renders', () => {
		render(<DragAndDrop/>);
		const dragText = 'Support for a single upload. Strictly prohibited from uploading company data or other banned files.';
		expect(screen.getByText(dragText)).toBeInTheDocument();
	});
	test('footer text renders', () => {
		render(<Footer/>);

		expect(screen.getByText('AxoGroup')).toBeInTheDocument();
		expect(screen.getByText('Design Team:')).toBeInTheDocument();
		expect(screen.getByText('Sofia')).toBeInTheDocument();
		expect(screen.getByText('Aiden')).toBeInTheDocument();
		expect(screen.getByText('Austin')).toBeInTheDocument();
		expect(screen.getByText('Sean')).toBeInTheDocument();
		expect(screen.getByText('Dylan')).toBeInTheDocument();
	})
})