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
import type { UserAuth } from './mtproto_config';
import sessionStorage from '../sessionStorage';
import MTPNetworker, { MTMessage } from './networker';
import networkerFactory from './networkerFactory';
//import { telegramMeWebService } from './mtproto';
import authorizer from './authorizer';
import dcConfigurator, { ConnectionType, DcConfigurator, TransportType } from './dcConfigurator';
import { logger } from '../logger';
import type { DcAuthKey, DcId, DcServerSalt, InvokeApiOptions } from '../../types';
import type { MethodDeclMap } from '../../layer';
import deferredPromise, { CancellablePromise } from '../../helpers/cancellablePromise';
//import { clamp } from '../../helpers/number';
import { IS_SAFARI } from '../../environment/userAgent';
import App from '../../config/app';
import { MOUNT_CLASS_TO } from '../../config/debug';
import IDBStorage from '../idb';
import CryptoWorker from "../crypto/cryptoworker";
import ctx from '../../environment/ctx';
import noop from '../../helpers/noop';
import Modes from '../../config/modes';
import bytesFromHex from '../../helpers/bytes/bytesFromHex';
import bytesToHex from '../../helpers/bytes/bytesToHex';
import isObject from '../../helpers/object/isObject';
import pause from '../../helpers/schedulers/pause';

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
/// #if !MTPROTO_WORKER
import rootScope from '../rootScope';
/// #endif

/// #if MTPROTO_AUTO
import transportController from './transports/controller';
import MTTransport from './transports/transport';
/// #endif

<<<<<<< HEAD
=======
import type { UserAuth } from './mtproto_config';
import sessionStorage from '../sessionStorage';
import MTPNetworker, { MTMessage } from './networker';
//import { telegramMeWebService } from './mtproto';
import { ConnectionType, DcConfigurator, TransportType } from './dcConfigurator';
import { logger } from '../logger';
import type { DcAuthKey, DcId, DcServerSalt, InvokeApiOptions } from '../../types';
import type { MethodDeclMap } from '../../layer';
import deferredPromise, { CancellablePromise } from '../../helpers/cancellablePromise';
//import { clamp } from '../../helpers/number';
import App from '../../config/app';
import { MOUNT_CLASS_TO } from '../../config/debug';
import IDBStorage, { IDB } from '../idb';
import CryptoWorker from "../crypto/cryptoMessagePort";
import ctx from '../../environment/ctx';
import noop from '../../helpers/noop';
import Modes from '../../config/modes';
import bytesFromHex from '../../helpers/bytes/bytesFromHex';
import bytesToHex from '../../helpers/bytes/bytesToHex';
import isObject from '../../helpers/object/isObject';
import pause from '../../helpers/schedulers/pause';
import ApiManagerMethods from './api_methods';
import { getEnvironment } from '../../environment/utils';
import AppStorage from '../storage';
import toggleStorages from '../../helpers/toggleStorages';

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
/* var networker = apiManager.cachedNetworkers.websocket.upload[2];
networker.wrapMtpMessage({
  _: 'msgs_state_req',
  msg_ids: ["6888292542796810828"]
}, {
  notContentRelated: true
<<<<<<< HEAD
}).then(res => {
=======
}).then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  console.log('status', res);
}); */

//console.error('apiManager included!');
// TODO: если запрос словил флуд, нужно сохранять его параметры и возвращать тот же промис на новый такой же запрос, например - загрузка истории

export type ApiError = Partial<{
  code: number,
  type: string,
  description: string,
  originalError: any,
  stack: string,
  handled: boolean,
  input: string,
  message: ApiError
}>;

/* class RotatableArray<T> {
  public array: Array<T> = [];
  private lastIndex = -1;

  public get() {
    this.lastIndex = clamp(this.lastIndex + 1, 0, this.array.length - 1);
    return this.array[this.lastIndex];
  }
} */

<<<<<<< HEAD
const FILE_NETWORKERS_COUNT = 3;

export class ApiManager {
=======
const PREMIUM_FILE_NETWORKERS_COUNT = 6;
const REGULAR_FILE_NETWORKERS_COUNT = 3;

export class ApiManager extends ApiManagerMethods {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  private cachedNetworkers: {
    [transportType in TransportType]: {
      [connectionType in ConnectionType]: {
        [dcId: DcId]: MTPNetworker[]
      }
    }
  };
  
