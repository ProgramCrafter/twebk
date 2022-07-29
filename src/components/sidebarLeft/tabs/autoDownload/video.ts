/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SliderSuperTabEventable } from "../../../sliderTab";
import { autoDownloadPeerTypeSection } from "./photo";

export default class AppAutoDownloadVideoTab extends SliderSuperTabEventable {
  protected init() {
    this.header.classList.add('with-border');
    this.setTitle('AutoDownloadVideos');

<<<<<<< HEAD
    const section = autoDownloadPeerTypeSection('video', 'AutoDownloadVideosTitle');
=======
    const section = autoDownloadPeerTypeSection('video', 'AutoDownloadVideosTitle', this.listenerSetter);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.scrollable.append(section.container);
  }
}
