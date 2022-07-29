/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import cancelEvent from "../helpers/dom/cancelEvent";
import { attachClickEvent } from "../helpers/dom/clickEvent";
import loadFonts from "../helpers/dom/loadFonts";
import { Config, LangPackDifference, LangPackString } from "../layer";
import I18n, { LangPackKey } from "../lib/langPack";
<<<<<<< HEAD
import apiManager from "../lib/mtproto/mtprotoworker";
import rootScope from "../lib/rootScope";
import Button from "./button";
import { putPreloader } from "./misc";
=======
import rootScope from "../lib/rootScope";
import Button from "./button";
import { putPreloader } from "./putPreloader";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

let set = false;

function getLang(): Promise<[Config.config, LangPackString[], LangPackDifference.langPackDifference]> {
  if(cachedPromise) return cachedPromise;
<<<<<<< HEAD
  return cachedPromise = apiManager.getConfig().then(config => {
=======
  return cachedPromise = rootScope.managers.apiManager.getConfig().then((config) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(config.suggested_lang_code !== I18n.lastRequestedLangCode) {
      //I18n.loadLangPack(config.suggested_lang_code);

      return Promise.all([
        config,
        I18n.getStrings(config.suggested_lang_code, ['Login.ContinueOnLanguage']),
        I18n.getCacheLangPack()
      ]);
    } else {
      return [] as any;
    }
  });
}

let cachedPromise: ReturnType<typeof getLang>;

export default function getLanguageChangeButton(appendTo: HTMLElement) {
  if(set) return;
  getLang().then(([config, strings]) => {
    if(!config) {
      return;
    }

    const backup: LangPackString[] = [];
<<<<<<< HEAD
    strings.forEach(string => {
=======
    strings.forEach((string) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const backupString = I18n.strings.get(string.key as LangPackKey);
      if(!backupString) {
        return;
      }
      
      backup.push(backupString);
      I18n.strings.set(string.key as LangPackKey, string);
    });

    const key: LangPackKey = 'Login.ContinueOnLanguage';
    const btnChangeLanguage = Button('btn-primary btn-secondary btn-primary-transparent primary', {text: key});
    btnChangeLanguage.lastElementChild.classList.remove('i18n'); // prevent changing language
    loadFonts({text: [I18n.format(key, true)]}).then(() => {
      window.requestAnimationFrame(() => {
        appendTo.append(btnChangeLanguage);
      });
    });

    rootScope.addEventListener('language_change', () => {
      btnChangeLanguage.remove();
    }, {once: true});

<<<<<<< HEAD
    backup.forEach(string => {
=======
    backup.forEach((string) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      I18n.strings.set(string.key as LangPackKey, string);
    });
    
    attachClickEvent(btnChangeLanguage, (e) => {
      cancelEvent(e);

      set = true;

      btnChangeLanguage.disabled = true;
      putPreloader(btnChangeLanguage);

      I18n.getLangPack(config.suggested_lang_code);
    });
  });
}
