/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { PrivacyType } from "../../../../lib/appManagers/appPrivacyManager";
import { SliderSuperTabEventable } from "../../../sliderTab";
import PrivacySection, { PrivacySectionStr } from "../../../privacySection";
import { i18n, LangPackKey } from "../../../../lib/langPack";
import anchorCopy from "../../../../helpers/dom/anchorCopy";

export default class AppPrivacyPhoneNumberTab extends SliderSuperTabEventable {
  protected init() {
=======
import { SliderSuperTabEventable } from "../../../sliderTab";
import PrivacySection from "../../../privacySection";
import { i18n, LangPackKey } from "../../../../lib/langPack";
import anchorCopy from "../../../../helpers/dom/anchorCopy";
import PrivacyType from "../../../../lib/appManagers/utils/privacy/privacyType";

export default class AppPrivacyPhoneNumberTab extends SliderSuperTabEventable {
  protected async init() {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.header.classList.add('with-border');
    this.container.classList.add('privacy-tab', 'privacy-phone-number');
    this.setTitle('PrivacyPhone');

<<<<<<< HEAD
=======
    const formatted = '+' + (await this.managers.appUsersManager.getSelf()).phone;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const captionEl = document.createElement('div');
    captionEl.append(
      i18n('PrivacyPhoneInfo'), 
      document.createElement('br'), 
      document.createElement('br'), 
      i18n('PrivacyPhoneInfo4'),
      document.createElement('br'),
      anchorCopy({
<<<<<<< HEAD
        mePath: '+380509144504'
=======
        mePath: formatted
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      })
    );

    const phoneSection = new PrivacySection({
      tab: this,
      title: 'PrivacyPhoneTitle',
      inputKey: 'inputPrivacyKeyPhoneNumber',
      captions: [captionEl, captionEl, ''],
      exceptionTexts: ['PrivacySettingsController.NeverShare', 'PrivacySettingsController.AlwaysShare'],
      appendTo: this.scrollable,
      onRadioChange: (type) => {
        s.setRadio(PrivacyType.Everybody);
        s.radioSection.container.classList.toggle('hide', type !== PrivacyType.Nobody);
<<<<<<< HEAD
      }
=======
      },
      managers: this.managers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    const sCaption: LangPackKey = 'PrivacyPhoneInfo3';
    const s = new PrivacySection({
      tab: this,
      title: 'PrivacyPhoneTitle2',
      inputKey: 'inputPrivacyKeyAddedByPhone',
      captions: [sCaption, sCaption, ''],
      noExceptions: true,
<<<<<<< HEAD
      skipTypes: [PrivacyType.Nobody]
=======
      skipTypes: [PrivacyType.Nobody],
      managers: this.managers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    this.scrollable.container.insertBefore(s.radioSection.container, phoneSection.radioSection.container.nextSibling);
  }
}
