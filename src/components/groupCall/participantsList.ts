/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import positionElementByIndex from "../../helpers/dom/positionElementByIndex";
import replaceContent from "../../helpers/dom/replaceContent";
import { fastRaf } from "../../helpers/schedulers";
import SortedList, { SortedElementBase } from "../../helpers/sortedList";
import { GroupCallParticipant } from "../../layer";
import appDialogsManager, { DialogDom, AppDialogsManager } from "../../lib/appManagers/appDialogsManager";
<<<<<<< HEAD
import { LazyLoadQueueIntersector } from "../lazyLoadQueue";
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
import { getGroupCallParticipantMutedState } from ".";
import GroupCallParticipantMutedIcon from "./participantMutedIcon";
import GroupCallParticipantStatusElement from "./participantStatus";
import type GroupCallInstance from "../../lib/calls/groupCallInstance";
<<<<<<< HEAD

interface SortedParticipant extends SortedElementBase {
  dom: DialogDom,
  participant: GroupCallParticipant,
=======
import type LazyLoadQueue from "../lazyLoadQueue";

interface SortedParticipant extends SortedElementBase {
  dom: DialogDom,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  mutedIcon: GroupCallParticipantMutedIcon,
  status: GroupCallParticipantStatusElement
}

export default class GroupCallParticipantsList extends SortedList<SortedParticipant> {
  public list: HTMLUListElement;
  
<<<<<<< HEAD
  protected lazyLoadQueue: LazyLoadQueueIntersector;
=======
  protected lazyLoadQueue: LazyLoadQueue;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  protected avatarSize = 54;
  protected rippleEnabled = true;
  protected autonomous = true;
  protected createChatListOptions: Parameters<AppDialogsManager['createChatList']>[0] = {/* new: true,  */dialogSize: 72};

  constructor(private instance: GroupCallInstance) {
    super({
<<<<<<< HEAD
      getIndex: (element) => element.participant.date,
=======
      getIndex: async(element) => (await this.instance.getParticipantByPeerId(element.id)).date,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
      onDelete: (element) => {
        element.dom.listEl.remove();
        this.onElementDestroy(element);
      },
<<<<<<< HEAD
      onUpdate: (element) => {
        const {participant} = element;

=======
      onUpdate: async(element) => {
        const participant = await this.instance.getParticipantByPeerId(element.id);
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        const state = getGroupCallParticipantMutedState(participant);

        element.mutedIcon.setState(state);
        element.status.setState(state, participant);
      },
      onSort: (element, idx) => {
        positionElementByIndex(element.dom.listEl, this.list, idx);
      },
      onElementCreate: (base) => {
        const {dom} = appDialogsManager.addDialogNew({
<<<<<<< HEAD
          dialog: base.id,
          container: false,
          drawStatus: false,
=======
          peerId: base.id,
          container: false,
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
          avatarSize: this.avatarSize,
          autonomous: this.autonomous,
          meAsSaved: false,
          rippleEnabled: this.rippleEnabled,
          lazyLoadQueue: this.lazyLoadQueue
        });

        const className = 'group-call-participant';
        dom.listEl.classList.add(className);

<<<<<<< HEAD
        const participant = instance.participants.get(base.id);
        const mutedState = getGroupCallParticipantMutedState(participant);

        const mutedIcon = new GroupCallParticipantMutedIcon(true);
        const status = new GroupCallParticipantStatusElement(['presentation', 'video']);
        
        mutedIcon.setState(mutedState);
        status.setState(mutedState, participant);

        replaceContent(dom.lastMessageSpan, status.container);
        dom.listEl.append(mutedIcon.container);

        (base as SortedParticipant).dom = dom;
        (base as SortedParticipant).participant = participant;
        (base as SortedParticipant).mutedIcon = mutedIcon;
        (base as SortedParticipant).status = status;

=======
        const mutedIcon = new GroupCallParticipantMutedIcon(true);
        const status = new GroupCallParticipantStatusElement(['presentation', 'video']);
        replaceContent(dom.lastMessageSpan, status.container);
        dom.listEl.append(mutedIcon.container);
        (base as SortedParticipant).mutedIcon = mutedIcon;
        (base as SortedParticipant).status = status;

        /* instance.getParticipantByPeerId(base.id).then((participant) => {
          const mutedState = getGroupCallParticipantMutedState(participant);

          mutedIcon.setState(mutedState);
          status.setState(mutedState, participant);
        }); */
        
        (base as SortedParticipant).dom = dom;

>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
        return base as SortedParticipant;
      },
      updateElementWith: fastRaf
    });

    this.list = appDialogsManager.createChatList(this.createChatListOptions);
  }

  public destroy() {
    this.elements.forEach((element) => {
      this.onElementDestroy(element);
    });
  }

  protected onElementDestroy(element: SortedParticipant) {
    element.mutedIcon.destroy();
  }
}
