// *************************   POPUPS   ************************* //

// show notification or profile popup
const controls = document.querySelectorAll('[data-controls]');

function unfocus() {
    for (let control of controls) {
        control.classList.remove('focus');
        control.setAttribute('aria-expanded', 'false')
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
            control.setAttribute('aria-expanded', 'true')
        } else {
            unfocus();
            popup.setAttribute('data-visible', "false")
            control.setAttribute('aria-expanded', 'false')
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
        setupCollapse.setAttribute('aria-expanded', 'true')
        dropIcon.classList.add('flip-horizontal');
        setup.classList.add('setup__steps--visible');
    } else {
        setupCollapse.setAttribute('data-view', 'collapsed');
        setupCollapse.setAttribute('aria-expanded', 'false')
        dropIcon.classList.remove('flip-horizontal');
        setup.classList.remove('setup__steps--visible')
    }
})

let steps = document.querySelectorAll('.step');

for (let step of steps) {
    if (!step.hasAttribute('aria-expanded')) {
        step.setAttribute('aria-expanded', 'false');
    }

    step.addEventListener('click', () => {
        let currentStep = document.querySelector('.step.active');
        currentStep.classList.remove('active');
        currentStep.setAttribute('aria-expanded', 'false');
        step.classList.add('active');
        step.setAttribute('aria-expanded', 'true');
    })
}

// *************************   CIRCLE CHECKBOX BEHAVIOUR   ************************* //
const circleBtns = document.querySelectorAll('.dotted-button');
const bar = document.querySelector('.progress-bar');
let counter = 0;
const track = document.querySelector('.track');

function updateProgress() {
    track.innerText = `${counter} / 5 completed`;

    for (let span of bar.children) {
        span.style.backgroundColor = 'transparent';    
    }

    for (let i=0; i < counter; i++) {
        bar.children[i].style.backgroundColor = 'black';
    }
}

function circleAnimation(btn) {
    let svg = btn.children[0];

    let roller = document.createElementNS("http://www.w3.org/2000/svg", "path");
    roller.setAttribute("d", "M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2");
    roller.setAttribute("stroke", "#1C181D");
    roller.setAttribute("stroke-width", "2.5");
    roller.setAttribute("stroke-linecap", "round");
    roller.setAttribute("stroke-linejoin", "round");
    roller.setAttribute("id", "roller");

    svg.children[0].setAttribute('stroke', 'transparent');
    svg.appendChild(roller);
    svg.classList.add('rotate');

    transStart = () => {
        svg.removeChild(document.querySelector("#roller"));
        svg.style.display = 'none';
        let checkmark = btn.children[1];
        checkmark.style.display = 'block';
        checkmark.classList.add('show');
    }

    svg.addEventListener('transitionstart', () => {
        setTimeout(transStart, 750)
    })
}

for (let circleBtn of circleBtns) {
    const mOver = () => {
        circleBtn.children[0].children[0].removeAttribute('stroke-dasharray');
    }
    
    const mLeave = () => {
        circleBtn.children[0].children[0].setAttribute('stroke-dasharray', '4 6');
    }

    circleBtn.addEventListener('mouseover', mOver)
    circleBtn.addEventListener('mouseleave', mLeave)

    circleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        circleBtn.removeEventListener('mouseover', mOver);
        circleBtn.removeEventListener('mouseleave', mLeave)

        if (circleBtn.classList.contains('done')) {
            circleBtn.children[0].children[0].setAttribute('stroke', '#8A8A8A');
            circleBtn.children[0].classList.remove('rotate');
            circleBtn.children[1].style.display = 'none';
            circleBtn.children[1].classList.remove('show');
            circleBtn.children[0].style.display = 'block';

            circleBtn.addEventListener('mouseover', mOver)
            circleBtn.addEventListener('mouseleave', mLeave)

            circleBtn.classList.remove('done');
            counter--
            updateProgress()
        } else {
            circleAnimation(circleBtn);
            circleBtn.classList.add('done');
            counter++
            updateProgress()  
        }
    })
}