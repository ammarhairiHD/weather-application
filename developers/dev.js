const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navLinks = document.getElementsByClassName('nav-links')[0]
const mode = document.getElementsByClassName('switch')[0]

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    mode.classList.toggle('active')

})