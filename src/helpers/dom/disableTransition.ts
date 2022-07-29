/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { doubleRaf } from "../schedulers";

export default function disableTransition(elements: HTMLElement[]) {
<<<<<<< HEAD
  elements.forEach(el => el.classList.add('no-transition'));

  doubleRaf().then(() => {
    elements.forEach(el => el.classList.remove('no-transition'));
=======
  elements.forEach((el) => el.classList.add('no-transition'));

  doubleRaf().then(() => {
    elements.forEach((el) => el.classList.remove('no-transition'));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  });
}
