
/* Const Elements
******************/ 
const otherTitleInput = document.getElementById('other-title');

const registration = {
	name: document.getElementById('name').value,
	email: document.getElementById('mail').value,
	title: () => {
		return document.getElementById('title').value !== 'other' ? document.getElementById('title').value : document.getElementById('other_title').value;
	}
};


/* Page Setup
******************/ 

// set focus on name input 
document.getElementById('name').focus();

// hide other input for job role section
otherTitleInput.style.display = 'none';


/* Event Listeners
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


