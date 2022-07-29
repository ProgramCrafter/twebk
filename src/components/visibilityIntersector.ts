/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

type TargetType = HTMLElement;
<<<<<<< HEAD
export type OnVisibilityChange = (target: TargetType, visible: boolean) => void;
=======
export type OnVisibilityChangeItem = {target: TargetType, visible: boolean, entry: IntersectionObserverEntry};
export type OnVisibilityChange = (item: OnVisibilityChangeItem) => void;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class VisibilityIntersector {
  private observer: IntersectionObserver;
  private items: Map<TargetType, boolean> = new Map();
  private locked = false;

<<<<<<< HEAD
  constructor(onVisibilityChange: OnVisibilityChange) {
=======
  constructor(onVisibilityChange: OnVisibilityChange, options?: IntersectionObserverInit) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.observer = new IntersectionObserver((entries) => {
      if(this.locked) {
        return;
      }

<<<<<<< HEAD
      const changed: {target: TargetType, visible: boolean}[] = [];

      entries.forEach(entry => {
=======
      const changed: OnVisibilityChangeItem[] = [];

      entries.forEach((entry) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const target = entry.target as TargetType;

        if(this.items.get(target) === entry.isIntersecting) {
          return;
        } else {
          this.items.set(target, entry.isIntersecting);
        }

        /* if(entry.isIntersecting) {
          console.log('ooo', entry);
        } */

        /* if(this.locked) {
          return;
        } */

<<<<<<< HEAD
        changed[entry.isIntersecting ? 'unshift' : 'push']({target, visible: entry.isIntersecting});
=======
        const change: typeof changed[0] = {target, visible: entry.isIntersecting, entry};

        // ! order will be incorrect so can't use it
        // changed[entry.isIntersecting ? 'unshift' : 'push'](change);
        changed.push(change);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        //onVisibilityChange(target, entry.isIntersecting);
      });

<<<<<<< HEAD
      changed.forEach(smth => {
        onVisibilityChange(smth.target, smth.visible);
      });
    });
=======
      changed.forEach((item) => {
        onVisibilityChange(item);
      });
    }, options);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public getVisible() {
    const items: TargetType[] = [];
    this.items.forEach((value, key) => {
      if(value) {
        items.push(key);
      }
    });

    return items;
  }

  public clearVisible() {
    const visible = this.getVisible();
    for(const target of visible) {
      this.items.set(target, false);
    }
  }

  public isVisible(target: TargetType) {
    return this.items.get(target);
  }

  public disconnect() {
    this.observer.disconnect();
    this.items.clear();
  }

  public refresh() {
    this.observer.disconnect();

    //window.requestAnimationFrame(() => {
      const targets = [...this.items.keys()];
      for(const target of targets) {
        //this.items.set(target, false);
        this.observer.observe(target);
      }
    //});
  }

  public refreshVisible() {
    const visible = this.getVisible();
    for(const target of visible) {
      this.observer.unobserve(target);
    }

    for(const target of visible) {
      this.observer.observe(target);
    }
  }

  public observe(target: TargetType) {
    this.items.set(target, false);
    this.observer.observe(target);
  }

  public unobserve(target: TargetType) {
    this.observer.unobserve(target);
    this.items.delete(target);
  }

  public unlock() {
    this.locked = false;
  }

  public unlockAndRefresh() {
    this.unlock();
    this.refresh();
  }

  public lock() {
    this.locked = true;
  }
}
