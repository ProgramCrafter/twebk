/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

<<<<<<< HEAD
=======
import { IS_WORKER } from "./context";

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
export class WindowSize {
  public width: number;
  public height: number;

  constructor() {
<<<<<<< HEAD
=======
    if(IS_WORKER) {
      return;
    }
    
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    // @ts-ignore
    const w: any = 'visualViewport' in window ? window.visualViewport : window;
    const set = () => {
      this.width = w.width || w.innerWidth;
      this.height = w.height || w.innerHeight;
    };
    w.addEventListener('resize', set);
    set();
  }
}

const windowSize = new WindowSize();
export default windowSize;
