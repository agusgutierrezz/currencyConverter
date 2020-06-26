import React from "react";

function Input(props) {
  const { onChangeAmount, amount } = props;
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount} />
    </div>
  );
}

export default Input;
