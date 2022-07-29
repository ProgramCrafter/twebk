/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */
<<<<<<< HEAD

import type { Chat, DialogPeer, Message, MessagesPeerDialogs, Update } from "../../layer";
import type { AppChatsManager } from "../appManagers/appChatsManager";
import type { AppMessagesManager, Dialog, MyMessage } from "../appManagers/appMessagesManager";
import type { AppPeersManager } from "../appManagers/appPeersManager";
import type { AppUsersManager } from "../appManagers/appUsersManager";
import type { AppDraftsManager } from "../appManagers/appDraftsManager";
import type { AppNotificationsManager } from "../appManagers/appNotificationsManager";
import type { ApiUpdatesManager } from "../appManagers/apiUpdatesManager";
import type { ServerTimeManager } from "../mtproto/serverTimeManager";
import type { AppMessagesIdsManager } from "../appManagers/appMessagesIdsManager";
import { tsNow } from "../../helpers/date";
import apiManager from "../mtproto/mtprotoworker";
import SearchIndex from "../searchIndex";
import rootScope from "../rootScope";
import { AppStateManager } from "../appManagers/appStateManager";
import { SliceEnd } from "../../helpers/slicedArray";
import { MyDialogFilter } from "./filters";
import { NULL_PEER_ID } from "../mtproto/mtproto_config";
import { NoneToVoidFunction } from "../../types";
import ctx from "../../environment/ctx";
import AppStorage from "../storage";
import type DATABASE_STATE from "../../config/databases/state";
import forEachReverse from "../../helpers/array/forEachReverse";
import indexOfAndSplice from "../../helpers/array/indexOfAndSplice";
import insertInDescendSortedArray from "../../helpers/array/insertInDescendSortedArray";
import defineNotNumerableProperties from "../../helpers/object/defineNotNumerableProperties";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";

export type FolderDialog = {
  dialog: Dialog,
  index: number
};

export type Folder = {
  dialogs: Dialog[],
  id: number,
  unreadMessagesCount: number,
  unreadDialogsCount: number,
  dispatchUnreadTimeout?: number
};

export const GLOBAL_FOLDER_ID: number = undefined;

// let spentTime = 0;
export default class DialogsStorage {
  private storage: AppStateManager['storages']['dialogs'];
  
  private dialogs: {[peerId: PeerId]: Dialog};

=======

import type { Chat, DialogPeer, Message, MessageAction, MessageMedia, MessagesPeerDialogs, Update } from "../../layer";
import type { Dialog, MyMessage } from "../appManagers/appMessagesManager";
import tsNow from "../../helpers/tsNow";
import SearchIndex from "../searchIndex";
import { SliceEnd } from "../../helpers/slicedArray";
import { MyDialogFilter } from "./filters";
import { NULL_PEER_ID } from "../mtproto/mtproto_config";
import { NoneToVoidFunction } from "../../types";
import ctx from "../../environment/ctx";
import AppStorage from "../storage";
import type DATABASE_STATE from "../../config/databases/state";
import forEachReverse from "../../helpers/array/forEachReverse";
import indexOfAndSplice from "../../helpers/array/indexOfAndSplice";
import insertInDescendSortedArray from "../../helpers/array/insertInDescendSortedArray";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";
import getServerMessageId from "../appManagers/utils/messageId/getServerMessageId";
import getPeerId from "../appManagers/utils/peers/getPeerId";
import generateMessageId from "../appManagers/utils/messageId/generateMessageId";
import { AppManager } from "../appManagers/manager";
import getDialogIndexKey from "../appManagers/utils/dialogs/getDialogIndexKey";
import isObject from "../../helpers/object/isObject";
import getDialogIndex from "../appManagers/utils/dialogs/getDialogIndex";
import getPeerIdsFromMessage from "../appManagers/utils/messages/getPeerIdsFromMessage";
import { AppStoragesManager } from "../appManagers/appStoragesManager";
import defineNotNumerableProperties from "../../helpers/object/defineNotNumerableProperties";
import setDialogIndex from "../appManagers/utils/dialogs/setDialogIndex";

export type FolderDialog = {
  dialog: Dialog,
  index: number
};

export type Folder = {
  dialogs: Dialog[],
  id: number,
  unreadMessagesCount: number,
  unreadPeerIds: Set<PeerId>,
  unreadUnmutedPeerIds: Set<PeerId>,
  dispatchUnreadTimeout?: number
};

export const GLOBAL_FOLDER_ID: LOCAL_FOLDER_ID = undefined;
export type LOCAL_FOLDER_ID = 0 | 1;

// let spentTime = 0;
export default class DialogsStorage extends AppManager {
  private storage: AppStoragesManager['storages']['dialogs'];
  
  private dialogs: {[peerId: PeerId]: Dialog};

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private folders: {[folderId: number]: Folder} = {};

  private allDialogsLoaded: {[folder_id: number]: boolean};
  private dialogsOffsetDate: {[folder_id: number]: number};
  private pinnedOrders: {[folder_id: number]: PeerId[]};
  private dialogsNum: number;

  private dialogsIndex: SearchIndex<PeerId>;

