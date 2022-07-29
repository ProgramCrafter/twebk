/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

export default function toggleDisability(elements: HTMLElement[], disable: boolean): () => void {
  if(disable) {
<<<<<<< HEAD
    elements.forEach(el => el.setAttribute('disabled', 'true'));
  } else {
    elements.forEach(el => el.removeAttribute('disabled'));
=======
    elements.forEach((el) => el.setAttribute('disabled', 'true'));
  } else {
    elements.forEach((el) => el.removeAttribute('disabled'));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  return () => toggleDisability(elements, !disable);
}
