/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "..";
import { randomLong } from "../../../helpers/random";
import I18n from "../../../lib/langPack";
<<<<<<< HEAD
import apiManager from "../../../lib/mtproto/mtprotoworker";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import RadioField from "../../radioField";
import Row, { RadioFormFromRows } from "../../row";
import { SliderSuperTab } from "../../slider"

export default class AppLanguageTab extends SliderSuperTab {
  protected async init() {
    this.header.classList.add('with-border');
    this.container.classList.add('language-container');
    this.setTitle('Telegram.LanguageViewController');

    const section = new SettingSection({});

    const radioRows: Map<string, Row> = new Map();

<<<<<<< HEAD
    const promise = apiManager.invokeApiCacheable('langpack.getLanguages', {
      lang_pack: 'macos'
    }).then((languages) => {
      const random = randomLong();
      languages.forEach((language) => {
=======
    const promise = Promise.all([
      this.managers.apiManager.invokeApiCacheable('langpack.getLanguages', {
        lang_pack: 'web'
      }),
      this.managers.apiManager.invokeApiCacheable('langpack.getLanguages', {
        lang_pack: 'macos'
      }),
    ]).then(([languages1, languages2]) => {
      const rendered: Set<string> = new Set();
      const webLangCodes = languages1.map((language) => language.lang_code);

      const random = randomLong();
      languages1.concat(languages2).forEach((language) => {
        if(rendered.has(language.lang_code)) return;
        rendered.add(language.lang_code);

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const row = new Row({
          radioField: new RadioField({
            text: language.name, 
            name: random, 
            value: language.lang_code
          }),
          subtitle: language.native_name
        });
        
        radioRows.set(language.lang_code, row);
      });

      const form = RadioFormFromRows([...radioRows.values()], (value) => {
<<<<<<< HEAD
        I18n.getLangPack(value);
      });
  
      I18n.getCacheLangPack().then(langPack => {
=======
        I18n.getLangPack(value, webLangCodes.includes(value));
      });
  
      I18n.getCacheLangPack().then((langPack) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const row = radioRows.get(langPack.lang_code);
        if(!row) {
          console.error('no row', row, langPack);
          return;
        }
  
        row.radioField.setValueSilently(true);
      });
  
      section.content.append(form);
    });

    this.scrollable.append(section.container);

    return promise;
  }
}
