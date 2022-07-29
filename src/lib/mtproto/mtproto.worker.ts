/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// just to include
import '../polyfill';
import '../../helpers/peerIdPolyfill';

<<<<<<< HEAD
import type { LocalStorageProxyTask } from '../localStorage';
import type { WebpConvertTask } from '../webp/webpWorkerController';
import type { ToggleStorageTask } from './mtprotoworker';
import type { RefreshReferenceTaskResponse } from './apiFileManager';
import apiManager from "./apiManager";
import cryptoWorker from "../crypto/cryptoworker";
import networkerFactory from "./networkerFactory";
import apiFileManager from './apiFileManager';
import { notifyAll } from '../../helpers/context';
import CacheStorageController from '../cacheStorage';
import sessionStorage from '../sessionStorage';
import { socketsProxied } from './transports/socketProxied';
import ctx from '../../environment/ctx';
import bytesToHex from '../../helpers/bytes/bytesToHex';
=======
import cryptoWorker from "../crypto/cryptoMessagePort";
import { setEnvironment } from '../../environment/utils';
import appStateManager from '../appManagers/appStateManager';
import transportController from './transports/controller';
import MTProtoMessagePort from './mtprotoMessagePort';
import RESET_STORAGES_PROMISE from '../appManagers/utils/storages/resetStoragesPromise';
import appManagersManager from '../appManagers/appManagersManager';
import listenMessagePort from '../../helpers/listenMessagePort';
import { logger } from '../logger';
import { State } from '../../config/state';
import toggleStorages from '../../helpers/toggleStorages';
import appTabsManager from '../appManagers/appTabsManager';

let _isServiceWorkerOnline = true;
export function isServiceWorkerOnline() {
  return _isServiceWorkerOnline;
}
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

const log = logger('MTPROTO');
// let haveState = false;

<<<<<<< HEAD
networkerFactory.setUpdatesProcessor((obj) => {
  notifyAll({update: obj});
});

networkerFactory.onConnectionStatusChange = (status) => {
  notifyAll({type: 'connectionStatusChange', payload: status});
};

const taskListeners = {
  convertWebp: (task: WebpConvertTask) => {
    const {fileName, bytes} = task.payload;
    const deferred = apiFileManager.webpConvertPromises[fileName];
    if(deferred) {
      deferred.resolve(bytes);
      delete apiFileManager.webpConvertPromises[fileName];
    }
  },

  webpSupport: (task: any) => {
    webpSupported = task.payload;
  },

  socketProxy: (task: any) => {
    const socketTask = task.payload;
    const id = socketTask.id;
    
    const socketProxied = socketsProxied.get(id);
    if(socketTask.type === 'message') {
      socketProxied.dispatchEvent('message', socketTask.payload);
    } else if(socketTask.type === 'open') {
      socketProxied.dispatchEvent('open');
    } else if(socketTask.type === 'close') {
      socketProxied.dispatchEvent('close');
      socketsProxied.delete(id);
    }
  },

  localStorageProxy: (task: LocalStorageProxyTask) => {
    sessionStorage.finishTask(task.id, task.payload);
  },

  userAgent: (task: any) => {
    networkerFactory.userAgent = task.payload;
  },

  online: () => {
    networkerFactory.forceReconnectTimeout();
  },

  forceReconnect: () => {
    networkerFactory.forceReconnect();
  },

  toggleStorage: (task: ToggleStorageTask) => {
    const enabled = task.payload;
    // AppStorage.toggleStorage(enabled);
    CacheStorageController.toggleStorage(enabled);
  },

  refreshReference: (task: RefreshReferenceTaskResponse) => {
    const hex = bytesToHex(task.originalPayload);
    const r = apiFileManager.refreshReferencePromises[hex];
    const deferred = r?.deferred;
    if(deferred) {
      if(task.error) {
        deferred.reject(task.error);
      } else {
        deferred.resolve(task.payload);
      }
    }
  },

  crypto: (task: any) => {
    cryptoWorker.invokeCrypto(task.task, ...task.args as any).then(result => {
      notifyAll({taskId: task.taskId, result});
    });
  }
};

