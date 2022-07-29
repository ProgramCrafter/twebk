/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import I18n, { i18n, join, LangPackKey } from "../lib/langPack";
import formatDuration, { DurationType } from "./formatDuration";

const CALL_DURATION_LANG_KEYS: {[type in DurationType]: LangPackKey} = {
  s: 'Seconds',
  m: 'Minutes',
  h: 'Hours',
  d: 'Days',
  w: 'Weeks'
};
export default function formatCallDuration(duration: number, plain?: boolean) {
  const a = formatDuration(duration, 2);
  if(plain) {
<<<<<<< HEAD
    const strings = a.map(d => I18n.format(CALL_DURATION_LANG_KEYS[d.type], true, [d.duration]));
    return join(strings, false, plain);
  }

  const elements = a.map(d => i18n(CALL_DURATION_LANG_KEYS[d.type], [d.duration]));
=======
    const strings = a.map((d) => I18n.format(CALL_DURATION_LANG_KEYS[d.type], true, [d.duration]));
    return join(strings, false, plain);
  }

  const elements = a.map((d) => i18n(CALL_DURATION_LANG_KEYS[d.type], [d.duration]));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  const fragment = document.createElement('span');
  fragment.append(...join(elements, false));

  return fragment;
}