  private cachedExportPromise: {[x: number]: Promise<unknown>};
  private gettingNetworkers: {[dcIdAndType: string]: Promise<MTPNetworker>};
  private baseDcId: DcId;
  
  //public telegramMeNotified = false;

  private log: ReturnType<typeof logger>;

  private afterMessageTempIds: {
    [tempId: string]: {
      messageId: string,
      promise: Promise<any>
    }
  };

  private transportType: TransportType;
<<<<<<< HEAD
  
  constructor() {
=======

  private updatesProcessor: (obj: any) => void;

  private loggingOut: boolean;

  constructor() {
    super();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.log = logger('API');

    this.cachedNetworkers = {} as any;
    this.cachedExportPromise = {};
    this.gettingNetworkers = {};
    this.baseDcId = 0;
    this.afterMessageTempIds = {};

    this.transportType = Modes.transport;

    /// #if MTPROTO_AUTO
    transportController.addEventListener('transport', (transportType) => {
      this.changeTransportType(transportType);
    });
    /// #endif
  }

  //private lol = false;
  
  // constructor() {
    //MtpSingleInstanceService.start();
    
    /* AppStorage.get<number>('dc').then((dcId) => {
      if(dcId) {
        this.baseDcId = dcId;
      }
    }); */
  // }
  
  /* public telegramMeNotify(newValue: boolean) {
    if(this.telegramMeNotified !== newValue) {
      this.telegramMeNotified = newValue;
      //telegramMeWebService.setAuthorized(this.telegramMeNotified);
    }
  } */

  private getTransportType(connectionType: ConnectionType) {
    /// #if MTPROTO_HTTP_UPLOAD
    // @ts-ignore
<<<<<<< HEAD
    const transportType: TransportType = connectionType === 'upload' && IS_SAFARI ? 'https' : 'websocket';
=======
    const transportType: TransportType = connectionType === 'upload' && getEnvironment().IS_SAFARI ? 'https' : 'websocket';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    //const transportType: TransportType = connectionType !== 'client' ? 'https' : 'websocket';
    /// #else
    // @ts-ignore
    const transportType: TransportType = this.transportType;
    /// #endif

    return transportType;
  }

  private iterateNetworkers(callback: (o: {networker: MTPNetworker, dcId: DcId, connectionType: ConnectionType, transportType: TransportType, index: number, array: MTPNetworker[]}) => void) {
    for(const transportType in this.cachedNetworkers) {
      const connections = this.cachedNetworkers[transportType as TransportType];
      for(const connectionType in connections) {
        const dcs = connections[connectionType as ConnectionType];
        for(const dcId in dcs) {
          const networkers = dcs[dcId as any as DcId];
          networkers.forEach((networker, idx, arr) => {
            callback({
              networker,
              dcId: +dcId as DcId,
              connectionType: connectionType as ConnectionType,
              transportType: transportType as TransportType,
              index: idx,
              array: arr
            });
          });
        }
      }
    }
  }

  private chooseServer(dcId: DcId, connectionType: ConnectionType, transportType: TransportType) {
<<<<<<< HEAD
    return dcConfigurator.chooseServer(dcId, connectionType, transportType, connectionType === 'client');
=======
    return this.dcConfigurator.chooseServer(dcId, connectionType, transportType, connectionType === 'client', this.rootScope.premium);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public changeTransportType(transportType: TransportType) {
    const oldTransportType = this.transportType;
    if(oldTransportType === transportType) {
      return;
    }

    this.log('changing transport from', oldTransportType, 'to', transportType);

    const oldObject = this.cachedNetworkers[oldTransportType];
    const newObject = this.cachedNetworkers[transportType];
    this.cachedNetworkers[transportType] = oldObject;
    this.cachedNetworkers[oldTransportType] = newObject;

    this.transportType = transportType;

    for(const oldGetKey in this.gettingNetworkers) {
      const promise = this.gettingNetworkers[oldGetKey];
      delete this.gettingNetworkers[oldGetKey];

      const newGetKey = oldGetKey.replace(oldTransportType, transportType);
      this.gettingNetworkers[newGetKey] = promise;

      this.log('changed networker getKey from', oldGetKey, 'to', newGetKey)
    }

    this.iterateNetworkers((info) => {
      const transportType = this.getTransportType(info.connectionType);
      const transport = this.chooseServer(info.dcId, info.connectionType, transportType);
      this.changeNetworkerTransport(info.networker, transport);
    });
  }

  public async getBaseDcId() {
    if(this.baseDcId) {
      return this.baseDcId;
    }

    const baseDcId = await sessionStorage.get('dc');
    if(!this.baseDcId) {
      if(!baseDcId) {
        this.setBaseDcId(App.baseDcId);
      } else {
        this.baseDcId = baseDcId;
      }
    }

    return this.baseDcId;
  }
  
<<<<<<< HEAD
  public async setUserAuth(userAuth: UserAuth) {
=======
  public async setUserAuth(userAuth: UserAuth | UserId) {
    if(typeof(userAuth) === 'string' || typeof(userAuth) === 'number') {
      userAuth = {dcID: 0, date: Date.now() / 1000 | 0, id: userAuth.toPeerId(false)};
    }

    this.rootScope.dispatchEvent('user_auth', userAuth);

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!userAuth.dcID) {
      const baseDcId = await this.getBaseDcId();
      userAuth.dcID = baseDcId;
    }

    sessionStorage.set({
      user_auth: userAuth
    });
    
    //this.telegramMeNotify(true);
<<<<<<< HEAD

    /// #if !MTPROTO_WORKER
    rootScope.dispatchEvent('user_auth', userAuth);
    /// #endif
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public setBaseDcId(dcId: DcId) {
    const wasDcId = this.baseDcId;
    if(wasDcId) { // if migrated set ondrain
<<<<<<< HEAD
      this.getNetworker(wasDcId).then(networker => {
=======
      this.getNetworker(wasDcId).then((networker) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        this.setOnDrainIfNeeded(networker);
      });
    }

    this.baseDcId = dcId;

    sessionStorage.set({
      dc: this.baseDcId
    });
  }
  
  public async logOut() {
<<<<<<< HEAD
=======
    if(this.loggingOut) {
      return;
    }

    this.loggingOut = true;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const storageKeys: Array<DcAuthKey> = [];
    
    const prefix = 'dc';
    for(let dcId = 1; dcId <= 5; dcId++) {
      storageKeys.push(prefix + dcId + '_auth_key' as any);
    }
    
    // WebPushApiManager.forceUnsubscribe(); // WARNING // moved to worker's master
<<<<<<< HEAD
    const storageResult = await Promise.all(storageKeys.map(key => sessionStorage.get(key)));
=======
    const storageResult = await Promise.all(storageKeys.map((key) => sessionStorage.get(key)));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    
    const logoutPromises: Promise<any>[] = [];
    for(let i = 0; i < storageResult.length; i++) {
      if(storageResult[i]) {
        logoutPromises.push(this.invokeApi('auth.logOut', {}, {dcId: (i + 1) as DcId, ignoreErrors: true}));
      }
    }

<<<<<<< HEAD
    const clear = () => {
      //console.error('apiManager: logOut clear');
      
      this.baseDcId = undefined;
      //this.telegramMeNotify(false);
      IDBStorage.closeDatabases();
      self.postMessage({type: 'clear'});
=======
    const clear = async() => {
      this.baseDcId = undefined;
      //this.telegramMeNotify(false);
      await toggleStorages(false, true);
      IDB.closeDatabases();
      this.rootScope.dispatchEvent('logging_out');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    setTimeout(clear, 1e3);

    //return;
    
    return Promise.all(logoutPromises).catch((error) => {
      error.handled = true;
    }).finally(clear)/* .then(() => {
      location.pathname = '/';
    }) */;
  }

  private generateNetworkerGetKey(dcId: DcId, transportType: TransportType, connectionType: ConnectionType) {
    return [dcId, transportType, connectionType].join('-');
  }
  
  public getNetworker(dcId: DcId, options: InvokeApiOptions = {}): Promise<MTPNetworker> {
    const connectionType: ConnectionType = options.fileDownload ? 'download' : (options.fileUpload ? 'upload' : 'client');
    //const connectionType: ConnectionType = 'client';

    const transportType = this.getTransportType(connectionType);
    if(!this.cachedNetworkers[transportType]) {
      this.cachedNetworkers[transportType] = {
        client: {},
        download: {},
        upload: {}
      };
    }

    const cache = this.cachedNetworkers[transportType][connectionType];
    if(!(dcId in cache)) {
      cache[dcId] = [];
    }
    
    const networkers = cache[dcId];
    // @ts-ignore
<<<<<<< HEAD
    const maxNetworkers = connectionType === 'client' || transportType === 'https' ? 1 : FILE_NETWORKERS_COUNT;
=======
    const maxNetworkers = connectionType === 'client' || transportType === 'https' ? 1 : (this.rootScope.premium ? PREMIUM_FILE_NETWORKERS_COUNT : REGULAR_FILE_NETWORKERS_COUNT);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(networkers.length >= maxNetworkers) {
      let i = networkers.length - 1, found = false;
      for(; i >= 0; --i) {
        if(networkers[i].isOnline) {
          found = true;
          break;
        }
      }
      
      const networker = found ? networkers.splice(i, 1)[0] : networkers.pop();
      networkers.unshift(networker);
      return Promise.resolve(networker);
    }
    
    let getKey = this.generateNetworkerGetKey(dcId, transportType, connectionType);
    if(this.gettingNetworkers[getKey]) {
      return this.gettingNetworkers[getKey];
    }

    const ak: DcAuthKey = `dc${dcId}_auth_key` as any;
    const ss: DcServerSalt = `dc${dcId}_server_salt` as any;
    
    let transport = this.chooseServer(dcId, connectionType, transportType);
<<<<<<< HEAD
    return this.gettingNetworkers[getKey] = Promise.all([ak, ss].map(key => sessionStorage.get(key)))
=======
    return this.gettingNetworkers[getKey] = Promise.all([ak, ss].map((key) => sessionStorage.get(key)))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    .then(async([authKeyHex, serverSaltHex]) => {
      let networker: MTPNetworker, error: any;
      if(authKeyHex && authKeyHex.length === 512) {
        if(!serverSaltHex || serverSaltHex.length !== 16) {
          serverSaltHex = 'AAAAAAAAAAAAAAAA';
        }
        
        const authKey = bytesFromHex(authKeyHex);
        const authKeyId = (await CryptoWorker.invokeCrypto('sha1', authKey)).slice(-8);
        const serverSalt = bytesFromHex(serverSaltHex);
        
<<<<<<< HEAD
        networker = networkerFactory.getNetworker(dcId, authKey, authKeyId, serverSalt, options);
      } else {
        try { // if no saved state
          const auth = await authorizer.auth(dcId);
=======
        networker = this.networkerFactory.getNetworker(dcId, authKey, authKeyId, serverSalt, options);
      } else {
        try { // if no saved state
          const auth = await this.authorizer.auth(dcId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
          sessionStorage.set({
            [ak]: bytesToHex(auth.authKey),
            [ss]: bytesToHex(auth.serverSalt)
          });
          
<<<<<<< HEAD
          networker = networkerFactory.getNetworker(dcId, auth.authKey, auth.authKeyId, auth.serverSalt, options);
=======
          networker = this.networkerFactory.getNetworker(dcId, auth.authKey, auth.authKeyId, auth.serverSalt, options);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        } catch(_error) {
          error = _error;
        }
      }

      // ! cannot get it before this promise because simultaneous changeTransport will change nothing
      const newTransportType = this.getTransportType(connectionType);
      if(newTransportType !== transportType) {
        getKey = this.generateNetworkerGetKey(dcId, newTransportType, connectionType);
        transport.destroy();
<<<<<<< HEAD
        DcConfigurator.removeTransport(dcConfigurator.chosenServers, transport);
=======
        DcConfigurator.removeTransport(this.dcConfigurator.chosenServers, transport);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        if(networker) {
          transport = this.chooseServer(dcId, connectionType, newTransportType);
        }

        this.log('transport has been changed during authorization from', transportType, 'to', newTransportType);
      }

      /* networker.onConnectionStatusChange = (online) => {
        console.log('status:', online);
      }; */
      
      delete this.gettingNetworkers[getKey];

      if(error) {
        this.log('get networker error', error, (error as Error).stack);
        throw error;
      }

      this.changeNetworkerTransport(networker, transport);
      networkers.unshift(networker);
      this.setOnDrainIfNeeded(networker);
      return networker;
    });
  }

<<<<<<< HEAD
  private changeNetworkerTransport(networker: MTPNetworker, transport?: MTTransport) {
    const oldTransport = networker.transport;
    if(oldTransport) {
      DcConfigurator.removeTransport(dcConfigurator.chosenServers, oldTransport);
=======
  public getNetworkerVoid(dcId: DcId) {
    return this.getNetworker(dcId).then(noop, noop);
  }

  private changeNetworkerTransport(networker: MTPNetworker, transport?: MTTransport) {
    const oldTransport = networker.transport;
    if(oldTransport) {
      DcConfigurator.removeTransport(this.dcConfigurator.chosenServers, oldTransport);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }

    networker.changeTransport(transport);
  }

  public setOnDrainIfNeeded(networker: MTPNetworker) {
    if(networker.onDrain) {
      return;
    }
    
    const checkPromise: Promise<boolean> = networker.isFileNetworker ? 
      Promise.resolve(true) : 
<<<<<<< HEAD
      this.getBaseDcId().then(baseDcId => networker.dcId !== baseDcId);
    checkPromise.then(canRelease => {
=======
      this.getBaseDcId().then((baseDcId) => networker.dcId !== baseDcId);
    checkPromise.then((canRelease) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(networker.onDrain) {
        return;
      }
      
      if(canRelease) {
        networker.onDrain = () => {
          this.log('networker drain', networker.dcId);

          networker.onDrain = undefined;
          this.changeNetworkerTransport(networker);
          networker.destroy();
<<<<<<< HEAD
          networkerFactory.removeNetworker(networker);
=======
          this.networkerFactory.removeNetworker(networker);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          DcConfigurator.removeTransport(this.cachedNetworkers, networker);
        };

        networker.setDrainTimeout();
      }
    });
  }
<<<<<<< HEAD
=======

  public setUpdatesProcessor(callback: (obj: any) => void) {
    this.updatesProcessor = callback;
    this.networkerFactory.setUpdatesProcessor(callback);
  }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  
  public invokeApi<T extends keyof MethodDeclMap>(method: T, params: MethodDeclMap[T]['req'] = {}, options: InvokeApiOptions = {}): CancellablePromise<MethodDeclMap[T]["res"]> {
    ///////this.log('Invoke api', method, params, options);

    /* if(!this.lol) {
      networkerFactory.updatesProcessor({_: 'new_session_created'}, true);
      this.lol = true;
    } */

    const deferred = deferredPromise<MethodDeclMap[T]['res']>();

    let {afterMessageId, prepareTempMessageId} = options;
    if(prepareTempMessageId) {
      deferred.then(() => {
        delete this.afterMessageTempIds[prepareTempMessageId];
      });
    }

    if(MOUNT_CLASS_TO) {
      const startTime = Date.now();
      const interval = ctx.setInterval(() => {
        if(!cachedNetworker || !cachedNetworker.isStopped()) {
          this.log.error('Request is still processing:', method, params, options, 'time:', (Date.now() - startTime) / 1000);
        }
        //this.cachedUploadNetworkers[2].requestMessageStatus();
      }, 5e3);

      deferred.catch(noop).finally(() => {
        clearInterval(interval);
      });
    }

    const rejectPromise = async(error: ApiError) => {
      if(!error) {
        error = {type: 'ERROR_EMPTY'};
      } else if(!isObject(error)) {
        error = {message: error};
      }

      if((error.code === 401 && error.type === 'SESSION_REVOKED') || 
        (error.code === 406 && error.type === 'AUTH_KEY_DUPLICATED')) {
        this.logOut();
      }

      if(options.ignoreErrors) {
        throw error;
      }
      
      if(error.code === 406) {
        error.handled = true;
      }
      
      if(!options.noErrorBox) {
        error.input = method;
        error.stack = stack || (error.originalError && error.originalError.stack) || error.stack || (new Error()).stack;
        setTimeout(() => {
          if(!error.handled) {
            if(error.code === 401) {
              this.logOut();
            } else {
              // ErrorService.show({error: error}); // WARNING
            }
            
            error.handled = true;
          }
        }, 100);
      }

      throw error;
    };
    
    let dcId: DcId;
    
    let cachedNetworker: MTPNetworker;
    let stack = (new Error()).stack || 'empty stack';
    const performRequest = (): Promise<any> => {
      if(afterMessageId) {
        const after = this.afterMessageTempIds[afterMessageId];
        if(after) {
          options.afterMessageId = after.messageId;
        }
      }

      const promise = cachedNetworker.wrapApiCall(method, params, options);

      if(prepareTempMessageId) {
        this.afterMessageTempIds[prepareTempMessageId] = {
          messageId: (options as MTMessage).messageId,
          promise: deferred
        };
      }

      return promise.catch((error: ApiError) => {
        //if(!options.ignoreErrors) {
        if(error.type !== 'FILE_REFERENCE_EXPIRED'/*  && error.type !== 'MSG_WAIT_FAILED' */) {
          this.log.error('Error', error.code, error.type, this.baseDcId, dcId, method, params);
        }
        
        if(error.code === 401 && this.baseDcId === dcId) {
          if(error.type !== 'SESSION_PASSWORD_NEEDED') {
            sessionStorage.delete('dc')
            sessionStorage.delete('user_auth'); // ! возможно тут вообще не нужно это делать, но нужно проверить случай с USER_DEACTIVATED (https://core.telegram.org/api/errors)
            //this.telegramMeNotify(false);
          }
          
          throw error;
        } else if(error.code === 401 && this.baseDcId && dcId !== this.baseDcId) {
          if(this.cachedExportPromise[dcId] === undefined) {
            const promise = new Promise((exportResolve, exportReject) => {
              this.invokeApi('auth.exportAuthorization', {dc_id: dcId}, {noErrorBox: true}).then((exportedAuth) => {
                this.invokeApi('auth.importAuthorization', {
                  id: exportedAuth.id,
                  bytes: exportedAuth.bytes
                }, {dcId, noErrorBox: true}).then(exportResolve, exportReject);
              }, exportReject);
            });
            
            this.cachedExportPromise[dcId] = promise;
          }
          
          return this.cachedExportPromise[dcId].then(() => performRequest());
        } else if(error.code === 303) {
          const newDcId = +error.type.match(/^(PHONE_MIGRATE_|NETWORK_MIGRATE_|USER_MIGRATE_)(\d+)/)[2] as DcId;
          if(newDcId !== dcId) {
            if(options.dcId) {
              options.dcId = newDcId;
            } else {
              this.setBaseDcId(newDcId);
            }
            
            return this.invokeApi(method, params, options);
          }
        } else if(error.code === 400 && error.type.indexOf('FILE_MIGRATE') === 0) {
          const newDcId = +error.type.match(/^(FILE_MIGRATE_)(\d+)/)[2] as DcId;
          if(newDcId !== dcId) {
            options.dcId = newDcId;
            return this.invokeApi(method, params, options);
          } else {
            throw error;
          }
        } else if(error.code === 400 && error.type === 'CONNECTION_NOT_INITED') {
<<<<<<< HEAD
          networkerFactory.unsetConnectionInited();
=======
          this.networkerFactory.unsetConnectionInited();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          return performRequest();
        } else if(!options.rawError && error.code === 420) {
          const waitTime = +error.type.match(/^FLOOD_WAIT_(\d+)/)[1] || 1;
          
          if(waitTime > (options.floodMaxTimeout !== undefined ? options.floodMaxTimeout : 60) && !options.prepareTempMessageId) {
            throw error;
          }
          
          return pause(waitTime/* (waitTime + 5) */ * 1000).then(() => performRequest());
        } else if(!options.rawError && ['MSG_WAIT_FAILED', 'MSG_WAIT_TIMEOUT'].includes(error.type)) {
          const after = this.afterMessageTempIds[afterMessageId];

          afterMessageId = undefined;
          delete options.afterMessageId;

          if(after) return after.promise.then(() => performRequest());
          else return performRequest();
        } else if(!options.rawError && error.code === 500) {
          const now = Date.now();
          if(options.stopTime) {
            if(now >= options.stopTime) {
              throw error;
            }
          }
          
          options.waitTime = options.waitTime ? Math.min(60, options.waitTime * 1.5) : 1;
          return pause(options.waitTime * 1000).then(() => performRequest());
        } else if(error.type === 'UNKNOWN') {
          return pause(1000).then(() => performRequest());
        } else {
          throw error;
        }
      });
    }
    
    let p: Promise<MTPNetworker>;
    if(dcId = (options.dcId || this.baseDcId)) {
      p = this.getNetworker(dcId, options);
    } else {
      p = this.getBaseDcId().then((baseDcId) => this.getNetworker(dcId = baseDcId, options));
    }

    p.then((networker) => {
      cachedNetworker = networker;
      const promise = performRequest();
      cachedNetworker.attachPromise(deferred, options as MTMessage);
      return promise;
    })
    .then(deferred.resolve)
    .catch(rejectPromise)
    .catch(deferred.reject);

    return deferred;
  }
}
<<<<<<< HEAD

const apiManager = new ApiManager();
MOUNT_CLASS_TO.apiManager = apiManager;
export default apiManager;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
