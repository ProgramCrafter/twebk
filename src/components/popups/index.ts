/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import rootScope from "../../lib/rootScope";
import ripple from "../ripple";
import animationIntersector from "../animationIntersector";
import appNavigationController, { NavigationItem } from "../appNavigationController";
import { i18n, LangPackKey } from "../../lib/langPack";
=======
import ripple from "../ripple";
import animationIntersector from "../animationIntersector";
import appNavigationController, { NavigationItem } from "../appNavigationController";
import { i18n, LangPackKey, _i18n } from "../../lib/langPack";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import findUpClassName from "../../helpers/dom/findUpClassName";
import blurActiveElement from "../../helpers/dom/blurActiveElement";
import ListenerSetter from "../../helpers/listenerSetter";
import { attachClickEvent, simulateClickEvent } from "../../helpers/dom/clickEvent";
import isSendShortcutPressed from "../../helpers/dom/isSendShortcutPressed";
import cancelEvent from "../../helpers/dom/cancelEvent";
import EventListenerBase, { EventListenerListeners } from "../../helpers/eventListenerBase";
import { addFullScreenListener, getFullScreenElement } from "../../helpers/dom/fullScreen";
import indexOfAndSplice from "../../helpers/array/indexOfAndSplice";
<<<<<<< HEAD
=======
import { AppManagers } from "../../lib/appManagers/managers";
import overlayCounter from "../../helpers/overlayCounter";
import Scrollable from "../scrollable";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type PopupButton = {
  text?: string,
  callback?: () => void,
  langKey?: LangPackKey,
  langArgs?: any[],
  isDanger?: true,
  isCancel?: true,
  element?: HTMLButtonElement
};

export type PopupOptions = Partial<{
<<<<<<< HEAD
  closable: true, 
  overlayClosable: true, 
  withConfirm: LangPackKey | true, 
  body: true,
  confirmShortcutIsSendShortcut: boolean,
  withoutOverlay: boolean
}>;

export interface PopupElementConstructable {
  new(...args: any[]): PopupElement;
=======
  closable: boolean, 
  overlayClosable: boolean, 
  withConfirm: LangPackKey | boolean, 
  body: boolean,
  confirmShortcutIsSendShortcut: boolean,
  withoutOverlay: boolean,
  scrollable: boolean,
  buttons: Array<PopupButton>,
  title: boolean | LangPackKey
}>;

export interface PopupElementConstructable<T extends PopupElement = any> {
  new(...args: any[]): T;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}

const DEFAULT_APPEND_TO = document.body;
let appendPopupTo = DEFAULT_APPEND_TO;

const onFullScreenChange = () => {
  appendPopupTo = getFullScreenElement() || DEFAULT_APPEND_TO;
  PopupElement.reAppend();
};

addFullScreenListener(DEFAULT_APPEND_TO, onFullScreenChange);

type PopupListeners = {
  close: () => void,
  closeAfterTimeout: () => void
};

export default class PopupElement<T extends EventListenerListeners = {}> extends EventListenerBase<PopupListeners & T> {
  private static POPUPS: PopupElement<any>[] = [];
<<<<<<< HEAD
=======
  public static MANAGERS: AppManagers;

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  protected element = document.createElement('div');
  protected container = document.createElement('div');
  protected header = document.createElement('div');
  protected title = document.createElement('div');
  protected btnClose: HTMLElement;
  protected btnConfirm: HTMLButtonElement;
  protected body: HTMLElement;
  protected buttonsEl: HTMLElement;

  protected onEscape: () => boolean = () => true;

  protected navigationItem: NavigationItem;

  protected listenerSetter: ListenerSetter;

  protected confirmShortcutIsSendShortcut: boolean;
<<<<<<< HEAD
  protected btnConfirmOnEnter: HTMLButtonElement;

  protected withoutOverlay: boolean;

