/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import replaceContent from "../helpers/dom/replaceContent";
import { randomLong } from "../helpers/random";
import { InputPrivacyKey, InputPrivacyRule } from "../layer";
<<<<<<< HEAD
import appPrivacyManager, { PrivacyType } from "../lib/appManagers/appPrivacyManager";
import appUsersManager from "../lib/appManagers/appUsersManager";
=======
import { AppManagers } from "../lib/appManagers/managers";
import getPrivacyRulesDetails from "../lib/appManagers/utils/privacy/getPrivacyRulesDetails";
import PrivacyType from "../lib/appManagers/utils/privacy/privacyType";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { i18n, join, LangPackKey, _i18n } from "../lib/langPack";
import RadioField from "./radioField";
import Row, { RadioFormFromRows } from "./row";
import Scrollable from "./scrollable";
import { SettingSection, generateSection } from "./sidebarLeft";
import AppAddMembersTab from "./sidebarLeft/tabs/addMembers";
import { SliderSuperTabEventable } from "./sliderTab";

export type PrivacySectionStr = LangPackKey | '' | HTMLElement;
export default class PrivacySection {
  public radioRows: Map<PrivacyType, Row>;
  public radioSection: SettingSection;
  public exceptions: Map<keyof PrivacySection['peerIds'], {
    titleLangKey: LangPackKey,
    key: keyof PrivacySection['peerIds'],
    row: Row,
    icon: string,
    subtitleLangKey: LangPackKey,
    clickable: true
  }>;
  public peerIds: {
    disallow?: PeerId[],
    allow?: PeerId[]
  };
  public type: PrivacyType;

