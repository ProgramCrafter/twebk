/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 * 
 * Originally from:
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

import { MOUNT_CLASS_TO } from "../../config/debug";
import { MessageEntity } from "../../layer";
<<<<<<< HEAD
import RichTextProcessor from "../../lib/richtextprocessor";
=======
import combineSameEntities from "../../lib/richTextProcessor/combineSameEntities";
import sortEntities from "../../lib/richTextProcessor/sortEntities";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import getRichElementValue from "./getRichElementValue";

export default function getRichValue(field: HTMLElement, withEntities = true) {
  const lines: string[] = [];
  const line: string[] = [];

  const entities: MessageEntity[] = withEntities ? [] : undefined;
  getRichElementValue(field, lines, line, undefined, undefined, entities);
  if(line.length) {
    lines.push(line.join(''));
  }

  let value = lines.join('\n');
  value = value.replace(/\u00A0/g, ' ');

  if(entities?.length) {
    // ! cannot do that here because have the same check before the sending in RichTextProcessor.parseMarkdown
    /* const entity = entities[entities.length - 1];
    const length = value.length;
    const trimmedLength = value.trimRight().length;
    if(length !== trimmedLength) {
      entity.length -= length - trimmedLength;
    } */

<<<<<<< HEAD
    RichTextProcessor.combineSameEntities(entities);
    RichTextProcessor.sortEntities(entities);
=======
    combineSameEntities(entities);
    sortEntities(entities);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  //console.log('getRichValue:', value, entities);

  return {value, entities};
}

MOUNT_CLASS_TO.getRichValue = getRichValue;
