import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCList} from '@material/list/index';

const topAppBarElement = document.querySelector('.lts-top-app-bar');
MDCTopAppBar.attachTo(topAppBarElement);

const processStepsElement = document.querySelector('.lts-process-steps');
MDCList.attachTo(processStepsElement);

registerProcessStepTitleInteractions();

function registerProcessStepTitleInteractions() {
    let eventType = 'click';
    if (document.ontouchstart) {
        eventType = 'touchstart';
    }
    const titles = document.querySelectorAll('.lts-process-step-title');
    for (const title of titles) {
        title.addEventListener(eventType, processTitleInteraction, false);
    }
}

function processTitleInteraction(ev) {
    if (ev) {
        // Find the title element that is a parent of the element that the user interacted with.
        const title = ev.target.closest('.lts-process-step-title');
        if (title) {
            // Adding or removing the lts-collapse class controls whether or not the details of
            // the process step is visible or not (through CSS).
            title.classList.toggle('lts-collapse');

            updateAngleIcon(title);
        } else {
            console.error('No title element found');
        }

        // Prevent touch-enabled browsers from firing a mouse event 300ms after a touch event.
        ev.preventDefault();
    } else {
        console.error('No interaction event')
    }
    return false;
}

function updateAngleIcon(title) {
    if (title) {
        const angleIcon = title.querySelector('.lts-angle-icon');
        if (angleIcon) {
            if (title.classList.contains('lts-collapse')) {
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
