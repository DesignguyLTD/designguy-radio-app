import { render, screen } from '@testing-library/react';
import {act} from 'react';
import App from './App';
import '@testing-library/jest-dom';

test('renders learn react link', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText("designguy-radio-app gnfbufgnk")).toBeInTheDocument();
});
