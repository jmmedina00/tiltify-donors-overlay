import { render, screen } from '../test-utils';
import { BehaviorSubject, of, throwError } from 'rxjs';
import Overlay from './Overlay';
import { act } from '@testing-library/react';

jest.mock('./Donation');

describe('Overlay', () => {
  test('renders donations received through an observable', () => {
    const donations$ = of([
      { id: 3, name: 'Lorem', amount: 10 },
      { id: 2, name: 'ipsum', amount: 20 },
      { id: 1, name: 'dolor', amount: 30 },
    ]);
    render(<Overlay donations$={donations$} />);
    expect(screen.getByText('10 - Lorem')).toBeInTheDocument();
    expect(screen.getByText('20 - ipsum')).toBeInTheDocument();
    expect(screen.getByText('30 - dolor')).toBeInTheDocument();
  });

  test('keeps listening for new donations, appended to the already existing ones', () => {
    const donations$ = new BehaviorSubject([
      { id: 3, name: 'Lorem', amount: 10 },
      { id: 2, name: 'ipsum', amount: 20 },
      { id: 1, name: 'dolor', amount: 30 },
    ]);

    const { container } = render(<Overlay donations$={donations$} />);

    act(() => {
      donations$.next([
        { id: 5, name: 'Testing', amount: 10 },
        { id: 4, name: 'this', amount: 20 },
        { id: 3, name: 'Lorem', amount: 10 },
        { id: 2, name: 'ipsum', amount: 20 },
        { id: 1, name: 'dolor', amount: 30 },
      ]);
    });

    expect(screen.getByText('10 - Testing')).toBeInTheDocument();
    expect(screen.getByText('20 - this')).toBeInTheDocument();
    expect(container.firstChild.childNodes.length).toBe(5);
  });

  test('displays an error message if the observable throws', () => {
    const donations$ = throwError('403 Forbidden');
    render(<Overlay donations$={donations$} />);
    expect(screen.getByText('Token has been banned.')).toBeInTheDocument();
  });
});
