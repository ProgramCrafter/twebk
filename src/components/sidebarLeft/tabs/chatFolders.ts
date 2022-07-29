/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTab } from "../../slider";
import lottieLoader, { LottieLoader } from "../../../lib/rlottie/lottieLoader";
<<<<<<< HEAD
import { RichTextProcessor } from "../../../lib/richtextprocessor";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { toast } from "../../toast";
import type { MyDialogFilter } from "../../../lib/storages/filters";
import type { DialogFilterSuggested, DialogFilter } from "../../../layer";
import type _rootScope from "../../../lib/rootScope";
import Button from "../../button";
<<<<<<< HEAD
import appMessagesManager from "../../../lib/appManagers/appMessagesManager";
import appPeersManager from "../../../lib/appManagers/appPeersManager";
import apiManager from "../../../lib/mtproto/mtprotoworker";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../../lib/rootScope";
import AppEditFolderTab from "./editFolder";
import Row from "../../row";
import { SettingSection } from "..";
import { i18n, i18n_, LangPackKey, join } from "../../../lib/langPack";
import cancelEvent from "../../../helpers/dom/cancelEvent";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import positionElementByIndex from "../../../helpers/dom/positionElementByIndex";
import RLottiePlayer from "../../../lib/rlottie/rlottiePlayer";
<<<<<<< HEAD
=======
import wrapEmojiText from "../../../lib/richTextProcessor/wrapEmojiText";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppChatFoldersTab extends SliderSuperTab {
  private createFolderBtn: HTMLElement;
  private foldersSection: SettingSection;
  private suggestedSection: SettingSection;
  private stickerContainer: HTMLElement;
  private animation: RLottiePlayer;

  private filtersRendered: {[filterId: number]: Row} = {};
  private loadAnimationPromise: ReturnType<LottieLoader['waitForFirstFrame']>;

<<<<<<< HEAD
  private renderFolder(dialogFilter: DialogFilterSuggested | DialogFilter | MyDialogFilter, container?: HTMLElement, row?: Row) {
    let filter: DialogFilter | MyDialogFilter;
    let description = '';
    let d: HTMLElement[] = [];
    if(dialogFilter._ === 'dialogFilterSuggested') {
      filter = dialogFilter.filter;
=======
  private async renderFolder(dialogFilter: DialogFilterSuggested | MyDialogFilter, container?: HTMLElement, row?: Row) {
    let filter: MyDialogFilter;
    let description = '';
    let d: HTMLElement[] = [];
    if(dialogFilter._ === 'dialogFilterSuggested') {
      filter = dialogFilter.filter as MyDialogFilter;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      description = dialogFilter.description;
    } else {
      filter = dialogFilter;

      let enabledFilters = Object.keys(filter.pFlags).length;
<<<<<<< HEAD
      /* (['include_peers', 'exclude_peers'] as ['include_peers', 'exclude_peers']).forEach(key => {
=======
      /* (['include_peers', 'exclude_peers'] as ['include_peers', 'exclude_peers']).forEach((key) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        enabledFilters += +!!filter[key].length;
      }); */
      
      if(enabledFilters === 1) {
        const pFlags = filter.pFlags;
        let k: LangPackKey;
        if(pFlags.contacts) k = 'FilterAllContacts';
        else if(pFlags.non_contacts) k = 'FilterAllNonContacts';
        else if(pFlags.groups) k = 'FilterAllGroups';
        else if(pFlags.broadcasts) k = 'FilterAllChannels';
        else if(pFlags.bots) k = 'FilterAllBots';

        if(k) {
          d.push(i18n(k));
        }
      }
      
      if(!d.length) {
<<<<<<< HEAD
        const folder = appMessagesManager.dialogsStorage.getFolderDialogs(filter.id);
        let chats = 0, channels = 0, groups = 0;
        for(const dialog of folder) {
          if(appPeersManager.isAnyGroup(dialog.peerId)) groups++;
          else if(appPeersManager.isBroadcast(dialog.peerId)) channels++;
          else chats++;
        }
=======
        const folder = await this.managers.dialogsStorage.getFolderDialogs(filter.id);
        let chats = 0, channels = 0, groups = 0;
        await Promise.all(folder.map(async(dialog) => {
          if(await this.managers.appPeersManager.isAnyGroup(dialog.peerId)) groups++;
          else if(await this.managers.appPeersManager.isBroadcast(dialog.peerId)) channels++;
          else chats++;
        }));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        if(chats) d.push(i18n('Chats', [chats]));
        if(channels) d.push(i18n('Channels', [channels]));
        if(groups) d.push(i18n('Groups', [groups]));
      }
    }

    let div: HTMLElement;
    if(!row) {
      row = new Row({
<<<<<<< HEAD
        title: RichTextProcessor.wrapEmojiText(filter.title),
=======
        title: wrapEmojiText(filter.title),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        subtitle: description,
        clickable: true
      });

      if(d.length) {
<<<<<<< HEAD
        join(d).forEach(el => {
=======
        join(d).forEach((el) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          row.subtitle.append(el);
        });
      }
  
      if(dialogFilter._ === 'dialogFilter') {
        const filterId = filter.id;
        if(!this.filtersRendered.hasOwnProperty(filter.id)) {
<<<<<<< HEAD
          attachClickEvent(row.container, () => {
            new AppEditFolderTab(this.slider).open(appMessagesManager.filtersStorage.getFilter(filterId));
=======
          attachClickEvent(row.container, async() => {
            this.slider.createTab(AppEditFolderTab).open(await this.managers.filtersStorage.getFilter(filterId));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }, {listenerSetter: this.listenerSetter});
        }

        this.filtersRendered[filter.id] = row;
      }
    } else {
      row.subtitle.textContent = '';
<<<<<<< HEAD
      join(d).forEach(el => {
=======
      join(d).forEach((el) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        row.subtitle.append(el);
      });
    }

    div = row.container;

    if((filter as MyDialogFilter).hasOwnProperty('orderIndex')) {
       // ! header will be at 0 index
      positionElementByIndex(div, div.parentElement || container, (filter as MyDialogFilter).orderIndex);
    } else if(container) container.append(div);
    
    return div;
  }

  protected async init() {
    this.container.classList.add('chat-folders-container');
    this.setTitle('ChatList.Filter.List.Title');

    this.scrollable.container.classList.add('chat-folders');

    this.stickerContainer = document.createElement('div');
    this.stickerContainer.classList.add('sticker-container');
    
    const caption = document.createElement('div');
    caption.classList.add('caption');
    i18n_({element: caption, key: 'ChatList.Filter.Header'});
    
    this.createFolderBtn = Button('btn-primary btn-color-primary btn-control tgico', {
      text: 'ChatList.Filter.NewTitle',
      icon: 'add'
    });

    this.foldersSection = new SettingSection({
      name: 'Filters'
    });
    this.foldersSection.container.style.display = 'none';

    this.suggestedSection = new SettingSection({
      name: 'FilterRecommended'
    });
    this.suggestedSection.container.style.display = 'none';

    this.scrollable.append(this.stickerContainer, caption, this.createFolderBtn, this.foldersSection.container, this.suggestedSection.container);

<<<<<<< HEAD
    attachClickEvent(this.createFolderBtn, () => {
      if(Object.keys(this.filtersRendered).length >= 10) {
        toast('Sorry, you can\'t create more folders.');
      } else {
        new AppEditFolderTab(this.slider).open();
=======
    attachClickEvent(this.createFolderBtn, async() => {
      const appConfig = await this.managers.apiManager.getAppConfig();
      if(Object.keys(this.filtersRendered).length >= (rootScope.premium ? appConfig.dialog_filters_limit_premium : appConfig.dialog_filters_limit_default)) {
        toast('Sorry, you can\'t create more folders.');
      } else {
        this.slider.createTab(AppEditFolderTab).open();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }, {listenerSetter: this.listenerSetter});

    const onFiltersContainerUpdate = () => {
      this.foldersSection.container.style.display = Object.keys(this.filtersRendered).length ? '' : 'none';
    };

<<<<<<< HEAD
    appMessagesManager.filtersStorage.getDialogFilters().then(filters => {
      for(const filter of filters) {
        this.renderFolder(filter, this.foldersSection.content);
=======
    this.managers.filtersStorage.getDialogFilters().then(async(filters) => {
      for(const filter of filters) {
        await this.renderFolder(filter, this.foldersSection.content);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      onFiltersContainerUpdate();
    });

<<<<<<< HEAD
    this.listenerSetter.add(rootScope)('filter_update', (filter) => {
      if(this.filtersRendered.hasOwnProperty(filter.id)) {
        this.renderFolder(filter, null, this.filtersRendered[filter.id]);
      } else {
        this.renderFolder(filter, this.foldersSection.content);
=======
    this.listenerSetter.add(rootScope)('filter_update', async(filter) => {
      if(this.filtersRendered.hasOwnProperty(filter.id)) {
        await this.renderFolder(filter, null, this.filtersRendered[filter.id]);
      } else {
        await this.renderFolder(filter, this.foldersSection.content);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }

      onFiltersContainerUpdate();

      this.getSuggestedFilters();
    });

    this.listenerSetter.add(rootScope)('filter_delete', (filter) => {
      if(this.filtersRendered.hasOwnProperty(filter.id)) {
        /* for(const suggested of this.suggestedFilters) {
          if(deepEqual(suggested.filter, filter)) {
            
          }
        } */
        this.getSuggestedFilters();

        this.filtersRendered[filter.id].container.remove();
        delete this.filtersRendered[filter.id];
      }

      onFiltersContainerUpdate();
    });

    this.listenerSetter.add(rootScope)('filter_order', (order) => {
      order.forEach((filterId, idx) => {
        const container = this.filtersRendered[filterId].container;
        positionElementByIndex(container, container.parentElement, idx + 1); // ! + 1 due to header 
      });
    });

    this.loadAnimationPromise = lottieLoader.loadAnimationAsAsset({
      container: this.stickerContainer,
      loop: false,
      autoplay: false,
      width: 86,
      height: 86
<<<<<<< HEAD
    }, 'Folders_1').then(player => {
=======
    }, 'Folders_1').then((player) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.animation = player;

      return lottieLoader.waitForFirstFrame(player);
    });

    this.getSuggestedFilters()

    /* return Promise.all([
      this.loadAnimationPromise
    ]); */
    return this.loadAnimationPromise;
  }

  onOpenAfterTimeout() {
    this.loadAnimationPromise.then(() => {
      this.animation.autoplay = true;
      this.animation.play();
    });
  }

  private getSuggestedFilters() {
<<<<<<< HEAD
    return apiManager.invokeApi('messages.getSuggestedDialogFilters').then(suggestedFilters => {
      this.suggestedSection.container.style.display = suggestedFilters.length ? '' : 'none';
      Array.from(this.suggestedSection.content.children).slice(1).forEach(el => el.remove());

      suggestedFilters.forEach(filter => {
        const div = this.renderFolder(filter);
=======
    return this.managers.filtersStorage.getSuggestedDialogsFilters().then(async(suggestedFilters) => {
      this.suggestedSection.container.style.display = suggestedFilters.length ? '' : 'none';
      Array.from(this.suggestedSection.content.children).slice(1).forEach((el) => el.remove());

      for(const filter of suggestedFilters) {
        const div = await this.renderFolder(filter);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const button = Button('btn-primary btn-color-primary', {text: 'Add'});
        div.append(button);
        this.suggestedSection.content.append(div);

        attachClickEvent(button, (e) => {
          cancelEvent(e);

          if(Object.keys(this.filtersRendered).length >= 10) {
            toast('Sorry, you can\'t create more folders.');
            return;
          }

          button.setAttribute('disabled', 'true');

          const f = filter.filter as MyDialogFilter;
          f.includePeerIds = [];
          f.excludePeerIds = [];
          f.pinnedPeerIds = [];

<<<<<<< HEAD
          appMessagesManager.filtersStorage.createDialogFilter(f, true).then(bool => {
=======
          this.managers.filtersStorage.createDialogFilter(f, true).then((bool) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            if(bool) {
              div.remove();
            }
          }).finally(() => {
            button.removeAttribute('disabled');
          });
        }, {listenerSetter: this.listenerSetter});
<<<<<<< HEAD
      });
=======
      }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }
}
