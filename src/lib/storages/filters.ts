/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */
<<<<<<< HEAD

import type { DialogFilter, Update } from "../../layer";
import type { ArgumentTypes, Modify } from "../../types";
import type { AppPeersManager } from "../appManagers/appPeersManager";
import type { AppUsersManager } from "../appManagers/appUsersManager";
//import type { ApiManagerProxy } from "../mtproto/mtprotoworker";
import type _rootScope from "../rootScope";
import type {AppMessagesManager, Dialog} from '../appManagers/appMessagesManager';
import type {AppNotificationsManager} from "../appManagers/appNotificationsManager";
import type { ApiUpdatesManager } from "../appManagers/apiUpdatesManager";
import type { AppStateManager } from "../appManagers/appStateManager";
import apiManager from "../mtproto/mtprotoworker";
import forEachReverse from "../../helpers/array/forEachReverse";
import copy from "../../helpers/object/copy";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";
import findAndSplice from "../../helpers/array/findAndSplice";

export type MyDialogFilter = Modify<DialogFilter, {
=======

import type { DialogFilter, Update } from "../../layer";
import { Modify } from "../../types";
import type { Dialog } from '../appManagers/appMessagesManager';
import forEachReverse from "../../helpers/array/forEachReverse";
import copy from "../../helpers/object/copy";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";
import getPeerId from "../appManagers/utils/peers/getPeerId";
import { AppManager } from "../appManagers/manager";
import assumeType from "../../helpers/assumeType";

export type MyDialogFilter = Modify<DialogFilter.dialogFilter, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  /* pinned_peers: PeerId[],
  include_peers: PeerId[],
  exclude_peers: PeerId[], */
  pinnedPeerIds: PeerId[],
  includePeerIds: PeerId[],
  excludePeerIds: PeerId[]
}>;

const convertment = [
  ['pinned_peers', 'pinnedPeerIds'], 
  ['exclude_peers', 'excludePeerIds'], 
  ['include_peers', 'includePeerIds']
] as ['pinned_peers' | 'exclude_peers' | 'include_peers', 'pinnedPeerIds' | 'excludePeerIds' | 'includePeerIds'][];
<<<<<<< HEAD

// ! because 0 index is 'All Chats'
const START_ORDER_INDEX = 1;

export default class FiltersStorage {
  public filters: {[filterId: string]: MyDialogFilter};
  private orderIndex: number;
  private reloadedPeerIds: Set<PeerId>;

