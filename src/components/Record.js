import React, { useEffect, useState } from "react";
import back from "../back.png";

function Record(props) {
  const { handleBack } = props;
  const data = JSON.parse(localStorage.getItem("key"));
  const [value, setValue] = useState();
  const [date, setDate] = useState();
  var d = new Date(data.timestamp);
  var months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = months[d.getMonth()];
  var dateOfUse = month + " " + d.getDate() + "," + " " + d.getFullYear();
  useEffect(() => {
    setDate(dateOfUse);
  }, []);

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
      <div className="row">
        <div className="column">{date}</div>
        <div className="column">
          {data.fromAmount}
          {data.fromCurrency}
        </div>
        <div className="column">
          {data.amount}
          {data.toCurrency}
        </div>
      </div>
    </div>
  );
}

export default Record;
