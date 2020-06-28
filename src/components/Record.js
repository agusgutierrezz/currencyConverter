import React, { useEffect, useState } from "react";
import back from "../back.png";
import axios from "axios";
import { HandlerDate } from "../helpers";
function Record(props) {
  const { handleBack } = props;
  const [converter, setConverter] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/converter/")
      .then((response) => {
        setConverter(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const fechas = converter.map((el) => el.createdAt);
  console.log(HandlerDate("2020-06-28T10:07:09.910Z"));
  return (
    <div className="record">
      <div className="back">
        <img src={back} alt="back" />
        <button onClick={handleBack}>Go back</button>
      </div>
      <div className="th">
        <p>Date</p>
        <p>From</p>
        <p>To</p>
      </div>
      {converter.map((el) => (
        <div key={el._id} className="row">
          <div className="column">{HandlerDate(el.createdAt)}</div>
          <div className="column">
            {el.fromAmount}
            {el.fromCurrency}
          </div>
          <div className="column">
            {el.toAmount}
            {el.toCurrency}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Record;
