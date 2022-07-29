/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import SDPLine from "./line";

export default class SDPSessionSection {
  #lines: SDPLine[];
  #sessionId: string;

  constructor(lines: SDPLine[]) {
    this.#lines = lines;
<<<<<<< HEAD
    this.#sessionId = lines.filter(line => line.key === 'o').map(line => line.value.split(' ')[1])[0];
=======
    this.#sessionId = lines.filter((line) => line.key === 'o').map((line) => line.value.split(' ')[1])[0];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public get lines() {
    return this.#lines;
  }

  public get sessionId() {
    return this.#sessionId;
  }
}
