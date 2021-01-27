import React from "react";

const currencies = {
  dollar: "$",
  euro: "€"
}

const AmountDisplay = ({
  currency = "dollar", position = "left", children
}) => {
  const internalDivs = [
    <div className="amount">{children}</div>,
    <div className="currency">{currencies[currency]}</div>
  ];

  if (position === "left") {
    internalDivs.reverse();
  }

  return <div className="amount-display">
    {internalDivs}
  </div>;
}

export default AmountDisplay;