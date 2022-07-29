/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "../..";
import { AccountPassword } from "../../../../layer";
<<<<<<< HEAD
import appStickersManager from "../../../../lib/appManagers/appStickersManager";
import Button from "../../../button";
import { SliderSuperTab } from "../../../slider";
import { wrapSticker } from "../../../wrappers";
import InputField from "../../../inputField";
import { putPreloader } from "../../../misc";
import passwordManager from "../../../../lib/mtproto/passwordManager";
import AppTwoStepVerificationSetTab from "./passwordSet";
import AppTwoStepVerificationEmailConfirmationTab from "./emailConfirmation";
import RichTextProcessor from "../../../../lib/richtextprocessor";
=======
import Button from "../../../button";
import { SliderSuperTab } from "../../../slider";
import InputField from "../../../inputField";
import { putPreloader } from "../../../putPreloader";
import AppTwoStepVerificationSetTab from "./passwordSet";
import AppTwoStepVerificationEmailConfirmationTab from "./emailConfirmation";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupPeer from "../../../popups/peer";
import cancelEvent from "../../../../helpers/dom/cancelEvent";
import { canFocus } from "../../../../helpers/dom/canFocus";
import { attachClickEvent } from "../../../../helpers/dom/clickEvent";
<<<<<<< HEAD
=======
import matchEmail from "../../../../lib/richTextProcessor/matchEmail";
import wrapStickerEmoji from "../../../wrappers/stickerEmoji";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppTwoStepVerificationEmailTab extends SliderSuperTab {
  public inputField: InputField;
  public state: AccountPassword;
  public plainPassword: string;
  public newPassword: string;
  public hint: string;
  public isFirst = false;

  protected init() {
    this.container.classList.add('two-step-verification', 'two-step-verification-email');
    this.setTitle('RecoveryEmailTitle');

    const section = new SettingSection({
<<<<<<< HEAD
      caption: true,
=======
      captionOld: true,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      noDelimiter: true
    });

    const emoji = '💌';
<<<<<<< HEAD
    const doc = appStickersManager.getAnimatedEmojiSticker(emoji);
    const stickerContainer = document.createElement('div');

    if(doc) {
      wrapSticker({
        doc,
        div: stickerContainer,
        loop: false,
        play: true,
        width: 160,
        height: 160,
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
      width: 160,
      height: 160,
      emoji
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    section.content.append(stickerContainer);

    const inputContent = section.generateContentElement();

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');

    const inputField = this.inputField = new InputField({
      name: 'recovery-email',
      label: 'RecoveryEmail',
      plainText: true
    });

    inputField.input.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        cancelEvent(e);
        return onContinueClick();
      }
    });

    inputField.input.addEventListener('input', (e) => {
      inputField.input.classList.remove('error');
    });

    const btnContinue = Button('btn-primary btn-color-primary', {text: 'Continue'});
    const btnSkip = Button('btn-primary btn-secondary btn-primary-transparent primary', {text: 'YourEmailSkip'});

    const goNext = () => {
<<<<<<< HEAD
      new AppTwoStepVerificationSetTab(this.slider).open();
=======
      this.slider.createTab(AppTwoStepVerificationSetTab).open();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    const onContinueClick = () => {
      const email = inputField.value.trim();
<<<<<<< HEAD
      const match = RichTextProcessor.matchEmail(email);
=======
      const match = matchEmail(email);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!match || match[0].length !== email.length) {
        inputField.input.classList.add('error');
        return;
      }

      toggleButtons(true);
      const d = putPreloader(btnContinue);

<<<<<<< HEAD
      passwordManager.updateSettings({
=======
      this.managers.passwordManager.updateSettings({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        hint: this.hint,
        currentPassword: this.plainPassword,
        newPassword: this.newPassword,
        email
      }).then((value) => {
        goNext();
      }, (err) => {
        if(err.type.includes('EMAIL_UNCONFIRMED')) {
          const symbols = +err.type.match(/^EMAIL_UNCONFIRMED_(\d+)/)[1];

<<<<<<< HEAD
          const tab = new AppTwoStepVerificationEmailConfirmationTab(this.slider);
=======
          const tab = this.slider.createTab(AppTwoStepVerificationEmailConfirmationTab);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          tab.state = this.state;
          tab.email = email;
          tab.length = symbols;
          tab.open();
        } else {
          console.log('password set error', err);
        }

        toggleButtons(false);
        d.remove();
      });
    };
    attachClickEvent(btnContinue, onContinueClick);

    const toggleButtons = (freeze: boolean) => {
      if(freeze) {
        btnContinue.setAttribute('disabled', 'true');
        btnSkip.setAttribute('disabled', 'true');
      } else {
        btnContinue.removeAttribute('disabled');
        btnSkip.removeAttribute('disabled');
      }
    };

    attachClickEvent(btnSkip, (e) => {
      const popup = new PopupPeer('popup-skip-email', {
        buttons: [{
          langKey: 'Cancel',
          isCancel: true
        }, {
          langKey: 'YourEmailSkip',
          callback: () => {
            //inputContent.classList.add('sidebar-left-section-disabled');
            toggleButtons(true);
            putPreloader(btnSkip);
<<<<<<< HEAD
            passwordManager.updateSettings({
=======
            this.managers.passwordManager.updateSettings({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              hint: this.hint, 
              currentPassword: this.plainPassword,
              newPassword: this.newPassword,
              email: ''
            }).then(() => {
              goNext();
            }, (err) => {
              toggleButtons(false);
            });
          },
          isDanger: true,
        }], 
        titleLangKey: 'YourEmailSkipWarning',
        descriptionLangKey: 'YourEmailSkipWarningText'
      });

      popup.show();
    });

    inputWrapper.append(inputField.container, btnContinue, btnSkip);

    inputContent.append(inputWrapper);

    this.scrollable.container.append(section.container);
  }

  onOpenAfterTimeout() {
    if(!canFocus(this.isFirst)) return;
    this.inputField.input.focus();
  }
}
