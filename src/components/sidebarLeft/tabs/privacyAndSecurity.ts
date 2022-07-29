/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTabEventable } from "../../sliderTab";
import { SettingSection } from "..";
import Row from "../../row";
import { AccountPassword, Authorization, InputPrivacyKey, Updates } from "../../../layer";
<<<<<<< HEAD
import appPrivacyManager, { PrivacyType } from "../../../lib/appManagers/appPrivacyManager";
import AppPrivacyPhoneNumberTab from "./privacy/phoneNumber";
import AppTwoStepVerificationTab from "./2fa";
import passwordManager from "../../../lib/mtproto/passwordManager";
=======
import AppPrivacyPhoneNumberTab from "./privacy/phoneNumber";
import AppTwoStepVerificationTab from "./2fa";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import AppTwoStepVerificationEnterPasswordTab from "./2fa/enterPassword";
import AppTwoStepVerificationEmailConfirmationTab from "./2fa/emailConfirmation";
import AppPrivacyLastSeenTab from "./privacy/lastSeen";
import AppPrivacyProfilePhotoTab from "./privacy/profilePhoto";
import AppPrivacyForwardMessagesTab from "./privacy/forwardMessages";
import AppPrivacyAddToGroupsTab from "./privacy/addToGroups";
import AppPrivacyCallsTab from "./privacy/calls";
import AppActiveSessionsTab from "./activeSessions";
<<<<<<< HEAD
import apiManager from "../../../lib/mtproto/mtprotoworker";
import AppBlockedUsersTab from "./blockedUsers";
import appUsersManager from "../../../lib/appManagers/appUsersManager";
=======
import AppBlockedUsersTab from "./blockedUsers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../../lib/rootScope";
import { i18n, LangPackKey, _i18n } from "../../../lib/langPack";
import replaceContent from "../../../helpers/dom/replaceContent";
import CheckboxField from "../../checkboxField";
import PopupPeer from "../../popups/peer";
<<<<<<< HEAD
import appDraftsManager from "../../../lib/appManagers/appDraftsManager";
import Button from "../../button";
import toggleDisability from "../../../helpers/dom/toggleDisability";
import convertKeyToInputKey from "../../../helpers/string/convertKeyToInputKey";
=======
import Button from "../../button";
import toggleDisability from "../../../helpers/dom/toggleDisability";
import convertKeyToInputKey from "../../../helpers/string/convertKeyToInputKey";
import getPrivacyRulesDetails from "../../../lib/appManagers/utils/privacy/getPrivacyRulesDetails";
import PrivacyType from "../../../lib/appManagers/utils/privacy/privacyType";
import confirmationPopup, { PopupConfirmationOptions } from "../../confirmationPopup";
import noop from "../../../helpers/noop";
import { toastNew } from "../../toast";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppPrivacyAndSecurityTab extends SliderSuperTabEventable {
  private activeSessionsRow: Row;
  private authorizations: Authorization.authorization[];

  protected init() {
    this.header.classList.add('with-border');
    this.container.classList.add('dont-u-dare-block-me');
    this.setTitle('PrivacySettings');

    const SUBTITLE: LangPackKey = 'Loading';

    {
      const section = new SettingSection({noDelimiter: true, caption: 'SessionsInfo'});

      let blockedPeerIds: PeerId[];
      const blockedUsersRow = new Row({
        icon: 'deleteuser',
        titleLangKey: 'BlockedUsers',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          const tab = new AppBlockedUsersTab(this.slider);
          tab.peerIds = blockedPeerIds;
          tab.open();
        }
=======
          const tab = this.slider.createTab(AppBlockedUsersTab);
          tab.peerIds = blockedPeerIds;
          tab.open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
      blockedUsersRow.freezed = true;

      let passwordState: AccountPassword;
      const twoFactorRowOptions = {
        icon: 'lock',
        titleLangKey: 'TwoStepVerification' as LangPackKey,
        subtitleLangKey: SUBTITLE,
        clickable: (e: Event) => {
          let tab: AppTwoStepVerificationTab | AppTwoStepVerificationEnterPasswordTab | AppTwoStepVerificationEmailConfirmationTab;
          if(passwordState.pFlags.has_password) {
<<<<<<< HEAD
            tab = new AppTwoStepVerificationEnterPasswordTab(this.slider);
          } else if(passwordState.email_unconfirmed_pattern) {
            tab = new AppTwoStepVerificationEmailConfirmationTab(this.slider);
            tab.email = passwordState.email_unconfirmed_pattern;
            tab.length = 6;
            tab.isFirst = true;
            passwordManager.resendPasswordEmail();
          } else {
            tab = new AppTwoStepVerificationTab(this.slider);
=======
            tab = this.slider.createTab(AppTwoStepVerificationEnterPasswordTab);
          } else if(passwordState.email_unconfirmed_pattern) {
            tab = this.slider.createTab(AppTwoStepVerificationEmailConfirmationTab);
            tab.email = passwordState.email_unconfirmed_pattern;
            tab.length = 6;
            tab.isFirst = true;
            this.managers.passwordManager.resendPasswordEmail();
          } else {
            tab = this.slider.createTab(AppTwoStepVerificationTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          }
          
          tab.state = passwordState;
          tab.open();
<<<<<<< HEAD
        }
=======
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      };
      
      const twoFactorRow = new Row(twoFactorRowOptions);
      twoFactorRow.freezed = true;

      const activeSessionsRow = this.activeSessionsRow = new Row({
        icon: 'activesessions',
        titleLangKey: 'SessionsTitle',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          const tab = new AppActiveSessionsTab(this.slider);
=======
          const tab = this.slider.createTab(AppActiveSessionsTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          tab.authorizations = this.authorizations;
          tab.eventListener.addEventListener('destroy', () => {
            this.updateActiveSessions();
          }, {once: true});
          tab.open();
<<<<<<< HEAD
        }
=======
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
      activeSessionsRow.freezed = true;

      section.content.append(blockedUsersRow.container, twoFactorRow.container, activeSessionsRow.container);
      this.scrollable.append(section.container);

      const setBlockedCount = (count: number) => {
        if(count) {
          replaceContent(blockedUsersRow.subtitle, i18n('PrivacySettingsController.UserCount', [count]));
        } else {
          replaceContent(blockedUsersRow.subtitle, i18n('BlockedEmpty', [count]));
        }
      };

      this.listenerSetter.add(rootScope)('peer_block', () => {
        /* const {blocked, peerId} = update;
<<<<<<< HEAD
        if(!blocked) blockedPeerIds.findAndSplice(p => p === peerId);
=======
        if(!blocked) blockedPeerIds.findAndSplice((p) => p === peerId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        else blockedPeerIds.unshift(peerId);
        blockedCount += blocked ? 1 : -1;
        setBlockedCount(blockedCount); */
        updateBlocked();
      });

      const updateBlocked = () => {
<<<<<<< HEAD
        appUsersManager.getBlocked().then(res => {
=======
        this.managers.appUsersManager.getBlocked().then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          blockedUsersRow.freezed = false;
          setBlockedCount(res.count);
          blockedPeerIds = res.peerIds;
        });
      };

      updateBlocked();

<<<<<<< HEAD
      passwordManager.getState().then(state => {
=======
      this.managers.passwordManager.getState().then((state) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        passwordState = state;
        replaceContent(twoFactorRow.subtitle, i18n(state.pFlags.has_password ? 'PrivacyAndSecurity.Item.On' : 'PrivacyAndSecurity.Item.Off'));
        twoFactorRow.freezed = false;
        
        //console.log('password state', state);
      });

      this.updateActiveSessions();
    }

    {
      const section = new SettingSection({name: 'PrivacyTitle', caption: 'GroupsAndChannelsHelp'});

      section.content.classList.add('privacy-navigation-container');

      const rowsByKeys: Partial<{
        [key in InputPrivacyKey['_']]: Row
      }> = {};

      const numberVisibilityRow = rowsByKeys['inputPrivacyKeyPhoneNumber'] = new Row({
        titleLangKey: 'PrivacyPhoneTitle',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyPhoneNumberTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyPhoneNumberTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const lastSeenTimeRow = rowsByKeys['inputPrivacyKeyStatusTimestamp'] = new Row({
        titleLangKey: 'LastSeenTitle',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyLastSeenTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyLastSeenTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const photoVisibilityRow = rowsByKeys['inputPrivacyKeyProfilePhoto'] = new Row({
        titleLangKey: 'PrivacyProfilePhotoTitle',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyProfilePhotoTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyProfilePhotoTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const callRow = rowsByKeys['inputPrivacyKeyPhoneCall'] = new Row({
        titleLangKey: 'WhoCanCallMe',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyCallsTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyCallsTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const linkAccountRow = rowsByKeys['inputPrivacyKeyForwards'] = new Row({
        titleLangKey: 'PrivacyForwardsTitle',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyForwardMessagesTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyForwardMessagesTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const groupChatsAddRow = rowsByKeys['inputPrivacyKeyChatInvite'] = new Row({
        titleLangKey: 'WhoCanAddMe',
        subtitleLangKey: SUBTITLE,
        clickable: () => {
<<<<<<< HEAD
          new AppPrivacyAddToGroupsTab(this.slider).open();
        }
=======
          this.slider.createTab(AppPrivacyAddToGroupsTab).open();
        },
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const updatePrivacyRow = (key: InputPrivacyKey['_']) => {
        const row = rowsByKeys[key];
        if(!row) {
          return;
        }

<<<<<<< HEAD
        appPrivacyManager.getPrivacy(key).then(rules => {
          const details = appPrivacyManager.getPrivacyRulesDetails(rules);
=======
        this.managers.appPrivacyManager.getPrivacy(key).then((rules) => {
          const details = getPrivacyRulesDetails(rules);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          const langKey = details.type === PrivacyType.Everybody ? 'PrivacySettingsController.Everbody' : (details.type === PrivacyType.Contacts ? 'PrivacySettingsController.MyContacts' : 'PrivacySettingsController.Nobody');
          const disallowLength = details.disallowPeers.users.length + details.disallowPeers.chats.length;
          const allowLength = details.allowPeers.users.length + details.allowPeers.chats.length;

          row.subtitle.innerHTML = '';
          const s = i18n(langKey);
          row.subtitle.append(s);
          if(disallowLength || allowLength) {
            row.subtitle.append(` (${[-disallowLength, allowLength ? '+' + allowLength : 0].filter(Boolean).join(', ')})`);
          }
        });
      };

      section.content.append(
        numberVisibilityRow.container, 
        lastSeenTimeRow.container, 
        photoVisibilityRow.container, 
        callRow.container, 
        linkAccountRow.container, 
        groupChatsAddRow.container
      );
      this.scrollable.append(section.container);

      for(const key in rowsByKeys) {
        updatePrivacyRow(key as keyof typeof rowsByKeys);
      }

      rootScope.addEventListener('privacy_update', (update) => {
        updatePrivacyRow(convertKeyToInputKey(update.key._) as any);
      });
    }

    const promises: Promise<any>[] = [];
    {
      const section = new SettingSection({name: 'Privacy.SensitiveContent'});
      section.container.classList.add('hide');

<<<<<<< HEAD
      promises.push(apiManager.invokeApi('account.getContentSettings').then(settings => {
=======
      promises.push(this.managers.apiManager.invokeApi('account.getContentSettings').then((settings) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(!settings.pFlags.sensitive_can_change) {
          return;
        }
        
        const enabled = settings.pFlags.sensitive_enabled;

        const sensitiveRow = new Row({
          checkboxField: new CheckboxField({text: 'PrivacyAndSecurity.SensitiveText', checked: enabled}),
          subtitleLangKey: 'PrivacyAndSecurity.SensitiveDesc',
          noCheckboxSubtitle: true
        });
        
        section.content.append(sensitiveRow.container);
        section.container.classList.remove('hide');
        
        this.eventListener.addEventListener('destroy', () => {
          const _enabled = sensitiveRow.checkboxField.checked;
          const isChanged = _enabled !== enabled;
          if(!isChanged) {
            return;
          }
          
<<<<<<< HEAD
          apiManager.invokeApi('account.setContentSettings', {
=======
          this.managers.apiManager.invokeApi('account.setContentSettings', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            sensitive_enabled: _enabled
          });
        }, {once: true});
      }));

      this.scrollable.append(section.container);
    }

    {
      const section = new SettingSection({name: 'FilterChats'});

      const onDeleteClick = () => {
        const popup = new PopupPeer('popup-delete-drafts', {
          buttons: [{
            langKey: 'Delete',
            callback: () => {
              const toggle = toggleDisability([deleteButton], true);
<<<<<<< HEAD
              appDraftsManager.clearAllDrafts().then(() => {
=======
              this.managers.appDraftsManager.clearAllDrafts().then(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
                toggle();
              });
            },
            isDanger: true,
          }], 
          titleLangKey: 'AreYouSureClearDraftsTitle',
          descriptionLangKey: 'AreYouSureClearDrafts'
        });
  
        popup.show();
      };

      const deleteButton = Button('btn-primary btn-transparent', {icon: 'delete', text: 'PrivacyDeleteCloudDrafts'});
      this.listenerSetter.add(deleteButton)('click', onDeleteClick);
      section.content.append(deleteButton);

<<<<<<< HEAD
      /* promises.push(apiManager.invokeApi('messages.getAllDrafts').then(drafts => {
=======
      /* promises.push(apiManager.invokeApi('messages.getAllDrafts').then((drafts) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const draftsRow = new Row({
          titleLangKey: 'PrivacyDeleteCloudDrafts',
          subtitleLangKey: 'Drafts',
          subtitleLangArgs: [(drafts as Updates.updates).updates.length],
          icon: 'delete',
          clickable: onDeleteClick
        });
        
        section.content.append(draftsRow.container);
      })); */

      this.scrollable.append(section.container);
    }

<<<<<<< HEAD
=======
    {
      const section = new SettingSection({name: 'PrivacyPayments', caption: 'PrivacyPaymentsClearInfo'});

      const onClearClick = () => {
        const options: PopupConfirmationOptions = {
          titleLangKey: 'PrivacyPaymentsClearAlertTitle',
          descriptionLangKey: 'PrivacyPaymentsClearAlertText',
          button: {
            langKey: 'Clear'
          },
          checkboxes: [{
            text: 'PrivacyClearShipping', 
            checked: true
          }, {
            text: 'PrivacyClearPayment', 
            checked: true
          }]
        };

        confirmationPopup(options).then(() => {
          const [info, payment] = options.checkboxes.map((c) => c.checkboxField.checked);
          const toggle = toggleDisability([clearButton], true);
          this.managers.appPaymentsManager.clearSavedInfo(info, payment).then(() => {
            if(!info && !payment) {
              return;
            }

            toggle();
            toastNew({
              langPackKey: info && payment ? 'PrivacyPaymentsPaymentShippingCleared' : (info ? 'PrivacyPaymentsShippingInfoCleared' : 'PrivacyPaymentsPaymentInfoCleared')
            });
          });
        }, noop);
      };

      const clearButton = Button('btn-primary btn-transparent', {icon: 'delete', text: 'PrivacyPaymentsClear'});
      this.listenerSetter.add(clearButton)('click', onClearClick);
      section.content.append(clearButton);

      this.scrollable.append(section.container);
    }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    return Promise.all(promises);
  }

  public updateActiveSessions() {
<<<<<<< HEAD
    apiManager.invokeApi('account.getAuthorizations').then(auths => {
=======
    this.managers.apiManager.invokeApi('account.getAuthorizations').then((auths) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.activeSessionsRow.freezed = false;
      this.authorizations = auths.authorizations;
      _i18n(this.activeSessionsRow.subtitle, 'Privacy.Devices', [this.authorizations.length]);
      //console.log('auths', auths);
    });
  }
}
