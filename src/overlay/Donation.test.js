import { render, screen } from '../test-utils';
import Donation from './Donation';

describe('Donation', () => {
  jest.mock('./AmountDisplay');

  test('renders everything inside a donation element', () => {
    const { container } = render(<Donation name="testing" amount={20} />);
    const firstChild = container.firstChild;

    expect(firstChild.className).toBe('donation');
    expect(firstChild.childNodes.length).toBe(2);
  });

  test('renders the name as is in a donor element', () => {
    render(<Donation name="testing" amount={20} />);

    const donorElement = screen.getByText('testing');
    expect(donorElement.className).toBe('donor');
  });

  test('renders the amount inside an AmountDisplay component with two decimal places', () => {
    render(<Donation name="testing" amount={20.123} />);
    expect(screen.getByText('20.12')).toBeInTheDocument();
  });
});
