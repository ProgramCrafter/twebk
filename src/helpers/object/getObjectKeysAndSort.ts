<<<<<<< HEAD
export default function getObjectKeysAndSort(object: {[key: string]: any}, sort: 'asc' | 'desc' = 'asc') {
  if(!object) return [];
  const ids = object instanceof Map ? [...object.keys()] : Object.keys(object).map(i => +i);
=======
export default function getObjectKeysAndSort(object: {[key: string]: any} | Map<number, any>, sort: 'asc' | 'desc' = 'asc') {
  if(!object) return [];
  const ids = object instanceof Map ? [...object.keys()] : Object.keys(object).map((i) => +i);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  if(sort === 'asc') return ids.sort((a, b) => a - b);
  else return ids.sort((a, b) => b - a);
}
