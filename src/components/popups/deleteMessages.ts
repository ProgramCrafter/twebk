/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import appChatsManager from "../../lib/appManagers/appChatsManager";
import appMessagesManager from "../../lib/appManagers/appMessagesManager";
import rootScope from "../../lib/rootScope";
import { addCancelButton } from ".";
=======
import rootScope from "../../lib/rootScope";
import PopupElement, { addCancelButton } from ".";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupPeer, { PopupPeerButtonCallbackCheckboxes, PopupPeerOptions } from "./peer";
import { ChatType } from "../chat/chat";
import { i18n, LangPackKey } from "../../lib/langPack";
import PeerTitle from "../peerTitle";
<<<<<<< HEAD
import appPeersManager from "../../lib/appManagers/appPeersManager";

export default class PopupDeleteMessages {
  constructor(peerId: PeerId, mids: number[], type: ChatType, onConfirm?: () => void) {
    const peerTitleElement = new PeerTitle({peerId}).element;
=======
import hasRights from "../../lib/appManagers/utils/chats/hasRights";
import filterAsync from "../../helpers/array/filterAsync";

export default class PopupDeleteMessages {
  constructor(private peerId: PeerId, private mids: number[], private type: ChatType, private onConfirm?: () => void) {
    this.construct();
  }

  private async construct() {
    let {peerId, mids, type, onConfirm} = this;

    const peerTitleElement = new PeerTitle({peerId}).element;

    const managers = PopupElement.MANAGERS;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    mids = mids.slice();
    const callback = (checked: PopupPeerButtonCallbackCheckboxes, revoke?: boolean) => {
      onConfirm && onConfirm();
      if(type === 'scheduled') {
        managers.appMessagesManager.deleteScheduledMessages(peerId, mids);
      } else {
<<<<<<< HEAD
        appMessagesManager.deleteMessages(peerId, mids, !!checked.size || revoke);
=======
        managers.appMessagesManager.deleteMessages(peerId, mids, !!checked.size || revoke);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    };

    let title: LangPackKey, titleArgs: any[], description: LangPackKey, descriptionArgs: any[], buttons: PopupPeerOptions['buttons'], checkboxes: PopupPeerOptions['checkboxes'] = [];
    if(mids.length === 1) {
      title = 'DeleteSingleMessagesTitle';
    } else {
      title = 'DeleteMessagesTitle';
      titleArgs = [i18n('messages', [mids.length])];
    }
    
<<<<<<< HEAD
    if(appPeersManager.isMegagroup(peerId)) {
=======
    if(await managers.appPeersManager.isMegagroup(peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      description = mids.length === 1 ? 'AreYouSureDeleteSingleMessageMega' : 'AreYouSureDeleteFewMessagesMega';
    } else {
      description = mids.length === 1 ? 'AreYouSureDeleteSingleMessage' : 'AreYouSureDeleteFewMessages';
    }

    buttons = [{
      langKey: 'Delete',
      isDanger: true,
      callback
    }];

    if(peerId === rootScope.myId || type === 'scheduled') {
      
    } else {
      if(peerId.isUser()) {
        checkboxes.push({
          text: 'DeleteMessagesOptionAlso',
          textArgs: [peerTitleElement]
        });
      } else {
<<<<<<< HEAD
        const chat = appChatsManager.getChat(peerId.toChatId());

        const hasRights = appChatsManager.hasRights(peerId.toChatId(), 'delete_messages');
        if(chat._ === 'chat') {
          const canRevoke = hasRights ? mids.slice() : mids.filter(mid => {
            const message = appMessagesManager.getMessageByPeer(peerId, mid);
=======
        const chat = await managers.appChatsManager.getChat(peerId.toChatId());

        const _hasRights = hasRights(chat, 'delete_messages');
        if(chat._ === 'chat') {
          const canRevoke = _hasRights ? mids.slice() : await filterAsync(mids, async(mid) => {
            const message = await managers.appMessagesManager.getMessageByPeer(peerId, mid);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            return message.fromId === rootScope.myId;
          });

          if(canRevoke.length) {
            if(canRevoke.length === mids.length) {
              checkboxes.push({
                text: 'DeleteForAll'
              });
            } else {
              checkboxes.push({
                text: 'DeleteMessagesOption'
              });

              description = 'DeleteMessagesTextGroup';
              descriptionArgs = [i18n('messages', [canRevoke.length])];
              //description = `You can also delete the ${canRevoke.length} message${canRevoke.length > 1 ? 's' : ''} you sent from the inboxes of other group members by pressing "${buttonText}".`;
            }
          }
        } else {
          buttons[0].callback = (checked) => callback(checked, true);
        }
      }
    }

    addCancelButton(buttons);

    const popup = new PopupPeer('popup-delete-chat', {
      peerId,
      titleLangKey: title,
      titleLangArgs: titleArgs,
      descriptionLangKey: description,
      descriptionLangArgs: descriptionArgs,
      buttons,
      checkboxes
    });

    popup.show();
  }
}
