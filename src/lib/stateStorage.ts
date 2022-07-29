/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import type { ChatSavedPosition } from './appManagers/appImManager';
<<<<<<< HEAD
import type { State } from './appManagers/appStateManager';
import type { AppDraftsManager } from './appManagers/appDraftsManager';
=======
import type { AppDraftsManager } from './appManagers/appDraftsManager';
import type { State } from '../config/state';
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { MOUNT_CLASS_TO } from '../config/debug';
import { LangPackDifference } from '../layer';
import AppStorage from './storage';
import DATABASE_STATE from '../config/databases/state';

<<<<<<< HEAD
const stateStorage = new AppStorage<{
=======
class StateStorage extends AppStorage<{
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  chatPositions: {
    [peerId_threadId: string]: ChatSavedPosition
  },
  langPack: LangPackDifference,
  drafts: AppDraftsManager['drafts'],
  user_auth: any, // support old webk format
<<<<<<< HEAD
} & State, typeof DATABASE_STATE>(DATABASE_STATE, 'session');
=======
} & State, typeof DATABASE_STATE> {
  constructor() {
    super(DATABASE_STATE, 'session');
  }
}

const stateStorage = new StateStorage();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
MOUNT_CLASS_TO.stateStorage = stateStorage;
export default stateStorage;
