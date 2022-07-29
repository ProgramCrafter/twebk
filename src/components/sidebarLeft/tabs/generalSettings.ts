/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { generateSection, SettingSection } from "..";
import RangeSelector from "../../rangeSelector";
import Button from "../../button";
import CheckboxField from "../../checkboxField";
import RadioField from "../../radioField";
<<<<<<< HEAD
import appStateManager, { State } from "../../../lib/appManagers/appStateManager";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../../lib/rootScope";
import { IS_APPLE } from "../../../environment/userAgent";
import Row from "../../row";
import AppBackgroundTab from "./background";
import { LangPackKey, _i18n } from "../../../lib/langPack";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
<<<<<<< HEAD
import appStickersManager from "../../../lib/appManagers/appStickersManager";
import assumeType from "../../../helpers/assumeType";
import { MessagesAllStickers, StickerSet } from "../../../layer";
import RichTextProcessor from "../../../lib/richtextprocessor";
=======
import assumeType from "../../../helpers/assumeType";
import { MessagesAllStickers, StickerSet } from "../../../layer";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { wrapStickerSetThumb, wrapStickerToRow } from "../../wrappers";
import LazyLoadQueue from "../../lazyLoadQueue";
import PopupStickers from "../../popups/stickers";
import eachMinute from "../../../helpers/eachMinute";
import { SliderSuperTabEventable } from "../../sliderTab";
import IS_GEOLOCATION_SUPPORTED from "../../../environment/geolocationSupport";
<<<<<<< HEAD
import appReactionsManager from "../../../lib/appManagers/appReactionsManager";
import AppQuickReactionTab from "./quickReaction";
=======
import AppQuickReactionTab from "./quickReaction";
import wrapEmojiText from "../../../lib/richTextProcessor/wrapEmojiText";
import { State } from "../../../config/state";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export class RangeSettingSelector {
  public container: HTMLDivElement;
  public valueContainer: HTMLElement;
  private range: RangeSelector;

  public onChange: (value: number) => void;

  constructor(
    name: LangPackKey, 
    step: number, 
    initialValue: number, 
    minValue: number, 
    maxValue: number,
    writeValue = true
  ) {
    const BASE_CLASS = 'range-setting-selector';
    this.container = document.createElement('div');
    this.container.classList.add(BASE_CLASS);

    const details = document.createElement('div');
    details.classList.add(BASE_CLASS + '-details');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add(BASE_CLASS + '-name');
    _i18n(nameDiv, name);

    const valueDiv = this.valueContainer = document.createElement('div');
    valueDiv.classList.add(BASE_CLASS + '-value');

    if(writeValue) {
      valueDiv.innerHTML = '' + initialValue;
    }

    details.append(nameDiv, valueDiv);

    this.range = new RangeSelector({
      step, 
      min: minValue, 
      max: maxValue
    }, initialValue);
    this.range.setListeners();
    this.range.setHandlers({
      onScrub: value => {
        if(this.onChange) {
          this.onChange(value);
        }

        if(writeValue) {
          //console.log('font size scrub:', value);
          valueDiv.innerText = '' + value;
        }
      }
    });

    this.container.append(details, this.range.container);
  }
}

