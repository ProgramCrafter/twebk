/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import { generateSection } from "..";
import { averageColor, averageColorFromCanvas } from "../../../helpers/averageColor";
import blur from "../../../helpers/blur";
<<<<<<< HEAD
import deferredPromise from "../../../helpers/cancellablePromise";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import findUpClassName from "../../../helpers/dom/findUpClassName";
import { requestFile } from "../../../helpers/files";
=======
import deferredPromise, { CancellablePromise } from "../../../helpers/cancellablePromise";
import { attachClickEvent } from "../../../helpers/dom/clickEvent";
import findUpClassName from "../../../helpers/dom/findUpClassName";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import highlightningColor from "../../../helpers/highlightningColor";
import copy from "../../../helpers/object/copy";
import sequentialDom from "../../../helpers/sequentialDom";
import ChatBackgroundGradientRenderer from "../../chat/gradientRenderer";
<<<<<<< HEAD
import { AccountWallPapers, PhotoSize, WallPaper } from "../../../layer";
import appDocsManager, { MyDocument } from "../../../lib/appManagers/appDocsManager";
import appDownloadManager, { DownloadBlob } from "../../../lib/appManagers/appDownloadManager";
import appImManager from "../../../lib/appManagers/appImManager";
import appPhotosManager from "../../../lib/appManagers/appPhotosManager";
import appStateManager, { Theme, STATE_INIT } from "../../../lib/appManagers/appStateManager";
import apiManager from "../../../lib/mtproto/mtprotoworker";
=======
import { Document, PhotoSize, WallPaper } from "../../../layer";
import { MyDocument } from "../../../lib/appManagers/appDocsManager";
import appDownloadManager, { AppDownloadManager, DownloadBlob } from "../../../lib/appManagers/appDownloadManager";
import appImManager from "../../../lib/appManagers/appImManager";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../../lib/rootScope";
import Button from "../../button";
import CheckboxField from "../../checkboxField";
import ProgressivePreloader from "../../preloader";
import { SliderSuperTab } from "../../slider";
import { wrapPhoto } from "../../wrappers";
import AppBackgroundColorTab from "./backgroundColor";
<<<<<<< HEAD

