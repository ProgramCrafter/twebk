/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "../..";
import { attachClickEvent } from "../../../../helpers/dom/clickEvent";
import { AccountPassword } from "../../../../layer";
<<<<<<< HEAD
import appStickersManager from "../../../../lib/appManagers/appStickersManager";
import { _i18n } from "../../../../lib/langPack";
import passwordManager from "../../../../lib/mtproto/passwordManager";
import Button from "../../../button";
import PopupPeer from "../../../popups/peer";
import { SliderSuperTab } from "../../../slider";
import { wrapSticker } from "../../../wrappers";
=======
import { _i18n } from "../../../../lib/langPack";
import Button from "../../../button";
import PopupPeer from "../../../popups/peer";
import { SliderSuperTab } from "../../../slider";
import wrapStickerEmoji from "../../../wrappers/stickerEmoji";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import AppSettingsTab from "../settings";
import AppTwoStepVerificationEmailTab from "./email";
import AppTwoStepVerificationEnterPasswordTab from "./enterPassword";

export default class AppTwoStepVerificationTab extends SliderSuperTab {
  public state: AccountPassword;
  public plainPassword: string;

  protected init() {
    this.container.classList.add('two-step-verification', 'two-step-verification-main');
    this.setTitle('TwoStepVerificationTitle');

    const section = new SettingSection({
<<<<<<< HEAD
      caption: true,
=======
      captionOld: true,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      noDelimiter: true
    });

    const emoji = '🔐';
<<<<<<< HEAD
    const doc = appStickersManager.getAnimatedEmojiSticker(emoji);
    const stickerContainer = document.createElement('div');

    if(doc) {
      wrapSticker({
        doc,
        div: stickerContainer,
        loop: false,
        play: true,
        width: 168,
        height: 168,
        emoji
      }).then(() => {
        // this.animation = player;
      });
    } else {
      stickerContainer.classList.add('media-sticker-wrapper');
    }
=======
    const stickerContainer = document.createElement('div');

    wrapStickerEmoji({
      div: stickerContainer,
      width: 168,
      height: 168,
      emoji
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    section.content.append(stickerContainer);

    const c = section.generateContentElement();
    if(this.state.pFlags.has_password) {
      _i18n(section.caption, 'TwoStepAuth.GenericHelp');

      const btnChangePassword = Button('btn-primary btn-transparent', {icon: 'edit', text: 'TwoStepAuth.ChangePassword'});
      const btnDisablePassword = Button('btn-primary btn-transparent', {icon: 'passwordoff', text: 'TwoStepAuth.RemovePassword'});
      const btnSetRecoveryEmail = Button('btn-primary btn-transparent', {icon: 'email', text: this.state.pFlags.has_recovery ? 'TwoStepAuth.ChangeEmail' : 'TwoStepAuth.SetupEmail'});

      attachClickEvent(btnChangePassword, () => {
<<<<<<< HEAD
        const tab = new AppTwoStepVerificationEnterPasswordTab(this.slider);
=======
        const tab = this.slider.createTab(AppTwoStepVerificationEnterPasswordTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        tab.state = this.state;
        tab.plainPassword = this.plainPassword;
        tab.open();
      });

      attachClickEvent(btnDisablePassword, () => {
        const popup = new PopupPeer('popup-disable-password', {
          buttons: [{
            langKey: 'Disable',
            callback: () => {
<<<<<<< HEAD
              passwordManager.updateSettings({currentPassword: this.plainPassword}).then(() => {
=======
              this.managers.passwordManager.updateSettings({currentPassword: this.plainPassword}).then(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
                this.slider.sliceTabsUntilTab(AppSettingsTab, this);
                this.close();
              });
            },
            isDanger: true,
          }], 
          titleLangKey: 'TurnPasswordOffQuestionTitle',
          descriptionLangKey: 'TurnPasswordOffQuestion'
        });

        popup.show();
      });

      attachClickEvent(btnSetRecoveryEmail, () => {
<<<<<<< HEAD
        const tab = new AppTwoStepVerificationEmailTab(this.slider);
=======
        const tab = this.slider.createTab(AppTwoStepVerificationEmailTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        tab.state = this.state;
        tab.hint = this.state.hint;
        tab.plainPassword = this.plainPassword;
        tab.newPassword = this.plainPassword;
        tab.isFirst = true;
        tab.open();
      });

      c.append(btnChangePassword, btnDisablePassword, btnSetRecoveryEmail);
    } else {
      _i18n(section.caption, 'TwoStepAuth.SetPasswordHelp');

      const inputWrapper = document.createElement('div');
      inputWrapper.classList.add('input-wrapper');

      const btnSetPassword = Button('btn-primary btn-color-primary', {text: 'TwoStepVerificationSetPassword'});
      
      inputWrapper.append(btnSetPassword);
      c.append(inputWrapper);

      attachClickEvent(btnSetPassword, (e) => {
<<<<<<< HEAD
        const tab = new AppTwoStepVerificationEnterPasswordTab(this.slider);
=======
        const tab = this.slider.createTab(AppTwoStepVerificationEnterPasswordTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        tab.state = this.state;
        tab.open();
      });
    }

    this.scrollable.container.append(section.container);
  }
}
