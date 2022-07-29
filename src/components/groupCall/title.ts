/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import setInnerHTML from "../../helpers/dom/setInnerHTML";
import { GroupCall } from "../../layer";
import GroupCallInstance from "../../lib/calls/groupCallInstance";
<<<<<<< HEAD
import RichTextProcessor from "../../lib/richtextprocessor";
=======
import wrapEmojiText from "../../lib/richTextProcessor/wrapEmojiText";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PeerTitle from "../peerTitle";

export default class GroupCallTitleElement {
  private peerTitle: PeerTitle;

  constructor(private appendTo: HTMLElement) {
    this.peerTitle = new PeerTitle({peerId: 0});
  }

  public update(instance: GroupCallInstance) {
    const {peerTitle, appendTo} = this;
    const groupCall = instance.groupCall as GroupCall.groupCall;
    const peerId = instance.chatId.toPeerId(true);
    if(groupCall.title) {
<<<<<<< HEAD
      setInnerHTML(appendTo, RichTextProcessor.wrapEmojiText(groupCall.title));
=======
      setInnerHTML(appendTo, wrapEmojiText(groupCall.title));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    } else {
      if(peerTitle.peerId !== peerId) {
        peerTitle.peerId = peerId;
        peerTitle.update();
      }

      if(peerTitle.element.parentElement !== appendTo) {
        appendTo.append(peerTitle.element);
      }
    } 
  }
}
