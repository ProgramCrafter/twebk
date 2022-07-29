export default function copy<T>(obj: T): T {
  //in case of premitives
  if(obj === null || typeof(obj) !== "object") {
    return obj;
  }
 
  //date objects should be 
  if(obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }
 
  //handle Array
  if(Array.isArray(obj)) {
    // @ts-ignore
<<<<<<< HEAD
    const clonedArr: T = obj.map(el => copy(el)) as any as T;
=======
    const clonedArr: T = obj.map((el) => copy(el)) as any as T;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return clonedArr;
  }
 
  //lastly, handle objects
  // @ts-ignore
  let clonedObj = new obj.constructor();
  for(var prop in obj){
    if(obj.hasOwnProperty(prop)) {
      clonedObj[prop] = copy(obj[prop]);
    }
  }
  return clonedObj;
}
