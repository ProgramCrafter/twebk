/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

<<<<<<< HEAD
import { makeMediaSize } from "./mediaSizes";
import { MOUNT_CLASS_TO } from "../config/debug";
=======
import { MOUNT_CLASS_TO } from "../config/debug";
import { makeMediaSize } from "./mediaSize";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default function calcImageInBox(imageW: number, imageH: number, boxW: number, boxH: number, noZoom = true) {
  if(imageW < boxW && imageH < boxH && noZoom) {
    return makeMediaSize(imageW, imageH);
  }

  let boxedImageW = boxW;
  let boxedImageH = boxH;

  if((imageW / imageH) > (boxW / boxH)) {
    boxedImageH = (imageH * boxW / imageW) | 0;
  } else {
    boxedImageW = (imageW * boxH / imageH) | 0;
    if(boxedImageW > boxW) {
      boxedImageH = (boxedImageH * boxW / boxedImageW) | 0;
      boxedImageW = boxW;
    }
  }

  // if (Config.Navigator.retina) {
  //   imageW = Math.floor(imageW / 2)
  //   imageH = Math.floor(imageH / 2)
  // }

  if(noZoom && boxedImageW >= imageW && boxedImageH >= imageH) {
    boxedImageW = imageW;
    boxedImageH = imageH;
  }

  return makeMediaSize(boxedImageW, boxedImageH);
}

MOUNT_CLASS_TO.calcImageInBox = calcImageInBox;
