/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { attachClickEvent } from "../../helpers/dom/clickEvent";
import findUpClassName from "../../helpers/dom/findUpClassName";
import whichChild from "../../helpers/dom/whichChild";
<<<<<<< HEAD
import { ReportReason } from "../../layer";
import appStickersManager from "../../lib/appManagers/appStickersManager";
=======
import preloadAnimatedEmojiSticker from "../../helpers/preloadAnimatedEmojiSticker";
import { ReportReason } from "../../layer";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { LangPackKey } from "../../lib/langPack";
import Button from "../button";
import PopupPeer from "./peer";
import PopupReportMessagesConfirm from "./reportMessagesConfirm";

export default class PopupReportMessages extends PopupPeer {
  constructor(peerId: PeerId, mids: number[], onConfirm?: () => void) {
    super('popup-report-messages', {titleLangKey: 'ChatTitle.ReportMessages', buttons: [], body: true});

    mids = mids.slice();

    const buttons: [LangPackKey, ReportReason['_']][] = [
      ['ReportChatSpam', 'inputReportReasonSpam'],
      ['ReportChatViolence', 'inputReportReasonViolence'],
      ['ReportChatChild', 'inputReportReasonChildAbuse'],
      ['ReportChatPornography', 'inputReportReasonPornography'],
      ['ReportChatOther', 'inputReportReasonOther'],
      ['ReportChatPersonalDetails', 'inputReportReasonPersonalDetails'],
      ['ReportChatIllegalDrugs', 'inputReportReasonIllegalDrugs']
    ];

    const className = 'btn-primary btn-transparent';
<<<<<<< HEAD
    buttons.forEach(b => {
=======
    buttons.forEach((b) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const button = Button(className, {/* icon: 'edit',  */text: b[0]});
      this.body.append(button);
    });

<<<<<<< HEAD
    const preloadStickerPromise = appStickersManager.preloadAnimatedEmojiSticker(PopupReportMessagesConfirm.STICKER_EMOJI);
=======
    const preloadStickerPromise = preloadAnimatedEmojiSticker(PopupReportMessagesConfirm.STICKER_EMOJI);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    attachClickEvent(this.body, (e) => {
      const target = findUpClassName(e.target, 'btn-primary');
      const reason = buttons[whichChild(target)][1];

      preloadStickerPromise.then(() => {
        this.hide();

        new PopupReportMessagesConfirm(peerId, mids, reason, onConfirm);
      });
    }, {listenerSetter: this.listenerSetter});
    
    this.body.style.margin = '0 -1rem';
    this.buttonsEl.style.marginTop = '.5rem';

    this.show();
  }
}
