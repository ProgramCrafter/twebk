/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import emoticonsDropdown, { EmoticonsDropdown, EMOTICONSSTICKERGROUP, EmoticonsTab } from "..";
<<<<<<< HEAD
import findUpAttribute from "../../../helpers/dom/findUpAttribute";
import findUpClassName from "../../../helpers/dom/findUpClassName";
import mediaSizes from "../../../helpers/mediaSizes";
import { MessagesAllStickers, StickerSet } from "../../../layer";
import appDocsManager, { MyDocument } from "../../../lib/appManagers/appDocsManager";
import appStickersManager from "../../../lib/appManagers/appStickersManager";
import { i18n } from "../../../lib/langPack";
import { RichTextProcessor } from "../../../lib/richtextprocessor";
import rootScope from "../../../lib/rootScope";
import animationIntersector from "../../animationIntersector";
import LazyLoadQueue, { LazyLoadQueueRepeat } from "../../lazyLoadQueue";
import { putPreloader } from "../../misc";
=======
import findUpClassName from "../../../helpers/dom/findUpClassName";
import mediaSizes from "../../../helpers/mediaSizes";
import { MessagesAllStickers, StickerSet } from "../../../layer";
import { MyDocument } from "../../../lib/appManagers/appDocsManager";
import { AppManagers } from "../../../lib/appManagers/managers";
import { i18n } from "../../../lib/langPack";
import wrapEmojiText from "../../../lib/richTextProcessor/wrapEmojiText";
import rootScope from "../../../lib/rootScope";
import animationIntersector from "../../animationIntersector";
import LazyLoadQueue from "../../lazyLoadQueue";
import LazyLoadQueueRepeat from "../../lazyLoadQueueRepeat";
import { putPreloader } from "../../putPreloader";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import PopupStickers from "../../popups/stickers";
import Scrollable, { ScrollableX } from "../../scrollable";
import StickyIntersector from "../../stickyIntersector";
import { wrapSticker, wrapStickerSetThumb } from "../../wrappers";
<<<<<<< HEAD

export class SuperStickerRenderer {
  public lazyLoadQueue: LazyLoadQueueRepeat;
  private animatedDivs: Set<HTMLDivElement> = new Set();

