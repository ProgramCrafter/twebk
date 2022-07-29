/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import forEachReverse from "../../helpers/array/forEachReverse";
import positionElementByIndex from "../../helpers/dom/positionElementByIndex";
import { Message, ReactionCount } from "../../layer";
<<<<<<< HEAD
import appReactionsManager from "../../lib/appManagers/appReactionsManager";
=======
import appImManager from "../../lib/appManagers/appImManager";
import { AppManagers } from "../../lib/appManagers/managers";
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import rootScope from "../../lib/rootScope";
import ReactionElement, { ReactionLayoutType, REACTION_DISPLAY_BLOCK_COUNTER_AT } from "./reaction";

const CLASS_NAME = 'reactions';
const TAG_NAME = CLASS_NAME + '-element';

const REACTIONS_ELEMENTS: Map<string, Set<ReactionsElement>> = new Map();
<<<<<<< HEAD
export {REACTIONS_ELEMENTS};
=======
export { REACTIONS_ELEMENTS };
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

export default class ReactionsElement extends HTMLElement {
  private message: Message.message;
  private key: string;
  private isPlaceholder: boolean;
  private type: ReactionLayoutType;
  private sorted: ReactionElement[];
  private onConnectCallback: () => void;
<<<<<<< HEAD
=======
  private managers: AppManagers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f

  constructor() {
    super();
    this.classList.add(CLASS_NAME);
    this.sorted = [];
<<<<<<< HEAD
=======
    this.managers = rootScope.managers;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  }
  
  connectedCallback() {
    let set = REACTIONS_ELEMENTS.get(this.key);
    if(!set) {
      REACTIONS_ELEMENTS.set(this.key, set = new Set());
    }

    set.add(this);

    if(this.onConnectCallback && this.isConnected) {
      this.onConnectCallback();
      this.onConnectCallback = undefined;
    }
  }

  disconnectedCallback() {
    const set = REACTIONS_ELEMENTS.get(this.key);
    set.delete(this);
    if(!set.size) {
      REACTIONS_ELEMENTS.delete(this.key);
    }
  }

  public getReactionCount(reactionElement: ReactionElement) {
    return this.sorted[this.sorted.indexOf(reactionElement)].reactionCount;
  }

  public getMessage() {
    return this.message;
  }

  public init(message: Message.message, type: ReactionLayoutType, isPlaceholder?: boolean) {
    if(this.key !== undefined) {
      this.disconnectedCallback();
    }

    this.message = message;
    this.key = this.message.peerId + '_' + this.message.mid;
    this.isPlaceholder = isPlaceholder;

    if(this.type !== type) {
      this.type = type;
      this.classList.add(CLASS_NAME + '-' + type);
    }

    this.connectedCallback();
  }

  public changeMessage(message: Message.message) {
    return this.init(message, this.type, this.isPlaceholder);
  }

  public update(message: Message.message, changedResults?: ReactionCount[]) {
    this.message = message;
    this.render(changedResults);
  }

  public render(changedResults?: ReactionCount[]) {
    const reactions = this.message.reactions;
    const hasReactions = !!(reactions && reactions.results.length);
    this.classList.toggle('has-no-reactions', !hasReactions);
    if(!hasReactions && !this.sorted.length) return;

<<<<<<< HEAD
    const availableReactionsResult = appReactionsManager.getAvailableReactions();
=======
    const availableReactionsResult = this.managers.appReactionsManager.getAvailableReactions();
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    // callbackify(availableReactionsResult, () => {
      const counts = hasReactions ? (
        availableReactionsResult instanceof Promise ? 
          reactions.results : 
<<<<<<< HEAD
          reactions.results.filter(reactionCount => {
            return appReactionsManager.isReactionActive(reactionCount.reaction);
=======
          reactions.results.filter((reactionCount) => {
            return this.managers.appReactionsManager.isReactionActive(reactionCount.reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          })
      ) : [];

      forEachReverse(this.sorted, (reactionElement, idx, arr) => {
        const reaction = reactionElement.reactionCount.reaction;
<<<<<<< HEAD
        const found = counts.some(reactionCount => reactionCount.reaction === reaction);
=======
        const found = counts.some((reactionCount) => reactionCount.reaction === reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        if(!found) {
          arr.splice(idx, 1);
          reactionElement.remove();
        }
      });

      const totalReactions = counts.reduce((acc, c) => acc + c.count, 0);
      const canRenderAvatars = reactions && !!reactions.pFlags.can_see_list && totalReactions < REACTION_DISPLAY_BLOCK_COUNTER_AT;
      this.sorted = counts.map((reactionCount, idx) => {
<<<<<<< HEAD
        const reactionElementIdx = this.sorted.findIndex(reactionElement => reactionElement.reactionCount.reaction === reactionCount.reaction);
=======
        const reactionElementIdx = this.sorted.findIndex((reactionElement) => reactionElement.reactionCount.reaction === reactionCount.reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        let reactionElement = reactionElementIdx !== -1 && this.sorted[reactionElementIdx];
        if(!reactionElement) {
          reactionElement = new ReactionElement();
          reactionElement.init(this.type);
        }

        positionElementByIndex(reactionElement, this, idx);
        
<<<<<<< HEAD
        const recentReactions = reactions.recent_reactions ? reactions.recent_reactions.filter(reaction => reaction.reaction === reactionCount.reaction) : [];
=======
        const recentReactions = reactions.recent_reactions ? reactions.recent_reactions.filter((reaction) => reaction.reaction === reactionCount.reaction) : [];
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        reactionElement.reactionCount = {...reactionCount};
        reactionElement.setCanRenderAvatars(canRenderAvatars);
        reactionElement.render(this.isPlaceholder);
        reactionElement.renderCounter();
        reactionElement.renderAvatars(recentReactions);
        reactionElement.setIsChosen();

        return reactionElement;
      });

      // this.sorted.forEach((reactionElement, idx) => {
      //   /* if(this.type === 'block' && this.childElementCount !== this.sorted.length) { // because of appended time
      //     idx += 1;
      //   } */

      //   positionElementByIndex(reactionElement, this, idx);
      // });

      if(!this.isPlaceholder && changedResults?.length) {
        if(this.isConnected) {
          this.handleChangedResults(changedResults);
        } else {
          this.onConnectCallback = () => {
            this.handleChangedResults(changedResults);
          };
        }
      }
    // });

    // ! тут вообще не должно быть этого кода, но пока он побудет тут
    if(!this.sorted.length && this.type === 'block') {
      const parentElement = this.parentElement;
      this.remove();

      if(parentElement.classList.contains('document-message') && !parentElement.childNodes.length) {
        parentElement.remove();
        return;
      }

      const timeSpan = this.querySelector('.time');
      if(timeSpan) {
        parentElement.append(timeSpan);
      }
    }
  }

  private handleChangedResults(changedResults: ReactionCount[]) {
    // ! temp
<<<<<<< HEAD
    if(this.message.peerId !== rootScope.peerId) return;

    changedResults.forEach(reactionCount => {
      const reactionElement = this.sorted.find(reactionElement => reactionElement.reactionCount.reaction === reactionCount.reaction);
=======
    if(this.message.peerId !== appImManager.chat.peerId) return;

    changedResults.forEach((reactionCount) => {
      const reactionElement = this.sorted.find((reactionElement) => reactionElement.reactionCount.reaction === reactionCount.reaction);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      if(reactionElement) {
        reactionElement.fireAroundAnimation();
      }
    });
  }
}

customElements.define(TAG_NAME, ReactionsElement);
