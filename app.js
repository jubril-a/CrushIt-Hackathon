// show notification or profile popup
const controls = document.querySelectorAll('[data-controls]');

function unfocus() {
    for (let control of controls) {
        control.classList.remove('focus')
    }
}

for (let control of controls) {
    control.addEventListener('click', (e) => {
        e.stopPropagation();
        unfocus()
        control.classList.add('focus')
        
        for (let popups of document.querySelectorAll('[data-visible]')) {
            popups.setAttribute('data-visible', "false")
        }

        let popup = document.querySelector(`.${control.getAttribute('data-controls')}`);
        let popupState = popup.getAttribute('data-visible');

        if (popupState == "false") {
            popup.setAttribute('data-visible', "true");
        } else {
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