const onMessage = async(e: any) => {
  try {
    const task: {
      task: string,
      taskId: number,
      args: any[],
      type?: string
    } = e.data;
    const taskId = task.taskId;

    // @ts-ignore
    const f = taskListeners[task.type];
    if(f) {
      f(task);
      return;
    }

    if(!task.task) {
      return;
    }

    switch(task.task) {
      case 'requestFilePart':
      case 'setQueueId':
      case 'cancelDownload':
      case 'uploadFile':
      case 'downloadFile': {
        try {
          // @ts-ignore
          let result: any = apiFileManager[task.task].apply(apiFileManager, task.args);
  
          if(result instanceof Promise) {
            /* (result as ReturnType<ApiFileManager['downloadFile']>).notify = (progress: {done: number, total: number, offset: number}) => {
              notify({progress: {fileName, ...progress}});
            }; */
            result = await result;
          }
  
          notifyAll({taskId, result});
        } catch(error) {
          notifyAll({taskId, error});
        }

        break;
      }

      case 'getNetworker': {
        // @ts-ignore
        apiManager[task.task].apply(apiManager, task.args).finally(() => {
          notifyAll({taskId, result: null});
        });
        
        break;
      }

      case 'setLanguage':
      case 'startAll':
      case 'stopAll': {
        // @ts-ignore
        networkerFactory[task.task].apply(networkerFactory, task.args);
        break;
      }
  
      default: {
        try {
          // @ts-ignore
          let result = apiManager[task.task].apply(apiManager, task.args);
  
          if(result instanceof Promise) {
            result = await result;
          }

          //console.log(notifyAll);
  
          notifyAll({taskId, result});
        } catch(error) {
          notifyAll({taskId, error});
        }
  
        //throw new Error('Unknown task: ' + task.task);
        break;
      }
    }
  } catch(err) {
    console.error('worker task error:', err);
  }
};

//console.log('[WORKER] Will send ready', Date.now() / 1000);
ctx.addEventListener('message', onMessage);
notifyAll('ready');
=======
const port = new MTProtoMessagePort<false>();
port.addMultipleEventsListeners({
  environment: (environment) => {
    setEnvironment(environment);
    
    transportController.waitForWebSocket();
  },

  crypto: ({method, args}) => {
    return cryptoWorker.invokeCrypto(method as any, ...args as any);
  },

  state: ({state, resetStorages, pushedKeys, newVersion, oldVersion, userId}) => {
    // if(haveState) {
    //   return;
    // }

    log('got state', state, pushedKeys);

    appStateManager.userId = userId;
    appStateManager.newVersion = newVersion;
    appStateManager.oldVersion = oldVersion;
    
    (Object.keys(state) as any as (keyof State)[]).forEach((key) => {
      appStateManager.pushToState(key, state[key], true, !pushedKeys.includes(key));
    });

    RESET_STORAGES_PROMISE.resolve(resetStorages);
    // haveState = true;
  },

  toggleStorages: ({enabled, clearWrite}) => {
    return toggleStorages(enabled, clearWrite);
  },

  event: (payload, source) => {
    log('will redirect event', payload, source);
    port.invokeExceptSource('event', payload, source);
  },

  serviceWorkerOnline: (online) => {
    _isServiceWorkerOnline = online;
  },

  createObjectURL: (blob) => {
    return URL.createObjectURL(blob);
  },

  // socketProxy: (task) => {
  //   const socketTask = task.payload;
  //   const id = socketTask.id;
    
  //   const socketProxied = socketsProxied.get(id);
  //   if(socketTask.type === 'message') {
  //     socketProxied.dispatchEvent('message', socketTask.payload);
  //   } else if(socketTask.type === 'open') {
  //     socketProxied.dispatchEvent('open');
  //   } else if(socketTask.type === 'close') {
  //     socketProxied.dispatchEvent('close');
  //     socketsProxied.delete(id);
  //   }
  // },
});

log('MTProto start');

appManagersManager.start();
appManagersManager.getManagers();
appTabsManager.start();

listenMessagePort(port, (source) => {
  appTabsManager.addTab(source);
}, (source) => {
  appTabsManager.deleteTab(source);
});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
