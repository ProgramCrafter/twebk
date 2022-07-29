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

import type { ReferenceBytes } from "./referenceDatabase";
<<<<<<< HEAD
import { MOUNT_CLASS_TO } from "../../config/debug";
import Modes from "../../config/modes";
import deferredPromise, { CancellablePromise } from "../../helpers/cancellablePromise";
import { notifyAll, notifySomeone } from "../../helpers/context";
import { getFileNameByLocation } from "../../helpers/fileName";
import { randomLong } from "../../helpers/random";
import { InputFile, InputFileLocation, InputWebFileLocation, UploadFile, UploadWebFile } from "../../layer";
import { DcId, WorkerTaskVoidTemplate } from "../../types";
import CacheStorageController from "../cacheStorage";
import cryptoWorker from "../crypto/cryptoworker";
import fileManager from "../fileManager";
import { logger, LogTypes } from "../logger";
import apiManager from "./apiManager";
import { isWebpSupported } from "./mtproto.worker";
=======
import Modes from "../../config/modes";
import deferredPromise, { CancellablePromise } from "../../helpers/cancellablePromise";
import { getFileNameByLocation } from "../../helpers/fileName";
import { randomLong } from "../../helpers/random";
import { Document, InputFile, InputFileLocation, InputWebFileLocation, Photo, PhotoSize, UploadFile, UploadWebFile, WebDocument } from "../../layer";
import { DcId } from "../../types";
import CacheStorageController from "../cacheStorage";
import fileManager from "../fileManager";
import { logger, LogTypes } from "../logger";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import assumeType from "../../helpers/assumeType";
import ctx from "../../environment/ctx";
import noop from "../../helpers/noop";
import readBlobAsArrayBuffer from "../../helpers/blob/readBlobAsArrayBuffer";
import bytesToHex from "../../helpers/bytes/bytesToHex";
import findAndSplice from "../../helpers/array/findAndSplice";
<<<<<<< HEAD
import { IS_FIREFOX } from "../../environment/userAgent";
import fixFirefoxSvg from "../../helpers/fixFirefoxSvg";
=======
import fixFirefoxSvg from "../../helpers/fixFirefoxSvg";
import { AppManager } from "../appManagers/manager";
import { getEnvironment } from "../../environment/utils";
import MTProtoMessagePort from "./mtprotoMessagePort";
import getFileNameForUpload from "../../helpers/getFileNameForUpload";
import type { Progress } from "../appManagers/appDownloadManager";
import getDownloadMediaDetails from "../appManagers/utils/download/getDownloadMediaDetails";
import networkStats from "./networkStats";
import pause from "../../helpers/schedulers/pause";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

type Delayed = {
  offset: number, 
  writeFilePromise: CancellablePromise<void>, 
  writeFileDeferred: CancellablePromise<void>
};

export type DownloadOptions = {
  dcId: DcId, 
  location: InputFileLocation | InputWebFileLocation, 
  size?: number,
  fileName?: string,
  mimeType?: string,
  limitPart?: number,
  queueId?: number,
  onlyCache?: boolean,
  // getFileMethod: Parameters<CacheStorageController['getFile']>[1]
};

<<<<<<< HEAD
=======
export type DownloadMediaOptions = {
  media: Photo.photo | Document.document | WebDocument,
  thumb?: PhotoSize,
  queueId?: number,
  onlyCache?: boolean
};

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
type DownloadPromise = CancellablePromise<Blob>;

export type MyUploadFile = UploadFile.uploadFile | UploadWebFile.uploadWebFile;

<<<<<<< HEAD
export interface RefreshReferenceTask extends WorkerTaskVoidTemplate {
  type: 'refreshReference',
  payload: ReferenceBytes,
};

export interface RefreshReferenceTaskResponse extends WorkerTaskVoidTemplate {
  type: 'refreshReference',
  payload: ReferenceBytes,
  originalPayload: ReferenceBytes
};

const MAX_FILE_SAVE_SIZE = 20 * 1024 * 1024;

export class ApiFileManager {
  private cacheStorage = new CacheStorageController('cachedFiles');

