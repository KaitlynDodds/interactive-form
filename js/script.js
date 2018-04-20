
/* Const Elements
******************/ 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');

const otherTitleInput = document.getElementById('other-title');

const colorSelectDiv = document.getElementById('colors-js-puns');
const colorSelect = document.getElementById('color');
const activitiesFieldset = document.querySelector('.activities');
const paymentSelect = document.getElementById('payment');

const creditCardPaymentDiv = document.getElementById('credit-card');
const paypalPaymentDiv = creditCardPaymentDiv.nextElementSibling;
const bitcoinPaymentDiv = paypalPaymentDiv.nextElementSibling;


const registration = {
	name: () => { return nameInput.value },
	email: () => { return emailInput.value },
	title: () => {
		return document.getElementById('title').value !== 'other' ? document.getElementById('title').value : document.getElementById('other_title').value;
	},
	tshirt: {
		size: () => { return document.getElementById('size').value },
		design: () => { return document.getElementById('design').value },
		color: () => { return document.getElementById('color').value }
	},
	activities: {
		total: 0,
		activities: []
	}
};

const creditCardPaymentObj = {
	type: 'credit card',
	cardNumber: () => { return document.querySelector('#cc-num').value },
	zipCode: () => { return document.querySelector('#zip').value },
	cvv: () => { return document.querySelector('#cvv').value }
}


/* Page Setup
******************/ 

// set focus on name input 
document.getElementById('name').focus();

// hide other input for job role section
hide(otherTitleInput);

// select credit card payment by default 
hideAllPaymentOptions();
paymentSelect.value = 'credit card';
show(creditCardPaymentDiv);
registration.payment = creditCardPaymentObj;

// hide color label and select 
hide(colorSelectDiv);


/* Helper Functions
*********************/

function hide(element) {
	element.style.display = 'none';
}

function show(element) {
	element.style.display = '';
}


/* Job Role 
******************/ 

// when 'other' job role selected, show other_title input
document.getElementById('title').addEventListener('change', (e) => {
	if (e.target.value === 'other') {
		otherTitleInput.style.display = '';
	} else {
		// ensure other_title input is hidden
		otherTitleInput.style.display = 'none';
	}
});


/* T-Shirt Info
******************/ 

// alter visible color options based on selected theme
document.getElementById('design').addEventListener('change', (e) => {

	function toggleVisibility(colors) {
		for (let i = 0; i < options.length; i++) {
			if (colors.indexOf(options[i].value) > -1) {
				options[i].style.display = '';
				colorSelect.value = options[i].value;
			} else {
				options[i].style.display = 'none';
			}
		}
	}

	const theme = e.target.value;
	const options = colorSelect.options;
	const jsPunsColors = ['cornflowerblue', 'darkslategrey', 'gold'];
	const heartJSColors = ['tomato', 'steelblue', 'dimgrey'];

	if (theme === 'js puns') {
		// show color menu
		show(colorSelectDiv);
		// display "Cornflower Blue," "Dark Slate Grey," and "Gold."
		toggleVisibility(jsPunsColors);
	} else if (theme === 'heart js') {
		// show color menu
		show(colorSelectDiv);
		// display "Tomato," "Steel Blue," and "Dim Grey."
		toggleVisibility(heartJSColors);
	} else {
		hide(colorSelectDiv);
	}

});


/* Register for Activities
***************************/ 

activitiesFieldset.addEventListener('change', (e) => {

	// enables and disables conflicting activities 
	function toggleConflictingEvents(deselectedLabel, conflict) {

		const labels = activitiesFieldset.querySelectorAll('label');
		for (let i = 0; i < labels.length; i++) {

			// isolate timeslot for activity
			const currentLabel = labels[i];
			const timeslot = currentLabel.querySelector('.timeslot');

			// check if timeslot is the same as conflict
			if (timeslot && 
				currentLabel !== deselectedLabel &&
				timeslot.textContent.trim() === conflict 
				) {
				// check if timeslot is already disabled 
				if (currentLabel.classList.contains('disabled')) {
					// enable checkbox
					currentLabel.querySelector('input').disabled = false;
					currentLabel.classList.remove('disabled');
				} else {
					// disable conflicting label
					currentLabel.querySelector('input').disabled = true;
					currentLabel.className = 'disabled';
				}
			} 
		}
	}

	if (e.target.type === 'checkbox') {
		const label = e.target.parentNode;	
		const activities = registration.activities.activities;

		const price = label.querySelector('.price');
		const timeslot = label.querySelector('.timeslot');
		const activity = (label.textContent.split(' — '))[0].trim();

		// event info object
		const eventObj = {
			time: (timeslot ? timeslot.textContent : null),
			price: (price ? parseInt(price.textContent) : null),
			event: (activity ? activity : null)
		}
		

		if (e.target.checked) {
			// add event info to activities arr 
			activities.push(eventObj);

			// disable conflicting events 
			if (timeslot) {
				toggleConflictingEvents(label, timeslot.textContent.trim());
			}

		} else {
			// remove event info from activities arr 
			for (let i = 0; i < activities.length; i++) {
				if (eventObj.activity === activities[i].activity && 
					eventObj.time === activities[i].time
					) {
					
					// events match, remove from activities arr
					activities.splice(i, 1);

					// remove disabled styling from all related events 
					toggleConflictingEvents(label, eventObj.time);
				}
			}
		}

	}
});


