// *************************   POPUPS   ************************* //

// show notification or profile popup
const controls = document.querySelectorAll('[data-controls]');

function unfocus() {
    for (let control of controls) {
        control.classList.remove('focus')
    }

    for (let popups of document.querySelectorAll('[data-visible]')) {
        popups.setAttribute('data-visible', "false")
    }
}

for (let control of controls) {
    control.addEventListener('click', (e) => {
        e.stopPropagation();

        let popup = document.querySelector(`.${control.getAttribute('data-controls')}`);
        let popupState = popup.getAttribute('data-visible');

        if (popupState == "false") {
            unfocus();
            control.classList.add('focus');
            popup.setAttribute('data-visible', "true");
        } else {
            unfocus();
            popup.setAttribute('data-visible', "false")
        }
    })
}

// close notification and profile when user clicks outside
window.addEventListener('click', (e) => {
        if (!document.querySelector('.popups').contains(e.target)) {
            for (let popups of document.querySelectorAll('[data-visible]')) {
                popups.setAttribute('data-visible', "false")
            }
            unfocus()
        }
})

// *************************   TRIAL   ************************* //
const trialCloseBtn = document.querySelector('.pricing-close');
const trialSection = document.querySelector('.trial');

trialCloseBtn.addEventListener('click', () => {
    trialSection.style.display = 'none';
})

// *************************   ONBOARDING   ************************* //
const setupCollapse = document.querySelector('.setup__collapse');
const setup = document.querySelector('.setup__steps');
const dropIcon = document.querySelector('.setup__collapse svg');

setupCollapse.addEventListener('click', () => {
    if (setupCollapse.getAttribute('data-view') === 'collapsed') {
        setupCollapse.setAttribute('data-view', 'expanded');
        dropIcon.classList.add('flip-horizontal');
        setup.classList.add('setup__steps--visible');
    } else {
        setupCollapse.setAttribute('data-view', 'collapsed');
        dropIcon.classList.remove('flip-horizontal');
        setup.classList.remove('setup__steps--visible')
    }
})

let steps = document.querySelectorAll('.step');

for (let step of steps) {
    step.addEventListener('click', () => {
        let currentStep = document.querySelector('.step.active');
        currentStep.classList.remove('active');
        step.classList.add('active');
    })
}