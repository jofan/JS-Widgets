App.widgets.Calendar = function() {
	this.today = new Date();
	this.today.year = this.today.getFullYear();
	this.today.month = this.today.getMonth();
	this.today.day = this.today.getDay();
	this.today.date = this.today.getDate();
};

App.widgets.Calendar.prototype = {
	constructor: App.widgets.Calendar,
	getThis: function() {
	  console.log(this);
	},
	isLeapYear: function(year) {
		if(parseInt(year)%4 === 0 || parseInt(year)%100 === 0 || parseInt(year)%400 === 0) {
			return true;
		}
		else {
			return false;
		}
	},  
	addEvents: function() {
		var self = this;
		$(document).click(function(e) {
			var ele = $(e.target);
			if(ele.hasClass("openCalendar")) {
				self.show(ele);
			}
		});
		this.calendar.click(function(e) {
			e.preventDefault();
			var ele = $(e.target);
			if(ele[0].tagName === "TD" && !$(ele).hasClass('extraDay')) {
				var day = ele.text();
				self.insertDate(day);
				self.hide();		
			}
			else if(ele.hasClass('nextMonth')) {
				self.navNext();
			}
			else if(ele.hasClass('prevMonth')) {
				self.navPrev();
			}
		});
	},
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
	reset: function() {
		this.setDateInfo(this.year, this.month);
		this.update();
	},
	setDateInfo: function(year, month, selectedDay) {
		var calendarSize = 35;
		var prevOverlap, nextOverlap = 0;
		this.month = month;
		this.year = year;
		this.firstDayInMonth = new Date(year, month, 1).getDay();
		this.daysPerMonth = App.dateInfo.daysPerMonth;
		
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
		 // Need to make a check for beginning of year
		
		if(this.firstDayInMonth === 0) {
			prevOverlap = this.daysInPreviousMonth - 5;
		}
		else if(this.firstDayInMonth !== 1) {
			prevOverlap = this.daysInPreviousMonth - (this.firstDayInMonth - 2);
		}
		
		if(this.firstDayInMonth !== 0) {
			nextOverlap = calendarSize - (this.daysInMonth + (this.firstDayInMonth - 1));
		}
		else {
			nextOverlap = calendarSize - (this.daysInMonth + (6));
		}
			
		if(!!selectedDay) {
			this.day = selectedDay;
		}
		else {
			this.day = null;
		}
	},
	update: function() {
		this.calendar.html('');
		var table = $('<table cellpadding="2"></table>');
		var captionStr = '<caption><a href="/" class="prevMonth">&larr;</a>' + App.constants[DA].MONTHS[this.month] + ' ' + this.year + '<a href="/" class="nextMonth">&rarr;</a></caption>';
		var caption = $(captionStr);
		var head = $('<thead></thead>');
		var headRow = $('<tr><th>man</th><th>tir</th><th>ons</th><th>tor</th><th>fre</th><th>lør</th><th>søn</th></tr>');
		var body = $('<tbody></tbody>');
		var cells = "<tr>";
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
			if(this.month === this.today.month && c === this.today.date) {
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

	build: function() {
		var outerDiv = $('<div class="calendar"></div>');
		this.calendar = outerDiv;
		this.hide();
		$(document.body).append(this.calendar);
		this.addEvents(); //TODO: Replace with messagesystem
	},
	hide:function() {
		
	},
	insertDate: function(day) {
		// TODO: split up into this and this
		var insertDay = (day.length < 2 ? ("0" + day) : day);
		var insertMonth = (((this.month + 1) + '').length < 2 ? "0" + (this.month + 1) : (this.month + 1));
		var chosenDate = insertDay + '.' + insertMonth + '.' + this.year;
		this.input.val(chosenDate);
	},
	show: function(ele) {
		
	}
};