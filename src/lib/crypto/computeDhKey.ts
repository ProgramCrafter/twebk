/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { bigIntFromBytes } from "../../helpers/bigInt/bigIntConversion";
import cryptoWorker from "./cryptoworker";
=======
import { bigIntFromBytes, bigIntToSigned } from "../../helpers/bigInt/bigIntConversion";
import cryptoWorker from "./cryptoMessagePort";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default async function computeDhKey(g_b: Uint8Array, a: Uint8Array, p: Uint8Array) {
  const key = await cryptoWorker.invokeCrypto('mod-pow', g_b, a, p);
  const keySha1Hashed = await cryptoWorker.invokeCrypto('sha1', key);
<<<<<<< HEAD
  const key_fingerprint = keySha1Hashed.slice(-8).reverse(); // key_fingerprint: key_fingerprint as any // ! it doesn't work
  const key_fingerprint_long = bigIntFromBytes(key_fingerprint).toString(10); // bigInt2str(str2bigInt(bytesToHex(key_fingerprint), 16), 10);
=======
  const key_fingerprint = keySha1Hashed.slice(-8).reverse();
  const key_fingerprint_long = bigIntToSigned(bigIntFromBytes(key_fingerprint)).toString(10);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  return {key, key_fingerprint: key_fingerprint_long};
}
