/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { MOUNT_CLASS_TO } from "../../config/debug";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import findAndSplice from "../../helpers/array/findAndSplice";
import assumeType from "../../helpers/assumeType";
import callbackify from "../../helpers/callbackify";
import callbackifyAll from "../../helpers/callbackifyAll";
import copy from "../../helpers/object/copy";
import { AvailableReaction, Message, MessagePeerReaction, MessagesAvailableReactions, Update, Updates } from "../../layer";
<<<<<<< HEAD
import apiManager from "../mtproto/mtprotoworker";
import { ReferenceContext } from "../mtproto/referenceDatabase";
import rootScope from "../rootScope";
import apiUpdatesManager from "./apiUpdatesManager";
import appDocsManager from "./appDocsManager";
import appMessagesIdsManager from "./appMessagesIdsManager";
import appPeersManager from "./appPeersManager";
import appProfileManager from "./appProfileManager";
import appUsersManager from "./appUsersManager";
=======
import { ReferenceContext } from "../mtproto/referenceDatabase";
import { AppManager } from "./manager";
import getServerMessageId from "./utils/messageId/getServerMessageId";
import getPeerId from "./utils/peers/getPeerId";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

const SAVE_DOC_KEYS = [
  'static_icon' as const,
  'appear_animation' as const,
  'select_animation' as const,
  'activate_animation' as const,
  'effect_animation' as const,
  'around_animation' as const,
  'center_icon' as const
];

const REFERENCE_CONTEXT: ReferenceContext = {
  type: 'reactions'
};

