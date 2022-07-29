/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import {Awaited} from '../types';
=======
import { Awaited } from '../types';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default function callbackifyAll<T extends readonly unknown[] | [], R extends any>(
  values: T, 
  callback: (result: { -readonly [P in keyof T]: Awaited<T[P]> }) => R
): PromiseLike<R> | R {
<<<<<<< HEAD
  if(values.some(value => value instanceof Promise)) {
=======
  if(values.some((value) => value instanceof Promise)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return Promise.all(values).then(callback as any);
  } else {
    return callback(values as any);
  }
}
