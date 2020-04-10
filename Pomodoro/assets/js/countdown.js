// Variables
let trigger,
	seconds_pause = 0,
	minutes_pause = 0,
	seconds = 60, // Must be set on 60
	minutes = 24; // Must be set on 24

/* Start Functions */
	function startTemp() {
		trigger = setInterval(countDownSeconds, 1000);
	}

	function countDownSeconds() {
		if (seconds == 0 && minutes == 0) {
			seconds = 0;
			minutes = 0;
			stopTemp();
		} else {
			if (seconds == 0 && minutes > 0) {
				seconds = 59;
				minutes--;
			} else {
				seconds--;
			}
		}
		document.getElementById("seconds").innerHTML = seconds;
		document.getElementById("minutes").innerHTML = minutes;
		console.log(trigger);
	}
/* End Start Functions */

/* Stop Functions */
	function stopTemp() {
		clearInterval(trigger);
	}
/* End Stop Functions */

/* Stop Functions */
	function resetTemp() {
		stopTemp();
		trigger = setTimeout(reset, 1000);
	}
	function reset() {
		seconds = 60;
		minutes = 24
		document.getElementById("seconds").innerHTML = "00"; // Just label 0
		document.getElementById("minutes").innerHTML = 25; // Just label 25
	}
/* End Stop Functions */

/* Continue Functions */
	function continueTemp() {
		let time_split = new Array();
		time_split = pauseTemp();
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
			stopTemp();
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
/* Continue Functions */

function pauseTemp() {
	stopTemp();
	let timer = document.getElementById('p_time');
	let time_split = new Array();
	
	time_split = timer.outerText.split(':');

	time_split.forEach(element => {
		console.log(element);
	});
	return time_split;
}