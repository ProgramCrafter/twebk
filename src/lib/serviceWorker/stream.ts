/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import readBlobAsUint8Array from "../../helpers/blob/readBlobAsUint8Array";
import deferredPromise, { CancellablePromise } from "../../helpers/cancellablePromise";
import { getWindowClients } from "../../helpers/context";
import debounce from "../../helpers/schedulers/debounce";
import { InputFileLocation, UploadFile } from "../../layer";
import CacheStorageController from "../cacheStorage";
import { DownloadOptions } from "../mtproto/apiFileManager";
import { RequestFilePartTask, deferredPromises, log } from "./index.service";
import timeout from "./timeout";

const cacheStorage = new CacheStorageController('cachedStreamChunks');
const CHUNK_TTL = 86400;
const CHUNK_CACHED_TIME_HEADER = 'Time-Cached';

const clearOldChunks = () => {
  return cacheStorage.timeoutOperation((cache) => {
<<<<<<< HEAD
    return cache.keys().then(requests => {
=======
    return cache.keys().then((requests) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const filtered: Map<StreamId, Request> = new Map();
      const timestamp = Date.now() / 1000 | 0;
      for(const request of requests) {
        const match = request.url.match(/\/(\d+?)\?/);
        if(match && !filtered.has(match[1])) {
          filtered.set(match[1], request);
        }
      }

      const promises: Promise<any>[] = [];
      for(const [id, request] of filtered) {
        const promise = cache.match(request).then((response) => {
          if((+response.headers.get(CHUNK_CACHED_TIME_HEADER) + CHUNK_TTL) <= timestamp) {
            log('will delete stream chunk:', id);
            return cache.delete(request, {ignoreSearch: true, ignoreVary: true});
          }
        });

        promises.push(promise);
      }

      return Promise.all(promises);
    });
  });
};

setInterval(clearOldChunks, 1800e3);
setInterval(() => {
  getWindowClients().then((clients) => {
    for(const [clientId, promises] of deferredPromises) {
<<<<<<< HEAD
      if(!clients.find(client => client.id === clientId)) {
=======
      if(!clients.find((client) => client.id === clientId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        for(const taskId in promises) {
          const promise = promises[taskId];
          promise.reject();
        }

        deferredPromises.delete(clientId);
      }
    }
  });
}, 120e3);

type StreamRange = [number, number];
type StreamId = DocId;
const streams: Map<StreamId, Stream> = new Map();
class Stream {
  private destroyDebounced: () => void;
  private id: StreamId;
  private limitPart: number;
  private loadedOffsets: Set<number> = new Set();

  constructor(private info: DownloadOptions) {
    this.id = Stream.getId(info);
    streams.set(this.id, this);

    // ! если грузить очень большое видео чанками по 512Кб в мобильном Safari, то стрим не запустится
    this.limitPart = info.size > (75 * 1024 * 1024) ? STREAM_CHUNK_UPPER_LIMIT : STREAM_CHUNK_MIDDLE_LIMIT;
    this.destroyDebounced = debounce(this.destroy, 150000, false, true);
  }

  private destroy = () => {
    streams.delete(this.id);
  };

  private async requestFilePartFromWorker(alignedOffset: number, limit: number, fromPreload = false) {
    const task: Omit<RequestFilePartTask, 'id'> = {
      type: 'requestFilePart',
<<<<<<< HEAD
      payload: [this.info.dcId, this.info.location, alignedOffset, limit]
=======
      payload: {
        docId: this.id,
        dcId: this.info.dcId,
        offset: alignedOffset,
        limit
      }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    const taskId = JSON.stringify(task);
    (task as RequestFilePartTask).id = taskId;

    const windowClient = await getWindowClients().then((clients) => {
      if(!clients.length) {
        return;
      }

<<<<<<< HEAD
      return clients.find(client => deferredPromises.has(client.id)) || clients[0];
=======
      return clients.find((client) => deferredPromises.has(client.id)) || clients[0];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    if(!windowClient) {
      throw new Error('no window');
    }

    let promises = deferredPromises.get(windowClient.id);
    if(!promises) {
      deferredPromises.set(windowClient.id, promises = {});
    }
    
    let deferred = promises[taskId] as CancellablePromise<UploadFile.uploadFile>;
    if(deferred) {
<<<<<<< HEAD
      return deferred.then(uploadFile => uploadFile.bytes);
=======
      return deferred.then((uploadFile) => uploadFile.bytes);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }
    
    windowClient.postMessage(task);
    this.loadedOffsets.add(alignedOffset);
    
    deferred = promises[taskId] = deferredPromise<UploadFile.uploadFile>();
<<<<<<< HEAD
    const bytesPromise = deferred.then(uploadFile => uploadFile.bytes);
=======
    const bytesPromise = deferred.then((uploadFile) => uploadFile.bytes);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    this.saveChunkToCache(bytesPromise, alignedOffset, limit);
    !fromPreload && this.preloadChunks(alignedOffset, alignedOffset + (this.limitPart * 15));

    return bytesPromise;
  }

  private requestFilePartFromCache(alignedOffset: number, limit: number, fromPreload?: boolean) {
    const key = this.getChunkKey(alignedOffset, limit);
    return cacheStorage.getFile(key).then((blob: Blob) => {
      return fromPreload ? new Uint8Array() : readBlobAsUint8Array(blob);
    }, (error) => {
      if(error === 'NO_ENTRY_FOUND') {
        return;
      }
    });
  }

  private requestFilePart(alignedOffset: number, limit: number, fromPreload?: boolean) {
<<<<<<< HEAD
    return this.requestFilePartFromCache(alignedOffset, limit, fromPreload).then(bytes => {
=======
    return this.requestFilePartFromCache(alignedOffset, limit, fromPreload).then((bytes) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      return bytes || this.requestFilePartFromWorker(alignedOffset, limit, fromPreload);
    });
  }

  private saveChunkToCache(deferred: Promise<Uint8Array>, alignedOffset: number, limit: number) {
<<<<<<< HEAD
    return deferred.then(bytes => {
=======
    return deferred.then((bytes) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const key = this.getChunkKey(alignedOffset, limit);
      const response = new Response(bytes, {
        headers: {
          'Content-Length': '' + bytes.length,
          'Content-Type': 'application/octet-stream',
          [CHUNK_CACHED_TIME_HEADER]: '' + (Date.now() / 1000 | 0)
        }
      });

      return cacheStorage.save(key, response);
    });
  }

  private preloadChunk(offset: number) {
    if(this.loadedOffsets.has(offset)) {
      return;
    }

    this.loadedOffsets.add(offset);
    this.requestFilePart(offset, this.limitPart, true);
  }

  private preloadChunks(offset: number, end: number) {
    if(end > this.info.size) {
      end = this.info.size;
    }

    if(!offset) { // load last chunk for bounds
      this.preloadChunk(alignOffset(offset, this.limitPart));
    } else { // don't preload next chunks before the start
      for(; offset < end; offset += this.limitPart) {
        this.preloadChunk(offset);
      }
    }
  }

  public requestRange(range: StreamRange) {
    this.destroyDebounced();

    const possibleResponse = responseForSafariFirstRange(range, this.info.mimeType, this.info.size);
    if(possibleResponse) {
      return possibleResponse;
    }

    let [offset, end] = range;

    /* if(info.size > limitPart && isSafari && offset === limitPart) {
      //end = info.size - 1;
      //offset = info.size - 1 - limitPart;
      offset = info.size - (info.size % limitPart);
    } */

    const limit = end && end < this.limitPart ? alignLimit(end - offset + 1) : this.limitPart;
    const alignedOffset = alignOffset(offset, limit);

    if(!end) {
      end = Math.min(offset + limit, this.info.size - 1);
    }

<<<<<<< HEAD
    return this.requestFilePart(alignedOffset, limit).then(ab => {
=======
    return this.requestFilePart(alignedOffset, limit).then((ab) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      //log.debug('[stream] requestFilePart result:', result);

      // if(isSafari) {
      if(offset !== alignedOffset || end !== (alignedOffset + limit)) {
        ab = ab.slice(offset - alignedOffset, end - alignedOffset + 1);
      }
      
      const headers: Record<string, string> = {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${offset}-${offset + ab.byteLength - 1}/${this.info.size || '*'}`,
        'Content-Length': `${ab.byteLength}`
      };

      if(this.info.mimeType) {
        headers['Content-Type'] = this.info.mimeType;
      }

      // simulate slow connection
      //setTimeout(() => {
        return new Response(ab, {
          status: 206,
          statusText: 'Partial Content',
          headers,
        });
      //}, 2.5e3);
    });
  }

  private getChunkKey(alignedOffset: number, limit: number) {
    return this.id + '?offset=' + alignedOffset + '&limit=' + limit;
  }

  public static get(info: DownloadOptions) {
    return streams.get(this.getId(info)) ?? new Stream(info);
  }

  private static getId(info: DownloadOptions) {
    return (info.location as InputFileLocation.inputDocumentFileLocation).id;
  }
}

export default function onStreamFetch(event: FetchEvent, params: string) {
  const range = parseRange(event.request.headers.get('Range'));
  const info: DownloadOptions = JSON.parse(decodeURIComponent(params));
  const stream = Stream.get(info);

  //log.debug('[stream]', url, offset, end);

  event.respondWith(Promise.race([
    timeout(45 * 1000),
    stream.requestRange(range)
  ]));
}

function responseForSafariFirstRange(range: StreamRange, mimeType: string, size: number): Response {
  if(range[0] === 0 && range[1] === 1) {
    return new Response(new Uint8Array(2).buffer, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes 0-1/${size || '*'}`,
        'Content-Length': '2',
        'Content-Type': mimeType || 'video/mp4',
      },
    });
  }

  return null;
}

/* const STREAM_CHUNK_UPPER_LIMIT = 256 * 1024;
const SMALLEST_CHUNK_LIMIT = 256 * 4; */
/* const STREAM_CHUNK_UPPER_LIMIT = 1024 * 1024;
const SMALLEST_CHUNK_LIMIT = 1024 * 4; */
const STREAM_CHUNK_MIDDLE_LIMIT = 512 * 1024;
const STREAM_CHUNK_UPPER_LIMIT = 1024 * 1024;
const SMALLEST_CHUNK_LIMIT = 512 * 4;

function parseRange(header: string): StreamRange {
  if(!header) return [0, 0];
  const [, chunks] = header.split('=');
  const ranges = chunks.split(', ');
  const [offset, end] = ranges[0].split('-');

  return [+offset, +end || 0];
}

function alignOffset(offset: number, base = SMALLEST_CHUNK_LIMIT) {
  return offset - (offset % base);
}

function alignLimit(limit: number) {
  return 2 ** Math.ceil(Math.log(limit) / Math.log(2));
}
