/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import blurActiveElement from "../helpers/dom/blurActiveElement";
import loadFonts from "../helpers/dom/loadFonts";
<<<<<<< HEAD
import appStateManager from "../lib/appManagers/appStateManager";
import I18n from "../lib/langPack";
import Page from "./page";

let onFirstMount = () => {
  appStateManager.pushToState('authState', {_: 'authStateSignedIn'});
=======
import I18n from "../lib/langPack";
import rootScope from "../lib/rootScope";
import Page from "./page";

let onFirstMount = () => {
  rootScope.managers.appStateManager.pushToState('authState', {_: 'authStateSignedIn'});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  // ! TOO SLOW
  /* appStateManager.saveState(); */

  if(!I18n.requestedServerLanguage) {
<<<<<<< HEAD
    I18n.getCacheLangPack().then(langPack => {
=======
    I18n.getCacheLangPack().then((langPack) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(langPack.local) {
        I18n.getLangPack(langPack.lang_code);
      }
    });
  }

  page.pageEl.style.display = '';
  
  //AudioContext && global.navigator && global.navigator.mediaDevices && global.navigator.mediaDevices.getUserMedia && global.WebAssembly;

  /* // @ts-ignore
  var AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
  alert('AudioContext:' + typeof(AudioContext));
  // @ts-ignore
  alert('global.navigator:' + typeof(navigator));
  alert('navigator.mediaDevices:' + typeof(navigator.mediaDevices));
  alert('navigator.mediaDevices.getUserMedia:' + typeof(navigator.mediaDevices?.getUserMedia));
  alert('global.WebAssembly:' + typeof(WebAssembly)); */

<<<<<<< HEAD
  //(Array.from(document.getElementsByClassName('rp')) as HTMLElement[]).forEach(el => ripple(el));
=======
  //(Array.from(document.getElementsByClassName('rp')) as HTMLElement[]).forEach((el) => ripple(el));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  blurActiveElement();

  return Promise.all([
    loadFonts()/* .then(() => new Promise((resolve) => window.requestAnimationFrame(resolve))) */,
    import('../lib/appManagers/appDialogsManager')
  ]).then(() => {
    setTimeout(() => {
      document.getElementById('auth-pages').remove();
    }, 1e3);
  });
};

const page = new Page('page-chats', false, onFirstMount);
export default page;
