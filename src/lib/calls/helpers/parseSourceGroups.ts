/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { GroupCallParticipantVideoSourceGroup } from "../../../layer";
import { toTelegramSource } from "../utils";

export function parseSourceGroups(sdpLines: string[]) {
<<<<<<< HEAD
  const telegramSourceGroups = sdpLines.map(str => {
=======
  const telegramSourceGroups = sdpLines.map((str) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    const [semantics, ...rest] = str.split(' ');

    const sourceGroup: GroupCallParticipantVideoSourceGroup = {
      _: 'groupCallParticipantVideoSourceGroup',
      semantics,
<<<<<<< HEAD
      // sources: rest.map(ssrc => +ssrc)
      sources: rest.map(ssrc => toTelegramSource(+ssrc))
=======
      // sources: rest.map((ssrc) => +ssrc)
      sources: rest.map((ssrc) => toTelegramSource(+ssrc))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    };

    return sourceGroup;
  });

<<<<<<< HEAD
  /* const simIndex = telegramSourceGroups.findIndex(g => g.semantics === 'SIM');
=======
  /* const simIndex = telegramSourceGroups.findIndex((g) => g.semantics === 'SIM');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  if(simIndex !== -1) {
    const sourceGroup = telegramSourceGroups.splice(simIndex, 1)[0];
    telegramSourceGroups.unshift(sourceGroup);
  } */

  return telegramSourceGroups.length ? telegramSourceGroups : undefined;
}
