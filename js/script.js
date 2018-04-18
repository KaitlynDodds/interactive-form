
/* Const Elements
******************/ 
const otherTitleInput = document.getElementById('other-title');
const colorSelect = document.getElementById('color');

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
	}
};


/* Page Setup
******************/ 

// set focus on name input 
document.getElementById('name').focus();

// hide other input for job role section
otherTitleInput.style.display = 'none';


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


