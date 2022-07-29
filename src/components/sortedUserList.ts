/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import type { LazyLoadQueueIntersector } from "./lazyLoadQueue";
import appDialogsManager, { AppDialogsManager, DialogDom } from "../lib/appManagers/appDialogsManager";
import { getHeavyAnimationPromise } from "../hooks/useHeavyAnimationCheck";
import appUsersManager from "../lib/appManagers/appUsersManager";
=======
import appDialogsManager, { AppDialogsManager, DialogDom } from "../lib/appManagers/appDialogsManager";
import { getHeavyAnimationPromise } from "../hooks/useHeavyAnimationCheck";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import isInDOM from "../helpers/dom/isInDOM";
import positionElementByIndex from "../helpers/dom/positionElementByIndex";
import replaceContent from "../helpers/dom/replaceContent";
import { fastRaf } from "../helpers/schedulers";
import SortedList, { SortedElementBase } from "../helpers/sortedList";
import safeAssign from "../helpers/object/safeAssign";
<<<<<<< HEAD
=======
import { AppManagers } from "../lib/appManagers/managers";
import getUserStatusString from "./wrappers/getUserStatusString";
import type LazyLoadQueue from "./lazyLoadQueue";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

interface SortedUser extends SortedElementBase {
  dom: DialogDom
}

export default class SortedUserList extends SortedList<SortedUser> {
  protected static SORT_INTERVAL = 30e3;
  public list: HTMLUListElement;
  
<<<<<<< HEAD
  protected lazyLoadQueue: LazyLoadQueueIntersector;
=======
  protected lazyLoadQueue: LazyLoadQueue;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  protected avatarSize = 48;
  protected rippleEnabled = true;
  protected autonomous = true;
  protected createChatListOptions: Parameters<AppDialogsManager['createChatList']>[0];
  protected onListLengthChange: () => void;
  protected getIndex: (element: SortedUser) => number;
  protected onUpdate: (element: SortedUser) => void;
<<<<<<< HEAD
=======
  protected managers: AppManagers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  constructor(options: Partial<{
    lazyLoadQueue: SortedUserList['lazyLoadQueue'],
    avatarSize: SortedUserList['avatarSize'],
    rippleEnabled: SortedUserList['rippleEnabled'],
    createChatListOptions: SortedUserList['createChatListOptions'],
    autonomous: SortedUserList['autonomous'],
    onListLengthChange: SortedUserList['onListLengthChange'],
    getIndex: SortedUserList['getIndex'],
    onUpdate: SortedUserList['onUpdate']
<<<<<<< HEAD
  }> = {}) {
    super({
      getIndex: options.getIndex || ((element) => appUsersManager.getUserStatusForSort(element.id)),
=======
  }> & {
    managers: SortedUserList['managers']
  }) {
    super({
      getIndex: options.getIndex || ((element) => this.managers.appUsersManager.getUserStatusForSort(element.id)),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      onDelete: (element) => {
        element.dom.listEl.remove();
        this.onListLengthChange && this.onListLengthChange();
      },
<<<<<<< HEAD
      onUpdate: options.onUpdate || ((element) => {
        const status = appUsersManager.getUserStatusString(element.id);
=======
      onUpdate: options.onUpdate || (async(element) => {
        const status = getUserStatusString(await this.managers.appUsersManager.getUser(element.id));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        replaceContent(element.dom.lastMessageSpan, status);
      }),
      onSort: (element, idx) => {
        const willChangeLength = element.dom.listEl.parentElement !== this.list;
        positionElementByIndex(element.dom.listEl, this.list, idx);

        if(willChangeLength && this.onListLengthChange) {
          this.onListLengthChange();
        }
      },
      onElementCreate: (base) => {
        const {dom} = appDialogsManager.addDialogNew({
<<<<<<< HEAD
          dialog: base.id,
          container: false,
          drawStatus: false,
=======
          peerId: base.id,
          container: false,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          avatarSize: this.avatarSize,
          autonomous: this.autonomous,
          meAsSaved: false,
          rippleEnabled: this.rippleEnabled,
          lazyLoadQueue: this.lazyLoadQueue
        });

        (base as SortedUser).dom = dom;
        return base as SortedUser;
      },
      updateElementWith: fastRaf,
      updateListWith: async(callback) => {
        if(!isInDOM(this.list)) {
          return callback(false);
        }
    
        await getHeavyAnimationPromise();
    
        if(!isInDOM(this.list)) {
          return callback(false);
        }

        callback(true);
      }
    });

    safeAssign(this, options);

    this.list = appDialogsManager.createChatList(this.createChatListOptions);

    let timeout: number;
    const doTimeout = () => {
      timeout = window.setTimeout(() => {
        this.updateList((good) => {
          if(good) {
            doTimeout();
          }
        });
      }, SortedUserList.SORT_INTERVAL);
    };

    doTimeout();
  }
}
