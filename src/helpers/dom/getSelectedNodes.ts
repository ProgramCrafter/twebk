/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

export default function getSelectedNodes() {
  const nodes: Node[] = [];
  const selection = window.getSelection();
  for(let i = 0; i < selection.rangeCount; ++i) {
    const range = selection.getRangeAt(i);
    let {startContainer, endContainer} = range;
    if(endContainer.nodeType !== 3) endContainer = endContainer.firstChild;
    
    while(startContainer && startContainer !== endContainer) {
      nodes.push(startContainer.nodeType === 3 ? startContainer : startContainer.firstChild);
      startContainer = startContainer.nextSibling;
    }
    
    if(nodes[nodes.length - 1] !== endContainer) {
      nodes.push(endContainer);
    }
  }

  // * filter null's due to <br>
<<<<<<< HEAD
  return nodes.filter(node => !!node);
=======
  return nodes.filter((node) => !!node);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}
