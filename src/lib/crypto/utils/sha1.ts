import convertToUint8Array from "../../../helpers/bytes/convertToUint8Array";
import subtle from "../subtle";
//import sha1 from '@cryptography/sha1';

export default function sha1(bytes: Parameters<typeof convertToUint8Array>[0]) {
<<<<<<< HEAD
  return subtle.digest('SHA-1', convertToUint8Array(bytes)).then(b => {
=======
  return subtle.digest('SHA-1', convertToUint8Array(bytes)).then((b) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return new Uint8Array(b);
  });
  /* //console.trace(dT(), 'SHA-1 hash start', bytes);

  const hashBytes: number[] = [];

  let hash = sha1(String.fromCharCode.apply(null, 
    bytes instanceof Uint8Array ? [...bytes] : [...new Uint8Array(bytes)]));
  for(let i = 0; i < hash.length; ++i) {
    hashBytes.push(hash.charCodeAt(i));
  }

  //console.log(dT(), 'SHA-1 hash finish', hashBytes, bytesToHex(hashBytes));

  return new Uint8Array(hashBytes); */
}
