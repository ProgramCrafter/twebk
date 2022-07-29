/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type ChatInput from "./input";
<<<<<<< HEAD
import type { AppEmojiManager } from "../../lib/appManagers/appEmojiManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { appendEmoji, getEmojiFromElement } from "../emoticonsDropdown/tabs/emoji";
import { ScrollableX } from "../scrollable";
import AutocompleteHelper from "./autocompleteHelper";
import AutocompleteHelperController from "./autocompleteHelperController";
<<<<<<< HEAD
=======
import { AppManagers } from "../../lib/appManagers/managers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class EmojiHelper extends AutocompleteHelper {
  private scrollable: ScrollableX;

<<<<<<< HEAD
  constructor(appendTo: HTMLElement, 
    controller: AutocompleteHelperController, 
    chatInput: ChatInput, 
    private appEmojiManager: AppEmojiManager) {
=======
  constructor(
    appendTo: HTMLElement, 
    controller: AutocompleteHelperController, 
    chatInput: ChatInput, 
    private managers: AppManagers
  ) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    super({
      appendTo,
      controller, 
      listType: 'x', 
      onSelect: (target) => {
        chatInput.onEmojiSelected(getEmojiFromElement(target as any), true);
      }
    });

    this.container.classList.add('emoji-helper');
  }

  protected init() {
    this.list = document.createElement('div');
    this.list.classList.add('emoji-helper-emojis', 'super-emojis');

    this.container.append(this.list);

    this.scrollable = new ScrollableX(this.container);

    this.addEventListener('visible', () => {
      setTimeout(() => { // it is not rendered yet
        this.scrollable.container.scrollLeft = 0;
      }, 0);
    });
  }

  public render(emojis: string[], waitForKey: boolean) {
    if(this.init) {
      if(!emojis.length) {
        return;
      }

      this.init();
      this.init = null;
    }
    
    emojis = emojis.slice(0, 80);

    if(emojis.length) {
      this.list.innerHTML = '';
<<<<<<< HEAD
      emojis.forEach(emoji => {
=======
      emojis.forEach((emoji) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        appendEmoji(emoji, this.list, false, true);
      });
    }

    this.waitForKey = waitForKey ? ['ArrowUp', 'ArrowDown'] : undefined;
    this.toggle(!emojis.length);

    /* window.requestAnimationFrame(() => {
      this.container.style.width = (3 * 2) + (emojis.length * 44) + 'px';
    }); */
  }

  public checkQuery(query: string, firstChar: string) {
    const middleware = this.controller.getMiddleware();
<<<<<<< HEAD
    this.appEmojiManager.getBothEmojiKeywords().then(() => {
=======
    this.managers.appEmojiManager.getBothEmojiKeywords().then(async() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!middleware()) {
        return;
      }

      const q = query.replace(/^:/, '');
<<<<<<< HEAD
      const emojis = this.appEmojiManager.searchEmojis(q);
=======
      const emojis = await this.managers.appEmojiManager.searchEmojis(q);
      if(!middleware()) {
        return;
      }
      
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.render(emojis, firstChar !== ':');
      //console.log(emojis);
    });
  }
}
