import React, { useEffect, useState } from "react";
import CurrencyRow from "./components/CurrencyRow";
import Total from "./components/Total";
import logo from "./logo.PNG";
import next from "./next.png";
import "./App.scss";
import { Filter } from "./helpers";
const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExachangeRate] = useState();
  const [sendSubmit, setSendSubmit] = useState(false);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = currencyOptions[2];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExachangeRate(data.rates[firstCurrency]);
        console.log(firstCurrency);
      });
  }, []);
  useEffect(() => {
    if (
      fromCurrency != null &&
      toCurrency != null &&
      fromCurrency != toCurrency
    ) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExachangeRate(data.rates[toCurrency]));
    }
  }, [sendSubmit]);
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSendSubmit(true);
  }
  function handleReverse() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
      </header>
      <div className="title">
        <h1>Convert currencies in real-time.</h1>
      </div>
      <div>
        <CurrencyRow
          currencyOptions={Filter(currencyOptions)}
          selectFromCurrency={fromCurrency}
          selectToCurrency={toCurrency}
          onChangeFromCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeToCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          fromAmount={fromAmount}
          handleSubmit={handleSubmit}
          handleReverse={handleReverse}
        />
      </div>
      <div className="story">
        <a> View conversion story </a>
        <img src={next} />
      </div>
      <div className="total">
        {sendSubmit && (
          <Total
            amount={toAmount}
            toCurrency={toCurrency}
            fromCurrency={fromCurrency}
            fromAmount={fromAmount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
