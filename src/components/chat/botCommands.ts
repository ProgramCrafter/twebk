/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import type { AppProfileManager } from "../../lib/appManagers/appProfileManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import type ChatInput from "./input";
import callbackify from "../../helpers/callbackify";
import AutocompletePeerHelper from "./autocompletePeerHelper";
import { processPeerFullForCommands } from "./commandsHelper";
<<<<<<< HEAD
=======
import { AppManagers } from "../../lib/appManagers/managers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

const CLASS_NAME = 'bot-commands';
export default class ChatBotCommands extends AutocompletePeerHelper {
  private userId: UserId;

  constructor(
    appendTo: HTMLElement,
<<<<<<< HEAD
    private chatInput: ChatInput,
    private appProfileManager: AppProfileManager
=======
    chatInput: ChatInput,
    private managers: AppManagers
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  ) {
    super(appendTo, undefined, CLASS_NAME, (target) => {
      const innerHTML = target.querySelector(`.${AutocompletePeerHelper.BASE_CLASS_LIST_ELEMENT}-name`).innerHTML;
      return chatInput.getReadyToSend(() => {
        chatInput.messageInput.innerHTML = innerHTML;
        chatInput.sendMessage(true);
        this.toggle(true);
      });
    });
  }

  public setUserId(userId: UserId, middleware: () => boolean) {
    if(this.userId === userId && this.list?.childElementCount) {
      this.toggle(false);
      return;
    }

    this.userId = userId;
<<<<<<< HEAD
    return callbackify(this.appProfileManager.getProfile(userId), (full) => {
      if(!middleware()) return;
      const filtered = processPeerFullForCommands(full);
=======
    return callbackify(this.managers.appProfileManager.getProfile(userId), (full) => {
      if(!middleware()) return;
      const filtered = processPeerFullForCommands(userId.toPeerId(false), full);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      
      const PADDING_TOP = 8;
      // const PADDING_BOTTOM = 8;
      const PADDING_BOTTOM = 24;
      const height = filtered.length * 50 + PADDING_TOP + PADDING_BOTTOM;
      this.container.style.setProperty('--height', height + 'px');

      this.render(filtered);
      
      // this.container.style.top = 
    });
  }
}
