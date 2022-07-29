<<<<<<< HEAD
=======
/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// import { MOUNT_CLASS_TO } from "../../config/debug";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

let context: CanvasRenderingContext2D;
/**
 * Get the text width
 * @param {string} text
 * @param {string} font
 */
export default function getTextWidth(text: string, font: string) {
<<<<<<< HEAD
  //const perf = performance.now();
  if(!context) {
    const canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
=======
  // const perf = performance.now();
  if(!context) {
    const canvas = document.createElement('canvas');
    context = canvas.getContext('2d', {alpha: false});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    context.font = font;
  }

  //context.font = font;
  const metrics = context.measureText(text);
<<<<<<< HEAD
  //console.log('getTextWidth perf:', performance.now() - perf);
  return metrics.width;
  //return Math.round(metrics.width);
}
=======
  // console.log('getTextWidth perf:', performance.now() - perf);
  return metrics.width;
  //return Math.round(metrics.width);
}

// MOUNT_CLASS_TO && (MOUNT_CLASS_TO.getTextWidth = getTextWidth);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
