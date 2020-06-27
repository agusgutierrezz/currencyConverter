import React from "react";

function Total(props) {
  const { amount, toCurrency, fromCurrency, fromAmount } = props;

  return (
    <div className="total">
      <p className="current">
        {fromAmount} {fromCurrency} =
      </p>

      <p>
        {amount}
        {toCurrency}
      </p>
    </div>
  );
}

export default Total;
