/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { State } from "../lib/appManagers/appStateManager";
=======
import type { State } from "../config/state";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../lib/rootScope";

export type ChatAutoDownloadSettings = {
  photo: number,
  video: number,
  file: number
};

<<<<<<< HEAD
export default function getAutoDownloadSettingsByPeerId(peerId: PeerId): ChatAutoDownloadSettings {
=======
export default async function getAutoDownloadSettingsByPeerId(peerId: PeerId): Promise<ChatAutoDownloadSettings> {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  let type: keyof State['settings']['autoDownload'];

  let photoSizeMax = 0, videoSizeMax = 0, fileSizeMax = 0;
  const settings = rootScope.settings;
<<<<<<< HEAD
  if(!settings.autoDownloadNew.pFlags.disabled && peerId) {
    if(peerId.isUser()) {
      if(peerId.isContact()) {
=======
  const appPeersManager = rootScope.managers.appPeersManager;
  if(!settings.autoDownloadNew.pFlags.disabled && peerId) {
    if(peerId.isUser()) {
      if(await appPeersManager.isContact(peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        type = 'contacts';
      } else {
        type = 'private';
      }
<<<<<<< HEAD
    } else if(peerId.isBroadcast()) {
=======
    } else if(await appPeersManager.isBroadcast(peerId)) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      type = 'channels';
    } else {
      type = 'groups';
    }
    
    if(settings.autoDownload.photo[type]) photoSizeMax = settings.autoDownloadNew.photo_size_max;
    if(settings.autoDownload.video[type]) videoSizeMax = settings.autoDownloadNew.video_size_max;
    if(settings.autoDownload.file[type]) fileSizeMax = settings.autoDownloadNew.file_size_max;
  }

  return {
    photo: photoSizeMax,
    video: videoSizeMax,
    file: fileSizeMax
  };
}
