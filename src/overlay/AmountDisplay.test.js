import { render, screen } from "../test-utils";
import AmountDisplay from "./AmountDisplay";

describe("AmountDisplay", () => {
  test("contains information in the amount-display element", () => {
    const {container} = render(<AmountDisplay>20</AmountDisplay>);
    const firstChild = container.firstChild;

    expect(firstChild.className).toBe("amount-display");
    expect(firstChild.childNodes.length).toBe(2);
  });

  test("renders amount", () => {
    render(<AmountDisplay>20</AmountDisplay>);
    const amount = screen.getByText("20");

    expect(amount.className).toBe("amount");
  })

  test("renders $ as default currency", () => {
    render(<AmountDisplay>20</AmountDisplay>);
    const currency = screen.getByText("$");

    expect(currency.className).toBe("currency");
  })

  test("renders € when the currency is correctly set to 'euro'", () => {
    render(<AmountDisplay>20</AmountDisplay>, {initialState: {currency: "euro"}});
    const currency = screen.getByText("€");

    expect(currency.className).toBe("currency");
  });

  test("renders amount first if swap is falsy", () => {
    const {container} = render(<AmountDisplay>20</AmountDisplay>, {initialState: {swap: null}});
    const first = container.firstChild.firstChild;

    expect(first.className).toBe("amount");
  });

  test("renders currency first if swap is truthy", () => {
    const {container} = render(<AmountDisplay>20</AmountDisplay>, {initialState: {swap: "on"}});
    const first = container.firstChild.firstChild;

    expect(first.className).toBe("currency");
  });
})