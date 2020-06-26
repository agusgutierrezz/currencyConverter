import React from "react";

function Total(props) {
  const { amount, toCurrency, fromCurrency, fromAmount } = props;
  return (
    <div>
      <p>
        {fromAmount} {fromCurrency} = {amount}
        {toCurrency}
      </p>
    </div>
  );
}

export default Total;
