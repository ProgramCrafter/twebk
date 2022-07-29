/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type Chat from "../chat/chat";
import InputField from "../inputField";
import PopupElement from ".";
import Scrollable from "../scrollable";
import { toast } from "../toast";
<<<<<<< HEAD
import { prepareAlbum, wrapDocument } from "../wrappers";
import CheckboxField from "../checkboxField";
import SendContextMenu from "../chat/sendContextMenu";
import { createPosterFromMedia, createPosterFromVideo, onMediaLoad } from "../../helpers/files";
import { MyDocument } from "../../lib/appManagers/appDocsManager";
import I18n, { FormatterArguments, i18n, LangPackKey } from "../../lib/langPack";
import appDownloadManager from "../../lib/appManagers/appDownloadManager";
import calcImageInBox from "../../helpers/calcImageInBox";
import placeCaretAtEnd from "../../helpers/dom/placeCaretAtEnd";
import rootScope from "../../lib/rootScope";
import { MediaSize } from "../../helpers/mediaSizes";
=======
import { wrapDocument } from "../wrappers";
import CheckboxField from "../checkboxField";
import SendContextMenu from "../chat/sendContextMenu";
import { createPosterFromMedia, createPosterFromVideo } from "../../helpers/createPoster";
import { MyDocument } from "../../lib/appManagers/appDocsManager";
import I18n, { FormatterArguments, i18n, LangPackKey } from "../../lib/langPack";
import calcImageInBox from "../../helpers/calcImageInBox";
import placeCaretAtEnd from "../../helpers/dom/placeCaretAtEnd";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { attachClickEvent } from "../../helpers/dom/clickEvent";
import MEDIA_MIME_TYPES_SUPPORTED from '../../environment/mediaMimeTypesSupport';
import getGifDuration from "../../helpers/getGifDuration";
import replaceContent from "../../helpers/dom/replaceContent";
import createVideo from "../../helpers/dom/createVideo";
<<<<<<< HEAD
=======
import prepareAlbum from "../prepareAlbum";
import { MediaSize } from "../../helpers/mediaSize";
import { ThumbCache } from "../../lib/storages/thumbs";
import onMediaLoad from "../../helpers/onMediaLoad";
import apiManagerProxy from "../../lib/mtproto/mtprotoworker";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

type SendFileParams = Partial<{
  file: File,
  objectURL: string,
  thumb: {
    blob: Blob,
    url: string,
    size: MediaSize
  },
  width: number,
  height: number,
  duration: number,
  noSound: boolean,
  itemDiv: HTMLElement
}>;

let currentPopup: PopupNewMedia;

export function getCurrentNewMediaPopup() {
  return currentPopup;
}

export default class PopupNewMedia extends PopupElement {
  private input: HTMLElement;
  private mediaContainer: HTMLElement;
  private groupCheckboxField: CheckboxField;
  private mediaCheckboxField: CheckboxField;
  private wasInputValue: string;

  private willAttach: Partial<{
    type: 'media' | 'document',
    isMedia: true,
    group: boolean,
    sendFileDetails: SendFileParams[]
  }>;
  private inputField: InputField;
<<<<<<< HEAD

