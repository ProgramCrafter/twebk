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

import { MOUNT_CLASS_TO } from "../../config/debug";
import filterUnique from "../../helpers/array/filterUnique";
import findAndSplice from "../../helpers/array/findAndSplice";
import indexOfAndSplice from "../../helpers/array/indexOfAndSplice";
import deferredPromise, { CancellablePromise } from "../../helpers/cancellablePromise";
import cleanSearchText from "../../helpers/cleanSearchText";
import cleanUsername from "../../helpers/cleanUsername";
import { formatFullSentTimeRaw, tsNow } from "../../helpers/date";
import { formatPhoneNumber } from "../../helpers/formatPhoneNumber";
import isObject from "../../helpers/object/isObject";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";
import { isRestricted } from "../../helpers/restrictions";
import { Chat, ContactsResolvedPeer, InputContact, InputGeoPoint, InputMedia, InputPeer, InputUser, User as MTUser, UserProfilePhoto, UserStatus } from "../../layer";
import I18n, { i18n, LangPackKey } from "../langPack";
//import apiManager from '../mtproto/apiManager';
import apiManager from '../mtproto/mtprotoworker';
import { REPLIES_PEER_ID, SERVICE_PEER_ID } from "../mtproto/mtproto_config";
import serverTimeManager from "../mtproto/serverTimeManager";
import { RichTextProcessor } from "../richtextprocessor";
import rootScope from "../rootScope";
import SearchIndex from "../searchIndex";
import apiUpdatesManager from "./apiUpdatesManager";
import appChatsManager from "./appChatsManager";
import appPeersManager from "./appPeersManager";
import appStateManager from "./appStateManager";

=======

import filterUnique from "../../helpers/array/filterUnique";
import indexOfAndSplice from "../../helpers/array/indexOfAndSplice";
import deferredPromise, { CancellablePromise } from "../../helpers/cancellablePromise";
import cleanSearchText from "../../helpers/cleanSearchText";
import cleanUsername from "../../helpers/cleanUsername";
import tsNow from "../../helpers/tsNow";
import isObject from "../../helpers/object/isObject";
import safeReplaceObject from "../../helpers/object/safeReplaceObject";
import { isRestricted } from "../../helpers/restrictions";
import { Chat, ContactsResolvedPeer, InputContact, InputGeoPoint, InputMedia, InputPeer, InputUser, User as MTUser, UserProfilePhoto, UserStatus } from "../../layer";
import parseEntities from "../richTextProcessor/parseEntities";
import wrapUrl from "../richTextProcessor/wrapUrl";
import SearchIndex from "../searchIndex";
import { AppManager } from "./manager";
import getPeerId from "./utils/peers/getPeerId";
import canSendToUser from "./utils/users/canSendToUser";
import { AppStoragesManager } from "./appStoragesManager";

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
export type User = MTUser.user;
export type TopPeerType = 'correspondents' | 'bots_inline';
export type MyTopPeer = {id: PeerId, rating: number};

<<<<<<< HEAD
export class AppUsersManager {
  private storage = appStateManager.storages.users;
=======
export class AppUsersManager extends AppManager {
  private storage: AppStoragesManager['storages']['users'];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
  private users: {[userId: UserId]: User};
  private usernames: {[username: string]: UserId};
  private contactsIndex: SearchIndex<UserId>;
  private contactsFillPromise: CancellablePromise<AppUsersManager['contactsList']>;
  private contactsList: Set<UserId>;
  private updatedContactsList: boolean;
  
  private getTopPeersPromises: {[type in TopPeerType]?: Promise<MyTopPeer[]>};
<<<<<<< HEAD

