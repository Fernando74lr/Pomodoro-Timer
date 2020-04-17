// Variables
let trigger,
	on_break = false,
	seconds = 60, // Must be set on 60
	minutes = 24, // Must be set on 24
	pomodoro = 1; // 4th Pomodoro -> Long Break

// Button
let start_button = document.querySelector('#start_button'),
	reset_button = document.querySelector('#reset_button'),
	pause_button = document.querySelector('#pause_button'),
	continue_button = document.querySelector('#continue_button');

// Image
let tomato = $("#tomato_img"),
	img_detail = $("#img_detail");

// Change the quote
function changeQuote() {
	$("#quote_text").fadeOut();
	$("#quote_text").html(quotes[Math.floor(Math.random() * 25)]).fadeIn();
}

changeQuote();

// Disable buttons
reset_button.disabled = true;
pause_button.disabled = true;
continue_button.disabled = true;

// Start timer
function startTimer() {
	start_button.disabled = true;
	reset_button.disabled = false;
	pause_button.disabled = false;
	minutes = 24;  // Must be set on 24
	seconds = 60;  // Must be set on 60
	tomato.attr("src", "assets/img/focused.png");
	img_detail.attr("href", "assets/img/focused.png");
	trigger = setInterval(countDownSeconds, 1000);
}

function countDownSeconds() {
	if (seconds < 11) {
		document.getElementById("colon").innerHTML = ":0";
	}
	if (seconds == 0 && minutes == 0) {
		stopTimer();
		console.log('TIME STOPPED');
		console.log('POMODORO: ' + pomodoro);
		if (on_break) {
			on_break = false;
			backToWorkConfirmation();
		} else {
			if (pomodoro < 4) {
				breakConfirmation();
				pomodoro++;
				on_break = true;
			} else if (pomodoro == 4){
				pomodoro = 1;
				on_break = true;
				longBreakConfirmation();
			}
		}
	} else {
		if (seconds == 0 && minutes > 0) {
			document.getElementById("colon").innerHTML = ":";
			seconds = 59;
			minutes--;
			// Change the quote
			changeQuote();
			if (minutes == 0) {
				// Alert
				lastMinuteAlert("break");
			}
		} else {
			seconds--;
		}
	}
	document.getElementById("seconds").innerHTML = seconds;
	document.getElementById("minutes").innerHTML = minutes;
	console.log(trigger);
}

// Stop Functions 
function stopTimer() {
	clearInterval(trigger);
}

// Reset Functions 
function resetTimer() {
	stopTimer();
	trigger = setTimeout(reset, 1000);
}

function reset() {
	start_button.disabled = false;
	reset_button.disabled = true;
	pause_button.disabled = true;
	continue_button.disabled = true;
	pomodoro = 1;
	minutes = 24;  // Must be set on 24
	seconds = 60;  // Must be set on 60
	document.getElementById("colon").innerHTML = ":";
	document.getElementById("seconds").innerHTML = "00"; // Just label 0
	document.getElementById("minutes").innerHTML = 25; // Just label 25
}

// Continue Functions 
function continueTimer() {
	let time_split = new Array();
	time_split = pauseTimer();
	minutes = time_split[0];
	seconds = time_split[1].replace("0", "");
	console.log(minutes);
	console.log(seconds);
	//seconds = 1;
	if (seconds < 11) {
		document.getElementById("colon").innerHTML = ":0";
	} else {
		document.getElementById("colon").innerHTML = ":";
	}
	document.getElementById("seconds").innerHTML = seconds;
	document.getElementById("minutes").innerHTML = minutes;
	pause_button.disabled = false;
	continue_button.disabled = true;
	trigger = setInterval(countDownSeconds, 1000);
}

function pauseTimer() {
	stopTimer();
	pause_button.disabled = true;
	continue_button.disabled = false;
	let timer = document.getElementById('p_time');
	let time_split = new Array();

	time_split = timer.outerText.split(':');
	//console.log(`${time_split[0]}:${time_split[1]}`);
	return time_split;
}