export default class AppGeneralSettingsTab extends SliderSuperTabEventable {
  init() {
    this.header.classList.add('with-border');
    this.container.classList.add('general-settings-container');
    this.setTitle('General');

    const section = generateSection.bind(null, this.scrollable);

    {
      const container = section('Settings');
      
      const range = new RangeSettingSelector('TextSize', 1, rootScope.settings.messagesTextSize, 12, 20);
      range.onChange = (value) => {
<<<<<<< HEAD
        appStateManager.setByKey('settings.messagesTextSize', value);
=======
        rootScope.managers.appStateManager.setByKey('settings.messagesTextSize', value);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      };

      const chatBackgroundButton = Button('btn-primary btn-transparent', {icon: 'image', text: 'ChatBackground'});

      attachClickEvent(chatBackgroundButton, () => {
<<<<<<< HEAD
        new AppBackgroundTab(this.slider).open();
=======
        this.slider.createTab(AppBackgroundTab).open();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const animationsCheckboxField = new CheckboxField({
        text: 'EnableAnimations', 
        name: 'animations', 
        stateKey: 'settings.animationsEnabled',
<<<<<<< HEAD
        withRipple: true
=======
        withRipple: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
      
      container.append(range.container, chatBackgroundButton, animationsCheckboxField.label);
    }

    {
      const container = section('General.Keyboard');

      const form = document.createElement('form');

      const name = 'send-shortcut';
      const stateKey = 'settings.sendShortcut';

      const enterRow = new Row({
        radioField: new RadioField({
          langKey: 'General.SendShortcut.Enter', 
          name, 
          value: 'enter', 
          stateKey
        }),
        subtitleLangKey: 'General.SendShortcut.NewLine.ShiftEnter'
      });

      const ctrlEnterRow = new Row({
        radioField: new RadioField({
          name,
          value: 'ctrlEnter', 
          stateKey
        }),
        subtitleLangKey: 'General.SendShortcut.NewLine.Enter'
      });
      _i18n(ctrlEnterRow.radioField.main, 'General.SendShortcut.CtrlEnter', [IS_APPLE ? '⌘' : 'Ctrl']);
      
      form.append(enterRow.container, ctrlEnterRow.container);
      container.append(form);
    }

    if(IS_GEOLOCATION_SUPPORTED) {
      const container = section('DistanceUnitsTitle');

      const form = document.createElement('form');

      const name = 'distance-unit';
      const stateKey = 'settings.distanceUnit';

      const kilometersRow = new Row({
        radioField: new RadioField({
          langKey: 'DistanceUnitsKilometers', 
          name, 
          value: 'kilometers', 
          stateKey
        })
      });

      const milesRow = new Row({
        radioField: new RadioField({
          langKey: 'DistanceUnitsMiles',
          name,
          value: 'miles', 
          stateKey
        })
      });
      
      form.append(kilometersRow.container, milesRow.container);
      container.append(form);
    }

    {
      const container = section('General.TimeFormat');

      const form = document.createElement('form');

      const name = 'time-format';
      const stateKey = 'settings.timeFormat';

      const formats: [State['settings']['timeFormat'], LangPackKey][] = [
        ['h12', 'General.TimeFormat.h12'], 
        ['h23', 'General.TimeFormat.h23']
      ];

      const rows = formats.map(([format, langPackKey]) => {
        const row = new Row({
          radioField: new RadioField({
            langKey: langPackKey, 
            name, 
            value: format, 
            stateKey
          })
        });

        return row;
      });

      const cancel = eachMinute(() => {
        const date = new Date();

        formats.forEach(([format], idx) => {
          const str = date.toLocaleTimeString("en-us-u-hc-" + format, {
            hour: '2-digit', 
            minute: '2-digit'
          });

          rows[idx].subtitle.textContent = str;
        });
      });

      this.eventListener.addEventListener('destroy', cancel);

<<<<<<< HEAD
      form.append(...rows.map(row => row.container));
=======
      form.append(...rows.map((row) => row.container));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      container.append(form);
    }

    {
      const container = section('Emoji');

      const suggestCheckboxField = new CheckboxField({
        text: 'GeneralSettings.EmojiPrediction', 
        name: 'suggest-emoji', 
        stateKey: 'settings.emoji.suggest',
<<<<<<< HEAD
        withRipple: true
=======
        withRipple: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
      const bigCheckboxField = new CheckboxField({
        text: 'GeneralSettings.BigEmoji', 
        name: 'emoji-big', 
        stateKey: 'settings.emoji.big',
<<<<<<< HEAD
        withRipple: true
=======
        withRipple: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      container.append(suggestCheckboxField.label, bigCheckboxField.label);
    }
    
    {
      const section = new SettingSection({name: 'Telegram.InstalledStickerPacksController', caption: 'StickersBotInfo'});

      const reactionsRow = new Row({
        titleLangKey: 'DoubleTapSetting',
        havePadding: true,
        clickable: () => {
<<<<<<< HEAD
          new AppQuickReactionTab(this.slider).open();
        }
      });

      const renderQuickReaction = () => {
        Promise.resolve(appReactionsManager.getQuickReaction()).then(reaction => {
=======
          this.slider.createTab(AppQuickReactionTab).open();
        },
        listenerSetter: this.listenerSetter
      });

      const renderQuickReaction = () => {
        Promise.resolve(this.managers.appReactionsManager.getQuickReaction()).then((reaction) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          wrapStickerToRow({
            row: reactionsRow,
            doc: reaction.static_icon,
            size: 'small'
          });
        });
      };

      renderQuickReaction();

      this.listenerSetter.add(rootScope)('quick_reaction', renderQuickReaction);

      const suggestCheckboxField = new CheckboxField({
        text: 'Stickers.SuggestStickers', 
        name: 'suggest', 
        stateKey: 'settings.stickers.suggest',
<<<<<<< HEAD
        withRipple: true
=======
        withRipple: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });
      const loopCheckboxField = new CheckboxField({
        text: 'InstalledStickers.LoopAnimated', 
        name: 'loop', 
        stateKey: 'settings.stickers.loop',
<<<<<<< HEAD
        withRipple: true
=======
        withRipple: true,
        listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const stickerSets: {[id: string]: Row} = {};

      const stickersContent = section.generateContentElement();

      const lazyLoadQueue = new LazyLoadQueue();
      const renderStickerSet = (stickerSet: StickerSet.stickerSet, method: 'append' | 'prepend' = 'append') => {
        const row = new Row({
<<<<<<< HEAD
          title: RichTextProcessor.wrapEmojiText(stickerSet.title),
=======
          title: wrapEmojiText(stickerSet.title),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          subtitleLangKey: 'Stickers',
          subtitleLangArgs: [stickerSet.count],
          havePadding: true,
          clickable: () => {
            new PopupStickers({id: stickerSet.id, access_hash: stickerSet.access_hash}).show();
<<<<<<< HEAD
          }
=======
          },
          listenerSetter: this.listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        });

        stickerSets[stickerSet.id] = row;

        const div = document.createElement('div');
        div.classList.add('row-media');

        wrapStickerSetThumb({
          set: stickerSet,
          container: div,
          group: 'GENERAL-SETTINGS',
          lazyLoadQueue,
          width: 48,
          height: 48,
          autoplay: true
        });

        row.container.append(div);

        stickersContent[method](row.container);
      };

<<<<<<< HEAD
      appStickersManager.getAllStickers().then(allStickers => {
=======
      this.managers.appStickersManager.getAllStickers().then((allStickers) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        assumeType<MessagesAllStickers.messagesAllStickers>(allStickers);
        for(const stickerSet of allStickers.sets) {
          renderStickerSet(stickerSet);
        }
      });

      this.listenerSetter.add(rootScope)('stickers_installed', (e) => {
        const set: StickerSet.stickerSet = e;
        
        if(!stickerSets[set.id]) {
          renderStickerSet(set, 'prepend');
        }
      });
  
      this.listenerSetter.add(rootScope)('stickers_deleted', (e) => {
        const set: StickerSet.stickerSet = e;
        
        if(stickerSets[set.id]) {
          stickerSets[set.id].container.remove();
          delete stickerSets[set.id];
        }
      });

      section.content.append(reactionsRow.container, suggestCheckboxField.label, loopCheckboxField.label);
      this.scrollable.append(section.container);
    }
  }

  onOpen() {
    if(this.init) {
      this.init();
      this.init = null;
    }
  }
}
