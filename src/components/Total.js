import React, { useEffect, useState } from "react";
import axios from "axios";
function Total(props) {
  const { amount, toCurrency, fromCurrency, fromAmount } = props;

  useEffect(() => {
    const newConverter = {
      toCurrency: toCurrency,
      toAmount: amount,
      fromCurrency: fromCurrency,
      fromAmount: fromAmount,
    };

    axios
      .post("http://localhost:4000/converter/add", newConverter)
      .then((res) => console.log(res.data));
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
