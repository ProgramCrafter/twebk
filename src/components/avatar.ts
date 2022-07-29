/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import appMessagesManager from "../lib/appManagers/appMessagesManager";
import appProfileManager from "../lib/appManagers/appProfileManager";
import rootScope from "../lib/rootScope";
import { Message, Photo } from "../layer";
import appPeersManager from "../lib/appManagers/appPeersManager";
import appPhotosManager from "../lib/appManagers/appPhotosManager";
import type { LazyLoadQueueIntersector } from "./lazyLoadQueue";
import { attachClickEvent } from "../helpers/dom/clickEvent";
import cancelEvent from "../helpers/dom/cancelEvent";
import appAvatarsManager from "../lib/appManagers/appAvatarsManager";
=======
import rootScope from "../lib/rootScope";
import { Message, Photo } from "../layer";
import type LazyLoadQueue from "./lazyLoadQueue";
import { attachClickEvent } from "../helpers/dom/clickEvent";
import cancelEvent from "../helpers/dom/cancelEvent";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import AppMediaViewer from "./appMediaViewer";
import AppMediaViewerAvatar from "./appMediaViewerAvatar";
import isObject from "../helpers/object/isObject";
import { ArgumentTypes } from "../types";
<<<<<<< HEAD

const onAvatarUpdate = (peerId: PeerId) => {
  appAvatarsManager.removeFromAvatarsCache(peerId);
  (Array.from(document.querySelectorAll('avatar-element[data-peer-id="' + peerId + '"]')) as AvatarElement[]).forEach(elem => {
=======
import putPhoto from "./putPhoto";
import { recordPromise } from "../helpers/recordPromise";

const onAvatarUpdate = (peerId: PeerId) => {
  (Array.from(document.querySelectorAll('avatar-element[data-peer-id="' + peerId + '"]')) as AvatarElement[]).forEach((elem) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    //console.log('updating avatar:', elem);
    elem.update();
  });
};

rootScope.addEventListener('avatar_update', onAvatarUpdate);
<<<<<<< HEAD
rootScope.addEventListener('peer_title_edit', (peerId) => {
  if(!appAvatarsManager.isAvatarCached(peerId)) {
=======
rootScope.addEventListener('peer_title_edit', async(peerId) => {
  if(!(await rootScope.managers.appAvatarsManager.isAvatarCached(peerId))) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    onAvatarUpdate(peerId);
  }
});

export async function openAvatarViewer(
  target: HTMLElement, 
  peerId: PeerId, 
  middleware: () => boolean, 
  message?: any, 
  prevTargets?: {element: HTMLElement, item: Photo.photo['id'] | Message.messageService}[], 
  nextTargets?: typeof prevTargets
) {
<<<<<<< HEAD
  let photo = await appProfileManager.getFullPhoto(peerId);
=======
  let photo = await rootScope.managers.appProfileManager.getFullPhoto(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  if(!middleware() || !photo) {
    return;
  }

  const getTarget = () => {
<<<<<<< HEAD
    const good = Array.from(target.querySelectorAll('img')).find(img => !img.classList.contains('emoji'));
=======
    const good = Array.from(target.querySelectorAll('img')).find((img) => !img.classList.contains('emoji'));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return good ? target : null;
  };

  if(peerId.isAnyChat()) {
    const hadMessage = !!message;
    const inputFilter = 'inputMessagesFilterChatPhotos';
    if(!message) {
<<<<<<< HEAD
      message = await appMessagesManager.getSearch({
=======
      message = await rootScope.managers.appMessagesManager.getSearch({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        peerId, 
        inputFilter: {_: inputFilter}, 
        maxId: 0, 
        limit: 1 
<<<<<<< HEAD
      }).then(value => {
=======
      }).then((value) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        //console.log(lol);
        // ! by descend
        return value.history[0];
      });

      if(!middleware()) {
        return;
      }
    }

    if(message) {
      // ! гений в деле, костылируем (но это гениально)
      const messagePhoto = message.action.photo;
      if(messagePhoto.id !== photo.id) {
        if(!hadMessage) {
<<<<<<< HEAD
          message = appMessagesManager.generateFakeAvatarMessage(peerId, photo);
=======
          message = rootScope.managers.appMessagesManager.generateFakeAvatarMessage(peerId, photo);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        } else {
          
        }
      }

<<<<<<< HEAD
      const f = (arr: typeof prevTargets) => arr.map(el => ({
=======
      const f = (arr: typeof prevTargets) => arr.map((el) => ({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        element: el.element,
        mid: (el.item as Message.messageService).mid,
        peerId: (el.item as Message.messageService).peerId
      }));

      new AppMediaViewer()
      .setSearchContext({
        peerId,
        inputFilter: {_: inputFilter},
      })
      .openMedia(message, getTarget(), undefined, undefined, prevTargets ? f(prevTargets) : undefined, nextTargets ? f(nextTargets) : undefined);

      return;
    }
  }

  if(photo) {
    if(!isObject(message) && message) {
<<<<<<< HEAD
      photo = appPhotosManager.getPhoto(message);
    }
    
    const f = (arr: typeof prevTargets) => arr.map(el => ({
=======
      photo = await rootScope.managers.appPhotosManager.getPhoto(message);
    }
    
    const f = (arr: typeof prevTargets) => arr.map((el) => ({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      element: el.element,
      photoId: el.item as string
    }));

<<<<<<< HEAD
    new AppMediaViewerAvatar(peerId).openMedia(photo.id, getTarget(), undefined, prevTargets ? f(prevTargets) : undefined, nextTargets ? f(nextTargets) : undefined);
=======
    new AppMediaViewerAvatar(peerId).openMedia(
      photo.id, 
      getTarget(), 
      undefined, 
      prevTargets ? f(prevTargets) : undefined, 
      nextTargets ? f(nextTargets) : undefined
    );
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
}

const believeMe: Map<PeerId, Set<AvatarElement>> = new Map();
const seen: Set<PeerId> = new Set();

export default class AvatarElement extends HTMLElement {
  public peerId: PeerId;
  public isDialog: boolean;
  public peerTitle: string;
  public loadPromises: Promise<any>[];
<<<<<<< HEAD
  public lazyLoadQueue: LazyLoadQueueIntersector;
=======
  public lazyLoadQueue: LazyLoadQueue;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public isBig: boolean;
  private addedToQueue = false;

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    const set = believeMe.get(this.peerId);
    if(set && set.has(this)) {
      set.delete(this);
      if(!set.size) {
        believeMe.delete(this.peerId);
      }
    }

    if(this.lazyLoadQueue) {
      this.lazyLoadQueue.unobserve(this);
    }
  }

  public attachClickEvent() {
    let loading = false;
    attachClickEvent(this, async(e) => {
      cancelEvent(e);
      if(loading) return;
      //console.log('avatar clicked');
      const peerId = this.peerId;
      loading = true;
      await openAvatarViewer(this, this.peerId, () => this.peerId === peerId);
      loading = false;
    });
  }

  public updateOptions(options: Partial<ArgumentTypes<AvatarElement['updateWithOptions']>[0]>) {
    for(let i in options) {
      // @ts-ignore
      this[i] = options[i];
    }
  }

  public updateWithOptions(options: {
    peerId: PeerId,
    isDialog?: boolean,
    isBig?: boolean,
    peerTitle?: string,
<<<<<<< HEAD
    lazyLoadQueue?: LazyLoadQueueIntersector,
=======
    lazyLoadQueue?: LazyLoadQueue,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    loadPromises?: Promise<any>[]
  }) {
    const wasPeerId = this.peerId;
    this.updateOptions(options);
    const newPeerId = this.peerId;

    if(wasPeerId === newPeerId) {
      return;
    }

<<<<<<< HEAD
    this.peerId = appPeersManager.getPeerMigratedTo(newPeerId) || newPeerId;
=======
    this.peerId = /* rootScope.managers.appPeersManager.getPeerMigratedTo(newPeerId) ||  */newPeerId;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.dataset.peerId = '' + newPeerId;

    if(wasPeerId) {
      const set = believeMe.get(wasPeerId);
      if(set) {
        set.delete(this);
        if(!set.size) {
          believeMe.delete(wasPeerId);
        }
      }
    }

    return this.update();
  }

  private r(onlyThumb = false) {
<<<<<<< HEAD
    const res = appAvatarsManager.putPhoto(this, this.peerId, this.isDialog, this.peerTitle, onlyThumb, this.isBig);
    const promise = res ? res.loadPromise : Promise.resolve();
    if(this.loadPromises) {
      if(res && res.cached) {
        this.loadPromises.push(promise);
      }
=======
    const promise = putPhoto(this, this.peerId, this.isDialog, this.peerTitle, onlyThumb, this.isBig);
    // recordPromise(promise, 'avatar putPhoto-' + this.peerId);

    if(this.loadPromises) {
      this.loadPromises.push(promise);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      promise.finally(() => {
        this.loadPromises = undefined;
      });
    }

<<<<<<< HEAD
    return res;
=======
    return promise;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public update() {
    if(this.lazyLoadQueue) {
      if(!seen.has(this.peerId)) {
        if(this.addedToQueue) return;
        this.addedToQueue = true;
        
        let set = believeMe.get(this.peerId);
        if(!set) {
          set = new Set();
          believeMe.set(this.peerId, set);
        }
  
        set.add(this);

<<<<<<< HEAD
        this.r(true);

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.lazyLoadQueue.push({
          div: this, 
          load: () => {
            seen.add(this.peerId);
            return this.update();
          }
        });

<<<<<<< HEAD
        return;
=======
        return this.r(true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      } else if(this.addedToQueue) {
        this.lazyLoadQueue.unobserve(this);
      }
    } 
    
    seen.add(this.peerId);
    
<<<<<<< HEAD
    const res = this.r();
    const promise = res ? res.loadPromise : Promise.resolve();
=======
    const promise = this.r();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    if(this.addedToQueue) {
      promise.finally(() => {
        this.addedToQueue = false;
      });
    }

    const set = believeMe.get(this.peerId);
    if(set) {
      set.delete(this);
      const arr = Array.from(set);
      believeMe.delete(this.peerId);
      

      for(let i = 0, length = arr.length; i < length; ++i) {
        arr[i].update();
      }
    }

    return promise;
  }
}

customElements.define('avatar-element', AvatarElement);
