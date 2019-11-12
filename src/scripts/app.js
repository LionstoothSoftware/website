import $ from 'jquery';
import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCList} from '@material/list/index';

const topAppBarElement = document.querySelector('.lts-top-app-bar');
MDCTopAppBar.attachTo(topAppBarElement);

const processStepsElement = document.querySelector('.lts-process-steps');
MDCList.attachTo(processStepsElement);

function registerProcessStepInteractions(interactionEventType) {
    // Clicking the title of the process step should change the expand/collapse icon and show/hide the description
    // of the process step below the title.

    // TODO: Figure out how to animate the visual changes to make them more appealing

    $('.lts-process-step-title').on(interactionEventType, function() {
        const $this = $(this);

        $this.toggleClass('lts-collapse');

        // Modify the collapse/expand icon
        if ($this.hasClass('lts-collapse')) {
            $this.find('i').removeClass('la-angle-up').addClass('la-angle-down');
        } else {
            $this.find('i').removeClass('la-angle-down').addClass('la-angle-up');
        }

    });
}

$(document).ready(function() {
    // Touch devices often emit click events on release rather than on touch, so try to bind to
    // the earliest event available.
    let interactionEventType = 'click';
    if (document.ontouchstart) {
        interactionEventType = 'touchstart';
    }

    registerProcessStepInteractions(interactionEventType);
});
