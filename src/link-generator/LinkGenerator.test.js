import { render, fireEvent, screen } from '../test-utils';
import LinkGenerator from './LinkGenerator';

describe('LinkGenerator', () => {
  let clipboardContents;

  global.navigator.clipboard = {
    writeText: async contents => {
      clipboardContents = contents;
    },
  };
  window.alert = jest.fn(); // Without this, a warning pops up, but calls can't be asserted in tests

  test('creates a link with the data input from the form (1)', () => {
    render(<LinkGenerator></LinkGenerator>);

    const inputCampaign = screen.getByLabelText('Campaign id');
    const inputToken = screen.getByLabelText('Access token');
    const radioEuro = screen.getByLabelText('€');
    const checkCurrency = screen.getByLabelText('Currency to the left?');
    const buttonSubmit = screen.getByText('Generate link');

    fireEvent.change(inputCampaign, { target: { value: '1234' } });
    fireEvent.change(inputToken, { target: { value: 'abcd' } });
    fireEvent.change(radioEuro, { target: { checked: true } });
    fireEvent.change(checkCurrency, { target: { checked: true } });
    fireEvent.click(buttonSubmit);

    // Host is "localhost" during unit tests
    expect(clipboardContents).toBe(
      'http://localhost/?campaign=1234&token=abcd&currency=euro&swap=on'
    );
  });

  test('creates a link with the data input from the form (2)', () => {
    render(<LinkGenerator></LinkGenerator>);

    const inputCampaign = screen.getByLabelText('Campaign id');
    const inputToken = screen.getByLabelText('Access token');
    const radioDollar = screen.getByLabelText('$');
    const checkCurrency = screen.getByLabelText('Currency to the left?');
    const checkHighest = screen.getByLabelText('Sort by highest amount?');
    const buttonSubmit = screen.getByText('Generate link');

    fireEvent.change(inputCampaign, { target: { value: '3456' } });
    fireEvent.change(inputToken, { target: { value: '1a2b' } });
    fireEvent.change(radioDollar, { target: { checked: true } });
    fireEvent.change(checkCurrency, { target: { checked: false } });
    fireEvent.change(checkHighest, { target: { checked: true } });
    fireEvent.click(buttonSubmit);

    // Host is "localhost" during unit tests
    expect(clipboardContents).toBe(
      'http://localhost/?campaign=3456&token=1a2b&currency=dollar&highest=on'
    );
  });
});
