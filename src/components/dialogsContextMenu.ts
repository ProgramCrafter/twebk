/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import appDialogsManager from "../lib/appManagers/appDialogsManager";
import appMessagesManager, {Dialog} from "../lib/appManagers/appMessagesManager";
import appPeersManager from "../lib/appManagers/appPeersManager";
import rootScope from "../lib/rootScope";
import { positionMenu, openBtnMenu } from "./misc";
=======
import appDialogsManager, { DIALOG_LIST_ELEMENT_TAG } from "../lib/appManagers/appDialogsManager";
import type { Dialog } from "../lib/appManagers/appMessagesManager";
import rootScope from "../lib/rootScope";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import ButtonMenu, { ButtonMenuItemOptions } from "./buttonMenu";
import PopupDeleteDialog from "./popups/deleteDialog";
import { i18n } from "../lib/langPack";
import findUpTag from "../helpers/dom/findUpTag";
<<<<<<< HEAD
import appNotificationsManager from "../lib/appManagers/appNotificationsManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupPeer from "./popups/peer";
import AppChatFoldersTab from "./sidebarLeft/tabs/chatFolders";
import appSidebarLeft from "./sidebarLeft";
import { toastNew } from "./toast";
import PopupMute from "./popups/mute";
<<<<<<< HEAD
=======
import { AppManagers } from "../lib/appManagers/managers";
import positionMenu from "../helpers/positionMenu";
import contextMenuController from "../helpers/contextMenuController";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class DialogsContextMenu {
  private element: HTMLElement;
  private buttons: (ButtonMenuItemOptions & {verify: () => boolean | Promise<boolean>})[];

  private selectedId: PeerId;
  private filterId: number;
  private dialog: Dialog;

  constructor(private managers: AppManagers) {

  }

  private init() {
    this.buttons = [{
      icon: 'unread',
      text: 'MarkAsUnread',
      onClick: this.onUnreadClick,
<<<<<<< HEAD
      verify: () => !appMessagesManager.isDialogUnread(this.dialog)
=======
      verify: async() => !(await this.managers.appMessagesManager.isDialogUnread(this.dialog))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, {
      icon: 'readchats',
      text: 'MarkAsRead',
      onClick: this.onUnreadClick,
<<<<<<< HEAD
      verify: () => appMessagesManager.isDialogUnread(this.dialog)
=======
      verify: () => this.managers.appMessagesManager.isDialogUnread(this.dialog)
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, {
      icon: 'pin',
      text: 'ChatList.Context.Pin',
      onClick: this.onPinClick,
<<<<<<< HEAD
      verify: () => {
        const isPinned = this.filterId > 1 ? appMessagesManager.filtersStorage.getFilter(this.filterId).pinnedPeerIds.includes(this.dialog.peerId) : !!this.dialog.pFlags?.pinned;
=======
      verify: async() => {
        const isPinned = this.filterId > 1 ? 
          (await this.managers.appMessagesManager.getFilter(this.filterId)).pinnedPeerIds.includes(this.dialog.peerId) : 
          !!this.dialog.pFlags?.pinned;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return !isPinned;
      }
    }, {
      icon: 'unpin',
      text: 'ChatList.Context.Unpin',
      onClick: this.onPinClick,
<<<<<<< HEAD
      verify: () => {
        const isPinned = this.filterId > 1 ? appMessagesManager.filtersStorage.getFilter(this.filterId).pinnedPeerIds.includes(this.dialog.peerId) : !!this.dialog.pFlags?.pinned;
=======
      verify: async() => {
        const isPinned = this.filterId > 1 ? 
          (await this.managers.appMessagesManager.getFilter(this.filterId)).pinnedPeerIds.includes(this.dialog.peerId) : 
          !!this.dialog.pFlags?.pinned;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return isPinned;
      }
    }, {
      icon: 'mute',
      text: 'ChatList.Context.Mute',
      onClick: this.onMuteClick,
<<<<<<< HEAD
      verify: () => {
        return this.selectedId !== rootScope.myId && !appNotificationsManager.isPeerLocalMuted(this.dialog.peerId); 
=======
      verify: async() => {
        return this.selectedId !== rootScope.myId && !(await this.managers.appNotificationsManager.isPeerLocalMuted(this.dialog.peerId)); 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }, {
      icon: 'unmute',
      text: 'ChatList.Context.Unmute',
      onClick: this.onUnmuteClick,
<<<<<<< HEAD
      verify: () => {
        return this.selectedId !== rootScope.myId && appNotificationsManager.isPeerLocalMuted(this.dialog.peerId); 
=======
      verify: async() => {
        return this.selectedId !== rootScope.myId && (await this.managers.appNotificationsManager.isPeerLocalMuted(this.dialog.peerId)); 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }, {
      icon: 'archive',
      text: 'Archive',
      onClick: this.onArchiveClick,
      verify: () => this.filterId === 0 && this.selectedId !== rootScope.myId
    }, {
      icon: 'unarchive',
      text: 'Unarchive',
      onClick: this.onArchiveClick,
      verify: () => this.filterId === 1 && this.selectedId !== rootScope.myId
    }, {
      icon: 'delete danger',
      text: 'Delete',
      onClick: this.onDeleteClick,
      verify: () => true
    }];

    this.element = ButtonMenu(this.buttons);
    this.element.id = 'dialogs-contextmenu';
    this.element.classList.add('contextmenu');
    document.getElementById('page-chats').append(this.element);
  }

<<<<<<< HEAD
  private onArchiveClick = () => {
    let dialog = appMessagesManager.getDialogOnly(this.selectedId);
=======
  private onArchiveClick = async() => {
    const dialog = await this.managers.appMessagesManager.getDialogOnly(this.selectedId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(dialog) {
      this.managers.appMessagesManager.editPeerFolders([dialog.peerId], +!dialog.folder_id);
    }
  };

  private onPinClick = () => {
<<<<<<< HEAD
    appMessagesManager.toggleDialogPin(this.selectedId, this.filterId).catch(err => {
=======
    this.managers.appMessagesManager.toggleDialogPin(this.selectedId, this.filterId).catch(async(err) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(err.type === 'PINNED_DIALOGS_TOO_MUCH') {
        if(this.filterId >= 1) {
          toastNew({langPackKey: 'PinFolderLimitReached'});
        } else {
<<<<<<< HEAD
=======
          const config = await this.managers.apiManager.getConfig();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          new PopupPeer('pinned-dialogs-too-much', {
            buttons: [{
              langKey: 'OK',
              isCancel: true
            }, {
              langKey: 'FiltersSetupPinAlert',
              callback: () => {
<<<<<<< HEAD
                new AppChatFoldersTab(appSidebarLeft).open();
              }
            }],
            descriptionLangKey: 'PinToTopLimitReached2',
            descriptionLangArgs: [i18n('Chats', [rootScope.config.pinned_dialogs_count_max])]
=======
                appSidebarLeft.createTab(AppChatFoldersTab);
              }
            }],
            descriptionLangKey: 'PinToTopLimitReached2',
            descriptionLangArgs: [i18n('Chats', [config.pinned_dialogs_count_max])]
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }).show();
        }
      }
    });
  };

  private onUnmuteClick = () => {
<<<<<<< HEAD
    appMessagesManager.togglePeerMute(this.selectedId, false);
=======
    this.managers.appMessagesManager.togglePeerMute(this.selectedId, false);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };
  
  private onMuteClick = () => {
    new PopupMute(this.selectedId);
  };

<<<<<<< HEAD
  private onUnreadClick = () => {
    const dialog = appMessagesManager.getDialogOnly(this.selectedId);
=======
  private onUnreadClick = async() => {
    const selectedId = this.selectedId;
    const dialog = await this.managers.appMessagesManager.getDialogOnly(selectedId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!dialog) return;

    if(dialog.unread_count) {
      this.managers.appMessagesManager.readHistory(selectedId, dialog.top_message);
      this.managers.appMessagesManager.markDialogUnread(selectedId, true);
    } else {
      this.managers.appMessagesManager.markDialogUnread(selectedId);
    }
  };

  private onDeleteClick = () => {
    new PopupDeleteDialog(this.selectedId/* , 'delete' */);
  };

  onContextMenu = (e: MouseEvent | Touch) => {
    if(this.init) {
      this.init();
      this.init = null;
    }

    let li: HTMLElement = null;
    
    try {
      li = findUpTag(e.target, DIALOG_LIST_ELEMENT_TAG);
    } catch(e) {}
    
    if(!li) return;

    if(e instanceof MouseEvent) e.preventDefault();
    if(this.element.classList.contains('active')) {
      return false;
    }
    if(e instanceof MouseEvent) e.cancelBubble = true;

    const r = async() => {
      this.filterId = appDialogsManager.filterId;
      this.selectedId = li.dataset.peerId.toPeerId();
      this.dialog = await this.managers.appMessagesManager.getDialogOnly(this.selectedId);
  
      await Promise.all(this.buttons.map(async(button) => {
        const good = await button.verify();
  
        button.element.classList.toggle('hide', !good);
      }));
  
      // delete button
      this.buttons[this.buttons.length - 1].element.lastChild.replaceWith(i18n(await this.managers.appPeersManager.getDeleteButtonText(this.selectedId)));
  
      li.classList.add('menu-open');
      positionMenu(e, this.element);
      contextMenuController.openBtnMenu(this.element, () => {
        li.classList.remove('menu-open');
        this.selectedId = this.dialog = this.filterId = undefined;
      });
    };

<<<<<<< HEAD
    this.selectedId = li.dataset.peerId.toPeerId();
    this.dialog = appMessagesManager.getDialogOnly(this.selectedId);

    this.buttons.forEach(button => {
      const good = button.verify();

      button.element.classList.toggle('hide', !good);
    });

    // delete button
    this.buttons[this.buttons.length - 1].element.lastChild.replaceWith(i18n(appPeersManager.getDeleteButtonText(this.selectedId)));

    li.classList.add('menu-open');
    positionMenu(e, this.element);
    openBtnMenu(this.element, () => {
      li.classList.remove('menu-open');
      this.selectedId = this.dialog = this.filterId = undefined;
    });
=======
    r();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };
}
