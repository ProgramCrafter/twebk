/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { Photo } from "../layer";
<<<<<<< HEAD
import appPhotosManager from "../lib/appManagers/appPhotosManager";
=======
import { AppManagers } from "../lib/appManagers/managers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import ListLoader, { ListLoaderOptions } from "./listLoader";

export default class AvatarListLoader<Item extends {photoId: Photo.photo['id']}> extends ListLoader<Item, any> {
  private peerId: PeerId;
<<<<<<< HEAD

  constructor(options: Omit<ListLoaderOptions<Item, any>, 'loadMore'> & {peerId: PeerId}) {
=======
  private managers: AppManagers;

  constructor(options: Omit<ListLoaderOptions<Item, any>, 'loadMore'> & {peerId: PeerId, managers: AppManagers}) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    super({
      ...options,
      loadMore: (anchor, older, loadCount) => {
        if(this.peerId.isAnyChat() || !older) return Promise.resolve({count: 0, items: []}); // ! это значит, что открыло аватар чата, но следующих фотографий нет.

        const maxId = anchor?.photoId;
<<<<<<< HEAD
        return appPhotosManager.getUserPhotos(this.peerId, maxId, loadCount).then(value => {
          const items = value.photos.map(photoId => {
=======
        return this.managers.appPhotosManager.getUserPhotos(this.peerId, maxId, loadCount).then((value) => {
          const items = value.photos.map((photoId) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
            return {element: null as HTMLElement, photoId} as any;
          });

          return {count: value.count, items};
        });
      }
    });

    this.loadedAllUp = true;
    this.peerId = options.peerId;
  }
}
