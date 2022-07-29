/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTab } from "../../slider";
import appDialogsManager from "../../../lib/appManagers/appDialogsManager";
<<<<<<< HEAD
import appUsersManager from "../../../lib/appManagers/appUsersManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import InputSearch from "../../inputSearch";
import { IS_MOBILE } from "../../../environment/userAgent";
import { canFocus } from "../../../helpers/dom/canFocus";
import windowSize from "../../../helpers/windowSize";
import ButtonCorner from "../../buttonCorner";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import PopupCreateContact from "../../popups/createContact";
import SortedUserList from "../../sortedUserList";
import { getMiddleware } from "../../../helpers/middleware";
import replaceContent from "../../../helpers/dom/replaceContent";
import rootScope from "../../../lib/rootScope";
<<<<<<< HEAD
=======
import PopupElement from "../../popups";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

// TODO: поиск по людям глобальный, если не нашло в контактах никого

export default class AppContactsTab extends SliderSuperTab {
  private inputSearch: InputSearch;
  private middleware: ReturnType<typeof getMiddleware>;
  private sortedUserList: SortedUserList;
  
  protected init() {
    this.container.id = 'contacts-container';

    // this.list = appDialogsManager.createChatList(/* {avatarSize: 48, handheldsSize: 66} */);

    const btnAdd = ButtonCorner({icon: 'add', className: 'is-visible'});
    this.content.append(btnAdd);

    attachClickEvent(btnAdd, () => {
<<<<<<< HEAD
      new PopupCreateContact();
=======
      PopupElement.createPopup(PopupCreateContact);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, {listenerSetter: this.listenerSetter});

    this.inputSearch = new InputSearch('Search', (value) => {
      this.openContacts(value);
    });

<<<<<<< HEAD
    this.listenerSetter.add(rootScope)('contacts_update', (userId) => {
      const isContact = appUsersManager.isContact(userId);
=======
    this.listenerSetter.add(rootScope)('contacts_update', async(userId) => {
      const isContact = await this.managers.appUsersManager.isContact(userId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const peerId = userId.toPeerId();
      if(isContact) this.sortedUserList.add(peerId);
      else this.sortedUserList.delete(peerId);
    });

    this.title.replaceWith(this.inputSearch.container);

    this.middleware = getMiddleware();

    // preload contacts
    // appUsersManager.getContacts();
  }

  protected createList() {
<<<<<<< HEAD
    const sortedUserList = new SortedUserList();
=======
    const sortedUserList = new SortedUserList({
      managers: this.managers
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const list = sortedUserList.list;
    list.id = 'contacts';
    list.classList.add('contacts-container');
    appDialogsManager.setListClickListener(list, () => {
      this.close();
    }, undefined, true);
    return sortedUserList;
  }

  protected onClose() {
    this.middleware.clean();
    /* // need to clear, and left 1 page for smooth slide
    let pageCount = appPhotosManager.windowH / 72 * 1.25 | 0;
<<<<<<< HEAD
    (Array.from(this.list.children) as HTMLElement[]).slice(pageCount).forEach(el => el.remove()); */
=======
    (Array.from(this.list.children) as HTMLElement[]).slice(pageCount).forEach((el) => el.remove()); */
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  protected onOpenAfterTimeout() {
    if(IS_MOBILE || !canFocus(true)) return;
    this.inputSearch.input.focus();
  }

  public openContacts(query?: string) {
    if(this.init) {
      this.init();
      this.init = null;
    }

    this.middleware.clean();
    const middleware = this.middleware.get();
    this.scrollable.onScrolledBottom = null;
    this.scrollable.container.textContent = '';

<<<<<<< HEAD
    appUsersManager.getContactsPeerIds(query, undefined, 'online').then(contacts => {
=======
    this.managers.appUsersManager.getContactsPeerIds(query, undefined, 'online').then((contacts) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!middleware()) {
        return;
      }

      const sortedUserList = this.sortedUserList = this.createList();

      let renderPage = () => {
        const pageCount = windowSize.height / 72 * 1.25 | 0;
        const arr = contacts.splice(0, pageCount); // надо splice!

        arr.forEach((peerId) => {
          sortedUserList.add(peerId);
        });

        if(!contacts.length) {
          renderPage = undefined;
          this.scrollable.onScrolledBottom = null;
        }
      };

      renderPage();
      this.scrollable.onScrolledBottom = () => {
        if(renderPage) {
          renderPage();
        } else {
          this.scrollable.onScrolledBottom = null;
        }
      };

      replaceContent(this.scrollable.container, sortedUserList.list);
    });
  }

  public open() {
    this.openContacts();
    return super.open();
  }
}
