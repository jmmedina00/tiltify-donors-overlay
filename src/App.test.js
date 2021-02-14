import { render, screen } from './test-utils';
import App from './App';
import configureStore from 'redux-mock-store';
import { loadParams } from './store/actions';

jest.mock("./overlay/ConnectedOverlay");
jest.mock("./link-generator/LinkGenerator");

describe("App", () => {
  test("renders LinkGenerator by default", () => {
    render(<App />);
    expect(screen.getByText("This is link generator.")).toBeInTheDocument(); 
  });

  test("loads every single query parameter into the store", () => {
    const store = configureStore([])({});
    store.dispatch = jest.fn();

    const data = {a: "1", b: "2"};
    const mockParams = new URLSearchParams(data);

    global.URL = function() { // Arrow functions don't work when mocking classes
      return {
        searchParams: mockParams
      }
    };

    render(<App />, {initialState: {}, store});
    expect(store.dispatch).toHaveBeenCalledWith(loadParams(data));
  });

  test("renders Overlay if the query parameters token and campaign are set", () => {
    const data = {token: "abcd", campaign: "1234"};
    const mockParams = new URLSearchParams(data);

    global.URL = function() { // Arrow functions don't work when mocking classes
      return {
        searchParams: mockParams
      }
    };

    render(<App />);
    expect(screen.getByText("This is overlay.")).toBeInTheDocument();
  });

  test("renders LinkGenerator if either token and campaign parameters are missing", () => {
    const data = {token: "abcd"};
    const mockParams = new URLSearchParams(data);

    global.URL = function() { // Arrow functions don't work when mocking classes
      return {
        searchParams: mockParams
      }
    };

    render(<App />);
    expect(screen.getByText("This is link generator.")).toBeInTheDocument();
  });
})