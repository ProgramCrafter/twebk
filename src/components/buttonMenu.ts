/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import cancelEvent from "../helpers/dom/cancelEvent";
import { AttachClickOptions, attachClickEvent, CLICK_EVENT_NAME } from "../helpers/dom/clickEvent";
import ListenerSetter from "../helpers/listenerSetter";
import { FormatterArguments, i18n, LangPackKey } from "../lib/langPack";
import CheckboxField from "./checkboxField";
import { closeBtnMenu } from "./misc";
import ripple from "./ripple";
=======
import contextMenuController from "../helpers/contextMenuController";
import cancelEvent from "../helpers/dom/cancelEvent";
import { AttachClickOptions, attachClickEvent } from "../helpers/dom/clickEvent";
import findUpClassName from "../helpers/dom/findUpClassName";
import ListenerSetter from "../helpers/listenerSetter";
import { FormatterArguments, i18n, LangPackKey } from "../lib/langPack";
import CheckboxField from "./checkboxField";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type ButtonMenuItemOptions = {
  icon?: string, 
  text?: LangPackKey, 
  textArgs?: FormatterArguments,
  regularText?: string, 
<<<<<<< HEAD
  onClick: (e: MouseEvent | TouchEvent) => void | boolean, 
=======
  onClick: (e: MouseEvent | TouchEvent) => void | boolean | any, 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  element?: HTMLElement,
  textElement?: HTMLElement,
  options?: AttachClickOptions,
  checkboxField?: CheckboxField,
  noCheckboxClickListener?: boolean,
  keepOpen?: boolean
  /* , cancelEvent?: true */
};

const ButtonMenuItem = (options: ButtonMenuItemOptions) => {
  if(options.element) return options.element;

  const {icon, text, onClick, checkboxField, noCheckboxClickListener} = options;
  const el = document.createElement('div');
  el.className = 'btn-menu-item rp-overflow' + (icon ? ' tgico-' + icon : '');
<<<<<<< HEAD
  ripple(el);

  let textElement = options.textElement;
  if(!textElement) {
    textElement = options.textElement = text ? i18n(text, options.textArgs) : document.createElement('span');
    if(options.regularText) textElement.innerHTML = options.regularText;
  }
  
  textElement.classList.add('btn-menu-item-text');
  el.append(textElement);

=======
  // ripple(el);

  let textElement = options.textElement;
  if(!textElement) {
    textElement = options.textElement = text ? i18n(text, options.textArgs) : document.createElement('span');
    if(options.regularText) textElement.innerHTML = options.regularText;
  }
  
  textElement.classList.add('btn-menu-item-text');
  el.append(textElement);

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  const keepOpen = !!checkboxField || !!options.keepOpen;

  // * cancel mobile keyboard close
  onClick && attachClickEvent(el, /* CLICK_EVENT_NAME !== 'click' || keepOpen ? */ (e) => {
    cancelEvent(e);
<<<<<<< HEAD
=======

    const menu = findUpClassName(e.target, 'btn-menu');
    if(menu && !menu.classList.contains('active')) {
      return;
    }
    
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const result = onClick(e);

    if(result === false) {
      return;
    }

    if(!keepOpen) {
<<<<<<< HEAD
      closeBtnMenu();
=======
      contextMenuController.closeBtnMenu();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    if(checkboxField && !noCheckboxClickListener/*  && result !== false */) {
      checkboxField.checked = checkboxField.input.type === 'radio' ? true : !checkboxField.checked;
    }
  }/*  : onClick */, options.options);

  if(checkboxField) {
    el.append(checkboxField.label);
  }

  return options.element = el;
};

const ButtonMenu = (buttons: ButtonMenuItemOptions[], listenerSetter?: ListenerSetter) => {
  const el = document.createElement('div');
  el.classList.add('btn-menu');

  if(listenerSetter) {
    buttons.forEach((b) => {
      if(b.options) {
        b.options.listenerSetter = listenerSetter;
      } else {
        b.options = {listenerSetter};
      }
    });
  }

  const items = buttons.map(ButtonMenuItem);

  el.append(...items);

  return el;
};

export default ButtonMenu;
