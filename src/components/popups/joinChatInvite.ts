/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import PopupElement, { addCancelButton } from ".";
import setInnerHTML from "../../helpers/dom/setInnerHTML";
import numberThousandSplitter from "../../helpers/number/numberThousandSplitter";
<<<<<<< HEAD
import { ChatInvite, Updates } from "../../layer";
import apiUpdatesManager from "../../lib/appManagers/apiUpdatesManager";
import appAvatarsManager from "../../lib/appManagers/appAvatarsManager";
import appPhotosManager from "../../lib/appManagers/appPhotosManager";
import { i18n, _i18n } from "../../lib/langPack";
import apiManager from "../../lib/mtproto/mtprotoworker";
import { NULL_PEER_ID } from "../../lib/mtproto/mtproto_config";
import RichTextProcessor from "../../lib/richtextprocessor";
import rootScope from "../../lib/rootScope";
import AvatarElement from "../avatar";
=======
import { ChatInvite } from "../../layer";
import appImManager from "../../lib/appManagers/appImManager";
import { i18n, _i18n } from "../../lib/langPack";
import { NULL_PEER_ID } from "../../lib/mtproto/mtproto_config";
import wrapEmojiText from "../../lib/richTextProcessor/wrapEmojiText";
import AvatarElement from "../avatar";
import putPhoto from "../putPhoto";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { toastNew } from "../toast";
import { wrapPhoto } from "../wrappers";

// const FAKE_CHAT_ID = Number.MAX_SAFE_INTEGER - 0x1000;

export default class PopupJoinChatInvite extends PopupElement {
<<<<<<< HEAD
  constructor(hash: string, chatInvite: ChatInvite.chatInvite) {
    super('popup-join-chat-invite', addCancelButton([{
      langKey: chatInvite.pFlags.request_needed ? 'RequestJoin.Button' : (chatInvite.pFlags.broadcast ? 'JoinByPeekChannelTitle' : 'JoinByPeekGroupTitle'),
      callback: () => {
        apiManager.invokeApi('messages.importChatInvite', {hash})
        .then((updates) => {
          apiUpdatesManager.processUpdateMessage(updates);
          const chat = (updates as Updates.updates).chats[0];
          const peerId = chat.id.toPeerId(true);
          rootScope.dispatchEvent('history_focus', {peerId});
        }, (error) => {
          if(error.type === 'INVITE_REQUEST_SENT') {
            toastNew({langPackKey: 'RequestToJoinSent'});
          }
        });
      }
    }]), {closable: true, overlayClosable: true, body: true});

    this.header.remove();

=======
  constructor(
    private hash: string, 
    private chatInvite: ChatInvite.chatInvite, 
  ) {
    super('popup-join-chat-invite', {
      closable: true, 
      overlayClosable: true, 
      body: true,
      buttons: addCancelButton([{
        langKey: chatInvite.pFlags.request_needed ? 'RequestJoin.Button' : (chatInvite.pFlags.broadcast ? 'JoinByPeekChannelTitle' : 'JoinByPeekGroupTitle'),
        callback: () => {
          this.managers.appChatsManager.importChatInvite(hash)
          .then((chatId) => {
            const peerId = chatId.toPeerId(true);
            appImManager.setInnerPeer({peerId});
          }, (error) => {
            if(error.type === 'INVITE_REQUEST_SENT') {
              toastNew({langPackKey: 'RequestToJoinSent'});
            }
          });
        }
      }])
    });

    this.construct();
  }

  private async construct() {
    this.header.remove();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    /* const fakeChat: Chat.channel | Chat.chat = {
      _: chatInvite.pFlags.channel ? 'channel' : 'chat',
      id: FAKE_CHAT_ID,
      title: chatInvite.title,
      photo: chatInvite.photo as any,
      date: Date.now() / 1000 | 0,
      version: 0,
      participants_count: chatInvite.participants_count,
      pFlags: chatInvite.pFlags as any
    };

    appChatsManager.saveApiChat(fakeChat); */
<<<<<<< HEAD
=======

    const {chatInvite, managers, hash} = this;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    
    const avatarElem = new AvatarElement();
    avatarElem.classList.add('avatar-100');
    avatarElem.isDialog = false;
    if(chatInvite.photo._ === 'photo') {
<<<<<<< HEAD
      chatInvite.photo = appPhotosManager.savePhoto(chatInvite.photo);
=======
      chatInvite.photo = await managers.appPhotosManager.savePhoto(chatInvite.photo);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      wrapPhoto({
        container: avatarElem,
        message: null,
        photo: chatInvite.photo,
        boxHeight: 100,
        boxWidth: 100,
        withoutPreloader: true
      });
      avatarElem.style.width = avatarElem.style.height = '';
    } else {
<<<<<<< HEAD
      appAvatarsManager.putPhoto(avatarElem, NULL_PEER_ID, false, chatInvite.title);
=======
      putPhoto(avatarElem, NULL_PEER_ID, false, chatInvite.title);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    const title = document.createElement('div');
    title.classList.add('chat-title');
<<<<<<< HEAD
    setInnerHTML(title, RichTextProcessor.wrapEmojiText(chatInvite.title));
=======
    setInnerHTML(title, wrapEmojiText(chatInvite.title));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    //avatarElem.setAttribute('peer', '' + -fakeChat.id);
    
    const isBroadcast = chatInvite.pFlags.broadcast;
    const peopleCount = i18n(isBroadcast ? 'Subscribers' : 'Members', [numberThousandSplitter(chatInvite.participants_count)]);
    peopleCount.classList.add('chat-participants-count');

    this.body.append(avatarElem, title, peopleCount);

    if(chatInvite.pFlags.request_needed) {
      const caption = document.createElement('div');
      _i18n(caption, isBroadcast ? 'RequestToJoinChannelDescription' : 'RequestToJoinGroupDescription');
      caption.classList.add('chat-participants-count', 'request-caption');

      this.body.append(caption);
    }
<<<<<<< HEAD
=======

    this.show();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
}