  constructor(private appMessagesManager: AppMessagesManager,
    private appPeersManager: AppPeersManager, 
    private appUsersManager: AppUsersManager, 
    private appNotificationsManager: AppNotificationsManager, 
    private appStateManager: AppStateManager,
    private apiUpdatesManager: ApiUpdatesManager, 
    /* private apiManager: ApiManagerProxy, */ 
    private rootScope: typeof _rootScope) {
    this.clear(true);
    this.filters = {};

    this.appStateManager.getState().then((state) => {
      safeReplaceObject(this.filters, state.filters);

      for(const filterId in this.filters) {
        const filter = this.filters[filterId];
        if(filter.hasOwnProperty('orderIndex') && filter.orderIndex >= this.orderIndex) {
          this.orderIndex = filter.orderIndex + 1;
        }

        /* this.appMessagesManager.dialogsStorage.folders[+filterId] = {
          dialogs: []
        }; */
      }
    });

    rootScope.addMultipleEventsListeners({
      updateDialogFilter: this.onUpdateDialogFilter,

=======

const START_ORDER_INDEX = 2;

// const LOCAL_FILTER: MyDialogFilter = {
//   _: 'dialogFilter',
//   id: 0,
//   title: '',
//   exclude_peers: [],
//   include_peers: [],
//   pinned_peers: [],
//   excludePeerIds: [],
//   includePeerIds: [],
//   pinnedPeerIds: [],
//   pFlags: {}
// };

export default class FiltersStorage extends AppManager {
  private filters: {[filterId: string]: MyDialogFilter};
  private orderIndex: number;
  private reloadedPeerIds: Set<PeerId>;

  protected after() {
    this.clear(true);
    this.filters = {};

    this.apiUpdatesManager.addMultipleEventsListeners({
      updateDialogFilter: this.onUpdateDialogFilter,

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      updateDialogFilters: (update) => {
        //console.warn('updateDialogFilters', update);

        const oldFilters = copy(this.filters);

        this.getDialogFilters(true).then((filters) => {
          for(const _filterId in oldFilters) {
            const filterId = +_filterId;
<<<<<<< HEAD
            if(!filters.find(filter => filter.id === filterId)) { // * deleted
=======
            if(!filters.find((filter) => filter.id === filterId)) { // * deleted
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              this.onUpdateDialogFilter({_: 'updateDialogFilter', id: filterId});
            }
          }

<<<<<<< HEAD
          this.onUpdateDialogFilterOrder({_: 'updateDialogFilterOrder', order: filters.map(filter => filter.id)});
=======
          this.onUpdateDialogFilterOrder({_: 'updateDialogFilterOrder', order: filters.map((filter) => filter.id)});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        });
      },

      updateDialogFilterOrder: this.onUpdateDialogFilterOrder
    });

    // delete peers when dialog is being dropped
    /* rootScope.addEventListener('peer_deleted', (peerId) => {
      for(const filterId in this.filters) {
        const filter = this.filters[filterId];
        let modified = false;
<<<<<<< HEAD
        [filter.pinned_peers, filter.include_peers, filter.exclude_peers].forEach(arr => {
          forEachReverse(arr, (inputPeer, idx) => {
            if(this.appPeersManager.getPeerId(inputPeer) === peerId) {
=======
        [filter.pinned_peers, filter.include_peers, filter.exclude_peers].forEach((arr) => {
          forEachReverse(arr, (inputPeer, idx) => {
            if(getPeerId(inputPeer) === peerId) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              arr.splice(idx, 1);
              modified = true;
            }
          });
        });

        if(modified) {
          this.saveDialogFilter(filter, true);
        }
<<<<<<< HEAD
      }
    }); */
  }

  public clear(init = false) {
    if(!init) {
      safeReplaceObject(this.filters, {});
      this.reloadedPeerIds.clear();
=======
      }
    }); */

    return this.appStateManager.getState().then((state) => {
      safeReplaceObject(this.filters, state.filters);

      for(const filterId in this.filters) {
        const filter = this.filters[filterId];
        if(filter.hasOwnProperty('orderIndex') && filter.orderIndex >= this.orderIndex) {
          this.orderIndex = filter.orderIndex + 1;
        }

        /* this.appMessagesManager.dialogsStorage.folders[+filterId] = {
          dialogs: []
        }; */
      }

      // delete this.filters[0];
      // delete this.filters[1];
      // this.getLocalFilter(0);
      // this.getLocalFilter(1);
    });
  }

  // private getLocalFilter(id: number) {
  //   return this.filters[id] ??= {...copy(LOCAL_FILTER), id};
  // }

  public clear = (init?: boolean) => {
    if(!init) {
      // safeReplaceObject(this.filters, {});
      this.reloadedPeerIds.clear();
      this.clearFilters();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    } else {
      this.filters = {};
      this.reloadedPeerIds = new Set();
    }

    this.orderIndex = START_ORDER_INDEX;
<<<<<<< HEAD
  }
=======
  };
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  private onUpdateDialogFilter = (update: Update.updateDialogFilter) => {
    if(update.filter) {
      this.saveDialogFilter(update.filter as any);
    } else if(this.filters[update.id]) { // Папка удалена
      //this.getDialogFilters(true);
      this.rootScope.dispatchEvent('filter_delete', this.filters[update.id]);
      delete this.filters[update.id];
    }

    this.appStateManager.pushToState('filters', this.filters);
  };

  private onUpdateDialogFilterOrder = (update: Update.updateDialogFilterOrder) => {
    //console.log('updateDialogFilterOrder', update);

    this.orderIndex = START_ORDER_INDEX;
    update.order.forEach((filterId, idx) => {
      const filter = this.filters[filterId];
      delete filter.orderIndex;
      this.setOrderIndex(filter);
    });

    this.rootScope.dispatchEvent('filter_order', update.order);

    this.appStateManager.pushToState('filters', this.filters);
  };

  public testDialogForFilter(dialog: Dialog, filter: MyDialogFilter) {
<<<<<<< HEAD
=======
    if(filter.id <= 1) {
      return dialog.folder_id === filter.id;
    }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const peerId = dialog.peerId;

    // * check whether dialog exists
    if(!this.appMessagesManager.getDialogOnly(peerId)) {
      return false;
    }

    // exclude_peers
    if(filter.excludePeerIds.includes(peerId)) {
      return false;
    }

    // include_peers
    if(filter.includePeerIds.includes(peerId)) {
      return true;
    }

    const pFlags = filter.pFlags;

    // exclude_archived
    if(pFlags.exclude_archived && dialog.folder_id === 1) {
      return false;
    }

    // exclude_read
    if(pFlags.exclude_read && !this.appMessagesManager.isDialogUnread(dialog)) {
      return false;
    }

    // exclude_muted
    if(pFlags.exclude_muted && this.appNotificationsManager.isPeerLocalMuted(peerId) && !(dialog.unread_mentions_count && dialog.unread_count)) {
      return false;
    }

    if(this.appPeersManager.isAnyChat(peerId)) {
      // broadcasts
      if(pFlags.broadcasts && this.appPeersManager.isBroadcast(peerId)) {
        return true;
      }

      // groups
      if(pFlags.groups && this.appPeersManager.isAnyGroup(peerId)) {
        return true;
      }
    } else {
      const userId = peerId.toUserId();
      
      // bots
      if(this.appUsersManager.isBot(userId)) {
        return !!pFlags.bots;
      }
      
      // non_contacts
      if(pFlags.non_contacts && !this.appUsersManager.isContact(userId)) {
        return true;
      }

      // contacts
      if(pFlags.contacts && this.appUsersManager.isContact(userId)) {
        return true;
      }
    }

    return false;
  }

  public testDialogForFilterId(dialog: Dialog, filterId: number) {
    return this.testDialogForFilter(dialog, this.filters[filterId]);
  }

  public getFilter(filterId: number) {
    return this.filters[filterId];
  }

<<<<<<< HEAD
  public toggleDialogPin(peerId: PeerId, filterId: number) {
=======
  public getFilters() {
    return this.filters;
  }

  public clearFilters() {
    const filters = this.getFilters();
    for(const filterId in filters) { // delete filters
      this.onUpdateDialogFilter({
        _: 'updateDialogFilter',
        id: +filterId,
      });
    }
  }

  public async toggleDialogPin(peerId: PeerId, filterId: number) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const filter = this.filters[filterId];

    const index = filter.pinnedPeerIds.indexOf(peerId);
    const wasPinned = index !== -1;

    if(wasPinned) {
      filter.pinned_peers.splice(index, 1);
      filter.pinnedPeerIds.splice(index, 1);
    }
    
    if(!wasPinned) {
<<<<<<< HEAD
      if(filter.pinned_peers.length >= this.rootScope.config.pinned_infolder_count_max) {
=======
      if(filter.pinned_peers.length >= (await this.apiManager.getConfig()).pinned_infolder_count_max) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return Promise.reject({type: 'PINNED_DIALOGS_TOO_MUCH'});
      }
      
      filter.pinned_peers.unshift(this.appPeersManager.getInputPeerById(peerId));
      filter.pinnedPeerIds.unshift(peerId);
    }
    
    return this.updateDialogFilter(filter);
  }

  public createDialogFilter(filter: MyDialogFilter, prepend?: boolean) {
<<<<<<< HEAD
    const maxId = Math.max(1, ...Object.keys(this.filters).map(i => +i));
=======
    const maxId = Math.max(1, ...Object.keys(this.filters).map((i) => +i));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    filter = copy(filter);
    filter.id = maxId + 1;
    return this.updateDialogFilter(filter, undefined, prepend);
  }

  public updateDialogFilter(filter: MyDialogFilter, remove = false, prepend = false) {
    const flags = remove ? 0 : 1;

    return this.apiManager.invokeApi('messages.updateDialogFilter', {
      flags,
      id: filter.id,
      filter: remove ? undefined : this.getOutputDialogFilter(filter)
    }).then((bool: boolean) => { // возможно нужна проверка и откат, если результат не ТРУ
      //console.log('updateDialogFilter bool:', bool);

      if(bool) {
        /* if(!this.filters[filter.id]) {
          this.saveDialogFilter(filter);
        }

        rootScope.$broadcast('filter_update', filter); */

        this.onUpdateDialogFilter({
          _: 'updateDialogFilter',
          id: filter.id,
          filter: remove ? undefined : filter as any
        });

        if(prepend) {
          const f: MyDialogFilter[] = [];
          for(const filterId in this.filters) {
            const filter = this.filters[filterId];
            ++filter.orderIndex;
            f.push(filter);
          }

          filter.orderIndex = START_ORDER_INDEX;

<<<<<<< HEAD
          const order = f.sort((a, b) => a.orderIndex - b.orderIndex).map(filter => filter.id);
=======
          const order = f.sort((a, b) => a.orderIndex - b.orderIndex).map((filter) => filter.id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          this.onUpdateDialogFilterOrder({
            _: 'updateDialogFilterOrder',
            order
          });
        }
      }

      return bool;
    });
  }

  public getOutputDialogFilter(filter: MyDialogFilter) {
    const c = copy(filter);
    /* convertment.forEach(([from, to]) => {
      c[from] = c[to].map((peerId) => this.appPeersManager.getInputPeerById(peerId));
    }); */

    this.filterIncludedPinnedPeers(filter);

    return c;
  }

  private filterIncludedPinnedPeers(filter: MyDialogFilter) {
    forEachReverse(filter.includePeerIds, (peerId, idx) => {
      if(filter.pinnedPeerIds.includes(peerId)) {
        filter.include_peers.splice(idx, 1);
        filter.includePeerIds.splice(idx, 1);
      }
    });
  }

  // private spliceMissingPeerIds(filterId: number, type: ArgumentTypes<FiltersStorage['reloadMissingPeerIds']>[1], missingPeerIds: PeerId[]) {
  //   const filter = this.getFilter(filterId);
  //   const peers = filter && filter[type];
  //   if(!peers?.length) {
  //     return;
  //   }

  //   let spliced = false;
  //   missingPeerIds.forEach((peerId) => {
<<<<<<< HEAD
  //     const inputPeer = findAndSplice(peers, (inputPeer) => this.appPeersManager.getPeerId(inputPeer) === peerId);
=======
  //     const inputPeer = findAndSplice(peers, (inputPeer) => getPeerId(inputPeer) === peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  //     if(inputPeer) {
  //       spliced = true;
  //     }
  //   });

  //   if(spliced) {
  //     this.onUpdateDialogFilter({
  //       _: 'updateDialogFilter',
  //       id: filterId,
  //       filter
  //     });
  //   }
  // }

  public reloadMissingPeerIds(filterId: number, type: 'pinned_peers' | 'include_peers' | 'exclude_peers' = 'pinned_peers') {
    const filter = this.getFilter(filterId);
    const peers = filter && filter[type];
    if(!peers?.length) {
      return;
    }

    // const missingPeerIds: PeerId[] = [];
    const reloadDialogs = peers.filter((inputPeer) => {
<<<<<<< HEAD
      const peerId = this.appPeersManager.getPeerId(inputPeer);
=======
      const peerId = getPeerId(inputPeer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const isAlreadyReloaded = this.reloadedPeerIds.has(peerId);
      const dialog = this.appMessagesManager.getDialogOnly(peerId);
      // if(isAlreadyReloaded && !dialog) {
      //   missingPeerIds.push(peerId);
      // }

      const reload = !isAlreadyReloaded && !dialog;
      return reload;
    });

    if(!reloadDialogs.length) {
      // if(missingPeerIds.length) {
      //   this.spliceMissingPeerIds(filterId, type, missingPeerIds);
      // }

      return;
    }

    const reloadPromises = reloadDialogs.map((inputPeer) => {
<<<<<<< HEAD
      const peerId = this.appPeersManager.getPeerId(inputPeer);
=======
      const peerId = getPeerId(inputPeer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const promise = this.appMessagesManager.reloadConversation(inputPeer)
      .then((dialog) => {
        this.reloadedPeerIds.add(peerId);

        return dialog ? undefined : peerId;
      });

      return promise;
    });

    const reloadPromise = Promise.all(reloadPromises).then((missingPeerIds) => {
      missingPeerIds = missingPeerIds.filter(Boolean);
      if(!missingPeerIds.length) {
        return;
      }

      // this.spliceMissingPeerIds(filterId, type, missingPeerIds);
    });

    return reloadPromise;
  }

  public async getDialogFilters(overwrite = false): Promise<MyDialogFilter[]> {
    const keys = Object.keys(this.filters);
    if(keys.length && !overwrite) {
      return keys.map((filterId) => this.filters[filterId]).sort((a, b) => a.orderIndex - b.orderIndex);
    }

<<<<<<< HEAD
    const filters: MyDialogFilter[] = await apiManager.invokeApiSingle('messages.getDialogFilters') as any;
    for(const filter of filters) {
      this.saveDialogFilter(filter, overwrite);
    }

    //console.log(this.filters);
    return filters;
  }

  public saveDialogFilter(filter: MyDialogFilter, update = true) {
    // defineNotNumerableProperties(filter, ['includePeerIds', 'excludePeerIds', 'pinnedPeerIds']);

    convertment.forEach(([from, to]) => {
      filter[to] = filter[from].map((peer) => this.appPeersManager.getPeerId(peer));
=======
    const filters = await this.apiManager.invokeApiSingle('messages.getDialogFilters');
    return filters.map((filter) => this.saveDialogFilter(filter, overwrite)).filter(Boolean);
  }

  public getSuggestedDialogsFilters() {
    return this.apiManager.invokeApi('messages.getSuggestedDialogFilters');
  }

  public saveDialogFilter(filter: DialogFilter, update = true) {
    // defineNotNumerableProperties(filter, ['includePeerIds', 'excludePeerIds', 'pinnedPeerIds']);

    // if(filter._ === 'dialogFilterDefault') {
    //   return;
    //   // filter = this.getLocalFilter(0);
    //   // delete filter.orderIndex;
    // }

    assumeType<MyDialogFilter>(filter);
    convertment.forEach(([from, to]) => {
      assumeType<MyDialogFilter>(filter);
      filter[to] = filter[from].map((peer) => getPeerId(peer));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    this.filterIncludedPinnedPeers(filter);
    
    filter.include_peers = filter.pinned_peers.concat(filter.include_peers);
    filter.includePeerIds = filter.pinnedPeerIds.concat(filter.includePeerIds);

    const oldFilter = this.filters[filter.id];
    if(oldFilter) {
      Object.assign(oldFilter, filter);
    } else {
      this.filters[filter.id] = filter;
    }
    
    this.setOrderIndex(filter);
    
    if(update) {
      this.rootScope.dispatchEvent('filter_update', filter);
    } else if(!oldFilter) {
      this.rootScope.dispatchEvent('filter_new', filter);
    }

    return filter;
  }

  public setOrderIndex(filter: MyDialogFilter) {
    if(filter.hasOwnProperty('orderIndex')) {
      if(filter.orderIndex >= this.orderIndex) {
        this.orderIndex = filter.orderIndex + 1;
      }
    } else {
<<<<<<< HEAD
      filter.orderIndex = this.orderIndex++ as DialogFilter['orderIndex'];
=======
      filter.orderIndex = this.orderIndex++ as MyDialogFilter['orderIndex'];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    this.appStateManager.pushToState('filters', this.filters);
  }
}
