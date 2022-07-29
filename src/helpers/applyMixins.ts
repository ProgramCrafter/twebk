/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

export default function applyMixins(derivedCtor: any, constructors: any[]) {
<<<<<<< HEAD
  const callbacks: Array<(...args: any[]) => any> = [];
=======
  // const callbacks: Array<(...args: any[]) => any> = [];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      const value: PropertyDescriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null);
<<<<<<< HEAD
      if(name === '_constructor') {
        callbacks.push(value.value);
        return;
      } else if(name === 'constructor') {
=======
      /* if(name === '_constructor') {
        callbacks.push(value.value);
        return;
      } else  */if(name === 'constructor') {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return;
      }

      Object.defineProperty(
        derivedCtor.prototype,
        name,
        value
      );
    });
  });

<<<<<<< HEAD
  if(callbacks.length) {
    function c(...args: any[]): any {
      callbacks.forEach((cb, idx) => {
        // @ts-ignore
        cb.apply(this, args[idx] || []);
      });
    };

    Object.defineProperty(derivedCtor.prototype, 'superConstructor', {
      configurable: true,
      enumerable: true,
      value: c,
      writable: true
    });
  }
=======
  // if(callbacks.length) {
  //   function c(...args: any[]): any {
  //     callbacks.forEach((cb, idx) => {
  //       // @ts-ignore
  //       cb.apply(this, args[idx] || []);
  //     });
  //   };

  //   Object.defineProperty(derivedCtor.prototype, 'superConstructor', {
  //     configurable: true,
  //     enumerable: true,
  //     value: c,
  //     writable: true
  //   });
  // }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}
