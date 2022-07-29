/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { MOUNT_CLASS_TO } from "../config/debug";
import appPeersManager from "../lib/appManagers/appPeersManager";
import rootScope from "../lib/rootScope";
import { i18n } from "../lib/langPack";
import replaceContent from "../helpers/dom/replaceContent";
import appUsersManager from "../lib/appManagers/appUsersManager";
import RichTextProcessor from "../lib/richtextprocessor";
import { NULL_PEER_ID } from "../lib/mtproto/mtproto_config";
import limitSymbols from "../helpers/string/limitSymbols";
import setInnerHTML from "../helpers/dom/setInnerHTML";
=======
import rootScope from "../lib/rootScope";
import { i18n } from "../lib/langPack";
import replaceContent from "../helpers/dom/replaceContent";
import { NULL_PEER_ID } from "../lib/mtproto/mtproto_config";
import limitSymbols from "../helpers/string/limitSymbols";
import setInnerHTML from "../helpers/dom/setInnerHTML";
import { AppManagers } from "../lib/appManagers/managers";
import wrapEmojiText from "../lib/richTextProcessor/wrapEmojiText";
import getPeerTitle from "./wrappers/getPeerTitle";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type PeerTitleOptions = {
  peerId?: PeerId,
  fromName?: string,
  plainText?: boolean,
  onlyFirstName?: boolean,
  dialog?: boolean,
<<<<<<< HEAD
  limitSymbols?: number
=======
  limitSymbols?: number,
  managers?: AppManagers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
};

const weakMap: WeakMap<HTMLElement, PeerTitle> = new WeakMap();

<<<<<<< HEAD
MOUNT_CLASS_TO.peerTitleWeakMap = weakMap;

rootScope.addEventListener('peer_title_edit', (peerId) => {
  const elements = Array.from(document.querySelectorAll(`.peer-title[data-peer-id="${peerId}"]`)) as HTMLElement[];
  elements.forEach(element => {
=======
rootScope.addEventListener('peer_title_edit', (peerId) => {
  const elements = Array.from(document.querySelectorAll(`.peer-title[data-peer-id="${peerId}"]`)) as HTMLElement[];
  elements.forEach((element) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const peerTitle = weakMap.get(element);
    //console.log('in the summer silence i was doing nothing', peerTitle, peerId);

    if(peerTitle) {
      peerTitle.update();
    }
  });
});

export default class PeerTitle {
  public element: HTMLElement;
  public peerId: PeerId;
<<<<<<< HEAD
  public fromName: string;
  public plainText = false;
  public onlyFirstName = false;
  public dialog = false;
  public limitSymbols: number;

  constructor(options: PeerTitleOptions) {
    this.element = document.createElement('span');
    this.element.classList.add('peer-title');
    this.element.setAttribute('dir', 'auto');
    
    this.update(options);
    weakMap.set(this.element, this);
  }

  public update(options?: PeerTitleOptions) {
    if(options) {
      for(let i in options) {
        // @ts-ignore
        this.element.dataset[i] = options[i] ? '' + (typeof(options[i]) === 'boolean' ? +options[i] : options[i]) : '0';
        // @ts-ignore
        this[i] = options[i];
      }
    }

=======
  private fromName: string;
  private plainText = false;
  private onlyFirstName = false;
  private dialog = false;
  private limitSymbols: number;
  private managers: AppManagers;

  constructor(options?: PeerTitleOptions) {
    this.element = document.createElement('span');
    this.element.classList.add('peer-title');
    this.element.setAttribute('dir', 'auto');

    if(options) {
      this.update(options);
    }
    
    weakMap.set(this.element, this);
  }

  public setOptions(options?: PeerTitleOptions) {
    if(!options) {
      return;
    }

    for(const i in options) {
      // @ts-ignore
      const value = options[i];

      if(typeof(value) !== 'object') {
        // @ts-ignore
        this.element.dataset[i] = value ? '' + (typeof(value) === 'boolean' ? +value : value) : '0';
      }

      // @ts-ignore
      this[i] = value;
    }
  }

  public async update(options?: PeerTitleOptions) {
    this.setOptions(options);

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    let fromName = this.fromName;
    if(fromName !== undefined) {
      if(this.limitSymbols !== undefined) {
        fromName = limitSymbols(fromName, this.limitSymbols, this.limitSymbols);
      }

<<<<<<< HEAD
      setInnerHTML(this.element, RichTextProcessor.wrapEmojiText(fromName));
=======
      setInnerHTML(this.element, wrapEmojiText(fromName));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return;
    }

    if(this.peerId === undefined) {
      this.peerId = NULL_PEER_ID;
    }

    if(this.peerId !== rootScope.myId || !this.dialog) {
<<<<<<< HEAD
      if(this.peerId.isUser() && appUsersManager.getUser(this.peerId).pFlags.deleted) {
        replaceContent(this.element, i18n(this.onlyFirstName ? 'Deleted' : 'HiddenName'));
      } else {
        setInnerHTML(this.element, appPeersManager.getPeerTitle(this.peerId, this.plainText, this.onlyFirstName, this.limitSymbols));
      }
=======
      const managers = this.managers ?? rootScope.managers;
      setInnerHTML(this.element, await getPeerTitle(this.peerId, this.plainText, this.onlyFirstName, this.limitSymbols, managers));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    } else {
      replaceContent(this.element, i18n(this.onlyFirstName ? 'Saved' : 'SavedMessages'));
    }
  }
}
