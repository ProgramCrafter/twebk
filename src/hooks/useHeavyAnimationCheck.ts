/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

// * Jolly Cobra's useHeavyAnimationCheck.ts, patched

import { AnyToVoidFunction } from '../types';
import ListenerSetter from '../helpers/listenerSetter';
import deferredPromise, { CancellablePromise } from '../helpers/cancellablePromise';
<<<<<<< HEAD
import rootScope from '../lib/rootScope';
import DEBUG from '../config/debug';
import pause from '../helpers/schedulers/pause';

const ANIMATION_START_EVENT = 'event-heavy-animation-start';
const ANIMATION_END_EVENT = 'event-heavy-animation-end';
=======
import DEBUG from '../config/debug';
import pause from '../helpers/schedulers/pause';
import EventListenerBase from '../helpers/eventListenerBase';

const eventListener = new EventListenerBase<{
  start: () => void,
  end: () => void
}>();
const ANIMATION_START_EVENT = 'start';
const ANIMATION_END_EVENT = 'end';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

let isAnimating = false;
let heavyAnimationPromise: CancellablePromise<void> = deferredPromise<void>();
let promisesInQueue = 0;

heavyAnimationPromise.resolve();

const log = console.log.bind(console.log, '[HEAVY-ANIMATION]:');

export function dispatchHeavyAnimationEvent(promise: Promise<any>, timeout?: number) {
  if(!isAnimating) {
    heavyAnimationPromise = deferredPromise<void>();
<<<<<<< HEAD
    rootScope.dispatchEvent(ANIMATION_START_EVENT);
=======
    eventListener.dispatchEvent(ANIMATION_START_EVENT);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    isAnimating = true;
    DEBUG && log('start');
  }
  
  ++promisesInQueue;
  DEBUG && log('attach promise, length:', promisesInQueue, timeout);

  const promises = [
    timeout !== undefined ? pause(timeout) : undefined,
    promise.finally(() => {})
  ].filter(Boolean);

  const perf = performance.now();
  const _heavyAnimationPromise = heavyAnimationPromise;
  Promise.race(promises).then(() => {
    if(heavyAnimationPromise !== _heavyAnimationPromise || heavyAnimationPromise.isFulfilled) { // interrupted
      return;
    }

    --promisesInQueue;
    DEBUG && log('promise end, length:', promisesInQueue, performance.now() - perf);
    if(promisesInQueue <= 0) {
      onHeavyAnimationEnd();
    }
  });

  return heavyAnimationPromise;
}

function onHeavyAnimationEnd() {
  if(heavyAnimationPromise.isFulfilled) {
    return;
  }

  isAnimating = false;
  promisesInQueue = 0;
<<<<<<< HEAD
  rootScope.dispatchEvent(ANIMATION_END_EVENT);
=======
  eventListener.dispatchEvent(ANIMATION_END_EVENT);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  heavyAnimationPromise.resolve();

  DEBUG && log('end');
}

export function interruptHeavyAnimation() {
  onHeavyAnimationEnd();
}

export function getHeavyAnimationPromise() {
  return heavyAnimationPromise;
}

export default function(
  handleAnimationStart: AnyToVoidFunction,
  handleAnimationEnd: AnyToVoidFunction,
  listenerSetter?: ListenerSetter
) {
  //useEffect(() => {
    if(isAnimating) {
      handleAnimationStart();
    }

<<<<<<< HEAD
    const add = listenerSetter ? listenerSetter.add(rootScope) : rootScope.addEventListener.bind(rootScope);
    const remove = listenerSetter ? listenerSetter.removeManual.bind(listenerSetter, rootScope) : rootScope.removeEventListener.bind(rootScope);
=======
    const add = listenerSetter ? listenerSetter.add(eventListener) : eventListener.addEventListener.bind(eventListener);
    const remove = listenerSetter ? listenerSetter.removeManual.bind(listenerSetter, eventListener) : eventListener.removeEventListener.bind(eventListener);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    add(ANIMATION_START_EVENT, handleAnimationStart);
    add(ANIMATION_END_EVENT, handleAnimationEnd);

    return () => {
      remove(ANIMATION_END_EVENT, handleAnimationEnd);
      remove(ANIMATION_START_EVENT, handleAnimationStart);
    };
  //}, [handleAnimationEnd, handleAnimationStart]);
}
