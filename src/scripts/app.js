import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCList} from '@material/list/index';

const topAppBarElement = document.querySelector('.lts-top-app-bar');
MDCTopAppBar.attachTo(topAppBarElement);

const processStepsElement = document.querySelector('.lts-process-steps');
MDCList.attachTo(processStepsElement);

registerListTitleInteractions();
registerAnimations();

/**
 * Registers an event handler on the titles of each of the steps of the startup-creation process.
 */
function registerListTitleInteractions() {
    let eventType = 'click';
    if (document.ontouchstart) {
        eventType = 'touchstart';
    }
    const titles = document.querySelectorAll('.lts-process-step-title');
    for (const title of titles) {
        title.addEventListener(eventType, handleListTitleInteraction, false);
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
        const title = ev.target.closest('.lts-process-step-title');
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
        const angleIcon = titleElement.querySelector('.lts-angle-icon');
        if (angleIcon) {
            if (titleElement.classList.contains('lts-collapse')) {
                angleIcon.classList.remove('la-angle-up');
                angleIcon.classList.add('la-angle-down');
            } else {
                angleIcon.classList.remove('la-angle-down');
                angleIcon.classList.add('la-angle-up');
            }
        } else {
            console.error('No angle icon element found');
        }
    } else {
        console.error('No title element found');
    }
}

/**
 * Sets up events for animation.
 */
function registerAnimations() {
    const stepIcons = document.querySelectorAll('.lts-icon--step');
    if (stepIcons) {
        for (const stepIcon of stepIcons) {
            stepIcon.addEventListener('mouseover', triggerAnimation, false);
        }
    } else {
        console.error('No elements were found to animate');
    }
}

function triggerAnimation(ev) {
    if (ev) {
        animateCSS(ev.target, 'flip');
    } else {
        console.error('No animation event to handle')
    }
}

function animateCSS(node, animationName, callback) {
    if (node) {
        // I want the animation to happen once each time, so when the animation ends remove the animated class
        // from the element.
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName);
            node.removeEventListener('animationend', handleAnimationEnd);
            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd);
        node.classList.add('animated', animationName);
    } else {
        console.error('No element to animate')
    }
}