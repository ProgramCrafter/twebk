/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTab } from "../../slider"
import InputField from "../../inputField";
import EditPeer from "../../editPeer";
import { SettingSection } from "../../sidebarLeft";
import Row from "../../row";
import Button from "../../button";
<<<<<<< HEAD
import appChatsManager, { ChatRights } from "../../../lib/appManagers/appChatsManager";
import appProfileManager from "../../../lib/appManagers/appProfileManager";
=======
import { ChatRights } from "../../../lib/appManagers/appChatsManager";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { Chat, ChatFull } from "../../../layer";
import AppChatTypeTab from "./chatType";
import rootScope from "../../../lib/rootScope";
import AppGroupPermissionsTab from "./groupPermissions";
import { i18n, LangPackKey } from "../../../lib/langPack";
import PopupDeleteDialog from "../../popups/deleteDialog";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import toggleDisability from "../../../helpers/dom/toggleDisability";
import CheckboxField from "../../checkboxField";
<<<<<<< HEAD
import appReactionsManager from "../../../lib/appManagers/appReactionsManager";
import AppChatReactionsTab from "./chatReactions";
=======
import AppChatReactionsTab from "./chatReactions";
import hasRights from "../../../lib/appManagers/utils/chats/hasRights";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppEditChatTab extends SliderSuperTab {
  private chatNameInputField: InputField;
  private descriptionInputField: InputField;
  private editPeer: EditPeer;
  private tempId: number;
  public chatId: ChatId;

  protected async _init() {
    // * cleanup prev
    this.listenerSetter.removeAll();
    this.scrollable.container.innerHTML = '';
    this.tempId ??= 0;
    const tempId = ++this.tempId;

    this.container.classList.add('edit-peer-container', 'edit-group-container');
    this.setTitle('Edit');
    
<<<<<<< HEAD
    let chatFull = await appProfileManager.getChatFull(this.chatId, true);

    const chat: Chat.chat | Chat.channel = appChatsManager.getChat(this.chatId);
    const isBroadcast = appChatsManager.isBroadcast(this.chatId);
    const isChannel = appChatsManager.isChannel(this.chatId);
=======
    let chatFull = await this.managers.appProfileManager.getChatFull(this.chatId, true);

    const chat: Chat.chat | Chat.channel = await this.managers.appChatsManager.getChat(this.chatId);
    const isBroadcast = await this.managers.appChatsManager.isBroadcast(this.chatId);
    const isChannel = await this.managers.appChatsManager.isChannel(this.chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    const chatUpdateListeners: (() => void)[] = [];
    const addChatUpdateListener = (callback: () => void) => {
      chatUpdateListeners.push(callback);
    };

    this.listenerSetter.add(rootScope)('chat_update', (chatId) => {
      if(this.chatId === chatId) {
<<<<<<< HEAD
        chatUpdateListeners.forEach(callback => callback());
      }
    });

    this.listenerSetter.add(rootScope)('chat_full_update', (chatId) => {
      if(this.chatId === chatId) {
        chatFull = appProfileManager.getCachedFullChat(chatId) || chatFull;
=======
        chatUpdateListeners.forEach((callback) => callback());
      }
    });

    this.listenerSetter.add(rootScope)('chat_full_update', async(chatId) => {
      if(this.chatId === chatId) {
        chatFull = await this.managers.appProfileManager.getCachedFullChat(chatId) || chatFull;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    });

    const peerId = this.chatId.toPeerId(true);
<<<<<<< HEAD
    const canChangeType = appChatsManager.hasRights(this.chatId, 'change_type');
    const canChangePermissions = appChatsManager.hasRights(this.chatId, 'change_permissions');
=======
    const canChangeType = await this.managers.appChatsManager.hasRights(this.chatId, 'change_type');
    const canChangePermissions = await this.managers.appChatsManager.hasRights(this.chatId, 'change_permissions');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    {
      const section = new SettingSection({noDelimiter: true});
      const inputFields: InputField[] = [];

      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add('input-wrapper');
  
      this.chatNameInputField = new InputField({
        label: isBroadcast ? 'EnterChannelName' : 'CreateGroup.NameHolder',
        name: 'chat-name',
        maxLength: 255,
        required: true
      });
      this.descriptionInputField = new InputField({
        label: 'DescriptionPlaceholder',
        name: 'chat-description',
        maxLength: 255
      });
      
      this.chatNameInputField.setOriginalValue(chat.title);
      this.descriptionInputField.setOriginalValue(chatFull.about);

      inputWrapper.append(this.chatNameInputField.container, this.descriptionInputField.container);
      
      inputFields.push(this.chatNameInputField, this.descriptionInputField);

      this.editPeer = new EditPeer({
        peerId,
        inputFields,
        listenerSetter: this.listenerSetter
      });
      this.content.append(this.editPeer.nextBtn);

      section.content.append(this.editPeer.avatarEdit.container, inputWrapper);
    
      if(canChangeType) {
        const chatTypeRow = new Row({
          titleLangKey: isBroadcast ? 'ChannelType' : 'GroupType',
          clickable: () => {
<<<<<<< HEAD
            const tab = new AppChatTypeTab(this.slider);
=======
            const tab = this.slider.createTab(AppChatTypeTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            tab.chatId = this.chatId;
            tab.chatFull = chatFull;
            tab.open();

            this.listenerSetter.add(tab.eventListener)('destroy', setChatTypeSubtitle);
          },
<<<<<<< HEAD
          icon: 'lock'
=======
          icon: 'lock',
          listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        });

        const setChatTypeSubtitle = () => {
          chatTypeRow.subtitle.textContent = '';

          let key: LangPackKey;
          if(isBroadcast) {
            key = (chat as Chat.channel).username ? 'TypePublic' : 'TypePrivate';
          } else {
            key = (chat as Chat.channel).username ? 'TypePublicGroup' : 'TypePrivateGroup';
          }

          chatTypeRow.subtitle.append(i18n(key));
        };

        setChatTypeSubtitle();
        section.content.append(chatTypeRow.container);
      }

      if(canChangeType || canChangePermissions) {
        const reactionsRow = new Row({
          titleLangKey: 'Reactions',
          icon: 'reactions',
          clickable: () => {
<<<<<<< HEAD
            const tab = new AppChatReactionsTab(this.slider);
=======
            const tab = this.slider.createTab(AppChatReactionsTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            tab.chatId = this.chatId;
            tab.open().then(() => {
              if(this.tempId !== tempId) {
                return;
              }
              
              this.listenerSetter.add(tab.eventListener)('destroy', setReactionsLength);
            });
<<<<<<< HEAD
          }
        });

        const availableReactions = await appReactionsManager.getAvailableReactions();
        const availableReactionsLength = availableReactions.filter(availableReaction => !availableReaction.pFlags.inactive).length;
=======
          },
          listenerSetter: this.listenerSetter
        });

        const availableReactions = await this.managers.appReactionsManager.getAvailableReactions();
        const availableReactionsLength = availableReactions.filter((availableReaction) => !availableReaction.pFlags.inactive).length;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const setReactionsLength = () => {
          const reactions = chatFull.available_reactions ?? [];
          reactionsRow.subtitle.innerHTML = reactions.length + '/' + availableReactionsLength;
        };

        setReactionsLength();

        section.content.append(reactionsRow.container);
      }

      if(canChangePermissions && !isBroadcast) {
        const flags = [
          'send_messages',
          'send_media',
          'send_stickers',
          'send_polls',
          'embed_links',
          'invite_users',
          'pin_messages',
          'change_info'
        ] as ChatRights[];

        const permissionsRow = new Row({
          titleLangKey: 'ChannelPermissions',
          clickable: () => {
<<<<<<< HEAD
            const tab = new AppGroupPermissionsTab(this.slider);
=======
            const tab = this.slider.createTab(AppGroupPermissionsTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            tab.chatId = this.chatId;
            tab.open();
          },
          icon: 'permissions',
<<<<<<< HEAD
        });

        const setPermissionsLength = () => {
          permissionsRow.subtitle.innerHTML = flags.reduce((acc, f) => acc + +appChatsManager.hasRights(this.chatId, f, chat.default_banned_rights), 0) + '/' + flags.length;
=======
          listenerSetter: this.listenerSetter
        });

        const setPermissionsLength = async() => {
          const chat = await this.managers.appChatsManager.getChatTyped(this.chatId);
          permissionsRow.subtitle.innerHTML = flags.reduce((acc, f) => acc + +hasRights(chat, f, (chat as Chat.chat).default_banned_rights), 0) + '/' + flags.length;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        };

        setPermissionsLength();        
        section.content.append(permissionsRow.container);

        this.listenerSetter.add(rootScope)('chat_update', (chatId) => {
          if(this.chatId === chatId) {
            setPermissionsLength();
          }
        });
      }

      /* const administratorsRow = new Row({
        titleLangKey: 'PeerInfo.Administrators',
        subtitle: '' + ((chatFull as ChatFull.channelFull).admins_count || 1),
        icon: 'admin',
        clickable: true
      });

      section.content.append(administratorsRow.container); */

      this.scrollable.append(section.container);

      attachClickEvent(this.editPeer.nextBtn, () => {
        this.editPeer.nextBtn.disabled = true;
  
        let promises: Promise<any>[] = [];

        const id = this.chatId;
        if(this.chatNameInputField.isValidToChange()) {
<<<<<<< HEAD
          promises.push(appChatsManager.editTitle(id, this.chatNameInputField.value));
        }

        if(this.descriptionInputField.isValidToChange()) {
          promises.push(appChatsManager.editAbout(id, this.descriptionInputField.value));
        }

        if(this.editPeer.uploadAvatar) {
          promises.push(this.editPeer.uploadAvatar().then(inputFile => {
            return appChatsManager.editPhoto(id, inputFile);
=======
          promises.push(this.managers.appChatsManager.editTitle(id, this.chatNameInputField.value));
        }

        if(this.descriptionInputField.isValidToChange()) {
          promises.push(this.managers.appChatsManager.editAbout(id, this.descriptionInputField.value));
        }

        if(this.editPeer.uploadAvatar) {
          promises.push(this.editPeer.uploadAvatar().then((inputFile) => {
            return this.managers.appChatsManager.editPhoto(id, inputFile);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }));
        }
  
        Promise.race(promises).finally(() => {
          this.editPeer.nextBtn.removeAttribute('disabled');
          this.close();
        });
      }, {listenerSetter: this.listenerSetter});

      
      /* if(appChatsManager.hasRights(-this.peerId, 'change_info')) {
        const discussionRow = new Row({
          titleLangKey: 'PeerInfo.Discussion',
          subtitleLangKey: 'PeerInfo.Discussion.Add',
          clickable: true,
          icon: 'message'
        });

        section.content.append(discussionRow.container);
      }

      const administratorsRow = new Row({
        titleLangKey: 'PeerInfo.Administrators',
        subtitle: '' + chatFull.admins_count,
        icon: 'admin',
        clickable: true
      });

      section.content.append(administratorsRow.container); */

<<<<<<< HEAD
      if(isBroadcast && appChatsManager.hasRights(this.chatId, 'change_info')) {
=======
      if(isBroadcast && await this.managers.appChatsManager.hasRights(this.chatId, 'change_info')) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const signMessagesCheckboxField = new CheckboxField({
          text: 'PeerInfo.SignMessages',
          checked: !!(chat as Chat.channel).pFlags.signatures,
          withRipple: true
        });

        this.listenerSetter.add(signMessagesCheckboxField.input)('change', () => {
          const toggle = signMessagesCheckboxField.toggleDisability(true);
<<<<<<< HEAD
          appChatsManager.toggleSignatures(this.chatId, signMessagesCheckboxField.checked).then(() => {
=======
          this.managers.appChatsManager.toggleSignatures(this.chatId, signMessagesCheckboxField.checked).then(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            toggle();
          });
        });

        addChatUpdateListener(() => {
          signMessagesCheckboxField.setValueSilently(!!(chat as Chat.channel).pFlags.signatures);
        });

        section.content.append(signMessagesCheckboxField.label);
      }
    }

    if(!isBroadcast) {
      const section = new SettingSection({

      });

      /* const membersRow = new Row({
        titleLangKey: isBroadcast ? 'PeerInfo.Subscribers' : 'GroupMembers',
        icon: 'newgroup',
        clickable: true
      });

      membersRow.subtitle.append(i18n('Subscribers', [numberThousandSplitter(335356)]));

      section.content.append(membersRow.container); */

      if(!isBroadcast && canChangeType) {
        const showChatHistoryCheckboxField = new CheckboxField({
          text: 'ChatHistory',
          withRipple: true
        });

        this.listenerSetter.add(showChatHistoryCheckboxField.input)('change', () => {
          const toggle = showChatHistoryCheckboxField.toggleDisability(true);
<<<<<<< HEAD
          appChatsManager.togglePreHistoryHidden(this.chatId, !showChatHistoryCheckboxField.checked).then(() => {
=======
          this.managers.appChatsManager.togglePreHistoryHidden(this.chatId, !showChatHistoryCheckboxField.checked).then(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            toggle();
          });
        });

        // ! it won't be updated because chatFull will be old
        const onChatUpdate = () => {
          showChatHistoryCheckboxField.setValueSilently(isChannel && !(chatFull as ChatFull.channelFull).pFlags.hidden_prehistory);
        };

        onChatUpdate();
        addChatUpdateListener(onChatUpdate);
  
        section.content.append(showChatHistoryCheckboxField.label);
      }

      if(section.content.childElementCount) {
        this.scrollable.append(section.container);
      }
    }

<<<<<<< HEAD
    if(appChatsManager.hasRights(this.chatId, 'delete_chat')) {
=======
    if(await this.managers.appChatsManager.hasRights(this.chatId, 'delete_chat')) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const section = new SettingSection({});

      const btnDelete = Button('btn-primary btn-transparent danger', {icon: 'delete', text: isBroadcast ? 'PeerInfo.DeleteChannel' : 'DeleteAndExitButton'});

      attachClickEvent(btnDelete, () => {
        new PopupDeleteDialog(peerId/* , 'delete' */, undefined, (promise) => {
          const toggle = toggleDisability([btnDelete], true);
          promise.then(() => {
            this.close();
          }, () => {
            toggle();
          });
        });
      }, {listenerSetter: this.listenerSetter});

      section.content.append(btnDelete);

      this.scrollable.append(section.container);
    }

    if(!isChannel) {
      // ! this one will fire earlier than tab's closeAfterTimeout (destroy) event and listeners will be erased, so destroy won't fire
      this.listenerSetter.add(rootScope)('dialog_migrate', ({migrateFrom, migrateTo}) => {
        if(peerId === migrateFrom) {
          this.chatId = migrateTo.toChatId();
          this._init();
        }
      });
    }
  }

  protected init() {
    return this._init();
  }
}