  constructor(public options: {
    tab: SliderSuperTabEventable,
    title: LangPackKey, 
    inputKey: InputPrivacyKey['_'], 
    captions?: [PrivacySectionStr, PrivacySectionStr, PrivacySectionStr],
    appendTo?: Scrollable,
    noExceptions?: boolean,
    onRadioChange?: (value: number) => any,
    skipTypes?: PrivacyType[],
<<<<<<< HEAD
    exceptionTexts?: [LangPackKey, LangPackKey]
=======
    exceptionTexts?: [LangPackKey, LangPackKey],
    managers: AppManagers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }) {
    if(options.captions) {
      options.captions.reverse();
    }

<<<<<<< HEAD
=======
    const managers = options.managers;

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.radioSection = new SettingSection({name: options.title, caption: true});

    this.radioRows = new Map();

    let r: Array<{type: PrivacyType, langKey: LangPackKey}> = [{
      type: PrivacyType.Everybody,
      langKey: 'PrivacySettingsController.Everbody'
    }, {
      type: PrivacyType.Contacts,
      langKey: 'PrivacySettingsController.MyContacts'
    }, {
      type: PrivacyType.Nobody,
      langKey: 'PrivacySettingsController.Nobody'
    }];

    if(options.skipTypes) {
<<<<<<< HEAD
      r = r.filter(r => !options.skipTypes.includes(r.type));
=======
      r = r.filter((r) => !options.skipTypes.includes(r.type));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }
    
    const random = randomLong();
    r.forEach(({type, langKey}) => {
      const row = new Row({
        radioField: new RadioField({
          langKey, 
          name: random, 
          value: '' + type
        })
      });
      
      this.radioRows.set(type, row);
    });

    const form = RadioFormFromRows([...this.radioRows.values()], this.onRadioChange);

    this.radioSection.content.append(form);
    if(options.appendTo) {
      options.appendTo.append(this.radioSection.container);
    }

    if(!options.noExceptions) {
      const container = generateSection(options.appendTo, 'PrivacyExceptions', 'PrivacySettingsController.PeerInfo');

      this.exceptions = new Map([[
        'disallow', 
        {
          titleLangKey: options.exceptionTexts[0],
          key: 'disallow',
          row: null,
          icon: 'deleteuser',
          subtitleLangKey: 'PrivacySettingsController.AddUsers',
          clickable: true
        }
      ], [
        'allow', 
        {
          titleLangKey: options.exceptionTexts[1],
          key: 'allow',
          row: null,
          icon: 'adduser',
          subtitleLangKey: 'PrivacySettingsController.AddUsers',
          clickable: true
        }
      ]]);

      this.exceptions.forEach((exception) => {
        exception.row = new Row(exception);

        exception.row.container.addEventListener('click', () => {
          promise.then(() => {
            const _peerIds = this.peerIds[exception.key];
<<<<<<< HEAD
            new AppAddMembersTab(options.tab.slider).open({
=======
            options.tab.slider.createTab(AppAddMembersTab).open({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              type: 'privacy',
              skippable: true,
              title: exception.titleLangKey,
              placeholder: 'PrivacyModal.Search.Placeholder',
              takeOut: (newPeerIds) => {
                _peerIds.length = 0;
                _peerIds.push(...newPeerIds);
                exception.row.subtitle.innerHTML = '';
                exception.row.subtitle.append(...this.generateStr(this.splitPeersByType(newPeerIds)));
              },
              selectedPeerIds: _peerIds
            });
          });
        });

        container.append(exception.row.container);
      });
    }

    /* setTimeout(() => {
      this.setRadio(PrivacyType.Contacts);
    }, 0); */

<<<<<<< HEAD
    const promise = appPrivacyManager.getPrivacy(options.inputKey).then(rules => {
      const details = appPrivacyManager.getPrivacyRulesDetails(rules);
=======
    const promise = managers.appPrivacyManager.getPrivacy(options.inputKey).then((rules) => {
      const details = getPrivacyRulesDetails(rules);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.setRadio(details.type);

      if(this.exceptions) {
        this.peerIds = {};
<<<<<<< HEAD
        ['allow' as const, 'disallow' as const].forEach(k => {
          const arr = [];
          const from = k === 'allow' ? details.allowPeers : details.disallowPeers;
          arr.push(...from.users.map(id => id.toPeerId()));
          arr.push(...from.chats.map(id => id.toPeerId(true)));
=======
        ['allow' as const, 'disallow' as const].forEach((k) => {
          const arr = [];
          const from = k === 'allow' ? details.allowPeers : details.disallowPeers;
          arr.push(...from.users.map((id) => id.toPeerId()));
          arr.push(...from.chats.map((id) => id.toPeerId(true)));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          this.peerIds[k] = arr;
          const s = this.exceptions.get(k).row.subtitle;
          s.innerHTML = '';
          s.append(...this.generateStr(from));
        });
      }

<<<<<<< HEAD
      options.tab.eventListener.addEventListener('destroy', () => {
=======
      options.tab.eventListener.addEventListener('destroy', async() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const rules: InputPrivacyRule[] = [];

        switch(this.type) {
          case PrivacyType.Everybody:
            rules.push({_: 'inputPrivacyValueAllowAll'});
            break;
          case PrivacyType.Contacts:
            rules.push({_: 'inputPrivacyValueAllowContacts'});
            break;
          case PrivacyType.Nobody:
            rules.push({_: 'inputPrivacyValueDisallowAll'});
            break;
        }

        if(this.exceptions) {
<<<<<<< HEAD
          ([
=======
          const a = ([
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            ['allow',     'inputPrivacyValueAllowChatParticipants',     'inputPrivacyValueAllowUsers'],
            ['disallow',  'inputPrivacyValueDisallowChatParticipants',  'inputPrivacyValueDisallowUsers']
          ] as Array<[
            'allow' | 'disallow', 
            'inputPrivacyValueAllowChatParticipants' | 'inputPrivacyValueDisallowChatParticipants', 
            'inputPrivacyValueAllowUsers' | 'inputPrivacyValueDisallowUsers'
<<<<<<< HEAD
          ]>).forEach(([k, chatKey, usersKey], idx) => {
=======
          ]>);
          for(const [k, chatKey, usersKey] of a) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            if(this.exceptions.get(k).row.container.classList.contains('hide')) {
              return;
            }

            const _peerIds = this.peerIds[k];
            if(_peerIds) {
              const splitted = this.splitPeersByType(_peerIds);
              if(splitted.chats.length) {
                rules.push({_: chatKey, chats: splitted.chats});
              }
  
              if(splitted.users.length) {
<<<<<<< HEAD
                rules.push({_: usersKey, users: splitted.users.map(id => appUsersManager.getUserInput(id))});
              }
            }
          });
        }
        
        appPrivacyManager.setPrivacy(options.inputKey, rules);
=======
                rules.push({
                  _: usersKey, 
                  users: await Promise.all(splitted.users.map((id) => managers.appUsersManager.getUserInput(id)))
                });
              }
            }
          }
        }
        
        managers.appPrivacyManager.setPrivacy(options.inputKey, rules);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }, {once: true});
    });
  }

  private onRadioChange = (value: string | PrivacySection['type']) => {
    value = +value as PrivacySection['type'];
    this.type = value;

    const caption = this.options.captions[this.type];
    const captionElement = this.radioSection.caption;
    if(!caption) {
      captionElement.innerHTML = '';
    } else if(caption instanceof HTMLElement) {
      replaceContent(captionElement, caption);
    } else {
      _i18n(captionElement, caption);
    }
    captionElement.classList.toggle('hide', !caption);

    if(this.exceptions) {
      this.exceptions.get('allow').row.container.classList.toggle('hide', this.type === PrivacyType.Everybody);
      this.exceptions.get('disallow').row.container.classList.toggle('hide', this.type === PrivacyType.Nobody);
    }

    this.options.onRadioChange && this.options.onRadioChange(value);
  };

  public setRadio(type: PrivacySection['type']) {
    const row = this.radioRows.get(type);
    this.onRadioChange(type);
    row.radioField.input.checked = true;
  }
  
  private splitPeersByType(peerIds: PeerId[]) {
    const peers = {users: [] as UserId[], chats: [] as ChatId[]};
<<<<<<< HEAD
    peerIds.forEach(peerId => {
=======
    peerIds.forEach((peerId) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      peers[peerId.isAnyChat() ? 'chats' : 'users'].push(peerId.isAnyChat() ? peerId.toChatId() : peerId);
    });

    return peers;
  }

  private generateStr(peers: {users: UserId[], chats: ChatId[]}) {
    if(!peers.users.length && !peers.chats.length) {
      return [i18n('PrivacySettingsController.AddUsers')];
    }

    return join([
      peers.users.length ? i18n('Users', [peers.users.length]) : null, 
      peers.chats.length ? i18n('Chats', [peers.chats.length]) : null
    ].filter(Boolean), false);
  }
}
