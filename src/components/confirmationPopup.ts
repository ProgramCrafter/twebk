/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { addCancelButton } from "./popups";
import PopupPeer, { PopupPeerOptions } from "./popups/peer";

// type PopupConfirmationOptions = Pick<PopupPeerOptions, 'titleLangKey'>;
<<<<<<< HEAD
type PopupConfirmationOptions = PopupPeerOptions & {
=======
export type PopupConfirmationOptions = PopupPeerOptions & {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  button: PopupPeerOptions['buttons'][0],
  checkbox?: PopupPeerOptions['checkboxes'][0]
};

export default function confirmationPopup(options: PopupConfirmationOptions) {
  return new Promise<boolean | void>((resolve, reject) => {
    const {button, checkbox} = options;
    button.callback = (set) => {
      resolve(set ? !!set.size : undefined);
    };

<<<<<<< HEAD
    const buttons = addCancelButton([button]);
    const cancelButton = buttons.find(button => button.isCancel);
=======
    const buttons = addCancelButton(options.buttons || [button]);
    const cancelButton = buttons.find((button) => button.isCancel);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    cancelButton.callback = () => {
      reject();
    };

    options.buttons = buttons;
<<<<<<< HEAD
    options.checkboxes = checkbox && [checkbox];
=======
    options.checkboxes ??= checkbox && [checkbox];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    new PopupPeer('popup-confirmation', options).show();
  });
}
