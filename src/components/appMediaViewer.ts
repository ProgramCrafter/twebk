/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import MEDIA_MIME_TYPES_SUPPORTED from "../environment/mediaMimeTypesSupport";
import cancelEvent from "../helpers/dom/cancelEvent";
import { attachClickEvent, detachClickEvent } from "../helpers/dom/clickEvent";
<<<<<<< HEAD
=======
import findUpClassName from "../helpers/dom/findUpClassName";
import findUpTag from "../helpers/dom/findUpTag";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import setInnerHTML from "../helpers/dom/setInnerHTML";
import mediaSizes from "../helpers/mediaSizes";
import SearchListLoader from "../helpers/searchListLoader";
import { Message } from "../layer";
<<<<<<< HEAD
import appDocsManager, { MyDocument } from "../lib/appManagers/appDocsManager";
import appImManager from "../lib/appManagers/appImManager";
import appMessagesManager, { MyMessage } from "../lib/appManagers/appMessagesManager";
import appPhotosManager, { MyPhoto } from "../lib/appManagers/appPhotosManager";
import RichTextProcessor from "../lib/richtextprocessor";
=======
import type { MyDocument } from "../lib/appManagers/appDocsManager";
import appDownloadManager from "../lib/appManagers/appDownloadManager";
import appImManager from "../lib/appManagers/appImManager";
import { MyMessage } from "../lib/appManagers/appMessagesManager";
import { MyPhoto } from "../lib/appManagers/appPhotosManager";
import getMediaFromMessage from "../lib/appManagers/utils/messages/getMediaFromMessage";
import wrapRichText from "../lib/richTextProcessor/wrapRichText";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { MediaSearchContext } from "./appMediaPlaybackController";
import AppMediaViewerBase, { MEDIA_VIEWER_CLASSNAME } from "./appMediaViewerBase";
import { ButtonMenuItemOptions } from "./buttonMenu";
import PopupDeleteMessages from "./popups/deleteMessages";
import PopupForward from "./popups/forward";
import Scrollable from "./scrollable";
import appSidebarRight from "./sidebarRight";
import AppSharedMediaTab from "./sidebarRight/tabs/sharedMedia";

type AppMediaViewerTargetType = {
  element: HTMLElement,
  mid: number,
  peerId: PeerId
};
export default class AppMediaViewer extends AppMediaViewerBase<'caption', 'delete' | 'forward', AppMediaViewerTargetType> {
  protected listLoader: SearchListLoader<AppMediaViewerTargetType>;
  protected btnMenuForward: ButtonMenuItemOptions;
  protected btnMenuDownload: ButtonMenuItemOptions;
  protected btnMenuDelete: ButtonMenuItemOptions;

  get searchContext() {
    return this.listLoader.searchContext;
  }

  constructor() {
    super(new SearchListLoader({
      processItem: (item) => {
        const isForDocument = this.searchContext.inputFilter._ === 'inputMessagesFilterDocument';
        const {mid, peerId} = item;
<<<<<<< HEAD
        const media: MyPhoto | MyDocument = appMessagesManager.getMediaFromMessage(item);
=======
        const media: MyPhoto | MyDocument = getMediaFromMessage(item);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        if(!media) return;
        
        if(isForDocument && !AppMediaViewer.isMediaCompatibleForDocumentViewer(media)) {
          return;
        }

        return {element: null as HTMLElement, mid, peerId};
      }
    }), ['delete', 'forward']);

    this.listLoader.onEmptied = () => {
      this.close();
    };

    /* const stub = document.createElement('div');
    stub.classList.add(MEDIA_VIEWER_CLASSNAME + '-stub');
    this.content.main.prepend(stub); */

    this.content.caption = document.createElement('div');
    this.content.caption.classList.add(MEDIA_VIEWER_CLASSNAME + '-caption', 'message'/* , 'media-viewer-stub' */);

    let captionTimeout: number;
    const setCaptionTimeout = () => {
      if(captionTimeout) {
        clearTimeout(captionTimeout);
      }

      captionTimeout = window.setTimeout(() => {
        captionTimeout = undefined;
        this.content.caption.classList.remove('is-focused');
      }, 800);
    };
    this.content.caption.addEventListener('touchstart', () => {
      if(!mediaSizes.isMobile) return;

      this.content.caption.classList.add('is-focused');
      
      if(captionTimeout) {
        clearTimeout(captionTimeout);
        captionTimeout = undefined;
      }
      
      document.addEventListener('touchend', setCaptionTimeout, {once: true});
    });

    const captionScrollable = new Scrollable(this.content.caption);
    captionScrollable.onAdditionalScroll = setCaptionTimeout;

    //this.content.main.append(this.content.caption);
    this.wholeDiv.append(this.content.caption);

    attachClickEvent(this.buttons.delete, this.onDeleteClick);

    const buttons: ButtonMenuItemOptions[] = [this.btnMenuForward = {
      icon: 'forward',
      text: 'Forward',
      onClick: this.onForwardClick
    }, this.btnMenuDownload = {
      icon: 'download',
      text: 'MediaViewer.Context.Download',
      onClick: this.onDownloadClick
    }, this.btnMenuDelete = {
      icon: 'delete danger',
      text: 'Delete',
      onClick: this.onDeleteClick
    }];

    this.setBtnMenuToggle(buttons);

    // * constructing html end
    
    this.setListeners();
  }