  private cachedResults: {
    query: string,
    count: number,
    dialogs: Dialog[],
    folderId: number
  };

<<<<<<< HEAD
  constructor(
    private appMessagesManager: AppMessagesManager, 
    private appChatsManager: AppChatsManager, 
    private appPeersManager: AppPeersManager, 
    private appUsersManager: AppUsersManager,
    private appDraftsManager: AppDraftsManager,
    private appNotificationsManager: AppNotificationsManager,
    private appStateManager: AppStateManager,
    private apiUpdatesManager: ApiUpdatesManager,
    private serverTimeManager: ServerTimeManager,
    private appMessagesIdsManager: AppMessagesIdsManager
  ) {
    this.storage = this.appStateManager.storages.dialogs;
    this.dialogs = this.storage.getCache();
    this.clear(true);

    rootScope.addEventListener('language_change', () => {
      const peerId = appUsersManager.getSelf().id.toPeerId(false);
      const dialog = this.getDialogOnly(peerId);
      if(dialog) {
        const peerText = appPeersManager.getPeerSearchText(peerId);
=======
  protected after() {
    this.clear(true);

    this.rootScope.addEventListener('language_change', () => {
      const peerId = this.appUsersManager.getSelf().id.toPeerId(false);
      const dialog = this.getDialogOnly(peerId);
      if(dialog) {
        const peerText = this.appPeersManager.getPeerSearchText(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.dialogsIndex.indexObject(peerId, peerText);
      }
    });

    const onFilterUpdate = (filter: MyDialogFilter) => {
      const dialogs = this.getCachedDialogs(false);
      for(let i = 0; i < dialogs.length; ++i) {
        this.processDialogForFilter(dialogs[i], filter);
      }
    };

<<<<<<< HEAD
    rootScope.addEventListener('filter_order', () => {
      const dialogs = this.getCachedDialogs(false);
=======
    this.rootScope.addEventListener('filter_order', () => {
      const dialogs = this.getCachedDialogs(false);
      // const indexKeys: ReturnType<DialogsStorage['getDialogIndexKey']>[] = [];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      for(const filterId in this.folders) {
        if(+filterId > 1) {
          delete this.folders[filterId];
        }
<<<<<<< HEAD
=======

        // indexKeys.push(this.getDialogIndexKey(+filterId));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      for(let i = 0; i < dialogs.length; ++i) {
        const dialog = dialogs[i];
<<<<<<< HEAD
        for(let i = 0; i <= 10; ++i) {
          const indexKey = `index_${i}` as ReturnType<DialogsStorage['getDialogIndexKey']>;
          dialog[indexKey] = undefined;
        }
=======
        // for(const indexKey of indexKeys) {
        //   delete dialog[indexKey];
        // }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        this.processDialogForFilters(dialog);
      }
    });

<<<<<<< HEAD
    rootScope.addEventListener('filter_update', onFilterUpdate);
    rootScope.addEventListener('filter_new', onFilterUpdate);

    rootScope.addEventListener('filter_delete', (filter) => {
      const dialogs = this.getCachedDialogs(false);

      const indexKey = `index_${filter.orderIndex}` as const;
=======
    this.rootScope.addEventListener('filter_update', onFilterUpdate);
    this.rootScope.addEventListener('filter_new', onFilterUpdate);

    this.rootScope.addEventListener('filter_delete', (filter) => {
      const dialogs = this.getCachedDialogs(false);

      const indexKey = this.getDialogIndexKeyByFilterId(filter.id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      for(let i = 0; i < dialogs.length; ++i) {
        const dialog = dialogs[i];
        delete dialog[indexKey];
      }

      delete this.folders[filter.id];
    });

<<<<<<< HEAD
    rootScope.addEventListener('dialog_notify_settings', (dialog) => {
      this.processDialogForFilters(dialog);
    });

    rootScope.addEventListener('chat_update', (chatId) => {
=======
    this.rootScope.addEventListener('dialog_notify_settings', (dialog) => {
      this.processDialogForFilters(dialog);
      this.prepareDialogUnreadCountModifying(dialog)();
    });

    this.rootScope.addEventListener('chat_update', (chatId) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const chat: Chat.chat = this.appChatsManager.getChat(chatId);

      const peerId = chatId.toPeerId(true);
      if(chat.pFlags.left && this.getDialogOnly(peerId)) {
        this.dropDialogOnDeletion(peerId);
      }
    });

<<<<<<< HEAD
    rootScope.addMultipleEventsListeners({
=======
    this.apiUpdatesManager.addMultipleEventsListeners({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      updateFolderPeers: this.onUpdateFolderPeers,

      updateDialogPinned: this.onUpdateDialogPinned,

      updatePinnedDialogs: this.onUpdatePinnedDialogs,
    });

<<<<<<< HEAD
    appStateManager.getState().then((state) => {
=======
    return Promise.all([
      this.appStateManager.getState(),
      this.appStoragesManager.loadStorage('dialogs')
    ]).then(([state, {results: dialogs, storage}]) => {
      this.storage = storage;
      this.dialogs = this.storage.getCache();

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.pinnedOrders = state.pinnedOrders || {};
      if(!this.pinnedOrders[0]) this.pinnedOrders[0] = [];
      if(!this.pinnedOrders[1]) this.pinnedOrders[1] = [];
      
<<<<<<< HEAD
      const dialogs = appStateManager.storagesResults.dialogs;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(dialogs.length) {
        AppStorage.freezeSaving<typeof DATABASE_STATE>(this.setDialogsFromState.bind(this, dialogs), ['chats', 'dialogs', 'messages', 'users']);
      }

      this.allDialogsLoaded = state.allDialogsLoaded || {};
<<<<<<< HEAD
=======

      if(dialogs.length) {
        this.appDraftsManager.addMissedDialogs();
      }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  private setDialogsFromState(dialogs: Dialog[]) {
    for(let i = 0, length = dialogs.length; i < length; ++i) {
      const dialog = dialogs[i];
<<<<<<< HEAD
      if(dialog) {
        // if(dialog.peerId !== SERVICE_PEER_ID) {
          dialog.top_message = this.appMessagesIdsManager.getServerMessageId(dialog.top_message); // * fix outgoing message to avoid copying dialog
        // }

        if(dialog.topMessage) {
          this.appMessagesManager.saveMessages([dialog.topMessage]);
        }

        for(let i = 0; i <= 10; ++i) {
          // @ts-ignore
          delete dialog[`index_${i}`];
        }

        this.saveDialog(dialog, undefined, true);

        // ! WARNING, убрать это когда нужно будет делать чтобы pending сообщения сохранялись
        const message = this.appMessagesManager.getMessageByPeer(dialog.peerId, dialog.top_message);
        if(message.deleted) {
          this.appMessagesManager.reloadConversation(dialog.peerId);
        }
=======
      if(!dialog) {
        continue;
      }

      // if(dialog.peerId !== SERVICE_PEER_ID) {
        dialog.top_message = getServerMessageId(dialog.top_message); // * fix outgoing message to avoid copying dialog
      // }

      if(dialog.topMessage) {
        this.appMessagesManager.saveMessages([dialog.topMessage]);
      }

      for(let i = 0; i <= 21; ++i) {
        const indexKey: ReturnType<typeof getDialogIndexKey> = `index_${i}` as any;
        delete dialog[indexKey];
      }
      // delete dialog.indexes;

      this.saveDialog(dialog, undefined, true);

      // ! WARNING, убрать это когда нужно будет делать чтобы pending сообщения сохранялись
      const message = this.appMessagesManager.getMessageByPeer(dialog.peerId, dialog.top_message);
      if(!message) {
        this.appMessagesManager.reloadConversation(dialog.peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }
  }

  public isDialogsLoaded(folderId: number) {
    return !!this.allDialogsLoaded[folderId];
  }

  public setDialogsLoaded(folderId: number, loaded: boolean) {
    if(folderId === GLOBAL_FOLDER_ID && loaded) {
      this.allDialogsLoaded[0] = loaded;
      this.allDialogsLoaded[1] = loaded;
    } else {
      this.allDialogsLoaded[folderId] = loaded;
    }

    if(this.allDialogsLoaded[0] && this.allDialogsLoaded[1]) {
      this.allDialogsLoaded[GLOBAL_FOLDER_ID] = true;
    }

    this.appStateManager.pushToState('allDialogsLoaded', this.allDialogsLoaded);
  }

<<<<<<< HEAD
  public clear(init = false) {
=======
  public clear = (init = false) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.pinnedOrders = {
      0: [],
      1: []
    };

    if(!init) {
<<<<<<< HEAD
      const dialogs = this.appStateManager.storagesResults.dialogs;
      dialogs.length = 0;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.storage.clear();

      this.setDialogsLoaded(0, false);
      this.setDialogsLoaded(1, false);
      this.setDialogsLoaded(GLOBAL_FOLDER_ID, false);
      this.savePinnedOrders();
    } else {
      this.allDialogsLoaded = {};
    }

    this.folders = {};
    this.dialogsOffsetDate = {};
    this.dialogsNum = 0;
    this.dialogsIndex = new SearchIndex({
      clearBadChars: true,
      ignoreCase: true,
      latinize: true,
      includeTag: true
    });
    this.cachedResults = {
      query: '',
      count: 0,
      dialogs: [],
      folderId: 0
    };
<<<<<<< HEAD
  }
=======
  };
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  public handleDialogUnpinning(dialog: Dialog, folderId: number) {
    delete dialog.pFlags.pinned;
    indexOfAndSplice(this.pinnedOrders[folderId], dialog.peerId);
    this.savePinnedOrders();
  }

  public savePinnedOrders() {
    this.appStateManager.pushToState('pinnedOrders', this.pinnedOrders);
  }

  public resetPinnedOrder(folderId: number) {
    this.pinnedOrders[folderId] = [];
  }

  public getPinnedOrders(folderId: number) {
    return this.pinnedOrders[folderId];
  }

  public getOffsetDate(folderId: number): number {
    const offsetDate = this.dialogsOffsetDate[folderId] || 0;
    if(folderId === GLOBAL_FOLDER_ID && !offsetDate) { // make request not from beginning if we have loaded some dialogs
      return Math.min(this.getOffsetDate(0), this.getOffsetDate(1));
    }

    return offsetDate;
  }

  public getFolder(id: number) {
<<<<<<< HEAD
    return this.folders[id] ?? (this.folders[id] = {dialogs: [], id, unreadMessagesCount: 0, unreadDialogsCount: 0});
  }

  public getFolderDialogs(id: number, skipMigrated = true): Dialog[] {
    if(id === GLOBAL_FOLDER_ID) { // * it won't be sorted
      return this.getCachedDialogs(skipMigrated);
    }

    const folder = this.getFolder(id);
    return skipMigrated ? folder.dialogs.filter(dialog => dialog.migratedTo === undefined) : folder.dialogs;
  }

  public getCachedDialogs(skipMigrated?: boolean) {
    return this.getFolderDialogs(0, skipMigrated).concat(this.getFolderDialogs(1, skipMigrated));
  }

  private setDialogIndexInFilter(dialog: Dialog, indexKey: ReturnType<DialogsStorage['getDialogIndexKey']>, filter: MyDialogFilter) {
    let index: number;

    if(this.appMessagesManager.filtersStorage.testDialogForFilter(dialog, filter)) {
      const pinnedIndex = filter.pinnedPeerIds.indexOf(dialog.peerId);
      if(pinnedIndex !== -1) {
        index = this.generateDialogIndex(this.generateDialogPinnedDateByIndex(filter.pinned_peers.length - 1 - pinnedIndex), true);
      } else if(dialog.pFlags?.pinned) {
        index = this.generateIndexForDialog(dialog, true);
      } else {
        index = dialog.index;
      }
    }

    return dialog[indexKey] = index;
  }

=======
    let folder = this.folders[id];
    if(!folder) {
      folder = this.folders[id] = {
        dialogs: [], 
        id, 
        unreadMessagesCount: 0, 
        unreadPeerIds: new Set(), 
        unreadUnmutedPeerIds: new Set()
      };

      defineNotNumerableProperties(folder, ['dispatchUnreadTimeout']);
    }

    return folder;
  }

  public getFolderDialogs(id: number, skipMigrated = true): Dialog[] {
    if(id === GLOBAL_FOLDER_ID) { // * it won't be sorted
      return this.getCachedDialogs(skipMigrated);
    }

    const folder = this.getFolder(id);
    return skipMigrated ? folder.dialogs.filter((dialog) => dialog.migratedTo === undefined) : folder.dialogs;
  }

  public getNextDialog(currentPeerId: PeerId, next: boolean, filterId: number) {
    const folder = this.getFolderDialogs(filterId, true);
    let dialog: Dialog;
    if(!currentPeerId) {
      if(next) {
        dialog = folder[0];
      }
    } else {
      const idx = folder.findIndex((dialog) => dialog.peerId === currentPeerId);
      if(idx !== -1) {
        const nextIndex = next ? idx + 1 : idx - 1;
        dialog = folder[nextIndex];
      }
    }

    return dialog;
  }

  public getDialogIndexKeyByFilterId(filterId: number) {
    if(filterId <= 1) return getDialogIndexKey(filterId as LOCAL_FOLDER_ID);
    const filter = this.filtersStorage.getFilter(filterId);
    return getDialogIndexKey(filter.orderIndex);
  }
  
  public isPeerUnmuted(peerId: PeerId) {
    return !this.appNotificationsManager.isPeerLocalMuted(peerId, true);
  }

  public getFolderUnreadCount(filterId: number) {
    const folder = this.getFolder(filterId);
    return {unreadUnmutedCount: folder.unreadUnmutedPeerIds.size, unreadCount: folder.unreadPeerIds.size};
  }

  public getCachedDialogs(skipMigrated?: boolean) {
    return this.getFolderDialogs(0, skipMigrated).concat(this.getFolderDialogs(1, skipMigrated));
  }

  private setDialogIndexInFilter(dialog: Dialog, indexKey: ReturnType<typeof getDialogIndexKey>, filter: MyDialogFilter) {
    let index: number;

    /* if(filter.id <= 1) {
      index = getDialogIndex(dialog, getDialogIndexKey(filter.id));
    } else  */if(this.filtersStorage.testDialogForFilter(dialog, filter)) {
      const pinnedIndex = filter.pinnedPeerIds.indexOf(dialog.peerId);
      if(pinnedIndex !== -1) {
        index = this.generateDialogIndex(this.generateDialogPinnedDateByIndex(filter.pinned_peers.length - 1 - pinnedIndex), true);
      } else if(dialog.pFlags?.pinned) {
        index = this.generateIndexForDialog(dialog, true);
      } else {
        index = getDialogIndex(dialog);
      }
    }

    // if(!dialog.hasOwnProperty(indexKey)) {
    //   defineNotNumerableProperties(dialog, [indexKey]);
    // }

    return setDialogIndex(dialog, indexKey, index);
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public getDialog(peerId: PeerId, folderId?: number, skipMigrated = true): [Dialog, number] | [] {
    const folders: Dialog[][] = [];

    if(folderId === undefined) {
      folders.push(this.getFolder(0).dialogs, this.getFolder(1).dialogs);
    } else {
      folders.push(this.getFolderDialogs(folderId, false));
    }

    for(let folder of folders) {
      let i = 0, skipped = 0;
      for(let length = folder.length; i < length; ++i) {
        const dialog = folder[i];
        if(dialog.peerId === peerId) {
          return [dialog, i - skipped];
        } else if(skipMigrated && dialog.migratedTo !== undefined) {
          ++skipped;
        }
      }
    }

    return [];
  }

  public getDialogOnly(peerId: PeerId) {
    return this.dialogs[peerId];
  }

<<<<<<< HEAD
=======
  public getDialogIndex(peerId: PeerId | Dialog, indexKey: ReturnType<typeof getDialogIndexKey>) {
    const dialog = isObject(peerId) ? peerId : this.getDialogOnly(peerId);
    return getDialogIndex(dialog, indexKey);
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  /*
  var date = Date.now() / 1000 | 0;
  var m = date * 0x10000;

  var k = (date + 1) * 0x10000;
  k - m;
  65536
  */
  public generateDialogIndex(date?: number, isPinned?: boolean) {
    if(date === undefined) {
      date = tsNow(true) + this.timeManager.getServerTimeOffset();
    }

    return (date * 0x10000) + (isPinned ? 0 : ((++this.dialogsNum) & 0xFFFF));
  }

  public processDialogForFilters(dialog: Dialog) {
    // let perf = performance.now();
<<<<<<< HEAD
    const filters = this.appMessagesManager.filtersStorage.filters;
=======
    const filters = this.filtersStorage.getFilters();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    for(const id in filters) {
      const filter = filters[id];
      this.processDialogForFilter(dialog, filter);
    }
    // spentTime += (performance.now() - perf);
    // console.log('generate index time:', spentTime);
  }

  public processDialogForFilter(dialog: Dialog, filter: MyDialogFilter) {
<<<<<<< HEAD
    const indexKey = this.getDialogIndexKey(filter.id);
    const folder = this.getFolder(filter.id);
    const dialogs = folder.dialogs;

    const wasIndex = dialogs.findIndex(d => d.peerId === dialog.peerId);
    const wasDialog = dialogs[wasIndex];
    const wasDialogIndex = wasDialog && wasDialog[indexKey];
=======
    const indexKey = this.getDialogIndexKeyByFilterId(filter.id);
    const folder = this.getFolder(filter.id);
    const dialogs = folder.dialogs;

    const wasIndex = dialogs.findIndex((d) => d.peerId === dialog.peerId);
    const wasDialog = dialogs[wasIndex];
    const wasDialogIndex = this.getDialogIndex(wasDialog, indexKey);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    const newDialogIndex = this.setDialogIndexInFilter(dialog, indexKey, filter);

    if(wasDialogIndex === newDialogIndex) {
<<<<<<< HEAD
      return;
=======
      return false;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    if((!wasDialogIndex && newDialogIndex) || (wasIndex && !newDialogIndex)) {
      this.prepareFolderUnreadCountModifyingByDialog(filter.id, dialog, !!newDialogIndex);
    }

    if(wasIndex !== -1) {
      dialogs.splice(wasIndex, 1);
    }

    if(newDialogIndex) {
<<<<<<< HEAD
      insertInDescendSortedArray(dialogs, dialog, indexKey, -1);
    }
=======
      insertInDescendSortedArray(dialogs, dialog, (dialog) => this.getDialogIndex(dialog, indexKey), -1);
    }

    return true;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public prepareDialogUnreadCountModifying(dialog: Dialog) {
    const callbacks: NoneToVoidFunction[] = [
      this.prepareFolderUnreadCountModifyingByDialog(dialog.folder_id, dialog)
    ];

<<<<<<< HEAD
    const filters = this.appMessagesManager.filtersStorage.filters;
    for(const id in filters) {
      const filter = filters[id];
      if(this.appMessagesManager.filtersStorage.testDialogForFilter(dialog, filter)) {
=======
    const filters = this.filtersStorage.getFilters();
    for(const id in filters) {
      const filter = filters[id];
      if(this.filtersStorage.testDialogForFilter(dialog, filter)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        callbacks.push(this.prepareFolderUnreadCountModifyingByDialog(filter.id, dialog));
      }
    }

<<<<<<< HEAD
    return () => callbacks.forEach(callback => callback());
=======
    return () => callbacks.forEach((callback) => callback());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public prepareFolderUnreadCountModifyingByDialog(folderId: number, dialog: Dialog, toggle?: boolean) {
    const wasUnreadCount = this.appMessagesManager.getDialogUnreadCount(dialog);
<<<<<<< HEAD
    
    if(toggle !== undefined) {
      this.modifyFolderUnreadCount(folderId, toggle ? wasUnreadCount : -wasUnreadCount, wasUnreadCount ? (toggle ? 1 : -1) : 0);
=======
    const wasUnmuted = this.isPeerUnmuted(dialog.peerId);
    
    if(toggle !== undefined) {
      const addMessagesCount = toggle ? wasUnreadCount : -wasUnreadCount;
      this.modifyFolderUnreadCount(folderId, addMessagesCount, !!wasUnreadCount, wasUnreadCount && wasUnmuted, dialog);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return;
    }

    return () => {
      const newUnreadCount = this.appMessagesManager.getDialogUnreadCount(dialog);
<<<<<<< HEAD
      const addMessagesCount = newUnreadCount - wasUnreadCount;
      const addDialogsCount = (newUnreadCount && !wasUnreadCount) || (!newUnreadCount && wasUnreadCount) ? (wasUnreadCount ? -1 : 1) : 0;
      this.modifyFolderUnreadCount(folderId, addMessagesCount, addDialogsCount);
    };
  }

  public modifyFolderUnreadCount(folderId: number, addMessagesCount: number, addDialogsCount: number) {
    if(!addMessagesCount && !addDialogsCount) {
      return;
    }

=======
      const newUnmuted = this.isPeerUnmuted(dialog.peerId);

      const addMessagesCount = newUnreadCount - wasUnreadCount;
      this.modifyFolderUnreadCount(folderId, addMessagesCount, !!newUnreadCount, newUnreadCount && newUnmuted, dialog);
    };
  }

  public modifyFolderUnreadCount(
    folderId: number, 
    addMessagesCount: number, 
    toggleDialog: boolean, 
    toggleUnmuted: boolean, 
    dialog: Dialog
  ) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const folder = this.getFolder(folderId);
    if(addMessagesCount) {
      folder.unreadMessagesCount = Math.max(0, folder.unreadMessagesCount + addMessagesCount);
    }
    
<<<<<<< HEAD
    if(addDialogsCount) {
      folder.unreadDialogsCount = Math.max(0, folder.unreadDialogsCount + addDialogsCount);
=======
    const {peerId} = dialog;
    if(toggleDialog) {
      folder.unreadPeerIds.add(peerId);
    } else {
      folder.unreadPeerIds.delete(peerId);
    }

    if(toggleUnmuted) {
      folder.unreadUnmutedPeerIds.add(peerId);
    } else {
      folder.unreadUnmutedPeerIds.delete(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    if(folder.dispatchUnreadTimeout === undefined) {
      folder.dispatchUnreadTimeout = ctx.setTimeout(() => {
        folder.dispatchUnreadTimeout = undefined;
<<<<<<< HEAD
        rootScope.dispatchEvent('folder_unread', folder);
=======
        const _folder = {...folder};
        delete _folder.dialogs;
        this.rootScope.dispatchEvent('folder_unread', _folder);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }, 0);
    }
  }

  public generateIndexForDialog(dialog: Dialog, justReturn = false, message?: MyMessage) {
    let topDate = 0, isPinned: boolean;
    if(dialog.pFlags.pinned && !justReturn) {
      topDate = this.generateDialogPinnedDate(dialog);
      isPinned = true;
    } else {
      if(!message) {
        message = this.appMessagesManager.getMessageByPeer(dialog.peerId, dialog.top_message);
      }
      
<<<<<<< HEAD
      topDate = (message as Message.message).date || topDate;
=======
      topDate = (message as Message.message)?.date || topDate;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      const channelId = this.appPeersManager.isChannel(dialog.peerId) && dialog.peerId.toChatId();
      if(channelId) {
        const channel: Chat.channel = this.appChatsManager.getChat(channelId);
        if(!topDate || (channel.date && channel.date > topDate)) {
          topDate = channel.date;
        }
      }
  
      if(dialog.draft?._ === 'draftMessage' && dialog.draft.date > topDate) {
        topDate = dialog.draft.date;
      }
<<<<<<< HEAD
    }

    if(!topDate) {
      topDate = tsNow(true);
    }

    const index = this.generateDialogIndex(topDate, isPinned);
    if(justReturn) {
      return index;
    }

    dialog.index = index;
=======
    }

    if(!topDate) {
      topDate = tsNow(true);
    }

    const index = this.generateDialogIndex(topDate, isPinned);
    if(justReturn) {
      return index;
    }

    const indexKey = getDialogIndexKey(dialog.folder_id);
    setDialogIndex(dialog, indexKey, index);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public generateDialogPinnedDateByIndex(pinnedIndex: number) {
    return 0x7fff0000 + (pinnedIndex & 0xFFFF); // 0xFFFF - потому что в папках может быть бесконечное число пиннедов
  }

  public generateDialogPinnedDate(dialog: Dialog) {
    const order = this.pinnedOrders[dialog.folder_id];

    const foundIndex = order.indexOf(dialog.peerId);
    let pinnedIndex = foundIndex;
    if(foundIndex === -1) {
      pinnedIndex = order.push(dialog.peerId) - 1;
      this.savePinnedOrders();
    }

    return this.generateDialogPinnedDateByIndex(pinnedIndex);
  }

  /* public generateDialog(peerId: PeerId) {
    const dialog: Dialog = {
      _: 'dialog',
      pFlags: {},
      peer: this.appPeersManager.getOutputPeer(peerId),
      top_message: 0,
      read_inbox_max_id: 0,
      read_outbox_max_id: 0,
      unread_count: 0,
      unread_mentions_count: 0,
      notify_settings: {
        _: 'peerNotifySettings',
      },
    };

    return dialog;
  } */

  public setDialogToState(dialog: Dialog) {
    const {peerId, pts} = dialog;
    const historyStorage = this.appMessagesManager.getHistoryStorage(peerId);
<<<<<<< HEAD
    const messagesStorage = this.appMessagesManager.getMessagesStorage(peerId);
=======
    const messagesStorage = this.appMessagesManager.getHistoryMessagesStorage(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const history = historyStorage.history.slice;
    let incomingMessage: MyMessage;
    for(let i = 0, length = history.length; i < length; ++i) {
      const mid = history[i];
      const message: MyMessage = this.appMessagesManager.getMessageFromStorage(messagesStorage, mid);
<<<<<<< HEAD
      if(!message.pFlags.is_outgoing && !message.deleted/*  || peerId === SERVICE_PEER_ID */) {
        incomingMessage = message;
  
        const fromId = message.viaBotId || message.fromId;
        if(fromId !== peerId) {
          this.appStateManager.requestPeerSingle(fromId, 'topMessage', peerId);
        }
=======
      if(message && !message.pFlags.is_outgoing/*  || peerId === SERVICE_PEER_ID */) {
        incomingMessage = message;
  
        const peerIds = getPeerIdsFromMessage(message);
        this.peersStorage.requestPeersForKey(peerIds, `topMessage_${peerId}`);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
        break;
      }
    }

    dialog.topMessage = incomingMessage;

    // DO NOT TOUCH THESE LINES, SOME REAL MAGIC HERE.
    // * Read service chat when refreshing page with outgoing & getting new service outgoing message
    /* if(incomingMessage && dialog.read_inbox_max_id >= dialog.top_message) {
      dialog.unread_count = 0;
    }

    dialog.read_inbox_max_id = this.appMessagesIdsManager.clearMessageId(dialog.read_inbox_max_id);
    dialog.read_outbox_max_id = this.appMessagesIdsManager.clearMessageId(dialog.read_outbox_max_id); */
    // CAN TOUCH NOW

    if(peerId.isAnyChat() && pts) {
      const newPts = this.apiUpdatesManager.getChannelState(peerId.toChatId(), pts).pts;
      dialog.pts = newPts;
    }

    this.storage.set({
      [peerId]: dialog
    });

<<<<<<< HEAD
    this.appStateManager.requestPeerSingle(peerId, 'dialog');

    /* for(let id in this.appMessagesManager.filtersStorage.filters) {
      const filter = this.appMessagesManager.filtersStorage.filters[id];

      if(this.appMessagesManager.filtersStorage.testDialogForFilter(dialog, filter)) {
=======
    this.peersStorage.requestPeer(peerId, 'dialog');

    /* for(let id in this.filtersStorage.filters) {
      const filter = this.filtersStorage.filters[id];

      if(this.filtersStorage.testDialogForFilter(dialog, filter)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        
      }
    } */
  }

  public pushDialog(dialog: Dialog, offsetDate?: number, ignoreOffsetDate?: boolean, saveGlobalOffset?: boolean) {
    const {folder_id, peerId} = dialog;
    const dialogs = this.getFolderDialogs(folder_id, false);
<<<<<<< HEAD
    const pos = dialogs.findIndex(d => d.peerId === peerId);
=======
    const pos = dialogs.findIndex((d) => d.peerId === peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(pos !== -1) {
      dialogs.splice(pos, 1);
    }
    
    //if(!this.dialogs[peerId]) {
      this.dialogs[peerId] = dialog;
      
      this.setDialogToState(dialog);
    //}

    if(offsetDate === undefined) {
      offsetDate = this.getDialogOffsetDate(dialog);
    }

    this.processDialogForFilters(dialog);

    if(offsetDate && !dialog.pFlags.pinned) {
      if(saveGlobalOffset) {
        const savedGlobalOffsetDate = this.dialogsOffsetDate[GLOBAL_FOLDER_ID];
        if(!savedGlobalOffsetDate || offsetDate < savedGlobalOffsetDate) {
          this.dialogsOffsetDate[GLOBAL_FOLDER_ID] = offsetDate;
        }
      }

      const savedOffsetDate = this.dialogsOffsetDate[folder_id];
      if(!savedOffsetDate || offsetDate < savedOffsetDate) {
        // if(pos !== -1) {
        if(!ignoreOffsetDate && !this.isDialogsLoaded(folder_id)) {
          this.clearDialogFromState(dialog, true);
          return;
        }
  
        this.dialogsOffsetDate[folder_id] = offsetDate;
      }
    }

    if(pos === -1) {
      this.prepareFolderUnreadCountModifyingByDialog(folder_id, dialog, true);
    }

<<<<<<< HEAD
    /* const newPos =  */insertInDescendSortedArray(dialogs, dialog, 'index', -1);
=======
    const indexKey = getDialogIndexKey(folder_id);
    /* const newPos =  */insertInDescendSortedArray(dialogs, dialog, (dialog) => getDialogIndex(dialog, indexKey), -1);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    /* if(pos !== -1 && pos !== newPos) {
      rootScope.dispatchEvent('dialog_order', {dialog, pos: newPos});
    } */
  }

  public dropDialog(peerId: PeerId): ReturnType<DialogsStorage['getDialog']> {
    const foundDialog = this.getDialog(peerId, undefined, false);
    const [dialog, index] = foundDialog;
    if(dialog) {
      delete this.dialogs[peerId];

      const folder = this.getFolder(dialog.folder_id);
      folder.dialogs.splice(index, 1);
      const wasPinned = indexOfAndSplice(this.pinnedOrders[dialog.folder_id], peerId) !== undefined;
      
      this.processDialogForFilters(dialog);

      this.dialogsIndex.indexObject(peerId, '');

      if(wasPinned) {
        this.savePinnedOrders();
      }

      this.clearDialogFromState(dialog, false);
    }

    return foundDialog;
  }

  public clearDialogFromState(dialog: Dialog, keepLocal: boolean) {
    const peerId = dialog.peerId;
<<<<<<< HEAD
    this.appStateManager.releaseSinglePeer(peerId, 'topMessage');
    this.appStateManager.releaseSinglePeer(peerId, 'dialog');
=======
    this.peersStorage.requestPeersForKey([], `topMessage_${peerId}`);
    this.peersStorage.releasePeer(peerId, 'dialog');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.storage.delete(peerId, keepLocal);
  }

  public dropDialogWithEvent(peerId: PeerId) {
    const dropped = this.dropDialog(peerId);
    if(dropped.length) {
<<<<<<< HEAD
      rootScope.dispatchEvent('dialog_drop', {peerId, dialog: dropped[0]});
=======
      this.rootScope.dispatchEvent('dialog_drop', {peerId, dialog: dropped[0]});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    return dropped;
  }

  /**
   * leaving chat, leaving channel, deleting private dialog
   */
  public dropDialogOnDeletion(peerId: PeerId) {
    this.dropDialogWithEvent(peerId);
<<<<<<< HEAD
    rootScope.dispatchEvent('peer_deleted', peerId);
=======
    this.rootScope.dispatchEvent('peer_deleted', peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public applyDialogs(dialogsResult: MessagesPeerDialogs.messagesPeerDialogs) {
    // * В эту функцию попадут только те диалоги, в которых есть read_inbox_max_id и read_outbox_max_id, в отличие от тех, что будут в getTopMessages

    // ! fix 'dialogFolder', maybe there is better way to do it, this only can happen by 'messages.getPinnedDialogs' by folder_id: 0
    forEachReverse(dialogsResult.dialogs, (dialog, idx) => {
      if(dialog._ === 'dialogFolder') {
        dialogsResult.dialogs.splice(idx, 1);
      }
    });

    this.appUsersManager.saveApiUsers(dialogsResult.users);
    this.appChatsManager.saveApiChats(dialogsResult.chats);
    this.appMessagesManager.saveMessages(dialogsResult.messages);

    // this.appMessagesManager.log('applyConversation', dialogsResult);

    const updatedDialogs: {[peerId: PeerId]: Dialog} = {};
    (dialogsResult.dialogs as Dialog[]).forEach((dialog) => {
<<<<<<< HEAD
      const peerId = this.appPeersManager.getPeerId(dialog.peer);
=======
      const peerId = getPeerId(dialog.peer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      let topMessage = dialog.top_message;

      const topPendingMessage = this.appMessagesManager.pendingTopMsgs[peerId];
      if(topPendingMessage) {
        if(!topMessage 
<<<<<<< HEAD
          || (this.appMessagesManager.getMessageByPeer(peerId, topPendingMessage) as MyMessage).date > (this.appMessagesManager.getMessageByPeer(peerId, topMessage) as MyMessage).date) {
=======
          || (this.appMessagesManager.getMessageByPeer(peerId, topPendingMessage) as MyMessage)?.date > (this.appMessagesManager.getMessageByPeer(peerId, topMessage) as MyMessage)?.date) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          dialog.top_message = topMessage = topPendingMessage;
          this.appMessagesManager.getHistoryStorage(peerId).maxId = topPendingMessage;
        }
      }

      /* const d = Object.assign({}, dialog);
      if(peerId === 239602833) {
        this.log.error('applyConversation lun', dialog, d);
      } */

<<<<<<< HEAD
      if(topMessage || (dialog.draft && dialog.draft._ === 'draftMessage')) {
=======
      if(topMessage || dialog.draft?._ === 'draftMessage') {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.saveDialog(dialog);
        updatedDialogs[peerId] = dialog;
      } else {
        this.dropDialogWithEvent(peerId);
      }

      const updates = this.appMessagesManager.newUpdatesAfterReloadToHandle[peerId];
      if(updates !== undefined) {
        for(const update of updates) {
          updates.delete(update);
          this.apiUpdatesManager.saveUpdate(update);
        }

        if(!updates.size) {
          delete this.appMessagesManager.newUpdatesAfterReloadToHandle[peerId];
        }
      }
    });

    if(Object.keys(updatedDialogs).length) {
<<<<<<< HEAD
      rootScope.dispatchEvent('dialogs_multiupdate', updatedDialogs);
    }
  }

  public getDialogOffsetDate(dialog: Dialog) {
    return this.appMessagesManager.getMessageByPeer(dialog.peerId, dialog.top_message).date || 0;
=======
      this.rootScope.dispatchEvent('dialogs_multiupdate', updatedDialogs);
    }
  }

  private getDialogOffsetDate(dialog: Dialog) {
    const message = this.appMessagesManager.getMessageByPeer(dialog.peerId, dialog.top_message);
    return message?.date || 0;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  /**
   * Won't save migrated from peer, forbidden peers, left and kicked
   */
  public saveDialog(dialog: Dialog, folderId = dialog.folder_id ?? 0, ignoreOffsetDate?: boolean, saveGlobalOffset?: boolean) {
<<<<<<< HEAD
    const peerId = this.appPeersManager.getPeerId(dialog.peer);
=======
    const peerId = getPeerId(dialog.peer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!peerId) {
      console.error('saveConversation no peerId???', dialog, folderId);
      return;
    }

    if(dialog._ !== 'dialog'/*  || peerId === 239602833 */) {
      console.error('saveConversation not regular dialog', dialog, Object.assign({}, dialog));
    }
    
    const channelId = this.appPeersManager.isChannel(peerId) ? peerId.toChatId() : NULL_PEER_ID;

    if(peerId.isAnyChat()) {
      const chat: Chat = this.appChatsManager.getChat(peerId.toChatId());
      // ! chatForbidden stays for chat where you're kicked
      if(
        chat._ === 'channelForbidden' 
        // || chat._ === 'chatForbidden' 
        || (chat as Chat.chat).pFlags.left 
        // || (chat as any).pFlags.kicked
      ) {
        return;
      }
    }

    const peerText = this.appPeersManager.getPeerSearchText(peerId);
    this.dialogsIndex.indexObject(peerId, peerText);

    const wasDialogBefore = this.getDialogOnly(peerId);

    let mid: number, message: MyMessage;
    if(dialog.top_message) {
<<<<<<< HEAD
      mid = this.appMessagesIdsManager.generateMessageId(dialog.top_message);//dialog.top_message;
=======
      mid = generateMessageId(dialog.top_message);//dialog.top_message;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      // preserve outgoing message
      const wasTopMessage = wasDialogBefore?.top_message && this.appMessagesManager.getMessageByPeer(peerId, wasDialogBefore.top_message) as MyMessage;
      if(wasTopMessage?.pFlags?.is_outgoing && wasDialogBefore.top_message >= mid) {
        mid = wasDialogBefore.top_message;
      }

      message = this.appMessagesManager.getMessageByPeer(peerId, mid);
    } else {
      mid = this.appMessagesManager.generateTempMessageId(peerId);
      message = {
        _: 'message',
        id: mid,
        mid,
        from_id: this.appPeersManager.getOutputPeer(this.appUsersManager.getSelf().id.toPeerId(false)),
        peer_id: this.appPeersManager.getOutputPeer(peerId),
        deleted: true,
        pFlags: {out: true},
        date: 0,
        message: ''
      };
      this.appMessagesManager.saveMessages([message], {isOutgoing: true});
    }

    if(!message?.pFlags) {
      this.appMessagesManager.log.error('saveConversation no message:', dialog, message);
    }

    if(!channelId && peerId.isAnyChat()) {
      const chat = this.appChatsManager.getChat(peerId.toChatId());
      if(chat && chat.migrated_to && chat.pFlags.deactivated) {
<<<<<<< HEAD
        const migratedToPeer = this.appPeersManager.getPeerId(chat.migrated_to);
=======
        const migratedToPeer = getPeerId(chat.migrated_to);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.appMessagesManager.migratedFromTo[peerId] = migratedToPeer;
        this.appMessagesManager.migratedToFrom[migratedToPeer] = peerId;
        dialog.migratedTo = migratedToPeer;
        //return;
      }
    }

    dialog.top_message = mid;
<<<<<<< HEAD
    // dialog.unread_count = wasDialogBefore && dialog.read_inbox_max_id === this.appMessagesIdsManager.getServerMessageId(wasDialogBefore.read_inbox_max_id) ? wasDialogBefore.unread_count : dialog.unread_count;
    dialog.read_inbox_max_id = this.appMessagesIdsManager.generateMessageId(wasDialogBefore && !dialog.read_inbox_max_id ? wasDialogBefore.read_inbox_max_id : dialog.read_inbox_max_id);
    dialog.read_outbox_max_id = this.appMessagesIdsManager.generateMessageId(wasDialogBefore && !dialog.read_outbox_max_id ? wasDialogBefore.read_outbox_max_id : dialog.read_outbox_max_id);
=======
    // dialog.unread_count = wasDialogBefore && dialog.read_inbox_max_id === getServerMessageId(wasDialogBefore.read_inbox_max_id) ? wasDialogBefore.unread_count : dialog.unread_count;
    dialog.read_inbox_max_id = generateMessageId(wasDialogBefore && !dialog.read_inbox_max_id ? wasDialogBefore.read_inbox_max_id : dialog.read_inbox_max_id);
    dialog.read_outbox_max_id = generateMessageId(wasDialogBefore && !dialog.read_outbox_max_id ? wasDialogBefore.read_outbox_max_id : dialog.read_outbox_max_id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    if(dialog.folder_id === undefined) {
      if(dialog._ === 'dialog') {
        // ! СЛОЖНО ! СМОТРИ В getTopMessages
        dialog.folder_id = wasDialogBefore ? wasDialogBefore.folder_id : folderId;
      }/*  else if(dialog._ === 'dialogFolder') {
        dialog.folder_id = dialog.folder.id;
      } */
    }

    dialog.draft = this.appDraftsManager.saveDraft(peerId, 0, dialog.draft);
    dialog.peerId = peerId;
<<<<<<< HEAD

    // Because we saved message without dialog present
    if(message.pFlags.is_outgoing) {
=======
    // dialog.indexes ??= {} as any;

    // Because we saved message without dialog present
    if(message && message.pFlags.is_outgoing) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const isOut = message.pFlags.out;
      if(mid > dialog[isOut ? 'read_outbox_max_id' : 'read_inbox_max_id']) {
        message.pFlags.unread = true;

        if(!dialog.unread_count && !isOut) {
          ++dialog.unread_count;
        }
      } else {
        delete message.pFlags.unread;
      }
    }

    const historyStorage = this.appMessagesManager.getHistoryStorage(peerId);
    const slice = historyStorage.history.slice;
    /* if(historyStorage === undefined) { // warning
      historyStorage.history.push(mid);
    } else  */if(!slice.length) {
      historyStorage.history.unshift(mid);
      historyStorage.count ||= 1;
      if(this.appMessagesManager.mergeReplyKeyboard(historyStorage, message)) {
<<<<<<< HEAD
        rootScope.dispatchEvent('history_reply_markup', {peerId});
=======
        this.rootScope.dispatchEvent('history_reply_markup', {peerId});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    } else if(!slice.isEnd(SliceEnd.Bottom)) { // * this will probably never happen, however, if it does, then it will fix slice with top_message
      const slice = historyStorage.history.insertSlice([mid]);
      slice.setEnd(SliceEnd.Bottom);
      historyStorage.count ||= 1;
      if(this.appMessagesManager.mergeReplyKeyboard(historyStorage, message)) {
<<<<<<< HEAD
        rootScope.dispatchEvent('history_reply_markup', {peerId});
=======
        this.rootScope.dispatchEvent('history_reply_markup', {peerId});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }

    historyStorage.maxId = mid;
    historyStorage.readMaxId = dialog.read_inbox_max_id;
    historyStorage.readOutboxMaxId = dialog.read_outbox_max_id;

    this.appNotificationsManager.savePeerSettings({
      peerId, 
      settings: dialog.notify_settings
    });

    if(channelId && dialog.pts) {
      this.apiUpdatesManager.addChannelState(channelId, dialog.pts);
    }

    this.generateIndexForDialog(dialog);

<<<<<<< HEAD
    defineNotNumerableProperties(dialog, [
      'index_0',
      'index_1',
      'index_2',
      'index_3',
      'index_4',
      'index_5',
      'index_6',
      'index_7',
      'index_8',
      'index_9',
      'index_10'
    ]);

    if(wasDialogBefore) {
      safeReplaceObject(wasDialogBefore, dialog);
    }

    this.pushDialog(dialog, message.date, ignoreOffsetDate, saveGlobalOffset);
  }

  public getDialogIndexKey(filterId: number) {
    const indexStr = filterId > 1 ? 
      `index_${this.appMessagesManager.filtersStorage.getFilter(filterId).orderIndex}` as const : 
      'index' as const;

    return indexStr;
  }

  public getDialogs(query = '', offsetIndex?: number, limit = 20, folderId = 0, skipMigrated = false): {
    cached: boolean,
    promise: Promise<{
      dialogs: Dialog[],
      count: number,
      isTopEnd: boolean,
      isEnd: boolean
    }>
  } {
    const ret: {
      cached: boolean,
      promise: Promise<{
        dialogs: Dialog[],
        count: number,
        isTopEnd: boolean,
        isEnd: boolean
      }>
    } = {} as any;

=======
    if(wasDialogBefore) {
      // fix unread count
      const releaseUnreadCount = this.dialogsStorage.prepareDialogUnreadCountModifying(wasDialogBefore);
      safeReplaceObject(wasDialogBefore, dialog);
      releaseUnreadCount();
    }

    this.pushDialog(dialog, message?.date, ignoreOffsetDate, saveGlobalOffset);
  }

  public getDialogs(query = '', offsetIndex?: number, limit = 20, folderId: number = 0, skipMigrated = false): {
    dialogs: Dialog[],
    count: number,
    isTopEnd: boolean,
    isEnd: boolean
  } | Promise<{
    dialogs: Dialog[],
    count: number,
    isTopEnd: boolean,
    isEnd: boolean
  }> {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(folderId > 1) {
      const promises: Promise<any>[] = [];

      const fillContactsResult = this.appUsersManager.fillContacts();
      if(!fillContactsResult.cached) {
        promises.push(fillContactsResult.promise);
      }

<<<<<<< HEAD
      const reloadMissingDialogsPromise = this.appMessagesManager.filtersStorage.reloadMissingPeerIds(folderId);
=======
      const reloadMissingDialogsPromise = this.filtersStorage.reloadMissingPeerIds(folderId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(reloadMissingDialogsPromise) {
        promises.push(reloadMissingDialogsPromise);
      }

      if(promises.length) {
<<<<<<< HEAD
        ret.cached = false;
        ret.promise = Promise.all(promises).then(() => {
          return this.getDialogs(query, offsetIndex, limit, folderId, skipMigrated).promise;
        });

        return ret;
=======
        return Promise.all(promises).then(() => {
          return this.getDialogs(query, offsetIndex, limit, folderId, skipMigrated);
        });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }

    // let's load only first pages by certain folderId. next pages will load without folder filtering
<<<<<<< HEAD
    const realFolderId = folderId > 1 || this.getOffsetDate(folderId) ? GLOBAL_FOLDER_ID : folderId;
    let curDialogStorage = this.getFolderDialogs(folderId, skipMigrated);

    const indexStr = this.getDialogIndexKey(folderId);
=======
    const realFolderId: LOCAL_FOLDER_ID = folderId > 1 || this.getOffsetDate(folderId) ? GLOBAL_FOLDER_ID : folderId as LOCAL_FOLDER_ID;
    let curDialogStorage = this.getFolderDialogs(folderId, skipMigrated);

    const indexKey = this.getDialogIndexKeyByFilterId(folderId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    if(query) {
      if(!limit || this.cachedResults.query !== query || this.cachedResults.folderId !== folderId) {
        this.cachedResults.query = query;
        this.cachedResults.folderId = folderId;

        const results = this.dialogsIndex.search(query);

        const dialogs: Dialog[] = [];
        for(const peerId in this.dialogs) {
          const dialog = this.dialogs[peerId];
          if(results.has(dialog.peerId) && dialog.folder_id === folderId) {
            dialogs.push(dialog);
          }
        }

<<<<<<< HEAD
        dialogs.sort((d1, d2) => d2[indexStr] - d1[indexStr]);
=======
        dialogs.sort((d1, d2) => this.getDialogIndex(d2, indexKey) - this.getDialogIndex(d1, indexKey));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.cachedResults.dialogs = dialogs;
        this.cachedResults.count = dialogs.length;
      }

      curDialogStorage = this.cachedResults.dialogs;
    } else {
      this.cachedResults.query = '';
    }

    let offset = 0;
    if(offsetIndex > 0) {
      for(let length = curDialogStorage.length; offset < length; ++offset) {
<<<<<<< HEAD
        if(offsetIndex > curDialogStorage[offset][indexStr]) {
=======
        if(offsetIndex > this.getDialogIndex(curDialogStorage[offset], indexKey)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          break;
        }
      }
    }

    const loadedAll = this.isDialogsLoaded(realFolderId);
    const isEnoughDialogs = curDialogStorage.length >= (offset + limit);
    if(query || loadedAll || isEnoughDialogs) {
      const dialogs = curDialogStorage.slice(offset, offset + limit);
<<<<<<< HEAD
      ret.cached = true;
      ret.promise = Promise.resolve({
        dialogs,
        count: loadedAll ? curDialogStorage.length : null,
        isTopEnd: curDialogStorage.length && ((dialogs[0] && dialogs[0] === curDialogStorage[0]) || curDialogStorage[0][indexStr] < offsetIndex),
        isEnd: (query || loadedAll) && (offset + limit) >= curDialogStorage.length
      });

      return ret;
    }

    ret.cached = false;
    ret.promise = this.appMessagesManager.getTopMessages(limit, realFolderId).then(result => {
=======
      return {
        dialogs,
        count: loadedAll ? curDialogStorage.length : null,
        isTopEnd: curDialogStorage.length && ((dialogs[0] && dialogs[0] === curDialogStorage[0]) || this.getDialogIndex(curDialogStorage[0], indexKey) < offsetIndex),
        isEnd: (query || loadedAll) && (offset + limit) >= curDialogStorage.length
      };
    }

    return this.appMessagesManager.getTopMessages(limit, realFolderId).then((result) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      //const curDialogStorage = this[folderId];
      if(skipMigrated) {
        curDialogStorage = this.getFolderDialogs(folderId, skipMigrated);
      }

      offset = 0;
      if(offsetIndex > 0) {
        for(let length = curDialogStorage.length; offset < length; ++offset) {
<<<<<<< HEAD
          if(offsetIndex > curDialogStorage[offset][indexStr]) {
=======
          if(offsetIndex > this.getDialogIndex(curDialogStorage[offset], indexKey)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            break;
          }
        }
      }

      //this.log.warn(offset, offset + limit, curDialogStorage.dialogs.length, this.dialogs.length);

      const dialogs = curDialogStorage.slice(offset, offset + limit);
      return {
        dialogs,
        count: result.count === undefined ? curDialogStorage.length : result.count,
<<<<<<< HEAD
        isTopEnd: curDialogStorage.length && ((dialogs[0] && dialogs[0] === curDialogStorage[0]) || curDialogStorage[0][indexStr] < offsetIndex),
=======
        isTopEnd: curDialogStorage.length && ((dialogs[0] && dialogs[0] === curDialogStorage[0]) || this.getDialogIndex(curDialogStorage[0], indexKey) < offsetIndex),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        // isEnd: this.isDialogsLoaded(realFolderId) && (offset + limit) >= curDialogStorage.length
        isEnd: result.isEnd
      };
    });
<<<<<<< HEAD

    return ret;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  // only 0 and 1 folders
  private onUpdateFolderPeers = (update: Update.updateFolderPeers) => {
    //this.log('updateFolderPeers', update);
    const peers = update.folder_peers;

    peers.forEach((folderPeer) => {
      const {folder_id, peer} = folderPeer;

<<<<<<< HEAD
      const peerId = this.appPeersManager.getPeerId(peer);
=======
      const peerId = getPeerId(peer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const dialog = this.dropDialog(peerId)[0];
      if(dialog) {
        if(dialog.pFlags?.pinned) {
          this.handleDialogUnpinning(dialog, folder_id);
        }

<<<<<<< HEAD
        dialog.folder_id = folder_id;
=======
        dialog.folder_id = folder_id as LOCAL_FOLDER_ID;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.generateIndexForDialog(dialog);
        this.pushDialog(dialog); // need for simultaneously updatePinnedDialogs
      }

      this.appMessagesManager.scheduleHandleNewDialogs(peerId, dialog);
    });
  };

  private onUpdateDialogPinned = (update: Update.updateDialogPinned) => {
    const folderId = update.folder_id ?? 0;
    //this.log('updateDialogPinned', update);
<<<<<<< HEAD
    const peerId = this.appPeersManager.getPeerId((update.peer as DialogPeer.dialogPeer).peer);
=======
    const peerId = getPeerId((update.peer as DialogPeer.dialogPeer).peer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const dialog = this.getDialogOnly(peerId);

    // этот код внизу никогда не сработает, в папках за пиннед отвечает updateDialogFilter
    /* if(update.folder_id > 1) {
      const filter = this.filtersStorage.filters[update.folder_id];
      if(update.pFlags.pinned) {
        filter.pinned_peers.unshift(peerId);
      } else {
<<<<<<< HEAD
        filter.pinned_peers.findAndSplice(p => p === peerId);
=======
        filter.pinned_peers.findAndSplice((p) => p === peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    } */

    if(dialog) {
      if(!update.pFlags.pinned) {
        this.handleDialogUnpinning(dialog, folderId);
      } else { // means set
        dialog.pFlags.pinned = true;
      }

      this.generateIndexForDialog(dialog);
    } 

    this.appMessagesManager.scheduleHandleNewDialogs(peerId, dialog);
  };

  private onUpdatePinnedDialogs = (update: Update.updatePinnedDialogs) => {
    const folderId = update.folder_id ?? 0;
        
    const handleOrder = (order: PeerId[]) => {
      this.pinnedOrders[folderId].length = 0;
      order.reverse(); // index must be higher
      order.forEach((peerId) => {
        newPinned[peerId] = true;
  
        const dialog = this.getDialogOnly(peerId);
        this.appMessagesManager.scheduleHandleNewDialogs(peerId, dialog);
        if(!dialog) {
          return;
        }
  
        dialog.pFlags.pinned = true;
        this.generateIndexForDialog(dialog);
      });
      
      const dialogs = this.getFolderDialogs(folderId, false);
      for(const dialog of dialogs) {
        if(!dialog.pFlags.pinned) {
          break;
        }

        const peerId = dialog.peerId;
        if(!newPinned[peerId]) {
          this.appMessagesManager.scheduleHandleNewDialogs(peerId);
        }
      }
    };

    //this.log('updatePinnedDialogs', update);
    const newPinned: {[peerId: PeerId]: true} = {};
    if(!update.order) {
<<<<<<< HEAD
      apiManager.invokeApi('messages.getPinnedDialogs', {
=======
      this.apiManager.invokeApi('messages.getPinnedDialogs', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        folder_id: folderId
      }).then((dialogsResult) => {
        // * for test reordering and rendering
        // dialogsResult.dialogs.reverse();

        this.applyDialogs(dialogsResult);

<<<<<<< HEAD
        handleOrder(dialogsResult.dialogs.map(d => d.peerId));
=======
        handleOrder(dialogsResult.dialogs.map((d) => d.peerId));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        /* dialogsResult.dialogs.forEach((dialog) => {
          newPinned[dialog.peerId] = true;
        });

        this.dialogsStorage.getFolder(folderId).forEach((dialog) => {
          const peerId = dialog.peerId;
          if(dialog.pFlags.pinned && !newPinned[peerId]) {
            this.newDialogsToHandle[peerId] = {reload: true};
            this.scheduleHandleNewDialogs();
          }
        }); */
      });

      return;
    }

<<<<<<< HEAD
    //this.log('before order:', this.dialogsStorage[0].map(d => d.peerId));

    handleOrder(update.order.map(peer => this.appPeersManager.getPeerId((peer as DialogPeer.dialogPeer).peer)));
=======
    //this.log('before order:', this.dialogsStorage[0].map((d) => d.peerId));

    handleOrder(update.order.map((peer) => getPeerId((peer as DialogPeer.dialogPeer).peer)));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };
}
