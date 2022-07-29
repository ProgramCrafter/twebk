/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import AvatarListLoader from "../helpers/avatarListLoader";
import { Photo } from "../layer";
<<<<<<< HEAD
import appImManager from "../lib/appManagers/appImManager";
import appPhotosManager from "../lib/appManagers/appPhotosManager";
=======
import appDownloadManager from "../lib/appManagers/appDownloadManager";
import appImManager from "../lib/appManagers/appImManager";
import rootScope from "../lib/rootScope";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import AppMediaViewerBase from "./appMediaViewerBase";

type AppMediaViewerAvatarTargetType = {element: HTMLElement, photoId: Photo.photo['id']};
export default class AppMediaViewerAvatar extends AppMediaViewerBase<'', 'delete', AppMediaViewerAvatarTargetType> {
  public peerId: PeerId;

  constructor(peerId: PeerId) {
<<<<<<< HEAD
    super(new AvatarListLoader({peerId}), [/* 'delete' */]);
=======
    super(new AvatarListLoader({peerId, managers: rootScope.managers}), [/* 'delete' */]);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    this.peerId = peerId;

    this.setBtnMenuToggle([{
      icon: 'download',
      text: 'MediaViewer.Context.Download',
      onClick: this.onDownloadClick
    }/* , {
      icon: 'delete danger btn-disabled',
      text: 'Delete',
      onClick: () => {}
    } */]);

    // * constructing html end
    
    this.setListeners();
  }

  onPrevClick = (target: AppMediaViewerAvatarTargetType) => {
    this.openMedia(target.photoId, target.element, -1);
  };

  onNextClick = (target: AppMediaViewerAvatarTargetType) => {
    this.openMedia(target.photoId, target.element, 1);
  };

<<<<<<< HEAD
  onDownloadClick = () => {
    appPhotosManager.savePhotoFile(appPhotosManager.getPhoto(this.target.photoId), appImManager.chat.bubbles.lazyLoadQueue.queueId);
=======
  onDownloadClick = async() => {
    appDownloadManager.downloadToDisc({
      media: await this.managers.appPhotosManager.getPhoto(this.target.photoId), 
      queueId: appImManager.chat.bubbles.lazyLoadQueue.queueId
    });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  };

  public async openMedia(photoId: Photo.photo['id'], target?: HTMLElement, fromRight = 0, prevTargets?: AppMediaViewerAvatarTargetType[], nextTargets?: AppMediaViewerAvatarTargetType[]) {
    if(this.setMoverPromise) return this.setMoverPromise;

<<<<<<< HEAD
    const photo = appPhotosManager.getPhoto(photoId);
=======
    const photo = await this.managers.appPhotosManager.getPhoto(photoId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const ret = super._openMedia(photo, photo.date, this.peerId, fromRight, target, false, prevTargets, nextTargets);
    this.target.photoId = photo.id;

    return ret;
  }
}
