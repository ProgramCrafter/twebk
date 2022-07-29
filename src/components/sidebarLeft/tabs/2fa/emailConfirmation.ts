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
import passwordManager from "../../../../lib/mtproto/passwordManager";
import AppTwoStepVerificationSetTab from "./passwordSet";
import CodeInputField from "../../../codeInputField";
import AppTwoStepVerificationEmailTab from "./email";
import { putPreloader } from "../../../misc";
=======
import Button from "../../../button";
import { SliderSuperTab } from "../../../slider";
import AppTwoStepVerificationSetTab from "./passwordSet";
import CodeInputField from "../../../codeInputField";
import AppTwoStepVerificationEmailTab from "./email";
import { putPreloader } from "../../../putPreloader";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { i18n, _i18n } from "../../../../lib/langPack";
import { canFocus } from "../../../../helpers/dom/canFocus";
import { attachClickEvent } from "../../../../helpers/dom/clickEvent";
import replaceContent from "../../../../helpers/dom/replaceContent";
import toggleDisability from "../../../../helpers/dom/toggleDisability";
<<<<<<< HEAD
=======
import wrapStickerEmoji from "../../../wrappers/stickerEmoji";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppTwoStepVerificationEmailConfirmationTab extends SliderSuperTab {
  public codeInputField: CodeInputField;
  public state: AccountPassword;
  public email: string;
  public length: number;
  public isFirst = false;

  protected init() {
    this.container.classList.add('two-step-verification', 'two-step-verification-email-confirmation');
    this.setTitle('TwoStepAuth.RecoveryTitle');

    const section = new SettingSection({
<<<<<<< HEAD
      caption: true,
=======
      captionOld: true,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      noDelimiter: true
    });

    _i18n(section.caption, 'TwoStepAuth.ConfirmEmailCodeDesc', [this.email]);

    const emoji = '📬';
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

    const inputField = this.codeInputField = new CodeInputField({
      name: 'recovery-email-code',
      label: 'TwoStepAuth.RecoveryCode',
      length: this.length,
      onFill: (code) => {
        freeze(true);
        
<<<<<<< HEAD
        passwordManager.confirmPasswordEmail('' + code)
        .then(value => {
=======
        this.managers.passwordManager.confirmPasswordEmail('' + code)
        .then((value) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          if(!value) {

          }

          goNext();
        })
<<<<<<< HEAD
        .catch(err => {
=======
        .catch((err) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          switch(err.type) {
            case 'CODE_INVALID':
              inputField.input.classList.add('error');
              replaceContent(inputField.label, i18n('TwoStepAuth.RecoveryCodeInvalid'));
              break;

            case 'EMAIL_HASH_EXPIRED':
              inputField.input.classList.add('error');
              replaceContent(inputField.label, i18n('TwoStepAuth.RecoveryCodeExpired'));
              break;
            
            default:
              console.error('confirm error', err);
              break;
          }

          freeze(false);
        });
      }
    });

    const btnChange = Button('btn-primary btn-primary-transparent primary', {text: 'TwoStepAuth.EmailCodeChangeEmail'});
    const btnResend = Button('btn-primary btn-secondary btn-primary-transparent primary', {text: 'ResendCode'});

    const goNext = () => {
<<<<<<< HEAD
      new AppTwoStepVerificationSetTab(this.slider).open();
=======
      this.slider.createTab(AppTwoStepVerificationSetTab).open();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    const freeze = (disable: boolean) => {
      toggleDisability([inputField.input, btnChange, btnResend], disable);
    };

    attachClickEvent(btnChange, (e) => {
      freeze(true);
<<<<<<< HEAD
      passwordManager.cancelPasswordEmail().then(value => {
=======
      this.managers.passwordManager.cancelPasswordEmail().then((value) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.slider.sliceTabsUntilTab(AppTwoStepVerificationEmailTab, this);
        this.close();
      }, () => {
        freeze(false);
      });
    });

    attachClickEvent(btnResend, (e) => {
      freeze(true);
      const d = putPreloader(btnResend);
<<<<<<< HEAD
      passwordManager.resendPasswordEmail().then(value => {
=======
      this.managers.passwordManager.resendPasswordEmail().then((value) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        d.remove();
        freeze(false);
      });
    });

    inputWrapper.append(inputField.container, btnChange, btnResend);

    inputContent.append(inputWrapper);

    this.scrollable.container.append(section.container);
  }

  onOpenAfterTimeout() {
    if(!canFocus(this.isFirst)) return;
    this.codeInputField.input.focus();
  }
}
