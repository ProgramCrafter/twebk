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
import { IS_TOUCH_SUPPORTED } from "../../environment/touchSupport";
=======
import IS_TOUCH_SUPPORTED from "../../environment/touchSupport";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default function placeCaretAtEnd(el: HTMLElement, ignoreTouchCheck = false) {
  if(IS_TOUCH_SUPPORTED && (!ignoreTouchCheck || document.activeElement !== el)) {
    return;
  }
  
  el.focus();
<<<<<<< HEAD
  if(typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
=======
  if(el instanceof HTMLInputElement) {
    const length = el.value.length;
    el.selectionStart = length;
    el.selectionEnd = length;
  } else if(typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    // @ts-ignore
  } else if(typeof document.body.createTextRange !== "undefined") {
    // @ts-ignore
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}
<<<<<<< HEAD
=======

(window as any).placeCaretAtEnd = placeCaretAtEnd;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
