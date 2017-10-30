/* -+-+-+-------------------------------+-+-+-
Focus On Loading
-+-+-+-------------------------------+-+-+- */

document.getElementById('name').focus();

/* -+-+-+-------------------------------+-+-+-
Job Role Section
-+-+-+-------------------------------+-+-+- */

const jobRoleFieldSet = document.getElementById('job-role-fieldset');
const jobRoleOptionList = document.getElementById('title');

// create text field for other job role
const otherJobRoleField = document.getElementById('other-title');
otherJobRoleField.remove();

// if 'other' is selected, display text field, otherwise hide
jobRoleOptionList.addEventListener('change', function() {
    const selectedOption = jobRoleOptionList.options[jobRoleOptionList.selectedIndex].value;
    if (selectedOption === "other") {
        jobRoleFieldSet.appendChild(otherJobRoleField);
    } else {
        otherJobRoleField.remove();
    }
});

/* -+-+-+-------------------------------+-+-+-
T-Shirt Info Section
-+-+-+-------------------------------+-+-+- */

// select for designs
const designContainer = document.getElementById('design-container');
const idDesign = document.getElementById('design');

// select for colors
const colorContainer = document.getElementById('colors-js-puns');
const idColor = document.getElementById('color');
let colorArray = [];

createColorList();
colorContainer.remove();

idDesign.addEventListener('change', function() {
    if (idDesign.options[idDesign.selectedIndex].value === "select theme") {
        colorContainer.remove();
        removeOptions();
        for (let j = 0; j < colorArray.length; j++) {
            idColor.appendChild(colorArray[j]);
        }
    } else if (idDesign.options[idDesign.selectedIndex].value === "js puns") {
        insertAfter(colorContainer, designContainer);
        removeOptions();
        for (let k = 0; k < colorArray.length; k++) {
            if (colorArray[k].text.includes("JS Puns shirt only")) {
                idColor.appendChild(colorArray[k]);
            }
        }
    } else if (idDesign.options[idDesign.selectedIndex].value === "heart js") {
        insertAfter(colorContainer, designContainer);
        removeOptions();
        for (let i = 0; i < colorArray.length; i++) {
            if (colorArray[i].text.includes("JS shirt only")) {
                idColor.appendChild(colorArray[i]);
            }
        }
    }
});

// HELPER METHODS
function removeOptions() {
    for (let i = idColor.options.length - 1; i >=0; i--) {
        // remove colors to start
        idColor.options[i].remove();
    }
}

function createColorList() {
    for (let i = idColor.options.length - 1; i >=0; i--) {
        colorArray.push(idColor.options[i]);
    }
    colorArray.reverse();
}

/* -+-+-+-------------------------------+-+-+-
Register for Activities Section
-+-+-+-------------------------------+-+-+- */

// get all checkboxes
const checkboxes = document.querySelectorAll('input[type=checkbox]');
let total = 0;
const totalElement = document.createElement('p');
totalElement.style.fontWeight = 'bold';
totalElement.innerHTML = 'Total:';
const registerFieldset = document.getElementById('activities-register');
let checkedArray = [];


const TUESDAY_9AM_12PM = 'Tuesday 9am-12pm';
const TUESDAY_1PM_4PM = 'Tuesday 1pm-4pm';

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
        totalSum(checkboxes[i]);
        matchCheck(checkboxes[i], TUESDAY_9AM_12PM);
        matchCheck(checkboxes[i], TUESDAY_1PM_4PM);
    });
}

// HELPER METHODS
// total cost of activities
function totalSum(checkbox) {
    if (checkbox.checked === true) {
        checkedArray.push(checkbox);
        if (checkbox.parentElement.innerHTML.includes('200')) {
            total += 200;
        } else {
            total += 100;
        }
    } else if (checkbox.checked === false) {
        let index = checkedArray.indexOf(checkbox);
        if (index > -1) {
            checkedArray.splice(index, 1);
        }
        if (checkbox.parentElement.innerHTML.includes('200')) {
            total -= 200;
        } else {
            total -= 100;
        }
    }

    if (checkedArray.length > 0) {
        totalElement.innerHTML = 'Total: $' + total;
        registerFieldset.appendChild(totalElement);
    } else {
        totalElement.remove();
    }
}

