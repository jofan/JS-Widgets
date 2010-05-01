App.widget.Calendar = function() {
	this.dateObj = App.bus.get('DATE');
	this.langObj = App.bus.get('LANG');
	this.isBuilt = false;
	this.isVisible = false;
	this.attachInputEvent();
};

App.widget.Calendar.prototype = {
	// Properties
 	constructor: App.widget.Calendar,
	daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	
	// Model
	isLeapYear: function(year) {
		if(parseInt(year)%4 === 0 || parseInt(year)%100 === 0 || parseInt(year)%400 === 0) {
			return true;
		}
		else {
			return false;
		}
	},
	setDateInfo: function(year, month, selectedDay) {
		var calendarSize = 35;
		this.prevOverlap, this.nextOverlap = 0;
		this.day = selectedDay || null;
		this.month = month;
		this.year = year;
		this.firstDayInMonth = new Date(year, month, 1).getDay();
		this.isLeapYear(year) ? this.daysPerMonth[1] = 29 :	this.daysPerMonth[1] = 28;
		this.daysInMonth = this.daysPerMonth[month];
		
		if(this.firstDayInMonth === 6 && this.daysInMonth === 31) {
				calendarSize = 42;
		}
		else if(this.firstDayInMonth === 0 && this.daysInMonth > 29) {
			calendarSize = 42;
		}
		
		if(this.month === 0) {
			this.daysInPreviousMonth = this.daysPerMonth[11];
		}
		else {
			this.daysInPreviousMonth = this.daysPerMonth[month - 1];
		}
		
		if(this.firstDayInMonth === 0) {
			this.prevOverlap = this.daysInPreviousMonth - 5;
		}
		else if(this.firstDayInMonth !== 1) {
			this.prevOverlap = this.daysInPreviousMonth - (this.firstDayInMonth - 2);
		}
		
		if(this.firstDayInMonth !== 0) {
			this.nextOverlap = calendarSize - (this.daysInMonth + (this.firstDayInMonth - 1));
		}
		else {
			this.nextOverlap = calendarSize - (this.daysInMonth + (6));
		}

	},
	attachCalendarEvents: function() {
	  var self = this;
	  this.calendar.click(function(e) {
			e.preventDefault();
			var ele = $(e.target);
			if(ele[0].tagName === "TD" && !$(ele).hasClass('extraDay')) {
				var day = ele.text();
				self.insertDate(day);		
			}
			else if(ele.hasClass('nextMonth')) {
				self.navNext();
			}
			else if(ele.hasClass('prevMonth')) {
				self.navPrev();
			}
		});
		App.bus.notify('eventsAttached', 'Calendar ready');
	},
	attachInputEvent: function() {
		var self = this;
		$(document).click(function(e) {
			var ele = $(e.target);
			if(ele.hasClass("wgtCalendar")) {
				if(!self.isBuilt) {
				  self.build();
				  self.reset();
				  self.attachCalendarEvents();
				  self.isBuilt = true;
				}
				self.show(ele);
			}
			else if(self.isVisible) {
			  var calendar = ele.closest('.calendar');
			  if(calendar[0] === undefined && !(ele.hasClass('navLink'))) {
			    self.hide();
			  }
			}
		});
		$(document).keypress(function(e) {
		  var ele = $(e.target);
		  if(ele.hasClass("wgtCalendar")) {
				if(!self.isBuilt) {
				  self.build();
				  self.reset();
				  self.attachCalendarEvents();
				  self.isBuilt = true;
				}
				else {
				  self.reset();
				}
				self.show(ele);
			}
		});
	},
	
	// Controller
	/*  Creates the outer div.calendar which is the element we will hide and show.
	*   Only called once.
	*/
	build: function() {
		this.calendar = $('<div class="calendar"></div>'); // App.template.calendar
		this.hide();
		$(document.body).append(this.calendar);
	},
	/* Navigates between months, one at a time */
	navNext: function() {
		if(this.month === 11) {
			this.setDateInfo((this.year + 1), 0);
		}
		else {
			this.setDateInfo(this.year, (this.month + 1));
		}
		this.update();
	},
	navPrev: function () {
		if(this.month === 0) {
			this.setDateInfo((this.year - 1), 11);
		}
		else {
			this.setDateInfo(this.year, (this.month - 1));
		}
		this.update();
	},
	/*  Reset internal date (to todays date) and updates markup */
	reset: function() {
		this.setDateInfo(this.dateObj.year, this.dateObj.month);
		this.update();
	},
	/* Replaces current markup so that it reflects current internal date */
	update: function() {
		this.calendar.html('');
		var table = $('<table cellpadding="2"></table>');
		var captionStr = '<caption><a href="#" class="prevMonth navLink">&larr;</a>' + this.langObj.months[this.month] + ' ' + this.year + '<a href="#" class="nextMonth navLink">&rarr;</a></caption>';
		var caption = $(captionStr);
		var head = $('<thead></thead>');
		var headRow = $('<tr></tr>');
		var body = $('<tbody></tbody>');
		var cells = "<tr>";
		for(var wd=0; wd < 7; wd++) {
			headRow.append('<th>' + this.langObj.weekdays_short[wd] + '</th>');
		}
		var i = 1;
		// Loop through array that contains days from previous month
		// Add class "extraDay" to these
		var d = ((this.firstDayInMonth - 1) < 0 ? 6 : (this.firstDayInMonth - 1));
		for(var p=0; p < d; p++) {
			cells += "<td class='extraDay'>" + this.prevOverlap + "</td>";
			this.prevOverlap++;
			i++;
		}
		
		// Loop through the actual days in this month
		for(var c=1; c <= this.daysInMonth; c++) {
			if(c === this.dateObj.date && this.month === this.dateObj.month && this.year === this.dateObj.year) {
				cells += "<td class='today'>" + c + "</td>";
			}
			else if(!!this.day && c === this.day) {
				cells += "<td class='selected'>" + c + "</td>";
			}
			else {
				cells += "<td>" + c + "</td>";
			}
			if(i%7 === 0 && c < 31) {
				cells += "</tr><tr>";
			}
			i++;
		}
			
		// Loop through array that contains days from next month
		// Add class "extraDay" to these
		for(var n=1; n <= this.nextOverlap; n++) {
			cells += "<td class='extraDay'>" + n + "</td>";
			i++;
		}
		
		cells += "</tr>";
		body.append($(cells));
		head.append(headRow);
		table.append(caption);
		table.append(head);
		table.append(body);
		this.calendar.append(table);
	},

	// View
	/*  Hides div.calendar and call reset */
	hide:function() {
		this.calendar.hide();
		this.reset();
		this.isVisible = false;
	},
	/*  Inserts chosen date into input field, and calls hide() */
	insertDate: function(day) {
		var format = this.langObj.date_format,
			insertDay = (day.length < 2 ? ("0" + day) : day),
			insertMonth = (((this.month + 1) + '').length < 2 ? "0" + (this.month + 1) : (this.month + 1)),
			chosenDate = insertDay + '.' + insertMonth + '.' + this.year,
			formattedDate = format.replace('dd', insertDay),
			formattedDate = formattedDate.replace('mm', insertMonth),
			formattedDate = formattedDate.replace('YYYY', this.year);
		this.input.val(formattedDate);
		this.hide();
	},
	/*  Displays div.calendar, position based on related input element
	    @param {string} ctrl The related input field as an jQuery object
	*/
	show: function(ctrl) {
	  	var pos = ctrl.position(),
			date = ctrl.val(),
			format;
		this.input = ctrl;
		if(date !== ''){
			format = this.langObj.date_format;
			var matchDay = (/dd/).exec(format);
			var matchMonth = (/mm/).exec(format);
			var matchYear = (/YYYY/).exec(format);
			var day = date.substring(matchDay.index, matchDay.index + 2);
			var month = date.substring(matchMonth.index, matchMonth.index + 2);
			var year = date.substring(matchYear.index, matchYear.index + 4);
			this.setDateInfo(parseInt(year), parseInt(month - 1), parseInt(day));
			this.update();
		}
		this.calendar.css({left: pos.left, top: pos.top + 25});
		this.calendar.show();
		this.isVisible = true;
		App.bus.notify('openCal', 'Calendar opended');
	}
};