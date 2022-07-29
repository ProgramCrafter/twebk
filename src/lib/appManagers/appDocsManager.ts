/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

<<<<<<< HEAD
import { FileURLType, getFileNameByLocation, getFileURL } from '../../helpers/fileName';
import { Document, InputFileLocation, InputMedia, PhotoSize } from '../../layer';
import referenceDatabase, { ReferenceContext } from '../mtproto/referenceDatabase';
import opusDecodeController from '../opusDecodeController';
import { RichTextProcessor } from '../richtextprocessor';
import appDownloadManager, { DownloadBlob } from './appDownloadManager';
import appPhotosManager from './appPhotosManager';
import blur from '../../helpers/blur';
import apiManager from '../mtproto/mtprotoworker';
import { MOUNT_CLASS_TO } from '../../config/debug';
import { getFullDate } from '../../helpers/date';
import rootScope from '../rootScope';
import IS_WEBP_SUPPORTED from '../../environment/webpSupport';
import IS_WEBM_SUPPORTED from '../../environment/webmSupport';
import defineNotNumerableProperties from '../../helpers/object/defineNotNumerableProperties';
import isObject from '../../helpers/object/isObject';
import safeReplaceArrayInObject from '../../helpers/object/safeReplaceArrayInObject';
=======
import { AccountWallPapers, Document, MessagesSavedGifs, PhotoSize, WallPaper } from '../../layer';
import { ReferenceContext } from '../mtproto/referenceDatabase';
import { getFullDate } from '../../helpers/date';
import isObject from '../../helpers/object/isObject';
import safeReplaceArrayInObject from '../../helpers/object/safeReplaceArrayInObject';
import { AppManager } from './manager';
import wrapPlainText from '../richTextProcessor/wrapPlainText';
import assumeType from '../../helpers/assumeType';
import { getEnvironment } from '../../environment/utils';
import { isServiceWorkerOnline } from '../mtproto/mtproto.worker';
import MTProtoMessagePort from '../mtproto/mtprotoMessagePort';
import getDocumentInput from './utils/docs/getDocumentInput';
import getDocumentURL from './utils/docs/getDocumentURL';
import type { ThumbCache } from '../storages/thumbs';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type MyDocument = Document.document;

// TODO: если залить картинку файлом, а потом перезайти в диалог - превьюшка заново скачается

const EXTENSION_MIME_TYPE_MAP = {
  mov: 'video/quicktime',
  gif: 'image/gif',
  pdf: 'application/pdf',
};

<<<<<<< HEAD
export class AppDocsManager {
  private docs: {[docId: DocId]: MyDocument} = {};
  private savingLottiePreview: {[docId: DocId]: true} = {};
  public downloading: Map<DocId, DownloadBlob> = new Map();

  constructor() {
    apiManager.onServiceWorkerFail = this.onServiceWorkerFail;
  }

