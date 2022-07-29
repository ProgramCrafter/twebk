/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "..";
<<<<<<< HEAD
import appReactionsManager from "../../../lib/appManagers/appReactionsManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import RadioField from "../../radioField";
import Row, { RadioFormFromRows } from "../../row";
import SliderSuperTab from "../../sliderTab";
import { wrapStickerToRow } from "../../wrappers";

export default class AppQuickReactionTab extends SliderSuperTab {
  protected init() {
    this.header.classList.add('with-border');
    this.setTitle('DoubleTapSetting');
    this.container.classList.add('quick-reaction-container');

    return Promise.all([
<<<<<<< HEAD
      appReactionsManager.getQuickReaction(),
      appReactionsManager.getAvailableReactions()
    ]).then(([quickReaction, availableReactions]) => {
      availableReactions = availableReactions.filter(reaction => !reaction.pFlags.inactive);
=======
      this.managers.appReactionsManager.getQuickReaction(),
      this.managers.appReactionsManager.getAvailableReactions()
    ]).then(([quickReaction, availableReactions]) => {
      availableReactions = availableReactions.filter((reaction) => !reaction.pFlags.inactive);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      const section = new SettingSection();

      const name = 'quick-reaction';
      const rows = availableReactions.map((availableReaction) => {
        const radioField = new RadioField({
          name,
          text: availableReaction.title,
          value: availableReaction.reaction,
          alignRight: true
        });

        const row = new Row({
          radioField,
          havePadding: true
        });

        radioField.main.classList.add('quick-reaction-title');

        wrapStickerToRow({
          row,
          doc: availableReaction.static_icon,
          size: 'small'
        });

<<<<<<< HEAD
        if(availableReaction === quickReaction) {
=======
        if(availableReaction.reaction === quickReaction.reaction) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          radioField.setValueSilently(true);
        }

        return row;
      });

      const form = RadioFormFromRows(rows, (value) => {
<<<<<<< HEAD
        appReactionsManager.setDefaultReaction(value);
=======
        this.managers.appReactionsManager.setDefaultReaction(value);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      section.content.append(form);
      this.scrollable.append(section.container);
    });
  }
}
