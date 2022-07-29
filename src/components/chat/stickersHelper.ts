/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import mediaSizes from "../../helpers/mediaSizes";
<<<<<<< HEAD
import { MyDocument } from "../../lib/appManagers/appDocsManager";
import { CHAT_ANIMATION_GROUP } from "../../lib/appManagers/appImManager";
import appStickersManager from "../../lib/appManagers/appStickersManager";
=======
import preloadAnimatedEmojiSticker from "../../helpers/preloadAnimatedEmojiSticker";
import { MyDocument } from "../../lib/appManagers/appDocsManager";
import { CHAT_ANIMATION_GROUP } from "../../lib/appManagers/appImManager";
import { AppManagers } from "../../lib/appManagers/managers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../lib/rootScope";
import { EmoticonsDropdown } from "../emoticonsDropdown";
import { SuperStickerRenderer } from "../emoticonsDropdown/tabs/stickers";
import LazyLoadQueue from "../lazyLoadQueue";
import Scrollable from "../scrollable";
import AutocompleteHelper from "./autocompleteHelper";
import AutocompleteHelperController from "./autocompleteHelperController";

export default class StickersHelper extends AutocompleteHelper {
  private scrollable: Scrollable;
  private superStickerRenderer: SuperStickerRenderer;
  private lazyLoadQueue: LazyLoadQueue;
  private onChangeScreen: () => void;

<<<<<<< HEAD
  constructor(appendTo: HTMLElement, controller: AutocompleteHelperController) {
=======
  constructor(
    appendTo: HTMLElement, 
    controller: AutocompleteHelperController,
    private managers: AppManagers
  ) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    super({
      appendTo, 
      controller,
      listType: 'xy', 
      onSelect: (target) => {
        return !EmoticonsDropdown.onMediaClick({target}, true);
      }, 
      waitForKey: ['ArrowUp', 'ArrowDown']
    });

    this.container.classList.add('stickers-helper');

    this.addEventListener('visible', () => {
      setTimeout(() => { // it is not rendered yet
        this.scrollable.container.scrollTop = 0;
      }, 0);

      rootScope.dispatchEvent('choosing_sticker', true);
    });

    this.addEventListener('hidden', () => {
      if(this.onChangeScreen) {
        mediaSizes.removeEventListener('changeScreen', this.onChangeScreen);
        this.onChangeScreen = undefined;
      }

      rootScope.dispatchEvent('choosing_sticker', false);
    });
  }

  public checkEmoticon(emoticon: string) {
    const middleware = this.controller.getMiddleware();

    if(this.lazyLoadQueue) {
      this.lazyLoadQueue.clear();
    }

<<<<<<< HEAD
    appStickersManager.preloadAnimatedEmojiSticker(emoticon);
    appStickersManager.getStickersByEmoticon(emoticon)
=======
    preloadAnimatedEmojiSticker(emoticon);
    this.managers.appStickersManager.getStickersByEmoticon(emoticon)
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    .then((stickers) => {
      if(!middleware()) {
        return;
      }

      if(this.init) {
        this.init();
        this.init = null;
      }

      const container = this.list.cloneNode() as HTMLElement;

      let ready: Promise<void>;

      this.lazyLoadQueue.clear();
      if(stickers.length) {
        ready = new Promise<void>((resolve) => {
          const promises: Promise<any>[] = [];
<<<<<<< HEAD
          stickers.forEach(sticker => {
=======
          stickers.forEach((sticker) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            container.append(this.superStickerRenderer.renderSticker(sticker as MyDocument, undefined, promises));
          });

          (Promise.all(promises) as Promise<any>).finally(resolve);
        });
      } else {
        ready = Promise.resolve();
      }

      ready.then(() => {
        this.list.replaceWith(container);
        this.list = container;

        if(!this.onChangeScreen) {
          this.onChangeScreen = () => {
            const width = (this.list.childElementCount * mediaSizes.active.esgSticker.width) + (this.list.childElementCount - 1 * 1);
            this.list.style.width = width + 'px';
          };
          mediaSizes.addEventListener('changeScreen', this.onChangeScreen);
        }

        this.onChangeScreen();

        this.toggle(!stickers.length);
        this.scrollable.scrollTop = 0;
      });
    });
  }

  protected init() {
    this.list = document.createElement('div');
    this.list.classList.add('stickers-helper-stickers', 'super-stickers');

    this.container.append(this.list);

    this.scrollable = new Scrollable(this.container);
    this.lazyLoadQueue = new LazyLoadQueue();
<<<<<<< HEAD
    this.superStickerRenderer = new SuperStickerRenderer(this.lazyLoadQueue, CHAT_ANIMATION_GROUP);
=======
    this.superStickerRenderer = new SuperStickerRenderer(this.lazyLoadQueue, CHAT_ANIMATION_GROUP, this.managers);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
}
