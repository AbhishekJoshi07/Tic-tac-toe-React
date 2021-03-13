import { render, screen } from '@testing-library/react';
import Game from '../src/Game';

test('should render player buttons', () => {
  render(<Game />);
  const btnElement = screen.getByText(/1 Player/i);
  expect(btnElement).toBeInTheDocument();
});