  constructor(private chat: Chat, private files: File[], willAttachType: PopupNewMedia['willAttach']['type']) {
    super('popup-send-photo popup-new-media', null, {closable: true, withConfirm: 'Modal.Send', confirmShortcutIsSendShortcut: true, body: true});

=======
  private captionLengthMax: number;

  constructor(private chat: Chat, private files: File[], willAttachType: PopupNewMedia['willAttach']['type']) {
    super('popup-send-photo popup-new-media', {closable: true, withConfirm: 'Modal.Send', confirmShortcutIsSendShortcut: true, body: true, title: true});
    this.construct(willAttachType);
  }

  private async construct(willAttachType: PopupNewMedia['willAttach']['type']) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.willAttach = {
      type: willAttachType,
      sendFileDetails: [],
      group: false
    };

<<<<<<< HEAD
=======
    const config = await this.managers.apiManager.getConfig();
    this.captionLengthMax = config.caption_length_max;

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    attachClickEvent(this.btnConfirm, () => this.send(), {listenerSetter: this.listenerSetter});

    if(this.chat.type !== 'scheduled') {
      const sendMenu = new SendContextMenu({
        onSilentClick: () => {
          this.chat.input.sendSilent = true;
          this.send();
        },
        onScheduleClick: () => {
          this.chat.input.scheduleSending(() => {
            this.send();
          });
        },
        openSide: 'bottom-left',
        onContextElement: this.btnConfirm,
        listenerSetter: this.listenerSetter
      });

      sendMenu.setPeerId(this.chat.peerId);

      this.header.append(sendMenu.sendMenu);
    }

    this.mediaContainer = document.createElement('div');
    this.mediaContainer.classList.add('popup-photo');
    const scrollable = new Scrollable(null);
    scrollable.container.append(this.mediaContainer);
    
    this.inputField = new InputField({
      placeholder: 'PreviewSender.CaptionPlaceholder',
      label: 'Caption',
      name: 'photo-caption',
<<<<<<< HEAD
      maxLength: rootScope.config.caption_length_max
=======
      maxLength: this.captionLengthMax,
      withLinebreaks: true
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
    this.input = this.inputField.input;

    this.inputField.value = this.wasInputValue = this.chat.input.messageInputField.input.innerHTML;
    this.chat.input.messageInputField.value = '';

    this.body.append(scrollable.container);
    this.container.append(this.inputField.container);

    this.attachFiles();

    this.addEventListener('close', () => {
      this.files = [];
      currentPopup = undefined;
    });

    currentPopup = this;
  }

  public appendDrops(element: HTMLElement) {
    this.body.append(element);
  }

  get type() {
    return this.willAttach.type;
  }

  set type(type: PopupNewMedia['willAttach']['type']) {
    this.willAttach.type = type;
  }

  private appendGroupCheckboxField() {
    const good = this.files.length > 1;
    if(good && !this.groupCheckboxField) {
      this.groupCheckboxField = new CheckboxField({
        text: 'PreviewSender.GroupItems', 
        name: 'group-items'
      });
      this.container.append(...[this.groupCheckboxField.label, this.mediaCheckboxField?.label, this.inputField.container].filter(Boolean));
  
      this.willAttach.group = true;
      this.groupCheckboxField.setValueSilently(this.willAttach.group);

      this.listenerSetter.add(this.groupCheckboxField.input)('change', () => {
        const checked = this.groupCheckboxField.checked;
  
        this.willAttach.group = checked;

        this.attachFiles();
      });
    } else if(this.groupCheckboxField) {
      this.groupCheckboxField.label.classList.toggle('hide', !good);
    }
  }

  private appendMediaCheckboxField() {
<<<<<<< HEAD
    const good = !!this.files.find(file => MEDIA_MIME_TYPES_SUPPORTED.has(file.type));
=======
    const good = !!this.files.find((file) => MEDIA_MIME_TYPES_SUPPORTED.has(file.type));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(good && !this.mediaCheckboxField) {
      this.mediaCheckboxField = new CheckboxField({
        text: 'PreviewSender.CompressFile',
        name: 'compress-items'
      });
      this.container.append(...[this.groupCheckboxField?.label, this.mediaCheckboxField.label, this.inputField.container].filter(Boolean));

      this.mediaCheckboxField.setValueSilently(this.willAttach.type === 'media');

      this.listenerSetter.add(this.mediaCheckboxField.input)('change', () => {
        const checked = this.mediaCheckboxField.checked;
  
        this.willAttach.type = checked ? 'media' : 'document';

        this.attachFiles();
      });
    } else if(this.mediaCheckboxField) {
      this.mediaCheckboxField.label.classList.toggle('hide', !good);
    }
  }

  public addFiles(files: File[]) {
<<<<<<< HEAD
    const toPush = files.filter(file => {
      const found = this.files.find(_file => {
=======
    const toPush = files.filter((file) => {
      const found = this.files.find((_file) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return _file.lastModified === file.lastModified && _file.name === file.name && _file.size === file.size;
      });
      
      return !found;
    });

    if(toPush.length) {
      this.files.push(...toPush);
      this.attachFiles();
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if(target !== this.input) {
      if(target.tagName === 'INPUT' || target.hasAttribute('contenteditable')) {
        return;
      }

      this.input.focus();
      placeCaretAtEnd(this.input);
    }
  };

  private send(force = false) {
    if(this.chat.type === 'scheduled' && !force) {
      this.chat.input.scheduleSending(() => {
        this.send(true);
      });
      
      return;
    }

    let caption = this.inputField.value;
<<<<<<< HEAD
    if(caption.length > rootScope.config.caption_length_max) {
=======
    if(caption.length > this.captionLengthMax) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      toast(I18n.format('Error.PreviewSender.CaptionTooLong', true));
      return;
    }

    this.hide();
    const willAttach = this.willAttach;
    willAttach.isMedia = willAttach.type === 'media' ? true : undefined;
    const {sendFileDetails, isMedia} = willAttach;

    //console.log('will send files with options:', willAttach);

    const {peerId, input} = this.chat;

<<<<<<< HEAD
    sendFileDetails.forEach(d => {
=======
    sendFileDetails.forEach((d) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      d.itemDiv = undefined;
    });

    const {length} = sendFileDetails;
    const sendingParams = this.chat.getMessageSendingParams();
    this.iterate((sendFileDetails) => {
      if(caption && sendFileDetails.length !== length) {
<<<<<<< HEAD
        this.chat.appMessagesManager.sendText(peerId, caption, {
=======
        this.managers.appMessagesManager.sendText(peerId, caption, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          ...sendingParams,
          clearDraft: true
        });

        caption = undefined;
      }

      const w = {
        ...willAttach,
        sendFileDetails
      };

<<<<<<< HEAD
      this.chat.appMessagesManager.sendAlbum(peerId, w.sendFileDetails.map(d => d.file), Object.assign({
=======
      this.managers.appMessagesManager.sendAlbum(peerId, w.sendFileDetails.map((d) => d.file), Object.assign({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        ...sendingParams,
        caption,
        isMedia: isMedia,
        clearDraft: true as true
      }, w));

      caption = undefined;
    });
    
    input.replyToMsgId = this.chat.threadId;
    input.onMessageSent();
  }

<<<<<<< HEAD
  private attachMedia(file: File, params: SendFileParams, itemDiv: HTMLElement) {
    itemDiv.classList.add('popup-item-media');

=======
  private async attachMedia(params: SendFileParams, itemDiv: HTMLElement) {
    itemDiv.classList.add('popup-item-media');

    const file = params.file;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const isVideo = file.type.startsWith('video/');

    let promise: Promise<void>;
    if(isVideo) {
      const video = createVideo();
      const source = document.createElement('source');
<<<<<<< HEAD
      source.src = params.objectURL = URL.createObjectURL(file);
=======
      source.src = params.objectURL = await apiManagerProxy.invoke('createObjectURL', file);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      video.autoplay = true;
      video.controls = false;
      video.muted = true;

      video.addEventListener('timeupdate', () => {
        video.pause();
      }, {once: true});

<<<<<<< HEAD
      promise = onMediaLoad(video).then(() => {
=======
      promise = onMediaLoad(video).then(async() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        params.width = video.videoWidth;
        params.height = video.videoHeight;
        params.duration = Math.floor(video.duration);
        
        const audioDecodedByteCount = (video as any).webkitAudioDecodedByteCount;
        if(audioDecodedByteCount !== undefined) {
          params.noSound = !audioDecodedByteCount;
        }

        itemDiv.append(video);
<<<<<<< HEAD
        return createPosterFromVideo(video).then(thumb => {
          params.thumb = {
            url: URL.createObjectURL(thumb.blob),
            ...thumb
          };
        });
=======
        const thumb = await createPosterFromVideo(video);
        params.thumb = {
          url: await apiManagerProxy.invoke('createObjectURL', thumb.blob),
          ...thumb
        };
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      video.append(source);
    } else {
      const img = new Image();
      promise = new Promise<void>((resolve) => {
        img.onload = () => {
          params.width = img.naturalWidth;
          params.height = img.naturalHeight;
          
          itemDiv.append(img);
          
          if(file.type === 'image/gif') {
            params.noSound = true;
            
            Promise.all([
<<<<<<< HEAD
              getGifDuration(img).then(duration => {
                params.duration = Math.ceil(duration);
              }),
              
              createPosterFromMedia(img).then(thumb => {
                params.thumb = {
                  url: URL.createObjectURL(thumb.blob),
=======
              getGifDuration(img).then((duration) => {
                params.duration = Math.ceil(duration);
              }),
              
              createPosterFromMedia(img).then(async(thumb) => {
                params.thumb = {
                  url: await apiManagerProxy.invoke('createObjectURL', thumb.blob),
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
                  ...thumb
                };
              })
            ]).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        };
      });
      
<<<<<<< HEAD
      img.src = params.objectURL = URL.createObjectURL(file);
=======
      img.src = params.objectURL = await apiManagerProxy.invoke('createObjectURL', file);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    return promise;
  }

<<<<<<< HEAD
  private attachDocument(file: File, params: SendFileParams, itemDiv: HTMLElement): ReturnType<PopupNewMedia['attachMedia']> {
    itemDiv.classList.add('popup-item-document');
=======
  private async attachDocument(params: SendFileParams, itemDiv: HTMLElement): ReturnType<PopupNewMedia['attachMedia']> {
    itemDiv.classList.add('popup-item-document');
    const file = params.file;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    const isPhoto = file.type.startsWith('image/');
    const isAudio = file.type.startsWith('audio/');
    if(isPhoto || isAudio || file.size < 20e6) {
<<<<<<< HEAD
      params.objectURL = URL.createObjectURL(file);
=======
      params.objectURL = await apiManagerProxy.invoke('createObjectURL', file);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    const doc = {
      _: 'document',
      file: file,
      file_name: file.name || '',
      size: file.size,
      type: isPhoto ? 'photo' : 'doc'
    } as MyDocument;

<<<<<<< HEAD
    if(params.objectURL) {
      const cacheContext = appDownloadManager.getCacheContext(doc);
      cacheContext.url = params.objectURL;
      cacheContext.downloaded = file.size;
    }

    const docDiv = wrapDocument({
=======
    let cacheContext: ThumbCache;
    if(params.objectURL) {
      cacheContext = {
        url: params.objectURL,
        downloaded: file.size,
        type: 'full'
      };
    }

    const docDiv = await wrapDocument({
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      message: {
        _: 'message',
        pFlags: {
          is_outgoing: true
        },
        mid: 0,
        peerId: 0,
        media: {
          _: 'messageMediaDocument',
          document: doc
        }
<<<<<<< HEAD
      } as any
=======
      } as any,
      cacheContext
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    const promise = new Promise<void>((resolve) => {
      const finish = () => {
        itemDiv.append(docDiv);
        resolve();
      };
  
      if(isPhoto) {
        const img = new Image();
        img.src = params.objectURL;
        img.onload = () => {
          params.width = img.naturalWidth;
          params.height = img.naturalHeight;
  
          finish();
        };
  
        img.onerror = finish;
      } else {
        finish();
      }
<<<<<<< HEAD
    });

    return promise;
  }

  private attachFile = (file: File) => {
    const willAttach = this.willAttach;
    const shouldCompress = this.shouldCompress(file.type);

    const params: SendFileParams = {};
    params.file = file;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('popup-item');

    params.itemDiv = itemDiv;

    const promise = shouldCompress ? this.attachMedia(file, params, itemDiv) : this.attachDocument(file, params, itemDiv);
    willAttach.sendFileDetails.push(params);
    return promise;
  };
  
  private shouldCompress(mimeType: string) {
    return this.willAttach.type === 'media' && MEDIA_MIME_TYPES_SUPPORTED.has(mimeType);
  }

  private onRender() {
    // show now
    if(!this.element.classList.contains('active')) {
      this.listenerSetter.add(document.body)('keydown', this.onKeyDown);
      this.addEventListener('close', () => {
        if(this.wasInputValue) {
          this.chat.input.messageInputField.value = this.wasInputValue;
        }
      });
      this.show();
    }
  }

  private setTitle() {
    const {willAttach, title, files} = this;
    let key: LangPackKey;
    const args: FormatterArguments = [];
    if(willAttach.type === 'document') {
      key = 'PreviewSender.SendFile';
      args.push(files.length);
    } else {
      let foundPhotos = 0, foundVideos = 0, foundFiles = 0;
      files.forEach(file => {
        if(file.type.startsWith('image/')) ++foundPhotos;
        else if(file.type.startsWith('video/')) ++foundVideos;
        else ++foundFiles;
      });

      if([foundPhotos, foundVideos, foundFiles].filter(n => n > 0).length > 1) {
        key = 'PreviewSender.SendFile';
        args.push(files.length);
      } else 
      
      /* const sum = foundPhotos + foundVideos;
      if(sum > 1 && willAttach.group) {
        key = 'PreviewSender.SendAlbum';
        const albumsLength = Math.ceil(sum / 10);
        args.push(albumsLength);
      } else  */if(foundPhotos) {
        key = 'PreviewSender.SendPhoto';
        args.push(foundPhotos);
      } else if(foundVideos) {
        key = 'PreviewSender.SendVideo';
        args.push(foundVideos);
      }
    }

    replaceContent(title, i18n(key, args));
  }

  private appendMediaToContainer(div: HTMLElement, params: SendFileParams) {
    if(this.shouldCompress(params.file.type)) {
      const size = calcImageInBox(params.width, params.height, 380, 320);
      div.style.width = size.width + 'px';
      div.style.height = size.height + 'px';
    }

    this.mediaContainer.append(div);
  }

  private iterate(cb: (sendFileDetails: SendFileParams[]) => void) {
    const {sendFileDetails} = this.willAttach;
    if(!this.willAttach.group) {
      sendFileDetails.forEach(p => cb([p]));
      return;
    }

    const length = sendFileDetails.length;
    for(let i = 0; i < length;) {
      const firstType = sendFileDetails[i].file.type;
      let k = 0;
      for(; k < 10 && i < length; ++i, ++k) {
        const type = sendFileDetails[i].file.type;
        if(this.shouldCompress(firstType) !== this.shouldCompress(type)) {
          break;
        }
      }

      cb(sendFileDetails.slice(i - k, i));
    }
  }

  private attachFiles() {
    const {files, willAttach, mediaContainer} = this;
    willAttach.sendFileDetails.length = 0;

    this.appendGroupCheckboxField();
    this.appendMediaCheckboxField();

    Promise.all(files.map(this.attachFile)).then(() => {
      mediaContainer.innerHTML = '';

      if(!files.length) {
        return;
      }

      this.setTitle();

      this.iterate((sendFileDetails) => {
        if(this.shouldCompress(sendFileDetails[0].file.type) && sendFileDetails.length > 1) {
          const albumContainer = document.createElement('div');
          albumContainer.classList.add('popup-item-album', 'popup-item');
          albumContainer.append(...sendFileDetails.map(s => s.itemDiv));

          prepareAlbum({
            container: albumContainer,
            items: sendFileDetails.map(o => ({w: o.width, h: o.height})),
            maxWidth: 380,
            minWidth: 100,
            spacing: 4
          });

          mediaContainer.append(albumContainer);
        } else {
          sendFileDetails.forEach((params) => {
            this.appendMediaToContainer(params.itemDiv, params);
          });
        }
      });
    }).then(() => {
      this.onRender();
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    return promise;
  }

  private attachFile = (file: File) => {
    const willAttach = this.willAttach;
    const shouldCompress = this.shouldCompress(file.type);

    const params: SendFileParams = {};
    params.file = file;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('popup-item');

    params.itemDiv = itemDiv;

    const promise = shouldCompress ? this.attachMedia(params, itemDiv) : this.attachDocument(params, itemDiv);
    willAttach.sendFileDetails.push(params);
    return promise;
  };
  
  private shouldCompress(mimeType: string) {
    return this.willAttach.type === 'media' && MEDIA_MIME_TYPES_SUPPORTED.has(mimeType);
  }

  private onRender() {
    // show now
    if(!this.element.classList.contains('active')) {
      this.listenerSetter.add(document.body)('keydown', this.onKeyDown);
      this.addEventListener('close', () => {
        if(this.wasInputValue) {
          this.chat.input.messageInputField.value = this.wasInputValue;
        }
      });
      this.show();
    }
  }

  private setTitle() {
    const {willAttach, title, files} = this;
    let key: LangPackKey;
    const args: FormatterArguments = [];
    if(willAttach.type === 'document') {
      key = 'PreviewSender.SendFile';
      args.push(files.length);
    } else {
      let foundPhotos = 0, foundVideos = 0, foundFiles = 0;
      files.forEach((file) => {
        if(file.type.startsWith('image/')) ++foundPhotos;
        else if(file.type.startsWith('video/')) ++foundVideos;
        else ++foundFiles;
      });

      if([foundPhotos, foundVideos, foundFiles].filter((n) => n > 0).length > 1) {
        key = 'PreviewSender.SendFile';
        args.push(files.length);
      } else 
      
      /* const sum = foundPhotos + foundVideos;
      if(sum > 1 && willAttach.group) {
        key = 'PreviewSender.SendAlbum';
        const albumsLength = Math.ceil(sum / 10);
        args.push(albumsLength);
      } else  */if(foundPhotos) {
        key = 'PreviewSender.SendPhoto';
        args.push(foundPhotos);
      } else if(foundVideos) {
        key = 'PreviewSender.SendVideo';
        args.push(foundVideos);
      }
    }

    replaceContent(title, i18n(key, args));
  }

  private appendMediaToContainer(div: HTMLElement, params: SendFileParams) {
    if(this.shouldCompress(params.file.type)) {
      const size = calcImageInBox(params.width, params.height, 380, 320);
      div.style.width = size.width + 'px';
      div.style.height = size.height + 'px';
    }

    this.mediaContainer.append(div);
  }

  private iterate(cb: (sendFileDetails: SendFileParams[]) => void) {
    const {sendFileDetails} = this.willAttach;
    if(!this.willAttach.group) {
      sendFileDetails.forEach((p) => cb([p]));
      return;
    }

    const length = sendFileDetails.length;
    for(let i = 0; i < length;) {
      const firstType = sendFileDetails[i].file.type;
      let k = 0;
      for(; k < 10 && i < length; ++i, ++k) {
        const type = sendFileDetails[i].file.type;
        if(this.shouldCompress(firstType) !== this.shouldCompress(type)) {
          break;
        }
      }

      cb(sendFileDetails.slice(i - k, i));
    }
  }

  private attachFiles() {
    const {files, willAttach, mediaContainer} = this;
    willAttach.sendFileDetails.length = 0;

    this.appendGroupCheckboxField();
    this.appendMediaCheckboxField();

    Promise.all(files.map(this.attachFile)).then(() => {
      mediaContainer.innerHTML = '';

      if(!files.length) {
        return;
      }

      this.setTitle();

      this.iterate((sendFileDetails) => {
        if(this.shouldCompress(sendFileDetails[0].file.type) && sendFileDetails.length > 1) {
          const albumContainer = document.createElement('div');
          albumContainer.classList.add('popup-item-album', 'popup-item');
          albumContainer.append(...sendFileDetails.map((s) => s.itemDiv));

          prepareAlbum({
            container: albumContainer,
            items: sendFileDetails.map((o) => ({w: o.width, h: o.height})),
            maxWidth: 380,
            minWidth: 100,
            spacing: 4
          });

          mediaContainer.append(albumContainer);
        } else {
          sendFileDetails.forEach((params) => {
            this.appendMediaToContainer(params.itemDiv, params);
          });
        }
      });
    }).then(() => {
      this.onRender();
    });
  }
}
