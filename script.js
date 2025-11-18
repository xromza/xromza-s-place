let button;
let contactform;
let isAnimating = false;
let fullNameInput;
let nameInput;
let emailinput;
let telinput;
let msginput;
let orginput;
let surnameinput;
let midnameinput;
let backgroundobj;

function clearFields() {
    fullNameInput.value = "";
    nameInput.value = "";
    emailinput.value = "";
    telinput.value = "";
    msginput.value = "";
    orginput.value = "";
    surnameinput.value = "";
    midnameinput.value = "";
}


function getFullName() {
    return localStorage.getItem("surname") + " " + localStorage.getItem("name") + " " + localStorage.getItem("midname");
}
function setFullName() {
    let str = surnameinput.value + " " + nameInput.value + " " + midnameinput.value;
    fullNameInput.value = str;
}
function setNameBlocks() {
    let str = fullNameInput.value;
    let first = str.indexOf(" ", 0);
    if (first !== -1) {
        localStorage.setItem("surname", str.substring(0, first));
        surnameinput.value = str.substring(0, first);
        let second = str.indexOf(" ", first + 1);
        if (second !== -1) {
            localStorage.setItem("name", str.substring(first + 1, second));
            nameInput.value = str.substring(first + 1, second);
            localStorage.setItem("midname", str.substring(second + 1));
            midnameinput.value = str.substring(second + 1);
        }
        else {
            localStorage.setItem("name", str.substring(first + 1));
            nameInput.value = str.substring(first + 1);
            localStorage.setItem("midname", "");
        }
    }
}

function setRequiredFields() {
    const isDesktop = window.matchMedia('(min-width: 48em)').matches;

    if (isDesktop) {
        fullNameInput.removeAttribute('required');

        nameInput.setAttribute('required', 'required');
        surnameInput.setAttribute('required', 'required');

    }
    else {
        fullNameInput.setAttribute('required', 'required');

        nameInput.removeAttribute('required');
        surnameInput.removeAttribute('required');

    }
}

function showContactForm() {
    if (isAnimating || contactform.classList.contains('visible')) return;
    history.pushState(null, "", "./contact");
    isAnimating = true;
    contactform.classList.add('visible');
    backgroundobj.classList.add('blurred');
    contactform.addEventListener('transitionend', () => {
        isAnimating = false;
    }, { once: true });
}

function hidebtn() {
    history.back();
    hide();
}

function hide() {
    if (isAnimating) return;
    isAnimating = true;
    contactform.classList.remove('visible');
    backgroundobj.classList.remove('blurred');
    contactform.addEventListener('transitionend', () => {
        isAnimating = false;
    }, { once: true });
}
window.addEventListener("DOMContentLoaded", function () {
    backgroundobj = this.document.getElementById("background");
    button = document.getElementById("contact-btn");
    fullNameInput = this.document.getElementById("fullname");
    surnameInput = this.document.getElementById("surname");
    nameInput = this.document.getElementById("name");
    contactform = this.document.getElementById("contact-form");
    emailinput = this.document.getElementById("email");
    telinput = this.document.getElementById("tel");
    msginput = this.document.getElementById("msg");
    orginput = this.document.getElementById("org");
    surnameinput = this.document.getElementById("surname");
    midnameinput = this.document.getElementById("midname");

    fullNameInput.value = getFullName();
    surnameinput.value = this.localStorage.getItem("surname");
    nameInput.value = this.localStorage.getItem("name");
    midnameinput.value = this.localStorage.getItem("midname");

    telinput.value = this.localStorage.getItem("tel");
    msginput.value = this.localStorage.getItem("msg");
    orginput.value = this.localStorage.getItem("org");
    emailinput.value = this.localStorage.getItem("email");

    telinput.addEventListener("change", () => {
        this.localStorage.setItem("tel", telinput.value);
    })
    msginput.addEventListener("change", () => {
        this.localStorage.setItem("msg", msginput.value);
    })
    orginput.addEventListener("change", () => {
        this.localStorage.setItem("org", orginput.value);
    })
    emailinput.addEventListener("change", () => {
        this.localStorage.setItem("email", emailinput.value);
    })
    fullNameInput.addEventListener("change", () => {
        setNameBlocks();
    })
    nameInput.addEventListener("change", () => {
        this.localStorage.setItem("name", nameInput.value);
        setFullName();
    })
    surnameinput.addEventListener("change", () => {
        this.localStorage.setItem("surname", surnameinput.value);
        setFullName();
    })
    midnameinput.addEventListener("change", () => {
        this.localStorage.setItem("midname", midnameinput.value);
        setFullName();
    })

    const isContactPage = this.window.location.pathname.endsWith('/contact');
    setRequiredFields();
    if (isContactPage) {
        showContactForm();
    }
    button.addEventListener("click", showContactForm);
    this.window.addEventListener("resize", setRequiredFields);
})
window.addEventListener('popstate', hide);  