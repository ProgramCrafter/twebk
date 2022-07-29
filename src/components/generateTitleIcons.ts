<<<<<<< HEAD
import { Chat, User } from "../layer";
import appPeersManager from "../lib/appManagers/appPeersManager";
import generateFakeIcon from "./generateFakeIcon";
import generateVerifiedIcon from "./generateVerifiedIcon";

export default function generateTitleIcons(peerId: PeerId) {
  const elements: Element[] = [];
  const peer = appPeersManager.getPeer(peerId);
  if(peer?.pFlags?.verified) {
=======
/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { Chat, User } from "../layer";
import rootScope from "../lib/rootScope";
import generateFakeIcon from "./generateFakeIcon";
// import generatePremiumIcon from "./generatePremiumIcon";
import generateVerifiedIcon from "./generateVerifiedIcon";

export default async function generateTitleIcons(peerId: PeerId) {
  const elements: Element[] = [];
  const peer: Chat | User = await rootScope.managers.appPeersManager.getPeer(peerId);
  if((peer as Chat.channel)?.pFlags?.verified) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    elements.push(generateVerifiedIcon());
  }

  if((peer as Chat.channel).pFlags.fake || (peer as User.user).pFlags.scam) {
    elements.push(generateFakeIcon((peer as User.user).pFlags.scam));
  }

<<<<<<< HEAD
=======
  // if((peer as User.user).pFlags.premium) {
  //   elements.push(generatePremiumIcon());
  // }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  return elements;
}
