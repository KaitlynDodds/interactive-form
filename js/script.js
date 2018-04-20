
/* Const Elements
******************/ 
const otherTitleInput = document.getElementById('other-title');
const colorSelect = document.getElementById('color');
const creditCardPaymentDiv = document.getElementById('credit-card');
const paypalPaymentDiv = creditCardPaymentDiv.nextElementSibling;
const bitcoinPaymentDiv = paypalPaymentDiv.nextElementSibling;
const paymentSelect = document.getElementById('payment');

const registration = {
	name: () => { return document.getElementById('name').value },
	email: () => { return document.getElementById('mail').value },
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
otherTitleInput.style.display = 'none';

// select credit card payment by default 
paymentSelect.value = 'credit card';
hideAllPaymentOptions();
creditCardPaymentDiv.style.display = '';
registration.payment = creditCardPaymentObj;


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
		// display "Cornflower Blue," "Dark Slate Grey," and "Gold."
		toggleVisibility(jsPunsColors);
	} else if (theme === 'heart js') {
		// display "Tomato," "Steel Blue," and "Dim Grey."
		toggleVisibility(heartJSColors);
	}

});


/* Register for Activities
***************************/ 

document.querySelector('.activities').addEventListener('change', (e) => {

	function toggleConflictingEvents(label, conflict) {
		const labels = document.querySelector('.activities').querySelectorAll('label');
		// loop over all activity labels 
		for (let i = 0; i < labels.length; i++) {
			// isolate timeslot for activity
			const labelTimeslot = labels[i].querySelector('.timeslot');
			// check if timeslot is the same as conflict
			if (labelTimeslot && 
				labelTimeslot.textContent.trim() === conflict) {
				// timeslot conflicts
				console.log(labels[i].querySelector('input').disabled);
				if (labels[i] !== label) {
					// disable checkbox
					labels[i].querySelector('input').disabled = true;
					labels[i].style.color = "lightgrey";
				} else {
					// enabled checkbox
					labels[i].querySelector('input').disabled = false;
					labels[i].style.color = 'red';	
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
					eventObj.time === activities[i].time)
					// events match, remove from activities arr
					activities.splice(i, 1);

					// remove disabled styling from all related events 
					toggleConflictingEvents(label, eventObj.timeslot);
			}
		}

		console.log(registration.activities.activities);

	}
});


/* Payment Info
********************/ 

// hide all payment options 
function hideAllPaymentOptions() {
	creditCardPaymentDiv.style.display = 'none';
	paypalPaymentDiv.style.display = 'none';
	bitcoinPaymentDiv.style.display = 'none';
}

//respond to change events on payment options select
paymentSelect.addEventListener('change', (e) => {

	if (e.target.value === 'credit card') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show credit card payment div
		creditCardPaymentDiv.style.display = '';
		// record payment type
		registration.payment = creditCardPaymentObj;
	} else if (e.target.value === 'paypal') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show paypal payment div
		paypalPaymentDiv.style.display = '';
		// record payment type
		registration.payment = {
			type: e.target.value
		}		
	} else if (e.target.value === 'bitcoin') {
		// hide all payment divs
		hideAllPaymentOptions();
		// show bitcoin payment div
		bitcoinPaymentDiv.style.display = '';
		// record payment type
		registration.payment = {
			type: e.target.value
		}
	} else {
		// hide all payment divs
		hideAllPaymentOptions();
		// record payment type
		registration.payment = {
			type: e.target.value
		}
	}


});


/* Form Validation
**********************/ 

function isEmail(email) {
	// check for precense of '@'
	var re = /\S+@\S+/;
    return re.test(email);
}

document.querySelector('button').addEventListener('click', (e) => {
	// stop page reload
	e.preventDefault();

	if (e.target.type === 'submit') {
		
		// Name field can't be blank
		if (registration.name().length === 0) {
			console.log('name is blank');
		}

		// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
		if (!isEmail(registration.email())) {
			console.log('Invalid email');
		}

		// Must select at least one checkbox under the "Register for Activities" section of the form.
		if (registration.activities.activities.length === 0) {
			console.log('Please select an activity.');
		}

		if (registration.payment.type !== 'select_method') {
			// If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
			if (registration.payment.type === 'credit card') {
				// Credit card field should only accept a number between 13 and 16 digits
				if (registration.payment.cardNumber().length >= 13 && 
					registration.payment.cardNumber().length <= 16) {
					console.log('Credit card number is valid');
				} else {
					console.log('Credit card number is invalid');
				}

				// The zipcode field should accept a 5-digit number
				if (registration.payment.zipCode().length !== 5) {
					console.log('zip code is invalid');
				}

				// The CVV should only accept a number that is exactly 3 digits long
				if (registration.payment.cvv().length !== 3) {
					console.log('invalid cvv');
				}
			}
		} else {
			console.log('No payment option selected');
			// highlight payment option select 
		}

	}

});
























