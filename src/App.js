import React, { useEffect, useState } from "react";
import CurrencySelect from "./components/CurrencySelect";
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
  const [sendReverse, setReverse] = useState(false);
  const [amount, setAmount] = useState(1.0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[17];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExachangeRate(data.rates[firstCurrency]);
      });
  }, []);

  function CalculateAmount() {
    if (fromCurrency === toCurrency) {
      setExachangeRate(1);
    } else if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          setExachangeRate(data.rates[toCurrency]);
          console.log(data);
        });
    }
  }
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setSendSubmit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    CalculateAmount();
    setSendSubmit(true);
  }
  function handleReverse() {
    setSendSubmit(false);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    CalculateAmount();

    setReverse(!sendReverse);
  }
  function onChangeFromCurrency(e) {
    setFromCurrency(e.target.value);
    setSendSubmit(false);
  }
  function onChangeToCurrency(e) {
    setToCurrency(e.target.value);
    setSendSubmit(false);
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
        <CurrencySelect
          currencyOptions={Filter(currencyOptions)}
          selectFromCurrency={fromCurrency}
          selectToCurrency={toCurrency}
          onChangeFromCurrency={onChangeFromCurrency}
          onChangeToCurrency={onChangeToCurrency}
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

      {sendSubmit && (
        <Total
          amount={toAmount}
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
          fromAmount={fromAmount}
        />
      )}
    </div>
  );
}

export default App;
