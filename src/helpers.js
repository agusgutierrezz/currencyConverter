export function Filter(object) {
  const array = [];
  object.map((el) => {
    if (el === "EUR" || el === "CHF" || el === "USD") {
      array.push(el);
    }
  });
  return array;
}
export function HandlerDate(string) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var newString = string.split("T")[0];
  var array = newString.split("-");
  var month = array[1].split("0")[Number([1])];

  return months[month - 1] + " " + array[2] + ", " + array[0];
}
