/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
//import apiManager from '../mtproto/apiManager';
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import animationIntersector from '../../components/animationIntersector';
import appSidebarLeft, { LEFT_COLUMN_ACTIVE_CLASSNAME } from "../../components/sidebarLeft";
import appSidebarRight, { RIGHT_COLUMN_ACTIVE_CLASSNAME } from '../../components/sidebarRight';
import mediaSizes, { ScreenSize } from '../../helpers/mediaSizes';
import { logger, LogTypes } from "../logger";
<<<<<<< HEAD
import apiManager from '../mtproto/mtprotoworker';
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from '../rootScope';
import Chat, { ChatType } from '../../components/chat/chat';
<<<<<<< HEAD
import appChatsManager from './appChatsManager';
import appDocsManager from './appDocsManager';
import appInlineBotsManager from './appInlineBotsManager';
import appMessagesManager from './appMessagesManager';
import appPeersManager from './appPeersManager';
import appPhotosManager from './appPhotosManager';
import appProfileManager from './appProfileManager';
import appStickersManager from './appStickersManager';
import appWebPagesManager from './appWebPagesManager';
import PopupNewMedia, { getCurrentNewMediaPopup } from '../../components/popups/newMedia';
import MarkupTooltip from '../../components/chat/markupTooltip';
import { IS_TOUCH_SUPPORTED } from '../../environment/touchSupport';
import appPollsManager from './appPollsManager';
=======
import PopupNewMedia, { getCurrentNewMediaPopup } from '../../components/popups/newMedia';
import MarkupTooltip from '../../components/chat/markupTooltip';
import IS_TOUCH_SUPPORTED from '../../environment/touchSupport';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import SetTransition from '../../components/singleTransition';
import ChatDragAndDrop from '../../components/chat/dragAndDrop';
import { doubleRaf } from '../../helpers/schedulers';
import lottieLoader from '../rlottie/lottieLoader';
import useHeavyAnimationCheck, { dispatchHeavyAnimationEvent } from '../../hooks/useHeavyAnimationCheck';
<<<<<<< HEAD
import appDraftsManager from './appDraftsManager';
import serverTimeManager from '../mtproto/serverTimeManager';
import stateStorage from '../stateStorage';
import appDownloadManager from './appDownloadManager';
import appStateManager, { AppStateManager, STATE_INIT } from './appStateManager';
import { MOUNT_CLASS_TO } from '../../config/debug';
import appNavigationController from '../../components/appNavigationController';
import appNotificationsManager from './appNotificationsManager';
import AppPrivateSearchTab from '../../components/sidebarRight/tabs/search';
import I18n, { i18n, join, LangPackKey } from '../langPack';
import { ChatInvite, Dialog, Message, SendMessageAction } from '../../layer';
import { hslaStringToHex } from '../../helpers/color';
import { getFilesFromEvent } from '../../helpers/files';
import PeerTitle from '../../components/peerTitle';
import PopupPeer from '../../components/popups/peer';
import { SliceEnd } from '../../helpers/slicedArray';
=======
import stateStorage from '../stateStorage';
import { MOUNT_CLASS_TO } from '../../config/debug';
import appNavigationController from '../../components/appNavigationController';
import AppPrivateSearchTab from '../../components/sidebarRight/tabs/search';
import I18n, { i18n, join, LangPackKey } from '../langPack';
import { ChatFull, ChatInvite, ChatParticipants, Message, MessageAction, MessageMedia, SendMessageAction } from '../../layer';
import PeerTitle from '../../components/peerTitle';
import PopupPeer from '../../components/popups/peer';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import blurActiveElement from '../../helpers/dom/blurActiveElement';
import cancelEvent from '../../helpers/dom/cancelEvent';
import disableTransition from '../../helpers/dom/disableTransition';
import placeCaretAtEnd from '../../helpers/dom/placeCaretAtEnd';
import replaceContent from '../../helpers/dom/replaceContent';
import whichChild from '../../helpers/dom/whichChild';
<<<<<<< HEAD
import appEmojiManager from './appEmojiManager';
import PopupElement from '../../components/popups';
import singleInstance from '../mtproto/singleInstance';
=======
import PopupElement from '../../components/popups';
import singleInstance, { InstanceDeactivateReason, SingleInstance } from '../mtproto/singleInstance';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupStickers from '../../components/popups/stickers';
import PopupJoinChatInvite from '../../components/popups/joinChatInvite';
import { toast, toastNew } from '../../components/toast';
import debounce from '../../helpers/schedulers/debounce';
import pause from '../../helpers/schedulers/pause';
<<<<<<< HEAD
import appMessagesIdsManager from './appMessagesIdsManager';
import { InternalLink, InternalLinkTypeMap, INTERNAL_LINK_TYPE } from './internalLink';
import RichTextProcessor from '../richtextprocessor';
=======
import { InternalLink, InternalLinkTypeMap, INTERNAL_LINK_TYPE } from './internalLink';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import MEDIA_MIME_TYPES_SUPPORTED from '../../environment/mediaMimeTypesSupport';
import { NULL_PEER_ID } from '../mtproto/mtproto_config';
import telegramMeWebManager from '../mtproto/telegramMeWebManager';
import { ONE_DAY } from '../../helpers/date';
<<<<<<< HEAD
import appGroupCallsManager, { GroupCallId, MyGroupCall } from './appGroupCallsManager';
import TopbarCall from '../../components/topbarCall';
import confirmationPopup from '../../components/confirmationPopup';
import IS_GROUP_CALL_SUPPORTED from '../../environment/groupCallSupport';
import appAvatarsManager from './appAvatarsManager';
import appCallsManager from './appCallsManager';
=======
import type { GroupCallId, MyGroupCall } from './appGroupCallsManager';
import TopbarCall from '../../components/topbarCall';
import confirmationPopup from '../../components/confirmationPopup';
import IS_GROUP_CALL_SUPPORTED from '../../environment/groupCallSupport';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import IS_CALL_SUPPORTED from '../../environment/callSupport';
import { CallType } from '../calls/types';
import { Modify, SendMessageEmojiInteractionData } from '../../types';
import htmlToSpan from '../../helpers/dom/htmlToSpan';
import getVisibleRect from '../../helpers/dom/getVisibleRect';
import { simulateClickEvent } from '../../helpers/dom/clickEvent';
<<<<<<< HEAD
import appReactionsManager from './appReactionsManager';
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupCall from '../../components/call';
import copy from '../../helpers/object/copy';
import getObjectKeysAndSort from '../../helpers/object/getObjectKeysAndSort';
import type GroupCallInstance from '../calls/groupCallInstance';
import type CallInstance from '../calls/callInstance';
import numberThousandSplitter from '../../helpers/number/numberThousandSplitter';
import ChatBackgroundPatternRenderer from '../../components/chat/patternRenderer';
import { IS_FIREFOX } from '../../environment/userAgent';
import compareVersion from '../../helpers/compareVersion';
<<<<<<< HEAD

//console.log('appImManager included33!');

appSidebarLeft; // just to include

export const CHAT_ANIMATION_GROUP = 'chat';
const FOCUS_EVENT_NAME = IS_TOUCH_SUPPORTED ? 'touchstart' : 'mousemove';

export type ChatSavedPosition = {
  mids: number[], 
  top: number
};

export type ChatSetPeerOptions = {
  peerId?: PeerId, 
  lastMsgId?: number, 
  threadId?: number,
  startParam?: string
};

export type ChatSetInnerPeerOptions = Modify<ChatSetPeerOptions, {
  peerId: PeerId
}> & {
  type?: ChatType
};
=======
import { AppManagers } from './managers';
import uiNotificationsManager from './uiNotificationsManager';
import appMediaPlaybackController from '../../components/appMediaPlaybackController';
import { PHONE_NUMBER_REG_EXP } from '../richTextProcessor';
import wrapEmojiText from '../richTextProcessor/wrapEmojiText';
import wrapRichText from '../richTextProcessor/wrapRichText';
import wrapUrl from '../richTextProcessor/wrapUrl';
import generateMessageId from './utils/messageId/generateMessageId';
import getUserStatusString from '../../components/wrappers/getUserStatusString';
import getChatMembersString from '../../components/wrappers/getChatMembersString';
import { STATE_INIT } from '../../config/state';
import CacheStorageController from '../cacheStorage';
import themeController from '../../helpers/themeController';
import overlayCounter from '../../helpers/overlayCounter';
import appDialogsManager from './appDialogsManager';
import idleController from '../../helpers/idleController';
import EventListenerBase from '../../helpers/eventListenerBase';
import { AckedResult } from '../mtproto/superMessagePort';
import groupCallsController from '../calls/groupCallsController';
import callsController from '../calls/callsController';
import getFilesFromEvent from '../../helpers/files/getFilesFromEvent';
import apiManagerProxy from '../mtproto/mtprotoworker';
import appRuntimeManager from './appRuntimeManager';
import paymentsWrapCurrencyAmount from '../../helpers/paymentsWrapCurrencyAmount';
import findUpClassName from '../../helpers/dom/findUpClassName';
import { CLICK_EVENT_NAME } from '../../helpers/dom/clickEvent';

export const CHAT_ANIMATION_GROUP = 'chat';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type ChatSavedPosition = {
  mids: number[], 
  top: number
};

export type ChatSetPeerOptions = {
  peerId?: PeerId, 
  lastMsgId?: number, 
  threadId?: number,
  startParam?: string
};

export type ChatSetInnerPeerOptions = Modify<ChatSetPeerOptions, {
  peerId: PeerId
}> & {
  type?: ChatType
};

