//export function gzipUncompress(bytes: ArrayBuffer, toString: true): string;

// @ts-ignore
import pako from 'pako/dist/pako_inflate.min.js';
<<<<<<< HEAD

//export function gzipUncompress(bytes: ArrayBuffer, toString?: false): Uint8Array;
export default function gzipUncompress(bytes: ArrayBuffer, toString?: boolean): string | Uint8Array {
  //console.log(dT(), 'Gzip uncompress start');
  const result = pako.inflate(bytes, toString ? {to: 'string'} : undefined);
  //console.log(dT(), 'Gzip uncompress finish'/* , result */);
=======
// import dT from './dT';

//export function gzipUncompress(bytes: ArrayBuffer, toString?: false): Uint8Array;
export default function gzipUncompress(bytes: ArrayBuffer, toString?: boolean): string | Uint8Array {
  // console.log(dT(), 'Gzip uncompress start');
  const result = pako.inflate(bytes, toString ? {to: 'string'} : undefined);
  // console.log(dT(), 'Gzip uncompress finish'/* , result */);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  return result;
}
