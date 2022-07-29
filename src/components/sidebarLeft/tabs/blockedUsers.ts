/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTab } from "../../slider";
import { SettingSection } from "..";
<<<<<<< HEAD
import { attachContextMenuListener, openBtnMenu, positionMenu } from "../../misc";
import ButtonMenu from "../../buttonMenu";
import appDialogsManager from "../../../lib/appManagers/appDialogsManager";
import appUsersManager from "../../../lib/appManagers/appUsersManager";
=======
import ButtonMenu from "../../buttonMenu";
import appDialogsManager, { DIALOG_LIST_ELEMENT_TAG } from "../../../lib/appManagers/appDialogsManager";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupPickUser from "../../popups/pickUser";
import rootScope from "../../../lib/rootScope";
import findUpTag from "../../../helpers/dom/findUpTag";
import ButtonCorner from "../../buttonCorner";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
<<<<<<< HEAD
=======
import formatUserPhone from "../../wrappers/formatUserPhone";
import getUserStatusString from "../../wrappers/getUserStatusString";
import { attachContextMenuListener } from "../../../helpers/dom/attachContextMenuListener";
import positionMenu from "../../../helpers/positionMenu";
import contextMenuController from "../../../helpers/contextMenuController";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppBlockedUsersTab extends SliderSuperTab {
  public peerIds: PeerId[];
  private menuElement: HTMLElement;
  
  protected init() {
    this.header.classList.add('with-border');
    this.container.classList.add('blocked-users-container');
    this.setTitle('BlockedUsers');

    const section = new SettingSection({
      caption: 'BlockedUsersInfo'
    });

    section.caption.parentElement.prepend(section.caption);

    this.scrollable.append(section.container);

    const btnAdd = ButtonCorner({icon: 'add', className: 'is-visible'});
    this.content.append(btnAdd);

    attachClickEvent(btnAdd, (e) => {
      new PopupPickUser({
        peerTypes: ['contacts'],
        placeholder: 'BlockModal.Search.Placeholder',
        onSelect: (peerId) => {
          //console.log('block', peerId);
<<<<<<< HEAD
          appUsersManager.toggleBlock(peerId, true);
=======
          this.managers.appUsersManager.toggleBlock(peerId, true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        },
      });
    }, {listenerSetter: this.listenerSetter});

    const list = appDialogsManager.createChatList();
    this.scrollable.container.classList.add('chatlist-container');
    section.content.append(list);

<<<<<<< HEAD
    const add = (peerId: PeerId, append: boolean) => {
      const {dom} = appDialogsManager.addDialogNew({
        dialog: peerId,
        container: list,
        drawStatus: false,
=======
    const add = async(peerId: PeerId, append: boolean) => {
      const {dom} = appDialogsManager.addDialogNew({
        peerId: peerId,
        container: list,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        rippleEnabled: true,
        avatarSize: 48,
        append
      });

<<<<<<< HEAD
      const user = appUsersManager.getUser(peerId);
      if(user.pFlags.bot) {
        dom.lastMessageSpan.append('@' + user.username);
      } else {
        if(user.phone) dom.lastMessageSpan.innerHTML = appUsersManager.formatUserPhone(user.phone);
        else dom.lastMessageSpan.append(user.username ? '@' + user.username : appUsersManager.getUserStatusString(peerId));
=======
      const user = await this.managers.appUsersManager.getUser(peerId);
      if(user.pFlags.bot) {
        dom.lastMessageSpan.append('@' + user.username);
      } else {
        if(user.phone) dom.lastMessageSpan.innerHTML = formatUserPhone(user.phone);
        else dom.lastMessageSpan.append(user.username ? '@' + user.username : getUserStatusString(user));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      //dom.titleSpan.innerHTML = 'Raaid El Syed';
      //dom.lastMessageSpan.innerHTML = '+1 234 567891';
    };

    for(const peerId of this.peerIds) {
      add(peerId, true);
    }

    let target: HTMLElement;
    const onUnblock = () => {
      const peerId = target.dataset.peerId.toPeerId();
<<<<<<< HEAD
      appUsersManager.toggleBlock(peerId, false);
=======
      this.managers.appUsersManager.toggleBlock(peerId, false);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    const element = this.menuElement = ButtonMenu([{
      icon: 'lockoff',
      text: 'Unblock',
      onClick: onUnblock,
      options: {listenerSetter: this.listenerSetter}
    }]);
    element.id = 'blocked-users-contextmenu';
    element.classList.add('contextmenu');

    document.getElementById('page-chats').append(element);

    attachContextMenuListener(this.scrollable.container, (e) => {
<<<<<<< HEAD
      target = findUpTag(e.target, 'LI');
=======
      target = findUpTag(e.target, DIALOG_LIST_ELEMENT_TAG);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!target) {
        return;
      }

      if(e instanceof MouseEvent) e.preventDefault();
      // smth
      if(e instanceof MouseEvent) e.cancelBubble = true;

      positionMenu(e, element);
<<<<<<< HEAD
      openBtnMenu(element);
=======
      contextMenuController.openBtnMenu(element);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, this.listenerSetter);

    this.listenerSetter.add(rootScope)('peer_block', (update) => {
      const {peerId, blocked} = update;
      const li = list.querySelector(`[data-peer-id="${peerId}"]`);
      if(blocked) {
        if(!li) {
          add(peerId, false);
        }
      } else {
        if(li) {
          li.remove();
        }
      }
    });

    const LOAD_COUNT = 50;
    let loading = false;
    this.scrollable.onScrolledBottom = () => {
      if(loading) {
        return;
      }

      loading = true;
<<<<<<< HEAD
      appUsersManager.getBlocked(list.childElementCount, LOAD_COUNT).then(res => {
=======
      this.managers.appUsersManager.getBlocked(list.childElementCount, LOAD_COUNT).then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        for(const peerId of res.peerIds) {
          add(peerId, true);
        }

        if(res.peerIds.length < LOAD_COUNT || list.childElementCount === res.count) {
          this.scrollable.onScrolledBottom = null;
        }

        this.scrollable.checkForTriggers();
      }).finally(() => {
        loading = false;
      });
    };
  }

  onOpenAfterTimeout() {
    this.scrollable.onScroll();
  }

  onCloseAfterTimeout() {
    if(this.menuElement) {
      this.menuElement.remove();
    }

    return super.onCloseAfterTimeout();
  }
}
