/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import debounce from "../../../helpers/schedulers/debounce";
<<<<<<< HEAD
import appChatsManager from "../../../lib/appManagers/appChatsManager";
import appProfileManager from "../../../lib/appManagers/appProfileManager";
import appReactionsManager from "../../../lib/appManagers/appReactionsManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import CheckboxField from "../../checkboxField";
import Row from "../../row";
import { SettingSection } from "../../sidebarLeft";
import { SliderSuperTabEventable } from "../../sliderTab";
import { wrapStickerToRow } from "../../wrappers";

export default class AppChatReactionsTab extends SliderSuperTabEventable {
  public chatId: ChatId;

  protected async init() {
    this.setTitle('Reactions');

<<<<<<< HEAD
    const availableReactions = await appReactionsManager.getActiveAvailableReactions();
    const chatFull = await appProfileManager.getChatFull(this.chatId);
=======
    const availableReactions = await this.managers.appReactionsManager.getActiveAvailableReactions();
    const chatFull = await this.managers.appProfileManager.getChatFull(this.chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    let originalReactions = chatFull.available_reactions ?? [];
    const enabledReactions = new Set(originalReactions);

    const toggleSection = new SettingSection({
<<<<<<< HEAD
      caption: appChatsManager.isBroadcast(this.chatId) ? 'EnableReactionsChannelInfo' : 'EnableReactionsGroupInfo'
=======
      caption: await this.managers.appChatsManager.isBroadcast(this.chatId) ? 'EnableReactionsChannelInfo' : 'EnableReactionsGroupInfo'
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    const toggleCheckboxField = new CheckboxField({toggle: true, checked: !!enabledReactions.size});
    const toggleRow = new Row({
      checkboxField: toggleCheckboxField,
<<<<<<< HEAD
      titleLangKey: 'EnableReactions'
=======
      titleLangKey: 'EnableReactions',
      listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    toggleSection.content.append(toggleRow.container);

    const reactionsSection = new SettingSection({
      name: 'AvailableReactions'
    });

<<<<<<< HEAD
    const checkboxFields = availableReactions.map(availableReaction => {
=======
    const checkboxFields = availableReactions.map((availableReaction) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const checkboxField = new CheckboxField({
        toggle: true, 
        checked: enabledReactions.has(availableReaction.reaction)
      });

      this.listenerSetter.add(checkboxField.input)('change', () => {
        if(checkboxField.checked) {
          enabledReactions.add(availableReaction.reaction);

          if(!toggleCheckboxField.checked) {
            toggleCheckboxField.setValueSilently(true);
          }
        } else {
          enabledReactions.delete(availableReaction.reaction);

          if(!enabledReactions.size && toggleCheckboxField.checked) {
            toggleCheckboxField.setValueSilently(false);
          }
        }

        saveReactionsDebounced();
      });

      const row = new Row({
        checkboxField,
        title: availableReaction.title,
<<<<<<< HEAD
        havePadding: true
=======
        havePadding: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      wrapStickerToRow({
        row,
        doc: availableReaction.static_icon,
        size: 'small'
      });

      reactionsSection.content.append(row.container);

      return checkboxField;
    });

    this.listenerSetter.add(toggleRow.checkboxField.input)('change', () => {
      if(!toggleCheckboxField.checked) {
<<<<<<< HEAD
        checkboxFields.forEach(checkboxField => checkboxField.checked = false);
        saveReactionsDebounced();
      } else if(checkboxFields.every(checkboxField => !checkboxField.checked)) {
        checkboxFields.forEach(checkboxField => checkboxField.checked = true);
=======
        checkboxFields.forEach((checkboxField) => checkboxField.checked = false);
        saveReactionsDebounced();
      } else if(checkboxFields.every((checkboxField) => !checkboxField.checked)) {
        checkboxFields.forEach((checkboxField) => checkboxField.checked = true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        saveReactionsDebounced();
      }
    });

<<<<<<< HEAD
    const saveReactions = () => {
=======
    const saveReactions = async() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const newReactions = Array.from(enabledReactions);
      if([...newReactions].sort().join() === [...originalReactions].sort().join()) {
        return;
      }

<<<<<<< HEAD
      const chatFull = appProfileManager.getCachedFullChat(this.chatId);
=======
      const chatFull = await this.managers.appProfileManager.getCachedFullChat(this.chatId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(chatFull) {
        chatFull.available_reactions = newReactions;
      }
      
<<<<<<< HEAD
      appChatsManager.setChatAvailableReactions(this.chatId, newReactions);
=======
      this.managers.appChatsManager.setChatAvailableReactions(this.chatId, newReactions);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      originalReactions = newReactions;
    };

    const saveReactionsDebounced = debounce(saveReactions, 3000, false, true);

    this.eventListener.addEventListener('destroy', saveReactions, {once: true});

    this.scrollable.append(toggleSection.container, reactionsSection.container);
  }
}
