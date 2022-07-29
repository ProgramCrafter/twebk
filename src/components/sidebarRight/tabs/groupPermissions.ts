/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import findUpTag from "../../../helpers/dom/findUpTag";
import replaceContent from "../../../helpers/dom/replaceContent";
import ListenerSetter from "../../../helpers/listenerSetter";
import ScrollableLoader from "../../../helpers/scrollableLoader";
import { ChannelParticipant, Chat, ChatBannedRights, Update } from "../../../layer";
<<<<<<< HEAD
import appChatsManager, { ChatRights } from "../../../lib/appManagers/appChatsManager";
import appDialogsManager from "../../../lib/appManagers/appDialogsManager";
import appPeersManager from "../../../lib/appManagers/appPeersManager";
import appProfileManager from "../../../lib/appManagers/appProfileManager";
=======
import { ChatRights } from "../../../lib/appManagers/appChatsManager";
import appDialogsManager, { DIALOG_LIST_ELEMENT_TAG } from "../../../lib/appManagers/appDialogsManager";
import { AppManagers } from "../../../lib/appManagers/managers";
import combineParticipantBannedRights from "../../../lib/appManagers/utils/chats/combineParticipantBannedRights";
import hasRights from "../../../lib/appManagers/utils/chats/hasRights";
import getPeerId from "../../../lib/appManagers/utils/peers/getPeerId";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import I18n, { i18n, join, LangPackKey } from "../../../lib/langPack";
import rootScope from "../../../lib/rootScope";
import CheckboxField from "../../checkboxField";
import PopupPickUser from "../../popups/pickUser";
import Row from "../../row";
import { SettingSection } from "../../sidebarLeft";
import { SliderSuperTabEventable } from "../../sliderTab";
import { toast } from "../../toast";
import AppUserPermissionsTab from "./userPermissions";