  protected setListeners() {
    super.setListeners();
    attachClickEvent(this.buttons.forward, this.onForwardClick);
    attachClickEvent(this.author.container, this.onAuthorClick);

    const onCaptionClick = (e: MouseEvent) => {
<<<<<<< HEAD
      if(e.target instanceof HTMLAnchorElement) { // close viewer if it's t.me/ redirect
        const onclick = (e.target as HTMLElement).getAttribute('onclick');
=======
      const a = findUpTag(e.target, 'A');
      const spoiler = findUpClassName(e.target, 'spoiler');
      if(a instanceof HTMLAnchorElement && (!spoiler || this.content.caption.classList.contains('is-spoiler-visible'))) { // close viewer if it's t.me/ redirect
        const onclick = a.getAttribute('onclick');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(!onclick || onclick.includes('showMaskedAlert')) {
          return;
        }

        cancelEvent(e);

        this.close().then(() => {
<<<<<<< HEAD
          detachClickEvent(this.content.caption, onCaptionClick, {capture: true});
          (e.target as HTMLAnchorElement).click();
=======
          this.content.caption.removeEventListener('click', onCaptionClick, {capture: true});
          a.click();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        });

        return false;
      }
    };

<<<<<<< HEAD
    attachClickEvent(this.content.caption, onCaptionClick, {capture: true});
=======
    this.content.caption.addEventListener('click', onCaptionClick, {capture: true});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  /* public close(e?: MouseEvent) {
    const good = !this.setMoverAnimationPromise;
    const promise = super.close(e);

    if(good) { // clear
      this.currentMessageId = 0;
      this.peerId = 0;
    }

    return promise;
  } */

  protected getMessageByPeer(peerId: PeerId, mid: number) {
<<<<<<< HEAD
    return this.searchContext.isScheduled ? appMessagesManager.getScheduledMessageByPeer(peerId, mid) : appMessagesManager.getMessageByPeer(peerId, mid);
  }

  onPrevClick = (target: AppMediaViewerTargetType) => {
    this.openMedia(this.getMessageByPeer(target.peerId, target.mid), target.element, -1);
  };

  onNextClick = (target: AppMediaViewerTargetType) => {
    this.openMedia(this.getMessageByPeer(target.peerId, target.mid), target.element, 1);
=======
    return this.searchContext.isScheduled ? this.managers.appMessagesManager.getScheduledMessageByPeer(peerId, mid) : this.managers.appMessagesManager.getMessageByPeer(peerId, mid);
  }

  onPrevClick = async(target: AppMediaViewerTargetType) => {
    this.openMedia(await this.getMessageByPeer(target.peerId, target.mid), target.element, -1);
  };

  onNextClick = async(target: AppMediaViewerTargetType) => {
    this.openMedia(await this.getMessageByPeer(target.peerId, target.mid), target.element, 1);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  onDeleteClick = () => {
    const target = this.target;
    new PopupDeleteMessages(target.peerId, [target.mid], 'chat', () => {
      this.target = {element: this.content.media} as any;
      this.close();
    });
  };

  onForwardClick = () => {
    const target = this.target;
    if(target.mid) {
      //appSidebarRight.forwardTab.open([target.mid]);
      new PopupForward({
        [target.peerId]: [target.mid]
      }, () => {
        return this.close();
      });
    }
  };

<<<<<<< HEAD
  onAuthorClick = (e: MouseEvent) => {
    const {mid, peerId} = this.target;
    if(mid && mid !== Number.MAX_SAFE_INTEGER) {
      const threadId = this.searchContext.threadId;
      const message = this.getMessageByPeer(peerId, mid);
=======
  onAuthorClick = async(e: MouseEvent) => {
    const {mid, peerId} = this.target;
    if(mid && mid !== Number.MAX_SAFE_INTEGER) {
      const threadId = this.searchContext.threadId;
      const message = await this.getMessageByPeer(peerId, mid);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.close(e)
      //.then(() => mediaSizes.isMobile ? appSidebarRight.sharedMediaTab.closeBtn.click() : Promise.resolve())
      .then(async() => {
        if(mediaSizes.isMobile) {
          const tab = appSidebarRight.getTab(AppSharedMediaTab);
          if(tab) {
            tab.close();
          }
        }
<<<<<<< HEAD

=======
        
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        appImManager.setInnerPeer({
          peerId: message.peerId, 
          lastMsgId: mid, 
          type: threadId ? 'discussion' : undefined, 
          threadId
        });
      });
    }
  };

<<<<<<< HEAD
  onDownloadClick = () => {
    const {peerId, mid} = this.target;
    const message = this.getMessageByPeer(peerId, mid);
    if(message.media.photo) {
      appPhotosManager.savePhotoFile(message.media.photo, appImManager.chat.bubbles.lazyLoadQueue.queueId);
    } else {
      let document: MyDocument = null;

      if(message.media.webpage) document = message.media.webpage.document;
      else document = message.media.document;

      if(document) {
        //console.log('will save document:', document);
        appDocsManager.saveDocFile(document, appImManager.chat.bubbles.lazyLoadQueue.queueId);
      }
    }
=======
  onDownloadClick = async() => {
    const {peerId, mid} = this.target;
    const message = await this.getMessageByPeer(peerId, mid);
    const media = getMediaFromMessage(message);
    if(!media) return;
    appDownloadManager.downloadToDisc({media, queueId: appImManager.chat.bubbles.lazyLoadQueue.queueId});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  private setCaption(message: MyMessage) {
    const caption = (message as Message.message).message;
    let html: Parameters<typeof setInnerHTML>[1] = '';
    if(caption) {
<<<<<<< HEAD
      html = RichTextProcessor.wrapRichText(caption, {
=======
      html = wrapRichText(caption, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        entities: (message as Message.message).totalEntities
      });
    }
    
    // html = 'Dandelion are a family of flowering plants that grow in many parts of the world.';
    setInnerHTML(this.content.caption.firstElementChild, html);
    this.content.caption.classList.toggle('hide', !caption);
    // this.content.container.classList.toggle('with-caption', !!caption);
  }

  public setSearchContext(context: MediaSearchContext) {
    this.listLoader.setSearchContext(context);

    return this;
  }

  public async openMedia(message: MyMessage, target?: HTMLElement, fromRight = 0, reverse = false, 
    prevTargets: AppMediaViewerTargetType[] = [], nextTargets: AppMediaViewerTargetType[] = []/* , needLoadMore = true */) {
    if(this.setMoverPromise) return this.setMoverPromise;

    const mid = message.mid;
    const fromId = (message as Message.message).fwd_from && !message.fromId ? (message as Message.message).fwd_from.from_name : message.fromId;
<<<<<<< HEAD
    const media = appMessagesManager.getMediaFromMessage(message);

    const cantForwardMessage = message._ === 'messageService' || !appMessagesManager.canForward(message);
    [this.buttons.forward, this.btnMenuForward.element].forEach(button => {
=======
    const media = getMediaFromMessage(message);

    const cantForwardMessage = message._ === 'messageService' || !this.managers.appMessagesManager.canForward(message);
    [this.buttons.forward, this.btnMenuForward.element].forEach((button) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      button.classList.toggle('hide', cantForwardMessage);
    });

    this.wholeDiv.classList.toggle('no-forwards', cantForwardMessage);
    
    const cantDownloadMessage = cantForwardMessage;
<<<<<<< HEAD
    [this.buttons.download, this.btnMenuDownload.element].forEach(button => {
      button.classList.toggle('hide', cantDownloadMessage);
    });

    const canDeleteMessage = appMessagesManager.canDeleteMessage(message);
    [this.buttons.delete, this.btnMenuDelete.element].forEach(button => {
=======
    [this.buttons.download, this.btnMenuDownload.element].forEach((button) => {
      button.classList.toggle('hide', cantDownloadMessage);
    });

    const canDeleteMessage = this.managers.appMessagesManager.canDeleteMessage(message);
    [this.buttons.delete, this.btnMenuDelete.element].forEach((button) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      button.classList.toggle('hide', !canDeleteMessage);
    });

    this.setCaption(message);
    const promise = super._openMedia(media, message.date, fromId, fromRight, target, reverse, prevTargets, nextTargets, message/* , needLoadMore */);
    this.target.mid = mid;
    this.target.peerId = message.peerId;

    return promise;
  }

  public static isMediaCompatibleForDocumentViewer(media: MyPhoto | MyDocument) {
    return media._ === 'photo' || MEDIA_MIME_TYPES_SUPPORTED.has(media.mime_type);
  }
}
