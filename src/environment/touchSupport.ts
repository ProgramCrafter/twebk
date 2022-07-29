/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// @ts-ignore
<<<<<<< HEAD
export const IS_TOUCH_SUPPORTED = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)/*  || true */;
=======
const IS_TOUCH_SUPPORTED = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)/*  || true */;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
export default IS_TOUCH_SUPPORTED;
