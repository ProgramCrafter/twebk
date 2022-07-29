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

import MTTransport, { MTConnectionConstructable } from './transports/transport';
import Modes from '../../config/modes';
import App from '../../config/app';
import indexOfAndSplice from '../../helpers/array/indexOfAndSplice';
<<<<<<< HEAD
import { MOUNT_CLASS_TO } from '../../config/debug';
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

/// #if MTPROTO_HAS_HTTP
import HTTP from './transports/http';
/// #endif

/// #if MTPROTO_HAS_WS
import Socket from './transports/websocket';
import TcpObfuscated from './transports/tcpObfuscated';
<<<<<<< HEAD
import { IS_SAFARI } from '../../environment/userAgent';
import { IS_WEB_WORKER } from '../../helpers/context';
import SocketProxied from './transports/socketProxied';
import { DcId } from '../../types';
=======
import { IS_WEB_WORKER } from '../../helpers/context';
import { DcId } from '../../types';
import { getEnvironment } from '../../environment/utils';

/// #if !MTPROTO_SW && SAFARI_PROXY_WEBSOCKET
import SocketProxied from './transports/socketProxied';
/// #endif

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
/// #endif

export type TransportType = 'websocket' | 'https' | 'http';
export type ConnectionType = 'client' | 'download' | 'upload';
type Servers = {
  [transportType in TransportType]: {
    [connectionType in ConnectionType]: {
      [dcId: DcId]: MTTransport[]
    }
  }
};

const TEST_SUFFIX = Modes.test ? '_test' : '';
<<<<<<< HEAD
=======
const PREMIUM_SUFFIX = '_premium';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export class DcConfigurator {
  private sslSubdomains = ['pluto', 'venus', 'aurora', 'vesta', 'flora'];

  private dcOptions = Modes.test
    ? [
      {id: 1, host: '149.154.175.10',  port: 80},
      {id: 2, host: '149.154.167.40',  port: 80},
      {id: 3, host: '149.154.175.117', port: 80}
    ]
    : [
      {id: 1, host: '149.154.175.50',  port: 80},
      {id: 2, host: '149.154.167.50',  port: 80},
      {id: 3, host: '149.154.175.100', port: 80},
      {id: 4, host: '149.154.167.91',  port: 80},
      {id: 5, host: '149.154.171.5',   port: 80}
    ];

  public chosenServers: Servers = {} as any;

  /// #if MTPROTO_HAS_WS
<<<<<<< HEAD
  private transportSocket = (dcId: DcId, connectionType: ConnectionType, suffix: string) => {
    const path = 'apiws' + TEST_SUFFIX;
=======
  private transportSocket = (dcId: DcId, connectionType: ConnectionType, suffix: string, premium?: boolean) => {
    const path = connectionType !== 'client' ? 'apiws' + (premium ? PREMIUM_SUFFIX : '') : ('apiws' + TEST_SUFFIX);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const chosenServer = `wss://${App.suffix.toLowerCase()}ws${dcId}${suffix}.web.telegram.org/${path}`;
    const logSuffix = connectionType === 'upload' ? '-U' : connectionType === 'download' ? '-D' : '';

    const retryTimeout = connectionType === 'client' ? 10000 : 10000;

<<<<<<< HEAD
    const oooohLetMeLive: MTConnectionConstructable = (IS_SAFARI && IS_WEB_WORKER && typeof(SocketProxied) !== 'undefined') /* || true */ ? SocketProxied : Socket;
=======
    let oooohLetMeLive: MTConnectionConstructable;
    /// #if MTPROTO_SW || !SAFARI_PROXY_WEBSOCKET
    oooohLetMeLive = Socket;
    /// #else
    oooohLetMeLive = (getEnvironment().IS_SAFARI && IS_WEB_WORKER && typeof(SocketProxied) !== 'undefined') /* || true */ ? SocketProxied : Socket;
    /// #endif
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    return new TcpObfuscated(oooohLetMeLive, dcId, chosenServer, logSuffix, retryTimeout);
  };
  /// #endif

  /// #if MTPROTO_HAS_HTTP
<<<<<<< HEAD
  private transportHTTP = (dcId: DcId, connectionType: ConnectionType, suffix: string) => {
=======
  private transportHTTP = (dcId: DcId, connectionType: ConnectionType, suffix: string, premium?: boolean) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    let chosenServer: string;
    if(Modes.ssl || !Modes.http) {
      const subdomain = this.sslSubdomains[dcId - 1] + (connectionType !== 'client' ? '-1' : '');
      const path = Modes.test ? 'apiw_test1' : 'apiw1';
      chosenServer = 'https://' + subdomain + '.web.telegram.org/' + path;
    } else {
      for(let dcOption of this.dcOptions) {
        if(dcOption.id === dcId) {
          chosenServer = 'http://' + dcOption.host + (dcOption.port !== 80 ? ':' + dcOption.port : '') + '/apiw1';
          break;
        }
      }
    }

    const logSuffix = connectionType === 'upload' ? '-U' : connectionType === 'download' ? '-D' : '';
    return new HTTP(dcId, chosenServer, logSuffix);
  };
  /// #endif

  public chooseServer(
    dcId: DcId, 
    connectionType: ConnectionType = 'client', 
    transportType: TransportType = Modes.transport, 
<<<<<<< HEAD
    reuse = true
=======
    reuse = true,
    premium?: boolean
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  ) {
    /* if(transportType === 'websocket' && !Modes.multipleConnections) {
      connectionType = 'client';
    } */

    if(!this.chosenServers.hasOwnProperty(transportType)) {
      this.chosenServers[transportType] = {
        client: {},
        download: {},
        upload: {}
      };
    }

    const servers = this.chosenServers[transportType][connectionType];

    if(!(dcId in servers)) {
      servers[dcId] = [];
    }

    const transports = servers[dcId];

    if(!transports.length || !reuse/*  || (upload && transports.length < 1) */) {
      let transport: MTTransport;

      const suffix = connectionType === 'client' ? '' : '-1';

      /// #if MTPROTO_HAS_WS && MTPROTO_HAS_HTTP
<<<<<<< HEAD
      transport = (transportType === 'websocket' ? this.transportSocket : this.transportHTTP)(dcId, connectionType, suffix);
      /// #elif !MTPROTO_HTTP
      transport = this.transportSocket(dcId, connectionType, suffix);
      /// #else
      transport = this.transportHTTP(dcId, connectionType, suffix);
=======
      transport = (transportType === 'websocket' ? this.transportSocket : this.transportHTTP)(dcId, connectionType, suffix, premium);
      /// #elif !MTPROTO_HTTP
      transport = this.transportSocket(dcId, connectionType, suffix, premium);
      /// #else
      transport = this.transportHTTP(dcId, connectionType, suffix, premium);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      /// #endif
  
      if(!transport) {
        console.error('No chosenServer!', dcId);
        return null;
      }
      
      if(reuse) {
        transports.push(transport);
      }
      
      return transport;
    }
  
    return transports[0];
  }
  
  public static removeTransport<T>(obj: any, transport: T) {
    for(const transportType in obj) {
      // @ts-ignore
      for(const connectionType in obj[transportType]) {
        // @ts-ignore
        for(const dcId in obj[transportType][connectionType]) {
          // @ts-ignore
          const transports: T[] = obj[transportType][connectionType][dcId];
          indexOfAndSplice(transports, transport);
        }
      }
    }
  }
}
<<<<<<< HEAD

const dcConfigurator = new DcConfigurator();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.dcConfigurator = dcConfigurator);
export default dcConfigurator;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
