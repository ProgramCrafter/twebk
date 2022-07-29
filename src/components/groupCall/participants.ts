/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import PopupGroupCall from ".";
<<<<<<< HEAD
=======
import filterAsync from "../../helpers/array/filterAsync";
import contextMenuController from "../../helpers/contextMenuController";
import { attachContextMenuListener } from "../../helpers/dom/attachContextMenuListener";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import cancelEvent from "../../helpers/dom/cancelEvent";
import findUpClassName from "../../helpers/dom/findUpClassName";
import { addFullScreenListener, isFullScreen } from "../../helpers/dom/fullScreen";
import ListenerSetter from "../../helpers/listenerSetter";
import noop from "../../helpers/noop";
import safeAssign from "../../helpers/object/safeAssign";
<<<<<<< HEAD
=======
import positionMenu from "../../helpers/positionMenu";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import ScrollableLoader from "../../helpers/scrollableLoader";
import { GroupCallParticipant } from "../../layer";
import type { AppChatsManager } from "../../lib/appManagers/appChatsManager";
import type { AppGroupCallsManager } from "../../lib/appManagers/appGroupCallsManager";
<<<<<<< HEAD
import type { AppPeersManager } from "../../lib/appManagers/appPeersManager";
=======
import appImManager from "../../lib/appManagers/appImManager";
import type { AppPeersManager } from "../../lib/appManagers/appPeersManager";
import { AppManagers } from "../../lib/appManagers/managers";
import getPeerId from "../../lib/appManagers/utils/peers/getPeerId";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import GroupCallInstance from "../../lib/calls/groupCallInstance";
import rootScope from "../../lib/rootScope";
import ButtonMenu, { ButtonMenuItemOptions } from "../buttonMenu";
import confirmationPopup from "../confirmationPopup";
<<<<<<< HEAD
import { attachContextMenuListener, closeBtnMenu, openBtnMenu, positionMenu } from "../misc";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PeerTitle from "../peerTitle";
import PopupElement from "../popups";
import Scrollable from "../scrollable";
import GroupCallParticipantsList from "./participantsList";
import GroupCallParticipantsVideoElement from "./participantVideos";

