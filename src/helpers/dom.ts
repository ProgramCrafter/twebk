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

/* export function checkDragEvent(e: any) {
  if(!e || e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'A')) return false
  if(e.dataTransfer && e.dataTransfer.types) {
    for(var i = 0; i < e.dataTransfer.types.length; i++) {
      if(e.dataTransfer.types[i] === 'Files') {
        return true;
      }
    }
  } else {
    return true;
  }

  return false;
} */

/* export function getFieldSelection(field: any) {
  if(field.selectionStart) {
    return field.selectionStart;
  // @ts-ignore
  } else if(!document.selection) {
    return 0;
  }

  const c = '\x01';
  // @ts-ignore
  const sel = document.selection.createRange();
  const txt = sel.text;
  const dup = sel.duplicate();
  let len = 0;

  try {
    dup.moveToElementText(field);
  } catch(e) {
    return 0;
  }

  sel.text = txt + c;
  len = dup.text.indexOf(c);
  sel.moveStart('character', -1);
  sel.text = '';

  // if (browser.msie && len === -1) {
  //   return field.value.length
  // }
  return len;
} */

/* export function serializeNodes(nodes: Node[]): string {
  return nodes.reduce((str, child: any) => {
    //console.log('childNode', str, child, typeof(child), typeof(child) === 'string', child.innerText);

    if(typeof(child) === 'object' && child.textContent) return str += child.textContent;
    if(child.innerText) return str += child.innerText;
    if(child.tagName === 'IMG' && child.classList && child.classList.contains('emoji')) return str += child.getAttribute('alt');

    return str;
  }, '');
} */

/* if (Config.Modes.animations &&
  typeof window.requestAnimationFrame === 'function') {
  window.onAnimationFrameCallback = function (cb) {
    return (function () {
      window.requestAnimationFrame(cb)
    })
  }
} else {
  window.onAnimationFrameCallback = function (cb) {
    return cb
  }
} */

/* export const isSelectionSingle = (input: Element = document.activeElement) => {
  const nodes = getSelectedNodes();
<<<<<<< HEAD
  const parents = [...new Set(nodes.map(node => node.parentNode))];
=======
  const parents = [...new Set(nodes.map((node) => node.parentNode))];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  const differentParents = parents.length > 1;

  let single = true;
  if(differentParents) {
    single = false;
  } else {
    const node = nodes[0];
    if(node && node.parentNode !== input && node.parentNode.parentNode !== input) {
      single = false;
    }
  }

  return single;
}; */

/* export function radiosHandleChange(inputs: HTMLInputElement[], onChange: (value: string) => void) {
<<<<<<< HEAD
  inputs.forEach(input => {
=======
  inputs.forEach((input) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    input.addEventListener('change', () => {
      if(input.checked) {
        onChange(input.value);
      }
    });
  });
} */

export default {};