  constructor(className: string, protected buttons?: Array<PopupButton>, options: PopupOptions = {}) {
=======
  protected btnConfirmOnEnter: HTMLElement;

  protected withoutOverlay: boolean;

  protected managers: AppManagers;

  protected scrollable: Scrollable;
  
  protected buttons: Array<PopupButton>;

  constructor(className: string, options: PopupOptions = {}) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    super(false);
    this.element.classList.add('popup');
    this.element.className = 'popup' + (className ? ' ' + className : '');
    this.container.classList.add('popup-container', 'z-depth-1');

    this.header.classList.add('popup-header');
<<<<<<< HEAD
    this.title.classList.add('popup-title');

    this.header.append(this.title);

    this.listenerSetter = new ListenerSetter();
=======

    if(options.title) {
      this.title.classList.add('popup-title');
      if(typeof(options.title) === 'string') {
        _i18n(this.title, options.title);
      }
      
      this.header.append(this.title);
    }

    this.listenerSetter = new ListenerSetter();
    this.managers = PopupElement.MANAGERS;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    this.confirmShortcutIsSendShortcut = options.confirmShortcutIsSendShortcut;

    if(options.closable) {
      this.btnClose = document.createElement('span');
      this.btnClose.classList.add('btn-icon', 'popup-close', 'tgico-close');
      //ripple(this.closeBtn);
      this.header.prepend(this.btnClose);

      attachClickEvent(this.btnClose, this.hide, {listenerSetter: this.listenerSetter, once: true});
    }

    this.withoutOverlay = options.withoutOverlay;
    if(this.withoutOverlay) {
      this.element.classList.add('no-overlay');
    }

    if(options.overlayClosable) {
      attachClickEvent(this.element, (e: MouseEvent) => {
        if(!findUpClassName(e.target, 'popup-container')) {
          this.hide();
        }
      }, {listenerSetter: this.listenerSetter});
    }

    if(options.withConfirm) {
      this.btnConfirm = document.createElement('button');
      this.btnConfirm.classList.add('btn-primary', 'btn-color-primary');
      if(options.withConfirm !== true) {
        this.btnConfirm.append(i18n(options.withConfirm));
      }
      this.header.append(this.btnConfirm);
      ripple(this.btnConfirm);
    }

    this.container.append(this.header);
    if(options.body) {
      this.body = document.createElement('div');
      this.body.classList.add('popup-body');
      this.container.append(this.body);
    }

<<<<<<< HEAD
    let btnConfirmOnEnter = this.btnConfirm;
    if(buttons?.length) {
      const buttonsDiv = this.buttonsEl = document.createElement('div');
      buttonsDiv.classList.add('popup-buttons');

      if(buttons.length === 2) {
        buttonsDiv.classList.add('popup-buttons-row');
      }
      
      const buttonsElements = buttons.map(b => {
=======
    if(options.scrollable) {
      const scrollable = this.scrollable = new Scrollable(this.body);
      scrollable.onAdditionalScroll = () => {
        scrollable.container.classList.toggle('scrolled-top', !scrollable.scrollTop);
        scrollable.container.classList.toggle('scrolled-bottom', scrollable.isScrolledDown);
      };

      scrollable.container.classList.add('scrolled-top', 'scrolled-bottom', 'scrollable-y-bordered');

      if(!this.body) {
        this.container.insertBefore(scrollable.container, this.header.nextSibling);
      }
    }

    let btnConfirmOnEnter = this.btnConfirm;
    const buttons = this.buttons = options.buttons;
    if(buttons?.length) {
      const buttonsDiv = this.buttonsEl = document.createElement('div');
      buttonsDiv.classList.add('popup-buttons');
      
      const buttonsElements = buttons.map((b) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const button = document.createElement('button');
        button.className = 'btn' + (b.isDanger ? ' danger' : ' primary');
        
        ripple(button);
        
        if(b.text) {
          button.innerHTML =  b.text;
        } else {
          button.append(i18n(b.langKey, b.langArgs));
        }
        
        attachClickEvent(button, () => {
          b.callback && b.callback();
          this.destroy();
        }, {listenerSetter: this.listenerSetter, once: true});
        
        return b.element = button;
      });
      
      if(!btnConfirmOnEnter && buttons.length === 2) {
<<<<<<< HEAD
        const button = buttons.find(button => !button.isCancel);
=======
        const button = buttons.find((button) => !button.isCancel);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(button) {
          btnConfirmOnEnter = button.element;
        }
      }

      buttonsDiv.append(...buttonsElements);
      this.container.append(buttonsDiv);
    }

    this.btnConfirmOnEnter = btnConfirmOnEnter;

    this.element.append(this.container);

    PopupElement.POPUPS.push(this);
  }

<<<<<<< HEAD
=======
  protected onContentUpdate() {
    if(this.scrollable) {
      this.scrollable.onAdditionalScroll();
    }
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public show() {
    this.navigationItem = {
      type: 'popup',
      onPop: () => this.destroy(),
      onEscape: this.onEscape
    };

    appNavigationController.pushItem(this.navigationItem);

    blurActiveElement(); // * hide mobile keyboard
    appendPopupTo.append(this.element);
    void this.element.offsetWidth; // reflow
    this.element.classList.add('active');

<<<<<<< HEAD
    if(!this.withoutOverlay) {
      rootScope.isOverlayActive = true;
=======
    this.onContentUpdate();

    if(!this.withoutOverlay) {
      overlayCounter.isOverlayActive = true;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      animationIntersector.checkAnimations(true);
    }

    // cannot add event instantly because keydown propagation will fire it
<<<<<<< HEAD
    if(this.btnConfirmOnEnter) {
      setTimeout(() => {
        this.listenerSetter.add(document.body)('keydown', (e) => {
=======
    // if(this.btnConfirmOnEnter) {
      setTimeout(() => {
        if(!this.element.classList.contains('active')) {
          return;
        }

        this.listenerSetter.add(document.body)('keydown', (e) => {
          if(PopupElement.POPUPS[PopupElement.POPUPS.length - 1] !== this) {
            return;
          }
          
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          if(this.confirmShortcutIsSendShortcut ? isSendShortcutPressed(e) : e.key === 'Enter') {
            simulateClickEvent(this.btnConfirmOnEnter);
            cancelEvent(e);
          }
        });
      }, 0);
<<<<<<< HEAD
    }
=======
    // }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public hide = () => {
    appNavigationController.backByItem(this.navigationItem);
  };

  protected destroy() {
    this.dispatchEvent<PopupListeners>('close');
    this.element.classList.add('hiding');
    this.element.classList.remove('active');
    this.listenerSetter.removeAll();

    if(!this.withoutOverlay) {
<<<<<<< HEAD
      rootScope.isOverlayActive = false;
=======
      overlayCounter.isOverlayActive = false;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    appNavigationController.removeItem(this.navigationItem);
    this.navigationItem = undefined;

    indexOfAndSplice(PopupElement.POPUPS, this);

    // ! calm
    onFullScreenChange();

    setTimeout(() => {
      this.element.remove();
      this.dispatchEvent<PopupListeners>('closeAfterTimeout');
      this.cleanup();

      if(!this.withoutOverlay) {
        animationIntersector.checkAnimations(false);
      }
    }, 150);
  }

  public static reAppend() {
<<<<<<< HEAD
    this.POPUPS.forEach(popup => {
=======
    this.POPUPS.forEach((popup) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const {element, container} = popup;
      const parentElement = element.parentElement;
      if(parentElement && parentElement !== appendPopupTo && appendPopupTo !== container) {
        appendPopupTo.append(element);
      }
    });
  }

<<<<<<< HEAD
  public static getPopups(popupConstructor: PopupElementConstructable) {
    return this.POPUPS.filter(element => element instanceof popupConstructor);
=======
  public static getPopups<T extends PopupElement>(popupConstructor: PopupElementConstructable<T>) {
    return this.POPUPS.filter((element) => element instanceof popupConstructor) as T[];
  }

  public static createPopup<T extends PopupElement, A extends Array<any>>(ctor: {new(...args: A): T}, ...args: A) {
    const popup = new ctor(...args);
    return popup;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
}

export const addCancelButton = (buttons: PopupButton[]) => {
<<<<<<< HEAD
  const button = buttons.find(b => b.isCancel);
=======
  const button = buttons.find((b) => b.isCancel);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  if(!button) {
    buttons.push({
      langKey: 'Cancel',
      isCancel: true
    });
  }

  return buttons;
};