  public onServiceWorkerFail = () => {
=======
type WallPaperId = WallPaper.wallPaper['id'];

let uploadWallPaperTempId = 0;

export class AppDocsManager extends AppManager {
  private docs: {[docId: DocId]: MyDocument};

  private stickerCachedThumbs: {[docId: DocId]: {[toneIndex: number]: {url: string, w: number, h: number}}};

  private uploadingWallPapers: {[id: WallPaperId]: {cacheContext: ThumbCache, file: File}};

  protected after() {
    this.docs = {};
    this.stickerCachedThumbs = {};
    this.uploadingWallPapers = {};

    MTProtoMessagePort.getInstance<false>().addEventListener('serviceWorkerOnline', (online) => {
      if(!online) {
        this.onServiceWorkerFail();
      }
    });
  }

  private onServiceWorkerFail = () => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    for(const id in this.docs) {
      const doc = this.docs[id];

      if(doc.supportsStreaming) {
        delete doc.supportsStreaming;
<<<<<<< HEAD
        const cacheContext = appDownloadManager.getCacheContext(doc);
        delete cacheContext.url;
=======
        this.thumbsStorage.deleteCacheContext(doc);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }
  };

  public saveDoc(doc: Document, context?: ReferenceContext): MyDocument {
<<<<<<< HEAD
    if(doc._ === 'documentEmpty') {
      return undefined;
=======
    if(!doc || doc._ === 'documentEmpty') {
      return;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    const oldDoc = this.docs[doc.id];

    if(doc.file_reference) { // * because we can have a new object w/o the file_reference while sending
      safeReplaceArrayInObject('file_reference', oldDoc, doc);
      this.referenceDatabase.saveContext(doc.file_reference, context);
    }
    
    //console.log('saveDoc', apiDoc, this.docs[apiDoc.id]);
    // if(oldDoc) {
    //   //if(doc._ !== 'documentEmpty' && doc._ === d._) {
    //     if(doc.thumbs) {
    //       if(!oldDoc.thumbs) oldDoc.thumbs = doc.thumbs;
    //       /* else if(apiDoc.thumbs[0].bytes && !d.thumbs[0].bytes) {
    //         d.thumbs.unshift(apiDoc.thumbs[0]);
    //       } else if(d.thumbs[0].url) { // fix for converted thumb in safari
    //         apiDoc.thumbs[0] = d.thumbs[0];
    //       } */
    //     }

    //   //}

    //   return oldDoc;

    //   //return Object.assign(d, apiDoc, context);
    //   //return context ? Object.assign(d, context) : d;
    // }

    if(!oldDoc) {
      this.docs[doc.id] = doc;
    }

    // * exclude from state
    // defineNotNumerableProperties(doc, [/* 'thumbs',  */'type', 'h', 'w', 'file_name', 
    // 'file', 'duration', 'downloaded', 'url', 'audioTitle', 
    // 'audioPerformer', 'sticker', 'stickerEmoji', 'stickerEmojiRaw', 
    // 'stickerSetInput', 'stickerThumbConverted', 'animated', 'supportsStreaming']);

    for(let i = 0, length = doc.attributes.length; i < length; ++i) {
      const attribute = doc.attributes[i];
      switch(attribute._) {
        case 'documentAttributeFilename':
          doc.file_name = wrapPlainText(attribute.file_name);
          break;

        case 'documentAttributeAudio':
          doc.duration = attribute.duration;
          doc.type = attribute.pFlags.voice && doc.mime_type === 'audio/ogg' ? 'voice' : 'audio';
          /* if(apiDoc.type === 'audio') {
            apiDoc.supportsStreaming = true;
          } */
          break;

        case 'documentAttributeVideo':
          doc.duration = attribute.duration;
          doc.w = attribute.w;
          doc.h = attribute.h;
          //apiDoc.supportsStreaming = attribute.pFlags?.supports_streaming/*  && apiDoc.size > 524288 */;
          if(/* apiDoc.thumbs &&  */attribute.pFlags.round_message) {
            doc.type = 'round';
          } else /* if(apiDoc.thumbs) */ {
            doc.type = 'video';
          }
          break;

        case 'documentAttributeSticker':
          if(attribute.alt !== undefined) {
            doc.stickerEmojiRaw = attribute.alt;
          }

          if(attribute.stickerset) {
            if(attribute.stickerset._ === 'inputStickerSetEmpty') {
              delete attribute.stickerset;
            } else if(attribute.stickerset._ === 'inputStickerSetID') {
              doc.stickerSetInput = attribute.stickerset;
            }
          }

          // * there can be no thumbs, then it is a document
<<<<<<< HEAD
          if(/* apiDoc.thumbs &&  */doc.mime_type === 'image/webp' && (doc.thumbs || IS_WEBP_SUPPORTED)) {
            doc.type = 'sticker';
            doc.sticker = 1;
          } else if(doc.mime_type === 'video/webm') {
            if(!IS_WEBM_SUPPORTED) {
=======
          if(/* apiDoc.thumbs &&  */doc.mime_type === 'image/webp' && (doc.thumbs || getEnvironment().IS_WEBP_SUPPORTED)) {
            doc.type = 'sticker';
            doc.sticker = 1;
          } else if(doc.mime_type === 'video/webm') {
            if(!getEnvironment().IS_WEBM_SUPPORTED) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              return;
            }

            doc.type = 'sticker';
            doc.sticker = 3;
            doc.animated = true;
          }
          break;

        case 'documentAttributeImageSize':
          doc.type = 'photo';
          doc.w = attribute.w;
          doc.h = attribute.h;
          break;

        case 'documentAttributeAnimated':
          if((doc.mime_type === 'image/gif' || doc.mime_type === 'video/mp4')/*  && apiDoc.thumbs */) {
            doc.type = 'gif';
          }

          doc.animated = true;
          break;
      }
    }
    
    if(!doc.mime_type) {
      const ext = (doc.file_name || '').split('.').pop();
      // @ts-ignore
      const mappedMimeType = ext && EXTENSION_MIME_TYPE_MAP[ext.toLowerCase()];
      if(mappedMimeType) {
        doc.mime_type = mappedMimeType;
      } else {
        switch(doc.type) {
          case 'gif':
          case 'video':
          case 'round':
            doc.mime_type = 'video/mp4';
            break;
          case 'sticker':
            doc.mime_type = 'image/webp';
            break;
          case 'audio':
            doc.mime_type = 'audio/mpeg';
            break;
          case 'voice':
            doc.mime_type = 'audio/ogg';
            break;
          default:
            doc.mime_type = 'application/octet-stream';
            break;
        }
      }
    } else if(doc.mime_type === EXTENSION_MIME_TYPE_MAP.pdf) {
      doc.type = 'pdf';
    } else if(doc.mime_type === EXTENSION_MIME_TYPE_MAP.gif) {
      doc.type = 'gif';
    }

    if(doc.type === 'voice' || doc.type === 'round') {
      // browser will identify extension
      doc.file_name = doc.type + '_' + getFullDate(new Date(doc.date * 1000), {monthAsNumber: true, leadingZero: true}).replace(/[:\.]/g, '-').replace(', ', '_');
    }

<<<<<<< HEAD
    if(apiManager.isServiceWorkerOnline()) {
      if((doc.type === 'gif' && doc.size > 8e6) || doc.type === 'audio' || doc.type === 'video'/*  || doc.mime_type.indexOf('video/') === 0 */) {
        doc.supportsStreaming = true;
        
        const cacheContext = appDownloadManager.getCacheContext(doc);
        if(!cacheContext.url) {
          cacheContext.url = this.getFileURL(doc);
=======
    if(isServiceWorkerOnline()) {
      if((doc.type === 'gif' && doc.size > 8e6) || doc.type === 'audio' || doc.type === 'video'/*  || doc.mime_type.indexOf('video/') === 0 */) {
        doc.supportsStreaming = true;
        
        const cacheContext = this.thumbsStorage.getCacheContext(doc);
        if(!cacheContext.url) {
          this.thumbsStorage.setCacheContextURL(doc, undefined, getDocumentURL(doc), 0);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        }
      }
    }

    // for testing purposes
    // doc.supportsStreaming = false;
    // doc.url = ''; // * this will break upload urls
    
    if(!doc.file_name) {
      doc.file_name = '';
    }

    if(doc.mime_type === 'application/x-tgsticker' && doc.file_name === 'AnimatedSticker.tgs') {
      doc.type = 'sticker';
      doc.animated = true;
      doc.sticker = 2;
    }

    /* if(!doc.url) {
      doc.url = this.getFileURL(doc);
    } */

    if(oldDoc) {
      return Object.assign(oldDoc, doc);
    }

    return doc;
  }
  
  public getDoc(docId: DocId | MyDocument): MyDocument {
    return isObject<MyDocument>(docId) ? docId : this.docs[docId];
  }

<<<<<<< HEAD
  public getMediaInput(doc: MyDocument): InputMedia.inputMediaDocument {
    return {
      _: 'inputMediaDocument',
      id: {
        _: 'inputDocument',
        id: doc.id,
        access_hash: doc.access_hash,
        file_reference: doc.file_reference
      },
      ttl_seconds: 0
    };
  }

  public getInput(doc: MyDocument, thumbSize?: string): InputFileLocation.inputDocumentFileLocation {
    return {
      _: 'inputDocumentFileLocation',
      id: doc.id,
      access_hash: doc.access_hash,
      file_reference: doc.file_reference,
      thumb_size: thumbSize
    };
  }

  public getFileDownloadOptions(doc: MyDocument, thumb?: PhotoSize.photoSize, queueId?: number, onlyCache?: boolean) {
    const inputFileLocation = this.getInput(doc, thumb?.type);

    let mimeType: string;
    if(thumb) {
      mimeType = doc.sticker ? 'image/webp' : 'image/jpeg'/* doc.mime_type */;
    } else {
      mimeType = doc.mime_type || 'application/octet-stream';
    }

    return {
      dcId: doc.dc_id, 
      location: inputFileLocation, 
      size: thumb ? thumb.size : doc.size, 
      mimeType,
      fileName: doc.file_name,
      queueId,
      onlyCache
    };
  }

  public getFileURL(doc: MyDocument, download = false, thumb?: PhotoSize.photoSize) {
    let type: FileURLType;
    if(download) {
      type = 'download';
    } else if(thumb) {
      type = 'thumb';
    } else if(doc.supportsStreaming) {
      type = 'stream';
    } else {
      type = 'document';
    }

    return getFileURL(type, this.getFileDownloadOptions(doc, thumb));
  }

  public getThumbURL(doc: MyDocument, thumb: PhotoSize.photoSize | PhotoSize.photoCachedSize | PhotoSize.photoStrippedSize) {
    let promise: Promise<any> = Promise.resolve();

    const cacheContext = appDownloadManager.getCacheContext(doc, thumb.type);
    if(!cacheContext.url) {
      if('bytes' in thumb) {
        const result = blur(appPhotosManager.getPreviewURLFromBytes(thumb.bytes, !!doc.sticker));
        promise = result.promise.then(() => {
          cacheContext.url = result.canvas.toDataURL();
        }) as any;
      } else {
        //return this.getFileURL(doc, false, thumb);
        promise = appPhotosManager.preloadPhoto(doc, thumb) as any;
      }
    }

    return {thumb, cacheContext, promise};
  }

  public getThumb(doc: MyDocument, tryNotToUseBytes = true) {
    const thumb = appPhotosManager.choosePhotoSize(doc, 0, 0, !tryNotToUseBytes);
    if(thumb._ === 'photoSizeEmpty') return null;
    return this.getThumbURL(doc, thumb as any);
  }

  public getInputFileName(doc: MyDocument, thumbSize?: string) {
    return getFileNameByLocation(this.getInput(doc, thumbSize), {fileName: doc.file_name});
  }

  public downloadDoc(doc: MyDocument, queueId?: number, onlyCache?: boolean): DownloadBlob {
    const fileName = this.getInputFileName(doc);

    let download: DownloadBlob = appDownloadManager.getDownload(fileName);
    if(download) {
      return download;
    }

    const downloadOptions = this.getFileDownloadOptions(doc, undefined, queueId, onlyCache);
    download = appDownloadManager.download(downloadOptions);
    this.downloading.set(doc.id, download);
    rootScope.dispatchEvent('download_start', doc.id);

    const cacheContext = appDownloadManager.getCacheContext(doc);
    const originalPromise = download;
    originalPromise.then((blob) => {
      cacheContext.url = URL.createObjectURL(blob);
      cacheContext.downloaded = blob.size;
    }, () => {}).finally(() => {
      this.downloading.delete(doc.id);
    });
    
    if(doc.type === 'voice' && !opusDecodeController.isPlaySupported()) {
      download = originalPromise.then(async(blob) => {
        const reader = new FileReader();
  
        await new Promise<void>((resolve, reject) => {
          reader.onloadend = (e) => {
            const uint8 = new Uint8Array(e.target.result as ArrayBuffer);
            //console.log('sending uint8 to decoder:', uint8);
            opusDecodeController.decode(uint8).then(result => {
              cacheContext.url = result.url;
              resolve();
            }, (err) => {
              delete cacheContext.downloaded;
              reject(err);
            });
          };
    
          reader.readAsArrayBuffer(blob);
        });
  
        return blob;
=======
  public downloadDoc(doc: MyDocument, queueId?: number, onlyCache?: boolean) {
    return this.apiFileManager.downloadMedia({
      media: doc,
      queueId,
      onlyCache
    });
  }

  public getLottieCachedThumb(docId: DocId, toneIndex: number) {
    const cached = this.stickerCachedThumbs[docId];
    return cached && cached[toneIndex];
  }

  public saveLottiePreview(docId: DocId, blob: Blob, width: number, height: number, toneIndex: number) {
    const doc = this.getDoc(docId);
    if(!doc) {
      return;
    }

    const cached = this.stickerCachedThumbs[doc.id] ??= {};
  
    const thumb = cached[toneIndex];
    if(thumb && thumb.w >= width && thumb.h >= height) {
      return;
    }

    cached[toneIndex] = {
      url: URL.createObjectURL(blob),
      w: width,
      h: height
    };
  }

  public saveWebPConvertedStrippedThumb(docId: DocId, bytes: Uint8Array) {
    const doc = this.getDoc(docId);
    if(!doc) {
      return;
    }

    const thumb = doc.thumbs && doc.thumbs.find((thumb) => thumb._ === 'photoStrippedSize') as PhotoSize.photoStrippedSize;
    if(!thumb) {
      return;
    }

    doc.pFlags.stickerThumbConverted = true;
    thumb.bytes = bytes;
  }

  public getWallPapers() {
    return this.apiManager.invokeApiHashable({method: 'account.getWallPapers'}).then((accountWallpapers) => {
      const wallPapers = (accountWallpapers as AccountWallPapers.accountWallPapers).wallpapers as WallPaper.wallPaper[];
      wallPapers.forEach((wallPaper) => {
        wallPaper.document = this.saveDoc(wallPaper.document);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

<<<<<<< HEAD
    download.then(() => {
      rootScope.dispatchEvent('document_downloaded', doc);
    });

    return download;
  }

  public isSavingLottiePreview(doc: MyDocument, toneIndex: number) {
    const key = doc.id + '-' + toneIndex;
    return !!this.savingLottiePreview[key];
  }

  public saveLottiePreview(doc: MyDocument, canvas: HTMLCanvasElement, toneIndex: number) {
    const key = doc.id + '-' + toneIndex;
    if(this.savingLottiePreview[key]/*  || true */) return;

    if(!doc.stickerCachedThumbs) {
      defineNotNumerableProperties(doc, ['stickerCachedThumbs']);
      doc.stickerCachedThumbs = {};
    }

    const thumb = doc.stickerCachedThumbs[toneIndex];
    if(thumb && thumb.w >= canvas.width && thumb.h >= canvas.height) {
      return;
    }

    /* if(doc.thumbs.find(t => t._ === 'photoStrippedSize') 
      || (doc.stickerCachedThumb || (doc.stickerSavedThumbWidth >= canvas.width && doc.stickerSavedThumbHeight >= canvas.height))) {
      return;
    } */

    this.savingLottiePreview[key] = true;
    canvas.toBlob((blob) => {
      //console.log('got lottie preview', doc, blob, URL.createObjectURL(blob));

      const thumb = {
        url: URL.createObjectURL(blob),
        w: canvas.width,
        h: canvas.height
      };

      doc.stickerCachedThumbs[toneIndex] = thumb;

      delete this.savingLottiePreview[key];
      
      /* const reader = new FileReader();
      reader.onloadend = (e) => {
        const uint8 = new Uint8Array(e.target.result as ArrayBuffer);
        const thumb: PhotoSize.photoStrippedSize = {
          _: 'photoStrippedSize',
          bytes: uint8,
          type: 'i'
        };

        doc.stickerSavedThumbWidth = canvas.width;
        doc.stickerSavedThumbHeight = canvas.width;

        defineNotNumerableProperties(thumb, ['url']);
        thumb.url = URL.createObjectURL(blob);
        doc.thumbs.findAndSplice(t => t._ === thumb._);
        doc.thumbs.unshift(thumb);

        if(!webpWorkerController.isWebpSupported()) {
          doc.pFlags.stickerThumbConverted = true;
        }

        delete this.savingLottiePreview[doc.id];
      };
      reader.readAsArrayBuffer(blob); */
    });
  }

  public saveDocFile(doc: MyDocument, queueId?: number) {
    /* const options = this.getFileDownloadOptions(doc, undefined, queueId);
    return appDownloadManager.downloadToDisc(options, doc.file_name); */
    const promise = this.downloadDoc(doc, queueId);
    promise.then(() => {
      const cacheContext = appDownloadManager.getCacheContext(doc);
      appDownloadManager.createDownloadAnchor(cacheContext.url, doc.file_name);
    });
    return promise;
  }
}

const appDocsManager = new AppDocsManager();
MOUNT_CLASS_TO.appDocsManager = appDocsManager;
export default appDocsManager;
=======
      return wallPapers;
    });
  }

  public prepareWallPaperUpload(file: File) {
    const id = 'wallpaper-upload-' + ++uploadWallPaperTempId;

    const thumb = {
      _: 'photoSize',
      h: 0,
      w: 0,
      location: {} as any,
      size: file.size,
      type: 'full',
    } as PhotoSize.photoSize;
    let document: MyDocument = {
      _: 'document',
      access_hash: '',
      attributes: [],
      dc_id: 0,
      file_reference: [],
      id,
      mime_type: file.type,
      size: file.size,
      date: Date.now() / 1000,
      pFlags: {},
      thumbs: [thumb],
      file_name: file.name
    };

    document = this.saveDoc(document);

    const cacheContext = this.thumbsStorage.setCacheContextURL(document, undefined, URL.createObjectURL(file), file.size);

    const wallpaper: WallPaper.wallPaper = {
      _: 'wallPaper',
      access_hash: '',
      document: document,
      id,
      slug: id,
      pFlags: {}
    };

    this.uploadingWallPapers[id] = {
      cacheContext,
      file,
    };

    return wallpaper;
  }

  public uploadWallPaper(id: WallPaperId) {
    const {cacheContext, file} = this.uploadingWallPapers[id];
    delete this.uploadingWallPapers[id];

    const upload = this.apiFileManager.upload({file, fileName: file.name});
    return upload.then((inputFile) => {
      return this.apiManager.invokeApi('account.uploadWallPaper', {
        file: inputFile,
        mime_type: file.type,
        settings: {
          _: 'wallPaperSettings',
          
        }
      }).then((wallPaper) => {
        assumeType<WallPaper.wallPaper>(wallPaper);
        wallPaper.document = this.saveDoc(wallPaper.document);
        this.thumbsStorage.setCacheContextURL(wallPaper.document, undefined, cacheContext.url, cacheContext.downloaded);

        return wallPaper;
      });
    });
  }

  public getGifs() {
    return this.apiManager.invokeApiHashable({
      method: 'messages.getSavedGifs',
      processResult: (res) => {
        assumeType<MessagesSavedGifs.messagesSavedGifs>(res);
        return res.gifs.map((doc) => this.saveDoc(doc));
      }
    });
  }

  public requestDocPart(docId: DocId, dcId: number, offset: number, limit: number) {
    const doc = this.getDoc(docId);
    return this.apiFileManager.requestFilePart(dcId, getDocumentInput(doc), offset, limit);
  }
}
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
