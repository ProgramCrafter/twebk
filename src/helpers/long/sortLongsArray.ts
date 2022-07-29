import bigInt from "big-integer";

export default function sortLongsArray(arr: string[]) {
<<<<<<< HEAD
  return arr.map(long => {
    return bigInt(long);
  }).sort((a, b) => {
    return a.compare(b);
  }).map(bigInt => {
=======
  return arr.map((long) => {
    return bigInt(long);
  }).sort((a, b) => {
    return a.compare(b);
  }).map((bigInt) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return bigInt.toString(10);
  });
}
