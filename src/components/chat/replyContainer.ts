/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import replaceContent from "../../helpers/dom/replaceContent";
import limitSymbols from "../../helpers/string/limitSymbols";
import appImManager, { CHAT_ANIMATION_GROUP } from "../../lib/appManagers/appImManager";
<<<<<<< HEAD
import appMessagesManager from "../../lib/appManagers/appMessagesManager";
import appPhotosManager from "../../lib/appManagers/appPhotosManager";
import { RichTextProcessor } from "../../lib/richtextprocessor";
import DivAndCaption from "../divAndCaption";
import { wrapPhoto, wrapSticker } from "../wrappers";

const MEDIA_SIZE = 32;

export function wrapReplyDivAndCaption(options: {
=======
import choosePhotoSize from "../../lib/appManagers/utils/photos/choosePhotoSize";
import wrapEmojiText from "../../lib/richTextProcessor/wrapEmojiText";
import DivAndCaption from "../divAndCaption";
import { wrapPhoto, wrapSticker } from "../wrappers";
import wrapMessageForReply from "../wrappers/messageForReply";

const MEDIA_SIZE = 32;

export async function wrapReplyDivAndCaption(options: {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  title: string | HTMLElement | DocumentFragment,
  titleEl: HTMLElement,
  subtitle: string | HTMLElement | DocumentFragment,
  subtitleEl: HTMLElement,
  message: any,
  mediaEl: HTMLElement,
  loadPromises?: Promise<any>[]
}) {
  let {title, titleEl, subtitle, subtitleEl, mediaEl, message, loadPromises} = options;
  if(title !== undefined) {
    if(typeof(title) === 'string') {
      title = limitSymbols(title, 140);
<<<<<<< HEAD
      title = RichTextProcessor.wrapEmojiText(title);
=======
      title = wrapEmojiText(title);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    replaceContent(titleEl, title);
  }

  if(!loadPromises) {
    loadPromises = [];
  }

  let media = message && message.media;
  let setMedia = false, isRound = false;
  const mediaChildren = mediaEl ? Array.from(mediaEl.children).slice() : [];
  let middleware: () => boolean;
  if(media && mediaEl) {
    subtitleEl.textContent = '';
<<<<<<< HEAD
    subtitleEl.append(appMessagesManager.wrapMessageForReply(message, undefined, undefined, undefined, undefined, true));
=======
    subtitleEl.append(await wrapMessageForReply(message, undefined, undefined, undefined, undefined, true));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    //console.log('wrap reply', media);

    if(media.webpage) {
      media = media.webpage;
    }
    
    if(media.photo || (media.document && media.document.thumbs?.length)/* ['video', 'sticker', 'gif', 'round', 'photo', 'audio'].indexOf(media.document.type) !== -1) */) {
      middleware = appImManager.chat.bubbles.getMiddleware();
      const lazyLoadQueue = appImManager.chat.bubbles.lazyLoadQueue;

      if(media.document?.type === 'sticker') {
        setMedia = true;
<<<<<<< HEAD
        wrapSticker({
=======
        await wrapSticker({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          doc: media.document,
          div: mediaEl,
          lazyLoadQueue,
          group: CHAT_ANIMATION_GROUP,
          //onlyThumb: media.document.sticker === 2,
          width: MEDIA_SIZE,
          height: MEDIA_SIZE,
          middleware,
          loadPromises
        });
      } else {
        const photo = media.photo || media.document;

        isRound = photo.type === 'round';

        try {
<<<<<<< HEAD
          wrapPhoto({
=======
          await wrapPhoto({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            photo,
            container: mediaEl,
            boxWidth: MEDIA_SIZE,
            boxHeight: MEDIA_SIZE,
<<<<<<< HEAD
            size: appPhotosManager.choosePhotoSize(photo, MEDIA_SIZE, MEDIA_SIZE),
=======
            size: choosePhotoSize(photo, MEDIA_SIZE, MEDIA_SIZE),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            middleware,
            lazyLoadQueue,
            noBlur: true,
            withoutPreloader: true,
            loadPromises
          });
          setMedia = true;
        } catch(err) {

        }
      }
    }
  } else {
    if(message) {
      subtitleEl.textContent = '';
<<<<<<< HEAD
      subtitleEl.append(appMessagesManager.wrapMessageForReply(message));
    } else {
      if(typeof(subtitle) === 'string') {
        subtitle = limitSymbols(subtitle, 140);
        subtitle = RichTextProcessor.wrapEmojiText(subtitle);
=======
      subtitleEl.append(await wrapMessageForReply(message));
    } else {
      if(typeof(subtitle) === 'string') {
        subtitle = limitSymbols(subtitle, 140);
        subtitle = wrapEmojiText(subtitle);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      replaceContent(subtitleEl, subtitle || '');
    }
  }

  Promise.all(loadPromises).then(() => {
    if(middleware && !middleware()) return;
<<<<<<< HEAD
    mediaChildren.forEach(child => child.remove());
=======
    mediaChildren.forEach((child) => child.remove());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    if(mediaEl) {
      mediaEl.classList.toggle('is-round', isRound);
    }
  });

  return setMedia;
}

<<<<<<< HEAD
export default class ReplyContainer extends DivAndCaption<(title: string | HTMLElement | DocumentFragment, subtitle: string | HTMLElement | DocumentFragment, message?: any) => void> {
  private mediaEl: HTMLElement;

  constructor(protected className: string) {
    super(className, (title, subtitle = '', message?) => {
=======
export default class ReplyContainer extends DivAndCaption<(title: string | HTMLElement | DocumentFragment, subtitle: string | HTMLElement | DocumentFragment, message?: any) => Promise<void>> {
  private mediaEl: HTMLElement;

  constructor(protected className: string) {
    super(className, async(title, subtitle = '', message?) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!this.mediaEl) {
        this.mediaEl = document.createElement('div');
        this.mediaEl.classList.add(this.className + '-media');
      }

<<<<<<< HEAD
      const isMediaSet = wrapReplyDivAndCaption({
=======
      const isMediaSet = await wrapReplyDivAndCaption({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        title,
        titleEl: this.title,
        subtitle,
        subtitleEl: this.subtitle,
        mediaEl: this.mediaEl,
        message
      });
      
      this.container.classList.toggle('is-media', isMediaSet);
      if(isMediaSet) {
        this.content.prepend(this.mediaEl);
      } else {
        this.mediaEl.remove();
      }
    });
  }
}
