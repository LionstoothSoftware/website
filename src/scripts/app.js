import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCList } from '@material/list/index';

const topAppBarElement = document.querySelector('.lts-top-app-bar');
MDCTopAppBar.attachTo(topAppBarElement);

const processElement = document.querySelector('.lts-process');
MDCList.attachTo(processElement);

registerListTitleInteractions();

/**
 * Registers an event handler on the titles of each of the steps of the startup-creation process.
 */
function registerListTitleInteractions() {
   if (document) {
      let eventType = 'click';
      if (document.ontouchstart) {
         eventType = 'touchstart';
      }
      const titles = document.querySelectorAll('.lts-process__title');
      for (const title of titles) {
         title.addEventListener(eventType, handleListTitleInteraction, false);
      }
   } else {
      console.error('Document not found. Is this a browser?');
   }
}

/**
 * Handle the event generated when someone interacts with the title of one of the startup-creation steps.
 * @param ev
 * @returns {boolean}
 */
function handleListTitleInteraction(ev) {
   if (ev) {
      // Find the title element that is a parent of the element that the user interacted with.
      const title = ev.target.closest('.lts-process__title');
      if (title) {
         // Adding or removing the lts-collapse class controls whether or not the details of
         // the process step is visible or not (through CSS).
         title.classList.toggle('lts-collapse');

         updateListTitleExpandCollapseIcon(title);
      } else {
         console.error('No title element found');
      }

      // Prevent touch-enabled browsers from firing a mouse event 300ms after a touch event.
      ev.preventDefault();
   } else {
      console.error('No title interaction event to process');
   }
   return false;
}

/**
 * Make the angle icon point up or down depending on whether the details of a step in the startup-process is
 * collapsed or not.
 *
 * @param titleElement
 */
function updateListTitleExpandCollapseIcon(titleElement) {
   if (titleElement) {
      const angleDownIcon = titleElement.querySelector('.lts-icon__angle-down');
      if (angleDownIcon) {
         const angleUpIcon = titleElement.querySelector('.lts-icon__angle-up');
         if (angleUpIcon) {
            if (titleElement.classList.contains('lts-collapse')) {
               angleDownIcon.classList.remove('lts-hidden');
               angleUpIcon.classList.add('lts-hidden');
            } else {
               angleUpIcon.classList.remove('lts-hidden');
               angleDownIcon.classList.add('lts-hidden');
            }
         } else {
            console.error('No angle-up icon element found');
         }
      } else {
         console.error('No angle-down icon element found');
      }
   } else {
      console.error('No title element found');
   }
}
