/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import PopupElement from ".";
<<<<<<< HEAD
import appStickersManager, { AppStickersManager } from "../../lib/appManagers/appStickersManager";
import { RichTextProcessor } from "../../lib/richtextprocessor";
import Scrollable from "../scrollable";
import { wrapSticker } from "../wrappers";
import LazyLoadQueue from "../lazyLoadQueue";
import { putPreloader } from "../misc";
import animationIntersector from "../animationIntersector";
import appImManager from "../../lib/appManagers/appImManager";
import { StickerSet } from "../../layer";
=======
import type { AppStickersManager } from "../../lib/appManagers/appStickersManager";
import { wrapSticker } from "../wrappers";
import LazyLoadQueue from "../lazyLoadQueue";
import { putPreloader } from "../putPreloader";
import animationIntersector from "../animationIntersector";
import appImManager from "../../lib/appManagers/appImManager";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import mediaSizes from "../../helpers/mediaSizes";
import { i18n } from "../../lib/langPack";
import Button from "../button";
import findUpClassName from "../../helpers/dom/findUpClassName";
import toggleDisability from "../../helpers/dom/toggleDisability";
import { attachClickEvent } from "../../helpers/dom/clickEvent";
import { toastNew } from "../toast";
import setInnerHTML from "../../helpers/dom/setInnerHTML";
<<<<<<< HEAD
=======
import wrapEmojiText from "../../lib/richTextProcessor/wrapEmojiText";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

const ANIMATION_GROUP = 'STICKERS-POPUP';

export default class PopupStickers extends PopupElement {
  private stickersFooter: HTMLElement;
  private stickersDiv: HTMLElement;
<<<<<<< HEAD
  private h6: HTMLElement;

  private set: StickerSet.stickerSet;

  constructor(private stickerSetInput: Parameters<AppStickersManager['getStickerSet']>[0]) {
    super('popup-stickers', null, {closable: true, overlayClosable: true, body: true});

    this.h6 = document.createElement('h6');
    this.h6.append(i18n('Loading'));

    this.header.append(this.h6);
=======

  constructor(private stickerSetInput: Parameters<AppStickersManager['getStickerSet']>[0]) {
    super('popup-stickers', {closable: true, overlayClosable: true, body: true, scrollable: true, title: true});

    this.title.append(i18n('Loading'));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    this.addEventListener('close', () => {
      animationIntersector.setOnlyOnePlayableGroup('');
    });

    const div = document.createElement('div');
    div.classList.add('sticker-set');

    this.stickersDiv = document.createElement('div');
    this.stickersDiv.classList.add('sticker-set-stickers', 'is-loading');

    attachClickEvent(this.stickersDiv, this.onStickersClick, {listenerSetter: this.listenerSetter});

    putPreloader(this.stickersDiv, true);

    this.stickersFooter = document.createElement('div');
    this.stickersFooter.classList.add('sticker-set-footer');

    div.append(this.stickersDiv);

    const btn = Button('btn-primary btn-primary-transparent disable-hover', {noRipple: true, text: 'Loading'});
    this.stickersFooter.append(btn);

<<<<<<< HEAD
    this.body.append(div);
    const scrollable = new Scrollable(this.body);
=======
    this.scrollable.append(div);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.body.append(this.stickersFooter);
    
    // const editButton = document.createElement('button');
    // editButton.classList.add('btn-primary');

    // this.stickersFooter.append(editButton);

    this.loadStickerSet();
  }

  private onStickersClick = (e: MouseEvent) => {
    const target = findUpClassName(e.target, 'sticker-set-sticker');
    if(!target) return;

    const fileId = target.dataset.docId;
    if(appImManager.chat.input.sendMessageWithDocument(fileId)) {
      this.hide();
    } else {
      console.warn('got no doc by id:', fileId);
    }
  };

  private loadStickerSet() {
<<<<<<< HEAD
    return appStickersManager.getStickerSet(this.stickerSetInput).then(set => {
=======
    return this.managers.appStickersManager.getStickerSet(this.stickerSetInput).then(async(set) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!set) {
        toastNew({langPackKey: 'StickerSet.DontExist'});
        this.hide();
        return;
      }
<<<<<<< HEAD
      //console.log('PopupStickers loadStickerSet got set:', set);

      this.set = set.set;

      animationIntersector.setOnlyOnePlayableGroup(ANIMATION_GROUP);

      setInnerHTML(this.h6, RichTextProcessor.wrapEmojiText(set.set.title));
      this.stickersFooter.classList.toggle('add', !set.set.installed_date);

      let button: HTMLElement;
      if(set.set.installed_date) {
        button = Button('btn-primary btn-primary-transparent danger', {noRipple: true});
        button.append(i18n('RemoveStickersCount', [i18n('Stickers', [set.set.count])]));
      } else {
        button = Button('btn-primary btn-color-primary', {noRipple: true});
        button.append(i18n('AddStickersCount', [i18n('Stickers', [set.set.count])]));
      }

      this.stickersFooter.textContent = '';
      this.stickersFooter.append(button);

      attachClickEvent(button, () => {
        const toggle = toggleDisability([button], true);

        appStickersManager.toggleStickerSet(this.set).then(() => {
=======

      animationIntersector.setOnlyOnePlayableGroup(ANIMATION_GROUP);

      let button: HTMLElement;
      const s = i18n('Stickers', [set.set.count]);
      if(set.set.installed_date) {
        button = Button('btn-primary btn-primary-transparent danger', {noRipple: true});
        button.append(i18n('RemoveStickersCount', [s]));
      } else {
        button = Button('btn-primary btn-color-primary', {noRipple: true});
        button.append(i18n('AddStickersCount', [s]));
      }

      attachClickEvent(button, () => {
        const toggle = toggleDisability([button], true);

        this.managers.appStickersManager.toggleStickerSet(set.set).then(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          this.hide();
        }).catch(() => {
          toggle();
        });
      });

      const lazyLoadQueue = new LazyLoadQueue();
<<<<<<< HEAD
      
      this.stickersDiv.classList.remove('is-loading');
      this.stickersDiv.innerHTML = '';
      for(let doc of set.documents) {
        if(doc._ === 'documentEmpty') {
          continue;
=======
      const divs = await Promise.all(set.documents.map(async(doc) => {
        if(doc._ === 'documentEmpty') {
          return;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }
        
        const div = document.createElement('div');
        div.classList.add('sticker-set-sticker');

        const size = mediaSizes.active.esgSticker.width;
        
<<<<<<< HEAD
        wrapSticker({
=======
        await wrapSticker({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          doc, 
          div, 
          lazyLoadQueue, 
          group: ANIMATION_GROUP, 
          play: true,
          loop: true,
          width: size,
          height: size
        });

<<<<<<< HEAD
        this.stickersDiv.append(div);
      }
=======
        return div;
      }));

      setInnerHTML(this.title, wrapEmojiText(set.set.title));
      this.stickersFooter.classList.toggle('add', !set.set.installed_date);
      this.stickersFooter.textContent = '';
      this.stickersFooter.append(button);

      this.stickersDiv.classList.remove('is-loading');
      this.stickersDiv.innerHTML = '';
      this.stickersDiv.append(...divs.filter(Boolean));

      this.scrollable.onAdditionalScroll();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }
}
