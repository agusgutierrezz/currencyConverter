const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Converter = new Schema(
  {
    toCurrency: {
      type: String,
    },
    toAmount: {
      type: Number,
    },
    fromCurrency: {
      type: String,
    },
    fromAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Converter", Converter);
