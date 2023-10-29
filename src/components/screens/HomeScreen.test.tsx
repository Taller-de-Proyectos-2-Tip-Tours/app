import React from 'react';
import { render, fireEvent } from 'test-utils';
import {describe, expect, it} from '@jest/globals';
import LoginScreen from './LoginScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    
    // Check if "Tip Tour" text is rendered
    const tipTourText = getByText('Tip Tours');
    expect(tipTourText).toBeTruthy();
    
    // Check if the button with the title "Ver paseos" is rendered
    const verPaseosButton = getByText('Ver paseos');
    expect(verPaseosButton).toBeTruthy();
  });

  it('navigates to "TourList" when the button is pressed', () => {
    const { getByText } = render(<LoginScreen />);
    const verPaseosButton = getByText('Ver paseos');

    // Mock the navigation object with a navigate function
    const mockNavigate = jest.fn();
    const navigation = {
      navigate: mockNavigate,
    };

    // Simulate a button press
    fireEvent.press(verPaseosButton);

    // Check if the navigate function was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('TourList');
  });
});