// check time clashes
function matchCheck(checkbox, dateTime) {
    if (checkbox.checked === true && checkbox.parentElement.innerHTML.includes(dateTime)) {
        checkMatchingDateTime(dateTime, checkbox);
    }
    if (checkbox.checked === false && checkbox.parentElement.innerHTML.includes(dateTime)) {
        reverseMatchingDateTime(dateTime, checkbox);
    }
}

// check matching date and time
function checkMatchingDateTime(dateTime, checkbox) {
    for (let j = 0; j < checkboxes.length; j++) {
        if (checkbox !== checkboxes[j] && checkboxes[j].parentElement.innerHTML.includes(dateTime)) {
            checkboxes[j].disabled = true;
            checkboxes[j].parentElement.style.color = '#707070';
        }
    }
}

function reverseMatchingDateTime(dateTime, checkbox) {
    for (let j = 0; j < checkboxes.length; j++) {
        if (checkbox !== checkboxes[j] && checkboxes[j].parentElement.innerHTML.includes(dateTime)) {
            checkboxes[j].disabled = false;
            checkboxes[j].parentElement.style.color = '#000';
        }
    }
}

/* -+-+-+-------------------------------+-+-+-
Payment Info Section
-+-+-+-------------------------------+-+-+- */

// payment options
const paymentList = document.getElementById('payment');
const creditCardContainer = document.getElementById('credit-card');
const paypalContainer = document.getElementById('paypal');
const bitcoinContainer = document.getElementById('bitcoin');

// make credit card selected by default
for (let i = 0; i < paymentList.options.length; i++) {
    if (paymentList.options[i].value === 'credit card') {
        paymentList.selectedIndex = i;
        creditCardContainer.style.display = 'block';
        paypalContainer.style.display = 'none';
        bitcoinContainer.style.display = 'none';
        break;
    }
}

// Change Payment Option on Selection
paymentList.addEventListener('change', function() {
    if (paymentList.options[paymentList.selectedIndex].value === 'select_method') {
        creditCardContainer.style.display = 'none';
        paypalContainer.style.display = 'none';
        bitcoinContainer.style.display = 'none';
    } else if (paymentList.options[paymentList.selectedIndex].value === 'credit card') {
        creditCardContainer.style.display = 'block';
        paypalContainer.style.display = 'none';
        bitcoinContainer.style.display = 'none';
    } else if (paymentList.options[paymentList.selectedIndex].value === 'paypal') {
        creditCardContainer.style.display = 'none';
        paypalContainer.style.display = 'block';
        bitcoinContainer.style.display = 'none';
    } else if (paymentList.options[paymentList.selectedIndex].value === 'bitcoin') {
        creditCardContainer.style.display = 'none';
        paypalContainer.style.display = 'none';
        bitcoinContainer.style.display = 'block';
    }
});

/* -+-+-+-------------------------------+-+-+-
Form Validation
-+-+-+-------------------------------+-+-+- */

const registerButton = document.getElementById('register-button');

const formName = document.getElementById('name');
const nameLabel = document.getElementById('name-label');

const formEmail = document.getElementById('mail');
const emailLabel = document.getElementById('email-label');

const registerLegend = document.getElementById('register-legend');


const selectActivityMessage = document.createElement('p');
selectActivityMessage.style.fontWeight = 'bold';
selectActivityMessage.style.color = 'red';
selectActivityMessage.innerHTML = 'Please select an Activity';
selectActivityMessage.style.marginTop = '0';

const cardNumber = document.getElementById('cc-num');
const cardNumberLabel = document.getElementById('cc-num-label');
const cardNumberMessage = document.createElement('p');
cardNumberMessage.style.fontWeight = 'bold';
cardNumberMessage.style.color = 'red';
cardNumberMessage.style.marginTop = '0';

const zipNumber = document.getElementById('zip');
const zipLabel = document.getElementById('zip-label');

const cvvNumber = document.getElementById('cvv');
const cvvLabel = document.getElementById('cvv-label');
const cvvContainer = document.getElementById('cvv-container');

