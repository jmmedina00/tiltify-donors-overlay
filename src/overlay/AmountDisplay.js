import React from "react";
import { connect } from "react-redux";

const currencies = {
  dollar: "$",
  euro: "€"
}

const AmountDisplay = ({
  currency, swap, children
}) => {
  const internalDivs = [
    <div className="amount" key="0">{children}</div>,
    <div className="currency" key="1">{currency}</div>
  ];

  if (swap) {
    internalDivs.reverse();
  }

  return <div className="amount-display">
    {internalDivs}
  </div>;
}

const mapStateToProps = ({currency: currencyName = "dollar", swap}) => ({
  currency: currencies[currencyName], swap
});
export default connect(mapStateToProps)(AmountDisplay);