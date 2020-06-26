import React from "react";
import change from "../repeat.png";
function CurrencyRow(props) {
  const {
    currencyOptions,
    selectFromCurrency,
    selectToCurrency,
    onChangeFromCurrency,
    onChangeToCurrency,
    onChangeAmount,
    fromAmount,
    handleSubmit,
    handleReverse,
  } = props;

  return (
    <div className="converter">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="selectGroup">
          <label>Amount</label>
          <input type="number" value={fromAmount} onChange={onChangeAmount} />
        </div>
        <div className="selectGroup">
          <label>From</label>
          <select value={selectFromCurrency} onChange={onChangeFromCurrency}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <img onClick={handleReverse} src={change} />

        <div className="selectGroup">
          <label>To</label>

          <select value={selectToCurrency} onChange={onChangeToCurrency}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}

export default CurrencyRow;
