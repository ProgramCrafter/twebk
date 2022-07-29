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
import { tsNow } from "../../helpers/date";
import numberThousandSplitter from "../../helpers/number/numberThousandSplitter";
import { ChannelParticipantsFilter, ChannelsChannelParticipants, ChannelParticipant, Chat, ChatFull, ChatParticipants, ChatPhoto, ExportedChatInvite, InputChannel, InputFile, SendMessageAction, Update, UserFull, Photo, PhotoSize } from "../../layer";
import { LangPackKey, i18n } from "../langPack";
//import apiManager from '../mtproto/apiManager';
import apiManager from '../mtproto/mtprotoworker';
import { RichTextProcessor } from "../richtextprocessor";
import rootScope from "../rootScope";
import SearchIndex from "../searchIndex";
import apiUpdatesManager from "./apiUpdatesManager";
import appChatsManager from "./appChatsManager";
import appMessagesIdsManager from "./appMessagesIdsManager";
import appNotificationsManager from "./appNotificationsManager";
import appPeersManager from "./appPeersManager";
import appPhotosManager from "./appPhotosManager";
import appUsersManager, { MyTopPeer, User } from "./appUsersManager";

export type UserTyping = Partial<{userId: UserId, action: SendMessageAction, timeout: number}>;

export class AppProfileManager {
=======
import type { MyTopPeer } from "./appUsersManager";
import tsNow from "../../helpers/tsNow";
import { ChannelParticipantsFilter, ChannelsChannelParticipants, ChannelParticipant, Chat, ChatFull, ChatParticipants, ChatPhoto, ExportedChatInvite, InputChannel, InputFile, SendMessageAction, Update, UserFull, Photo, PhotoSize, Updates } from "../../layer";
import SearchIndex from "../searchIndex";
import { AppManager } from "./manager";
import getServerMessageId from "./utils/messageId/getServerMessageId";
import getPeerId from "./utils/peers/getPeerId";
import getPhotoInput from "./utils/photos/getPhotoInput";
import getParticipantPeerId from "./utils/chats/getParticipantPeerId";
import ctx from "../../environment/ctx";

export type UserTyping = Partial<{userId: UserId, action: SendMessageAction, timeout: number}>;

export class AppProfileManager extends AppManager {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  //private botInfos: any = {};
  private usersFull: {[id: UserId]: UserFull.userFull} = {};
  private chatsFull: {[id: ChatId]: ChatFull} = {};
  private typingsInPeer: {[peerId: PeerId]: UserTyping[]};

<<<<<<< HEAD
  constructor() {
    rootScope.addMultipleEventsListeners({
=======
  protected after() {
    this.apiUpdatesManager.addMultipleEventsListeners({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      updateChatParticipants: (update) => {
        const participants = update.participants;
        if(participants._ === 'chatParticipants') {
          const chatId = participants.chat_id;
          const chatFull = this.chatsFull[chatId] as ChatFull.chatFull;
          if(chatFull !== undefined) {
            chatFull.participants = participants;
<<<<<<< HEAD
            rootScope.dispatchEvent('chat_full_update', chatId);
=======
            this.rootScope.dispatchEvent('chat_full_update', chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }
        }
      },

      updateChatParticipantAdd: (update) => {
        const chatFull = this.chatsFull[update.chat_id] as ChatFull.chatFull;
        if(chatFull !== undefined) {
          const _participants = chatFull.participants as ChatParticipants.chatParticipants;
          const participants = _participants.participants || [];
          for(let i = 0, length = participants.length; i < length; i++) {
            if(participants[i].user_id === update.user_id) {
              return;
            }
          }

          participants.push({
            _: 'chatParticipant',
            user_id: update.user_id,
            inviter_id: update.inviter_id,
            date: tsNow(true)
          });

          _participants.version = update.version;
<<<<<<< HEAD
          rootScope.dispatchEvent('chat_full_update', update.chat_id);
=======
          this.rootScope.dispatchEvent('chat_full_update', update.chat_id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }
      },

      updateChatParticipantDelete: (update) => {
        const chatFull = this.chatsFull[update.chat_id] as ChatFull.chatFull;
        if(chatFull !== undefined) {
          const _participants = chatFull.participants as ChatParticipants.chatParticipants;
          const participants = _participants.participants || [];
          for(let i = 0, length = participants.length; i < length; i++) {
            if(participants[i].user_id === update.user_id) {
              participants.splice(i, 1);
              _participants.version = update.version;
<<<<<<< HEAD
              rootScope.dispatchEvent('chat_full_update', update.chat_id);
=======
              this.rootScope.dispatchEvent('chat_full_update', update.chat_id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              return;
            }
          }
        }
      },

      updateUserTyping: this.onUpdateUserTyping,
      updateChatUserTyping: this.onUpdateUserTyping,
      updateChannelUserTyping: this.onUpdateUserTyping,

      updatePeerBlocked: this.onUpdatePeerBlocked
    });

<<<<<<< HEAD
    rootScope.addEventListener('chat_update', (chatId) => {
      const fullChat = this.chatsFull[chatId];
      const chat: Chat.chat | Chat.channel | Chat.chatForbidden | Chat.channelForbidden = appChatsManager.getChat(chatId);
=======
    this.rootScope.addEventListener('chat_update', (chatId) => {
      const fullChat = this.chatsFull[chatId];
      const chat: Chat.chat | Chat.channel | Chat.chatForbidden | Chat.channelForbidden = this.appChatsManager.getChat(chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!fullChat || !chat) {
        return;
      }

      let updated = false;
      if(!!fullChat.call !== !!(chat as Chat.chat).pFlags?.call_active) {
        updated = true;
      }

      const {photo} = chat as Chat.chat;
      if(photo) {
        const hasChatPhoto = photo._ !== 'chatPhotoEmpty';
        const hasFullChatPhoto = !!(fullChat.chat_photo && fullChat.chat_photo._ !== 'photoEmpty'); // chat_photo can be missing
        if(
          hasChatPhoto !== hasFullChatPhoto || (
            hasChatPhoto && 
            photo.photo_id !== fullChat.chat_photo?.id
          )
        ) {
          updated = true;
        }
      }

      if(updated) {
        this.refreshFullPeer(chatId.toPeerId(true));
      }
    });

<<<<<<< HEAD
    rootScope.addEventListener('channel_update', (chatId) => {
=======
    this.rootScope.addEventListener('channel_update', (chatId) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.refreshFullPeer(chatId.toPeerId(true));
    });

    // * genius
<<<<<<< HEAD
    rootScope.addEventListener('chat_full_update', (chatId) => {
      rootScope.dispatchEvent('peer_full_update', chatId.toPeerId(true));
    });
    
    // * genius
    rootScope.addEventListener('user_full_update', (userId) => {
      rootScope.dispatchEvent('peer_full_update', userId.toPeerId(false));
    });

    rootScope.addEventListener('invalidate_participants', (chatId) => {
=======
    this.rootScope.addEventListener('chat_full_update', (chatId) => {
      this.rootScope.dispatchEvent('peer_full_update', chatId.toPeerId(true));
    });
    
    // * genius
    this.rootScope.addEventListener('user_full_update', (userId) => {
      this.rootScope.dispatchEvent('peer_full_update', userId.toPeerId(false));
    });

    this.rootScope.addEventListener('invalidate_participants', (chatId) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.invalidateChannelParticipants(chatId);
    });

    this.typingsInPeer = {};
  }

  /* public saveBotInfo(botInfo: any) {
    const botId = botInfo && botInfo.user_id;
    if(!botId) {
      return null;
    }

    const commands: any = {};
    botInfo.commands.forEach((botCommand: any) => {
      commands[botCommand.command] = botCommand.description;
    });

    return this.botInfos[botId] = {
      id: botId,
      version: botInfo.version,
      shareText: botInfo.share_text,
      description: botInfo.description,
      commands: commands
    };
  } */

  public getProfile(id: UserId, override?: true) {
    if(this.usersFull[id] && !override) {
      return this.usersFull[id];
    }

<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
      method: 'users.getFullUser', 
      params: {
        id: appUsersManager.getUserInput(id)
      },
      processResult: (usersUserFull) => {
        appChatsManager.saveApiChats(usersUserFull.chats, true);
        appUsersManager.saveApiUsers(usersUserFull.users);
=======
    return this.apiManager.invokeApiSingleProcess({
      method: 'users.getFullUser', 
      params: {
        id: this.appUsersManager.getUserInput(id)
      },
      processResult: (usersUserFull) => {
        this.appChatsManager.saveApiChats(usersUserFull.chats, true);
        this.appUsersManager.saveApiUsers(usersUserFull.users);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        const userFull = usersUserFull.full_user;
        const peerId = id.toPeerId(false);
        if(userFull.profile_photo) {
<<<<<<< HEAD
          userFull.profile_photo = appPhotosManager.savePhoto(userFull.profile_photo, {type: 'profilePhoto', peerId});
        }

        appNotificationsManager.savePeerSettings({
=======
          userFull.profile_photo = this.appPhotosManager.savePhoto(userFull.profile_photo, {type: 'profilePhoto', peerId});
        }

        this.appNotificationsManager.savePeerSettings({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          peerId, 
          settings: userFull.notify_settings
        });

        this.usersFull[id] = userFull;

        /* if(userFull.bot_info) {
          userFull.bot_info = this.saveBotInfo(userFull.bot_info) as any;
        } */

        //appMessagesManager.savePinnedMessage(id, userFull.pinned_msg_id);

<<<<<<< HEAD
        rootScope.dispatchEvent('user_full_update', id);
=======
        this.rootScope.dispatchEvent('user_full_update', id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return userFull;
      }
    });
  }

  public getProfileByPeerId(peerId: PeerId, override?: true) {
<<<<<<< HEAD
    if(appPeersManager.isAnyChat(peerId)) return this.getChatFull(peerId.toChatId(), override);
=======
    if(this.appPeersManager.isAnyChat(peerId)) return this.getChatFull(peerId.toChatId(), override);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    else return this.getProfile(peerId.toUserId(), override);
  }

  public getCachedFullChat(chatId: ChatId) {
    return this.chatsFull[chatId];
  }

  public getCachedFullUser(userId: UserId) {
    return this.usersFull[userId];
  }

  public getCachedProfileByPeerId(peerId: PeerId) {
    return peerId.isUser() ? this.getCachedFullUser(peerId.toUserId()) : this.getCachedFullChat(peerId.toChatId());
  }

  public async getFullPhoto(peerId: PeerId) {
    const profile = await this.getProfileByPeerId(peerId);
    switch(profile._) {
      case 'userFull':
        return profile.profile_photo;
      case 'channelFull':
      case 'chatFull':
        return profile.chat_photo;
    }
  }

  /* public getPeerBots(peerId: PeerId) {
    var peerBots: any[] = [];
    if(peerId >= 0 && !appUsersManager.isBot(peerId) ||
      (appPeersManager.isChannel(peerId) && !appPeersManager.isMegagroup(peerId))) {
      return Promise.resolve(peerBots);
    }
    if(peerId >= 0) {
      return this.getProfile(peerId).then((userFull: any) => {
        var botInfo = userFull.bot_info;
        if(botInfo && botInfo._ !== 'botInfoEmpty') {
          peerBots.push(botInfo);
        }
        return peerBots;
      });
    }

    return this.getChatFull(peerId.toChatId()).then((chatFull: any) => {
      chatFull.bot_info.forEach((botInfo: any) => {
        peerBots.push(this.saveBotInfo(botInfo))
      });
      return peerBots;
    });
  } */

  public getChatFull(id: ChatId, override?: true) {
<<<<<<< HEAD
    if(appChatsManager.isChannel(id)) {
=======
    if(this.appChatsManager.isChannel(id)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return this.getChannelFull(id, override);
    }

    const fullChat = this.chatsFull[id] as ChatFull.chatFull;
    if(fullChat && !override) {
<<<<<<< HEAD
      const chat = appChatsManager.getChat(id);
=======
      const chat = this.appChatsManager.getChat(id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(chat.version === (fullChat.participants as ChatParticipants.chatParticipants).version ||
        chat.pFlags.left) {
        return fullChat as ChatFull;
      }
    }
    
<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
=======
    return this.apiManager.invokeApiSingleProcess({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      method: 'messages.getFullChat', 
      params: {
        chat_id: id
      },
      processResult: (result) => {
<<<<<<< HEAD
        appChatsManager.saveApiChats(result.chats, true);
        appUsersManager.saveApiUsers(result.users);
        const fullChat = result.full_chat as ChatFull.chatFull;
        const peerId = id.toPeerId(true);
        if(fullChat && fullChat.chat_photo && fullChat.chat_photo.id) {
          fullChat.chat_photo = appPhotosManager.savePhoto(fullChat.chat_photo, {type: 'profilePhoto', peerId});
        }

        //appMessagesManager.savePinnedMessage(peerId, fullChat.pinned_msg_id);
        appNotificationsManager.savePeerSettings({
          peerId, 
          settings: fullChat.notify_settings
        });
        
        this.chatsFull[id] = fullChat;
        rootScope.dispatchEvent('chat_full_update', id);

        return fullChat;
=======
        this.appChatsManager.saveApiChats(result.chats, true);
        this.appUsersManager.saveApiUsers(result.users);
        const chatFull = result.full_chat as ChatFull.chatFull;
        const peerId = id.toPeerId(true);
        if(chatFull && chatFull.chat_photo && chatFull.chat_photo.id) {
          chatFull.chat_photo = this.appPhotosManager.savePhoto(chatFull.chat_photo, {type: 'profilePhoto', peerId});
        }

        if(chatFull.call) {
          this.appGroupCallsManager.saveGroupCall(chatFull.call, id);
        }

        //appMessagesManager.savePinnedMessage(peerId, fullChat.pinned_msg_id);
        this.appNotificationsManager.savePeerSettings({
          peerId, 
          settings: chatFull.notify_settings
        });
        
        this.chatsFull[id] = chatFull;
        this.rootScope.dispatchEvent('chat_full_update', id);

        return chatFull;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    });
  }

  public async getChatInviteLink(id: ChatId, force?: boolean) {
    const chatFull = await this.getChatFull(id);
    if(!force &&
      chatFull.exported_invite &&
      chatFull.exported_invite._ == 'chatInviteExported') {
      return chatFull.exported_invite.link;
    }
    
<<<<<<< HEAD
    return apiManager.invokeApi('messages.exportChatInvite', {
      peer: appPeersManager.getInputPeerById(id.toPeerId(true))
=======
    return this.apiManager.invokeApi('messages.exportChatInvite', {
      peer: this.appPeersManager.getInputPeerById(id.toPeerId(true))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }).then((exportedInvite) => {
      if(this.chatsFull[id] !== undefined) {
        this.chatsFull[id].exported_invite = exportedInvite;
      }

      return (exportedInvite as ExportedChatInvite.chatInviteExported).link;
    });
  }

  public getChannelParticipants(id: ChatId, filter: ChannelParticipantsFilter = {_: 'channelParticipantsRecent'}, limit = 200, offset = 0) {
    if(filter._ === 'channelParticipantsRecent') {
<<<<<<< HEAD
      const chat = appChatsManager.getChat(id);
=======
      const chat = this.appChatsManager.getChat(id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(chat &&
          chat.pFlags && (
            // chat.pFlags.kicked ||
            chat.pFlags.broadcast && !chat.pFlags.creator && !chat.admin_rights
          )) {
        return Promise.reject();
      }
    }

<<<<<<< HEAD
    return apiManager.invokeApiCacheable('channels.getParticipants', {
      channel: appChatsManager.getChannelInput(id),
=======
    return this.apiManager.invokeApiCacheable('channels.getParticipants', {
      channel: this.appChatsManager.getChannelInput(id),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      filter,
      offset,
      limit,
      hash: '0'
<<<<<<< HEAD
    }, {cacheSeconds: 60}).then(result => {
      appUsersManager.saveApiUsers((result as ChannelsChannelParticipants.channelsChannelParticipants).users);
=======
    }, {cacheSeconds: 60}).then((result) => {
      this.appUsersManager.saveApiUsers((result as ChannelsChannelParticipants.channelsChannelParticipants).users);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return result as ChannelsChannelParticipants.channelsChannelParticipants;
    });
    /* let maybeAddSelf = (participants: any[]) => {
      let chat = appChatsManager.getChat(id);
      let selfMustBeFirst = filter._ === 'channelParticipantsRecent' &&
                            !offset &&
                            !chat.pFlags.kicked &&
                            !chat.pFlags.left;

      if(selfMustBeFirst) {
        participants = copy(participants);
        let myID = appUsersManager.getSelf().id;
<<<<<<< HEAD
        let myIndex = participants.findIndex(p => p.user_id === myID);
=======
        let myIndex = participants.findIndex((p) => p.user_id === myID);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        let myParticipant;

        if(myIndex !== -1) {
          myParticipant = participants[myIndex];
          participants.splice(myIndex, 1);
        } else {
          myParticipant = {_: 'channelParticipantSelf', user_id: myID};
        }

        participants.unshift(myParticipant);
      }

      return participants;
    } */
  }

  public getChannelParticipant(id: ChatId, peerId: PeerId) {
<<<<<<< HEAD
    return apiManager.invokeApiSingle('channels.getParticipant', {
      channel: appChatsManager.getChannelInput(id),
      participant: appPeersManager.getInputPeerById(peerId),
    }).then(channelParticipant => {
      appUsersManager.saveApiUsers(channelParticipant.users);
=======
    return this.apiManager.invokeApiSingle('channels.getParticipant', {
      channel: this.appChatsManager.getChannelInput(id),
      participant: this.appPeersManager.getInputPeerById(peerId),
    }).then((channelParticipant) => {
      this.appUsersManager.saveApiUsers(channelParticipant.users);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return channelParticipant.participant;
    });
  }

  public getChannelFull(id: ChatId, override?: true) {
    if(this.chatsFull[id] !== undefined && !override) {
      return this.chatsFull[id] as ChatFull.channelFull;
    }

<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
      method: 'channels.getFullChannel', 
      params: {
        channel: appChatsManager.getChannelInput(id)
      }, 
      processResult: (result) => {
        const peerId = id.toPeerId(true);
        appChatsManager.saveApiChats(result.chats, true);
        appUsersManager.saveApiUsers(result.users);
        const fullChannel = result.full_chat as ChatFull.channelFull;
        if(fullChannel && fullChannel.chat_photo.id) {
          fullChannel.chat_photo = appPhotosManager.savePhoto(fullChannel.chat_photo, {type: 'profilePhoto', peerId});
          //appPhotosManager.savePhoto(fullChannel.chat_photo);
        }
        appNotificationsManager.savePeerSettings({
=======
    return this.apiManager.invokeApiSingleProcess({
      method: 'channels.getFullChannel', 
      params: {
        channel: this.appChatsManager.getChannelInput(id)
      }, 
      processResult: (result) => {
        const peerId = id.toPeerId(true);
        this.appChatsManager.saveApiChats(result.chats, true);
        this.appUsersManager.saveApiUsers(result.users);
        const fullChannel = result.full_chat as ChatFull.channelFull;
        if(fullChannel && fullChannel.chat_photo.id) {
          fullChannel.chat_photo = this.appPhotosManager.savePhoto(fullChannel.chat_photo, {type: 'profilePhoto', peerId});
          //appPhotosManager.savePhoto(fullChannel.chat_photo);
        }

        if(fullChannel.call) {
          this.appGroupCallsManager.saveGroupCall(fullChannel.call, id);
        }

        this.appNotificationsManager.savePeerSettings({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          peerId, 
          settings: fullChannel.notify_settings
        });

        this.chatsFull[id] = fullChannel;
<<<<<<< HEAD
        rootScope.dispatchEvent('chat_full_update', id);
=======
        this.rootScope.dispatchEvent('chat_full_update', id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        return fullChannel;
      }, 
      processError: (error) => {
        switch(error.type) {
          case 'CHANNEL_PRIVATE':
<<<<<<< HEAD
            let channel = appChatsManager.getChat(id);
            channel = {_: 'channelForbidden', access_hash: channel.access_hash, title: channel.title};
            apiUpdatesManager.processUpdateMessage({
=======
            const channel: Chat.channel | Chat.channelForbidden = this.appChatsManager.getChat(id);
            this.apiUpdatesManager.processUpdateMessage({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              _: 'updates',
              updates: [{
                _: 'updateChannel',
                channel_id: id
<<<<<<< HEAD
              } as Update.updateChannel],
              chats: [channel],
              users: []
            });
=======
              }],
              chats: [{
                _: 'channelForbidden',
                id,
                access_hash: channel.access_hash,
                title: channel.title,
                pFlags: channel.pFlags
              }],
              users: []
            } as Updates.updates);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            break;
        }

        throw error;
      }
    });
  }

  public getMentions(chatId: ChatId, query: string, threadId?: number): Promise<PeerId[]> {
    const processUserIds = (topPeers: MyTopPeer[]) => {
      const startsWithAt = query.charAt(0) === '@';
      if(startsWithAt) query = query.slice(1);
      /* const startsWithAt = query.charAt(0) === '@';
      if(startsWithAt) query = query.slice(1);
      
      const index = new SearchIndex<number>(!startsWithAt, !startsWithAt); */
      const index = new SearchIndex<PeerId>({
        ignoreCase: true
      });

      const ratingMap: Map<PeerId, number> = new Map();
<<<<<<< HEAD
      topPeers.forEach(peer => {
        index.indexObject(peer.id, appUsersManager.getUserSearchText(peer.id));
=======
      topPeers.forEach((peer) => {
        index.indexObject(peer.id, this.appUsersManager.getUserSearchText(peer.id));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        ratingMap.set(peer.id, peer.rating);
      });

      const peerIds = Array.from(index.search(query));
      peerIds.sort((a, b) => ratingMap.get(b) - ratingMap.get(a));
      return peerIds;
    };

    let promise: Promise<PeerId[]>;
<<<<<<< HEAD
    if(appChatsManager.isChannel(chatId)) {
      promise = this.getChannelParticipants(chatId, {
        _: 'channelParticipantsMentions',
        q: query,
        top_msg_id: appMessagesIdsManager.getServerMessageId(threadId)
      }, 50, 0).then(cP => {
        return cP.participants.map(p => appChatsManager.getParticipantPeerId(p));
      });
    } else if(chatId) {
      promise = Promise.resolve(this.getChatFull(chatId)).then(chatFull => {
        return ((chatFull as ChatFull.chatFull).participants as ChatParticipants.chatParticipants).participants.map(p => p.user_id.toPeerId());
=======
    if(this.appChatsManager.isChannel(chatId)) {
      promise = this.getChannelParticipants(chatId, {
        _: 'channelParticipantsMentions',
        q: query,
        top_msg_id: getServerMessageId(threadId)
      }, 50, 0).then((cP) => {
        return cP.participants.map((p) => getParticipantPeerId(p));
      });
    } else if(chatId) {
      promise = Promise.resolve(this.getChatFull(chatId)).then((chatFull) => {
        return ((chatFull as ChatFull.chatFull).participants as ChatParticipants.chatParticipants).participants.map((p) => p.user_id.toPeerId());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
    } else {
      promise = Promise.resolve([]);
    }

    return Promise.all([
      // [],
<<<<<<< HEAD
      appUsersManager.getTopPeers('bots_inline').catch(() => [] as MyTopPeer[]), 
      promise
    ]).then(results => {
      const peers = results[0].concat(results[1].map(peerId => ({id: peerId, rating: 0})));
=======
      this.appUsersManager.getTopPeers('bots_inline').catch(() => [] as MyTopPeer[]), 
      promise
    ]).then((results) => {
      const peers = results[0].concat(results[1].map((peerId) => ({id: peerId, rating: 0})));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      return processUserIds(peers);
    });
  }

<<<<<<< HEAD
  public invalidateChannelParticipants(id: ChatId) {
    apiManager.clearCache('channels.getParticipants', (params) => (params.channel as InputChannel.inputChannel).channel_id === id);
=======
  private invalidateChannelParticipants(id: ChatId) {
    this.apiManager.clearCache('channels.getParticipants', (params) => (params.channel as InputChannel.inputChannel).channel_id === id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.refreshFullPeer(id.toPeerId(true));
  }

  private refreshFullPeer(peerId: PeerId) {
    if(peerId.isUser()) {
      const userId = peerId.toUserId();
      delete this.usersFull[userId];
<<<<<<< HEAD
      rootScope.dispatchEvent('user_full_update', userId);
    } else {
      const chatId = peerId.toChatId();
      delete this.chatsFull[chatId];
      rootScope.dispatchEvent('chat_full_update', chatId);
=======
      this.rootScope.dispatchEvent('user_full_update', userId);
    } else {
      const chatId = peerId.toChatId();
      delete this.chatsFull[chatId];
      this.rootScope.dispatchEvent('chat_full_update', chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    // ! эта строчка будет создавать race condition:
    // ! запрос вернёт chat с установленным флагом call_not_empty, хотя сам апдейт уже будет применён
    // this.getProfileByPeerId(peerId, true);
  }

  public updateProfile(first_name?: string, last_name?: string, about?: string) {
<<<<<<< HEAD
    return apiManager.invokeApi('account.updateProfile', {
      first_name,
      last_name,
      about
    }).then(user => {
      appUsersManager.saveApiUser(user);
=======
    return this.apiManager.invokeApi('account.updateProfile', {
      first_name,
      last_name,
      about
    }).then((user) => {
      this.appUsersManager.saveApiUser(user);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      if(about !== undefined) {
        const peerId = user.id.toPeerId();
        const userFull = this.usersFull[user.id];
        if(userFull) {
          userFull.about = about;
        }
  
<<<<<<< HEAD
        rootScope.dispatchEvent('peer_bio_edit', peerId);
      }
      
      return this.getProfile(rootScope.myId, true);
=======
        this.rootScope.dispatchEvent('peer_bio_edit', peerId);
      }
      
      return this.getProfile(this.appPeersManager.peerId, true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public uploadProfilePhoto(inputFile: InputFile) {
<<<<<<< HEAD
    return apiManager.invokeApi('photos.uploadProfilePhoto', {
=======
    return this.apiManager.invokeApi('photos.uploadProfilePhoto', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      file: inputFile
    }).then((updateResult) => {
      // ! sometimes can have no user in users
      const photo = updateResult.photo as Photo.photo;
      if(!updateResult.users.length) {
<<<<<<< HEAD
        const strippedThumb = photo.sizes.find(size => size._ === 'photoStrippedSize') as PhotoSize.photoStrippedSize;
        updateResult.users.push({
          ...appUsersManager.getSelf(), 
=======
        const strippedThumb = photo.sizes.find((size) => size._ === 'photoStrippedSize') as PhotoSize.photoStrippedSize;
        updateResult.users.push({
          ...this.appUsersManager.getSelf(), 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          photo: {
            _: 'userProfilePhoto',
            dc_id: photo.dc_id,
            photo_id: photo.id,
            stripped_thumb: strippedThumb?.bytes,
            pFlags: {

            }
          }
        });
      }
<<<<<<< HEAD
      appUsersManager.saveApiUsers(updateResult.users);

      const myId = rootScope.myId;
      appPhotosManager.savePhoto(updateResult.photo, {
=======
      this.appUsersManager.saveApiUsers(updateResult.users);

      const myId = this.appPeersManager.peerId;
      this.appPhotosManager.savePhoto(updateResult.photo, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        type: 'profilePhoto',
        peerId: myId
      });

      const userId = myId.toUserId();
<<<<<<< HEAD
      apiUpdatesManager.processLocalUpdate({
        _: 'updateUserPhoto',
        user_id: userId,
        date: tsNow(true),
        photo: appUsersManager.getUser(userId).photo,
=======
      this.apiUpdatesManager.processLocalUpdate({
        _: 'updateUserPhoto',
        user_id: userId,
        date: tsNow(true),
        photo: this.appUsersManager.getUser(userId).photo,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        previous: true
      });
    });
  }

  public deletePhotos(photoIds: string[]) {
<<<<<<< HEAD
    return apiManager.invokeApiSingle('photos.deletePhotos', {
      id: photoIds.map(photoId => {
        const photo = appPhotosManager.getPhoto(photoId);
        return appPhotosManager.getInput(photo);
=======
    return this.apiManager.invokeApiSingle('photos.deletePhotos', {
      id: photoIds.map((photoId) => {
        const photo = this.appPhotosManager.getPhoto(photoId);
        return getPhotoInput(photo);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      })
    }).then((deletedList) => {
      
    });
  }

<<<<<<< HEAD
  public getChatMembersString(chatId: ChatId) {
    const chat: Chat = appChatsManager.getChat(chatId);
    if(chat._ === 'chatForbidden') {
      return i18n('YouWereKicked');
    }

    const chatFull = this.chatsFull[chatId];
    let count: number;
    if(chatFull) {
      if(chatFull._ === 'channelFull') {
        count = chatFull.participants_count;
      } else {
        count = (chatFull.participants as ChatParticipants.chatParticipants).participants?.length;
      }
    } else {
      count = (chat as Chat.chat).participants_count || (chat as any).participants?.participants.length;
    }

    const isChannel = appChatsManager.isBroadcast(chatId);
    count = count || 1;

    let key: LangPackKey = isChannel ? 'Peer.Status.Subscribers' : 'Peer.Status.Member';
    return i18n(key, [numberThousandSplitter(count)]);
  }

  private verifyParticipantForOnlineCount(participant: {user_id: UserId}) {
    const user = appUsersManager.getUser(participant.user_id);
=======
  private verifyParticipantForOnlineCount(participant: {user_id: UserId}) {
    const user = this.appUsersManager.getUser(participant.user_id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return !!(user && user.status && user.status._ === 'userStatusOnline');
  }

  private reduceParticipantsForOnlineCount(participants: {user_id: UserId}[]) {
    return participants.reduce((acc, participant) => {
      return acc + +this.verifyParticipantForOnlineCount(participant);
    }, 0);
  }

  public async getOnlines(id: ChatId): Promise<number> {
    const minOnline = 1;
<<<<<<< HEAD
    if(appChatsManager.isBroadcast(id)) {
=======
    if(this.appChatsManager.isBroadcast(id)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return minOnline;
    }
    
    const chatInfo = await this.getChatFull(id);
<<<<<<< HEAD
    if(appChatsManager.isMegagroup(id)) {
=======
    if(this.appChatsManager.isMegagroup(id)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if((chatInfo as ChatFull.channelFull).participants_count <= 100) {
        const channelParticipants = await this.getChannelParticipants(id, {_: 'channelParticipantsRecent'}, 100);
        return this.reduceParticipantsForOnlineCount(channelParticipants.participants as ChannelParticipant.channelParticipant[]);
      }

<<<<<<< HEAD
      const res = await apiManager.invokeApiCacheable('messages.getOnlines', {
        peer: appChatsManager.getChannelInputPeer(id)
=======
      const res = await this.apiManager.invokeApiCacheable('messages.getOnlines', {
        peer: this.appChatsManager.getChannelInputPeer(id)
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }, {cacheSeconds: 60});

      const onlines = res.onlines ?? minOnline;
      return onlines;
    }

    const _participants = (chatInfo as ChatFull.chatFull).participants as ChatParticipants.chatParticipants;
    if(_participants?.participants) {
      return this.reduceParticipantsForOnlineCount(_participants.participants);
    } else {
      return minOnline;
    }
  }

  private onUpdateUserTyping = (update: Update.updateUserTyping | Update.updateChatUserTyping | Update.updateChannelUserTyping) => {
    const fromId = (update as Update.updateUserTyping).user_id ? 
      (update as Update.updateUserTyping).user_id.toPeerId() : 
<<<<<<< HEAD
      appPeersManager.getPeerId((update as Update.updateChatUserTyping).from_id);
    if(rootScope.myId === fromId || update.action._ === 'speakingInGroupCallAction') {
      return;
    }
    
    const peerId = appPeersManager.getPeerId(update);
    const typings = this.typingsInPeer[peerId] ?? (this.typingsInPeer[peerId] = []);
    let typing = typings.find(t => t.userId === fromId);

    const cancelAction = () => {
      delete typing.timeout;
      //typings.findAndSplice(t => t === typing);
=======
      getPeerId((update as Update.updateChatUserTyping).from_id);
    if(this.appPeersManager.peerId === fromId || update.action._ === 'speakingInGroupCallAction') {
      return;
    }
    
    const peerId = getPeerId(update);
    const typings = this.typingsInPeer[peerId] ?? (this.typingsInPeer[peerId] = []);
    let typing = typings.find((t) => t.userId === fromId);

    const cancelAction = () => {
      delete typing.timeout;
      //typings.findAndSplice((t) => t === typing);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const idx = typings.indexOf(typing);
      if(idx !== -1) {
        typings.splice(idx, 1);
      }

<<<<<<< HEAD
      rootScope.dispatchEvent('peer_typings', {peerId, typings});
=======
      this.rootScope.dispatchEvent('peer_typings', {peerId, typings});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      if(!typings.length) {
        delete this.typingsInPeer[peerId];
      }
    };

    if(typing && typing.timeout !== undefined) {
      clearTimeout(typing.timeout);
    }

    if(update.action._ === 'sendMessageCancelAction') {
      if(!typing) {
        return;
      }

      cancelAction();
      return;
    }

    if(!typing) {
      typing = {
        userId: fromId
      };

      typings.push(typing);
    }

    //console.log('updateChatUserTyping', update, typings);
    
    typing.action = update.action;
    
<<<<<<< HEAD
    const hasUser = appUsersManager.hasUser(fromId);
    if(!hasUser) {
      // let's load user here
      if(update._ === 'updateChatUserTyping') {
        if(update.chat_id && appChatsManager.hasChat(update.chat_id) && !appChatsManager.isChannel(update.chat_id)) {
          Promise.resolve(this.getChatFull(update.chat_id)).then(() => {
            if(typing.timeout !== undefined && appUsersManager.hasUser(fromId)) {
              rootScope.dispatchEvent('peer_typings', {peerId, typings});
=======
    const hasUser = this.appUsersManager.hasUser(fromId);
    if(!hasUser) {
      // let's load user here
      if(update._ === 'updateChatUserTyping') {
        if(update.chat_id && this.appChatsManager.hasChat(update.chat_id) && !this.appChatsManager.isChannel(update.chat_id)) {
          Promise.resolve(this.getChatFull(update.chat_id)).then(() => {
            if(typing.timeout !== undefined && this.appUsersManager.hasUser(fromId)) {
              this.rootScope.dispatchEvent('peer_typings', {peerId, typings});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            }
          });
        }
      }
      
      //return;
    } else {
<<<<<<< HEAD
      appUsersManager.forceUserOnline(fromId);
    }

    typing.timeout = window.setTimeout(cancelAction, 6000);
    if(hasUser) {
      rootScope.dispatchEvent('peer_typings', {peerId, typings});
=======
      this.appUsersManager.forceUserOnline(fromId);
    }

    typing.timeout = ctx.setTimeout(cancelAction, 6000);
    if(hasUser) {
      this.rootScope.dispatchEvent('peer_typings', {peerId, typings});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }
  };

  private onUpdatePeerBlocked = (update: Update.updatePeerBlocked) => {
<<<<<<< HEAD
    const peerId = appPeersManager.getPeerId(update.peer_id);
    if(appPeersManager.isUser(peerId)) {
=======
    const peerId = getPeerId(update.peer_id);
    if(this.appPeersManager.isUser(peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const userId = peerId.toUserId();
      const userFull = this.usersFull[userId];
      if(userFull) {
        if(update.blocked) userFull.pFlags.blocked = true;
        else delete userFull.pFlags.blocked;
      }

<<<<<<< HEAD
      rootScope.dispatchEvent('user_full_update', userId);
    }

    rootScope.dispatchEvent('peer_block', {peerId, blocked: update.blocked});
=======
      this.rootScope.dispatchEvent('user_full_update', userId);
    }

    this.rootScope.dispatchEvent('peer_block', {peerId, blocked: update.blocked});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  public getPeerTypings(peerId: PeerId) {
    return this.typingsInPeer[peerId];
  }
}
<<<<<<< HEAD

const appProfileManager = new AppProfileManager();
MOUNT_CLASS_TO.appProfileManager = appProfileManager;
export default appProfileManager;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
