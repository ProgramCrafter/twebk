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
import { MOUNT_CLASS_TO } from "../../config/debug";
import { nextRandomUint } from "../../helpers/random";
import { logger } from "../logger";
import rootScope from "../rootScope";
import sessionStorage from "../sessionStorage";
import apiManager from "./mtprotoworker";
=======
import App from "../../config/app";
import { MOUNT_CLASS_TO } from "../../config/debug";
import tabId from "../../config/tabId";
import IS_SHARED_WORKER_SUPPORTED from "../../environment/sharedWorkerSupport";
import EventListenerBase from "../../helpers/eventListenerBase";
import idleController from "../../helpers/idleController";
import { logger } from "../logger";
import rootScope from "../rootScope";
import sessionStorage from "../sessionStorage";
import apiManagerProxy from "./mtprotoworker";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export type AppInstance = {
  id: number,
  idle: boolean,
  time: number
};

<<<<<<< HEAD
const CHECK_INSTANCE_INTERVAL = 5000; 
const DEACTIVATE_TIMEOUT = 30000;
const MULTIPLE_TABS_THRESHOLD = 20000;

export class SingleInstance {
  private instanceID: number;
  private started: boolean;
  private masterInstance: boolean;
  private deactivateTimeout: number;
  private deactivated: boolean;
  private initial: boolean;
  private log = logger('INSTANCE');

