/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

export default function setWorkerProxy() {
  // * hook worker constructor to set search parameters (test, debug, etc)
  const workerHandler = {
    construct(target: any, args: any) {
      //console.log(target, args);
      const url = args[0] + location.search;

      return new target(url);
    }
  };

<<<<<<< HEAD
  const workerProxy = new Proxy(Worker, workerHandler);
  Worker = workerProxy;
=======
  [
    Worker, 
    typeof(SharedWorker) !== 'undefined' && SharedWorker
  ].forEach((w) => {
    if(!w) return;
    window[w.name as any] = new Proxy(w, workerHandler);
  });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}

setWorkerProxy();