// Real Time Email Validation
formEmail.addEventListener('keyup', function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value) && formEmail.value.length !== 0) {
        formEmail.style.borderColor = '#c1deeb';
        emailLabel.style.color = '#000';
        emailLabel.innerHTML = 'Email:'
    } else {
        if (formEmail.value.length === 0) {
            emailLabel.innerHTML = 'Email: (please enter an email address)';
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value))) {
            emailLabel.innerHTML = 'Email: (please provide a valid email address)';
        }
        formEmail.style.borderColor = 'red';
        emailLabel.style.color = 'red';

    }
});

// Real Time Card Number Validation
cardNumber.addEventListener('keyup', function() {
    if (/^\d*$/.test(cardNumber.value) && cardNumber.value.length > 12 && cardNumber.value.length < 17) {
        cardNumberLabel.style.color = '#000';
        cardNumberLabel.style.fontWeight = 'normal';
        cardNumberMessage.remove();
    } else {
        if (!(/^\d*$/.test(cardNumber.value))) {
            cardNumberMessage.innerHTML = 'please enter a credit card number';
            insertAfter(cardNumberMessage, cvvContainer);
        } else if (cardNumber.value.length < 13 || cardNumber.value.length > 16) {
            cardNumberMessage.innerHTML = 'please enter a number between 13 and 16 digits';
            insertAfter(cardNumberMessage, cvvContainer);
        }
        cardNumberLabel.style.color = 'red';
        cardNumberLabel.style.fontWeight = 'bold';
    }
});

registerButton.addEventListener('click', function(e) {


    // Form Name Validation
    if (formName.value === '') {
        e.preventDefault();
        formName.style.borderColor = 'red';
        nameLabel.style.color = 'red';
        nameLabel.innerHTML = 'Name: (please provide your name)';
    } else {
        formName.style.borderColor = '#c1deeb';
        nameLabel.style.color = '#000';
        nameLabel.innerHTML = 'Name:'
    }

    // Form Email Validation
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value) && formEmail.value.length !== 0) {
        formEmail.style.borderColor = '#c1deeb';
        emailLabel.style.color = '#000';
        emailLabel.innerHTML = 'Email:'
    } else {
        e.preventDefault();
        if (formEmail.value.length === 0) {
            emailLabel.innerHTML = 'Email: (please enter an email address)';
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value))) {
            emailLabel.innerHTML = 'Email: (please provide a valid email address)';
        }
        formEmail.style.borderColor = 'red';
        emailLabel.style.color = 'red';

    }

    // Register for Activities Validation
    if (checkedArray.length === 0) {
        e.preventDefault();
        insertAfter(selectActivityMessage, registerLegend);
        registerLegend.style.marginBottom = '5px';
    } else {
        selectActivityMessage.remove();
        registerLegend.style.marginBottom = '1.125em';
    }

    // Card Number Validation
    if (/^\d*$/.test(cardNumber.value) && cardNumber.value.length > 12 && cardNumber.value.length < 17) {
        cardNumberLabel.style.color = '#000';
        cardNumberLabel.style.fontWeight = 'normal';
        cardNumberMessage.remove();
    } else {
        e.preventDefault();
        if (!(/^\d*$/.test(cardNumber.value))) {
            cardNumberMessage.innerHTML = 'please enter a credit card number';
            insertAfter(cardNumberMessage, cvvContainer);
        } else if (cardNumber.value.length < 13 || cardNumber.value.length > 16) {
            cardNumberMessage.innerHTML = 'please enter a number between 13 and 16 digits';
            insertAfter(cardNumberMessage, cvvContainer);
        }
        cardNumberLabel.style.color = 'red';
        cardNumberLabel.style.fontWeight = 'bold';
    }

    // Zip Validation
    if (/^\d*$/.test(zipNumber.value) && zipNumber.value.length === 5) {
        zipLabel.style.color = '#000';
        zipLabel.style.fontWeight = 'normal';
    } else {
        e.preventDefault();
        zipLabel.style.color = 'red';
        zipLabel.style.fontWeight = 'bold';
    }

    // CVV Validation
    if (/^\d*$/.test(cvvNumber.value) && cvvNumber.value.length === 3) {
        cvvLabel.style.color = '#000';
        cvvLabel.style.fontWeight = 'normal';
    } else {
        e.preventDefault();
        cvvLabel.style.color = 'red';
        cvvLabel.style.fontWeight = 'bold';
    }
});

// HELPER METHODS
// add element after
function insertAfter(element, referenceNode) {
    referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
}
































