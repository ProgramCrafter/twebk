/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type ChatInput from "./input";
<<<<<<< HEAD
import type { AppProfileManager } from "../../lib/appManagers/appProfileManager";
import type { AppUsersManager } from "../../lib/appManagers/appUsersManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import type { BotInfo, ChatFull, UserFull } from "../../layer";
import AutocompleteHelperController from "./autocompleteHelperController";
import AutocompletePeerHelper from "./autocompletePeerHelper";
import SearchIndex from "../../lib/searchIndex";
<<<<<<< HEAD

export function processPeerFullForCommands(full: ChatFull.chatFull | ChatFull.channelFull | UserFull.userFull, query?: string) {
=======
import { AppManagers } from "../../lib/appManagers/managers";

export function processPeerFullForCommands(peerId: PeerId, full: ChatFull.chatFull | ChatFull.channelFull | UserFull.userFull, query?: string) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  const botInfos: BotInfo.botInfo[] = [].concat(full.bot_info);
  let index: SearchIndex<string>; 
  
  if(query !== undefined) {
    index = new SearchIndex<string>({
      ignoreCase: true
    });
  }
  
  type T = {peerId: PeerId, name: string, description: string, index: number, command: string};
  const commands: Map<string, T> = new Map();
<<<<<<< HEAD
  botInfos.forEach(botInfo => {
    botInfo.commands.forEach((botCommand, idx) => {
      const c = '/' + botCommand.command;
      commands.set(botCommand.command, {
        peerId: botInfo.user_id.toPeerId(false), 
        command: botCommand.command, 
        name: c, 
        description: botCommand.description,
=======
  botInfos.forEach((botInfo) => {
    botInfo.commands.forEach(({command, description}, idx) => {
      const c = '/' + command;
      commands.set(command, {
        peerId: botInfo.user_id ? botInfo.user_id.toPeerId(false) : peerId, 
        command: command, 
        name: c, 
        description: description,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        index: idx
      });

      if(index) {
<<<<<<< HEAD
        index.indexObject(botCommand.command, c);
=======
        index.indexObject(command, c);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    });
  });

  let out: T[];
  if(!index) {
    out = [...commands.values()];
  } else {
    const found = index.search(query);
<<<<<<< HEAD
    out = Array.from(found).map(command => commands.get(command));
=======
    out = Array.from(found).map((command) => commands.get(command));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  out = out.sort((a, b) => commands.get(a.command).index - commands.get(b.command).index);
  
  return out;
}

export default class CommandsHelper extends AutocompletePeerHelper {
<<<<<<< HEAD
  constructor(appendTo: HTMLElement, 
    controller: AutocompleteHelperController, 
    chatInput: ChatInput, 
    private appProfileManager: AppProfileManager,
    private appUsersManager: AppUsersManager) {
=======
  constructor(
    appendTo: HTMLElement, 
    controller: AutocompleteHelperController, 
    chatInput: ChatInput, 
    private managers: AppManagers
  ) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    super(appendTo, 
      controller,
      'commands-helper',
      (target) => {
        const innerHTML = target.querySelector(`.${AutocompletePeerHelper.BASE_CLASS_LIST_ELEMENT}-name`).innerHTML;
        return chatInput.getReadyToSend(() => {
          chatInput.messageInput.innerHTML = innerHTML;
          chatInput.sendMessage(true);
        });
      }
    );
  }

<<<<<<< HEAD
  public checkQuery(query: string, peerId: PeerId) {
    if(!this.appUsersManager.isBot(peerId)) {
=======
  public async checkQuery(query: string, peerId: PeerId) {
    if(!(await this.managers.appUsersManager.isBot(peerId))) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return false;
    }

    const middleware = this.controller.getMiddleware();
<<<<<<< HEAD
    Promise.resolve(this.appProfileManager.getProfileByPeerId(peerId)).then(full => {
=======
    this.managers.appProfileManager.getProfileByPeerId(peerId).then((full) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!middleware()) {
        return;
      }

<<<<<<< HEAD
      const filtered = processPeerFullForCommands(full, query);
=======
      const filtered = processPeerFullForCommands(peerId, full, query);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.render(filtered);
      // console.log('found commands', found, filtered);
    });

    return true;
  }
}
