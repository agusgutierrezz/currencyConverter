import React, { useEffect, useState } from "react";

function Total(props) {
  const { amount, toCurrency, fromCurrency, fromAmount } = props;
  var object = {
    amount: amount,
    timestamp: new Date().getTime(),
    toCurrency: toCurrency,
    fromCurrency: fromCurrency,
    fromAmount: fromAmount,
  };
  useEffect(() => {
    localStorage.setItem("toCurrency", toCurrency);
    localStorage.setItem("fromCurrency", fromCurrency);
    localStorage.setItem("fromAmount", fromAmount);
    localStorage.setItem("key", JSON.stringify(object));
  }, []);
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