let uploadTempId = 0;
=======
import choosePhotoSize from "../../../lib/appManagers/utils/photos/choosePhotoSize";
import { STATE_INIT, Theme } from "../../../config/state";
import themeController from "../../../helpers/themeController";
import requestFile from "../../../helpers/files/requestFile";
import { renderImageFromUrlPromise } from "../../../helpers/dom/renderImageFromUrl";
import scaleMediaElement from "../../../helpers/canvas/scaleMediaElement";
import { MediaSize } from "../../../helpers/mediaSize";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class AppBackgroundTab extends SliderSuperTab {
  private grid: HTMLElement;
  private tempId = 0;
<<<<<<< HEAD
  private theme: Theme;
  private clicked: Set<DocId> = new Set();
  private blurCheckboxField: CheckboxField;

  private wallpapersByElement: Map<HTMLElement, WallPaper> = new Map();
  private elementsByKey: Map<string, HTMLElement> = new Map();

=======
  private clicked: Set<DocId> = new Set();
  private blurCheckboxField: CheckboxField;

  private wallPapersByElement: Map<HTMLElement, WallPaper> = new Map();
  private elementsByKey: Map<string, HTMLElement> = new Map();

  private get theme() {
    return themeController.getTheme();
  }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  init() {
    this.header.classList.add('with-border');
    this.container.classList.add('background-container', 'background-image-container');
    this.setTitle('ChatBackground');

<<<<<<< HEAD
    this.theme = rootScope.getTheme();

=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    {
      const container = generateSection(this.scrollable);

      const uploadButton = Button('btn-primary btn-transparent', {icon: 'cameraadd', text: 'ChatBackground.UploadWallpaper'});
      const colorButton = Button('btn-primary btn-transparent', {icon: 'colorize', text: 'SetColor'});
      const resetButton = Button('btn-primary btn-transparent', {icon: 'favourites', text: 'Appearance.Reset'});

      attachClickEvent(uploadButton, this.onUploadClick, {listenerSetter: this.listenerSetter});

      attachClickEvent(colorButton, () => {
<<<<<<< HEAD
        new AppBackgroundColorTab(this.slider).open();
=======
        this.slider.createTab(AppBackgroundColorTab).open();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      }, {listenerSetter: this.listenerSetter});

      attachClickEvent(resetButton, this.onResetClick, {listenerSetter: this.listenerSetter});

      const blurCheckboxField = this.blurCheckboxField = new CheckboxField({
        text: 'ChatBackground.Blur', 
        name: 'blur', 
        checked: this.theme.background.blur,
        withRipple: true
      });

<<<<<<< HEAD
      this.listenerSetter.add(blurCheckboxField.input)('change', () => {
        this.theme.background.blur = blurCheckboxField.input.checked;
        appStateManager.pushToState('settings', rootScope.settings);
=======
      this.listenerSetter.add(blurCheckboxField.input)('change', async() => {
        this.theme.background.blur = blurCheckboxField.input.checked;
        await this.managers.appStateManager.pushToState('settings', rootScope.settings);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

        // * wait for animation end
        setTimeout(() => {
          const active = grid.querySelector('.active') as HTMLElement;
          if(!active) return;

<<<<<<< HEAD
          const wallpaper = this.wallpapersByElement.get(active);
=======
          const wallpaper = this.wallPapersByElement.get(active);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          if((wallpaper as WallPaper.wallPaper).pFlags.pattern || wallpaper._ === 'wallPaperNoFile') {
            return;
          }
          
          this.setBackgroundDocument(wallpaper);
        }, 100);
      });

      container.append(uploadButton, colorButton, resetButton, blurCheckboxField.label);
    }

    rootScope.addEventListener('background_change', this.setActive);

<<<<<<< HEAD
    apiManager.invokeApiHashable({method: 'account.getWallPapers'}).then((accountWallpapers) => {
      const wallpapers = (accountWallpapers as AccountWallPapers.accountWallPapers).wallpapers as WallPaper.wallPaper[];
      wallpapers.forEach((wallpaper) => {
        this.addWallPaper(wallpaper);
      });

      //console.log(accountWallpapers);
=======
    this.managers.appDocsManager.getWallPapers().then((wallPapers) => {
      wallPapers.forEach((wallPaper) => {
        this.addWallPaper(wallPaper);
      });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    });

    const gridContainer = generateSection(this.scrollable);
    const grid = this.grid = document.createElement('div');
    grid.classList.add('grid');
    attachClickEvent(grid, this.onGridClick, {listenerSetter: this.listenerSetter});
    gridContainer.append(grid);
  }

  private onUploadClick = () => {
<<<<<<< HEAD
    requestFile('image/x-png,image/png,image/jpeg').then(file => {
      const id = 'wallpaper-upload-' + ++uploadTempId;

      const thumb = {
        _: 'photoSize',
        h: 0,
        w: 0,
        location: {} as any,
        size: file.size,
        type: 'full',
      } as PhotoSize.photoSize;
      let document: MyDocument = {
        _: 'document',
        access_hash: '',
        attributes: [],
        dc_id: 0,
        file_reference: [],
        id,
        mime_type: file.type,
        size: file.size,
        date: Date.now() / 1000,
        pFlags: {},
        thumbs: [thumb],
        file_name: file.name
      };

      document = appDocsManager.saveDoc(document);

      const cacheContext = appDownloadManager.getCacheContext(document);
      cacheContext.downloaded = file.size;
      cacheContext.url = URL.createObjectURL(file);

      let wallpaper: WallPaper.wallPaper = {
        _: 'wallPaper',
        access_hash: '',
        document: document,
        id,
        slug: id,
        pFlags: {}
      };

      const upload = appDownloadManager.upload(file, file.name);

      const deferred = deferredPromise<void>();
      deferred.addNotifyListener = upload.addNotifyListener;
      deferred.cancel = upload.cancel;

      upload.then(inputFile => {
        apiManager.invokeApi('account.uploadWallPaper', {
          file: inputFile,
          mime_type: file.type,
          settings: {
            _: 'wallPaperSettings'
          }
        }).then(_wallpaper => {
          const newDoc = (_wallpaper as WallPaper.wallPaper).document as MyDocument;
          const newCacheContext = appDownloadManager.getCacheContext(newDoc);
          Object.assign(newCacheContext, cacheContext);

          wallpaper = _wallpaper as WallPaper.wallPaper;
          wallpaper.document = appDocsManager.saveDoc(wallpaper.document);

          this.setBackgroundDocument(wallpaper).then(deferred.resolve, deferred.reject);
        }, deferred.reject);
      }, deferred.reject);

      const key = this.getWallpaperKey(wallpaper);
      deferred.then(() => {
        this.clicked.delete(key);
      }, (err) => {
        container.remove();
        //console.error('i saw the body drop', err);
=======
    requestFile('image/x-png,image/png,image/jpeg').then(async(file) => {
      if(file.name.endsWith('.png')) {
        const img = document.createElement('img');
        const url = URL.createObjectURL(file);
        await renderImageFromUrlPromise(img, url, false);
        const mimeType = 'image/jpeg';
        const {blob} = await scaleMediaElement({media: img, size: new MediaSize(img.naturalWidth, img.naturalHeight), mimeType});
        file = new File([blob], file.name.replace(/\.png$/, '.jpg'), {type: mimeType});
      }

      const wallPaper = await this.managers.appDocsManager.prepareWallPaperUpload(file);
      const uploadPromise = this.managers.appDocsManager.uploadWallPaper(wallPaper.id);
      const uploadDeferred: CancellablePromise<any> = appDownloadManager.getNewDeferredForUpload(file.name, uploadPromise);

      const deferred = deferredPromise<void>();
      deferred.addNotifyListener = uploadDeferred.addNotifyListener;
      deferred.cancel = uploadDeferred.cancel;

      uploadDeferred.then((wallPaper) => {
        this.clicked.delete(key);
        this.elementsByKey.delete(key);
        this.wallPapersByElement.set(container, wallPaper);
        const newKey = this.getWallPaperKey(wallPaper);
        this.elementsByKey.set(newKey, container);

        this.setBackgroundDocument(wallPaper).then(deferred.resolve, deferred.reject);
      }, deferred.reject);

      const key = this.getWallPaperKey(wallPaper);
      deferred.catch(() => {
        container.remove();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      });

      const preloader = new ProgressivePreloader({
        isUpload: true,
        cancelable: true,
        tryAgainOnFail: false
      });

<<<<<<< HEAD
      const container = this.addWallPaper(wallpaper, false);
=======
      const container = this.addWallPaper(wallPaper, false);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      this.clicked.add(key);

      preloader.attach(container, false, deferred);
    });
  };

  private onResetClick = () => {
<<<<<<< HEAD
    const defaultTheme = STATE_INIT.settings.themes.find(t => t.name === this.theme.name);
    if(defaultTheme) {
      ++this.tempId;
      this.theme.background = copy(defaultTheme.background);
      appStateManager.pushToState('settings', rootScope.settings);
=======
    const defaultTheme = STATE_INIT.settings.themes.find((t) => t.name === this.theme.name);
    if(defaultTheme) {
      ++this.tempId;
      this.theme.background = copy(defaultTheme.background);
      this.managers.appStateManager.pushToState('settings', rootScope.settings);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      appImManager.applyCurrentTheme(undefined, undefined, true);
      this.blurCheckboxField.setValueSilently(this.theme.background.blur);
    }
  };

<<<<<<< HEAD
  private getColorsFromWallpaper(wallpaper: WallPaper) {
    return wallpaper.settings ? [
      wallpaper.settings.background_color,
      wallpaper.settings.second_background_color,
      wallpaper.settings.third_background_color,
      wallpaper.settings.fourth_background_color
    ].filter(Boolean).map(color => '#' + color.toString(16)).join(',') : '';
  }

  private getWallpaperKey(wallpaper: WallPaper) {
    return '' + wallpaper.id;
  }

  private getWallpaperKeyFromTheme(theme: Theme) {
    return '' + theme.background.id;
  }

  private addWallPaper(wallpaper: WallPaper, append = true) {
    const colors = this.getColorsFromWallpaper(wallpaper);
    const hasFile = wallpaper._ === 'wallPaper';
    if((hasFile && wallpaper.pFlags.pattern && !colors)/*  || 
=======
  private getColorsFromWallPaper(wallPaper: WallPaper) {
    return wallPaper.settings ? [
      wallPaper.settings.background_color,
      wallPaper.settings.second_background_color,
      wallPaper.settings.third_background_color,
      wallPaper.settings.fourth_background_color
    ].filter(Boolean).map((color) => '#' + color.toString(16)).join(',') : '';
  }

  private getWallPaperKey(wallPaper: WallPaper) {
    return '' + wallPaper.id;
  }

  private getWallPaperKeyFromTheme(theme: Theme) {
    return '' + theme.background.id;
  }

  private addWallPaper(wallPaper: WallPaper, append = true) {
    const colors = this.getColorsFromWallPaper(wallPaper);
    const hasFile = wallPaper._ === 'wallPaper';
    if((hasFile && wallPaper.pFlags.pattern && !colors)/*  || 
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      (wallpaper.document as MyDocument).mime_type.indexOf('application/') === 0 */) {
      return;
    }

<<<<<<< HEAD
    const isDark = !!wallpaper.pFlags.dark;

    const doc: MyDocument = hasFile ? (wallpaper.document = appDocsManager.saveDoc(wallpaper.document)) : undefined;
=======
    const isDark = !!wallPaper.pFlags.dark;

    const doc = hasFile ? wallPaper.document as Document.document : undefined;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

    const container = document.createElement('div');
    container.classList.add('grid-item');

<<<<<<< HEAD
    container.dataset.id = '' + wallpaper.id;

    const key = this.getWallpaperKey(wallpaper);
    this.wallpapersByElement.set(container, wallpaper);
=======
    container.dataset.id = '' + wallPaper.id;

    const key = this.getWallPaperKey(wallPaper);
    this.wallPapersByElement.set(container, wallPaper);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    this.elementsByKey.set(key, container);

    const media = document.createElement('div');
    media.classList.add('grid-item-media');

    let wrapped: ReturnType<typeof wrapPhoto>, size: PhotoSize;
    if(hasFile) {
<<<<<<< HEAD
      size = appPhotosManager.choosePhotoSize(doc, 200, 200);
=======
      size = choosePhotoSize(doc, 200, 200);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      wrapped = wrapPhoto({
        photo: doc,
        message: null,
        container: media,
        withoutPreloader: true,
        size: size,
<<<<<<< HEAD
        noFadeIn: wallpaper.pFlags.pattern
      });

      (wrapped.loadPromises.thumb || wrapped.loadPromises.full).then(() => {
=======
        noFadeIn: wallPaper.pFlags.pattern
      });

      if(wallPaper.pFlags.pattern) {
        media.classList.add('is-pattern');
      }

      wrapped.then(async({loadPromises, images}) => {
        await loadPromises.thumb || loadPromises.full;
        return images;
      }).then((images) => {
        if(wallPaper.pFlags.pattern) {
          if(isDark) {
            images.full.style.display = 'none';
            if(images.thumb) {
              images.thumb.style.display = 'none';
            }
          } else if(wallPaper.settings?.intensity) {
            images.full.style.opacity = '' + Math.abs(wallPaper.settings.intensity) / 100;
          }
        }

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        sequentialDom.mutate(() => {
          container.append(media);
        });
      });
<<<<<<< HEAD

      if(wallpaper.pFlags.pattern) {
        media.classList.add('is-pattern');
  
        if(isDark) {
          wrapped.images.full.style.display = 'none';
          if(wrapped.images.thumb) {
            wrapped.images.thumb.style.display = 'none';
          }
        } else if(wallpaper.settings?.intensity) {
          wrapped.images.full.style.opacity = '' + Math.abs(wallpaper.settings.intensity) / 100;
        }
      }
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    } else {
      container.append(media);
    }

<<<<<<< HEAD
    if(wallpaper.settings && wallpaper.settings.background_color !== undefined) {
=======
    if(wallPaper.settings && wallPaper.settings.background_color !== undefined) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      const {canvas} = ChatBackgroundGradientRenderer.create(colors);
      canvas.classList.add('background-colors-canvas');
      
      if(isDark && hasFile) {
<<<<<<< HEAD
        const cacheContext = appDownloadManager.getCacheContext(doc, size.type);
        wrapped.loadPromises.full.then(() => {
          canvas.style.webkitMaskImage = `url(${cacheContext.url})`;
          canvas.style.opacity = '' + Math.abs(wallpaper.settings.intensity) / 100;
          media.append(canvas);
=======
        wrapped.then(({loadPromises}) => {
          loadPromises.full.then(async() => {
            const cacheContext = await this.managers.thumbsStorage.getCacheContext(doc, size.type);
            canvas.style.webkitMaskImage = `url(${cacheContext.url})`;
            canvas.style.opacity = '' + Math.abs(wallPaper.settings.intensity) / 100;
            media.append(canvas);
          });
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        });
      } else {
        media.append(canvas);
      }
    }

<<<<<<< HEAD
    if(this.getWallpaperKeyFromTheme(this.theme) === key) {
=======
    if(this.getWallPaperKeyFromTheme(this.theme) === key) {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      container.classList.add('active');
    }

    this.grid[append ? 'append' : 'prepend'](container);

    return container;
  }

  private onGridClick = (e: MouseEvent | TouchEvent) => {
    const target = findUpClassName(e.target, 'grid-item') as HTMLElement;
    if(!target) return;

<<<<<<< HEAD
    const wallpaper = this.wallpapersByElement.get(target);
=======
    const wallpaper = this.wallPapersByElement.get(target);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(wallpaper._ === 'wallPaperNoFile') {
      this.setBackgroundDocument(wallpaper);
      return;
    }
    
<<<<<<< HEAD
    const key = this.getWallpaperKey(wallpaper);
=======
    const key = this.getWallPaperKey(wallpaper);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(this.clicked.has(key)) return;
    this.clicked.add(key);
    
    const doc = wallpaper.document as MyDocument;
    const preloader = new ProgressivePreloader({
      cancelable: true,
      tryAgainOnFail: false
    });

<<<<<<< HEAD
    const load = () => {
      const promise = this.setBackgroundDocument(wallpaper);
      const cacheContext = appDownloadManager.getCacheContext(doc);
=======
    const load = async() => {
      const promise = this.setBackgroundDocument(wallpaper);
      const cacheContext = await this.managers.thumbsStorage.getCacheContext(doc);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!cacheContext.url || this.theme.background.blur) {
        preloader.attach(target, true, promise);
      }
    };

    preloader.construct();

    attachClickEvent(target, (e) => {
      if(preloader.preloader.parentElement) {
        preloader.onClick(e);
        preloader.detach();
      } else {
        load();
      }
    }, {listenerSetter: this.listenerSetter});

    load();

    //console.log(doc);
  };

  private saveToCache = (slug: string, url: string) => {
<<<<<<< HEAD
    fetch(url).then(response => {
      appDownloadManager.cacheStorage.save('backgrounds/' + slug, response);
    });
  };

  private setBackgroundDocument = (wallpaper: WallPaper) => {
    let _tempId = ++this.tempId;
    const middleware = () => _tempId === this.tempId;

    const doc = (wallpaper as WallPaper.wallPaper).document as MyDocument;
    const deferred = deferredPromise<void>();
    let download: Promise<void> | DownloadBlob;
    if(doc) {
      download = appDocsManager.downloadDoc(doc, appImManager.chat.bubbles ? appImManager.chat.bubbles.lazyLoadQueue.queueId : 0);
=======
    fetch(url).then((response) => {
      appImManager.cacheStorage.save('backgrounds/' + slug, response);
    });
  };

  private setBackgroundDocument = (wallPaper: WallPaper) => {
    let _tempId = ++this.tempId;
    const middleware = () => _tempId === this.tempId;

    const doc = (wallPaper as WallPaper.wallPaper).document as MyDocument;
    const deferred = deferredPromise<void>();
    let download: Promise<void> | ReturnType<AppDownloadManager['downloadMediaURL']>;
    if(doc) {
      download = appDownloadManager.downloadMediaURL({media: doc, queueId: appImManager.chat.bubbles ? appImManager.chat.bubbles.lazyLoadQueue.queueId : 0});
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      deferred.addNotifyListener = download.addNotifyListener;
      deferred.cancel = download.cancel;
    } else {
      download = Promise.resolve();
    }

<<<<<<< HEAD
    download.then(() => {
=======
    download.then(async() => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(!middleware()) {
        deferred.resolve();
        return;
      }

      const background = this.theme.background;
      const onReady = (url?: string) => {
        //const perf = performance.now();
        let getPixelPromise: Promise<Uint8ClampedArray>;
        if(url && !this.theme.background.color) {
          getPixelPromise = averageColor(url);
        } else {
<<<<<<< HEAD
          const {canvas} = ChatBackgroundGradientRenderer.create(this.getColorsFromWallpaper(wallpaper));
=======
          const {canvas} = ChatBackgroundGradientRenderer.create(this.getColorsFromWallPaper(wallPaper));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          getPixelPromise = Promise.resolve(averageColorFromCanvas(canvas));
        }

        getPixelPromise.then((pixel) => {
          if(!middleware()) {
            deferred.resolve();
            return;
          }
          
          const hsla = highlightningColor(Array.from(pixel) as any);
          // const hsla = 'rgba(0, 0, 0, 0.3)';
          //console.log(doc, hsla, performance.now() - perf);

<<<<<<< HEAD
          const slug = (wallpaper as WallPaper.wallPaper).slug ?? '';
          background.id = wallpaper.id;
          background.intensity = wallpaper.settings?.intensity ?? 0;
          background.color = this.getColorsFromWallpaper(wallpaper);
          background.slug = slug;
          background.highlightningColor = hsla;
          appStateManager.pushToState('settings', rootScope.settings);
=======
          const slug = (wallPaper as WallPaper.wallPaper).slug ?? '';
          background.id = wallPaper.id;
          background.intensity = wallPaper.settings?.intensity ?? 0;
          background.color = this.getColorsFromWallPaper(wallPaper);
          background.slug = slug;
          background.highlightningColor = hsla;
          this.managers.appStateManager.pushToState('settings', rootScope.settings);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

          if(slug) {
            this.saveToCache(slug, url);
          }

          appImManager.applyCurrentTheme(slug, url, true).then(deferred.resolve);
        });
      };

      if(!doc) {
        onReady();
        return;
      }

<<<<<<< HEAD
      const cacheContext = appDownloadManager.getCacheContext(doc);
=======
      const cacheContext = await this.managers.thumbsStorage.getCacheContext(doc);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(background.blur) {
        setTimeout(() => {
          const {canvas, promise} = blur(cacheContext.url, 12, 4)
          promise.then(() => {
            if(!middleware()) {
              deferred.resolve();
              return;
            }

            onReady(canvas.toDataURL());
          });
        }, 200);
      } else {
        onReady(cacheContext.url);
      }
    });

    return deferred;
  };

  private setActive = () => {
    const active = this.grid.querySelector('.active');
<<<<<<< HEAD
    const target = this.elementsByKey.get(this.getWallpaperKeyFromTheme(this.theme));
=======
    const target = this.elementsByKey.get(this.getWallPaperKeyFromTheme(this.theme));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(active === target) {
      return;
    }

    if(active) {
      active.classList.remove('active');
    }

    if(target) {
      target.classList.add('active');
    }
  };
}
