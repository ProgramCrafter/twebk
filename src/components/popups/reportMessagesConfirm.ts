/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { ReportReason } from "../../layer";
<<<<<<< HEAD
import appMessagesManager from "../../lib/appManagers/appMessagesManager";
import appStickersManager from "../../lib/appManagers/appStickersManager";
import InputField from "../inputField";
import { toastNew } from "../toast";
import { wrapSticker } from "../wrappers";
=======
import InputField from "../inputField";
import { toastNew } from "../toast";
import wrapStickerEmoji from "../wrappers/stickerEmoji";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupPeer from "./peer";

export default class PopupReportMessagesConfirm extends PopupPeer {
  public static STICKER_EMOJI = '👮‍♀️';
  constructor(peerId: PeerId, mids: number[], reason: ReportReason['_'], onConfirm?: () => void) {
    super('popup-report-messages-confirm', {
      noTitle: true, 
      descriptionLangKey: 'ReportInfo', 
      buttons: [{
        langKey: 'ReportChat',
        callback: () => {
          if(!inputField.isValid()) {
            return;
          }

          onConfirm && onConfirm();
<<<<<<< HEAD
          appMessagesManager.reportMessages(peerId, mids, reason, inputField.value).then(bool => {
=======
          this.managers.appMessagesManager.reportMessages(peerId, mids, reason, inputField.value).then((bool) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            if(!bool) return;

            toastNew({
              langPackKey: 'ReportSentInfo'
            });
          });
        }
      }], 
      body: true
    });

    const div = document.createElement('div');
<<<<<<< HEAD
    const doc = appStickersManager.getAnimatedEmojiSticker(PopupReportMessagesConfirm.STICKER_EMOJI);
    const size = 100;
    wrapSticker({
      doc,
=======
    const size = 100;
    wrapStickerEmoji({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      div,
      emoji: PopupReportMessagesConfirm.STICKER_EMOJI,
      width: size,
      height: size,
<<<<<<< HEAD
      loop: false,
      play: true
    }).finally(() => {
=======
    }).then(({render}) => render).finally(() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.show();
    });

    this.header.append(div);

    const inputField = new InputField({
      label: 'ReportHint',
      maxLength: 512,
      placeholder: 'ReportChatDescription'
    });

    inputField.input.addEventListener('input', () => {
      this.buttons[0].element.toggleAttribute('disabled', !inputField.isValid());
    });

    this.body.append(inputField.container);
  }
}
