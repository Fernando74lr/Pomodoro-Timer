// Variables
let trigger,
	start = 0,
	seconds_pause = 0,
	minutes_pause = 0,
	seconds = 2, // Must be set on 60
	minutes = 1, // Must be set on 24
	pomodoro = 0; // 4th Pomodoro -> Long Break

// Change the quote
function changeQuote() {
	$("#quote_text").fadeOut();
	$("#quote_text").html(quotes[Math.floor(Math.random() * 25)]).fadeIn();
}

changeQuote();

// Start timer
function startTimer() {
	document.querySelector('#start_button').disabled = true;
	trigger = setInterval(countDownSeconds, 1000);
}

function countDownSeconds() {
	if (seconds < 11) {
		document.getElementById("colon").innerHTML = ":0";
	}
	if (seconds == 0 && minutes == 0) {
		seconds = 0;
		minutes = 0;
		stopTimer();
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
	document.querySelector('#start_button').disabled = false;
	seconds = 60;
	minutes = 24
	document.getElementById("seconds").innerHTML = "00"; // Just label 0
	document.getElementById("minutes").innerHTML = 25; // Just label 25
}

// Continue Functions 
function continueTimer() {
	let time_split = new Array();
	time_split = pauseTimer();
	minutes_pause = time_split[0];
	seconds_pause = time_split[1];
	document.getElementById("seconds").innerHTML = seconds_pause;
	document.getElementById("minutes").innerHTML = minutes_pause;
	trigger = setInterval(countDownPause, 1000);
}

function countDownPause() {
	if (seconds_pause == 0 && minutes_pause == 0) {
		seconds_pause = 0;
		minutes_pause = 0;
		stopTimer();
	} else {
		if (seconds_pause == 0 && minutes_pause > 0) {
			seconds_pause = 59;
			minutes_pause--;
		} else {
			seconds_pause--;
		}
	}
	document.getElementById("seconds").innerHTML = seconds_pause;
	document.getElementById("minutes").innerHTML = minutes_pause;
	console.log(trigger);
}

function pauseTimer() {
	stopTimer();
	let timer = document.getElementById('p_time');
	let time_split = new Array();
	
	time_split = timer.outerText.split(':');

	time_split.forEach(element => {
		console.log(element);
	});
	return time_split;
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