export class AppImManager extends EventListenerBase<{
  chat_changing: (details: {from: Chat, to: Chat}) => void,
  peer_changed: (peerId: PeerId) => void,
  peer_changing: (chat: Chat) => void,
}> {
  public columnEl = document.getElementById('column-center') as HTMLDivElement;
  public chatsContainer: HTMLElement;

  public offline = false;
  public updateStatusInterval = 0;

  public log: ReturnType<typeof logger>;

  public setPeerPromise: Promise<void> = null;

  public tabId = -1;
  
  public chats: Chat[] = [];
  private prevTab: HTMLElement;
  private chatsSelectTabDebounced: () => void;
  
  public markupTooltip: MarkupTooltip;
  private backgroundPromises: {[slug: string]: Promise<string>};
  
  private topbarCall: TopbarCall;
  public emojiAnimationContainer: HTMLDivElement;

  private lastBackgroundUrl: string;
<<<<<<< HEAD
=======

  public managers: AppManagers;
  
  public cacheStorage = new CacheStorageController('cachedFiles');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  get myId() {
    return rootScope.myId;
  }

  get chat(): Chat {
    return this.chats[this.chats.length - 1];
  }

<<<<<<< HEAD
  constructor() {
    apiUpdatesManager.attach(I18n.lastRequestedLangCode);
    appNotificationsManager.start();

    this.log = logger('IM', LogTypes.Log | LogTypes.Warn | LogTypes.Debug | LogTypes.Error);

    this.backgroundPromises = {};
    STATE_INIT.settings.themes.forEach(theme => {
      if(theme.background.slug) {
        const url = 'assets/img/' + theme.background.slug + '.svg' + (IS_FIREFOX ? '?1' : '');
        this.backgroundPromises[theme.background.slug] = Promise.resolve(url);
      }
    });

    this.selectTab(0);
    
    window.addEventListener('blur', () => {
      animationIntersector.checkAnimations(true);
      
      this.offline = rootScope.idle.isIDLE = true;
      this.updateStatus();
      clearInterval(this.updateStatusInterval);
      rootScope.dispatchEvent('idle', rootScope.idle.isIDLE);
      
      window.addEventListener('focus', () => {
        this.offline = rootScope.idle.isIDLE = false;
        this.updateStatus();
        this.updateStatusInterval = window.setInterval(() => this.updateStatus(), 50e3);
        
        // в обратном порядке
        animationIntersector.checkAnimations(false);

        rootScope.dispatchEvent('idle', rootScope.idle.isIDLE);
      }, {once: true});
    });

    // * Prevent setting online after reloading page
    window.addEventListener(FOCUS_EVENT_NAME, () => {
      this.updateStatusInterval = window.setInterval(() => this.updateStatus(), 50e3);
      this.updateStatus();

      this.offline = rootScope.idle.isIDLE = false;
      rootScope.dispatchEvent('idle', rootScope.idle.isIDLE);
    }, {once: true, passive: true});
=======
  public construct(managers: AppManagers) {
    this.managers = managers;

    const {
      apiUpdatesManager
    } = managers;
    apiUpdatesManager.attach(I18n.lastRequestedLangCode);
    
    appMediaPlaybackController.construct(managers);
    uiNotificationsManager.construct(managers);
    // uiNotificationsManager.start();

    this.log = logger('IM', LogTypes.Log | LogTypes.Warn | LogTypes.Debug | LogTypes.Error);

    this.backgroundPromises = {};
    STATE_INIT.settings.themes.forEach((theme) => {
      if(theme.background.slug) {
        const url = 'assets/img/' + theme.background.slug + '.svg' + (IS_FIREFOX ? '?1' : '');
        this.backgroundPromises[theme.background.slug] = Promise.resolve(url);
      }
    });

    this.selectTab(0);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    idleController.addEventListener('change', (idle) => {
      this.offline = idle;
      this.updateStatus();
      if(idle) {
        clearInterval(this.updateStatusInterval);
      } else {
        this.updateStatusInterval = window.setInterval(() => this.updateStatus(), 50e3);
      }
    });
    
    this.chatsContainer = document.createElement('div');
    this.chatsContainer.classList.add('chats-container', 'tabs-container');
    this.chatsContainer.dataset.animation = 'navigation';

    this.emojiAnimationContainer = document.createElement('div');
    this.emojiAnimationContainer.classList.add('emoji-animation-container');
    this.appendEmojiAnimationContainer(mediaSizes.activeScreen);

    this.columnEl.append(this.chatsContainer);
    
    this.createNewChat();
    this.chatsSelectTab(this.chat.container);

    appNavigationController.onHashChange = this.onHashChange;
    //window.addEventListener('hashchange', this.onHashChange);

    this.setSettings();
    rootScope.addEventListener('settings_updated', this.setSettings);

    useHeavyAnimationCheck(() => {
      animationIntersector.setOnlyOnePlayableGroup('lock');
      animationIntersector.checkAnimations(true);
    }, () => {
      animationIntersector.setOnlyOnePlayableGroup('');
      animationIntersector.checkAnimations(false);
    });

<<<<<<< HEAD
    if(IS_FIREFOX && appStateManager.oldVersion && compareVersion(appStateManager.oldVersion, '1.4.3') === -1) {
=======
    if(IS_FIREFOX && apiManagerProxy.oldVersion && compareVersion(apiManagerProxy.oldVersion, '1.4.3') === -1) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.deleteFilesIterative((response) => {
        return response.headers.get('Content-Type') === 'image/svg+xml';
      }).then(() => {
        this.applyCurrentTheme();
      });
    } else {
      this.applyCurrentTheme();
    }

    // * fix simultaneous opened both sidebars, can happen when floating sidebar is opened with left sidebar
    mediaSizes.addEventListener('changeScreen', (from, to) => {
      if(document.body.classList.contains(LEFT_COLUMN_ACTIVE_CLASSNAME) 
        && document.body.classList.contains(RIGHT_COLUMN_ACTIVE_CLASSNAME)) {
        appSidebarRight.toggleSidebar(false);
      }

      this.appendEmojiAnimationContainer(to);
    });

    mediaSizes.addEventListener('resize', () => {
      // const perf = performance.now();
      const rect = this.chatsContainer.getBoundingClientRect();
      ChatBackgroundPatternRenderer.resizeInstances(rect.width, rect.height).then(() => {
        // this.log.warn('resize bg time:', performance.now() - perf);
        // for(const chat of this.chats) {
        //   if(chat.renderDarkPattern) {
        //     chat.renderDarkPattern();
        //   }
        // }
      });
    });

<<<<<<< HEAD
    rootScope.addEventListener('history_focus', (e) => {
      let {peerId, threadId, mid, startParam} = e;
      if(threadId) threadId = appMessagesIdsManager.generateMessageId(threadId);
      if(mid) mid = appMessagesIdsManager.generateMessageId(mid); // because mid can come from notification, i.e. server message id
      
      this.setInnerPeer({
        peerId, 
        lastMsgId: mid, 
        type: threadId ? 'discussion' : undefined, 
        threadId,
        startParam
      });
    });

    rootScope.addEventListener('peer_changing', (chat) => {
=======
    this.addEventListener('peer_changing', (chat) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.saveChatPosition(chat);
    });

    rootScope.addEventListener('theme_change', () => {
      this.applyCurrentTheme();
    });

    rootScope.addEventListener('choosing_sticker', (choosing) => {
      this.setChoosingStickerTyping(!choosing);
    });

    rootScope.addEventListener('peer_typings', ({peerId, typings}) => {
      const chat = this.chat;
      if(
        !chat || 
        chat.peerId !== peerId || 
<<<<<<< HEAD
        rootScope.overlaysActive || (
=======
        overlayCounter.isOverlayActive || (
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          mediaSizes.activeScreen === ScreenSize.mobile && 
          this.tabId !== 1
        )
      ) {
        return;
      }

<<<<<<< HEAD
      const typing = typings.find(typing => typing.action._ === 'sendMessageEmojiInteraction');
      if(typing?.action?._ === 'sendMessageEmojiInteraction') {
        const action = typing.action;
        const bubble = chat.bubbles.bubbles[appMessagesIdsManager.generateMessageId(typing.action.msg_id)];
        if(bubble && bubble.classList.contains('emoji-big') && bubble.classList.contains('sticker') && getVisibleRect(bubble, chat.bubbles.scrollable.container)) {
          const stickerWrapper: HTMLElement = bubble.querySelector('.media-sticker-wrapper:not(.bubble-hover-reaction-sticker):not(.reaction-sticker)');

          const data: SendMessageEmojiInteractionData = JSON.parse(action.interaction.data);
          data.a.forEach(a => {
            setTimeout(() => {
              simulateClickEvent(stickerWrapper);
            }, a.t * 1000);
          });
          
          appMessagesManager.setTyping(peerId, {
            _: 'sendMessageEmojiInteractionSeen',
            emoticon: action.emoticon
          });
        }
      }
    });

    rootScope.addEventListener('instance_deactivated', () => {
      const popup = new PopupElement('popup-instance-deactivated', undefined, {overlayClosable: true});
      const c = document.createElement('div');
      c.classList.add('instance-deactivated-container');
      (popup as any).container.replaceWith(c);

      const header = document.createElement('div');
      header.classList.add('header');
      header.append(i18n('Deactivated.Title'));

      const subtitle = document.createElement('div');
      subtitle.classList.add('subtitle');
      subtitle.append(i18n('Deactivated.Subtitle'));
=======
      const typing = typings.find((typing) => typing.action._ === 'sendMessageEmojiInteraction');
      if(typing?.action?._ === 'sendMessageEmojiInteraction') {
        const action = typing.action;
        const bubble = chat.bubbles.bubbles[generateMessageId(typing.action.msg_id)];
        if(bubble && bubble.classList.contains('emoji-big') && bubble.classList.contains('sticker') && getVisibleRect(bubble, chat.bubbles.scrollable.container)) {
          const stickerWrapper: HTMLElement = bubble.querySelector('.media-sticker-wrapper:not(.bubble-hover-reaction-sticker):not(.reaction-sticker)');

          const data: SendMessageEmojiInteractionData = JSON.parse(action.interaction.data);
          data.a.forEach((a) => {
            setTimeout(() => {
              simulateClickEvent(stickerWrapper);
            }, a.t * 1000);
          });
          
          this.managers.appMessagesManager.setTyping(peerId, {
            _: 'sendMessageEmojiInteractionSeen',
            emoticon: action.emoticon
          });
        }
      }
    });

    const onInstanceDeactivated = (reason: InstanceDeactivateReason) => {
      const isUpdated = reason === 'version';
      const popup = new PopupElement('popup-instance-deactivated', {overlayClosable: true});
      const c = document.createElement('div');
      c.classList.add('instance-deactivated-container');
      (popup as any).container.replaceWith(c);

      const header = document.createElement('div');
      header.classList.add('header');
      header.append(i18n(isUpdated ? 'Deactivated.Version.Title' : 'Deactivated.Title'));

      const subtitle = document.createElement('div');
      subtitle.classList.add('subtitle');
      subtitle.append(i18n(isUpdated ? 'Deactivated.Version.Subtitle' : 'Deactivated.Subtitle'));

      c.append(header, subtitle);

      document.body.classList.add('deactivated');

      const onClose = isUpdated ? () => {
        appRuntimeManager.reload();
      } : () => {
        document.body.classList.add('deactivated-backwards');

        singleInstance.activateInstance();

        setTimeout(() => {
          document.body.classList.remove('deactivated', 'deactivated-backwards');
        }, 333);
      };

      popup.addEventListener('close', onClose);
      popup.show();
    };

    singleInstance.addEventListener('deactivated', onInstanceDeactivated);
    if(singleInstance.deactivatedReason) {
      onInstanceDeactivated(singleInstance.deactivatedReason);
    }

    // remove scroll listener when setting chat to tray
    this.addEventListener('chat_changing', ({to}) => {
      this.toggleChatGradientAnimation(to);
    });

    rootScope.addEventListener('service_notification', (update) => {
      confirmationPopup({
        button: {langKey: 'OK', isCancel: true},
        description: wrapRichText(update.message)
      });
    });

    rootScope.addEventListener('payment_sent', async({peerId, mid, receiptMessage}) => {
      const message = await this.managers.appMessagesManager.getMessageByPeer(peerId, mid);
      if(!message) {
        return;
      }

      const action = receiptMessage.action as MessageAction.messageActionPaymentSent;
      toastNew({
        langPackKey: 'PaymentInfoHint',
        langPackArguments: [
          paymentsWrapCurrencyAmount(action.total_amount, action.currency),
          wrapEmojiText(((message as Message.message).media as MessageMedia.messageMediaInvoice).title)
        ]
      });
    });

    (window as any).onSpoilerClick = (e: MouseEvent) => {
      const spoiler = findUpClassName(e.target, 'spoiler');
      const parentElement = findUpClassName(spoiler, 'message') || spoiler.parentElement;

      const className = 'is-spoiler-visible';
      const isVisible = parentElement.classList.contains(className);
      if(!isVisible) {
        cancelEvent(e);

        if(CLICK_EVENT_NAME !== 'click') {
          window.addEventListener('click', cancelEvent, {capture: true, once: true});
        }
      }

      const duration = 400 / 2;
      const showDuration = 5000;
      const useRafs = !isVisible ? 2 : 0;
      if(useRafs) {
        parentElement.classList.add('will-change');
      }

      const spoilerTimeout = parentElement.dataset.spoilerTimeout;
      if(spoilerTimeout !== null) {
        clearTimeout(+spoilerTimeout);
        delete parentElement.dataset.spoilerTimeout;
      }

      SetTransition(parentElement, className, true, duration, () => {
        parentElement.dataset.spoilerTimeout = '' + window.setTimeout(() => {
          SetTransition(parentElement, className, false, duration, () => {
            parentElement.classList.remove('will-change');
            delete parentElement.dataset.spoilerTimeout;
          });
        }, showDuration);
      }, useRafs);
    };
    
    apiManagerProxy.addEventListener('notificationBuild', (options) => {
      if(this.chat.peerId === options.message.peerId && !idleController.isIdle) {
        return;
      }
      
      uiNotificationsManager.buildNotification(options);
    });

    this.addEventListener('peer_changed', async(peerId) => {
      document.body.classList.toggle('has-chat', !!peerId);

      this.overrideHash(peerId);

      apiManagerProxy.updateTabState('chatPeerIds', this.chats.map((chat) => chat.peerId).filter(Boolean));
    });

    // stateStorage.get('chatPositions').then((c) => {
      stateStorage.setToCache('chatPositions', /* c ||  */{});
    // });

    if(IS_CALL_SUPPORTED || IS_GROUP_CALL_SUPPORTED) {
      this.topbarCall = new TopbarCall(managers);
    }

    if(IS_CALL_SUPPORTED) {
      callsController.addEventListener('instance', ({instance/* , hasCurrent */}) => {
        // if(hasCurrent) {
          // return;
        // }
        
        const popup = new PopupCall(instance);

        instance.addEventListener('acceptCallOverride', () => {
          return this.discardCurrentCall(instance.interlocutorUserId.toPeerId(), undefined, instance)
          .then(() => {
            callsController.dispatchEvent('accepting', instance);
            return true;
          })
          .catch(() => false);
        });

        popup.addEventListener('close', () => {
          const currentCall = callsController.currentCall;
          if(currentCall && currentCall !== instance && !instance.wasTryingToJoin) {
            instance.hangUp('phoneCallDiscardReasonBusy');
          }
        }, {once: true});

        popup.show();
      });

      callsController.addEventListener('incompatible', (userId) => {
        toastNew({
          langPackKey: 'VoipPeerIncompatible', 
          langPackArguments: [
            new PeerTitle({peerId: userId.toPeerId()}).element
          ]
        });
      });
    }

    // ! do not remove this line 
    // ! instance can be deactivated before the UI starts, because it waits in background for RAF that is delayed
    singleInstance.activateInstance();

    const setAuthorized = () => {
      telegramMeWebManager.setAuthorized(true);
    };

    setInterval(setAuthorized, ONE_DAY);
    setAuthorized();

    this.addAnchorListener<{}>({
      name: 'showMaskedAlert', 
      callback: (params, element) => {
        const href = element.href;

        const a = element.cloneNode(true) as HTMLAnchorElement;
        a.className = 'anchor-url';
        a.innerText = href;
        a.removeAttribute('onclick');

        new PopupPeer('popup-masked-url', {
          titleLangKey: 'OpenUrlTitle',
          descriptionLangKey: 'OpenUrlAlert2',
          descriptionLangArgs: [a],
          buttons: [{
            langKey: 'Open',
            callback: () => {
              a.click();
            },
          }]
        }).show();
      }
    });

    this.addAnchorListener<{uriParams: {command: string, bot: string}}>({
      name: 'execBotCommand', 
      callback: ({uriParams}) => {
        const {command, bot} = uriParams;

        /* const promise = bot ? this.openUsername(bot).then(() => this.chat.peerId) : Promise.resolve(this.chat.peerId);
        promise.then((peerId) => {
          this.managers.appMessagesManager.sendText(peerId, '/' + command);
        }); */

        this.managers.appMessagesManager.sendText(this.chat.peerId, '/' + command + (bot ? '@' + bot : ''));

        //console.log(command, bot);
      }
    });

    this.addAnchorListener<{uriParams: {hashtag: string}}>({
      name: 'searchByHashtag', 
      callback: ({uriParams}) => {
        const {hashtag} = uriParams;
        if(!hashtag) {
          return;
        }

        this.chat.initSearch('#' + hashtag + ' ');
      }
    });

    this.addAnchorListener<{pathnameParams: ['addstickers', string]}>({
      name: 'addstickers', 
      callback: ({pathnameParams}) => {
        const link: InternalLink = {
          _: INTERNAL_LINK_TYPE.STICKER_SET,
          set: pathnameParams[1]
        };

        this.processInternalLink(link);
      }
    });

    // Support old t.me/joinchat/asd and new t.me/+asd
    this.addAnchorListener<{pathnameParams: ['joinchat', string]}>({
      name: 'joinchat', 
      callback: ({pathnameParams}) => {
        const link: InternalLink = {
          _: INTERNAL_LINK_TYPE.JOIN_CHAT,
          invite: pathnameParams[1] || decodeURIComponent(pathnameParams[0]).slice(1)
        };

        this.processInternalLink(link);
      }
    });

    if(IS_GROUP_CALL_SUPPORTED) {
      this.addAnchorListener<{
        uriParams: Omit<InternalLink.InternalLinkVoiceChat, '_'>
      }>({
        name: 'voicechat',
        protocol: 'tg',
        callback: ({uriParams}) => {
          const link = this.makeLink(INTERNAL_LINK_TYPE.VOICE_CHAT, uriParams);
          this.processInternalLink(link);
        }
      });
    }

    this.addAnchorListener<{
    //   pathnameParams: ['c', string, string],
    //   uriParams: {thread?: number}
    // } | {
    //   pathnameParams: [string, string?],
    //   uriParams: {comment?: number}
      pathnameParams: ['c', string, string] | [string, string?],
      uriParams: {thread?: string, comment?: string} | {comment?: string, start?: string}
    }>({
      name: 'im',
      callback: async({pathnameParams, uriParams}) => {
        let link: InternalLink;
        if(PHONE_NUMBER_REG_EXP.test(pathnameParams[0])) {
          link = {
            _: INTERNAL_LINK_TYPE.USER_PHONE_NUMBER,
            phone: pathnameParams[0].slice(1)
          };
        } else if(pathnameParams[0] === 'c') {
          link = {
            _: INTERNAL_LINK_TYPE.PRIVATE_POST,
            channel: pathnameParams[1],
            post: pathnameParams[2],
            thread: 'thread' in uriParams && uriParams.thread,
            comment: uriParams.comment
          };
        } else {
          link = {
            _: INTERNAL_LINK_TYPE.MESSAGE,
            domain: pathnameParams[0],
            post: pathnameParams[1],
            comment: uriParams.comment,
            start: 'start' in uriParams ? uriParams.start : undefined
          };
        }

        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        domain: string,

        // telegrampassport
        scope?: string,
        nonce?: string,
        payload?: string,
        bot_id?: string,
        public_key?: string,
        callback_url?: string,

        // regular
        start?: string,
        startgroup?: string,
        game?: string,
        voicechat?: string,
        post?: string,
        thread?: string,
        comment?: string,
        phone?: string
      }
    }>({
      name: 'resolve',
      protocol: 'tg',
      callback: ({uriParams}) => {
        let link: InternalLink;
        if(uriParams.phone) {
          link = this.makeLink(INTERNAL_LINK_TYPE.USER_PHONE_NUMBER, uriParams as Required<typeof uriParams>);
        } else if(uriParams.domain === 'telegrampassport') {

        } else {
          link = this.makeLink(INTERNAL_LINK_TYPE.MESSAGE, uriParams);
        }

        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        channel: string,
        post: string,
        thread?: string,
        comment?: string
      }
    }>({
      name: 'privatepost',
      protocol: 'tg',
      callback: ({uriParams}) => {
        const link = this.makeLink(INTERNAL_LINK_TYPE.PRIVATE_POST, uriParams);
        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        set: string
      }
    }>({
      name: 'addstickers',
      protocol: 'tg',
      callback: ({uriParams}) => {
        const link = this.makeLink(INTERNAL_LINK_TYPE.STICKER_SET, uriParams);
        this.processInternalLink(link);
      }
    });

    ['joinchat' as const, 'join' as const].forEach((name) => {
      this.addAnchorListener<{
        uriParams: {
          invite: string
        }
      }>({
        name,
        protocol: 'tg',
        callback: ({uriParams}) => {
          const link = this.makeLink(INTERNAL_LINK_TYPE.JOIN_CHAT, uriParams);
          this.processInternalLink(link);
        }
      });
    });

    this.onHashChange(true);
    this.attachKeydownListener();
  }

  private deleteFilesIterative(callback: (response: Response) => boolean) {
    return this.cacheStorage.timeoutOperation((cache) => {
      const perf = performance.now();
      return cache.keys().then((requests) => {
        const promises = requests.map((request) => {
          return cache.match(request).then((response) => {
            return callback(response);
          });
        });

        return Promise.all(promises).then((values) => {
          values.map((isBad, idx) => {
            if(!isBad) {
              return;
            }

            const request = requests[idx];
            return cache.delete(request);
          });

          return Promise.all(values.filter(Boolean));
        });
      }).then(() => {
        this.log('deleted files', performance.now() - perf);
      });
    });
  }

  private toggleChatGradientAnimation(activatingChat: Chat) {
    this.chats.forEach((chat) => {
      if(chat.gradientRenderer) {
        chat.gradientRenderer.scrollAnimate(rootScope.settings.animationsEnabled && chat === activatingChat);
      }
    });
  }

  private appendEmojiAnimationContainer(screen: ScreenSize) {
    const appendTo = screen === ScreenSize.mobile ? this.columnEl : document.body;
    if(this.emojiAnimationContainer.parentElement !== appendTo) {
      appendTo.append(this.emojiAnimationContainer)
    }
  }

  private attachKeydownListener() {
    const IGNORE_KEYS = new Set(['PageUp', 'PageDown', 'Meta', 'Control']);
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if(overlayCounter.isOverlayActive || IGNORE_KEYS.has(key)) return;
      
      const target = e.target as HTMLElement;
      
      //if(target.tagName === 'INPUT') return;
      
      //this.log('onkeydown', e, document.activeElement);

      const chat = this.chat;

      if(e.code === 'KeyC' && (e.ctrlKey || e.metaKey) && target.tagName !== 'INPUT') {
        return;
      } else if(e.altKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
        cancelEvent(e);
        this.managers.dialogsStorage.getNextDialog(this.chat.peerId, key === 'ArrowDown', appDialogsManager.filterId).then((dialog) => {
          if(dialog) {
            this.setPeer({peerId: dialog.peerId});
          }
        });
      } else if(key === 'ArrowUp' && this.chat.type !== 'scheduled') {
        if(!chat.input.editMsgId && chat.input.isInputEmpty()) {
          this.managers.appMessagesManager.getFirstMessageToEdit(chat.peerId, chat.threadId).then((message) => {
            if(message) {
              chat.input.initMessageEditing(message.mid);
              cancelEvent(e); // * prevent from scrolling
            }
          });
        } else {
          return;
        }
      } else if(key === 'ArrowDown') {
        return;
      }
      
      if(
        chat?.input?.messageInput && 
        e.target !== chat.input.messageInput && 
        target.tagName !== 'INPUT' && 
        !target.hasAttribute('contenteditable') && 
        !IS_TOUCH_SUPPORTED && 
        (!mediaSizes.isMobile || this.tabId === 1) && 
        !chat.selection.isSelecting && 
        !chat.input.recording
      ) {
        chat.input.messageInput.focus();
        placeCaretAtEnd(chat.input.messageInput);

        // clone and dispatch same event to new input. it is needed for sending message if input was blurred
        const newEvent = new KeyboardEvent(e.type, e);
        chat.input.messageInput.dispatchEvent(newEvent);
      }
    };
    
    document.body.addEventListener('keydown', onKeyDown);
  }

  private makeLink<T extends INTERNAL_LINK_TYPE>(type: T, uriParams: Omit<InternalLinkTypeMap[T], '_'>) {
    return {
      _: type,
      ...uriParams
    } as any as InternalLinkTypeMap[T];
  }

  public async processInternalLink(link: InternalLink) {
    switch(link?._) {
      case INTERNAL_LINK_TYPE.MESSAGE: {
        const postId = link.post ? generateMessageId(+link.post) : undefined;
        const commentId = link.comment ? generateMessageId(+link.comment) : undefined;

        this.openUsername({
          userName: link.domain, 
          lastMsgId: postId, 
          commentId,
          startParam: link.start
        });
        break;
      }

      case INTERNAL_LINK_TYPE.PRIVATE_POST: {
        const chatId = link.channel.toChatId();
        const peerId = chatId.toPeerId(true);

        const chat = await this.managers.appChatsManager.getChat(chatId);
        if(chat.deleted) {
          try {
            await this.managers.appChatsManager.resolveChannel(chatId);
          } catch(err) {
            toastNew({langPackKey: 'LinkNotFound'});
            throw err;
          }
        }

        const postId = generateMessageId(+link.post);
        const threadId = link.thread ? generateMessageId(+link.thread) : undefined;

        if(threadId) this.openThread(peerId, postId, threadId);
        else this.setInnerPeer({
          peerId,
          lastMsgId: postId,
          threadId
        });
        break;
      }

      case INTERNAL_LINK_TYPE.STICKER_SET: {
        new PopupStickers({id: link.set}).show();
        break;
      }

      case INTERNAL_LINK_TYPE.JOIN_CHAT: {
        this.managers.appChatsManager.checkChatInvite(link.invite).then((chatInvite) => {
          if((chatInvite as ChatInvite.chatInvitePeek).chat) {
            this.managers.appChatsManager.saveApiChat((chatInvite as ChatInvite.chatInvitePeek).chat, true);
          }

          // console.log(chatInvite);

          if(chatInvite._ === 'chatInviteAlready' ||
            chatInvite._ === 'chatInvitePeek'/*  && chatInvite.expires > tsNow(true) */) {
            this.setInnerPeer({
              peerId: chatInvite.chat.id.toPeerId(true)
            });
            return;
          }

          new PopupJoinChatInvite(link.invite, chatInvite);
        }, (err) => {
          if(err.type === 'INVITE_HASH_EXPIRED') {
            toast(i18n('InviteExpired'));
          }
        });
        break;
      }

      case INTERNAL_LINK_TYPE.VOICE_CHAT: {
        if(IS_GROUP_CALL_SUPPORTED) {
          this.joinGroupCall(link.chat_id.toPeerId(true), link.id);
        }
        
        break;
      }

      case INTERNAL_LINK_TYPE.USER_PHONE_NUMBER: {
        this.managers.appUsersManager.resolvePhone(link.phone).then((user) => {
          this.setInnerPeer({
            peerId: user.id.toPeerId(false)
          });
        }).catch((err) => {
          if(err.type === 'PHONE_NOT_OCCUPIED') {
            toastNew({langPackKey: 'Alert.UserDoesntExists'});
          }
        });

        break;
      }

      default: {
        this.log.warn('Not supported internal link:', link);
        break;
      }
    }
  }

  public openUrl(url: string) {
    const {url: wrappedUrl, onclick} = wrapUrl(url);
    const a = document.createElement('a');
    a.href = wrappedUrl;
    
    (window as any)[onclick](a);
  }

  private addAnchorListener<Params extends {pathnameParams?: any, uriParams?: any}>(options: {
    name: 'showMaskedAlert' | 'execBotCommand' | 'searchByHashtag' | 'addstickers' | 'im' |
          'resolve' | 'privatepost' | 'addstickers' | 'voicechat' | 'joinchat' | 'join', 
    protocol?: 'tg',
    callback: (params: Params, element?: HTMLAnchorElement) => boolean | any, 
    noPathnameParams?: boolean,
    noUriParams?: boolean
  }) {
    (window as any)[(options.protocol ? options.protocol + '_' : '') + options.name] = (element?: HTMLAnchorElement/* , e: Event */) => {
      cancelEvent(null);

      const href = element.href;
      let pathnameParams: any[];
      let uriParams: any;

      if(!options.noPathnameParams) pathnameParams = new URL(element.href).pathname.split('/').slice(1);
      if(!options.noUriParams) uriParams = this.parseUriParams(href);

      const res = options.callback({pathnameParams, uriParams} as Params, element);
      return res === undefined ? res : false;
    };
  }

  private parseUriParams(uri: string, splitted = uri.split('?')) {
    const params: any = {};
    if(!splitted[1]) return params;
    splitted[1].split('&').forEach((item) => {
      params[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });

    return params;
  }

  private onHashChange = (saveState?: boolean) => {
    const hash = location.hash;
    if(!saveState) {
      appNavigationController.replaceState();
    }

    const splitted = hash.split('?');
    const params = this.parseUriParams(hash, splitted);
    this.log('hashchange', hash, splitted[0], params);
    if(!hash) {
      return;
    }

    if(params.tgaddr) {
      const {onclick} = wrapUrl(params.tgaddr);
      if(onclick) {
        const a = document.createElement('a');
        a.href = params.tgaddr;
        (window as any)[onclick](a);
      }
      return;
    }

    switch(splitted[0]) {
      default: {
        params.p = splitted[0].slice(1);
      }

      case '#/im': {
        const p: string = params.p;
        let postId = params.post !== undefined ? generateMessageId(+params.post) : undefined;

        switch(p[0]) {
          case '@': {
            this.openUsername({
              userName: p, 
              lastMsgId: postId
            });
            break;
          }

          default: { // peerId
            this.setInnerPeer({
              peerId: postId ? p.toPeerId(true) : p.toPeerId(), 
              lastMsgId: postId
            });
            break;
          }
        }
      }
    }

    //appNavigationController.replaceState();
    //location.hash = '';
  };

  public openUsername(options: {
    userName: string, 
    lastMsgId?: number, 
    threadId?: number, 
    commentId?: number,
    startParam?: string
  }) {
    const {userName, lastMsgId, threadId, commentId, startParam} = options;
    return this.managers.appUsersManager.resolveUsername(userName).then((peer) => {
      const isUser = peer._ === 'user';
      const peerId = peer.id.toPeerId(!isUser);

      if(threadId) {
        return this.openThread(peerId, lastMsgId, threadId);
      } else if(commentId) {
        return this.openComment(peerId, lastMsgId, commentId);
      }
      
      return this.setInnerPeer({
        peerId,
        lastMsgId,
        startParam: startParam
      });
    }, (err) => {
      if(err.type === 'USERNAME_NOT_OCCUPIED') {
        toastNew({langPackKey: 'NoUsernameFound'});
      } else if(err.type === 'USERNAME_INVALID') {
        toastNew({langPackKey: 'Alert.UserDoesntExists'});
      }
    });
  }

  /**
   * Opens thread when peerId of discussion group is known
   */
  public openThread(peerId: PeerId, lastMsgId: number, threadId: number) {
    return this.managers.appMessagesManager.wrapSingleMessage(peerId, threadId).then((message) => {
      // const message: Message = this.managers.appMessagesManager.getMessageByPeer(peerId, threadId);
      if(!message) {
        lastMsgId = undefined;
      } else {
        this.managers.appMessagesManager.generateThreadServiceStartMessage(message);
      }

      return this.setInnerPeer({
        peerId,
        lastMsgId,
        threadId,
        type: 'discussion'
      });
    });
  }

  /**
   * Opens comment directly from original channel
   */
  public openComment(peerId: PeerId, msgId: number, commentId: number) {
    return this.managers.appMessagesManager.getDiscussionMessage(peerId, msgId).then((message) => {
      return this.openThread(message.peerId, commentId, message.mid);
    });
  }

  public async callUser(userId: UserId, type: CallType) {
    const call = callsController.getCallByUserId(userId);
    if(call) {
      return;
    }
    
    const userFull = await this.managers.appProfileManager.getProfile(userId);
    if(userFull.pFlags.phone_calls_private) {
      confirmationPopup({
        descriptionLangKey: 'Call.PrivacyErrorMessage',
        descriptionLangArgs: [new PeerTitle({peerId: userId.toPeerId()}).element],
        button: {
          langKey: 'OK',
          isCancel: true
        }
      });

      return;
    }

    await this.discardCurrentCall(userId.toPeerId());

    callsController.startCallInternal(userId, type === 'video');
  }

  private discardCurrentCall(toPeerId: PeerId, ignoreGroupCall?: GroupCallInstance, ignoreCall?: CallInstance) {
    if(groupCallsController.groupCall && groupCallsController.groupCall !== ignoreGroupCall) return this.discardGroupCallConfirmation(toPeerId);
    else if(callsController.currentCall && callsController.currentCall !== ignoreCall) return this.discardCallConfirmation(toPeerId);
    else return Promise.resolve();
  }

  private async discardCallConfirmation(toPeerId: PeerId) {
    const currentCall = callsController.currentCall;
    if(currentCall) {
      await confirmationPopup({
        titleLangKey: 'Call.Confirm.Discard.Call.Header',
        descriptionLangKey: toPeerId.isUser() ? 'Call.Confirm.Discard.Call.ToCall.Text' : 'Call.Confirm.Discard.Call.ToVoice.Text',
        descriptionLangArgs: [
          new PeerTitle({peerId: currentCall.interlocutorUserId.toPeerId(false)}).element, 
          new PeerTitle({peerId: toPeerId}).element
        ],
        button: {
          langKey: 'OK'
        }
      });

      if(!currentCall.isClosing) {
        await currentCall.hangUp('phoneCallDiscardReasonDisconnect');
      }
    }
  }

  private async discardGroupCallConfirmation(toPeerId: PeerId) {
    const currentGroupCall = groupCallsController.groupCall;
    if(currentGroupCall) {
      await confirmationPopup({
        titleLangKey: 'Call.Confirm.Discard.Voice.Header',
        descriptionLangKey: toPeerId.isUser() ? 'Call.Confirm.Discard.Voice.ToCall.Text' : 'Call.Confirm.Discard.Voice.ToVoice.Text',
        descriptionLangArgs: [
          new PeerTitle({peerId: currentGroupCall.chatId.toPeerId(true)}).element, 
          new PeerTitle({peerId: toPeerId}).element
        ],
        button: {
          langKey: 'OK'
        }
      });

      if(groupCallsController.groupCall === currentGroupCall) {
        await currentGroupCall.hangUp();
      }
    }
  }

  public async joinGroupCall(peerId: PeerId, groupCallId?: GroupCallId) {
    const chatId = peerId.toChatId();
    const hasRights = this.managers.appChatsManager.hasRights(chatId, 'manage_call');
    const next = async() => {
      const chatFull = await this.managers.appProfileManager.getChatFull(chatId);
      let call: MyGroupCall;
      if(!chatFull.call) {
        if(!hasRights) {
          return;
        }
  
        call = await this.managers.appGroupCallsManager.createGroupCall(chatId);
      } else {
        call = chatFull.call;
      }
  
      groupCallsController.joinGroupCall(chatId, call.id, true, false);
    };

    if(groupCallId) {
      const groupCall = await this.managers.appGroupCallsManager.getGroupCallFull(groupCallId);
      if(groupCall._ === 'groupCallDiscarded') {
        if(!hasRights) {
          toastNew({
            langPackKey: 'VoiceChat.Chat.Ended'
          });

          return;
        }

        await confirmationPopup({
          descriptionLangKey: 'VoiceChat.Chat.StartNew',
          button: {
            langKey: 'VoiceChat.Chat.StartNew.OK'
          }
        });
      }
    }

    // await this.discardCurrentCall(peerId);

    next();
  };

  public setCurrentBackground(broadcastEvent = false): ReturnType<AppImManager['setBackground']> {
    const theme = themeController.getTheme();

    if(theme.background.slug) {
      const defaultTheme = STATE_INIT.settings.themes.find((t) => t.name === theme.name);
      // const isDefaultBackground = theme.background.blur === defaultTheme.background.blur && 
        // theme.background.slug === defaultTheme.background.slug;

      // if(!isDefaultBackground) {
        return this.getBackground(theme.background.slug).then((url) => {
          return this.setBackground(url, broadcastEvent);
        }, () => { // * if NO_ENTRY_FOUND
          theme.background = copy(defaultTheme.background); // * reset background
          return this.setCurrentBackground(true);
        });
      // }
    }
    
    return this.setBackground('', broadcastEvent);
  }

  private getBackground(slug: string) {
    if(this.backgroundPromises[slug]) return this.backgroundPromises[slug];
    return this.backgroundPromises[slug] = this.cacheStorage.getFile('backgrounds/' + slug).then((blob) => {
      return URL.createObjectURL(blob);
    });
  }

  public setBackground(url: string, broadcastEvent = true): Promise<void> {
    this.lastBackgroundUrl = url;
    const promises = this.chats.map((chat) => chat.setBackground(url));
    return promises[promises.length - 1].then(() => {
      if(broadcastEvent) {
        rootScope.dispatchEvent('background_change');
      }
    });
  }

  public saveChatPosition(chat: Chat) {
    if(!(['chat', 'discussion'] as ChatType[]).includes(chat.type) || !chat.peerId) {
      return;
    }

    //const bubble = chat.bubbles.getBubbleByPoint('top');
    //if(bubble) {
      //const top = bubble.getBoundingClientRect().top;
      const chatBubbles = chat.bubbles;
      const key = chat.peerId + (chat.threadId ? '_' + chat.threadId : '');
      const chatPositions = stateStorage.getFromCache('chatPositions');
      if(!(chatBubbles.scrollable.getDistanceToEnd() <= 16 && chatBubbles.scrollable.loadedAll.bottom) && chatBubbles.getRenderedLength()) {
        chatBubbles.sliceViewport(true);
        const top = chatBubbles.scrollable.scrollTop;
        
        const position = {
          mids: getObjectKeysAndSort(chatBubbles.bubbles, 'desc').filter((mid) => !chatBubbles.skippedMids.has(mid)),
          top
        };

        chatPositions[key] = position;

        this.log('saved chat position:', position);
      } else {
        delete chatPositions[key];

        this.log('deleted chat position');
      }

      stateStorage.set({chatPositions}, true);
    //}
  }

  public getChatSavedPosition(chat: Chat): ChatSavedPosition {
    if(!(['chat', 'discussion'] as ChatType[]).includes(chat.type) || !chat.peerId) {
      return;
    }
    
    const key = chat.peerId + (chat.threadId ? '_' + chat.threadId : '');
    const cache = stateStorage.getFromCache('chatPositions');
    return cache && cache[key];
  }

  public applyCurrentTheme(slug?: string, backgroundUrl?: string, broadcastEvent?: boolean) {
    if(backgroundUrl) {
      this.backgroundPromises[slug] = Promise.resolve(backgroundUrl);
    }

    themeController.setTheme();
    
    return this.setCurrentBackground(broadcastEvent === undefined ? !!slug : broadcastEvent);
  }

  private setSettings = () => {
    document.documentElement.style.setProperty('--messages-text-size', rootScope.settings.messagesTextSize + 'px');
    
    document.body.classList.toggle('animation-level-0', !rootScope.settings.animationsEnabled);
    document.body.classList.toggle('animation-level-1', false);
    document.body.classList.toggle('animation-level-2', rootScope.settings.animationsEnabled);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      c.append(header, subtitle);

      document.body.classList.add('deactivated');

      popup.addEventListener('close', () => {
        document.body.classList.add('deactivated-backwards');

        singleInstance.activateInstance();

        setTimeout(() => {
          document.body.classList.remove('deactivated', 'deactivated-backwards');
        }, 333);
      });

      popup.show();
    });

    // remove scroll listener when setting chat to tray
    rootScope.addEventListener('chat_changing', ({to}) => {
      this.toggleChatGradientAnimation(to);
    });

    rootScope.addEventListener('service_notification', (update) => {
      confirmationPopup({
        button: {langKey: 'OK', isCancel: true},
        description: RichTextProcessor.wrapRichText(update.message)
      });
    });

    stateStorage.get('chatPositions').then((c) => {
      stateStorage.setToCache('chatPositions', c || {});
    });

    if(IS_CALL_SUPPORTED || IS_GROUP_CALL_SUPPORTED) {
      this.topbarCall = new TopbarCall(appGroupCallsManager, appPeersManager, appChatsManager, appAvatarsManager, appCallsManager);
    }

    if(IS_CALL_SUPPORTED) {
      rootScope.addEventListener('call_instance', ({instance/* , hasCurrent */}) => {
        // if(hasCurrent) {
          // return;
        // }
        
        const popup = new PopupCall({
          appCallsManager,
          appAvatarsManager,
          appPeersManager,
          instance
        });

        instance.addEventListener('acceptCallOverride', () => {
          return this.discardCurrentCall(instance.interlocutorUserId.toPeerId(), undefined, instance)
          .then(() => {
            rootScope.dispatchEvent('call_accepting', instance);
            return true;
          })
          .catch(() => false);
        });

        popup.addEventListener('close', () => {
          const currentCall = appCallsManager.currentCall;
          if(currentCall && currentCall !== instance && !instance.wasTryingToJoin) {
            instance.hangUp('phoneCallDiscardReasonBusy');
          }
        }, {once: true});

        popup.show();
      });

      rootScope.addEventListener('call_incompatible', (userId) => {
        toastNew({
          langPackKey: 'VoipPeerIncompatible', 
          langPackArguments: [
            new PeerTitle({peerId: userId.toPeerId()}).element
          ]
        });
      });
    }

    // ! do not remove this line 
    // ! instance can be deactivated before the UI starts, because it waits in background for RAF that is delayed
    singleInstance.activateInstance();

    const setAuthorized = () => {
      telegramMeWebManager.setAuthorized(true);
    };

    setInterval(setAuthorized, ONE_DAY);
    setAuthorized();

    this.addAnchorListener<{}>({
      name: 'showMaskedAlert', 
      callback: (params, element) => {
        const href = element.href;

        const a = element.cloneNode(true) as HTMLAnchorElement;
        a.className = 'anchor-url';
        a.innerText = href;
        a.removeAttribute('onclick');

        new PopupPeer('popup-masked-url', {
          titleLangKey: 'OpenUrlTitle',
          descriptionLangKey: 'OpenUrlAlert2',
          descriptionLangArgs: [a],
          buttons: [{
            langKey: 'Open',
            callback: () => {
              a.click();
            },
          }]
        }).show();
      }
    });

<<<<<<< HEAD
    this.addAnchorListener<{uriParams: {command: string, bot: string}}>({
      name: 'execBotCommand', 
      callback: ({uriParams}) => {
        const {command, bot} = uriParams;

        /* const promise = bot ? this.openUsername(bot).then(() => this.chat.peerId) : Promise.resolve(this.chat.peerId);
        promise.then(peerId => {
          appMessagesManager.sendText(peerId, '/' + command);
        }); */

        appMessagesManager.sendText(this.chat.peerId, '/' + command + (bot ? '@' + bot : ''));

        //console.log(command, bot);
      }
    });

    this.addAnchorListener<{uriParams: {hashtag: string}}>({
      name: 'searchByHashtag', 
      callback: ({uriParams}) => {
        const {hashtag} = uriParams;
        if(!hashtag) {
          return;
        }

        this.chat.initSearch('#' + hashtag + ' ');
      }
    });

    this.addAnchorListener<{pathnameParams: ['addstickers', string]}>({
      name: 'addstickers', 
      callback: ({pathnameParams}) => {
        const link: InternalLink = {
          _: INTERNAL_LINK_TYPE.STICKER_SET,
          set: pathnameParams[1]
        };

        this.processInternalLink(link);
      }
    });

    // Support old t.me/joinchat/asd and new t.me/+asd
    this.addAnchorListener<{pathnameParams: ['joinchat', string]}>({
      name: 'joinchat', 
      callback: ({pathnameParams}) => {
        const link: InternalLink = {
          _: INTERNAL_LINK_TYPE.JOIN_CHAT,
          invite: pathnameParams[1] || decodeURIComponent(pathnameParams[0]).slice(1)
        };

        this.processInternalLink(link);
      }
    });

    if(IS_GROUP_CALL_SUPPORTED) {
      this.addAnchorListener<{
        uriParams: Omit<InternalLink.InternalLinkVoiceChat, '_'>
      }>({
        name: 'voicechat',
        protocol: 'tg',
        callback: ({uriParams}) => {
          const link = this.makeLink(INTERNAL_LINK_TYPE.VOICE_CHAT, uriParams);
          this.processInternalLink(link);
        }
      });
    }

    this.addAnchorListener<{
    //   pathnameParams: ['c', string, string],
    //   uriParams: {thread?: number}
    // } | {
    //   pathnameParams: [string, string?],
    //   uriParams: {comment?: number}
      pathnameParams: ['c', string, string] | [string, string?],
      uriParams: {thread?: string, comment?: string} | {comment?: string, start?: string}
    }>({
      name: 'im',
      callback: async({pathnameParams, uriParams}) => {
        let link: InternalLink;
        if(RichTextProcessor.PHONE_NUMBER_REG_EXP.test(pathnameParams[0])) {
          link = {
            _: INTERNAL_LINK_TYPE.USER_PHONE_NUMBER,
            phone: pathnameParams[0].slice(1)
          };
        } else if(pathnameParams[0] === 'c') {
          link = {
            _: INTERNAL_LINK_TYPE.PRIVATE_POST,
            channel: pathnameParams[1],
            post: pathnameParams[2],
            thread: 'thread' in uriParams && uriParams.thread,
            comment: uriParams.comment
          };
        } else {
          link = {
            _: INTERNAL_LINK_TYPE.MESSAGE,
            domain: pathnameParams[0],
            post: pathnameParams[1],
            comment: uriParams.comment,
            start: 'start' in uriParams ? uriParams.start : undefined
          };
        }
=======
      this.managers.apiFileManager.setQueueId(this.chat.bubbles.lazyLoadQueue.queueId);
    }, rootScope.settings.animationsEnabled ? 250 : 0, false, true);

    lottieLoader.setLoop(rootScope.settings.stickers.loop);
    animationIntersector.checkAnimations(false);
    
    for(const chat of this.chats) {
      chat.setAutoDownloadMedia();
    }
    
    I18n.setTimeFormat(rootScope.settings.timeFormat);

    this.toggleChatGradientAnimation(this.chat);
  };

  // * не могу использовать тут TransitionSlider, так как мне нужен отрисованный блок рядом 
  // * (или под текущим чатом) чтобы правильно отрендерить чат (напр. scrollTop)
  private chatsSelectTab(tab: HTMLElement, animate?: boolean) {
    if(this.prevTab === tab) {
      return;
    }

    if(animate === false && this.prevTab) { // * will be used for Safari iOS history swipe
      disableTransition([tab, this.prevTab].filter(Boolean));
    }

    if(this.prevTab) {
      this.prevTab.classList.remove('active');
      this.chatsSelectTabDebounced();

      // ! нужно переделать на animation, так как при лаге анимация будет длиться не 250мс
      if(rootScope.settings.animationsEnabled && animate !== false) { 
        dispatchHeavyAnimationEvent(pause(250 + 150), 250 + 150);
      }

      const prevIdx = whichChild(this.prevTab);
      const idx = whichChild(tab);
      if(idx > prevIdx) {
        appNavigationController.pushItem({
          type: 'chat', 
          onPop: (canAnimate) => {
            this.setPeer({}, canAnimate);
            blurActiveElement();
          }
        });
      }
    }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        domain: string,

        // telegrampassport
        scope?: string,
        nonce?: string,
        payload?: string,
        bot_id?: string,
        public_key?: string,
        callback_url?: string,

        // regular
        start?: string,
        startgroup?: string,
        game?: string,
        voicechat?: string,
        post?: string,
        thread?: string,
        comment?: string,
        phone?: string
      }
    }>({
      name: 'resolve',
      protocol: 'tg',
      callback: ({uriParams}) => {
        let link: InternalLink;
        if(uriParams.phone) {
          link = this.makeLink(INTERNAL_LINK_TYPE.USER_PHONE_NUMBER, uriParams as Required<typeof uriParams>);
        } else if(uriParams.domain === 'telegrampassport') {

        } else {
          link = this.makeLink(INTERNAL_LINK_TYPE.MESSAGE, uriParams);
        }

        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        channel: string,
        post: string,
        thread?: string,
        comment?: string
      }
    }>({
      name: 'privatepost',
      protocol: 'tg',
      callback: ({uriParams}) => {
        const link = this.makeLink(INTERNAL_LINK_TYPE.PRIVATE_POST, uriParams);
        this.processInternalLink(link);
      }
    });

    this.addAnchorListener<{
      uriParams: {
        set: string
      }
    }>({
      name: 'addstickers',
      protocol: 'tg',
      callback: ({uriParams}) => {
        const link = this.makeLink(INTERNAL_LINK_TYPE.STICKER_SET, uriParams);
        this.processInternalLink(link);
      }
    });

    ['joinchat' as const, 'join' as const].forEach(name => {
      this.addAnchorListener<{
        uriParams: {
          invite: string
        }
      }>({
        name,
        protocol: 'tg',
        callback: ({uriParams}) => {
          const link = this.makeLink(INTERNAL_LINK_TYPE.JOIN_CHAT, uriParams);
          this.processInternalLink(link);
        }
      });
    });

    this.onHashChange();
    this.attachKeydownListener();
  }

<<<<<<< HEAD
  private deleteFilesIterative(callback: (response: Response) => boolean) {
    return appDownloadManager.cacheStorage.timeoutOperation((cache) => {
      const perf = performance.now();
      return cache.keys().then((requests) => {
        const promises = requests.map((request) => {
          return cache.match(request).then((response) => {
            return callback(response);
          });
        });

        return Promise.all(promises).then((values) => {
          values.map((isBad, idx) => {
            if(!isBad) {
              return;
            }

            const request = requests[idx];
            return cache.delete(request);
          });

          return Promise.all(values.filter(Boolean));
        });
      }).then(() => {
        this.log('deleted files', performance.now() - perf);
      });
    });
  }

  private toggleChatGradientAnimation(activatingChat: Chat) {
    this.chats.forEach(chat => {
      if(chat.gradientRenderer) {
        chat.gradientRenderer.scrollAnimate(rootScope.settings.animationsEnabled && chat === activatingChat);
      }
    });
  }

  private appendEmojiAnimationContainer(screen: ScreenSize) {
    const appendTo = screen === ScreenSize.mobile ? this.columnEl : document.body;
    if(this.emojiAnimationContainer.parentElement !== appendTo) {
      appendTo.append(this.emojiAnimationContainer)
    }
  }

  private attachKeydownListener() {
    const IGNORE_KEYS = new Set(['PageUp', 'PageDown', 'Meta', 'Control']);
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if(rootScope.isOverlayActive || IGNORE_KEYS.has(key)) return;
      
      const target = e.target as HTMLElement;
      
      //if(target.tagName === 'INPUT') return;
      
      //this.log('onkeydown', e, document.activeElement);

      const chat = this.chat;

      if(e.code === 'KeyC' && (e.ctrlKey || e.metaKey) && target.tagName !== 'INPUT') {
        return;
      } else if(e.altKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
        const folder = appMessagesManager.dialogsStorage.getFolderDialogs(rootScope.filterId, true);
        let nextDialog: Dialog.dialog;
        if(!rootScope.peerId) {
          if(key === 'ArrowDown') {
            nextDialog = folder[0];
          }
        } else {
          const idx = folder.findIndex(dialog => dialog.peerId === rootScope.peerId);
          if(idx !== -1) {
            const nextIndex = key === 'ArrowUp' ? idx - 1 : idx + 1;
            nextDialog = folder[nextIndex];
          }
        }
        
        if(nextDialog) {
          this.setPeer({peerId: nextDialog.peerId});
        }
      } else if(key === 'ArrowUp') {
        if(!chat.input.editMsgId && chat.input.isInputEmpty()) {
          const historyStorage = appMessagesManager.getHistoryStorage(chat.peerId, chat.threadId);
          const slice = historyStorage.history.slice;
          if(slice.isEnd(SliceEnd.Bottom) && slice.length) {
            let goodMid: number;
            for(const mid of slice) {
              const message = chat.getMessage(mid);
              const good = this.myId === chat.peerId ? message.fromId === this.myId : message.pFlags.out;

              if(good) {
                if(appMessagesManager.canEditMessage(chat.getMessage(mid), 'text')) {
                  goodMid = mid;
                  break;
                }

                // * this check will allow editing only last message
                //break;
              }
            }
  
            if(goodMid) {
              chat.input.initMessageEditing(goodMid);
              cancelEvent(e); // * prevent from scrolling
            }
          }
        } else {
          return;
        }
      } else if(key === 'ArrowDown') {
        return;
      }
      
      if(
        chat?.input?.messageInput && 
        e.target !== chat.input.messageInput && 
        target.tagName !== 'INPUT' && 
        !target.hasAttribute('contenteditable') && 
        !IS_TOUCH_SUPPORTED && 
        (!mediaSizes.isMobile || this.tabId === 1) && 
        !chat.selection.isSelecting && 
        !chat.input.recording
      ) {
        chat.input.messageInput.focus();
        placeCaretAtEnd(chat.input.messageInput);

        // clone and dispatch same event to new input. it is needed for sending message if input was blurred
        const newEvent = new KeyboardEvent(e.type, e);
        chat.input.messageInput.dispatchEvent(newEvent);
      }
    };
    
    document.body.addEventListener('keydown', onKeyDown);
  }

  private makeLink<T extends INTERNAL_LINK_TYPE>(type: T, uriParams: Omit<InternalLinkTypeMap[T], '_'>) {
    return {
      _: type,
      ...uriParams
    } as any as InternalLinkTypeMap[T];
  }

  public async processInternalLink(link: InternalLink) {
    switch(link?._) {
      case INTERNAL_LINK_TYPE.MESSAGE: {
        const postId = link.post ? appMessagesIdsManager.generateMessageId(+link.post) : undefined;
        const commentId = link.comment ? appMessagesIdsManager.generateMessageId(+link.comment) : undefined;

        this.openUsername({
          userName: link.domain, 
          lastMsgId: postId, 
          commentId,
          startParam: link.start
        });
        break;
      }

      case INTERNAL_LINK_TYPE.PRIVATE_POST: {
        const chatId = link.channel.toChatId();
        const peerId = chatId.toPeerId(true);

        const chat = appChatsManager.getChat(chatId);
        if(chat.deleted) {
          try {
            await appChatsManager.resolveChannel(chatId);
          } catch(err) {
            toastNew({langPackKey: 'LinkNotFound'});
            throw err;
          }
        }

        const postId = appMessagesIdsManager.generateMessageId(+link.post);
        const threadId = link.thread ? appMessagesIdsManager.generateMessageId(+link.thread) : undefined;

        if(threadId) this.openThread(peerId, postId, threadId);
        else this.setInnerPeer({
          peerId,
          lastMsgId: postId,
          threadId
        });
        break;
      }

      case INTERNAL_LINK_TYPE.STICKER_SET: {
        new PopupStickers({id: link.set}).show();
        break;
      }

      case INTERNAL_LINK_TYPE.JOIN_CHAT: {
        apiManager.invokeApi('messages.checkChatInvite', {
          hash: link.invite
        }).then(chatInvite => {
          if((chatInvite as ChatInvite.chatInvitePeek).chat) {
            appChatsManager.saveApiChat((chatInvite as ChatInvite.chatInvitePeek).chat, true);
          }

          // console.log(chatInvite);

          if(chatInvite._ === 'chatInviteAlready' ||
            chatInvite._ === 'chatInvitePeek'/*  && chatInvite.expires > tsNow(true) */) {
            this.setInnerPeer({
              peerId: chatInvite.chat.id.toPeerId(true)
            });
            return;
          }

          new PopupJoinChatInvite(link.invite, chatInvite).show();
        }, (err) => {
          if(err.type === 'INVITE_HASH_EXPIRED') {
            toast(i18n('InviteExpired'));
          }
        });
        break;
      }

      case INTERNAL_LINK_TYPE.VOICE_CHAT: {
        if(IS_GROUP_CALL_SUPPORTED) {
          this.joinGroupCall(link.chat_id.toPeerId(true), link.id);
        }
        
        break;
      }

      case INTERNAL_LINK_TYPE.USER_PHONE_NUMBER: {
        appUsersManager.resolvePhone(link.phone).then(user => {
          this.setInnerPeer({
            peerId: user.id.toPeerId(false)
          });
        }).catch(err => {
          if(err.type === 'PHONE_NOT_OCCUPIED') {
            toastNew({langPackKey: 'Alert.UserDoesntExists'});
          }
        });

        break;
      }

      default: {
        this.log.warn('Not supported internal link:', link);
        break;
      }
    }
  }

  public openUrl(url: string) {
    const {url: wrappedUrl, onclick} = RichTextProcessor.wrapUrl(url);
    const a = document.createElement('a');
    a.href = wrappedUrl;
    
    (window as any)[onclick](a);
  }

  private addAnchorListener<Params extends {pathnameParams?: any, uriParams?: any}>(options: {
    name: 'showMaskedAlert' | 'execBotCommand' | 'searchByHashtag' | 'addstickers' | 'im' |
          'resolve' | 'privatepost' | 'addstickers' | 'voicechat' | 'joinchat' | 'join', 
    protocol?: 'tg',
    callback: (params: Params, element?: HTMLAnchorElement) => boolean | any, 
    noPathnameParams?: boolean,
    noUriParams?: boolean
  }) {
    (window as any)[(options.protocol ? options.protocol + '_' : '') + options.name] = (element?: HTMLAnchorElement/* , e: Event */) => {
      cancelEvent(null);

      const href = element.href;
      let pathnameParams: any[];
      let uriParams: any;

      if(!options.noPathnameParams) pathnameParams = new URL(element.href).pathname.split('/').slice(1);
      if(!options.noUriParams) uriParams = this.parseUriParams(href);

      const res = options.callback({pathnameParams, uriParams} as Params, element);
      return res === undefined ? res : false;
    };
  }

  private parseUriParams(uri: string, splitted = uri.split('?')) {
    const params: any = {};
    if(!splitted[1]) return params;
    splitted[1].split('&').forEach(item => {
      params[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });

    return params;
  }

  private onHashChange = () => {
    const hash = location.hash;
    const splitted = hash.split('?');

    const params = this.parseUriParams(hash, splitted);

    this.log('hashchange', hash, splitted[0], params);

    if(params.tgaddr) {
      appNavigationController.replaceState();
      const {onclick} = RichTextProcessor.wrapUrl(params.tgaddr);
      if(onclick) {
        const a = document.createElement('a');
        a.href = params.tgaddr;
        (window as any)[onclick](a);
      }
      return;
    }

    switch(splitted[0]) {
      case '#/im': {
        const p: string = params.p;
        let postId = params.post !== undefined ? appMessagesIdsManager.generateMessageId(+params.post) : undefined;

        switch(p[0]) {
          case '@': {
            this.openUsername({
              userName: p, 
              lastMsgId: postId
            });
            break;
          }

          default: { // peerId
            this.setInnerPeer({
              peerId: postId ? p.toPeerId(true) : p.toPeerId(), 
              lastMsgId: postId
            });
            break;
          }
        }
      }
    }

    //appNavigationController.replaceState();
    //location.hash = '';
  };

  public openUsername(options: {
    userName: string, 
    lastMsgId?: number, 
    threadId?: number, 
    commentId?: number,
    startParam?: string
  }) {
    const {userName, lastMsgId, threadId, commentId, startParam} = options;
    return appUsersManager.resolveUsername(userName).then(peer => {
      const isUser = peer._ === 'user';
      const peerId = peer.id.toPeerId(!isUser);

      if(threadId) {
        return this.openThread(peerId, lastMsgId, threadId);
      } else if(commentId) {
        return this.openComment(peerId, lastMsgId, commentId);
      }
      
      return this.setInnerPeer({
        peerId,
        lastMsgId,
        startParam: startParam
      });
    }, (err) => {
      if(err.type === 'USERNAME_NOT_OCCUPIED') {
        toastNew({langPackKey: 'NoUsernameFound'});
      } else if(err.type === 'USERNAME_INVALID') {
        toastNew({langPackKey: 'Alert.UserDoesntExists'});
      }
    });
  }

  /**
   * Opens thread when peerId of discussion group is known
   */
  public openThread(peerId: PeerId, lastMsgId: number, threadId: number) {
    return appMessagesManager.wrapSingleMessage(peerId, threadId).then(() => {
      const message: Message = appMessagesManager.getMessageByPeer(peerId, threadId);
      if(message._ === 'messageEmpty') {
        lastMsgId = undefined;
      } else {
        appMessagesManager.generateThreadServiceStartMessage(message);
      }

      return this.setInnerPeer({
        peerId,
        lastMsgId,
        threadId,
        type: 'discussion'
      });
    });
  }

  /**
   * Opens comment directly from original channel
   */
  public openComment(peerId: PeerId, msgId: number, commentId: number) {
    return appMessagesManager.getDiscussionMessage(peerId, msgId).then(message => {
      return this.openThread(message.peerId, commentId, message.mid);
    });
  }

  public async callUser(userId: UserId, type: CallType) {
    const call = appCallsManager.getCallByUserId(userId);
    if(call) {
      return;
    }
    
    const userFull = await appProfileManager.getProfile(userId);
    if(userFull.pFlags.phone_calls_private) {
      confirmationPopup({
        descriptionLangKey: 'Call.PrivacyErrorMessage',
        descriptionLangArgs: [new PeerTitle({peerId: userId.toPeerId()}).element],
        button: {
          langKey: 'OK',
          isCancel: true
        }
      });

      return;
    }

    await this.discardCurrentCall(userId.toPeerId());

    appCallsManager.startCallInternal(userId, type === 'video');
  }

  private discardCurrentCall(toPeerId: PeerId, ignoreGroupCall?: GroupCallInstance, ignoreCall?: CallInstance) {
    if(appGroupCallsManager.groupCall && appGroupCallsManager.groupCall !== ignoreGroupCall) return this.discardGroupCallConfirmation(toPeerId);
    else if(appCallsManager.currentCall && appCallsManager.currentCall !== ignoreCall) return this.discardCallConfirmation(toPeerId);
    else return Promise.resolve();
  }

  private async discardCallConfirmation(toPeerId: PeerId) {
    const currentCall = appCallsManager.currentCall;
    if(currentCall) {
      await confirmationPopup({
        titleLangKey: 'Call.Confirm.Discard.Call.Header',
        descriptionLangKey: toPeerId.isUser() ? 'Call.Confirm.Discard.Call.ToCall.Text' : 'Call.Confirm.Discard.Call.ToVoice.Text',
        descriptionLangArgs: [
          new PeerTitle({peerId: currentCall.interlocutorUserId.toPeerId(false)}).element, 
          new PeerTitle({peerId: toPeerId}).element
        ],
        button: {
          langKey: 'OK'
        }
      });

      if(!currentCall.isClosing) {
        await currentCall.hangUp('phoneCallDiscardReasonDisconnect');
      }
    }
  }

  private async discardGroupCallConfirmation(toPeerId: PeerId) {
    const currentGroupCall = appGroupCallsManager.groupCall;
    if(currentGroupCall) {
      await confirmationPopup({
        titleLangKey: 'Call.Confirm.Discard.Voice.Header',
        descriptionLangKey: toPeerId.isUser() ? 'Call.Confirm.Discard.Voice.ToCall.Text' : 'Call.Confirm.Discard.Voice.ToVoice.Text',
        descriptionLangArgs: [
          new PeerTitle({peerId: currentGroupCall.chatId.toPeerId(true)}).element, 
          new PeerTitle({peerId: toPeerId}).element
        ],
        button: {
          langKey: 'OK'
        }
      });

      if(appGroupCallsManager.groupCall === currentGroupCall) {
        await currentGroupCall.hangUp();
      }
    }
  }

  public async joinGroupCall(peerId: PeerId, groupCallId?: GroupCallId) {
    const chatId = peerId.toChatId();
    const hasRights = appChatsManager.hasRights(chatId, 'manage_call');
    const next = async() => {
      const chatFull = await appProfileManager.getChatFull(chatId);
      let call: MyGroupCall;
      if(!chatFull.call) {
        if(!hasRights) {
          return;
        }
  
        call = await appGroupCallsManager.createGroupCall(chatId);
      } else {
        call = appGroupCallsManager.saveGroupCall(chatFull.call, chatId);
      }
  
      appGroupCallsManager.joinGroupCall(chatId, call.id, true, false);
    };

    if(groupCallId) {
      const groupCall = await appGroupCallsManager.getGroupCallFull(groupCallId);
      if(groupCall._ === 'groupCallDiscarded') {
        if(!hasRights) {
          toastNew({
            langPackKey: 'VoiceChat.Chat.Ended'
          });

          return;
        }

        await confirmationPopup({
          descriptionLangKey: 'VoiceChat.Chat.StartNew',
          button: {
            langKey: 'VoiceChat.Chat.StartNew.OK'
          }
        });
      }
    }

    await this.discardCurrentCall(peerId);

    next();
  };

  public setCurrentBackground(broadcastEvent = false): ReturnType<AppImManager['setBackground']> {
    const theme = rootScope.getTheme();

    if(theme.background.slug) {
      const defaultTheme = AppStateManager.STATE_INIT.settings.themes.find(t => t.name === theme.name);
      // const isDefaultBackground = theme.background.blur === defaultTheme.background.blur && 
        // theme.background.slug === defaultTheme.background.slug;

      // if(!isDefaultBackground) {
        return this.getBackground(theme.background.slug).then((url) => {
          return this.setBackground(url, broadcastEvent);
        }, () => { // * if NO_ENTRY_FOUND
          theme.background = copy(defaultTheme.background); // * reset background
          return this.setCurrentBackground(true);
        });
      // }
    }
    
    return this.setBackground('', broadcastEvent);
  }

  private getBackground(slug: string) {
    if(this.backgroundPromises[slug]) return this.backgroundPromises[slug];
    return this.backgroundPromises[slug] = appDownloadManager.cacheStorage.getFile('backgrounds/' + slug).then(blob => {
      return URL.createObjectURL(blob);
    });
  }

  public setBackground(url: string, broadcastEvent = true): Promise<void> {
    this.lastBackgroundUrl = url;
    const promises = this.chats.map(chat => chat.setBackground(url));
    return promises[promises.length - 1].then(() => {
      if(broadcastEvent) {
        rootScope.dispatchEvent('background_change');
      }
    });
  }

  public saveChatPosition(chat: Chat) {
    if(!(['chat', 'discussion'] as ChatType[]).includes(chat.type) || !chat.peerId) {
      return;
    }

    //const bubble = chat.bubbles.getBubbleByPoint('top');
    //if(bubble) {
      //const top = bubble.getBoundingClientRect().top;
      const chatBubbles = chat.bubbles;
      const key = chat.peerId + (chat.threadId ? '_' + chat.threadId : '');
      const chatPositions = stateStorage.getFromCache('chatPositions');
      if(!(chatBubbles.scrollable.getDistanceToEnd() <= 16 && chatBubbles.scrollable.loadedAll.bottom) && chatBubbles.getRenderedLength()) {
        chatBubbles.sliceViewport(true);
        const top = chatBubbles.scrollable.scrollTop;
        
        const position = {
          mids: getObjectKeysAndSort(chatBubbles.bubbles, 'desc').filter(mid => !chatBubbles.skippedMids.has(mid)),
          top
        };

        chatPositions[key] = position;

        this.log('saved chat position:', position);
      } else {
        delete chatPositions[key];

        this.log('deleted chat position');
      }

      stateStorage.set({chatPositions}, true);
    //}
  }

  public getChatSavedPosition(chat: Chat): ChatSavedPosition {
    if(!(['chat', 'discussion'] as ChatType[]).includes(chat.type) || !chat.peerId) {
      return;
    }
    
    const key = chat.peerId + (chat.threadId ? '_' + chat.threadId : '');
    const cache = stateStorage.getFromCache('chatPositions');
    return cache && cache[key];
  }

  public applyHighlightningColor() {
    let hsla: string;
    const theme = rootScope.getTheme();
    if(theme.background.highlightningColor) {
      hsla = theme.background.highlightningColor;
      document.documentElement.style.setProperty('--message-highlightning-color', hsla);
    } else {
      document.documentElement.style.removeProperty('--message-highlightning-color');
    }

    if(!IS_TOUCH_SUPPORTED && hsla) {
      rootScope.themeColor = hslaStringToHex(hsla);
    }
  }

  public applyCurrentTheme(slug?: string, backgroundUrl?: string, broadcastEvent?: boolean) {
    this.applyHighlightningColor();

    rootScope.setTheme();

    if(backgroundUrl) {
      this.backgroundPromises[slug] = Promise.resolve(backgroundUrl);
    }
    
    return this.setCurrentBackground(broadcastEvent === undefined ? !!slug : broadcastEvent);
  }

  private setSettings = () => {
    document.documentElement.style.setProperty('--messages-text-size', rootScope.settings.messagesTextSize + 'px');
    
    document.body.classList.toggle('animation-level-0', !rootScope.settings.animationsEnabled);
    document.body.classList.toggle('animation-level-1', false);
    document.body.classList.toggle('animation-level-2', rootScope.settings.animationsEnabled);

    this.chatsSelectTabDebounced = debounce(() => {
      const topbar = this.chat.topbar;
      if(topbar.pinnedMessage) { // * буду молиться богам, чтобы это ничего не сломало, но это исправляет получение пиннеда после анимации
        topbar.pinnedMessage.setCorrectIndex(0);
      }

      apiManager.setQueueId(this.chat.bubbles.lazyLoadQueue.queueId);
    }, rootScope.settings.animationsEnabled ? 250 : 0, false, true);

    lottieLoader.setLoop(rootScope.settings.stickers.loop);
    animationIntersector.checkAnimations(false);
    
    for(const chat of this.chats) {
      chat.setAutoDownloadMedia();
    }
    
    I18n.setTimeFormat(rootScope.settings.timeFormat);

    this.toggleChatGradientAnimation(this.chat);
  };

  // * не могу использовать тут TransitionSlider, так как мне нужен отрисованный блок рядом 
  // * (или под текущим чатом) чтобы правильно отрендерить чат (напр. scrollTop)
  private chatsSelectTab(tab: HTMLElement, animate?: boolean) {
    if(this.prevTab === tab) {
      return;
    }

    if(animate === false && this.prevTab) { // * will be used for Safari iOS history swipe
      disableTransition([tab, this.prevTab].filter(Boolean));
    }

    if(this.prevTab) {
      this.prevTab.classList.remove('active');
      this.chatsSelectTabDebounced();

      // ! нужно переделать на animation, так как при лаге анимация будет длиться не 250мс
      if(rootScope.settings.animationsEnabled && animate !== false) { 
        dispatchHeavyAnimationEvent(pause(250 + 150), 250 + 150);
      }

      const prevIdx = whichChild(this.prevTab);
      const idx = whichChild(tab);
      if(idx > prevIdx) {
        appNavigationController.pushItem({
          type: 'chat', 
          onPop: (canAnimate) => {
            this.setPeer({}, canAnimate);
            blurActiveElement();
          }
        });
      }
    }

    tab.classList.add('active');
    this.prevTab = tab;
  }

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private init() {
    document.addEventListener('paste', this.onDocumentPaste, true);
    
    if(!IS_TOUCH_SUPPORTED) {
      this.attachDragAndDropListeners();
    }

    //if(!isTouchSupported) {
      this.markupTooltip = new MarkupTooltip(this);
      this.markupTooltip.handleSelection();
    //}
  }

  private attachDragAndDropListeners() {
    const drops: ChatDragAndDrop[] = [];
    const mediaDrops: ChatDragAndDrop[] = [];
    let mounted = false;
    const toggle = async(e: DragEvent, mount: boolean) => {
      if(mount === mounted) return;

      const _types = e.dataTransfer.types;
      // @ts-ignore
      const isFiles = _types.contains ? _types.contains('Files') : _types.indexOf('Files') >= 0;

      const newMediaPopup = getCurrentNewMediaPopup();
<<<<<<< HEAD
      if(!isFiles || (!this.canDrag() && !newMediaPopup)) { // * skip dragging text case
=======
      const types: string[] = await getFilesFromEvent(e, true);
      if(!isFiles || (!(await this.canDrag()) && !newMediaPopup)) { // * skip dragging text case
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        counter = 0;
        return;
      }

      const _dropsContainer = newMediaPopup ? mediaDropsContainer : dropsContainer;
      const _drops = newMediaPopup ? mediaDrops : drops;

      if(mount && !_drops.length) {
<<<<<<< HEAD
        const types: string[] = await getFilesFromEvent(e, true);
        const force = isFiles && !types.length; // * can't get file items not from 'drop' on Safari
        
        const foundMedia = types.filter(t => MEDIA_MIME_TYPES_SUPPORTED.has(t)).length;
=======
        const force = isFiles && !types.length; // * can't get file items not from 'drop' on Safari
        
        const foundMedia = types.filter((t) => MEDIA_MIME_TYPES_SUPPORTED.has(t)).length;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        // const foundDocuments = types.length - foundMedia;
  
        this.log('drag files', types);

        if(newMediaPopup) {
          newMediaPopup.appendDrops(_dropsContainer);

          if(types.length || force) {
            _drops.push(new ChatDragAndDrop(_dropsContainer, {
              header: 'Preview.Dragging.AddItems',
              headerArgs: [types.length],
              onDrop: (e: DragEvent) => {
                toggle(e, false);
<<<<<<< HEAD
                appImManager.log('drop', e);
                appImManager.onDocumentPaste(e, 'document');
=======
                this.log('drop', e);
                this.onDocumentPaste(e, 'document');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              }
            }));
          }
        } else {
          if(types.length || force) {
            _drops.push(new ChatDragAndDrop(_dropsContainer, {
              icon: 'dragfiles',
              header: 'Chat.DropTitle',
              subtitle: 'Chat.DropAsFilesDesc',
              onDrop: (e: DragEvent) => {
                toggle(e, false);
<<<<<<< HEAD
                appImManager.log('drop', e);
                appImManager.onDocumentPaste(e, 'document');
=======
                this.log('drop', e);
                this.onDocumentPaste(e, 'document');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              }
            }));
          }
    
          // if((foundMedia && !foundDocuments) || force) {
          if(foundMedia || force) {
            _drops.push(new ChatDragAndDrop(_dropsContainer, {
              icon: 'dragmedia',
              header: 'Chat.DropTitle',
              subtitle: 'Chat.DropQuickDesc',
              onDrop: (e: DragEvent) => {
                toggle(e, false);
<<<<<<< HEAD
                appImManager.log('drop', e);
                appImManager.onDocumentPaste(e, 'media');
=======
                this.log('drop', e);
                this.onDocumentPaste(e, 'media');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              }
            }));
          }

          this.chat.container.append(_dropsContainer);
        }
      }

      //if(!mount) return;

      SetTransition(_dropsContainer, 'is-visible', mount, 200, () => {
        if(!mount) {
<<<<<<< HEAD
          _drops.forEach(drop => {
=======
          _drops.forEach((drop) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            drop.destroy();
          });

          _drops.length = 0;
        }
      });

      if(mount) {
<<<<<<< HEAD
        _drops.forEach(drop => {
=======
        _drops.forEach((drop) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          drop.setPath();
        });
      } else {
        counter = 0;
      }

      document.body.classList.toggle('is-dragging', mount);
      mounted = mount;
    };

    /* document.body.addEventListener('dragover', (e) => {
      cancelEvent(e);
    }); */

    let counter = 0;
    document.body.addEventListener('dragenter', (e) => {
      counter++;
    });

    document.body.addEventListener('dragover', (e) => {
      //this.log('dragover', e/* , e.dataTransfer.types[0] */);
      toggle(e, true);
      cancelEvent(e);
    });

    document.body.addEventListener('dragleave', (e) => {
      //this.log('dragleave', e, counter);
      //if((e.pageX <= 0 || e.pageX >= this.managers.appPhotosManager.windowW) || (e.pageY <= 0 || e.pageY >= this.managers.appPhotosManager.windowH)) {
      counter--;
      if(counter === 0) { 
      //if(!findUpClassName(e.target, 'drops-container')) {
        toggle(e, false);
      }
    });

    const dropsContainer = document.createElement('div');
    dropsContainer.classList.add('drops-container');

    const mediaDropsContainer = dropsContainer.cloneNode(true) as HTMLElement;
  }

<<<<<<< HEAD
  private canDrag() {
    const chat = this.chat;
    const peerId = chat?.peerId;
    return !(!peerId || rootScope.isOverlayActive || !chat.canSend('send_media'));
  }

  private onDocumentPaste = (e: ClipboardEvent | DragEvent, attachType?: 'media' | 'document') => {
    const newMediaPopup = getCurrentNewMediaPopup();
    if(!this.canDrag() && !newMediaPopup) return;
=======
  private async canDrag() {
    const chat = this.chat;
    const peerId = chat?.peerId;
    return !(!peerId || overlayCounter.isOverlayActive || !(await chat.canSend('send_media')));
  }

  private onDocumentPaste = async(e: ClipboardEvent | DragEvent, attachType?: 'media' | 'document') => {
    const newMediaPopup = getCurrentNewMediaPopup();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    //console.log('document paste');
    //console.log('item', event.clipboardData.getData());

    if(e instanceof DragEvent) {
      const _types = e.dataTransfer.types;
      // @ts-ignore
      const isFiles = _types.contains ? _types.contains('Files') : _types.indexOf('Files') >= 0;
      if(isFiles) {
        cancelEvent(e);
      }
    }
    
<<<<<<< HEAD
    getFilesFromEvent(e).then((files: File[]) => {
      if(files.length) {
        if(newMediaPopup) {
          newMediaPopup.addFiles(files);
          return;
        }
    
        const chatInput = this.chat.input;
        chatInput.willAttachType = attachType || (MEDIA_MIME_TYPES_SUPPORTED.has(files[0].type) ? 'media' : 'document');
        new PopupNewMedia(this.chat, files, chatInput.willAttachType);
=======
    const files = await getFilesFromEvent(e);
    if(!(await this.canDrag()) && !newMediaPopup) return;
    if(files.length) {
      if(newMediaPopup) {
        newMediaPopup.addFiles(files);
        return;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
  
      const chatInput = this.chat.input;
      chatInput.willAttachType = attachType || (MEDIA_MIME_TYPES_SUPPORTED.has(files[0].type) ? 'media' : 'document');
      PopupElement.createPopup(PopupNewMedia, this.chat, files, chatInput.willAttachType);
    }
  };

<<<<<<< HEAD
=======
  private async overrideHash(peerId?: PeerId) {
    let str: string;
    if(peerId) {
      const username = await this.managers.appPeersManager.getPeerUsername(peerId);
      str = username ? '@' + username : '' + peerId;
    }

    appNavigationController.overrideHash(str);
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public selectTab(id: number, animate?: boolean) {
    if(animate === false) { // * will be used for Safari iOS history swipe
      disableTransition([appSidebarLeft.sidebarEl, this.columnEl, appSidebarRight.sidebarEl]);
    }

    document.body.classList.toggle(LEFT_COLUMN_ACTIVE_CLASSNAME, id === 0);

    const prevTabId = this.tabId;
<<<<<<< HEAD
=======
    if(prevTabId !== -1) {
      this.overrideHash(id > 0 ? this.chat?.peerId : undefined);
    }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    this.log('selectTab', id, prevTabId);

    let animationPromise: Promise<any> = rootScope.settings.animationsEnabled ? doubleRaf() : Promise.resolve();
<<<<<<< HEAD
    if(prevTabId !== -1 && prevTabId !== id && rootScope.settings.animationsEnabled && animate !== false) {
=======
    if(prevTabId !== -1 && prevTabId !== id && rootScope.settings.animationsEnabled && animate !== false && mediaSizes.activeScreen !== ScreenSize.large) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const transitionTime = (mediaSizes.isMobile ? 250 : 200) + 100; // * cause transition time could be > 250ms
      animationPromise = pause(transitionTime);
      dispatchHeavyAnimationEvent(animationPromise, transitionTime);

      // ! it's very heavy operation. will blink in firefox
      /* this.columnEl.classList.add('disable-hover');
      animationPromise.finally(() => {
        this.columnEl.classList.remove('disable-hover');
      }); */
    }

    this.tabId = id;
    blurActiveElement();
    if(mediaSizes.isMobile && prevTabId === 2 && id < 2) {
      document.body.classList.remove(RIGHT_COLUMN_ACTIVE_CLASSNAME);
    }

    if(prevTabId !== -1 && id > prevTabId) {
      if(id < 2 || !appNavigationController.findItemByType('im')) {
        appNavigationController.pushItem({
          type: 'im', 
          onPop: (canAnimate) => {
            //this.selectTab(prevTabId, !isSafari);
            this.setPeer({}, canAnimate);
          }
        });
      }
    }

<<<<<<< HEAD
    rootScope.dispatchEvent('im_tab_change', id);
=======
    const onImTabChange = (window as any).onImTabChange;
    onImTabChange && onImTabChange(id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    //this._selectTab(id, mediaSizes.isMobile);
    //document.body.classList.toggle(RIGHT_COLUMN_ACTIVE_CLASSNAME, id === 2);

    return animationPromise;
  }
  
  public updateStatus() {
<<<<<<< HEAD
    if(!this.myId) return Promise.resolve();
    
    appUsersManager.setUserStatus(this.myId, this.offline);
    return apiManager.invokeApiSingle('account.updateStatus', {offline: this.offline});
  }

  private createNewChat() {
    const chat = new Chat(this, 
      appChatsManager, 
      appDocsManager, 
      appInlineBotsManager, 
      appMessagesManager, 
      appPeersManager, 
      appPhotosManager, 
      appProfileManager, 
      appStickersManager, 
      appUsersManager, 
      appWebPagesManager, 
      appPollsManager, 
      apiManager, 
      appDraftsManager, 
      serverTimeManager, 
      stateStorage, 
      appNotificationsManager, 
      appEmojiManager,
      appMessagesIdsManager,
      appGroupCallsManager,
      appReactionsManager
=======
    return this.managers.appUsersManager.updateMyOnlineStatus(this.offline);
  }

  private createNewChat() {
    const chat = new Chat(
      this, 
      this.managers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    );

    if(this.chats.length) {
      chat.setBackground(this.lastBackgroundUrl, true);
    }

    this.chats.push(chat);

    return chat;
  }

  private spliceChats(fromIndex: number, justReturn = true, animate?: boolean, spliced?: Chat[]) {
    if(fromIndex >= this.chats.length) return;

    const chatFrom = this.chat;
    if(this.chats.length > 1 && justReturn) {
<<<<<<< HEAD
      rootScope.dispatchEvent('peer_changing', this.chat);
=======
      this.dispatchEvent('peer_changing', this.chat);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    if(!spliced) {
      spliced = this.chats.splice(fromIndex, this.chats.length - fromIndex);
    }

<<<<<<< HEAD
    rootScope.dispatchEvent('chat_changing', {from: chatFrom, to: this.chat});
=======
    const chatTo = this.chat;
    this.dispatchEvent('chat_changing', {from: chatFrom, to: chatTo});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    // * -1 because one item is being sliced when closing the chat by calling .removeByType
    for(let i = 0; i < spliced.length - 1; ++i) {
      appNavigationController.removeByType('chat', true);
    }

    // * fix middle chat z-index on animation
    if(spliced.length > 1) {
      spliced.slice(0, -1).forEach((chat) => {
        chat.container.remove();
      });
    }

<<<<<<< HEAD
    this.chatsSelectTab(this.chat.container, animate);

    if(justReturn) {
      rootScope.dispatchEvent('peer_changed', this.chat.peerId);
=======
    this.chatsSelectTab(chatTo.container, animate);

    if(justReturn) {
      this.dispatchEvent('peer_changed', chatTo.peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      const searchTab = appSidebarRight.getTab(AppPrivateSearchTab);
      if(searchTab) {
        searchTab.close();
      }
<<<<<<< HEAD
  
      const isSet = appSidebarRight.sharedMediaTab.setPeer(this.chat.peerId, this.chat.threadId);
      if(isSet) {
        appSidebarRight.sharedMediaTab.loadSidebarMedia(true);
        appSidebarRight.sharedMediaTab.fillProfileElements();
      }
      
      /* setTimeout(() => {
        appSidebarRight.sharedMediaTab.loadSidebarMedia(false);
      }); */
    }

    spliced.forEach(chat => {
=======

      appSidebarRight.replaceSharedMediaTab(chatTo.sharedMediaTab);
    }

    spliced.forEach((chat) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      chat.beforeDestroy();
    });
    
    setTimeout(() => {
      //chat.setPeer(0);
      spliced.forEach((chat) => {
        chat.destroy();
      });
    }, 250 + 100);
  }

<<<<<<< HEAD
  public setPeer(options: ChatSetPeerOptions = {}, animate?: boolean): boolean {
=======
  public async setPeer(options: ChatSetPeerOptions = {}, animate?: boolean): Promise<boolean> {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(this.init) {
      this.init();
      this.init = null;
    }

    options.peerId ??= NULL_PEER_ID;

    const {peerId, lastMsgId} = options;

    const chat = this.chat;
    const chatIndex = this.chats.indexOf(chat);

    if(!peerId) {
      if(chatIndex > 0) {
        this.spliceChats(chatIndex, undefined, animate);
        return;
      } else if(mediaSizes.activeScreen === ScreenSize.medium) { // * floating sidebar case
        this.selectTab(+!this.tabId, animate);
        return;
      }
    } else if(chatIndex > 0 && chat.peerId && chat.peerId !== peerId) {
      // const firstChat = this.chats[0];
      // if(firstChat.peerId !== chat.peerId) {
        /* // * slice idx > 0, set background and slice first, so new one will be the first
        const spliced = this.chats.splice(1, this.chats.length - 1);
        this.createNewChat();
        this.chats.splice(0, 1); */
        const spliced = this.chats.splice(1, this.chats.length - 1);
        if(this.chat.peerId === peerId) {
          this.spliceChats(0, true, true, spliced);
          return;
        } else {
          const ret = this.setPeer(options);
          this.spliceChats(0, false, false, spliced);
          return ret;
        }
      // } else {
      //   this.spliceChats(1, false, animate);
      // }

      //return ret;
    }

    // * don't reset peer if returning
    if(peerId === chat.peerId && mediaSizes.activeScreen <= ScreenSize.medium && document.body.classList.contains(LEFT_COLUMN_ACTIVE_CLASSNAME)) {
      this.selectTab(1, animate);
      return false;
    }

    if(peerId || mediaSizes.activeScreen !== ScreenSize.mobile) {
<<<<<<< HEAD
      const result = chat.setPeer(peerId, lastMsgId, options.startParam);
=======
      const result = await chat.setPeer(peerId, lastMsgId, options.startParam);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      // * wait for cached render
      const promise = result?.cached ? result.promise : Promise.resolve();
      if(peerId) {
        Promise.all([
          promise,
          chat.setBackgroundPromise
        ]).then(() => {
          //window.requestAnimationFrame(() => {
          setTimeout(() => { // * setTimeout is better here
            setTimeout(() => {
              this.chatsSelectTab(this.chat.container);
            }, 0);
            this.selectTab(1, animate);
          }, 0);
        });
      }
    }

    if(!peerId) {
      this.selectTab(0, animate);
      return false;
    }
  }

  public setInnerPeer(options: ChatSetInnerPeerOptions) {
    const {peerId} = options;
    if(peerId === NULL_PEER_ID || !peerId) {
      return;
    }

<<<<<<< HEAD
    const type = options.type ??= 'chat';

    // * prevent opening already opened peer
    const existingIndex = this.chats.findIndex(chat => chat.peerId === peerId && chat.type === type);
=======
    if(options.threadId) {
      options.type = 'discussion';
    }

    const type = options.type ??= 'chat';

    // * prevent opening already opened peer
    const existingIndex = this.chats.findIndex((chat) => chat.peerId === peerId && chat.type === type);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(existingIndex !== -1) {
      this.spliceChats(existingIndex + 1);
      return this.setPeer(options);
    }

    const oldChat = this.chat;
    let chat = oldChat;
    if(oldChat.inited) { // * use first not inited chat
      chat = this.createNewChat();
    }

    if(type) {
      chat.setType(type);

      if(options.threadId) {
        chat.threadId = options.threadId;
      }
    }

<<<<<<< HEAD
    rootScope.dispatchEvent('chat_changing', {from: oldChat, to: chat});
=======
    this.dispatchEvent('chat_changing', {from: oldChat, to: chat});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    //this.chatsSelectTab(chat.container);

    return this.setPeer(options);
  }

  public openScheduled(peerId: PeerId) {
    this.setInnerPeer({
      peerId, 
      type: 'scheduled'
    });
  }

  private getTypingElement(action: SendMessageAction) {
    const el = document.createElement('span');
    let c = 'peer-typing';
    el.classList.add(c);
    el.dataset.action = action._;
    switch(action._) {
      case 'sendMessageTypingAction': {
      //default: {
        c += '-text';
        for(let i = 0; i < 3; ++i) {
          const dot = document.createElement('span');
          dot.className = c + '-dot';
          el.append(dot);
        }
        break;
      }

      case 'sendMessageUploadAudioAction':
      case 'sendMessageUploadDocumentAction':
      case 'sendMessageUploadRoundAction':
      case 'sendMessageUploadVideoAction':
      case 'sendMessageUploadPhotoAction': {
        c += '-upload';
        /* const trail = document.createElement('span');
        trail.className = c + '-trail';
        el.append(trail); */
        break;
      }

      case 'sendMessageRecordAudioAction':
      case 'sendMessageRecordRoundAction':
      case 'sendMessageRecordVideoAction': {
        c += '-record';
        break;
      }
<<<<<<< HEAD

      case 'sendMessageEmojiInteractionSeen':
      case 'sendMessageChooseStickerAction': {
        c += '-choosing-sticker';
        for(let i = 0; i < 2; ++i) {
          const eye = document.createElement('div');
          eye.className = c + '-eye';
          el.append(eye);
        }
        break;
      }
    }

    el.classList.add(c);

    return el;
  }

  public getPeerTyping(peerId: PeerId, container?: HTMLElement) {
    if(!appUsersManager.isBot(peerId)) {
      const typings = appProfileManager.getPeerTypings(peerId);
      if(!typings || !typings.length) {
        return;
      }

      const typing = typings[0];

      const langPackKeys: {
        [peerType in 'private' | 'chat' | 'multi']?: Partial<{[action in SendMessageAction['_']]: LangPackKey}>
      } = {
        private: {
          'sendMessageTypingAction': 'Peer.Activity.User.TypingText',
          'sendMessageUploadAudioAction': 'Peer.Activity.User.SendingFile',
          'sendMessageUploadDocumentAction': 'Peer.Activity.User.SendingFile',
          'sendMessageUploadPhotoAction': 'Peer.Activity.User.SendingPhoto',
          'sendMessageUploadVideoAction': 'Peer.Activity.User.SendingVideo',
          'sendMessageUploadRoundAction': 'Peer.Activity.User.SendingVideo',
          'sendMessageRecordVideoAction': 'Peer.Activity.User.RecordingVideo',
          'sendMessageRecordAudioAction': 'Peer.Activity.User.RecordingAudio',
          'sendMessageRecordRoundAction': 'Peer.Activity.User.RecordingVideo',
          'sendMessageGamePlayAction': 'Peer.Activity.User.PlayingGame',
          'sendMessageChooseStickerAction': 'Peer.Activity.User.ChoosingSticker',
          'sendMessageEmojiInteractionSeen': 'Peer.Activity.User.EnjoyingAnimations'
        },
        chat: {
          'sendMessageTypingAction': 'Peer.Activity.Chat.TypingText',
          'sendMessageUploadAudioAction': 'Peer.Activity.Chat.SendingFile',
          'sendMessageUploadDocumentAction': 'Peer.Activity.Chat.SendingFile',
          'sendMessageUploadPhotoAction': 'Peer.Activity.Chat.SendingPhoto',
          'sendMessageUploadVideoAction': 'Peer.Activity.Chat.SendingVideo',
          'sendMessageUploadRoundAction': 'Peer.Activity.Chat.SendingVideo',
          'sendMessageRecordVideoAction': 'Peer.Activity.Chat.RecordingVideo',
          'sendMessageRecordAudioAction': 'Peer.Activity.Chat.RecordingAudio',
          'sendMessageRecordRoundAction': 'Peer.Activity.Chat.RecordingVideo',
          'sendMessageGamePlayAction': 'Peer.Activity.Chat.PlayingGame',
          'sendMessageChooseStickerAction': 'Peer.Activity.Chat.ChoosingSticker',
          'sendMessageEmojiInteractionSeen': 'Peer.Activity.Chat.EnjoyingAnimations'
        },
        multi: {
          'sendMessageTypingAction': 'Peer.Activity.Chat.Multi.TypingText1',
          'sendMessageUploadAudioAction': 'Peer.Activity.Chat.Multi.SendingFile1',
          'sendMessageUploadDocumentAction': 'Peer.Activity.Chat.Multi.SendingFile1',
          'sendMessageUploadPhotoAction': 'Peer.Activity.Chat.Multi.SendingPhoto1',
          'sendMessageUploadVideoAction': 'Peer.Activity.Chat.Multi.SendingVideo1',
          'sendMessageUploadRoundAction': 'Peer.Activity.Chat.Multi.SendingVideo1',
          'sendMessageRecordVideoAction': 'Peer.Activity.Chat.Multi.RecordingVideo1',
          'sendMessageRecordAudioAction': 'Peer.Activity.Chat.Multi.RecordingAudio1',
          'sendMessageRecordRoundAction': 'Peer.Activity.Chat.Multi.RecordingVideo1',
          'sendMessageGamePlayAction': 'Peer.Activity.Chat.Multi.PlayingGame1',
          'sendMessageChooseStickerAction': 'Peer.Activity.Chat.Multi.ChoosingSticker1'
        }
      };

      const mapa = peerId.isUser() ? langPackKeys.private : (typings.length > 1 ? langPackKeys.multi : langPackKeys.chat);
      let action = typing.action;

      if(typings.length > 1) {
        const s: any = {};
        typings.forEach(typing => {
          const type = typing.action._;
          if(s[type] === undefined) s[type] = 0;
          ++s[type];
        });

        if(Object.keys(s).length > 1) {
          action = {
            _: 'sendMessageTypingAction'
          };
        }
      }

      const langPackKey = mapa[action._];
      if(!langPackKey) {
        return;
      }

      if(!container) {
        container = document.createElement('span');
        container.classList.add('online', 'peer-typing-container');
      }

      container.classList.toggle('peer-typing-flex', action._ === 'sendMessageChooseStickerAction' || action._ === 'sendMessageEmojiInteractionSeen');

      let typingElement = container.firstElementChild as HTMLElement;
      if(!typingElement) {
        typingElement = this.getTypingElement(action);
        container.prepend(typingElement);
      } else {
        if(typingElement.dataset.action !== action._) {
          typingElement.replaceWith(this.getTypingElement(action));
        }
      }

      let args: any[];
      if(peerId.isAnyChat()) {
        args = [
          new PeerTitle({peerId: typing.userId.toPeerId(false), onlyFirstName: true}).element,
          typings.length - 1
        ];
      }

      if(action._ === 'sendMessageEmojiInteractionSeen') {
        if(args) {
          args.pop();
        } else {
          args = [];
        }

        const span = htmlToSpan(RichTextProcessor.wrapEmojiText(action.emoticon));
        args.push(span);
      }

      const descriptionElement = i18n(langPackKey, args);
      descriptionElement.classList.add('peer-typing-description');

      if(container.childElementCount > 1) container.lastElementChild.replaceWith(descriptionElement);
      else container.append(descriptionElement);
      return container;
    }
  }

  public async getPeerStatus(peerId: PeerId, ignoreSelf?: boolean) {
    let subtitle: HTMLElement;
    if(!peerId) return;

    if(peerId.isAnyChat()) { // not human
      let span = this.getPeerTyping(peerId);
      if(span) {
        return span;
      }

      const chatId = peerId.toChatId();
      const chatInfo = await appProfileManager.getChatFull(chatId) as any;
      this.chat.log('chatInfo res:', chatInfo);
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      case 'sendMessageEmojiInteractionSeen':
      case 'sendMessageChooseStickerAction': {
        c += '-choosing-sticker';
        for(let i = 0; i < 2; ++i) {
          const eye = document.createElement('div');
          eye.className = c + '-eye';
          el.append(eye);
        }
        break;
      }
    }

    el.classList.add(c);

    return el;
  }

  public async getPeerTyping(peerId: PeerId, container?: HTMLElement) {
    // const log = this.log.bindPrefix('getPeerTyping-' + peerId);
    // log('getting peer typing');

    const isUser = peerId.isUser();
    if(isUser && await this.managers.appUsersManager.isBot(peerId)) {
      // log('a bot');
      return;
    }

    const typings = await this.managers.appProfileManager.getPeerTypings(peerId);
    if(!typings?.length) {
      // log('have no typing');
      return;
    }

    const typing = typings[0];

    const langPackKeys: {
      [peerType in 'private' | 'chat' | 'multi']?: Partial<{[action in SendMessageAction['_']]: LangPackKey}>
    } = {
      private: {
        'sendMessageTypingAction': 'Peer.Activity.User.TypingText',
        'sendMessageUploadAudioAction': 'Peer.Activity.User.SendingFile',
        'sendMessageUploadDocumentAction': 'Peer.Activity.User.SendingFile',
        'sendMessageUploadPhotoAction': 'Peer.Activity.User.SendingPhoto',
        'sendMessageUploadVideoAction': 'Peer.Activity.User.SendingVideo',
        'sendMessageUploadRoundAction': 'Peer.Activity.User.SendingVideo',
        'sendMessageRecordVideoAction': 'Peer.Activity.User.RecordingVideo',
        'sendMessageRecordAudioAction': 'Peer.Activity.User.RecordingAudio',
        'sendMessageRecordRoundAction': 'Peer.Activity.User.RecordingVideo',
        'sendMessageGamePlayAction': 'Peer.Activity.User.PlayingGame',
        'sendMessageChooseStickerAction': 'Peer.Activity.User.ChoosingSticker',
        'sendMessageEmojiInteractionSeen': 'Peer.Activity.User.EnjoyingAnimations'
      },
      chat: {
        'sendMessageTypingAction': 'Peer.Activity.Chat.TypingText',
        'sendMessageUploadAudioAction': 'Peer.Activity.Chat.SendingFile',
        'sendMessageUploadDocumentAction': 'Peer.Activity.Chat.SendingFile',
        'sendMessageUploadPhotoAction': 'Peer.Activity.Chat.SendingPhoto',
        'sendMessageUploadVideoAction': 'Peer.Activity.Chat.SendingVideo',
        'sendMessageUploadRoundAction': 'Peer.Activity.Chat.SendingVideo',
        'sendMessageRecordVideoAction': 'Peer.Activity.Chat.RecordingVideo',
        'sendMessageRecordAudioAction': 'Peer.Activity.Chat.RecordingAudio',
        'sendMessageRecordRoundAction': 'Peer.Activity.Chat.RecordingVideo',
        'sendMessageGamePlayAction': 'Peer.Activity.Chat.PlayingGame',
        'sendMessageChooseStickerAction': 'Peer.Activity.Chat.ChoosingSticker',
        'sendMessageEmojiInteractionSeen': 'Peer.Activity.Chat.EnjoyingAnimations'
      },
      multi: {
        'sendMessageTypingAction': 'Peer.Activity.Chat.Multi.TypingText1',
        'sendMessageUploadAudioAction': 'Peer.Activity.Chat.Multi.SendingFile1',
        'sendMessageUploadDocumentAction': 'Peer.Activity.Chat.Multi.SendingFile1',
        'sendMessageUploadPhotoAction': 'Peer.Activity.Chat.Multi.SendingPhoto1',
        'sendMessageUploadVideoAction': 'Peer.Activity.Chat.Multi.SendingVideo1',
        'sendMessageUploadRoundAction': 'Peer.Activity.Chat.Multi.SendingVideo1',
        'sendMessageRecordVideoAction': 'Peer.Activity.Chat.Multi.RecordingVideo1',
        'sendMessageRecordAudioAction': 'Peer.Activity.Chat.Multi.RecordingAudio1',
        'sendMessageRecordRoundAction': 'Peer.Activity.Chat.Multi.RecordingVideo1',
        'sendMessageGamePlayAction': 'Peer.Activity.Chat.Multi.PlayingGame1',
        'sendMessageChooseStickerAction': 'Peer.Activity.Chat.Multi.ChoosingSticker1'
      }
    };

    const mapa = isUser ? langPackKeys.private : (typings.length > 1 ? langPackKeys.multi : langPackKeys.chat);
    let action = typing.action;

    if(typings.length > 1) {
      const s: any = {};
      typings.forEach((typing) => {
        const type = typing.action._;
        if(s[type] === undefined) s[type] = 0;
        ++s[type];
      });

      if(Object.keys(s).length > 1) {
        action = {
          _: 'sendMessageTypingAction'
        };
      }
    }

    const langPackKey = mapa[action._];
    if(!langPackKey) {
      // log('no langPackKey');
      return;
    }

    let peerTitlePromise: Promise<any>;
    let args: any[];
    if(peerId.isAnyChat()) {
      const peerTitle = new PeerTitle();
      peerTitlePromise = peerTitle.update({peerId: typing.userId.toPeerId(false), onlyFirstName: true});
      args = [
        peerTitle.element,
        typings.length - 1
      ];

      await peerTitlePromise;
    }

    if(!container) {
      container = document.createElement('span');
      container.classList.add('online', 'peer-typing-container');
    }

    container.classList.toggle('peer-typing-flex', action._ === 'sendMessageChooseStickerAction' || action._ === 'sendMessageEmojiInteractionSeen');

    let typingElement = container.firstElementChild as HTMLElement;
    if(!typingElement) {
      typingElement = this.getTypingElement(action);
      container.prepend(typingElement);
    } else {
      if(typingElement.dataset.action !== action._) {
        typingElement.replaceWith(this.getTypingElement(action));
      }
    }

    if(action._ === 'sendMessageEmojiInteractionSeen') {
      if(args) {
        args.pop();
      } else {
        args = [];
      }

      const span = htmlToSpan(wrapEmojiText(action.emoticon));
      args.push(span);
    }

    const descriptionElement = i18n(langPackKey, args);
    descriptionElement.classList.add('peer-typing-description');

    if(container.childElementCount > 1) container.lastElementChild.replaceWith(descriptionElement);
    else container.append(descriptionElement);
    
    // log('returning typing');
    return container;
  }

  private async getChatStatus(chatId: ChatId): Promise<AckedResult<HTMLElement>> {
    const typingEl = await this.getPeerTyping(chatId.toPeerId(true));
    if(typingEl) {
      return {cached: true, result: Promise.resolve(typingEl)};
    }

    const result = await this.managers.acknowledged.appProfileManager.getChatFull(chatId);
    const dooo = async(chatInfo: ChatFull) => {
      // this.chat.log('chatInfo res:', chatInfo);

      const participants_count = (chatInfo as ChatFull.channelFull).participants_count || 
        ((chatInfo as ChatFull.chatFull).participants as ChatParticipants.chatParticipants)?.participants?.length || 
        1;
      //if(participants_count) {
<<<<<<< HEAD
        subtitle = appProfileManager.getChatMembersString(chatId);

        if(participants_count < 2) {
          return subtitle;
        }

        const onlines = await appProfileManager.getOnlines(chatId);
=======
        let subtitle = await getChatMembersString(chatId);
  
        if(participants_count < 2) {
          return subtitle;
        }
  
        const onlines = await this.managers.appProfileManager.getOnlines(chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(onlines > 1) {
          const span = document.createElement('span');
          
          span.append(...join([subtitle, i18n('OnlineCount', [numberThousandSplitter(onlines)])], false));
          subtitle = span;
        }
  
        return subtitle;
      //}
<<<<<<< HEAD
    } else { // user
      const user = appUsersManager.getUser(peerId);
      
      if(rootScope.myId === peerId && !ignoreSelf) {
        return;
      } else if(user) {
        subtitle = appUsersManager.getUserStatusString(user.id);

        if(!appUsersManager.isBot(peerId)) {
          let span = this.getPeerTyping(peerId);
          if(!span && user.status?._ === 'userStatusOnline') {
            span = document.createElement('span');
            span.classList.add('online');
            span.append(subtitle);
          }

          if(span) {
            return span;
          }
        }
        
        return subtitle;
=======
    }; 

    const promise = Promise.resolve(result.result).then(dooo);
    return {
      cached: result.cached,
      result: promise
    };
  }

  private async getUserStatus(userId: UserId, ignoreSelf?: boolean) {
    const result: AckedResult<HTMLElement> = {
      cached: true,
      result: Promise.resolve(undefined as HTMLElement)
    };

    const user = await this.managers.appUsersManager.getUser(userId);
    if(!user || (user.pFlags.self && !ignoreSelf)) {
      return result;
    }

    const subtitle = getUserStatusString(user);

    if(!user.pFlags.bot) {
      let typingEl = await this.getPeerTyping(userId.toPeerId());
      if(!typingEl && user.status?._ === 'userStatusOnline') {
        typingEl = document.createElement('span');
        typingEl.classList.add('online');
        typingEl.append(subtitle);
      }

      if(typingEl) {
        result.result = Promise.resolve(typingEl);
        return result;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }
    
    result.result = Promise.resolve(subtitle);
    return result;
  }

  private async getPeerStatus(peerId: PeerId, ignoreSelf?: boolean) {
    if(!peerId) return;
    let promise: Promise<AckedResult<HTMLElement>>;
    if(peerId.isAnyChat()) {
      promise = this.getChatStatus(peerId.toChatId());
    } else {
      promise = this.getUserStatus(peerId.toUserId(), ignoreSelf);
    }

    return promise;
  }

  public async setPeerStatus(
    peerId: PeerId, 
    element: HTMLElement, 
    needClear: boolean, 
    useWhitespace: boolean, 
    middleware: () => boolean, 
    ignoreSelf?: boolean
  ) {
    // const log = this.log.bindPrefix('status-' + peerId);
    // log('setting status', element);

    if(!needClear) {
      // * good good good
      const typingContainer = element.querySelector('.peer-typing-container') as HTMLElement;
      if(typingContainer && await this.getPeerTyping(peerId, typingContainer)) {
        // log('already have a status');
        return;
      }
    }
    
    const result = await this.getPeerStatus(peerId, ignoreSelf);
    // log('getPeerStatus result', result);
    if(!middleware()) {
      // log.warn('middleware');
      return;
    }

    const set = async() => {
      const subtitle = result && await result.result;
      if(!middleware()) {
        return;
      }
  
      return () => replaceContent(element, subtitle || placeholder);
    };
    
    const placeholder = useWhitespace ? '‎' : ''; // ! HERE U CAN FIND WHITESPACE
    if(!result || result.cached) {
      return await set();
    } else if(needClear) {
      return () => {
        element.textContent = placeholder;
        return set().then((callback) => callback && callback());
      };
    }
  }

  public setChoosingStickerTyping(cancel: boolean) {
    this.managers.appMessagesManager.setTyping(this.chat.peerId, {_: cancel ? 'sendMessageCancelAction' : 'sendMessageChooseStickerAction'});
  }

  public setPeerStatus(peerId: PeerId, element: HTMLElement, needClear: boolean, useWhitespace: boolean, middleware: () => boolean, ignoreSelf?: boolean) {
    if(needClear) {
      element.innerHTML = useWhitespace ? '‎' : ''; // ! HERE U CAN FIND WHITESPACE
    }

    // * good good good
    const typingContainer = element.querySelector('.peer-typing-container') as HTMLElement;
    if(typingContainer && this.getPeerTyping(peerId, typingContainer)) {
      return;
    }

    this.getPeerStatus(peerId, ignoreSelf).then((subtitle) => {
      if(!middleware()) {
        return;
      }

      replaceContent(element, subtitle || (useWhitespace ? '‎' : ''));
    });
  }

  public setChoosingStickerTyping(cancel: boolean) {
    appMessagesManager.setTyping(this.chat.peerId, {_: cancel ? 'sendMessageCancelAction' : 'sendMessageChooseStickerAction'});
  }
}

const appImManager = new AppImManager();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.appImManager = appImManager);
export default appImManager;
