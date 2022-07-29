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

export default function callbackify<T extends Awaited<any>, R>(
  smth: T, 
  callback: (result: Awaited<T>) => R
<<<<<<< HEAD
): PromiseLike<R> | R {
  if(smth instanceof Promise) {
=======
): R {
  if(smth instanceof Promise) {
    // @ts-ignore
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return smth.then(callback);
  } else {
    return callback(smth as any);
  }
}
