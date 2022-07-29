/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import AvatarElement from "../avatar";
import PopupElement, { addCancelButton, PopupButton, PopupOptions } from ".";
import { i18n, LangPackKey } from "../../lib/langPack";
import CheckboxField, { CheckboxFieldOptions } from "../checkboxField";
import setInnerHTML from "../../helpers/dom/setInnerHTML";

export type PopupPeerButton = Omit<PopupButton, 'callback'> & Partial<{callback: PopupPeerButtonCallback}>;
export type PopupPeerButtonCallbackCheckboxes = Set<LangPackKey>;
export type PopupPeerButtonCallback = (checkboxes?: PopupPeerButtonCallbackCheckboxes) => void;
export type PopupPeerCheckboxOptions = CheckboxFieldOptions & {checkboxField?: CheckboxField};

<<<<<<< HEAD
export type PopupPeerOptions = PopupOptions & Partial<{
  peerId: PeerId,
  title: string | HTMLElement,
  titleLangKey?: LangPackKey,
  titleLangArgs?: any[],
  noTitle?: boolean,
  description: string | DocumentFragment,
  descriptionLangKey?: LangPackKey,
  descriptionLangArgs?: any[],
  buttons?: Array<PopupPeerButton>,
=======
export type PopupPeerOptions = Omit<PopupOptions, 'buttons' | 'title'> & Partial<{
  peerId: PeerId,
  title: string | HTMLElement,
  titleLangKey: LangPackKey,
  titleLangArgs: any[],
  noTitle: boolean,
  description: string | DocumentFragment,
  descriptionLangKey: LangPackKey,
  descriptionLangArgs: any[],
  buttons: Array<PopupPeerButton>,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  checkboxes: Array<PopupPeerCheckboxOptions>
}>;
export default class PopupPeer extends PopupElement {
  protected description: HTMLParagraphElement;

  constructor(private className: string, options: PopupPeerOptions = {}) {
<<<<<<< HEAD
    super('popup-peer' + (className ? ' ' + className : ''), options.buttons && addCancelButton(options.buttons), {overlayClosable: true, ...options});
=======
    super('popup-peer' + (className ? ' ' + className : ''), {
      overlayClosable: true, 
      ...options,
      title: true,
      buttons: options.buttons && addCancelButton(options.buttons),
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    if(options.peerId) {
      const avatarEl = new AvatarElement();
      avatarEl.classList.add('avatar-32');
      avatarEl.updateWithOptions({
        isDialog: true,
        peerId: options.peerId
      });
      this.header.prepend(avatarEl);
    }

    if(!options.noTitle) {
      if(options.titleLangKey || !options.title) this.title.append(i18n(options.titleLangKey || 'AppName', options.titleLangArgs));
      else if(options.title instanceof HTMLElement) {
        this.title.append(options.title);
      } else this.title.innerText = options.title || '';
    }

    const fragment = document.createDocumentFragment();

    if(options.descriptionLangKey || options.description) {
      const p = this.description = document.createElement('p');
      p.classList.add('popup-description');
      if(options.descriptionLangKey) p.append(i18n(options.descriptionLangKey, options.descriptionLangArgs));
      else if(options.description) setInnerHTML(p, options.description);
  
      fragment.append(p);
    }

    if(options.checkboxes) {
      this.container.classList.add('have-checkbox');
      
<<<<<<< HEAD
      options.checkboxes.forEach(o => {
        o.withRipple = false;
=======
      options.checkboxes.forEach((o) => {
        o.withRipple = true;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const checkboxField = new CheckboxField(o);
        o.checkboxField = checkboxField;
        fragment.append(checkboxField.label);
      });

<<<<<<< HEAD
      options.buttons.forEach(button => {
=======
      options.buttons.forEach((button) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(button.callback) {
          const original = button.callback;
          button.callback = () => {
            const c: Set<LangPackKey> = new Set();
<<<<<<< HEAD
            options.checkboxes.forEach(o => {
=======
            options.checkboxes.forEach((o) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              if(o.checkboxField.checked) {
                c.add(o.text);
              }
            });
            original(c);
          };
        }
      });
    }

    this.container.insertBefore(fragment, this.header.nextElementSibling);
  }
}