  constructor(private regularLazyLoadQueue: LazyLoadQueue, private group: string) {
    this.lazyLoadQueue = new LazyLoadQueueRepeat(undefined, (target, visible) => {
      if(!visible) {
        this.processInvisibleDiv(target as HTMLDivElement);
      }
    });
=======
import ButtonIcon from "../../buttonIcon";
import positionElementByIndex from "../../../helpers/dom/positionElementByIndex";
import VisibilityIntersector, { OnVisibilityChange } from "../../visibilityIntersector";
import findAndSplice from "../../../helpers/array/findAndSplice";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import confirmationPopup from "../../confirmationPopup";
import noop from "../../../helpers/noop";

export class SuperStickerRenderer {
  public lazyLoadQueue: LazyLoadQueueRepeat;
  private animated: Set<HTMLElement> = new Set();

  constructor(
    private regularLazyLoadQueue: LazyLoadQueue, 
    private group: string,
    private managers: AppManagers,
    private options?: IntersectionObserverInit
  ) {
    this.lazyLoadQueue = new LazyLoadQueueRepeat(undefined, ({target, visible}) => {
      if(!visible) {
        this.processInvisible(target);
      }
    }, options);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  public clear() {
    this.lazyLoadQueue.clear();
  }

<<<<<<< HEAD
  public renderSticker(doc: MyDocument, div?: HTMLDivElement, loadPromises?: Promise<any>[]) {
    if(!div) {
      div = document.createElement('div');
      div.classList.add('grid-item', 'super-sticker');

      if(doc.animated) {
        this.observeAnimatedDiv(div);
=======
  public renderSticker(doc: MyDocument, element?: HTMLElement, loadPromises?: Promise<any>[]) {
    if(!element) {
      element = document.createElement('div');
      element.classList.add('grid-item', 'super-sticker');
      element.dataset.docId = '' + doc.id;

      if(doc.animated) {
        this.observeAnimated(element);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }
    }

    // * This will wrap only a thumb
<<<<<<< HEAD
    wrapSticker({
      doc, 
      div,
=======
    /* !doc.animated &&  */wrapSticker({
      doc, 
      div: element,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      lazyLoadQueue: this.regularLazyLoadQueue, 
      group: this.group, 
      onlyThumb: doc.animated,
      loadPromises
    });

<<<<<<< HEAD
    return div;
  }

  public observeAnimatedDiv(div: HTMLDivElement) {
    this.animatedDivs.add(div);

    this.lazyLoadQueue.observe({
      div, 
      load: this.processVisibleDiv
    });
  }

  private checkAnimationContainer = (div: HTMLElement, visible: boolean) => {
    //console.error('checkAnimationContainer', div, visible);
    const players = animationIntersector.getAnimations(div);
    players.forEach(player => {
=======
    return element;
  }

  public observeAnimated(element: HTMLElement) {
    this.animated.add(element);
    this.lazyLoadQueue.observe({
      div: element, 
      load: this.processVisible
    });
  }

  public unobserveAnimated(element: HTMLElement) {
    this.animated.delete(element);
    this.lazyLoadQueue.unobserve(element);
  }

  private checkAnimationContainer = (element: HTMLElement, visible: boolean) => {
    //console.error('checkAnimationContainer', div, visible);
    const players = animationIntersector.getAnimations(element);
    players.forEach((player) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!visible) {
        animationIntersector.checkAnimation(player, true, true);
      } else {
        animationIntersector.checkAnimation(player, false);
      }
    });
  };

<<<<<<< HEAD
  private processVisibleDiv = (div: HTMLElement) => {
    const docId = div.dataset.docId;
    const doc = appDocsManager.getDoc(docId);
=======
  private processVisible = async(element: HTMLElement) => {
    const docId = element.dataset.docId;
    const doc = await this.managers.appDocsManager.getDoc(docId);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    
    const size = mediaSizes.active.esgSticker.width;

    //console.log('processVisibleDiv:', div);

    const promise = wrapSticker({
      doc, 
<<<<<<< HEAD
      div: div as HTMLDivElement,
=======
      div: element,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      width: size,
      height: size,
      lazyLoadQueue: null, 
      group: this.group, 
      onlyThumb: false,
      play: true,
      loop: true
<<<<<<< HEAD
    });

    promise.then(() => {
      //clearTimeout(timeout);
      this.checkAnimationContainer(div, this.lazyLoadQueue.intersector.isVisible(div));
=======
    }).then(({render}) => render);

    promise.then(() => {
      //clearTimeout(timeout);
      this.checkAnimationContainer(element, this.lazyLoadQueue.intersector.isVisible(element));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    /* let timeout = window.setTimeout(() => {
      console.error('processVisibleDiv timeout', div, doc);
    }, 1e3); */

    return promise;
  };

<<<<<<< HEAD
  public processInvisibleDiv = (div: HTMLElement) => {
    const docId = div.dataset.docId;
    const doc = appDocsManager.getDoc(docId);

    //console.log('STICKER INvisible:', /* div,  */docId);

    this.checkAnimationContainer(div, false);

    div.innerHTML = '';
    this.renderSticker(doc, div as HTMLDivElement);
  };
}

export default class StickersTab implements EmoticonsTab {
  private content: HTMLElement;
  private stickersDiv: HTMLElement;

  private stickerSets: {[id: string]: {
    stickers: HTMLElement,
    tab: HTMLElement
  }} = {};

  private recentDiv: HTMLElement;
  private recentStickers: MyDocument[] = [];

  private scroll: Scrollable;

  private menu: HTMLElement;
  
  private mounted = false;

  private queueCategoryPush: {element: HTMLElement, prepend: boolean}[] = [];

  private stickyIntersector: StickyIntersector;

  private superStickerRenderer: SuperStickerRenderer;

  categoryPush(categoryDiv: HTMLElement, categoryTitle: DocumentFragment | string = '', promise: Promise<MyDocument[]>, prepend?: boolean) {
    //if((docs.length % 5) !== 0) categoryDiv.classList.add('not-full');

    const itemsDiv = document.createElement('div');
    itemsDiv.classList.add('category-items', 'super-stickers');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('category-title');

    if(categoryTitle) {
      if(typeof(categoryTitle) === 'string') titleDiv.innerHTML = categoryTitle;
      else titleDiv.append(categoryTitle);
    }

    categoryDiv.append(titleDiv, itemsDiv);

    this.stickyIntersector.observeStickyHeaderChanges(categoryDiv);

    this.queueCategoryPush.push({element: categoryDiv, prepend});

    promise.then(documents => {
      documents.forEach(doc => {
        //if(doc._ === 'documentEmpty') return;
        itemsDiv.append(this.superStickerRenderer.renderSticker(doc));
      });

      if(this.queueCategoryPush.length) {
        this.queueCategoryPush.forEach(({element, prepend}) => {
          if(prepend) {
            if(this.recentDiv.parentElement) {
              this.stickersDiv.prepend(element);
              this.stickersDiv.prepend(this.recentDiv);
            } else {
              this.stickersDiv.prepend(element);
            }
          } else this.stickersDiv.append(element);
        });

        this.queueCategoryPush.length = 0;
      }
    });

    return {titleDiv};
  }

  async renderStickerSet(set: StickerSet.stickerSet, prepend = false) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('sticker-category');
    categoryDiv.dataset.id = '' + set.id;
    categoryDiv.dataset.access_hash = '' + set.access_hash;

    const button = document.createElement('button');
    button.classList.add('btn-icon', 'menu-horizontal-div-item');

    this.stickerSets[set.id] = {
      stickers: categoryDiv,
      tab: button
    };

    if(prepend) {
      this.menu.insertBefore(button, this.menu.firstElementChild.nextSibling);
    } else {
      this.menu.append(button);
    }

    //stickersScroll.append(categoryDiv);

    const promise = appStickersManager.getStickerSet(set);
    this.categoryPush(categoryDiv, RichTextProcessor.wrapEmojiText(set.title), promise.then(stickerSet => stickerSet.documents as MyDocument[]), prepend);
    const stickerSet = await promise;

    //console.log('got stickerSet', stickerSet, li);
    
    wrapStickerSetThumb({
      set,
      container: button,
=======
  public processInvisible = async(element: HTMLElement) => {
    const docId = element.dataset.docId;
    const doc = await this.managers.appDocsManager.getDoc(docId);

    //console.log('STICKER INvisible:', /* div,  */docId);

    this.checkAnimationContainer(element, false);

    element.textContent = '';
    this.renderSticker(doc, element as HTMLDivElement);
  };
}

type StickersTabCategory = {
  elements: {
    container: HTMLElement,
    title: HTMLElement,
    items: HTMLElement,
    menuTab: HTMLElement,
    menuTabPadding: HTMLElement
  },
  set: StickerSet.stickerSet,
  items: {
    document: MyDocument,
    element: HTMLElement
  }[]
};

const RECENT_STICKERS_COUNT = 20;

export default class StickersTab implements EmoticonsTab {
  private content: HTMLElement;

  private categories: {[id: string]: StickersTabCategory};
  private categoriesMap: Map<HTMLElement, StickersTabCategory>;
  private categoriesIntersector: VisibilityIntersector;

  private scroll: Scrollable;
  private menu: HTMLElement;
  private mounted = false;
  private stickyIntersector: StickyIntersector;
  private superStickerRenderer: SuperStickerRenderer;

  constructor(private managers: AppManagers) {
    this.categories = {};
    this.categoriesMap = new Map();
  }

  private createCategory(stickerSet: StickerSet.stickerSet, _title: HTMLElement | DocumentFragment) {
    const container = document.createElement('div');
    container.classList.add('emoji-category', 'hide');

    const items = document.createElement('div');
    items.classList.add('category-items', 'super-stickers');

    const title = document.createElement('div');
    title.classList.add('category-title');
    title.append(_title);

    const menuTab = ButtonIcon(undefined, {noRipple: true});
    menuTab.classList.add('menu-horizontal-div-item');

    const menuTabPadding = document.createElement('div');
    menuTabPadding.classList.add('menu-horizontal-div-item-padding');

    menuTab.append(menuTabPadding);

    const category: StickersTabCategory = {
      elements: {
        container,
        title,
        items,
        menuTab,
        menuTabPadding
      },
      set: stickerSet,
      items: []
    };

    container.append(title, items);

    this.categories[stickerSet.id] = category;
    this.categoriesMap.set(container, category);

    this.categoriesIntersector.observe(container);
    this.stickyIntersector.observeStickyHeaderChanges(container);

    return category;
  }

  private categoryAppendStickers(
    category: StickersTabCategory, 
    promise: Promise<MyDocument[]>
  ) {
    const {container} = category.elements;

    promise.then((documents) => {
      const isVisible = this.isCategoryVisible(category);

      documents.forEach((document) => {
        const element = this.superStickerRenderer.renderSticker(document);
        category.items.push({document, element});

        if(isVisible) {
          category.elements.items.append(element);
        }
      });

      this.setCategoryItemsHeight(category);
      container.classList.remove('hide');
    });
  }

  private isCategoryVisible(category: StickersTabCategory) {
    return this.categoriesIntersector.getVisible().includes(category.elements.container);
  }

  private setCategoryItemsHeight(category: StickersTabCategory) {
    const containerWidth = this.content.getBoundingClientRect().width - 10;
    const stickerSize = mediaSizes.active.esgSticker.width;

    const itemsPerRow = Math.floor(containerWidth / stickerSize);
    const rows = Math.ceil(category.items.length / itemsPerRow);
    const height = rows * stickerSize;
    
    category.elements.items.style.minHeight = height + 'px';
  }

  private async renderStickerSet(set: StickerSet.stickerSet, prepend = false) {
    const category = this.createCategory(set, wrapEmojiText(set.title));
    const {menuTab, menuTabPadding, container} = category.elements;

    positionElementByIndex(menuTab, this.menu, prepend ? 1 : 0xFFFF);

    const promise = this.managers.appStickersManager.getStickerSet(set);
    this.categoryAppendStickers(
      category,
      promise.then((stickerSet) => stickerSet.documents as MyDocument[])
    );
    // const stickerSet = await promise;

    positionElementByIndex(container, this.scroll.container, prepend ? 1 : 0xFFFF, -1);

    wrapStickerSetThumb({
      set,
      container: menuTabPadding,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      group: EMOTICONSSTICKERGROUP,
      lazyLoadQueue: EmoticonsDropdown.lazyLoadQueue,
      width: 32,
      height: 32,
      autoplay: false
    });
  }

<<<<<<< HEAD
  init() {
    this.content = document.getElementById('content-stickers');
    //let stickersDiv = contentStickersDiv.querySelector('.os-content') as HTMLDivElement;

    this.recentDiv = document.createElement('div');
    this.recentDiv.classList.add('sticker-category', 'stickers-recent');

    let menuWrapper = this.content.previousElementSibling as HTMLDivElement;
    this.menu = menuWrapper.firstElementChild as HTMLUListElement;

    let menuScroll = new ScrollableX(menuWrapper);

    this.stickersDiv = document.createElement('div');
    this.stickersDiv.classList.add('stickers-categories');
    this.content.append(this.stickersDiv);
=======
  public init() {
    this.content = document.getElementById('content-stickers');

    const menuWrapper = this.content.previousElementSibling as HTMLDivElement;
    this.menu = menuWrapper.firstElementChild as HTMLUListElement;

    const menuScroll = new ScrollableX(menuWrapper);

    this.scroll = new Scrollable(this.content, 'STICKERS');
    this.scroll.onAdditionalScroll = () => {
      setTyping();
    };
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    /* stickersDiv.addEventListener('mouseover', (e) => {
      let target = e.target as HTMLElement;

      if(target.tagName === 'CANVAS') { // turn on sticker
        let animation = lottieLoader.getAnimation(target.parentElement, EMOTICONSSTICKERGROUP);

        if(animation) {
          // @ts-ignore
          if(animation.currentFrame === animation.totalFrames - 1) {
            animation.goToAndPlay(0, true);
          } else {
            animation.play();
          }
        }
      }
    }); */

<<<<<<< HEAD
    rootScope.addEventListener('stickers_installed', (e) => {
      const set: StickerSet.stickerSet = e;
      
      if(!this.stickerSets[set.id] && this.mounted) {
        this.renderStickerSet(set, true);
      }
    });

    rootScope.addEventListener('stickers_deleted', (e) => {
      const set: StickerSet.stickerSet = e;
      
      if(this.stickerSets[set.id] && this.mounted) {
        const elements = this.stickerSets[set.id];
        elements.stickers.remove();
        elements.tab.remove();
        delete this.stickerSets[set.id];
      }
    });

    this.stickersDiv.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if(findUpClassName(target, 'category-title')) {
        const el = findUpAttribute(target, 'data-id');
        new PopupStickers({id: el.dataset.id, access_hash: el.dataset.access_hash}).show();
=======
    const onCategoryVisibility: OnVisibilityChange = ({target, visible, entry}) => {
      const category = this.categoriesMap.get(target);
      // console.log('roll the windows up', category, target, visible, entry);
      if(!visible) {
        category.elements.items.textContent = '';
      } else {
        category.elements.items.append(...category.items.map(({element}) => element));
      }
    };

    const intersectionOptions: IntersectionObserverInit = {root: emoticonsDropdown.getElement()};
    this.categoriesIntersector = new VisibilityIntersector(onCategoryVisibility, intersectionOptions);

    const clearCategoryItems = (category: StickersTabCategory) => {
      category.elements.items.textContent = '';
      category.items.forEach(({element}) => this.superStickerRenderer.unobserveAnimated(element));
      category.items.length = 0;
    };

    this.scroll.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if(findUpClassName(target, 'category-title')) {
        const container = findUpClassName(target, 'emoji-category');
        const category = this.categoriesMap.get(container);
        if(category.set.id === 'recent') {
          return;
        }

        new PopupStickers({id: category.set.id, access_hash: category.set.access_hash}).show();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return;
      }

      EmoticonsDropdown.onMediaClick(e);
    });

    const setTyping = (cancel = false) => {
      rootScope.dispatchEvent('choosing_sticker', !cancel);
    };

<<<<<<< HEAD
    this.scroll = new Scrollable(this.content, 'STICKERS');
    this.scroll.setVirtualContainer(this.stickersDiv);
    this.scroll.onAdditionalScroll = () => {
      setTyping();
    };

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    emoticonsDropdown.addEventListener('closed', () => {
      setTyping(true);
    });

    emoticonsDropdown.addEventListener('opened', () => {
      setTyping();
    });

<<<<<<< HEAD
    this.stickyIntersector = EmoticonsDropdown.menuOnClick(this.menu, this.scroll, menuScroll).stickyIntersector;

    const preloader = putPreloader(this.content, true);

    Promise.all([
      appStickersManager.getRecentStickers().then(stickers => {
        this.recentStickers = stickers.stickers.slice(0, 20) as MyDocument[];
  
        //stickersScroll.prepend(categoryDiv);

        this.stickerSets['recent'] = {
          stickers: this.recentDiv,
          tab: this.menu.firstElementChild as HTMLElement
        };

        preloader.remove();
        const {titleDiv} = this.categoryPush(this.recentDiv, '', Promise.resolve(this.recentStickers), true);
        titleDiv.append(i18n('Stickers.Recent'));
      }),

      appStickersManager.getAllStickers().then((res) => {
=======
    const {stickyIntersector, setActive} = EmoticonsDropdown.menuOnClick(this.menu, this.scroll, menuScroll);
    this.stickyIntersector = stickyIntersector;

    const preloader = putPreloader(this.content, true);

    const recentCategory = this.createCategory({id: 'recent'} as any, i18n('Stickers.Recent'));
    recentCategory.elements.title.classList.add('disable-hover');
    recentCategory.elements.menuTab.classList.add('tgico-recent', 'active');
    recentCategory.elements.menuTabPadding.remove();
    this.toggleRecentCategory(recentCategory, false);

    const clearButton = ButtonIcon('close', {noRipple: true});
    recentCategory.elements.title.append(clearButton);
    attachClickEvent(clearButton, () => {
      confirmationPopup({
        titleLangKey: 'ClearRecentStickersAlertTitle',
        descriptionLangKey: 'ClearRecentStickersAlertMessage',
        button: {
          langKey: 'Clear'
        }
      }).then(() => {
        this.managers.appStickersManager.clearRecentStickers();
      }, noop);
    });

    const onRecentStickers = (stickers: MyDocument[]) => {
      const sliced = stickers.slice(0, RECENT_STICKERS_COUNT) as MyDocument[];

      clearCategoryItems(recentCategory);
      this.toggleRecentCategory(recentCategory, !!sliced.length);
      this.categoryAppendStickers(recentCategory, Promise.resolve(sliced));
    };

    Promise.all([
      this.managers.appStickersManager.getRecentStickers().then((stickers) => {
        preloader.remove();
        onRecentStickers(stickers.stickers as MyDocument[]);
      }),

      this.managers.appStickersManager.getAllStickers().then((res) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        preloader.remove();

        for(let set of (res as MessagesAllStickers.messagesAllStickers).sets) {
          this.renderStickerSet(set);
        }
      })
    ]).finally(() => {
      this.mounted = true;
      setTyping();
<<<<<<< HEAD
    });

    this.superStickerRenderer = new SuperStickerRenderer(EmoticonsDropdown.lazyLoadQueue, EMOTICONSSTICKERGROUP);

    emoticonsDropdown.addLazyLoadQueueRepeat(this.superStickerRenderer.lazyLoadQueue, this.superStickerRenderer.processInvisibleDiv);

    /* setInterval(() => {
      // @ts-ignore
      const players = Object.values(lottieLoader.players).filter(p => p.width === 80);
      
      console.log('STICKERS RENDERED IN PANEL:', players.length, players.filter(p => !p.paused).length, this.superStickerRenderer.lazyLoadQueue.intersector.getVisible().length);
    }, .25e3); */
    

    this.init = null;
  }

  pushRecentSticker(doc: MyDocument) {
    appStickersManager.pushRecentSticker(doc);
    
    if(!this.recentDiv?.parentElement) {
      return;
    }

    let div = this.recentDiv.querySelector(`[data-doc-id="${doc.id}"]`);
    if(!div) {
      div = this.superStickerRenderer.renderSticker(doc);
    }

    const items = this.recentDiv.querySelector('.category-items');
    items.prepend(div);

    if(items.childElementCount > 20) {
      (Array.from(items.children) as HTMLElement[]).slice(20).forEach(el => el.remove());
    }
=======
      setActive(0);
    });

    this.superStickerRenderer = new SuperStickerRenderer(EmoticonsDropdown.lazyLoadQueue, EMOTICONSSTICKERGROUP, this.managers, intersectionOptions);

    const rendererLazyLoadQueue = this.superStickerRenderer.lazyLoadQueue;
    emoticonsDropdown.addLazyLoadQueueRepeat(rendererLazyLoadQueue, this.superStickerRenderer.processInvisible);

    // emoticonsDropdown.addEventListener('close', () => {
    //   this.categoriesIntersector.lock();
    // });

    // emoticonsDropdown.addEventListener('closed', () => {
    //   for(const [container] of this.categoriesMap) {
    //     onCategoryVisibility(container, false);
    //   }
    // });

    // emoticonsDropdown.addEventListener('opened', () => {
    //   this.categoriesIntersector.unlockAndRefresh();
    // });

    // setInterval(() => {
    //   // @ts-ignore
    //   const players = Object.values(lottieLoader.players).filter((p) => p.width >= 80);
      
    //   console.log(
    //     'STICKERS RENDERED IN PANEL:', 
    //     players.length, 
    //     players.filter((p) => !p.paused).length, 
    //     rendererLazyLoadQueue.intersector.getVisible().length
    //   );
    // }, .25e3);

    rootScope.addEventListener('stickers_installed', (set) => {
      if(!this.categories[set.id] && this.mounted) {
        this.renderStickerSet(set, true);
      }
    });

    rootScope.addEventListener('stickers_deleted', ({id}) => {
      const category = this.categories[id];
      if(category && this.mounted) {
        category.elements.container.remove();
        category.elements.menuTab.remove();
        this.categoriesIntersector.unobserve(category.elements.container);
        clearCategoryItems(category);
        delete this.categories[id];
        this.categoriesMap.delete(category.elements.container);
      }
    });

    rootScope.addEventListener('stickers_recent', (stickers) => {
      if(this.mounted) {
        onRecentStickers(stickers);
      }
    });

    const resizeCategories = () => {
      for(const [container, category] of this.categoriesMap) {
        this.setCategoryItemsHeight(category);
      }
    };

    mediaSizes.addEventListener('resize', resizeCategories);

    emoticonsDropdown.addEventListener('opened', resizeCategories);
    
    this.init = null;
  }

  private toggleRecentCategory(category: StickersTabCategory, visible: boolean) {
    if(!visible) {
      category.elements.menuTab.remove();
      category.elements.container.remove();
    } else {
      positionElementByIndex(category.elements.menuTab, this.menu, 0);
      positionElementByIndex(category.elements.container, this.scroll.container, 0);
    }
    
    // category.elements.container.classList.toggle('hide', !visible);
  }

  public pushRecentSticker(doc: MyDocument) {
    this.managers.appStickersManager.pushRecentSticker(doc.id);
    
    const category = this.categories['recent'];
    if(!category) {
      return;
    }

    const items = category.elements.items;
    let item = findAndSplice(category.items, (item) => item.document.id === doc.id);
    if(!item) {
      item = {
        element: this.superStickerRenderer.renderSticker(doc),
        document: doc
      };
    }

    category.items.unshift(item);
    if(items.childElementCount) items.prepend(item.element);
    if(items.childElementCount > RECENT_STICKERS_COUNT) {
      (Array.from(items.children) as HTMLElement[]).slice(RECENT_STICKERS_COUNT).forEach((el) => el.remove());
    }

    this.setCategoryItemsHeight(category);
    this.toggleRecentCategory(category, true);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }

  onClose() {

  }
}