  private cachedDownloadPromises: {
=======
// export interface RefreshReferenceTask extends WorkerTaskVoidTemplate {
//   type: 'refreshReference',
//   payload: ReferenceBytes,
// };

// export interface RefreshReferenceTaskResponse extends WorkerTaskVoidTemplate {
//   type: 'refreshReference',
//   payload: ReferenceBytes,
//   originalPayload: ReferenceBytes
// };

const MAX_FILE_SAVE_SIZE = 20 * 1024 * 1024;

const REGULAR_DOWNLOAD_DELTA = 36;
const PREMIUM_DOWNLOAD_DELTA = 72;

export class ApiFileManager extends AppManager {
  private cacheStorage = new CacheStorageController('cachedFiles');

  private downloadPromises: {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    [fileName: string]: DownloadPromise
  } = {};

  private uploadPromises: {
<<<<<<< HEAD
    [fileName: string]: Set<CancellablePromise<InputFile>>
=======
    [fileName: string]: CancellablePromise<InputFile>
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  } = {};

  private downloadPulls: {
    [dcId: string]: Array<{
      id: number,
      queueId: number,
      cb: () => Promise<MyUploadFile | void>,
      deferred: {
        resolve: (...args: any[]) => void,
        reject: (...args: any[]) => void
      },
      activeDelta: number
    }>
  } = {};
  private downloadActives: {[dcId: string]: number} = {};

<<<<<<< HEAD
  public webpConvertPromises: {[fileName: string]: CancellablePromise<Uint8Array>} = {};
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  public refreshReferencePromises: {
    [referenceHex: string]: {
      deferred: CancellablePromise<ReferenceBytes>,
      timeout: number
    }
  } = {};

  private log: ReturnType<typeof logger> = logger('AFM', LogTypes.Error | LogTypes.Log);
  private tempId = 0;
  private queueId = 0;
  private debug = Modes.debug;

<<<<<<< HEAD
  constructor() {
=======
  protected after() {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    setInterval(() => { // clear old promises
      for(const hex in this.refreshReferencePromises) {
        const {deferred} = this.refreshReferencePromises[hex];
        if(deferred.isFulfilled || deferred.isRejected) {
          delete this.refreshReferencePromises[hex];
        }
      }
    }, 1800e3);
  }

  private downloadRequest(dcId: 'upload', id: number, cb: () => Promise<void>, activeDelta: number, queueId?: number): Promise<void>;
  private downloadRequest(dcId: number, id: number, cb: () => Promise<MyUploadFile>, activeDelta: number, queueId?: number): Promise<MyUploadFile>;
  private downloadRequest(dcId: number | string, id: number, cb: () => Promise<MyUploadFile | void>, activeDelta: number, queueId: number = 0) {
    if(this.downloadPulls[dcId] === undefined) {
      this.downloadPulls[dcId] = [];
      this.downloadActives[dcId] = 0;
    }

    const downloadPull = this.downloadPulls[dcId];

    const promise = new Promise<MyUploadFile | void>((resolve, reject) => {
      downloadPull.push({id, queueId, cb, deferred: {resolve, reject}, activeDelta});
    });

    setTimeout(() => {
      this.downloadCheck(dcId);
    }, 0);

    return promise;
  }

  private downloadCheck(dcId: string | number) {
    const downloadPull = this.downloadPulls[dcId];
<<<<<<< HEAD
    const downloadLimit = dcId === 'upload' ? 24 : 36;
=======
    const downloadLimit = dcId === 'upload' ? 24 : (this.rootScope.premium ? PREMIUM_DOWNLOAD_DELTA : REGULAR_DOWNLOAD_DELTA);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    //const downloadLimit = Infinity;

    if(this.downloadActives[dcId] >= downloadLimit || !downloadPull || !downloadPull.length) {
      return false;
    }

    //const data = downloadPull.shift();
    const data = findAndSplice(downloadPull, d => d.queueId === 0) || findAndSplice(downloadPull, d => d.queueId === this.queueId) || downloadPull.shift();
    const activeDelta = data.activeDelta || 1;

    this.downloadActives[dcId] += activeDelta;
<<<<<<< HEAD
 
    data.cb()
    .then((result) => {
      this.downloadActives[dcId] -= activeDelta;
      this.downloadCheck(dcId);

      data.deferred.resolve(result);
=======

    const promise = data.cb();
    const networkPromise = networkStats.waitForChunk(dcId as DcId, activeDelta * 1024 * 128);
    Promise.race([
      promise,
      networkPromise
    ]).then(() => {
      this.downloadActives[dcId] -= activeDelta;
      this.downloadCheck(dcId);

      networkPromise.resolve();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }, (error: Error) => {
      // @ts-ignore
      if(!error || !error.type || (error.type !== 'DOWNLOAD_CANCELED' && error.type !== 'UPLOAD_CANCELED')) {
        this.log.error('downloadCheck error:', error);
      }

      this.downloadActives[dcId] -= activeDelta;
      this.downloadCheck(dcId);
<<<<<<< HEAD

      data.deferred.reject(error);
=======
      
      networkPromise.reject(error);
    }).finally(() => {
      promise.then(data.deferred.resolve, data.deferred.reject);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  }

  public setQueueId(queueId: number) {
    //this.log.error('setQueueId', queueId);
    this.queueId = queueId;
  }

  private getFileStorage() {
    return this.cacheStorage;
  }

  public cancelDownload(fileName: string) {
<<<<<<< HEAD
    const promises = (this.cachedDownloadPromises[fileName] ? [this.cachedDownloadPromises[fileName]] : undefined) || 
      (this.uploadPromises[fileName] ? Array.from(this.uploadPromises[fileName]) : []);
=======
    const promises = [this.downloadPromises[fileName], this.uploadPromises[fileName]].filter(Boolean);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    let canceled = false;
    for(let i = 0, length = promises.length; i < length; ++i) {
      const promise = promises[i];
      if(promise && !promise.isRejected && !promise.isFulfilled) {
        promise.cancel();
        canceled = true;
      }
    }

    return canceled;
  }

  public requestWebFilePart(dcId: DcId, location: InputWebFileLocation, offset: number, limit: number, id = 0, queueId = 0, checkCancel?: () => void) {
    return this.downloadRequest(dcId, id, async() => { // do not remove async, because checkCancel will throw an error
      checkCancel && checkCancel();

<<<<<<< HEAD
      return apiManager.invokeApi('upload.getWebFile', {
=======
      return this.apiManager.invokeApi('upload.getWebFile', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        location,
        offset,
        limit
      }, {
        dcId,
        fileDownload: true
      });
    }, this.getDelta(limit), queueId);
  }

  public requestFilePart(dcId: DcId, location: InputFileLocation, offset: number, limit: number, id = 0, queueId = 0, checkCancel?: () => void) {
    return this.downloadRequest(dcId, id, async() => { // do not remove async, because checkCancel will throw an error
      checkCancel && checkCancel();

      const invoke = async(): Promise<MyUploadFile> => {
        checkCancel && checkCancel(); // do not remove async, because checkCancel will throw an error

<<<<<<< HEAD
        const promise = apiManager.invokeApi('upload.getFile', {
=======
        const promise = this.apiManager.invokeApi('upload.getFile', {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          location,
          offset,
          limit
        }, {
          dcId,
          fileDownload: true
        }) as Promise<MyUploadFile>;

        return promise.catch((err) => {
          if(err.type === 'FILE_REFERENCE_EXPIRED') {
            return this.refreshReference(location).then(invoke);
          }

          throw err;
        });
      };

      assumeType<InputFileLocation.inputDocumentFileLocation>(location);
      const reference = location.file_reference;
      if(reference && !location.checkedReference) { // check stream's location because it's new every call
        location.checkedReference = true;
        const hex = bytesToHex(reference);
        if(this.refreshReferencePromises[hex]) {
          return this.refreshReference(location).then(invoke);
        }
      }

      return invoke();
    }, this.getDelta(limit), queueId);
  }

  /* private convertBlobToBytes(blob: Blob) {
<<<<<<< HEAD
    return blob.arrayBuffer().then(buffer => new Uint8Array(buffer));
=======
    return blob.arrayBuffer().then((buffer) => new Uint8Array(buffer));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  } */

  private getDelta(bytes: number) {
    return bytes / 1024 / 128;
  }

  private getLimitPart(size: number): number {
<<<<<<< HEAD
=======
    if(!size) { // * sometimes size can be 0 (e.g. avatars, webDocuments)
      return 512 * 1024;
    }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    let bytes = 128 * 1024;

    while((size / bytes) > 2000) {
      bytes *= 2;
    }
    /* if(size < 1e6 || !size) bytes = 512;
    else if(size < 3e6) bytes = 256;
    else bytes = 128; */

    return bytes;
  }

  private uncompressTGS = (bytes: Uint8Array, fileName: string) => {
    //this.log('uncompressTGS', bytes, bytes.slice().buffer);
    // slice нужен потому что в uint8array - 5053 length, в arraybuffer - 5084
<<<<<<< HEAD
    return cryptoWorker.invokeCrypto('gzipUncompress', bytes.slice().buffer, false) as Promise<Uint8Array>;
=======
    return this.cryptoWorker.invokeCrypto('gzipUncompress', bytes.slice().buffer, false) as Promise<Uint8Array>;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  private uncompressTGV = (bytes: Uint8Array, fileName: string) => {
    //this.log('uncompressTGS', bytes, bytes.slice().buffer);
    // slice нужен потому что в uint8array - 5053 length, в arraybuffer - 5084
    const buffer = bytes.slice().buffer;
<<<<<<< HEAD
    if(IS_FIREFOX) {
      return cryptoWorker.invokeCrypto('gzipUncompress', buffer, true).then((text) => {
=======
    if(getEnvironment().IS_FIREFOX) {
      return this.cryptoWorker.invokeCrypto('gzipUncompress', buffer, true).then((text) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return fixFirefoxSvg(text as string);
      }).then((text) => {
        const textEncoder = new TextEncoder();
        return textEncoder.encode(text);
      });
    }

<<<<<<< HEAD
    return cryptoWorker.invokeCrypto('gzipUncompress', buffer, false) as Promise<Uint8Array>;
  };

  private convertWebp = (bytes: Uint8Array, fileName: string) => {
    const convertPromise = deferredPromise<Uint8Array>();

    const task = {type: 'convertWebp', payload: {fileName, bytes}};
    notifySomeone(task);
    return this.webpConvertPromises[fileName] = convertPromise;
=======
    return this.cryptoWorker.invokeCrypto('gzipUncompress', buffer, false) as Promise<Uint8Array>;
  };

  private convertWebp = (bytes: Uint8Array, fileName: string) => {
    const instance = MTProtoMessagePort.getInstance<false>();
    return instance.invoke('convertWebp', {fileName, bytes});
  };

  private convertOpus = (bytes: Uint8Array, fileName: string) => {
    const instance = MTProtoMessagePort.getInstance<false>();
    return instance.invoke('convertOpus', {fileName, bytes});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  private refreshReference(inputFileLocation: InputFileLocation) {
    const reference = (inputFileLocation as InputFileLocation.inputDocumentFileLocation).file_reference;
    const hex = bytesToHex(reference);

    let r = this.refreshReferencePromises[hex];
    if(!r) {
      const deferred = deferredPromise<ReferenceBytes>();

      r = this.refreshReferencePromises[hex] = {
        deferred,
        timeout: ctx.setTimeout(() => {
          this.log.error('Didn\'t refresh the reference:', inputFileLocation);
          deferred.reject('REFERENCE_IS_NOT_REFRESHED');
        }, 60000)
      };

      deferred.catch(noop).finally(() => {
        clearTimeout(r.timeout);
      });

<<<<<<< HEAD
      const task = {type: 'refreshReference', payload: reference};
      notifySomeone(task);
    }

    // have to replace file_reference in any way, because location can be different everytime if it's stream
    return r.deferred.then(reference => {
=======
      this.referenceDatabase.refreshReference(reference).then(deferred.resolve, deferred.reject);
      // const task = {type: 'refreshReference', payload: reference};
      // notifySomeone(task);
    }

    // have to replace file_reference in any way, because location can be different everytime if it's stream
    return r.deferred.then((reference) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(hex === bytesToHex(reference)) {
        throw 'REFERENCE_IS_NOT_REFRESHED';
      }

      (inputFileLocation as InputFileLocation.inputDocumentFileLocation).file_reference = reference;
    });
  }

<<<<<<< HEAD
  public downloadFile(options: DownloadOptions): DownloadPromise {
=======
  public isDownloading(fileName: string) {
    return !!this.downloadPromises[fileName];
  }

  public getDownload(fileName: string) {
    return this.downloadPromises[fileName];
  }

  public getUpload(fileName: string) {
    return this.uploadPromises[fileName];
  }

  public download(options: DownloadOptions): DownloadPromise {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!fileManager.isAvailable()) {
      return Promise.reject({type: 'BROWSER_BLOB_NOT_SUPPORTED'});
    }

    const size = options.size ?? 0;
    const {dcId, location} = options;

    let process: ApiFileManager['uncompressTGS'] | ApiFileManager['convertWebp'];

    if(options.mimeType === 'application/x-tgwallpattern') {
      process = this.uncompressTGV;
      options.mimeType = 'image/svg+xml';
<<<<<<< HEAD
    } else if(options.mimeType === 'image/webp' && !isWebpSupported()) {
=======
    } else if(options.mimeType === 'image/webp' && !getEnvironment().IS_WEBP_SUPPORTED) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      process = this.convertWebp;
      options.mimeType = 'image/png';
    } else if(options.mimeType === 'application/x-tgsticker') {
      process = this.uncompressTGS;
      options.mimeType = 'application/json';
<<<<<<< HEAD
    }

    const fileName = getFileNameByLocation(location, {fileName: options.fileName});
    const cachedPromise = this.cachedDownloadPromises[fileName];
=======
    } else if(options.mimeType === 'audio/ogg' && !getEnvironment().IS_OPUS_SUPPORTED) {
      process = this.convertOpus;
      options.mimeType = 'audio/wav';
    }

    const fileName = getFileNameByLocation(location, {fileName: options.fileName});
    const cachedPromise = this.downloadPromises[fileName];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const fileStorage = this.getFileStorage();

    this.debug && this.log('downloadFile', fileName, size, location, options.mimeType);

    /* if(options.queueId) {
      this.log.error('downloadFile queueId:', fileName, options.queueId);
    } */

    if(cachedPromise) {
      //this.log('downloadFile cachedPromise');

      if(size) {
        return cachedPromise.then((blob) => {
          if(blob instanceof Blob && blob.size < size) {
            this.debug && this.log('downloadFile need to deleteFile, wrong size:', blob.size, size);

<<<<<<< HEAD
            return this.deleteFile(fileName).then(() => {
              return this.downloadFile(options);
            }).catch(() => {
              return this.downloadFile(options);
=======
            return this.delete(fileName).then(() => {
              return this.download(options);
            }).catch(() => {
              return this.download(options);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            });
          } else {
            return blob;
          }
        });
      } else {
        return cachedPromise;
      }
    }

    const deferred: DownloadPromise = deferredPromise();
    const mimeType = options.mimeType || 'image/jpeg';

    let error: Error;
    let resolved = false;
    let cacheFileWriter: ReturnType<typeof fileManager['getFakeFileWriter']>;
    let errorHandler = (_error: Error) => {
      error = _error;
<<<<<<< HEAD
      delete this.cachedDownloadPromises[fileName];
=======
      delete this.downloadPromises[fileName];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      deferred.reject(error);
      errorHandler = () => {};

      if(cacheFileWriter && (!error || error.type !== 'DOWNLOAD_CANCELED')) {
        cacheFileWriter.truncate();
      }
    };

    const id = this.tempId++;

    fileStorage.getFile(fileName).then(async(blob: Blob) => {
      //this.log('maybe cached', fileName);
      //throw '';

      if(blob.size < size) {
        //this.log('downloadFile need to deleteFile 2, wrong size:', blob.size, size);
<<<<<<< HEAD
        await this.deleteFile(fileName);
=======
        if(!options.onlyCache) {
          await this.delete(fileName);
        }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        throw false;
      }

      deferred.resolve(blob);
<<<<<<< HEAD
    }).catch(() => {
=======
    }).catch((err) => {
      if(options.onlyCache) {
        errorHandler(err);
        return;
      }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      //this.log('not cached', fileName);
      const limit = options.limitPart || this.getLimitPart(size);
      const fileWriterPromise = fileStorage.getFileWriter(fileName, size || limit, mimeType);

      fileWriterPromise.then((fileWriter) => {
        cacheFileWriter = fileWriter;
        let offset: number;
        let startOffset = 0;
        let writeFilePromise: CancellablePromise<void> = Promise.resolve(),
          writeFileDeferred: CancellablePromise<void>;
        //const maxRequests = 13107200 / limit; // * 100 Mb speed
        const maxRequests = Infinity;

        //console.error('maxRequests', maxRequests);

        const processDownloaded = async(bytes: Uint8Array) => {
          if(process) {
            //const perf = performance.now();
            const processed = await process(bytes, fileName);
            //this.log('downloadFile process downloaded time', performance.now() - perf, mimeType, process);
            return processed;
          }
  
          return bytes;
        };

        const r = location._ === 'inputWebFileLocation' ? this.requestWebFilePart.bind(this) : this.requestFilePart.bind(this);

        const delayed: Delayed[] = [];
        offset = startOffset;
        do {
          ////this.log('offset:', startOffset);
          writeFileDeferred = deferredPromise<void>();
          delayed.push({offset, writeFilePromise, writeFileDeferred});
          writeFilePromise = writeFileDeferred;
          offset += limit;
        } while(offset < size);

        let done = 0;
        const superpuper = async() => {
          //if(!delayed.length) return;

          const {offset, writeFilePromise, writeFileDeferred} = delayed.shift();
          try {
            checkCancel();

            // @ts-ignore
            const result = await r(dcId, location as any, offset, limit, id, options.queueId, checkCancel);

            const bytes = result.bytes;

            if(delayed.length) {
              superpuper();
            }

            this.debug && this.log('downloadFile requestFilePart result:', fileName, result);
<<<<<<< HEAD
            const isFinal = offset + limit >= size || !bytes.byteLength;
=======
            const isFinal = (offset + limit) >= size || !bytes.byteLength;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            if(bytes.byteLength) {
              //done += limit;
              done += bytes.byteLength;

              //if(!isFinal) {
                ////this.log('deferred notify 2:', {done: offset + limit, total: size}, deferred);
<<<<<<< HEAD
                deferred.notify({done, offset, total: size});
=======
                const progress: Progress = {done, offset, total: size, fileName};
                deferred.notify(progress);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              //}

              await writeFilePromise;
              checkCancel();

              await fileWriter.write(bytes, offset);
            }

            if(isFinal && process) {
              const bytes = fileWriter.getParts();
              const processedResult = await processDownloaded(bytes);
              checkCancel();

              fileWriter.replaceParts(processedResult);
            }

            writeFileDeferred.resolve();

            if(isFinal) {
              resolved = true;

              const realSize = size || bytes.byteLength;
              if(!size) {
                fileWriter.trim(realSize);
              }

              deferred.resolve(fileWriter.finalize(realSize < MAX_FILE_SAVE_SIZE));
            }
          } catch(err) {
            errorHandler(err as Error);
          }
        };

        for(let i = 0, length = Math.min(maxRequests, delayed.length); i < length; ++i) {
          superpuper();
        }
      }).catch((err) => {
        if(!['STORAGE_OFFLINE'].includes(err)) {
          this.log.error('saveFile error:', err);
        }
      });
    });

    const checkCancel = () => {
      if(error) {
        throw error;
      }
    };

    deferred.cancel = () => {
      if(!error && !resolved) {
        const error = new Error('Canceled');
        error.type = 'DOWNLOAD_CANCELED';
        errorHandler(error);
      }
    };

<<<<<<< HEAD
    deferred.notify = (progress: {done: number, total: number, offset: number}) => {
      notifyAll({progress: {fileName, ...progress}});
    };

    this.cachedDownloadPromises[fileName] = deferred;

    deferred.catch(noop).finally(() => {
      delete this.cachedDownloadPromises[fileName];
=======
    deferred.notify = (progress: Progress) => {
      this.rootScope.dispatchEvent('download_progress', progress);
    };

    this.downloadPromises[fileName] = deferred;

    deferred.catch(noop).finally(() => {
      delete this.downloadPromises[fileName];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    return deferred;
  }

<<<<<<< HEAD
  private deleteFile(fileName: string) {
    //this.log('will delete file:', fileName);
    delete this.cachedDownloadPromises[fileName];
    return this.getFileStorage().delete(fileName);
  }

  public uploadFile({file, fileName}: {file: Blob | File, fileName: string}) {
=======
  public downloadMedia(options: DownloadMediaOptions): DownloadPromise {
    let {media, thumb} = options;
    const isPhoto = media._ === 'photo';
    if(isPhoto && !thumb) {
      return Promise.reject('preloadPhoto photoEmpty!');
    }

    // get original instance with correct file_reference instead of using copies
    const isDocument = media._ === 'document';
    // const isWebDocument = media._ === 'webDocument';
    if(isDocument) media = this.appDocsManager.getDoc((media as Photo.photo).id);
    else if(isPhoto) media = this.appPhotosManager.getPhoto((media as Document.document).id);

    const {fileName, downloadOptions} = getDownloadMediaDetails(options);

    let promise = this.getDownload(fileName);
    if(!promise) {
      promise = this.download(downloadOptions);
      
      if(isDocument && !thumb) {
        this.rootScope.dispatchEvent('document_downloading', (media as Document.document).id);
        promise.catch(noop).finally(() => {
          this.rootScope.dispatchEvent('document_downloaded', (media as Document.document).id);
        });
      }
    }

    return promise;
  }

  public downloadMediaURL(options: DownloadMediaOptions): Promise<string> {
    const {media, thumb} = options;

    let cacheContext = this.thumbsStorage.getCacheContext(media as any, thumb?.type);
    if((thumb ? (cacheContext.downloaded >= ('size' in thumb ? thumb.size : 0)) : true) && cacheContext.url) {
      return Promise.resolve(cacheContext.url);
    }

    return this.downloadMedia(options).then((blob) => {
      if(!cacheContext.downloaded || cacheContext.downloaded < blob.size) {
        const url = URL.createObjectURL(blob);
        cacheContext = this.thumbsStorage.setCacheContextURL(media as any, cacheContext.type, url, blob.size);
      }

      return cacheContext.url;
    });
  }

  public downloadMediaVoid(options: DownloadMediaOptions) {
    return this.downloadMedia(options).then(noop);
  }

  private delete(fileName: string) {
    //this.log('will delete file:', fileName);
    delete this.downloadPromises[fileName];
    return this.getFileStorage().delete(fileName);
  }

  public upload({file, fileName}: {file: Blob | File, fileName?: string}) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const fileSize = file.size, 
      isBigFile = fileSize >= 10485760;

    let canceled = false,
      resolved = false,
      doneParts = 0,
      partSize = 262144; // 256 Kb

    /* if(fileSize > (524288 * 3000)) {
      partSize = 1024 * 1024;
      activeDelta = 8;
    } else  */if(fileSize > 67108864) {
      partSize = 524288;
    } else if(fileSize < 102400) {
      partSize = 32768;
    }

<<<<<<< HEAD
=======
    fileName ||= getFileNameForUpload(file);

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const activeDelta = this.getDelta(partSize);

    const totalParts = Math.ceil(fileSize / partSize);
    const fileId = randomLong();

    let _part = 0;

    const resultInputFile: InputFile = {
      _: isBigFile ? 'inputFileBig' : 'inputFile',
      id: fileId as any,
      parts: totalParts,
      name: fileName,
      md5_checksum: ''
    };

<<<<<<< HEAD
    const deferredHelper: {
      resolve?: (input: typeof resultInputFile) => void,
      reject?: (error: any) => void,
      notify?: (details: {done: number, total: number}) => void
    } = {
      notify: (details: {done: number, total: number}) => {}
    };
    const deferred: CancellablePromise<typeof resultInputFile> = new Promise((resolve, reject) => {
      if(totalParts > 4000) {
        return reject({type: 'FILE_TOO_BIG'});
      }

      deferredHelper.resolve = resolve;
      deferredHelper.reject = reject;
    });
    Object.assign(deferred, deferredHelper);

    if(totalParts > 4000) {
=======
    const deferred = deferredPromise<typeof resultInputFile>();
    if(totalParts > 4000) {
      deferred.reject({type: 'FILE_TOO_BIG'});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return deferred;
    }
    
    let errorHandler = (error: any) => {
      if(error?.type !== 'UPLOAD_CANCELED') {
        this.log.error('Up Error', error);
      }

      deferred.reject(error);
      canceled = true;
      errorHandler = () => {};
    };

    const method = isBigFile ? 'upload.saveBigFilePart' : 'upload.saveFilePart';

    const id = this.tempId++;

    /* setInterval(() => {
      console.log(file);
    }, 1e3); */

    const self = this;
    function* generator() {
      for(let offset = 0; offset < fileSize; offset += partSize) {
        const part = _part++; // 0, 1
        yield self.downloadRequest('upload', id, () => {
          const blob = file.slice(offset, offset + partSize);

<<<<<<< HEAD
          return readBlobAsArrayBuffer(blob).then(buffer => {
=======
          return readBlobAsArrayBuffer(blob).then((buffer) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            if(canceled) {
              throw {type: 'UPLOAD_CANCELED'};
            }

            self.debug && self.log('Upload file part, isBig:', isBigFile, part, buffer.byteLength, new Uint8Array(buffer).length, new Uint8Array(buffer).slice().length);

            /* const u = new Uint8Array(buffer.byteLength);
            for(let i = 0; i < u.length; ++i) {
              //u[i] = Math.random() * 255 | 0;
              u[i] = 0;
            }
            buffer = u.buffer; */
  
            /* setTimeout(() => {
              doneParts++;
              uploadResolve();
  
              //////this.log('Progress', doneParts * partSize / fileSize);

              self.log('done part', part, doneParts);
  
              deferred.notify({done: doneParts * partSize, total: fileSize});
  
              if(doneParts >= totalParts) {
                deferred.resolve(resultInputFile);
                resolved = true;
              }
            }, 1250);
            return; */

<<<<<<< HEAD
            return apiManager.invokeApi(method, {
=======
            return self.apiManager.invokeApi(method, {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
              file_id: fileId,
              file_part: part,
              file_total_parts: totalParts,
              bytes: buffer/* new Uint8Array(buffer) */
            } as any, {
              //startMaxLength: partSize + 256,
              fileUpload: true
<<<<<<< HEAD
            }).then((result) => {
              doneParts++;
  
              //////this.log('Progress', doneParts * partSize / fileSize);
  
              deferred.notify({done: doneParts * partSize, total: fileSize});
=======
            }).then(() => {
              if(canceled) {
                return;
              }

              ++doneParts;
              const progress: Progress = {done: doneParts * partSize, offset, total: fileSize, fileName};
              deferred.notify(progress);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
              if(doneParts >= totalParts) {
                deferred.resolve(resultInputFile);
                resolved = true;
              }
            }, errorHandler);
          });
        }, activeDelta).catch(errorHandler);
      }
    }

    const it = generator();
    const process = () => {
      if(canceled) return;
      const r = it.next();
      if(r.done || canceled) return;
      (r.value as Promise<void>).then(process);
    };

    const maxRequests = Infinity;
    //const maxRequests = 10;
    /* for(let i = 0; i < 10; ++i) {
      process();
    } */
    for(let i = 0, length = Math.min(maxRequests, totalParts); i < length; ++i) {
      process();
    }

    deferred.cancel = () => {
      //this.log('cancel upload', canceled, resolved);
      if(!canceled && !resolved) {
        canceled = true;
        errorHandler({type: 'UPLOAD_CANCELED'});
      }
    };

<<<<<<< HEAD
    deferred.notify = (progress: {done: number, total: number}) => {
      notifyAll({progress: {fileName, ...progress}});
    };

    deferred.finally(() => {
      set.delete(deferred);
      if(!set.size) {
        delete this.uploadPromises[fileName];
      }
    });

    const set = this.uploadPromises[fileName] ?? (this.uploadPromises[fileName] = new Set());
    set.add(deferred);
    return deferred;
  }
}

const apiFileManager = new ApiFileManager();
MOUNT_CLASS_TO.apiFileManager = apiFileManager;
export default apiFileManager;
=======
    deferred.notify = (progress: Progress) => {
      this.rootScope.dispatchEvent('download_progress', progress);
    };

    deferred.finally(() => {
      delete this.uploadPromises[fileName];
    });

    return this.uploadPromises[fileName] = deferred;
  }
}
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
