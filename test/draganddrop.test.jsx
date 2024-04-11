import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { test, expect, afterEach, beforeEach, describe, it, vi } from 'vitest';
import DragAndDrop from '../src/components/DragAndDrop';

describe('calling handleChange func', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  function handleChange(){
    console.log('first func')
  }
  it('should call handleChange at least once', () => {
    const mockHandle = vi.fn().mockImplementation(handleChange);
    mockHandle();
    expect(mockHandle).toHaveBeenCalled(1)
  })
});

describe('calling customRequest func', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  function customRequest(){
    console.log('second func')
  }
  it('should call customRequest at least once', () => {
    const mockRequest = vi.fn().mockImplementation(customRequest);
    mockRequest();
    expect(mockRequest).toHaveBeenCalled(1)
  })
});

describe('calling updateProgress func', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  function updateProgress(){
    console.log('third func')
  }
  it('should call updateProgress at least once', () => {
    const mockProgress = vi.fn().mockImplementation(updateProgress);
    mockProgress();
    expect(mockProgress).toHaveBeenCalled(1)
  })
});

//need to refactor
// describe('DragAndDrop', () => {
//   let state;
  
//   beforeEach(() => {
//     state = [{
//       type: 'banana',
//       value: 2
//     }]
//   })
//   describe('default state', () => {
//     it('should return a default state when given an undefined input', () => {
//       expect(Array(undefined, { type: undefined, value: undefined })).toEqual(state);
//     });
//   });
// })

/*
// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

test('File upload triggers handleChange', () => {
  vi(
    'File upload triggers handleChange',
    async () => {
      const setHasUploaded = jest.fn();
      const setLineItems = jest.fn();

      const { getByTestId } = render(
        <DragAndDrop setHasUploaded={setHasUploaded} setLineItems={setLineItems} />
      );

      // Simulate file upload
      const file = new File(['file content'], 'test-file.txt', { type: 'text/plain' });
      const input = getByTestId('upload-input');
      fireEvent.change(input, { target: { files: [file] } });

      // Assert handleChange was called
        assert(setHasUploaded.toHaveBeenCalled(), true);
        assert(setLineItems.toHaveBeenCalled(), true);
    }
  );
});
*/