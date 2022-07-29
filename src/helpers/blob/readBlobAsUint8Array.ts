/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import readBlobAsArrayBuffer from "./readBlobAsArrayBuffer";

export default function readBlobAsUint8Array(blob: Blob) {
<<<<<<< HEAD
  return readBlobAsArrayBuffer(blob).then(buffer => new Uint8Array(buffer));
=======
  return readBlobAsArrayBuffer(blob).then((buffer) => new Uint8Array(buffer));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}
