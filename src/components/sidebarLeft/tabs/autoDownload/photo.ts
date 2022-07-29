/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { SettingSection } from "../..";
<<<<<<< HEAD
=======
import ListenerSetter from "../../../../helpers/listenerSetter";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { LangPackKey } from "../../../../lib/langPack";
import CheckboxField from "../../../checkboxField";
import { SliderSuperTabEventable } from "../../../sliderTab";

<<<<<<< HEAD
export function autoDownloadPeerTypeSection(type: 'photo' | 'video' | 'file', title: LangPackKey) {
=======
export function autoDownloadPeerTypeSection(type: 'photo' | 'video' | 'file', title: LangPackKey, listenerSetter: ListenerSetter) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  const section = new SettingSection({name: title});

  const key = 'settings.autoDownload.' + type + '.';
  const contactsCheckboxField = new CheckboxField({
    text: 'AutodownloadContacts', 
    name: 'contacts',
    stateKey: key + 'contacts',
<<<<<<< HEAD
    withRipple: true
=======
    withRipple: true,
    listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  });
  const privateCheckboxField = new CheckboxField({
    text: 'AutodownloadPrivateChats', 
    name: 'private',
    stateKey: key + 'private',
<<<<<<< HEAD
    withRipple: true
=======
    withRipple: true,
    listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  });
  const groupsCheckboxField = new CheckboxField({
    text: 'AutodownloadGroupChats', 
    name: 'groups',
    stateKey: key + 'groups',
<<<<<<< HEAD
    withRipple: true
=======
    withRipple: true,
    listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  });
  const channelsCheckboxField = new CheckboxField({
    text: 'AutodownloadChannels', 
    name: 'channels',
    stateKey: key + 'channels',
<<<<<<< HEAD
    withRipple: true
=======
    withRipple: true,
    listenerSetter
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  });

  section.content.append(
    contactsCheckboxField.label, 
    privateCheckboxField.label, 
    groupsCheckboxField.label, 
    channelsCheckboxField.label
  );

  return section;
}

export default class AppAutoDownloadPhotoTab extends SliderSuperTabEventable {
  protected init() {
    this.header.classList.add('with-border');
    this.setTitle('AutoDownloadPhotos');

<<<<<<< HEAD
    const section = autoDownloadPeerTypeSection('photo', 'AutoDownloadPhotosTitle');
=======
    const section = autoDownloadPeerTypeSection('photo', 'AutoDownloadPhotosTitle', this.listenerSetter);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.scrollable.append(section.container);
  }
}
