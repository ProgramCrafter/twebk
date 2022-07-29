/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "../..";
import { attachClickEvent } from "../../../../helpers/dom/clickEvent";
<<<<<<< HEAD
import appStickersManager from "../../../../lib/appManagers/appStickersManager";
import Button from "../../../button";
import { SliderSuperTab } from "../../../slider";
import { wrapSticker } from "../../../wrappers";
=======
import Button from "../../../button";
import { SliderSuperTab } from "../../../slider";
import wrapStickerEmoji from "../../../wrappers/stickerEmoji";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import AppSettingsTab from "../settings";

export default class AppTwoStepVerificationSetTab extends SliderSuperTab {
  protected init() {
    this.container.classList.add('two-step-verification', 'two-step-verification-set');
    this.setTitle('TwoStepVerificationPasswordSet');

    const section = new SettingSection({
<<<<<<< HEAD
      caption: 'TwoStepVerificationPasswordSetInfo',
=======
      captionOld: 'TwoStepVerificationPasswordSetInfo',
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      noDelimiter: true
    });

    const emoji = '🥳';
<<<<<<< HEAD
    const doc = appStickersManager.getAnimatedEmojiSticker(emoji);
    const stickerContainer = document.createElement('div');

    if(doc) {
      wrapSticker({
        doc,
        div: stickerContainer,
        loop: true,
        play: true,
        width: 160,
        height: 160
      }).then(() => {
        // this.animation = player;
      });
    } else {
      stickerContainer.classList.add('media-sticker-wrapper');
    }
=======
    const stickerContainer = document.createElement('div');

    wrapStickerEmoji({
      emoji,
      div: stickerContainer,
      width: 160,
      height: 160
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    section.content.append(stickerContainer);

    const inputContent = section.generateContentElement();

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');

    const btnReturn = Button('btn-primary btn-color-primary', {text: 'TwoStepVerificationPasswordReturnSettings'});

    attachClickEvent(btnReturn, (e) => {
      this.close();
    });

    this.slider.sliceTabsUntilTab(AppSettingsTab, this);

    inputWrapper.append(btnReturn);

    inputContent.append(inputWrapper);

    this.scrollable.container.append(section.container);
  }
}
