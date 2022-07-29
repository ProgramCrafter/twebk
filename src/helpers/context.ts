/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// в SW может быть сразу две переменных TRUE
export const IS_SERVICE_WORKER = typeof ServiceWorkerGlobalScope !== 'undefined' && self instanceof ServiceWorkerGlobalScope;
export const IS_WEB_WORKER = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && !IS_SERVICE_WORKER;
export const IS_WORKER = IS_WEB_WORKER || IS_SERVICE_WORKER;

export const getWindowClients = () => {
  return (self as any as ServiceWorkerGlobalScope)
  .clients
<<<<<<< HEAD
  .matchAll({ includeUncontrolled: false, type: 'window' });
};

const notifyServiceWorker = (all: boolean, ...args: any[]) => {
  (self as any as ServiceWorkerGlobalScope)
  .clients
  .matchAll({ includeUncontrolled: false, type: 'window' })
  .then((listeners) => {
=======
  .matchAll({includeUncontrolled: false, type: 'window'});
};

const postMessage = (listener: WindowClient | DedicatedWorkerGlobalScope, ...args: any[]) => {
  try {
    // @ts-ignore
    listener.postMessage(...args);
  } catch(err) {
    console.error('[worker] postMessage error:', err, args);
  }
};

const notifyServiceWorker = (all: boolean, ...args: any[]) => {
  getWindowClients().then((listeners) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(!listeners.length) {
      //console.trace('no listeners?', self, listeners);
      return;
    }

<<<<<<< HEAD
    listeners.slice(all ? 0 : -1).forEach(listener => {
      // @ts-ignore
      listener.postMessage(...args);
=======
    listeners.slice(all ? 0 : -1).forEach((listener) => {
      postMessage(listener, ...args);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });
  });
};

const notifyWorker = (...args: any[]) => {
<<<<<<< HEAD
  // @ts-ignore
  (self as any as DedicatedWorkerGlobalScope).postMessage(...args);
=======
  postMessage(self as any as DedicatedWorkerGlobalScope, ...args);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
};

const noop = () => {};

export const notifySomeone = IS_SERVICE_WORKER ? notifyServiceWorker.bind(null, false) : (IS_WEB_WORKER ? notifyWorker : noop);
export const notifyAll = IS_SERVICE_WORKER ? notifyServiceWorker.bind(null, true) : (IS_WEB_WORKER ? notifyWorker : noop);
