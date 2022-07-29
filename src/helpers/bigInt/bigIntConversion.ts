import bigInt from 'big-integer';
<<<<<<< HEAD
=======
import { longBigInt, ulongBigInt } from './bigIntConstants';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export function bigIntFromBytes(bytes: Uint8Array | number[], base = 256) {
  return bigInt.fromArray(bytes instanceof Uint8Array ? [...bytes] : bytes, base);
}

export function bigIntToBytes(bigInt: bigInt.BigInteger) {
  return new Uint8Array(bigInt.toArray(256).value);
}
<<<<<<< HEAD
=======

export function bigIntToSigned(bigInt: bigInt.BigInteger) {
  return bigInt.greater(longBigInt) ? bigInt.minus(ulongBigInt) : bigInt;
}

export function bigIntToUnsigned(bigInt: bigInt.BigInteger) {
  return bigInt.isNegative() ? ulongBigInt.add(bigInt) : bigInt;
}
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