export class ChatPermissions {
  public v: Array<{
    flags: ChatRights[],
    text: LangPackKey,
    exceptionText: LangPackKey,
    checkboxField?: CheckboxField,
  }>;
  private toggleWith: Partial<{[chatRight in ChatRights]: ChatRights[]}>;

<<<<<<< HEAD
  constructor(options: {
=======
  constructor(private options: {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    chatId: ChatId,
    listenerSetter: ListenerSetter,
    appendTo: HTMLElement,
    participant?: ChannelParticipant.channelParticipantBanned
<<<<<<< HEAD
  }) {
=======
  }, private managers: AppManagers) {
    this.construct();
  }

  public async construct() {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.v = [
      {flags: ['send_messages'], text: 'UserRestrictionsSend', exceptionText: 'UserRestrictionsNoSend'},
      {flags: ['send_media'], text: 'UserRestrictionsSendMedia', exceptionText: 'UserRestrictionsNoSendMedia'},
      {flags: ['send_stickers', 'send_gifs'], text: 'UserRestrictionsSendStickers', exceptionText: 'UserRestrictionsNoSendStickers'},
      {flags: ['send_polls'], text: 'UserRestrictionsSendPolls', exceptionText: 'UserRestrictionsNoSendPolls'},
      {flags: ['embed_links'], text: 'UserRestrictionsEmbedLinks', exceptionText: 'UserRestrictionsNoEmbedLinks'},
      {flags: ['invite_users'], text: 'UserRestrictionsInviteUsers', exceptionText: 'UserRestrictionsNoInviteUsers'},
      {flags: ['pin_messages'], text: 'UserRestrictionsPinMessages', exceptionText: 'UserRestrictionsNoPinMessages'},
      {flags: ['change_info'], text: 'UserRestrictionsChangeInfo', exceptionText: 'UserRestrictionsNoChangeInfo'}
    ];

    this.toggleWith = {
      'send_messages': ['send_media', 'send_stickers', 'send_polls', 'embed_links']
    };

<<<<<<< HEAD
    const chat: Chat.chat | Chat.channel = appChatsManager.getChat(options.chatId);
    const defaultBannedRights = chat.default_banned_rights;
    const rights = options.participant ? appChatsManager.combineParticipantBannedRights(options.chatId, options.participant.banned_rights) : defaultBannedRights;
=======
    const options = this.options;
    const chat: Chat.chat | Chat.channel = await this.managers.appChatsManager.getChat(options.chatId);
    const defaultBannedRights = chat.default_banned_rights;
    const rights = options.participant ? combineParticipantBannedRights(chat as Chat.channel, options.participant.banned_rights) : defaultBannedRights;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    
    const restrictionText: LangPackKey = options.participant ? 'UserRestrictionsDisabled' : 'EditCantEditPermissionsPublic';
    for(const info of this.v) {
      const mainFlag = info.flags[0];
      info.checkboxField = new CheckboxField({
        text: info.text,
<<<<<<< HEAD
        checked: appChatsManager.hasRights(options.chatId, mainFlag, rights),
=======
        checked: hasRights(chat, mainFlag, rights),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        restriction: true,
        withRipple: true
      });

      if((
          options.participant && 
          defaultBannedRights.pFlags[mainFlag as keyof typeof defaultBannedRights['pFlags']]
        ) || (
          (chat as Chat.channel).username &&
          (
            info.flags.includes('pin_messages') ||
            info.flags.includes('change_info')
          )
        )
      ) {
        info.checkboxField.input.disabled = true;
        
        /* options.listenerSetter.add(info.checkboxField.input)('change', (e) => {
          if(!e.isTrusted) {
            return;
          }

          cancelEvent(e);
          toast('This option is disabled for all members in Group Permissions.');
          info.checkboxField.checked = false;
        }); */

        attachClickEvent(info.checkboxField.label, (e) => {
          toast(I18n.format(restrictionText, true));
        }, {listenerSetter: options.listenerSetter});
      }

      if(this.toggleWith[mainFlag]) {
        options.listenerSetter.add(info.checkboxField.input)('change', () => {
          if(!info.checkboxField.checked) {
<<<<<<< HEAD
            const other = this.v.filter(i => this.toggleWith[mainFlag].includes(i.flags[0]));
            other.forEach(info => {
=======
            const other = this.v.filter((i) => this.toggleWith[mainFlag].includes(i.flags[0]));
            other.forEach((info) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              info.checkboxField.checked = false;
            });
          }
        });
      }

      options.appendTo.append(info.checkboxField.label);
    }
  }

  public takeOut() {
    const rights: ChatBannedRights = {
      _: 'chatBannedRights',
      until_date: 0x7FFFFFFF,
      pFlags: {}
    };

    for(const info of this.v) {
      const banned = !info.checkboxField.checked;
      if(banned) {
<<<<<<< HEAD
        info.flags.forEach(flag => {
=======
        info.flags.forEach((flag) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          // @ts-ignore
          rights.pFlags[flag] = true;
        });
      }
    }

    return rights;
  }
}

export default class AppGroupPermissionsTab extends SliderSuperTabEventable {
  public chatId: ChatId;

  protected async init() {
    this.container.classList.add('edit-peer-container', 'group-permissions-container');
    this.setTitle('ChannelPermissions');

    let chatPermissions: ChatPermissions;
    {
      const section = new SettingSection({
        name: 'ChannelPermissionsHeader',
      });

      chatPermissions = new ChatPermissions({
        chatId: this.chatId,
        listenerSetter: this.listenerSetter,
        appendTo: section.content,
<<<<<<< HEAD
      });

      this.eventListener.addEventListener('destroy', () => {
        appChatsManager.editChatDefaultBannedRights(this.chatId, chatPermissions.takeOut());
=======
      }, this.managers);

      this.eventListener.addEventListener('destroy', () => {
        this.managers.appChatsManager.editChatDefaultBannedRights(this.chatId, chatPermissions.takeOut());
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }, {once: true});

      this.scrollable.append(section.container);
    }
    
    {
      const section = new SettingSection({
        name: 'PrivacyExceptions'
      });

      const addExceptionRow = new Row({
        titleLangKey: 'ChannelAddException',
        subtitleLangKey: 'Loading',
        icon: 'adduser',
        clickable: () => {
          new PopupPickUser({
            peerTypes: ['channelParticipants'],
            onSelect: (peerId) => {
              setTimeout(() => {
                openPermissions(peerId);
              }, 0);
            },
            placeholder: 'ExceptionModal.Search.Placeholder',
            peerId: -this.chatId,
          });
<<<<<<< HEAD
        }
=======
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const openPermissions = async(peerId: PeerId) => {
        let participant: AppUserPermissionsTab['participant'];
        try {
<<<<<<< HEAD
          participant = await appProfileManager.getChannelParticipant(this.chatId, peerId) as any;
=======
          participant = await this.managers.appProfileManager.getChannelParticipant(this.chatId, peerId) as any;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        } catch(err) {
          toast('User is no longer participant');
          return;
        }

<<<<<<< HEAD
        const tab = new AppUserPermissionsTab(this.slider);
=======
        const tab = this.slider.createTab(AppUserPermissionsTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        tab.participant = participant;
        tab.chatId = this.chatId;
        tab.userId = peerId;
        tab.open();
      };

      section.content.append(addExceptionRow.container);

      /* const removedUsersRow = new Row({
        titleLangKey: 'ChannelBlockedUsers',
        subtitleLangKey: 'NoBlockedUsers',
        icon: 'deleteuser',
        clickable: true
      });

      section.content.append(removedUsersRow.container); */

      const c = section.generateContentElement();
      c.classList.add('chatlist-container');
      
      const list = appDialogsManager.createChatList({new: true});
      c.append(list);

      attachClickEvent(list, (e) => {
<<<<<<< HEAD
        const target = findUpTag(e.target, 'LI');
=======
        const target = findUpTag(e.target, DIALOG_LIST_ELEMENT_TAG);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(!target) return;

        const peerId = target.dataset.peerId.toPeerId();
        openPermissions(peerId);
      }, {listenerSetter: this.listenerSetter});

<<<<<<< HEAD
      const setSubtitle = (li: Element, participant: ChannelParticipant.channelParticipantBanned) => {
        const bannedRights = participant.banned_rights;//appChatsManager.combineParticipantBannedRights(this.chatId, participant.banned_rights);
        const defaultBannedRights = (appChatsManager.getChat(this.chatId) as Chat.channel).default_banned_rights;
        //const combinedRights = appChatsManager.combineParticipantBannedRights(this.chatId, bannedRights);

        const cantWhat: LangPackKey[] = []/* , canWhat: LangPackKey[] = [] */;
        chatPermissions.v.forEach(info => {
=======
      const setSubtitle = async(li: Element, participant: ChannelParticipant.channelParticipantBanned) => {
        const bannedRights = participant.banned_rights;//appChatsManager.combineParticipantBannedRights(this.chatId, participant.banned_rights);
        const defaultBannedRights = ((await this.managers.appChatsManager.getChat(this.chatId)) as Chat.channel).default_banned_rights;
        //const combinedRights = appChatsManager.combineParticipantBannedRights(this.chatId, bannedRights);

        const cantWhat: LangPackKey[] = []/* , canWhat: LangPackKey[] = [] */;
        chatPermissions.v.forEach((info) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          const mainFlag = info.flags[0];
          // @ts-ignore
          if(bannedRights.pFlags[mainFlag] && !defaultBannedRights.pFlags[mainFlag]) {
            cantWhat.push(info.exceptionText);
          // @ts-ignore
          }/*  else if(!combinedRights.pFlags[mainFlag]) {
            canWhat.push(info.exceptionText);
          } */
        });

        const el = li.querySelector('.user-last-message') as HTMLElement;

        if(cantWhat.length) {
          el.innerHTML = '';
<<<<<<< HEAD
          el.append(...join(cantWhat.map(t => i18n(t)), false));
=======
          el.append(...join(cantWhat.map((t) => i18n(t)), false));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }/*  else if(canWhat.length) {
          str = 'Can ' + canWhat.join(canWhat.length === 2 ? ' and ' : ', ');
        } */
  
        el.classList.toggle('hide', !cantWhat.length);
      };

      const add = (participant: ChannelParticipant.channelParticipantBanned, append: boolean) => {
        const {dom} = appDialogsManager.addDialogNew({
<<<<<<< HEAD
          dialog: appPeersManager.getPeerId(participant.peer),
          container: list,
          drawStatus: false,
=======
          peerId: getPeerId(participant.peer),
          container: list,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          rippleEnabled: true,
          avatarSize: 48,
          append
        });

        setSubtitle(dom.listEl, participant);

        //dom.titleSpan.innerHTML = 'Chinaza Akachi';
        //dom.lastMessageSpan.innerHTML = 'Can Add Users and Pin Messages';
      };

<<<<<<< HEAD
      this.listenerSetter.add(rootScope)('updateChannelParticipant', (update: Update.updateChannelParticipant) => {
        const needAdd = update.new_participant?._ === 'channelParticipantBanned' && !update.new_participant.banned_rights.pFlags.view_messages;
        const li = list.querySelector(`[data-peer-id="${update.user_id}"]`);
        if(needAdd) {
          if(!li) {
            add(update.new_participant as ChannelParticipant.channelParticipantBanned, false);
          } else {
            setSubtitle(li, update.new_participant as ChannelParticipant.channelParticipantBanned);
          }

          if(update.prev_participant?._ !== 'channelParticipantBanned') {
            ++exceptionsCount;
          }
        } else {
          if(li) {
            li.remove();
          }

          if(update.prev_participant?._ === 'channelParticipantBanned') {
            --exceptionsCount;
          }
        }

        setLength();
      });
=======
      // this.listenerSetter.add(rootScope)('updateChannelParticipant', (update: Update.updateChannelParticipant) => {
      //   const needAdd = update.new_participant?._ === 'channelParticipantBanned' && !update.new_participant.banned_rights.pFlags.view_messages;
      //   const li = list.querySelector(`[data-peer-id="${update.user_id}"]`);
      //   if(needAdd) {
      //     if(!li) {
      //       add(update.new_participant as ChannelParticipant.channelParticipantBanned, false);
      //     } else {
      //       setSubtitle(li, update.new_participant as ChannelParticipant.channelParticipantBanned);
      //     }

      //     if(update.prev_participant?._ !== 'channelParticipantBanned') {
      //       ++exceptionsCount;
      //     }
      //   } else {
      //     if(li) {
      //       li.remove();
      //     }

      //     if(update.prev_participant?._ === 'channelParticipantBanned') {
      //       --exceptionsCount;
      //     }
      //   }

      //   setLength();
      // });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      const setLength = () => {
        replaceContent(addExceptionRow.subtitle, i18n(exceptionsCount ? 'Permissions.ExceptionsCount' : 'Permissions.NoExceptions', [exceptionsCount]));
      };

      let exceptionsCount = 0;
      let loader: ScrollableLoader;
      const setLoader = () => {
        const LOAD_COUNT = 50;
        loader = new ScrollableLoader({
          scrollable: this.scrollable,
          getPromise: () => {
<<<<<<< HEAD
            return appProfileManager.getChannelParticipants(this.chatId, {_: 'channelParticipantsBanned', q: ''}, LOAD_COUNT, list.childElementCount).then(res => {
=======
            return this.managers.appProfileManager.getChannelParticipants(this.chatId, {_: 'channelParticipantsBanned', q: ''}, LOAD_COUNT, list.childElementCount).then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              for(const participant of res.participants) {
                add(participant as ChannelParticipant.channelParticipantBanned, true);
              }
  
              exceptionsCount = res.count;
              setLength();
  
              return res.participants.length < LOAD_COUNT || res.count === list.childElementCount;
            });
          }
        });

        return loader.load();
      };

      this.scrollable.append(section.container);

<<<<<<< HEAD
      if(appChatsManager.isChannel(this.chatId)) {
=======
      if(await this.managers.appChatsManager.isChannel(this.chatId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        await setLoader();
      } else {
        setLength();
        
        this.listenerSetter.add(rootScope)('dialog_migrate', ({migrateFrom, migrateTo}) => {
          if(this.chatId === migrateFrom) {
            this.chatId = migrateTo;
            setLoader();
          }
        });
      }
    }
  }

  onOpenAfterTimeout() {
    this.scrollable.onScroll();
  }
}
