/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import appChatsManager from "../../lib/appManagers/appChatsManager";
import appMessagesManager from "../../lib/appManagers/appMessagesManager";
import appPeersManager, { PeerType } from "../../lib/appManagers/appPeersManager";
=======
import PopupElement from ".";
import type { PeerType } from "../../lib/appManagers/appPeersManager";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { LangPackKey } from "../../lib/langPack";
import PeerTitle from "../peerTitle";
import PopupPeer, { PopupPeerButtonCallbackCheckboxes, PopupPeerOptions } from "./peer";

export default class PopupDeleteDialog {
  constructor(
<<<<<<< HEAD
    peerId: PeerId, 
    // actionType: 'leave' | 'delete', 
    peerType: PeerType = appPeersManager.getDialogType(peerId), 
    onSelect?: (promise: Promise<any>) => void
  ) {
    const peerTitleElement = new PeerTitle({peerId}).element;

=======
    private peerId: PeerId, 
    // actionType: 'leave' | 'delete', 
    private peerType?: PeerType, 
    private onSelect?: (promise: Promise<any>) => void
  ) {
    this.construct();
  }

  private async construct() {
    let {peerId, peerType, onSelect} = this;
    const peerTitleElement = new PeerTitle({peerId}).element;

    const managers = PopupElement.MANAGERS;
    if(peerType === undefined) {
      peerType = await managers.appPeersManager.getDialogType(peerId);
    }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    /* const callbackFlush = (checked: PopupPeerButtonCallbackCheckboxes) => {
      const promise = appMessagesManager.flushHistory(peerId, checkboxes ? !checked[checkboxes[0].text] : undefined);
      onSelect && onSelect(promise);
    }; */

    const callbackLeave = (checked: PopupPeerButtonCallbackCheckboxes, flush = checkboxes && !!checked.size) => {
<<<<<<< HEAD
      let promise = appChatsManager.leave(peerId.toChatId());
      
      if(flush) {
        promise = promise.finally(() => {
          return appMessagesManager.flushHistory(peerId);
=======
      let promise = managers.appChatsManager.leave(peerId.toChatId());
      
      if(flush) {
        promise = promise.finally(() => {
          return managers.appMessagesManager.flushHistory(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }) as any;
      }
      
      onSelect && onSelect(promise);
    };

    const callbackDelete = (checked: PopupPeerButtonCallbackCheckboxes) => {
      let promise: Promise<any>;

      if(peerId.isUser()) {
<<<<<<< HEAD
        promise = appMessagesManager.flushHistory(peerId, false, checkboxes ? !!checked.size : undefined);
      } else {
        if(checked.size) {
          promise = appChatsManager.delete(peerId.toChatId());
=======
        promise = managers.appMessagesManager.flushHistory(peerId, false, checkboxes ? !!checked.size : undefined);
      } else {
        if(checked.size) {
          promise = managers.appChatsManager.delete(peerId.toChatId());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        } else {
          return callbackLeave(checked);
        }
      }
      
      onSelect && onSelect(promise);
    };

    let title: LangPackKey, description: LangPackKey, descriptionArgs: any[], buttons: PopupPeerOptions['buttons'], checkboxes: PopupPeerOptions['checkboxes'];
    switch(peerType) {
      case 'channel': {
<<<<<<< HEAD
        if(/* actionType === 'delete' &&  */appChatsManager.hasRights(peerId.toChatId(), 'delete_chat')) {
          appChatsManager.deleteChannel
=======
        if(/* actionType === 'delete' &&  */await managers.appChatsManager.hasRights(peerId.toChatId(), 'delete_chat')) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          title = 'ChannelDeleteMenu';
          description = 'AreYouSureDeleteAndExitChannel';
          buttons = [{
            langKey: 'ChannelDeleteMenu',
            isDanger: true,
            callback: callbackDelete
          }];

          checkboxes = [{
            text: 'DeleteChannelForAll'
          }];
        } else {
          title = 'LeaveChannelMenu';
          description = 'ChannelLeaveAlertWithName';
          descriptionArgs = [peerTitleElement];
          buttons = [{
            langKey: 'LeaveChannel',
            isDanger: true,
            callback: callbackLeave
          }];
        }

        break;
      }

      /* case 'megagroup': {
        title = 'Leave Group?';
        description = `Are you sure you want to leave this group?`;
        buttons = [{
          text: 'LEAVE ' + peerTitleElement,
          isDanger: true,
          callback: callbackLeave
        }];

        break;
      } */

      case 'chat': {
        title = 'DeleteChatUser';
        description = 'AreYouSureDeleteThisChatWithUser';
        descriptionArgs = [peerTitleElement];

        buttons = [{
          langKey: 'DeleteChatUser',
          isDanger: true,
          callback: callbackDelete
        }];

        checkboxes = [{
          text: 'DeleteMessagesOptionAlso',
          textArgs: [
            new PeerTitle({peerId}).element
          ]
        }];

        break;
      }

      case 'saved': {
        title = 'DeleteChatUser';
        description = 'AreYouSureDeleteThisChatSavedMessages';
        buttons = [{
          langKey: 'DeleteChatUser',
          isDanger: true,
          callback: callbackDelete
        }];

        break;
      }

      case 'megagroup':
      case 'group': {
<<<<<<< HEAD
        if(/* actionType === 'delete' &&  */appChatsManager.hasRights(peerId.toChatId(), 'delete_chat')) {
=======
        if(/* actionType === 'delete' &&  */await managers.appChatsManager.hasRights(peerId.toChatId(), 'delete_chat')) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          title = 'DeleteMegaMenu';
          description = 'AreYouSureDeleteAndExit';
          buttons = [{
            langKey: 'DeleteMegaMenu',
            isDanger: true,
            callback: callbackDelete
          }];

          checkboxes = [{
            text: 'DeleteChat.DeleteGroupForAll'
          }];
        } else {
          title = 'LeaveMegaMenu';
          description = 'AreYouSureDeleteAndExitName';
          descriptionArgs = [peerTitleElement];
          buttons = [{
            langKey: 'DeleteChatUser',
            isDanger: true,
            callback: (checkboxes) => callbackLeave(checkboxes, true)
          }];
        }

        break;
      }
    }

    new PopupPeer('popup-delete-chat', {
      peerId,
      titleLangKey: title,
      descriptionLangKey: description,
      descriptionLangArgs: descriptionArgs,
      buttons,
      checkboxes
    }).show();
  }
}