  public start() {
    if(!this.started/*  && !Config.Navigator.mobile && !Config.Modes.packed */) {
      this.started = true;

      this.reset();
      //IdleManager.start();

      rootScope.addEventListener('idle', this.checkInstance);
=======
export type InstanceDeactivateReason = 'version' | 'tabs';

const CHECK_INSTANCE_INTERVAL = 5000; 
const DEACTIVATE_TIMEOUT = 30000;
const MULTIPLE_TABS_THRESHOLD = 20000;
const IS_MULTIPLE_TABS_SUPPORTED = IS_SHARED_WORKER_SUPPORTED;

export class SingleInstance extends EventListenerBase<{
  activated: () =>  void,
  deactivated: (reason: InstanceDeactivateReason) => void
}> {
  private instanceId: number;
  private started: boolean;
  private masterInstance: boolean;
  private deactivateTimeout: number;
  private deactivated: InstanceDeactivateReason;
  private log = logger('INSTANCE');

  constructor() {
    super(false);

    this.log = logger('INSTANCE');
    this.instanceId = tabId;
  }

  public get deactivatedReason() {
    return this.deactivated;
  }

  public start() {
    this.reset();

    if(!this.started/*  && !Config.Navigator.mobile && !Config.Modes.packed */) {
      this.started = true;

      idleController.addEventListener('change', this.checkInstance);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      setInterval(this.checkInstance, CHECK_INSTANCE_INTERVAL);
      this.checkInstance();

      try {
        document.documentElement.addEventListener('beforeunload', this.clearInstance);
      } catch(e) {}
    }
  }

<<<<<<< HEAD
  public reset() {
    this.instanceID = nextRandomUint(32);
    this.masterInstance = false;
    if(this.deactivateTimeout) clearTimeout(this.deactivateTimeout);
    this.deactivateTimeout = 0;
    this.deactivated = false;
    this.initial = false;
  }

  public clearInstance = () => {
=======
  private reset() {
    this.masterInstance = false;
    this.clearDeactivateTimeout();
    this.deactivated = undefined;
  }

  private clearInstance = () => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(this.masterInstance && !this.deactivated) {
      this.log.warn('clear master instance');
      sessionStorage.delete('xt_instance');
    }
  };

  public activateInstance() {
    if(this.deactivated) {
      this.reset();
      this.checkInstance(false);
<<<<<<< HEAD
      rootScope.dispatchEvent('instance_activated');
    }
  }

  public deactivateInstance = () => {
    if(this.masterInstance || this.deactivated) {
      return false;
    }

    this.log('deactivate');
    this.deactivateTimeout = 0;
    this.deactivated = true;
    this.clearInstance();
    //$modalStack.dismissAll();

    //document.title = _('inactive_tab_title_raw')

    rootScope.idle.deactivated = true;
    rootScope.dispatchEvent('instance_deactivated');
  };

  public checkInstance = (idle = rootScope.idle && rootScope.idle.isIDLE) => {
    if(this.deactivated) {
      return false;
=======
      this.dispatchEvent('activated');
    }
  }

  private deactivateInstance(reason: InstanceDeactivateReason) {
    if(this.masterInstance || this.deactivated) {
      return;
    }

    this.log.warn('deactivate', reason);
    this.clearDeactivateTimeout();
    this.deactivated = reason;

    this.dispatchEvent('deactivated', reason);
  }

  private clearDeactivateTimeout() {
    if(this.deactivateTimeout) {
      clearTimeout(this.deactivateTimeout);
      this.deactivateTimeout = 0;
    }
  }

  private checkInstance = async(idle = idleController.isIdle) => {
    if(this.deactivated) {
      return;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    }
    
    const time = Date.now();
    const newInstance: AppInstance = {
<<<<<<< HEAD
      id: this.instanceID, 
=======
      id: this.instanceId, 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      idle, 
      time
    };

<<<<<<< HEAD
    sessionStorage.get('xt_instance', false).then((curInstance: AppInstance) => {
      // this.log('check instance', newInstance, curInstance)
      if(!idle ||
          !curInstance ||
          curInstance.id === this.instanceID ||
          curInstance.time < (time - MULTIPLE_TABS_THRESHOLD)) {
        sessionStorage.set({xt_instance: newInstance});

        if(!this.masterInstance) {
          apiManager.startAll();
          if(!this.initial) {
            this.initial = true;
          } else {
            this.log.warn('now master instance', newInstance);
          }

          this.masterInstance = true;
        }

        if(this.deactivateTimeout) {
          clearTimeout(this.deactivateTimeout);
          this.deactivateTimeout = 0;
        }
      } else {
        if(this.masterInstance) {
          apiManager.stopAll();
          this.log.warn('now idle instance', newInstance);
          if(!this.deactivateTimeout) {
            this.deactivateTimeout = window.setTimeout(this.deactivateInstance, DEACTIVATE_TIMEOUT);
          }

          this.masterInstance = false;
        }
      }
    });
=======
    const [curInstance, build = App.build] = await Promise.all([
      sessionStorage.get('xt_instance', false),
      sessionStorage.get('k_build', false)
    ]);

    if(build > App.build) {
      this.masterInstance = false;
      rootScope.managers.networkerFactory.stopAll();
      this.deactivateInstance('version');
      apiManagerProxy.toggleStorages(false, false);
      return;
    } else if(IS_MULTIPLE_TABS_SUPPORTED) {
      sessionStorage.set({xt_instance: newInstance});
      return;
    }
    
    // this.log('check instance', newInstance, curInstance)
    if(!idle ||
        !curInstance ||
        curInstance.id === this.instanceId ||
        curInstance.time < (time - MULTIPLE_TABS_THRESHOLD)) {
      sessionStorage.set({xt_instance: newInstance});

      if(!this.masterInstance) {
        this.masterInstance = true;
        rootScope.managers.networkerFactory.startAll();
        this.log.warn('now master instance', newInstance);
      }

      this.clearDeactivateTimeout();
    } else if(this.masterInstance) {
      this.masterInstance = false;
      rootScope.managers.networkerFactory.stopAll();
      this.log.warn('now idle instance', newInstance);
      this.deactivateTimeout ||= window.setTimeout(() => this.deactivateInstance('tabs'), DEACTIVATE_TIMEOUT);
    }
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };
}

const singleInstance = new SingleInstance();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.singleInstance = singleInstance);
export default singleInstance;
