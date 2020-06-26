export function Filter(object) {
  const array = [];
  object.map((el) => {
    if (el === "EUR" || el === "CHF" || el === "USD") {
      array.push(el);
    }
  });
  return array;
}