export class GroupCallParticipantContextMenu {
<<<<<<< HEAD
  private buttons: (ButtonMenuItemOptions & {verify: (peerId: PeerId) => boolean})[];
  private element: HTMLDivElement;
  private appChatsManager: AppChatsManager;
  private appPeersManager: AppPeersManager;
  private appGroupCallsManager: AppGroupCallsManager;
=======
  private buttons: (ButtonMenuItemOptions & {verify: (peerId: PeerId) => boolean | Promise<boolean>})[];
  private element: HTMLDivElement;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private chatId: ChatId;
  private targetPeerId: PeerId;
  private participant: GroupCallParticipant;
  private instance: GroupCallInstance;
  private canManageCall: boolean;
<<<<<<< HEAD
=======
  private managers: AppManagers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
  constructor(options: {
    listenerSetter: ListenerSetter,
    onContextElement: HTMLElement,
<<<<<<< HEAD
    appChatsManager: AppChatsManager,
    appPeersManager: AppPeersManager,
    appGroupCallsManager: AppGroupCallsManager,
=======
    managers: AppManagers,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    instance: GroupCallInstance,
  }) {
    this.buttons = [{
      icon: 'gc_microphoneoff',
      text: 'VoiceChat.MutePeer',
      verify: () => this.canManageCall && this.participant.pFlags.can_self_unmute,
      onClick: () => this.toggleParticipantMuted(true)
    }, {
      icon: 'gc_microphone',
      text: 'VoiceChat.UnmutePeer',
      verify: () => this.canManageCall && !this.participant.pFlags.can_self_unmute,
      onClick: () => this.toggleParticipantMuted(false)
    }, {
      icon: 'gc_microphoneoff',
      text: 'VoiceChat.MuteForMe',
      verify: () => !this.canManageCall && !this.participant.pFlags.muted_by_you,
      onClick: () => this.toggleParticipantMuted(true)
    }, {
      icon: 'gc_microphone',
      text: 'VoiceChat.UnmuteForMe',
      verify: () => !this.canManageCall && this.participant.pFlags.muted_by_you,
      onClick: () => this.toggleParticipantMuted(false)
    }, {
      icon: 'newprivate',
      text: 'VoiceChat.OpenProfile',
      verify: () => true,
      onClick: this.onOpenProfileClick
    }, {
      icon: 'deleteuser danger',
      text: 'VoiceChat.RemovePeer',
<<<<<<< HEAD
      verify: () => this.appChatsManager.hasRights(this.chatId, 'ban_users'),
      onClick: () => {
        confirmationPopup({
          peerId: this.targetPeerId,
          title: new PeerTitle({peerId: this.targetPeerId}).element,
          descriptionLangKey: this.appChatsManager.isBroadcast(this.chatId) ? 'VoiceChat.RemovePeer.Confirm.Channel' : 'VoiceChat.RemovePeer.Confirm',
=======
      verify: () => this.managers.appChatsManager.hasRights(this.chatId, 'ban_users'),
      onClick: async() => {
        confirmationPopup({
          peerId: this.targetPeerId,
          title: new PeerTitle({peerId: this.targetPeerId}).element,
          descriptionLangKey: await this.managers.appChatsManager.isBroadcast(this.chatId) ? 'VoiceChat.RemovePeer.Confirm.Channel' : 'VoiceChat.RemovePeer.Confirm',
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          descriptionLangArgs: [new PeerTitle({peerId: this.targetPeerId}).element],
          button: {
            langKey: 'VoiceChat.RemovePeer.Confirm.OK',
            isDanger: true
          }
        }).then(() => {
<<<<<<< HEAD
          this.appChatsManager.kickFromChat(this.chatId, this.targetPeerId);
=======
          this.managers.appChatsManager.kickFromChat(this.chatId, this.targetPeerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }, noop);
      }
    }];

    const {listenerSetter} = options;
<<<<<<< HEAD
    this.appChatsManager = options.appChatsManager;
    this.appPeersManager = options.appPeersManager;
    this.appGroupCallsManager = options.appGroupCallsManager;
=======
    this.managers = options.managers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.instance = options.instance;
    this.chatId = this.instance.chatId;
  
    this.element = ButtonMenu(this.buttons, listenerSetter);
    this.element.classList.add('group-call-participant-menu', 'night');

<<<<<<< HEAD
    attachContextMenuListener(options.onContextElement, (e: any) => {
=======
    attachContextMenuListener(options.onContextElement, async(e: any) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const li = findUpClassName(e.target, 'group-call-participant');
      if(!li) {
        return;
      }

      if(this.element.parentElement !== appendTo) {
        appendTo.append(this.element);
      }

<<<<<<< HEAD
      const peerId = this.targetPeerId = li.dataset.peerId.toPeerId();
      this.participant = this.instance.getParticipantByPeerId(peerId);
=======
      cancelEvent(e);

      const peerId = this.targetPeerId = li.dataset.peerId.toPeerId();
      this.participant = await this.instance.getParticipantByPeerId(peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(this.participant.pFlags.self) {
        return;
      }

<<<<<<< HEAD
      this.canManageCall = this.appChatsManager.hasRights(this.chatId, 'manage_call');

      this.buttons.forEach(button => {
        button.element.classList.toggle('hide', !button.verify(peerId));
      });
      
      cancelEvent(e);
      positionMenu((e as TouchEvent).touches ? (e as TouchEvent).touches[0] : e as MouseEvent, this.element, 'right');
      openBtnMenu(this.element);
=======
      this.canManageCall = await this.managers.appChatsManager.hasRights(this.chatId, 'manage_call');

      await filterAsync(this.buttons, async(button) => {
        const good = await button.verify(peerId);
        button.element.classList.toggle('hide', !good);
        return good;
      });
      
      positionMenu((e as TouchEvent).touches ? (e as TouchEvent).touches[0] : e as MouseEvent, this.element, 'right');
      contextMenuController.openBtnMenu(this.element);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, listenerSetter);

    listenerSetter.add(rootScope)('group_call_participant', ({groupCallId, participant}) => {
      if(this.instance.id === groupCallId) {
<<<<<<< HEAD
        const peerId = this.appPeersManager.getPeerId(participant.peer);
        if(this.targetPeerId === peerId) {
          closeBtnMenu();
=======
        const peerId = getPeerId(participant.peer);
        if(this.targetPeerId === peerId) {
          contextMenuController.closeBtnMenu();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }
      }
    });

    let appendTo: HTMLElement = document.body;
    addFullScreenListener(document.body, () => {
      const isFull = isFullScreen();
<<<<<<< HEAD
      appendTo = isFull ? (PopupElement.getPopups(PopupGroupCall) as PopupGroupCall[])[0].getContainer(): document.body;

      if(!isFull) {
        closeBtnMenu();
=======
      appendTo = isFull ? PopupElement.getPopups(PopupGroupCall)[0].getContainer(): document.body;

      if(!isFull) {
        contextMenuController.closeBtnMenu();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }, listenerSetter);
  }

  private onOpenProfileClick = () => {
    const popup = PopupElement.getPopups(PopupGroupCall)[0];
    if(popup) {
      popup.hide();
    }

<<<<<<< HEAD
    rootScope.dispatchEvent('history_focus', {
      peerId: this.targetPeerId
    });
  };

  private toggleParticipantMuted = (muted: boolean) => {
    this.appGroupCallsManager.editParticipant(this.instance.id, this.participant, {
=======
    appImManager.setInnerPeer({peerId: this.targetPeerId});
  };

  private toggleParticipantMuted = (muted: boolean) => {
    this.instance.editParticipant(this.participant, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      muted
    });
  };
};

export default class GroupCallParticipantsElement {
  private container: HTMLDivElement;
  private sortedList: GroupCallParticipantsList;
  private instance: GroupCallInstance;
<<<<<<< HEAD
  private appGroupCallsManager: AppGroupCallsManager;
  private appPeersManager: AppPeersManager;
  private listenerSetter: ListenerSetter;
  private groupCallParticipantsVideo: GroupCallParticipantsVideoElement;
  private contextMenu: GroupCallParticipantContextMenu;
  private appChatsManager: AppChatsManager;

  constructor(options: {
    appendTo: HTMLElement,
    appGroupCallsManager: AppGroupCallsManager,
    appPeersManager: AppPeersManager,
    appChatsManager: AppChatsManager,
    instance: GroupCallInstance,
    listenerSetter: ListenerSetter
=======
  private listenerSetter: ListenerSetter;
  private groupCallParticipantsVideo: GroupCallParticipantsVideoElement;
  private contextMenu: GroupCallParticipantContextMenu;
  private managers: AppManagers;

  constructor(options: {
    appendTo: HTMLElement,
    instance: GroupCallInstance,
    listenerSetter: ListenerSetter,
    managers: AppManagers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }) {
    safeAssign(this, options);

    const className = 'group-call-participants';

    const scrollable = new Scrollable(undefined);
    scrollable.container.classList.add(className + '-scrollable');

    const container = this.container = document.createElement('div');
    container.classList.add(className);

    // const invite = Button(`btn-primary btn-transparent ${className}-invite`, {icon: 'adduser', text: 'VoiceChat.Invite.InviteMembers'});

    const sortedList = this.sortedList = new GroupCallParticipantsList(this.instance);
    
    const {instance, listenerSetter} = this;
    this.contextMenu = new GroupCallParticipantContextMenu({
      ...options,
      onContextElement: sortedList.list,
      listenerSetter,
      instance
    });

    this.groupCallParticipantsVideo = new GroupCallParticipantsVideoElement({
      ...options,
      appendTo: scrollable.container,
      displayPinned: false
    });

    scrollable.append(/* invite,  */sortedList.list);
    container.append(scrollable.container);

    options.appendTo.append(container);

    listenerSetter.add(rootScope)('group_call_participant', ({groupCallId, participant}) => {
      if(this.instance.id === groupCallId) {
        this.updateParticipant(participant);
      }
    });

    const scrollableLoader = new ScrollableLoader({
      scrollable,
      getPromise: () => {
<<<<<<< HEAD
        return this.appGroupCallsManager.getGroupCallParticipants(this.instance.id).then(({participants, isEnd}) => {
          participants.forEach(participant => {
=======
        return this.managers.appGroupCallsManager.getGroupCallParticipants(this.instance.id).then(({participants, isEnd}) => {
          participants.forEach((participant) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            this.updateParticipant(participant);
          });
          
          return isEnd;
        });
      }
    });

    this.setInstance(instance);
  }

  private updateParticipant(participant: GroupCallParticipant) {
<<<<<<< HEAD
    const peerId = this.appPeersManager.getPeerId(participant.peer);
=======
    const peerId = getPeerId(participant.peer);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const has = this.sortedList.has(peerId);
    if(participant.pFlags.left) {
      if(has) {
        this.sortedList.delete(peerId);
      }

      return;
    }

    if(!has) {
      this.sortedList.add(peerId);
      return;
    }

    this.sortedList.update(peerId);
  }

<<<<<<< HEAD
  public setInstance(instance: GroupCallInstance) {
=======
  public async setInstance(instance: GroupCallInstance) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    // @ts-ignore
    /* const users = appUsersManager.users;
    for(const userId in users) {
      const participant: GroupCallParticipant = {
        _: 'groupCallParticipant',
        date: 0,
        peer: {_: 'peerUser', user_id: userId.toPeerId()},
        pFlags: {
          muted: true
        },
        source: 1
      };

      instance.participants.set(userId.toPeerId(), participant);
      this.updateParticipant(participant);
    } */
<<<<<<< HEAD
    instance.participants.forEach((participant) => {
=======
    const participants = await instance.participants;
    participants.forEach((participant) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.updateParticipant(participant);
    });
  }
  
  public destroy() {
    this.sortedList.destroy();
    this.groupCallParticipantsVideo.destroy();
  }
}
