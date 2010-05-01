// TODO: See Resig's microtemplates on how to implement inputting dynamic values.

App.template = {
  calendar: '\
<div class="calendar">\
	<table>\
		<caption>\
			<a href="#" class="navLink prevMonth">Prev</a>\
			{month} {year}\
			<a href="#" class="navLink nextMonth">Next</a>\
		</caption>\
		<thead>\
			<tr>{weekdays}</tr>\
		</thead>\
		<tbody>\
			{days}\
		</tbody>\
	</table>\
</div>',
  timeout: '\
<div class="overlay timeoutWarning">\
	<p class="timeoutMsg"></p>\
	<p><input type="button" class="resetTimer" value="OK" /> <input type="button" class="cancelTimer" value="Ignore" /></p>\
</div>'
};

