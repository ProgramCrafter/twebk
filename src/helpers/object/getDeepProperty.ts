export default function getDeepProperty(object: any, key: string) {
  const splitted = key.split('.');
  let o: any = object;
<<<<<<< HEAD
  splitted.forEach(key => {
=======
  splitted.forEach((key) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!key) {
      return;
    }
    
    // @ts-ignore
    o = o[key];
  });
  
  return o;
}
