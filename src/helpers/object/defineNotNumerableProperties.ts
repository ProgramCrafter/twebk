export default function defineNotNumerableProperties<T extends any>(obj: T, names: (keyof T)[]) {
  //const perf = performance.now();
  const props = {writable: true, configurable: true};
  const out: {[name in keyof T]?: typeof props} = {};
<<<<<<< HEAD
  names.forEach(name => {
=======
  names.forEach((name) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!obj.hasOwnProperty(name)) {
      out[name] = props;
    }
  });
  Object.defineProperties(obj, out);
  //console.log('defineNotNumerableProperties time:', performance.now() - perf);
}
