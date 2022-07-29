/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
import { cancelContextMenuOpening } from "../../components/misc";
=======
import { cancelContextMenuOpening } from "./attachContextMenuListener";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import handleHorizontalSwipe, { SwipeHandlerHorizontalOptions } from "./handleHorizontalSwipe";

export default function handleTabSwipe(options: SwipeHandlerHorizontalOptions) {
  return handleHorizontalSwipe({
    ...options,
    onSwipe: (xDiff, yDiff, e) => {
      if(Math.abs(xDiff) > 50) {
        options.onSwipe(xDiff, yDiff, e);
        cancelContextMenuOpening();

        return true;
      }
    }
  });
}