  constructor() {
    this.clear(true);

    setInterval(this.updateUsersStatuses, 60000);

    rootScope.addEventListener('state_synchronized', this.updateUsersStatuses);

    rootScope.addMultipleEventsListeners({
=======

  protected after() {
    this.clear(true);

    setInterval(this.updateUsersStatuses, 60000);

    this.rootScope.addEventListener('state_synchronized', this.updateUsersStatuses);

    this.apiUpdatesManager.addMultipleEventsListeners({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      updateUserStatus: (update) => {
        const userId = update.user_id;
        const user = this.users[userId];
        if(user) {
          user.status = update.status;
          if(user.status) {
            if('expires' in user.status) {
<<<<<<< HEAD
              user.status.expires -= serverTimeManager.serverTimeOffset;
=======
              user.status.expires -= this.timeManager.getServerTimeOffset();
            }

            if('was_online' in user.status) {
              user.status.was_online -= this.timeManager.getServerTimeOffset();
            }
          }

          //user.sortStatus = this.getUserStatusForSort(user.status);
          this.rootScope.dispatchEvent('user_update', userId);
          this.setUserToStateIfNeeded(user);
        } //////else console.warn('No user by id:', userId);
      },

      updateUserPhoto: (update) => {
        const userId = update.user_id;
        const user = this.users[userId];
        if(user) {
          if((user.photo as UserProfilePhoto.userProfilePhoto)?.photo_id === (update.photo as UserProfilePhoto.userProfilePhoto)?.photo_id) {
            return;
          }

          this.forceUserOnline(userId, update.date);

          if(update.photo._ === 'userProfilePhotoEmpty') {
            delete user.photo;
          } else {
            user.photo = safeReplaceObject(user.photo, update.photo);
          }

          this.setUserToStateIfNeeded(user);

          this.rootScope.dispatchEvent('user_update', userId);
          this.rootScope.dispatchEvent('avatar_update', userId.toPeerId());
        } else console.warn('No user by id:', userId);
      },

      updateUserName: (update) => {
        const userId = update.user_id;
        const user = this.users[userId];
        if(user) {
          this.forceUserOnline(userId);
          
          this.saveApiUser({
            ...user, 
            first_name: update.first_name,
            last_name: update.last_name,
            username: update.username
          }, true);
        }
      }
    });

    /* case 'updateContactLink':
    this.onContactUpdated(update.user_id, update.my_link._ === 'contactLinkContact');
    break; */

    this.rootScope.addEventListener('language_change', (e) => {
      const userId = this.getSelf().id;
      this.contactsIndex.indexObject(userId, this.getUserSearchText(userId));
    });

    return Promise.all([
      this.appStateManager.getState(),
      this.appStoragesManager.loadStorage('users')
    ]).then(([state, {results: users, storage}]) => {
      this.storage = storage;
      
      if(users.length) {
        for(let i = 0, length = users.length; i < length; ++i) {
          const user = users[i];
          if(user) {
            this.users[user.id] = user;
            this.setUserNameToCache(user);

            if(state.contactsListCachedTime && (user.pFlags.contact || user.pFlags.mutual_contact)) {
              this.pushContact(user.id);

              if(!this.contactsFillPromise) {
                this.contactsFillPromise = deferredPromise();
                this.contactsFillPromise.resolve(this.contactsList);
              }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            }
          }
        }
      }

<<<<<<< HEAD
            if('was_online' in user.status) {
              user.status.was_online -= serverTimeManager.serverTimeOffset;
            }
          }

          //user.sortStatus = this.getUserStatusForSort(user.status);
          rootScope.dispatchEvent('user_update', userId);
          this.setUserToStateIfNeeded(user);
        } //////else console.warn('No user by id:', userId);
      },

      updateUserPhoto: (update) => {
        const userId = update.user_id;
        const user = this.users[userId];
        if(user) {
          if((user.photo as UserProfilePhoto.userProfilePhoto)?.photo_id === (update.photo as UserProfilePhoto.userProfilePhoto)?.photo_id) {
            return;
          }

          this.forceUserOnline(userId, update.date);

          if(update.photo._ === 'userProfilePhotoEmpty') {
            delete user.photo;
          } else {
            user.photo = safeReplaceObject(user.photo, update.photo);
          }

          this.setUserToStateIfNeeded(user);

          rootScope.dispatchEvent('user_update', userId);
          rootScope.dispatchEvent('avatar_update', userId.toPeerId());
        } else console.warn('No user by id:', userId);
      },

      updateUserName: (update) => {
        const userId = update.user_id;
        const user = this.users[userId];
        if(user) {
          this.forceUserOnline(userId);
          
          this.saveApiUser({
            ...user, 
            first_name: update.first_name,
            last_name: update.last_name,
            username: update.username
          }, true);
=======
      // const contactsList = state.contactsList;
      // if(Array.isArray(contactsList)) {
      //   contactsList.forEach((userId) => {
      //     this.pushContact(userId);
      //   });

      //   if(contactsList.length) {
      //     this.contactsFillPromise = deferredPromise();
      //     this.contactsFillPromise.resolve(this.contactsList);
      //   }
      // }

      const recentSearch = state.recentSearch || [];
      for(let i = 0, length = recentSearch.length; i < length; ++i) {
        this.peersStorage.requestPeer(recentSearch[i], 'recentSearch');
      }

      this.peersStorage.addEventListener('peerNeeded', (peerId) => {
        if(!this.appPeersManager.isUser(peerId)) {
          return;
        }
        
        const userId = peerId.toUserId();
        if(!this.storage.getFromCache(userId)) {
          this.storage.set({
            [userId]: this.getUser(userId)
          });
        }
      });

      this.peersStorage.addEventListener('peerUnneeded', (peerId) => {
        if(!this.appPeersManager.isUser(peerId)) {
          return;
        }

        const userId = peerId.toUserId();
        if(this.storage.getFromCache(userId)) {
          this.storage.delete(userId);
        }
      });
    });
  }

  public clear = (init = false) => {
    if(!init) {
      for(const userId in this.users) {
        // const userId = +userId;
        if(!userId) continue;
        const peerId = userId.toPeerId();
        if(!this.peersStorage.isPeerNeeded(peerId)) {
          const user = this.users[userId];
          if(user.username) {
            delete this.usernames[cleanUsername(user.username)];
          }

          this.storage.delete(userId);
          delete this.users[userId];
        }
      }
    } else {
      this.users = {};
      this.usernames = {};
    }
    
    this.getTopPeersPromises = {};
    this.contactsIndex = this.createSearchIndex();
    this.contactsFillPromise = undefined;
    this.contactsList = new Set();
    this.updatedContactsList = false;
  };

  public get userId() {
    return this.rootScope.myId.toUserId();
  }

  private onContactsModified(fromServer?: boolean) {
    // const contactsList = [...this.contactsList];
    // this.appStateManager.pushToState('contactsList', contactsList);

    if(fromServer) {
      this.appStateManager.pushToState('contactsListCachedTime', tsNow(true));
    }
  }

  public pushRecentSearch(peerId: PeerId) {
    return this.appStateManager.getState().then((state) => {
      const recentSearch = state.recentSearch || [];
      if(recentSearch[0] !== peerId) {
        indexOfAndSplice(recentSearch, peerId);
        recentSearch.unshift(peerId);
        if(recentSearch.length > 20) {
          recentSearch.length = 20;
        }

        this.appStateManager.pushToState('recentSearch', recentSearch);
        for(const peerId of recentSearch) {
          this.peersStorage.requestPeer(peerId, 'recentSearch');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }
      }
    });
  }

<<<<<<< HEAD
    /* case 'updateContactLink':
    this.onContactUpdated(update.user_id, update.my_link._ === 'contactLinkContact');
    break; */

    rootScope.addEventListener('language_change', (e) => {
      const userId = this.getSelf().id;
      this.contactsIndex.indexObject(userId, this.getUserSearchText(userId));
    });

    appStateManager.getState().then((state) => {
      const users = appStateManager.storagesResults.users;
      if(users.length) {
        for(let i = 0, length = users.length; i < length; ++i) {
          const user = users[i];
          if(user) {
            this.users[user.id] = user;
            this.setUserNameToCache(user);
          }
        }
      }

      const contactsList = state.contactsList;
      if(contactsList && Array.isArray(contactsList)) {
        contactsList.forEach(userId => {
          this.pushContact(userId);
        });

        if(contactsList.length) {
          this.contactsFillPromise = deferredPromise();
          this.contactsFillPromise.resolve(this.contactsList);
        }
      }

      appStateManager.addEventListener('peerNeeded', (peerId) => {
        if(!appPeersManager.isUser(peerId)) {
          return;
        }
        
        const userId = peerId.toUserId();
        if(!this.storage.getFromCache(userId)) {
          this.storage.set({
            [userId]: this.getUser(userId)
          });
        }
      });

      appStateManager.addEventListener('peerUnneeded', (peerId) => {
        if(!appPeersManager.isUser(peerId)) {
          return;
        }

        const userId = peerId.toUserId();
        if(this.storage.getFromCache(userId)) {
          this.storage.delete(userId);
        }
      });
=======
  public clearRecentSearch() {
    return this.appStateManager.getState().then((state) => {
      const recentSearch = state.recentSearch || [];
      for(const peerId of recentSearch) {
        this.peersStorage.releasePeer(peerId, 'recentSearch');
      }

      recentSearch.length = 0;
      this.appStateManager.pushToState('recentSearch', recentSearch);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public clear(init = false) {
    if(!init) {
      const users = appStateManager.storagesResults.users;
      for(const userId in this.users) {
        // const userId = +userId;
        if(!userId) continue;
        const peerId = userId.toPeerId();
        if(!appStateManager.isPeerNeeded(peerId)) {
          const user = this.users[userId];
          if(user.username) {
            delete this.usernames[cleanUsername(user.username)];
          }

          findAndSplice(users, (user) => user.id === userId);
          this.storage.delete(userId);
          delete this.users[userId];
        }
      }
    } else {
      this.users = {};
      this.usernames = {};
    }
    
    this.getTopPeersPromises = {};
    this.contactsIndex = this.createSearchIndex();
    this.contactsFillPromise = undefined;
    this.contactsList = new Set();
    this.updatedContactsList = false;
  }

  private onContactsModified() {
    const contactsList = [...this.contactsList];
    appStateManager.pushToState('contactsList', contactsList);
  }

  public fillContacts() {
    if(this.contactsFillPromise && this.updatedContactsList) {
      return {
        cached: this.contactsFillPromise.isFulfilled,
        promise: this.contactsFillPromise
      };
    }

    this.updatedContactsList = true;

    const promise = deferredPromise<Set<UserId>>();
<<<<<<< HEAD
    apiManager.invokeApi('contacts.getContacts').then((result) => {
=======
    this.apiManager.invokeApi('contacts.getContacts').then((result) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(result._ === 'contacts.contacts') {
        this.contactsList.clear();
      
        this.saveApiUsers(result.users);

        result.contacts.forEach((contact) => {
          this.pushContact(contact.user_id);
        });

<<<<<<< HEAD
        this.onContactsModified();
=======
        this.onContactsModified(true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        this.contactsFillPromise = promise;
      }

      promise.resolve(this.contactsList);
    }, () => {
      this.updatedContactsList = false;
    });

    return {
      cached: this.contactsFillPromise?.isFulfilled,
      promise: this.contactsFillPromise || (this.contactsFillPromise = promise)
    };
  }

<<<<<<< HEAD
  public resolveUsername(username: string): Promise<Chat | User> {
=======
  public resolveUsername(username: string): Promise<Chat | User> | Chat | User {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(username[0] === '@') {
      username = username.slice(1);
    }

    username = username.toLowerCase();
    const userId = this.usernames[username];
    if(userId) {
      return this.users[userId];
    }

<<<<<<< HEAD
    return apiManager.invokeApi('contacts.resolveUsername', {username}).then(resolvedPeer => {
=======
    return this.apiManager.invokeApi('contacts.resolveUsername', {username}).then((resolvedPeer) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return this.processResolvedPeer(resolvedPeer);
    });
  }

  private processResolvedPeer(resolvedPeer: ContactsResolvedPeer.contactsResolvedPeer) {
    this.saveApiUsers(resolvedPeer.users);
<<<<<<< HEAD
    appChatsManager.saveApiChats(resolvedPeer.chats);

    return appPeersManager.getPeer(appPeersManager.getPeerId(resolvedPeer.peer)) as Chat | User;
  }

  public resolvePhone(phone: string) {
    return apiManager.invokeApi('contacts.resolvePhone', {phone}).then(resolvedPeer => {
=======
    this.appChatsManager.saveApiChats(resolvedPeer.chats);

    return this.appPeersManager.getPeer(getPeerId(resolvedPeer.peer)) as Chat | User;
  }

  public resolvePhone(phone: string) {
    return this.apiManager.invokeApi('contacts.resolvePhone', {phone}).then((resolvedPeer) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return this.processResolvedPeer(resolvedPeer) as User;
    });
  }

<<<<<<< HEAD
  public pushContact(id: UserId) {
    this.contactsList.add(id);
    this.contactsIndex.indexObject(id, this.getUserSearchText(id));
    appStateManager.requestPeerSingle(id.toPeerId(), 'contact');
  }

  public popContact(id: UserId) {
    this.contactsList.delete(id);
    this.contactsIndex.indexObject(id, ''); // delete search index
    appStateManager.releaseSinglePeer(id.toPeerId(), 'contact');
=======
  private pushContact(id: UserId) {
    this.contactsList.add(id);
    this.contactsIndex.indexObject(id, this.getUserSearchText(id));
    this.peersStorage.requestPeer(id.toPeerId(), 'contact');
  }

  private popContact(id: UserId) {
    this.contactsList.delete(id);
    this.contactsIndex.indexObject(id, ''); // delete search index
    this.peersStorage.releasePeer(id.toPeerId(), 'contact');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public getUserSearchText(id: UserId) {
    const user = this.users[id];
    if(!user) {
      return '';
    }

    const arr: string[] = [
      user.first_name,
      user.last_name,
      user.phone,
      user.username,
<<<<<<< HEAD
      user.pFlags.self ? I18n.format('SavedMessages', true) : '',
=======
      // user.pFlags.self ? I18n.format('SavedMessages', true) : '',
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      user.pFlags.self ? 'Saved Messages' : ''
    ];

    return arr.filter(Boolean).join(' ');
  }

  public getContacts(query?: string, includeSaved = false, sortBy: 'name' | 'online' | 'none' = 'name') {
<<<<<<< HEAD
    return this.fillContacts().promise.then(_contactsList => {
      let contactsList = [..._contactsList];
      if(query) {
        const results = this.contactsIndex.search(query);
        const filteredContactsList = [...contactsList].filter(id => results.has(id));
=======
    return this.fillContacts().promise.then((_contactsList) => {
      let contactsList = [..._contactsList];
      if(query) {
        const results = this.contactsIndex.search(query);
        const filteredContactsList = [...contactsList].filter((id) => results.has(id));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        contactsList = filteredContactsList;
      }

      if(sortBy === 'name') {
        contactsList.sort((userId1, userId2) => {
          const sortName1 = (this.users[userId1] || {}).sortName || '';
          const sortName2 = (this.users[userId2] || {}).sortName || '';
          return sortName1.localeCompare(sortName2);
        });
      } else if(sortBy === 'online') {
        contactsList.sort((userId1, userId2) => {
<<<<<<< HEAD
          const status1 = appUsersManager.getUserStatusForSort(appUsersManager.getUser(userId1).status);
          const status2 = appUsersManager.getUserStatusForSort(appUsersManager.getUser(userId2).status);
=======
          const status1 = this.getUserStatusForSort(this.getUser(userId1).status);
          const status2 = this.getUserStatusForSort(this.getUser(userId2).status);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          return status2 - status1;
        });
      }

<<<<<<< HEAD
      const myUserId = rootScope.myId.toUserId();
=======
      const myUserId = this.userId;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      indexOfAndSplice(contactsList, myUserId);
      if(includeSaved) {
        if(this.testSelfSearch(query)) {
          contactsList.unshift(myUserId);
        }
      }

      return contactsList;
    });
  }

  public getContactsPeerIds(
    query?: Parameters<AppUsersManager['getContacts']>[0], 
    includeSaved?: Parameters<AppUsersManager['getContacts']>[1], 
<<<<<<< HEAD
    sortBy?: Parameters<AppUsersManager['getContacts']>[2]) {
    return this.getContacts(query, includeSaved, sortBy).then(userIds => {
      return userIds.map(userId => userId.toPeerId(false));
=======
    sortBy?: Parameters<AppUsersManager['getContacts']>[2]
  ) {
    return this.getContacts(query, includeSaved, sortBy).then((userIds) => {
      return userIds.map((userId) => userId.toPeerId(false));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public toggleBlock(peerId: PeerId, block: boolean) {
<<<<<<< HEAD
    return apiManager.invokeApiSingle(block ? 'contacts.block' : 'contacts.unblock', {
      id: appPeersManager.getInputPeerById(peerId)
    }).then(value => {
      if(value) {
        apiUpdatesManager.processLocalUpdate({
          _: 'updatePeerBlocked',
          peer_id: appPeersManager.getOutputPeer(peerId),
=======
    return this.apiManager.invokeApiSingle(block ? 'contacts.block' : 'contacts.unblock', {
      id: this.appPeersManager.getInputPeerById(peerId)
    }).then((value) => {
      if(value) {
        this.apiUpdatesManager.processLocalUpdate({
          _: 'updatePeerBlocked',
          peer_id: this.appPeersManager.getOutputPeer(peerId),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          blocked: block
        });
      }

      return value;
    });
  }

  public testSelfSearch(query: string) {
    const user = this.getSelf();
    const index = this.createSearchIndex();
    index.indexObject(user.id, this.getUserSearchText(user.id));
    return index.search(query).has(user.id);
  }

  private createSearchIndex() {
    return new SearchIndex<UserId>({
      clearBadChars: true,
      ignoreCase: true,
      latinize: true,
      includeTag: true
    });
  }

  public saveApiUsers(apiUsers: MTUser[], override?: boolean) {
    if((apiUsers as any).saved) return;
    (apiUsers as any).saved = true;
    apiUsers.forEach((user) => this.saveApiUser(user, override));
  }

  private setUserNameToCache(user: MTUser.user, oldUser?: MTUser.user) {
    if(!oldUser || oldUser.username !== user.username) {
      if(oldUser?.username) {
        const oldSearchUsername = cleanUsername(oldUser.username);
        delete this.usernames[oldSearchUsername];
      }

      if(user.username) {
        const searchUsername = cleanUsername(user.username);
        this.usernames[searchUsername] = user.id;
      }
    }
  }

  public saveApiUser(user: MTUser, override?: boolean) {
    if(user._ === 'userEmpty') return;

    const userId = user.id;
    const oldUser = this.users[userId];

    // ! commented block can affect performance !
    // if(oldUser && !override) {
    //   console.log('saveApiUser same');
    //   return;
    // }

    if(user.pFlags === undefined) {
      user.pFlags = {};
    }

    if(user.pFlags.min && oldUser !== undefined) {
      return;
    }

    // * exclude from state
    // defineNotNumerableProperties(user, ['initials', 'num', 'rFirstName', 'rFullName', 'rPhone', 'sortName', 'sortStatus']);

    this.setUserNameToCache(user, oldUser);

    if(!oldUser 
      || oldUser.sortName === undefined 
      || oldUser.first_name !== user.first_name 
      || oldUser.last_name !== user.last_name) {
      const fullName = user.first_name + (user.last_name ? ' ' + user.last_name : '');

      user.sortName = user.pFlags.deleted ? '' : cleanSearchText(fullName, false);
    } else {
      user.sortName = oldUser.sortName;
    }

    if(user.status) {
      if((user.status as UserStatus.userStatusOnline).expires) {
<<<<<<< HEAD
        (user.status as UserStatus.userStatusOnline).expires -= serverTimeManager.serverTimeOffset;
      }

      if((user.status as UserStatus.userStatusOffline).was_online) {
        (user.status as UserStatus.userStatusOffline).was_online -= serverTimeManager.serverTimeOffset;
=======
        (user.status as UserStatus.userStatusOnline).expires -= this.timeManager.getServerTimeOffset();
      }

      if((user.status as UserStatus.userStatusOffline).was_online) {
        (user.status as UserStatus.userStatusOffline).was_online -= this.timeManager.getServerTimeOffset();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }

    //user.sortStatus = user.pFlags.bot ? -1 : this.getUserStatusForSort(user.status);

    let changedPhoto = false, changedTitle = false;
    if(oldUser === undefined) {
      this.users[userId] = user;
    } else {
      if(user.first_name !== oldUser.first_name 
        || user.last_name !== oldUser.last_name 
        || user.username !== oldUser.username) {
        changedTitle = true;
      }

      const oldPhotoId = (oldUser.photo as UserProfilePhoto.userProfilePhoto)?.photo_id;
      const newPhotoId = (user.photo as UserProfilePhoto.userProfilePhoto)?.photo_id;
      if(oldPhotoId !== newPhotoId) {
        changedPhoto = true;
      }

      /* if(user.pFlags.bot && user.bot_info_version !== oldUser.bot_info_version) {
        
      } */

      const wasContact = !!oldUser.pFlags.contact;
      const newContact = !!user.pFlags.contact;

      safeReplaceObject(oldUser, user);
<<<<<<< HEAD
      rootScope.dispatchEvent('user_update', userId);
=======
      this.rootScope.dispatchEvent('user_update', userId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      if(wasContact !== newContact) {
        this.onContactUpdated(userId, newContact, wasContact);
      }
    }

    if(changedPhoto) {
<<<<<<< HEAD
      rootScope.dispatchEvent('avatar_update', user.id.toPeerId());
    }

    if(changedTitle) {
      rootScope.dispatchEvent('peer_title_edit', user.id.toPeerId());
=======
      this.rootScope.dispatchEvent('avatar_update', user.id.toPeerId());
    }

    if(changedTitle) {
      this.rootScope.dispatchEvent('peer_title_edit', user.id.toPeerId());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    this.setUserToStateIfNeeded(user);
  }

<<<<<<< HEAD
  public setUserToStateIfNeeded(user: User) {
    if(appStateManager.isPeerNeeded(user.id.toPeerId())) {
=======
  private setUserToStateIfNeeded(user: User) {
    if(this.peersStorage.isPeerNeeded(user.id.toPeerId())) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.storage.set({
        [user.id]: user
      });
    }
  }

<<<<<<< HEAD
  public formatUserPhone(phone: string) {
    return '+' + formatPhoneNumber(phone).formatted;
  }

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public isUserOnlineVisible(id: UserId) {
    return this.getUserStatusForSort(id) > 3;
  }

  public getUserStatusForSort(status: User['status'] | UserId) {
    if(typeof(status) !== 'object') {
      status = this.getUser(status).status;
    }

    if(status) {
      const expires = status._ === 'userStatusOnline' ? status.expires : (status._ === 'userStatusOffline' ? status.was_online : 0);
      if(expires) {
        return expires;
      }

      /* const timeNow = tsNow(true);
      switch(status._) {
        case 'userStatusRecently':
          return timeNow - 86400 * 3;
        case 'userStatusLastWeek':
          return timeNow - 86400 * 7;
        case 'userStatusLastMonth':
          return timeNow - 86400 * 30;
      } */
      switch(status._) {
        case 'userStatusRecently':
          return 3;
        case 'userStatusLastWeek':
          return 2;
        case 'userStatusLastMonth':
          return 1;
      }
    }

    return 0;
  }

  public getUser(id: User | UserId) {
    if(isObject<User>(id)) {
      return id;
    }

    return this.users[id] || {_: 'userEmpty', id, pFlags: {deleted: true}, access_hash: ''} as any as User;
  }

  public getSelf() {
    return this.getUser(this.userId);
  }

<<<<<<< HEAD
  public getUserStatusString(id: UserId): HTMLElement {
    let key: LangPackKey;
    let args: any[];

    switch(id) {
      case REPLIES_PEER_ID:
        key = 'Peer.RepliesNotifications';
        break;
      case SERVICE_PEER_ID:
        key = 'Peer.ServiceNotifications';
        break;
      default: {
        if(this.isBot(id)) {
          key = 'Bot';
          break;
        }

        const user = this.getUser(id);
        if(!user) {
          key = '' as any;
          break;
        }

        if(user.pFlags.support) {
          key = 'SupportStatus';
          break;
        }

        switch(user.status?._) {
          case 'userStatusRecently': {
            key = 'Lately';
            break;
          }
    
          case 'userStatusLastWeek': {
            key = 'WithinAWeek';
            break;
          }
    
          case 'userStatusLastMonth': {
            key = 'WithinAMonth';
            break;
          }
          
          case 'userStatusOffline': {
            const date = user.status.was_online;
            const today = new Date();
            const now = today.getTime() / 1000 | 0;
            
            const diff = now - date;
            if(diff < 60) {
              key = 'Peer.Status.justNow';
            } else if(diff < 3600) {
              key = 'Peer.Status.minAgo';
              const c = diff / 60 | 0;
              args = [c];
            } else if(diff < 86400 && today.getDate() === new Date(date * 1000).getDate()) {
              key = 'LastSeen.HoursAgo';
              const c = diff / 3600 | 0;
              args = [c];
            } else {
              key = 'Peer.Status.LastSeenAt';
              const {dateEl, timeEl} = formatFullSentTimeRaw(date);
              args = [dateEl, timeEl];
            }
            
            break;
          }
    
          case 'userStatusOnline': {
            key = 'Online';
            break;
          }
    
          default: {
            key = 'ALongTimeAgo';
            break;
          }
        }

        break;
      }
    }
    
    return i18n(key, args);
  }

  public isBot(id: UserId) {
    return this.users[id] && !!this.users[id].pFlags.bot;
  }

=======
  public isBot(id: UserId) {
    return this.users[id] && !!this.users[id].pFlags.bot;
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public isContact(id: UserId) {
    return this.contactsList.has(id) || !!(this.users[id] && this.users[id].pFlags.contact);
  }
  
  public isRegularUser(id: UserId) {
    const user = this.users[id];
    return user && !this.isBot(id) && !user.pFlags.deleted && !user.pFlags.support;
  }

  public isNonContactUser(id: UserId) {
<<<<<<< HEAD
    return this.isRegularUser(id) && !this.isContact(id) && id.toPeerId() !== rootScope.myId;
=======
    return this.isRegularUser(id) && !this.isContact(id) && id !== this.userId;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public hasUser(id: UserId, allowMin?: boolean) {
    const user = this.users[id];
    return isObject(user) && (allowMin || !user.pFlags.min);
  }

<<<<<<< HEAD
  public canSendToUser(id: UserId) {
    const user = this.getUser(id);
    return !user.pFlags.deleted && user.id.toPeerId() !== REPLIES_PEER_ID;
  }

  public getUserPhoto(id: UserId) {
    const user = this.getUser(id);

    return user && user.photo || {
      _: 'userProfilePhotoEmpty'
    };
  }

=======
  public getUserPhoto(id: UserId) {
    const user = this.getUser(id);

    return user && user.photo || {
      _: 'userProfilePhotoEmpty'
    };
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public getUserString(id: UserId) {
    const user = this.getUser(id);
    return 'u' + id + (user.access_hash ? '_' + user.access_hash : '');
  }

  public getUserInput(id: UserId): InputUser {
    const user = this.getUser(id);
    if(user.pFlags && user.pFlags.self) {
      return {_: 'inputUserSelf'};
    }

    return {
      _: 'inputUser',
      user_id: id,
      access_hash: user.access_hash
    };
  }

  public getUserInputPeer(id: UserId): InputPeer.inputPeerSelf | InputPeer.inputPeerUser {
    const user = this.getUser(id);
    if(user.pFlags && user.pFlags.self) {
      return {_: 'inputPeerSelf'};
    }

    return {
      _: 'inputPeerUser',
      user_id: id,
      access_hash: user.access_hash
    };
  }

  public getContactMediaInput(id: UserId): InputMedia.inputMediaContact {
    const user = this.getUser(id);

    return {
      _: 'inputMediaContact',
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone,
      vcard: '',
      user_id: id
    };
  }

<<<<<<< HEAD
  public updateUsersStatuses = () => {
=======
  private updateUsersStatuses = () => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const timestampNow = tsNow(true);
    for(const i in this.users) {
      const user = this.users[i];
      this.updateUserStatus(user, timestampNow);
    }
  };

<<<<<<< HEAD
  public updateUserStatus(user: MTUser.user, timestampNow = tsNow(true)) {
=======
  private updateUserStatus(user: MTUser.user, timestampNow = tsNow(true)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(user.status &&
      user.status._ === 'userStatusOnline' &&
      user.status.expires < timestampNow) {
      user.status = {_: 'userStatusOffline', was_online: user.status.expires};
<<<<<<< HEAD
      rootScope.dispatchEvent('user_update', user.id);
=======
      this.rootScope.dispatchEvent('user_update', user.id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      this.setUserToStateIfNeeded(user);
    }
  }

  public forceUserOnline(id: UserId, eventTimestamp?: number) {
    if(this.isBot(id)) {
      return;
    }

    const timestamp = tsNow(true);
    const onlineTimeFor = 60;
    if(eventTimestamp) {
      if((timestamp - eventTimestamp) >= onlineTimeFor) {
        return;
      }
    } else if(this.apiUpdatesManager.updatesState.syncLoading) {
      return;
    }

    const user = this.getUser(id);
<<<<<<< HEAD
    if(user &&
      user.status &&
=======
    if(user?.status &&
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      user.status._ !== 'userStatusOnline' &&
      user.status._ !== 'userStatusEmpty' &&
      !user.pFlags.support &&
      !user.pFlags.deleted) {

      user.status = {
        _: 'userStatusOnline',
        expires: timestamp + onlineTimeFor
      };
      
      //user.sortStatus = this.getUserStatusForSort(user.status);
<<<<<<< HEAD
      rootScope.dispatchEvent('user_update', id);
=======
      this.rootScope.dispatchEvent('user_update', id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      this.setUserToStateIfNeeded(user);
    }
  }

  public importContact(first_name: string, last_name: string, phone: string) {
    return this.importContacts([{
      first_name,
      last_name,
      phones: [phone]
<<<<<<< HEAD
    }]).then(userIds => {
=======
    }]).then((userIds) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!userIds.length) {
        const error = new Error();
        (error as any).type = 'NO_USER';
        throw error;
      }

      return userIds[0];
    });
  }

  public importContacts(contacts: {phones: string[], first_name: string, last_name: string}[]) {
    const inputContacts: InputContact[] = [];

    for(let i = 0; i < contacts.length; ++i) {
      for(let j = 0; j < contacts[i].phones.length; ++j) {
        inputContacts.push({
          _: 'inputPhoneContact',
          client_id: (i << 16 | j).toString(10),
          phone: contacts[i].phones[j],
          first_name: contacts[i].first_name,
          last_name: contacts[i].last_name
        });
      }
    }

<<<<<<< HEAD
    return apiManager.invokeApi('contacts.importContacts', {
=======
    return this.apiManager.invokeApi('contacts.importContacts', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      contacts: inputContacts
    }).then((importedContactsResult) => {
      this.saveApiUsers(importedContactsResult.users);

      const userIds = importedContactsResult.imported.map((importedContact) => {
        this.onContactUpdated(importedContact.user_id, true);
        return importedContact.user_id;
      });

      return userIds;
    });
  }

  public getTopPeers(type: TopPeerType) {
    if(this.getTopPeersPromises[type]) return this.getTopPeersPromises[type];

<<<<<<< HEAD
    return this.getTopPeersPromises[type] = appStateManager.getState().then((state) => {
=======
    return this.getTopPeersPromises[type] = this.appStateManager.getState().then((state) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const cached = state.topPeersCache[type];
      if(cached && (cached.cachedTime + 86400e3) > Date.now() && cached.peers) {
        return cached.peers;
      }

<<<<<<< HEAD
      return apiManager.invokeApi('contacts.getTopPeers', {
=======
      return this.apiManager.invokeApi('contacts.getTopPeers', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        [type]: true,
        offset: 0,
        limit: 15,
        hash: '0'
      }).then((result) => {
        let topPeers: MyTopPeer[] = [];
        if(result._ === 'contacts.topPeers') {
          //console.log(result);
          this.saveApiUsers(result.users);
<<<<<<< HEAD
          appChatsManager.saveApiChats(result.chats);

          if(result.categories.length) {
            topPeers = result.categories[0].peers.map((topPeer) => {
              const peerId = appPeersManager.getPeerId(topPeer.peer);
              appStateManager.requestPeer(peerId, 'topPeer');
=======
          this.appChatsManager.saveApiChats(result.chats);

          if(result.categories.length) {
            topPeers = result.categories[0].peers.map((topPeer) => {
              const peerId = getPeerId(topPeer.peer);
              this.peersStorage.requestPeer(peerId, 'topPeer');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              return {id: peerId, rating: topPeer.rating};
            });
          }
        }
  
        state.topPeersCache[type] = {
          peers: topPeers,
          cachedTime: Date.now()
        };
<<<<<<< HEAD
        appStateManager.pushToState('topPeersCache', state.topPeersCache);
=======
        this.appStateManager.pushToState('topPeersCache', state.topPeersCache);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
        return topPeers;
      });
    });
  }

  public getBlocked(offset = 0, limit = 0) {
<<<<<<< HEAD
    return apiManager.invokeApiSingle('contacts.getBlocked', {offset, limit}).then(contactsBlocked => {
      this.saveApiUsers(contactsBlocked.users);
      appChatsManager.saveApiChats(contactsBlocked.chats);
      const count = contactsBlocked._ === 'contacts.blocked' ? contactsBlocked.users.length + contactsBlocked.chats.length : contactsBlocked.count;

      const peerIds: PeerId[] = contactsBlocked.users.map(u => u.id.toPeerId()).concat(contactsBlocked.chats.map(c => c.id.toPeerId(true)));
=======
    return this.apiManager.invokeApiSingle('contacts.getBlocked', {offset, limit}).then((contactsBlocked) => {
      this.saveApiUsers(contactsBlocked.users);
      this.appChatsManager.saveApiChats(contactsBlocked.chats);
      const count = contactsBlocked._ === 'contacts.blocked' ? contactsBlocked.users.length + contactsBlocked.chats.length : contactsBlocked.count;

      const peerIds: PeerId[] = contactsBlocked.users.map((u) => u.id.toPeerId()).concat(contactsBlocked.chats.map((c) => c.id.toPeerId(true)));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      return {count, peerIds};
    });
  }

  public getLocated(
    lat: number, 
    long: number,
    accuracy_radius: number,
    background: boolean = false,
    self_expires: number = 0
  ) {
    const geo_point: InputGeoPoint = {
      _: 'inputGeoPoint',
      lat,
      long,
      accuracy_radius
    };

<<<<<<< HEAD
    return apiManager.invokeApi('contacts.getLocated', {
      geo_point, 
      background
    }).then((updates) => {
      apiUpdatesManager.processUpdateMessage(updates);
=======
    return this.apiManager.invokeApi('contacts.getLocated', {
      geo_point, 
      background
    }).then((updates) => {
      this.apiUpdatesManager.processUpdateMessage(updates);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return updates;
    });
  }

  /* public searchContacts(query: string, limit = 20) {
    return Promise.all([
      this.getContacts(query),
      apiManager.invokeApi('contacts.search', {
        q: query,
        limit
      })
    ]).then((results) => {
      const [myContacts, peers] = results;

      this.saveApiUsers(peers.users);
      appChatsManager.saveApiChats(peers.chats);

      // * contacts.search returns duplicates in my_results
      const myResults = new Set(myContacts.concat(peers.my_results.map((p) => appPeersManager.getPeerID(p))));

      const out = {
        my_results: [...myResults].slice(0, limit),
        results: peers.results.map((p) => appPeersManager.getPeerID(p))
      };

      return out;
    });
  } */
  public searchContacts(query: string, limit = 20) {
    // handle 't.me/username' as 'username'
<<<<<<< HEAD
    const entities = RichTextProcessor.parseEntities(query);
    if(entities.length && entities[0].length === query.trim().length && entities[0]._ === 'messageEntityUrl') {
      try {
        const url = new URL(RichTextProcessor.wrapUrl(query).url);
=======
    const entities = parseEntities(query);
    if(entities.length && entities[0].length === query.trim().length && entities[0]._ === 'messageEntityUrl') {
      try {
        const url = new URL(wrapUrl(query).url);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const path = url.pathname.slice(1);
        if(path) {
          query = path;
        }
      } catch(err) {}
    }

<<<<<<< HEAD
    return apiManager.invokeApiCacheable('contacts.search', {
      q: query,
      limit
    }, {cacheSeconds: 60}).then(peers => {
=======
    return this.apiManager.invokeApiCacheable('contacts.search', {
      q: query,
      limit
    }, {cacheSeconds: 60}).then((peers) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.saveApiUsers(peers.users);
      this.appChatsManager.saveApiChats(peers.chats);

      const out = {
<<<<<<< HEAD
        my_results: filterUnique(peers.my_results.map(p => appPeersManager.getPeerId(p))), // ! contacts.search returns duplicates in my_results
        results: peers.results.map(p => appPeersManager.getPeerId(p))
=======
        my_results: filterUnique(peers.my_results.map((p) => getPeerId(p))), // ! contacts.search returns duplicates in my_results
        results: peers.results.map((p) => getPeerId(p))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      };

      return out;
    });
  }

  private onContactUpdated(userId: UserId, isContact: boolean, curIsContact = this.isContact(userId)) {
    if(isContact !== curIsContact) {
      if(isContact) {
        this.pushContact(userId);
      } else {
        this.popContact(userId);
      }

      this.onContactsModified();

<<<<<<< HEAD
      rootScope.dispatchEvent('contacts_update', userId);
=======
      this.rootScope.dispatchEvent('contacts_update', userId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }
  }

  public updateUsername(username: string) {
<<<<<<< HEAD
    return apiManager.invokeApi('account.updateUsername', {
=======
    return this.apiManager.invokeApi('account.updateUsername', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      username
    }).then((user) => {
      this.saveApiUser(user);
    });
  }

  public setUserStatus(userId: UserId, offline: boolean) {
    if(this.isBot(userId)) {
      return;
    }

    const user = this.users[userId];
    if(user) {
      const status: UserStatus = offline ? {
        _: 'userStatusOffline',
        was_online: tsNow(true)
      } : {
        _: 'userStatusOnline',
        expires: tsNow(true) + 50
      };

      user.status = status;
      //user.sortStatus = this.getUserStatusForSort(user.status);
<<<<<<< HEAD
      rootScope.dispatchEvent('user_update', userId);
=======
      this.rootScope.dispatchEvent('user_update', userId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      this.setUserToStateIfNeeded(user);
    }
  }
<<<<<<< HEAD

  public addContact(userId: UserId, first_name: string, last_name: string, phone: string, showPhone?: true) {
    /* if(!userId) {
      return this.importContacts([{
        first_name,
        last_name,
        phones: [phone]
      }]);
    } */

    return apiManager.invokeApi('contacts.addContact', {
      id: this.getUserInput(userId),
      first_name,
      last_name,
      phone,
      add_phone_privacy_exception: showPhone
    }).then((updates) => {
      apiUpdatesManager.processUpdateMessage(updates, {override: true});

      this.onContactUpdated(userId, true);
    });
  }

  public deleteContacts(userIds: UserId[]) {
    return apiManager.invokeApi('contacts.deleteContacts', {
      id: userIds.map(userId => this.getUserInput(userId))
    }).then((updates) => {
      apiUpdatesManager.processUpdateMessage(updates, {override: true});

      userIds.forEach(userId => {
        this.onContactUpdated(userId, false);
      });
    });
  }

  public isRestricted(userId: UserId) {
    const user: MTUser.user = this.getUser(userId);
    const restrictionReasons = user.restriction_reason;

    return !!(user.pFlags.restricted && restrictionReasons && isRestricted(restrictionReasons));
  }
}

const appUsersManager = new AppUsersManager();
MOUNT_CLASS_TO.appUsersManager = appUsersManager;
export default appUsersManager
=======

  public updateMyOnlineStatus(offline: boolean) {
    this.setUserStatus(this.getSelf().id, offline);
    return this.apiManager.invokeApiSingle('account.updateStatus', {offline});
  }

  public addContact(userId: UserId, first_name: string, last_name: string, phone: string, showPhone?: true) {
    /* if(!userId) {
      return this.importContacts([{
        first_name,
        last_name,
        phones: [phone]
      }]);
    } */

    return this.apiManager.invokeApi('contacts.addContact', {
      id: this.getUserInput(userId),
      first_name,
      last_name,
      phone,
      add_phone_privacy_exception: showPhone
    }).then((updates) => {
      this.apiUpdatesManager.processUpdateMessage(updates, {override: true});

      this.onContactUpdated(userId, true);
    });
  }

  public deleteContacts(userIds: UserId[]) {
    return this.apiManager.invokeApi('contacts.deleteContacts', {
      id: userIds.map((userId) => this.getUserInput(userId))
    }).then((updates) => {
      this.apiUpdatesManager.processUpdateMessage(updates, {override: true});

      userIds.forEach((userId) => {
        this.onContactUpdated(userId, false);
      });
    });
  }

  public isRestricted(userId: UserId) {
    const user: MTUser.user = this.getUser(userId);
    const restrictionReasons = user.restriction_reason;

    return !!(user.pFlags.restricted && restrictionReasons && isRestricted(restrictionReasons));
  }

  public checkUsername(username: string) {
    return this.apiManager.invokeApi('account.checkUsername', {username});
  }

  public canSendToUser(userId: UserId) {
    return canSendToUser(this.getUser(userId));
  }
}
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