<<<<<<< HEAD
export class AppReactionsManager {
=======
export class AppReactionsManager extends AppManager {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private availableReactions: AvailableReaction[];
  private sendReactionPromises: Map<string, Promise<any>>;
  private lastSendingTimes: Map<string, number>;

<<<<<<< HEAD
  constructor() {
    rootScope.addEventListener('language_change', () => {
=======
  protected after() {
    this.rootScope.addEventListener('language_change', () => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.availableReactions = undefined;
      this.getAvailableReactions();
    });

    this.sendReactionPromises = new Map();
    this.lastSendingTimes = new Map();

<<<<<<< HEAD
    setTimeout(() => {
      Promise.resolve(this.getAvailableReactions()).then(async(availableReactions) => {
        for(const availableReaction of availableReactions) {
          await Promise.all([
            availableReaction.around_animation && appDocsManager.downloadDoc(availableReaction.around_animation),
            availableReaction.static_icon && appDocsManager.downloadDoc(availableReaction.static_icon),
            availableReaction.appear_animation && appDocsManager.downloadDoc(availableReaction.appear_animation),
            availableReaction.center_icon && appDocsManager.downloadDoc(availableReaction.center_icon)
          ]);
        }
      });
    }, 7.5e3);
=======
    this.rootScope.addEventListener('user_auth', () => {
      setTimeout(() => {
        Promise.resolve(this.getAvailableReactions()).then(async(availableReactions) => {
          for(const availableReaction of availableReactions) {
            await Promise.all([
              availableReaction.around_animation && this.apiFileManager.downloadMedia({media: availableReaction.around_animation}),
              availableReaction.static_icon && this.apiFileManager.downloadMedia({media: availableReaction.static_icon}),
              availableReaction.appear_animation && this.apiFileManager.downloadMedia({media: availableReaction.appear_animation}),
              availableReaction.center_icon && this.apiFileManager.downloadMedia({media: availableReaction.center_icon})
            ]);
          }
        });
      }, 7.5e3);
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public getAvailableReactions() {
    if(this.availableReactions) return this.availableReactions;
<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
=======
    return this.apiManager.invokeApiSingleProcess({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      method: 'messages.getAvailableReactions',
      processResult: (messagesAvailableReactions) => {
        assumeType<MessagesAvailableReactions.messagesAvailableReactions>(messagesAvailableReactions);

        const availableReactions = this.availableReactions = messagesAvailableReactions.reactions;
        for(const reaction of availableReactions) {
          for(const key of SAVE_DOC_KEYS) {
            if(!reaction[key]) {
              continue;
            }
            
<<<<<<< HEAD
            reaction[key] = appDocsManager.saveDoc(reaction[key], REFERENCE_CONTEXT);
=======
            reaction[key] = this.appDocsManager.saveDoc(reaction[key], REFERENCE_CONTEXT);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }
        }

        return availableReactions;
      },
      params: {
        hash: 0
      }
    });
  }

  public getActiveAvailableReactions() {
    return callbackify(this.getAvailableReactions(), (availableReactions) => {
<<<<<<< HEAD
      return availableReactions.filter(availableReaction => !availableReaction.pFlags.inactive);
=======
      return availableReactions.filter((availableReaction) => !availableReaction.pFlags.inactive);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public getAvailableReactionsForPeer(peerId: PeerId) {
    const activeAvailableReactions = this.getActiveAvailableReactions();
    if(peerId.isUser()) {
      return this.unshiftQuickReaction(activeAvailableReactions);
    }

<<<<<<< HEAD
    const chatFull = appProfileManager.getChatFull(peerId.toChatId());
    return callbackifyAll([activeAvailableReactions, chatFull, this.getQuickReaction()], ([activeAvailableReactions, chatFull, quickReaction]) => {
      const chatAvailableReactions = chatFull.available_reactions ?? [];

      const filteredChatAvailableReactions = chatAvailableReactions.map(reaction => {
        return activeAvailableReactions.find(availableReaction => availableReaction.reaction === reaction);
=======
    const chatFull = this.appProfileManager.getChatFull(peerId.toChatId());
    return callbackifyAll([activeAvailableReactions, chatFull, this.getQuickReaction()], ([activeAvailableReactions, chatFull, quickReaction]) => {
      const chatAvailableReactions = chatFull.available_reactions ?? [];

      const filteredChatAvailableReactions = chatAvailableReactions.map((reaction) => {
        return activeAvailableReactions.find((availableReaction) => availableReaction.reaction === reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }).filter(Boolean);

      return this.unshiftQuickReactionInner(filteredChatAvailableReactions, quickReaction);
    });
  }

  private unshiftQuickReactionInner(availableReactions: AvailableReaction.availableReaction[], quickReaction: AvailableReaction.availableReaction) {
    const availableReaction = findAndSplice(availableReactions, availableReaction => availableReaction.reaction === quickReaction.reaction);
    if(availableReaction) {
      availableReactions.unshift(availableReaction);
    }

    return availableReactions;
  }

  private unshiftQuickReaction(
    availableReactions: AvailableReaction.availableReaction[] | PromiseLike<AvailableReaction.availableReaction[]>, 
    quickReaction: ReturnType<AppReactionsManager['getQuickReaction']> = this.getQuickReaction()
  ) {
    return callbackifyAll([
      availableReactions,
      quickReaction
    ], ([availableReactions, quickReaction]) => {
      return this.unshiftQuickReactionInner(availableReactions, quickReaction);
    });
  }

  public getAvailableReactionsByMessage(message: Message.message) {
<<<<<<< HEAD
    const peerId = (message.fwd_from?.channel_post && appPeersManager.isMegagroup(message.peerId) && message.fwdFromId) || message.peerId;
=======
    if(!message) return [];
    const peerId = (message.fwd_from?.channel_post && this.appPeersManager.isMegagroup(message.peerId) && message.fwdFromId) || message.peerId;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return this.getAvailableReactionsForPeer(peerId);
  }

  public isReactionActive(reaction: string) {
    if(!this.availableReactions) return false;
<<<<<<< HEAD
    return !!this.availableReactions.find(availableReaction => availableReaction.reaction === reaction);
=======
    return !!this.availableReactions.find((availableReaction) => availableReaction.reaction === reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public getQuickReaction() {
    return callbackifyAll([
<<<<<<< HEAD
      apiManager.getAppConfig(),
      this.getAvailableReactions()
    ], ([appConfig, availableReactions]) => {
      return availableReactions.find(reaction => reaction.reaction === appConfig.reactions_default);
=======
      this.apiManager.getAppConfig(),
      this.getAvailableReactions()
    ], ([appConfig, availableReactions]) => {
      return availableReactions.find((reaction) => reaction.reaction === appConfig.reactions_default);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public getReactionCached(reaction: string) {
<<<<<<< HEAD
    return this.availableReactions.find(availableReaction => availableReaction.reaction === reaction);
=======
    return this.availableReactions.find((availableReaction) => availableReaction.reaction === reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public getReaction(reaction: string) {
    return callbackify(this.getAvailableReactions(), () => {
      return this.getReactionCached(reaction);
    });
  }

  public getMessagesReactions(peerId: PeerId, mids: number[]) {
<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
      method: 'messages.getMessagesReactions',
      params: {
        id: mids.map(mid => appMessagesIdsManager.getServerMessageId(mid)),
        peer: appPeersManager.getInputPeerById(peerId)
      },
      processResult: (updates) => {
        apiUpdatesManager.processUpdateMessage(updates);

        // const update = (updates as Updates.updates).updates.find(update => update._ === 'updateMessageReactions') as Update.updateMessageReactions;
=======
    return this.apiManager.invokeApiSingleProcess({
      method: 'messages.getMessagesReactions',
      params: {
        id: mids.map((mid) => getServerMessageId(mid)),
        peer: this.appPeersManager.getInputPeerById(peerId)
      },
      processResult: (updates) => {
        this.apiUpdatesManager.processUpdateMessage(updates);

        // const update = (updates as Updates.updates).updates.find((update) => update._ === 'updateMessageReactions') as Update.updateMessageReactions;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        // return update.reactions;
      }
    });
  }

  public getMessageReactionsList(peerId: PeerId, mid: number, limit: number, reaction?: string, offset?: string) {
<<<<<<< HEAD
    return apiManager.invokeApiSingleProcess({
      method: 'messages.getMessageReactionsList',
      params: {
        peer: appPeersManager.getInputPeerById(peerId),
        id: appMessagesIdsManager.getServerMessageId(mid),
=======
    return this.apiManager.invokeApiSingleProcess({
      method: 'messages.getMessageReactionsList',
      params: {
        peer: this.appPeersManager.getInputPeerById(peerId),
        id: getServerMessageId(mid),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        limit,
        reaction,
        offset
      },
      processResult: (messageReactionsList) => {
<<<<<<< HEAD
        appUsersManager.saveApiUsers(messageReactionsList.users);
=======
        this.appUsersManager.saveApiUsers(messageReactionsList.users);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return messageReactionsList;
      }
    });
  }

  public setDefaultReaction(reaction: string) {
<<<<<<< HEAD
    return apiManager.invokeApi('messages.setDefaultReaction', {reaction}).then(value => {
      if(value) {
        const appConfig = rootScope.appConfig;
        if(appConfig) {
          appConfig.reactions_default = reaction;
        } else { // if no config or loading it - overwrite
          apiManager.getAppConfig(true);
        }

        rootScope.dispatchEvent('quick_reaction', reaction);
=======
    return this.apiManager.invokeApi('messages.setDefaultReaction', {reaction}).then(async(value) => {
      if(value) {
        const appConfig = await this.apiManager.getAppConfig();
        if(appConfig) {
          appConfig.reactions_default = reaction;
        }/*  else { // if no config or loading it - overwrite
          this.apiManager.getAppConfig(true);
        } */

        this.rootScope.dispatchEvent('quick_reaction', reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      return value;
    });
  }

  public sendReaction(message: Message.message, reaction?: string, onlyLocal?: boolean) {
    const lastSendingTimeKey = message.peerId + '_' + message.mid;
    const lastSendingTime = this.lastSendingTimes.get(lastSendingTimeKey);
    if(lastSendingTime) {
      return;
    } else {
      this.lastSendingTimes.set(lastSendingTimeKey, Date.now());
      setTimeout(() => {
        this.lastSendingTimes.delete(lastSendingTimeKey);
      }, 333);
    }

    const {peerId, mid} = message;
<<<<<<< HEAD
    const myPeerId = rootScope.myId;
=======
    const myPeerId = this.appPeersManager.peerId;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    let reactions = onlyLocal ? message.reactions : copy(message.reactions);
    let chosenReactionIdx = reactions ? reactions.results.findIndex((reactionCount) => reactionCount.pFlags.chosen) : -1;
    let chosenReaction = chosenReactionIdx !== -1 && reactions.results[chosenReactionIdx];
    if(chosenReaction) { // clear current reaction
      --chosenReaction.count;
      delete chosenReaction.pFlags.chosen;

      if(reaction === chosenReaction.reaction) {
        reaction = undefined;
      }

      if(!chosenReaction.count) {
        reactions.results.splice(chosenReactionIdx, 1);
      }/*  else {
        insertInDescendSortedArray(reactions.results, chosenReaction, 'count', chosenReactionIdx);
      } */

      if(reactions.recent_reactions) {
<<<<<<< HEAD
        findAndSplice(reactions.recent_reactions, (recentReaction) => appPeersManager.getPeerId(recentReaction.peer_id) === myPeerId);
=======
        findAndSplice(reactions.recent_reactions, (recentReaction) => getPeerId(recentReaction.peer_id) === myPeerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      if(!reactions.results.length) {
        reactions = undefined;
      }
    }

    if(reaction) {
      if(!reactions) {
        reactions/*  = message.reactions */ = {
          _: 'messageReactions',
          results: [],
          pFlags: {}
        };

<<<<<<< HEAD
        if(!appPeersManager.isBroadcast(message.peerId)) {
=======
        if(!this.appPeersManager.isBroadcast(message.peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          reactions.pFlags.can_see_list = true;
        }
      }

      let reactionCountIdx = reactions.results.findIndex((reactionCount) => reactionCount.reaction === reaction);
      let reactionCount = reactionCountIdx !== -1 && reactions.results[reactionCountIdx];
      if(!reactionCount) {
        reactionCount = {
          _: 'reactionCount',
          count: 0,
          reaction,
          pFlags: {}
        };

        reactionCountIdx = reactions.results.push(reactionCount) - 1;
      }

      ++reactionCount.count;
      reactionCount.pFlags.chosen = true;

      if(!reactions.recent_reactions && reactions.pFlags.can_see_list) {
        reactions.recent_reactions = [];
      }

      if(reactions.recent_reactions) {
        const userReaction: MessagePeerReaction = {
          _: 'messagePeerReaction',
          reaction,
<<<<<<< HEAD
          peer_id: appPeersManager.getOutputPeer(myPeerId)
        };

        if(!appPeersManager.isMegagroup(peerId)) {
=======
          peer_id: this.appPeersManager.getOutputPeer(myPeerId)
        };

        if(!this.appPeersManager.isMegagroup(peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          reactions.recent_reactions.push(userReaction);
          reactions.recent_reactions = reactions.recent_reactions.slice(-3);
        } else {
          reactions.recent_reactions.unshift(userReaction);
          reactions.recent_reactions = reactions.recent_reactions.slice(0, 3);
        }
      }

      // insertInDescendSortedArray(reactions.results, reactionCount, 'count', reactionCountIdx);
    }

    const availableReactions = this.availableReactions;
    if(reactions && availableReactions?.length) {
      const indexes: Map<string, number> = new Map();
      availableReactions.forEach((availableReaction, idx) => {
        indexes.set(availableReaction.reaction, idx);
      });

      reactions.results.sort((a, b) => {
        return (b.count - a.count) || (indexes.get(a.reaction) - indexes.get(b.reaction));
      });
    }

    if(onlyLocal) {
      message.reactions = reactions;
<<<<<<< HEAD
      rootScope.dispatchEvent('messages_reactions', [{message, changedResults: []}]);
      return Promise.resolve();
    }

    apiUpdatesManager.processLocalUpdate({
=======
      this.rootScope.dispatchEvent('messages_reactions', [{message, changedResults: []}]);
      return Promise.resolve();
    }

    this.apiUpdatesManager.processLocalUpdate({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      _: 'updateMessageReactions',
      peer: message.peer_id,
      msg_id: message.id,
      reactions: reactions,
      local: true
    });

    const promiseKey = [peerId, mid].join('-');
<<<<<<< HEAD
    const msgId = appMessagesIdsManager.getServerMessageId(mid);
    const promise = apiManager.invokeApi('messages.sendReaction', {
      peer: appPeersManager.getInputPeerById(peerId),
=======
    const msgId = getServerMessageId(mid);
    const promise = this.apiManager.invokeApi('messages.sendReaction', {
      peer: this.appPeersManager.getInputPeerById(peerId),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      msg_id: msgId,
      reaction
    }).then((updates) => {
      assumeType<Updates.updates>(updates);
      
<<<<<<< HEAD
      const editMessageUpdateIdx = updates.updates.findIndex(update => update._ === 'updateEditMessage' || update._ === 'updateEditChannelMessage');
=======
      const editMessageUpdateIdx = updates.updates.findIndex((update) => update._ === 'updateEditMessage' || update._ === 'updateEditChannelMessage');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(editMessageUpdateIdx !== -1) {
        const editMessageUpdate = updates.updates[editMessageUpdateIdx] as Update.updateEditMessage | Update.updateEditChannelMessage;
        updates.updates[editMessageUpdateIdx] = {
          _: 'updateMessageReactions',
          msg_id: msgId,
<<<<<<< HEAD
          peer: appPeersManager.getOutputPeer(peerId),
=======
          peer: this.appPeersManager.getOutputPeer(peerId),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          reactions: (editMessageUpdate.message as Message.message).reactions,
          pts: editMessageUpdate.pts,
          pts_count: editMessageUpdate.pts_count
        };
      }

<<<<<<< HEAD
      apiUpdatesManager.processUpdateMessage(updates);
    }).catch(err => {
=======
      this.apiUpdatesManager.processUpdateMessage(updates);
    }).catch((err) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(err.type === 'REACTION_INVALID' && this.sendReactionPromises.get(promiseKey) === promise) {
        this.sendReaction(message, chosenReaction?.reaction, true);
      }
    }).finally(() => {
      if(this.sendReactionPromises.get(promiseKey) === promise) {
        this.sendReactionPromises.delete(promiseKey);
      }
    });
    
    this.sendReactionPromises.set(promiseKey, promise);
    return promise;
  }
}
<<<<<<< HEAD

const appReactionsManager = new AppReactionsManager();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.appReactionsManager = appReactionsManager);
export default appReactionsManager;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