/* Payment Info
********************/ 

// hide all payment options 
function hideAllPaymentOptions() {
	hide(creditCardPaymentDiv);
	hide(paypalPaymentDiv);
	hide(bitcoinPaymentDiv);
}

function setPaymentType(paymentType) {
	registration.payment = {
		type: paymentType
	}
}

//respond to change events on payment options select
paymentSelect.addEventListener('change', (e) => {

	if (e.target.value === 'credit card') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show credit card payment div
		show(creditCardPaymentDiv);
		// record payment type
		registration.payment = creditCardPaymentObj;
	} else if (e.target.value === 'paypal') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show paypal payment div
		show(paypalPaymentDiv);
		// record payment type
		setPaymentType(e.target.value);		
	} else if (e.target.value === 'bitcoin') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show bitcoin payment div
		show(bitcoinPaymentDiv);
		// record payment type
		setPaymentType(e.target.value);
	} else {
		// hide all payment divs
		hideAllPaymentOptions();
		// record payment type
		setPaymentType(e.target.value);
	}


});


/* Form Validation
**********************/ 

function isEmail(email) {
	// check for precense of '@'
	var re = /\S+@\S+/;
    return re.test(email);
}

// adds error styling to input and related label
function displayInputError(input, errMsg = '') {
	input.className = 'br-error';
	input.previousElementSibling.className = 'error';
	input.previousElementSibling.insertAdjacentHTML('beforeend', `<span> ${errMsg}</span>`);
}

function removeInputError(input, msg = '') {
	const label = input.previousElementSibling;

	input.classList.remove('br-error');
	label.classList.remove('error');

	const span = label.querySelector('span');
	label.removeChild(span);
}

// add error styling to fieldset legend
function displayFieldsetError(legend, errMsg) {
	legend.insertAdjacentHTML('beforeend', `<span class="error sm-error"><br>${errMsg}</span>`);
}

function removeFieldsetError(legend) {
	const spanError = legend.querySelector('span');
	legend.removeChild(spanError);
}

function removeAllErrorStyling() {
	const errorElements = document.querySelectorAll('.error');
	for (let i = 0; i < errorElements.length; i++) {
		// remove error class from all
		errorElements[i].classList.remove('error');

		if (errorElements[i].tagName === 'LABEL') {
			// remove input error styling
			const input = errorElements[i].nextElementSibling;
			removeInputError(input);
		} else if (errorElements[i].tagName === 'SPAN') {
			// remove fieldset error styling
			const parent = errorElements[i].parentNode;
			removeFieldsetError(parent);
		}
	}
}

document.querySelector('button').addEventListener('click', (e) => {
	// stop page reload
	e.preventDefault();

	if (e.target.type === 'submit') {

		removeAllErrorStyling();
		
		// Name field can't be blank
		if (registration.name().length === 0) {
			displayInputError(nameInput, '(please provide a valid email)');
		}

		// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
		if (!isEmail(registration.email())) {
			displayInputError(emailInput, '(please provide a name)');
		}

		// t-shirt theme must be selected 
		if (registration.tshirt.design() === 'Select Theme') {
			displayFieldsetError(document.querySelector('fieldset.shirt legend'), 'Don\'t forget to pick a T-Shirt');
		}

		// Must select at least one checkbox under the "Register for Activities" section of the form.
		if (registration.activities.activities.length === 0) {
			displayFieldsetError(document.querySelector('fieldset.activities legend'), 'Please select an Activity');
		}

		if (registration.payment.type !== 'select_method') {
			// If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
			if (registration.payment.type === 'credit card') {
				
				// Credit card field should only accept a number between 13 and 16 digits
				if (!(registration.payment.cardNumber().length >= 13 && 
					registration.payment.cardNumber().length <= 16)) {
					displayInputError(document.querySelector('#cc-num'));
				}

				// The zipcode field should accept a 5-digit number
				if (registration.payment.zipCode().length !== 5) {
					displayInputError(document.querySelector('#zip'));
				}

				// The CVV should only accept a number that is exactly 3 digits long
				if (registration.payment.cvv().length !== 3) {
					displayInputError(document.querySelector('#cvv'));
				}
			}
		} else {
			// no payment option selected
			displayFieldsetError(document.querySelector('fieldset.payment-info legend'), 'Please select a payment option');
		}

	}

});
