// Break Timer
function startTimerBreak(option) {
	switch (option) {
		case 1:
			minutes = 4; // Must be set on 4
			seconds = 60; // Must be set on 60
			break;
		case 2:
			minutes = 0; // Must be set on 9
			seconds = 60; // Must be set on 60
			break;
		case 3:
			minutes = 14; // Must be set on 14
			seconds = 60; // Must be set on 60
			break;
		default:
			minutes = 4;
			seconds = 60;
			break;
	}
	start_button.disabled = true;
	reset_button.disabled = true;
	pause_button.disabled = true;
	continue_button.disabled = true;
	trigger = setInterval(countDownSeconds, 1000);
}

// Sweet Alert One minute last 
function lastMinuteAlert(nextStep) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'bottom-end',
		showConfirmButton: false,
		timer: 3500,
		timerProgressBar: true,
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
		})
		
		Toast.fire({
		icon: 'warning',
		title: `<p style='color:white;'>One minute for ${nextStep}</p>`, // Soy un crack
		background: '#204254'
	})
}

// Sweet Alert for Break
function breakConfirmation() {
	Swal.fire(
		'Break time',
		'Confirm to start the break',
		'warning'
	).then((result) => {
		if (result.value) {
			document.getElementById("colon").innerHTML = ":";
			document.getElementById("seconds").innerHTML = "00"; // Just label 0
			document.getElementById("minutes").innerHTML = "5"; // Just label 25
			startTimerBreak(1);
			tomato.attr("src", "assets/img/break.png");
			img_detail.attr("href", "assets/img/break.png");
		}
	});
}

// Sweet Alert for Long Break
function longBreakConfirmation() {
	start_button.disabled = false;
	reset_button.disabled = true;
	pause_button.disabled = true;
	continue_button.disabled = true;

	const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-success',
		cancelButton: 'btn btn-danger'
	},
	buttonsStyling: true
	})
	
	swalWithBootstrapButtons.fire({
		title: 'Nice Work! You\'ve earned it',
		text: "Choose how long you want your break",
		icon: 'success',
		showCancelButton: true,
		confirmButtonText: '+10 min',
		confirmButtonColor: '#3085d6',
		cancelButtonText: '+15 min',
		cancelButtonColor: '#3085d6'
	}).then((result) => {
	if (result.value) {
		document.getElementById("colon").innerHTML = ":";
		document.getElementById("seconds").innerHTML = "00"; // Just label 0
		document.getElementById("minutes").innerHTML = "10"; // Just label 10
		startTimerBreak(2);
		tomato.attr("src", "assets/img/long_break.png");
		img_detail.attr("href", "assets/img/long_break.png");
	} else if (
		/* Read more about handling dismissals below */
		result.dismiss === Swal.DismissReason.cancel
	) {
		document.getElementById("colon").innerHTML = ":";
		document.getElementById("seconds").innerHTML = "00"; // Just label 0
		document.getElementById("minutes").innerHTML = "15"; // Just label 15
		startTimerBreak(3);
		tomato.attr("src", "assets/img/long_break.png");
		img_detail.attr("href", "assets/img/long_break.png");
	}
	})
}

// Sweet Alert for Get Back To Work
function backToWorkConfirmation() {
	Swal.fire(
		'Back to Work',
		'Confirm to start the next pomodoro',
		'warning'
	).then((result) => {
		if (result.value) {
			document.getElementById("colon").innerHTML = ":";
			document.getElementById("seconds").innerHTML = "00"; // Just label 0
			document.getElementById("minutes").innerHTML = "25"; // Just label 25
			startTimer();
			if (pomodoro == 1) {
				tomato.attr("src", "assets/img/back_to_work.png");
				img_detail.attr("href", "assets/img/back_to_work.png");
			} else {
				tomato.attr("src", "assets/img/focused.png");
				img_detail.attr("href", "assets/img/back_to_work.png");
			}

		}
	});
}