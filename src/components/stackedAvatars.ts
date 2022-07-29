/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import AvatarElement from "./avatar";
<<<<<<< HEAD
import type { LazyLoadQueueIntersector } from "./lazyLoadQueue";
=======
import type LazyLoadQueue from "./lazyLoadQueue";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

const CLASS_NAME = 'stacked-avatars';
const AVATAR_CLASS_NAME = CLASS_NAME + '-avatar';
const AVATAR_CONTAINER_CLASS_NAME = AVATAR_CLASS_NAME + '-container';

export default class StackedAvatars {
  public container: HTMLElement;
<<<<<<< HEAD
  private lazyLoadQueue: LazyLoadQueueIntersector;
  private avatarSize: number;

  constructor(options: {
    lazyLoadQueue?: LazyLoadQueueIntersector,
    avatarSize: number
=======
  private lazyLoadQueue: LazyLoadQueue;
  private avatarSize: number;

  constructor(options: {
    lazyLoadQueue?: StackedAvatars['lazyLoadQueue'],
    avatarSize: StackedAvatars['avatarSize']
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }) {
    this.lazyLoadQueue = options.lazyLoadQueue;
    this.avatarSize = options.avatarSize;

    this.container = document.createElement('div');
    this.container.classList.add(CLASS_NAME);

    this.container.style.setProperty('--avatar-size', options.avatarSize + 'px');
  }
  /**
   * MACOS, ANDROID - без реверса
   * WINDOWS DESKTOP - реверс
   * все приложения накладывают аватарку первую на вторую, а в макете зато вторая на первую, ЛОЛ!
   */
  public render(peerIds: PeerId[], loadPromises?: Promise<any>[]) {
    const children = this.container.children;
    peerIds = peerIds.slice().reverse();
    if(peerIds.length > 3) {
      peerIds = peerIds.slice(-3);
    }

    peerIds.forEach((peerId, idx) => {
      let avatarContainer = children[idx] as HTMLElement;
      if(!avatarContainer) {
        avatarContainer = document.createElement('div');
        avatarContainer.classList.add(AVATAR_CONTAINER_CLASS_NAME);
      }

      let avatarElem = avatarContainer.firstElementChild as AvatarElement;
      if(!avatarElem) {
        avatarElem = new AvatarElement();
        avatarElem.classList.add('avatar-' + this.avatarSize, AVATAR_CLASS_NAME);
        avatarElem.updateOptions({
          isDialog: false,
          loadPromises
        });
      }

      avatarElem.updateWithOptions({
        lazyLoadQueue: this.lazyLoadQueue,
        peerId: peerId
      });
      
      if(!avatarElem.parentNode) {
        avatarContainer.append(avatarElem);
      }

      if(!avatarContainer.parentNode) {
        this.container.append(avatarContainer);
      }
    });

    // if were 3 and became 2
<<<<<<< HEAD
    (Array.from(children) as HTMLElement[]).slice(peerIds.length).forEach(el => el.remove());
=======
    (Array.from(children) as HTMLElement[]).slice(peerIds.length).forEach((el) => el.remove());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
}
