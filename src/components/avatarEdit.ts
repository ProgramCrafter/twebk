/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type { CancellablePromise } from "../helpers/cancellablePromise";
<<<<<<< HEAD
import { attachClickEvent } from "../helpers/dom/clickEvent";
import type { InputFile } from "../layer";
=======
import type { InputFile } from "../layer";
import { attachClickEvent } from "../helpers/dom/clickEvent";
import PopupElement from "./popups";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupAvatar from "./popups/avatar";

export default class AvatarEdit {
  public container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private icon: HTMLSpanElement;

  constructor(onChange: (uploadAvatar: () => CancellablePromise<InputFile>) => void) {
    this.container = document.createElement('div');
    this.container.classList.add('avatar-edit');

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('avatar-edit-canvas');

    this.icon = document.createElement('span');
    this.icon.classList.add('tgico', 'tgico-cameraadd');

    this.container.append(this.canvas, this.icon);

    attachClickEvent(this.container, () => {
<<<<<<< HEAD
      new PopupAvatar().open(this.canvas, onChange);
=======
      PopupElement.createPopup(PopupAvatar).open(this.canvas, onChange);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public clear() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
