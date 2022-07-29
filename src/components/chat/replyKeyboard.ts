/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import type { AppMessagesManager } from "../../lib/appManagers/appMessagesManager";
import type ChatInput from "./input";
import DropdownHover from "../../helpers/dropdownHover";
import { KeyboardButton, ReplyMarkup } from "../../layer";
import RichTextProcessor from "../../lib/richtextprocessor";
import rootScope from "../../lib/rootScope";
import ListenerSetter, { Listener } from "../../helpers/listenerSetter";
import findUpClassName from "../../helpers/dom/findUpClassName";
import { IS_TOUCH_SUPPORTED } from "../../environment/touchSupport";
=======
import type ChatInput from "./input";
import DropdownHover from "../../helpers/dropdownHover";
import { KeyboardButton, ReplyMarkup } from "../../layer";
import rootScope from "../../lib/rootScope";
import ListenerSetter, { Listener } from "../../helpers/listenerSetter";
import findUpClassName from "../../helpers/dom/findUpClassName";
import IS_TOUCH_SUPPORTED from "../../environment/touchSupport";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import findUpAsChild from "../../helpers/dom/findUpAsChild";
import cancelEvent from "../../helpers/dom/cancelEvent";
import { getHeavyAnimationPromise } from "../../hooks/useHeavyAnimationCheck";
import confirmationPopup from "../confirmationPopup";
import safeAssign from "../../helpers/object/safeAssign";
import setInnerHTML from "../../helpers/dom/setInnerHTML";
<<<<<<< HEAD
=======
import wrapEmojiText from "../../lib/richTextProcessor/wrapEmojiText";
import { AppManagers } from "../../lib/appManagers/managers";
import { attachClickEvent } from "../../helpers/dom/clickEvent";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class ReplyKeyboard extends DropdownHover {
  private static BASE_CLASS = 'reply-keyboard';
  private appendTo: HTMLElement;
  private listenerSetter: ListenerSetter;
<<<<<<< HEAD
  private appMessagesManager: AppMessagesManager;
=======
  private managers: AppManagers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private btnHover: HTMLElement;
  private peerId: PeerId;
  private touchListener: Listener;
  private chatInput: ChatInput;

  constructor(options: {
    listenerSetter: ListenerSetter,
<<<<<<< HEAD
    appMessagesManager: AppMessagesManager,
=======
    managers: AppManagers,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    appendTo: HTMLElement,
    btnHover: HTMLElement,
    chatInput: ChatInput
  }) {
    super({
      element: document.createElement('div')
    });

    safeAssign(this, options);

    this.element.classList.add(ReplyKeyboard.BASE_CLASS);
    this.element.style.display = 'none';

    this.attachButtonListener(this.btnHover, this.listenerSetter);
<<<<<<< HEAD
    this.listenerSetter.add(rootScope)('history_reply_markup', ({peerId}) => {
      if(this.peerId === peerId) {
        if(this.checkAvailability() && this.isActive()) {
          this.render();
=======
    this.listenerSetter.add(rootScope)('history_reply_markup', async({peerId}) => {
      if(this.peerId === peerId) {
        if(this.checkAvailability() && this.isActive()) {
          await this.render();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }

        getHeavyAnimationPromise().then(() => {
          this.checkForceReply();
        });
      }
    });
  }

  protected init() {
    this.appendTo.append(this.element);

<<<<<<< HEAD
    this.listenerSetter.add(this)('open', () => {
      this.render();
=======
    this.listenerSetter.add(this)('open', async() => {
      await this.render();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

      if(IS_TOUCH_SUPPORTED) {
        this.touchListener = this.listenerSetter.add(document.body)('touchstart', this.onBodyTouchStart, {passive: false, capture: true}) as any as Listener;
        this.listenerSetter.add(this)('close', () => {
          this.listenerSetter.remove(this.touchListener);
        }, {once: true});
      }
    });
    
<<<<<<< HEAD
    this.listenerSetter.add(this.element)('click', (e) => {
=======
    attachClickEvent(this.element, (e) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const target = findUpClassName(e.target, 'btn');
      if(!target) {
        return;
      }

      const type = target.dataset.type as KeyboardButton['_'];
      const {peerId} = this;
      switch(type) {
        case 'keyboardButtonRequestPhone': {
          confirmationPopup({
            titleLangKey: 'ShareYouPhoneNumberTitle',
            button: {
              langKey: 'OK'
            },
            descriptionLangKey: 'AreYouSureShareMyContactInfoBot'
          }).then(() => {
<<<<<<< HEAD
            this.appMessagesManager.sendContact(peerId, rootScope.myId);
=======
            this.managers.appMessagesManager.sendContact(peerId, rootScope.myId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          });
          break;
        }

        default: {
<<<<<<< HEAD
          this.appMessagesManager.sendText(peerId, target.dataset.text);
=======
          this.managers.appMessagesManager.sendText(peerId, target.dataset.text);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          break;
        }
      }

      this.toggle(false);
<<<<<<< HEAD
    });
=======
    }, {listenerSetter: this.listenerSetter});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    return super.init();
  }

  private onBodyTouchStart = (e: TouchEvent) => {
    const target = e.touches[0].target as HTMLElement;
    if(!findUpAsChild(target, this.element) && target !== this.btnHover) {
      cancelEvent(e);
      this.toggle(false);
    }
  };

<<<<<<< HEAD
  public checkForceReply() {
    const replyMarkup = this.getReplyMarkup();
=======
  public async checkForceReply() {
    const replyMarkup = await this.getReplyMarkup();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(replyMarkup._ === 'replyKeyboardForceReply' &&
      !replyMarkup.pFlags.hidden && 
      !replyMarkup.pFlags.used) {
      replyMarkup.pFlags.used = true;
      this.chatInput.initMessageReply(replyMarkup.mid);
    }
  }

<<<<<<< HEAD
  private getReplyMarkup(): ReplyMarkup {
    return this.appMessagesManager.getHistoryStorage(this.peerId).replyMarkup ?? {
=======
  private async getReplyMarkup() {
    return (await this.managers.appMessagesManager.getHistoryStorageTransferable(this.peerId)).replyMarkup ?? {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      _: 'replyKeyboardHide'
    };
  }

<<<<<<< HEAD
  public render(replyMarkup: ReplyMarkup.replyKeyboardMarkup = this.getReplyMarkup() as any) {
    this.element.innerHTML = '';
=======
  public async render(replyMarkup?: ReplyMarkup.replyKeyboardMarkup) {
    if(replyMarkup === undefined) {
      replyMarkup = await this.getReplyMarkup() as any;
    }

    this.element.textContent = '';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    for(const row of replyMarkup.rows) {
      const div = document.createElement('div');
      div.classList.add(ReplyKeyboard.BASE_CLASS + '-row');

      for(const button of row.buttons) {
        const btn = document.createElement('button');
        btn.classList.add(ReplyKeyboard.BASE_CLASS + '-button', 'btn');
<<<<<<< HEAD
        setInnerHTML(btn, RichTextProcessor.wrapEmojiText(button.text));
=======
        setInnerHTML(btn, wrapEmojiText(button.text));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        btn.dataset.text = button.text;
        btn.dataset.type = button._;
        div.append(btn);
      }

      this.element.append(div);
    }
  }

<<<<<<< HEAD
  public checkAvailability(replyMarkup: ReplyMarkup = this.getReplyMarkup()) {
=======
  public async checkAvailability(replyMarkup?: ReplyMarkup) {
    if(replyMarkup === undefined) {
      replyMarkup = await this.getReplyMarkup();
    }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const hide = replyMarkup._ === 'replyKeyboardHide' || !(replyMarkup as ReplyMarkup.replyInlineMarkup).rows?.length;
    this.btnHover.classList.toggle('hide', hide);

    if(hide) {
      this.toggle(false);
    }

    return !hide;
  }

  public setPeer(peerId: PeerId) {
    this.peerId = peerId;

    this.checkAvailability();
    this.checkForceReply();
  }
}
