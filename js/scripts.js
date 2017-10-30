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
const otherJobRoleField = document.createElement('input');
otherJobRoleField.type = "text";
otherJobRoleField.placeholder = "Your job role";
otherJobRoleField.id = "other-title";

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
const idDesign = document.getElementById('design');

// select for colors
const idColor = document.getElementById('color');
let colorArray = [];

createColorList();

idDesign.addEventListener('change', function() {
    if (idDesign.options[idDesign.selectedIndex].value === "select theme") {
        removeOptions();
        for (let j = 0; j < colorArray.length; j++) {
            idColor.appendChild(colorArray[j]);
        }
    } else if (idDesign.options[idDesign.selectedIndex].value === "js puns") {
        removeOptions();
        for (let k = 0; k < colorArray.length; k++) {
            if (colorArray[k].text.includes("JS Puns shirt only")) {
                idColor.appendChild(colorArray[k]);
            }
        }
    } else if (idDesign.options[idDesign.selectedIndex].value === "heart js") {
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

function matchCheck(checkbox, dateTime) {
    if (checkbox.checked === true && checkbox.parentElement.innerHTML.includes(dateTime)) {
        checkMatchingDateTime(dateTime, checkbox);
    }
    if (checkbox.checked === false && checkbox.parentElement.innerHTML.includes(dateTime)) {
        reverseMatchingDateTime(dateTime, checkbox);
    }
}

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

registerButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (formName.value === '') {
        formName.style.borderWidth = '2px';
        formName.style.borderColor = 'red';
    } else {
        formName.value = '';
        formName.style.borderWidth = 'initial';
        formName.style.borderColor = '#c1deeb';
    }
});
































