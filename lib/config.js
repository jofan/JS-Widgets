/* =====================================================
*
* Namespaces: App.config
*
* This file handles code registration and runs the app.
* It should be included last among your javascript files
*
* ====================================================== */

App.config = {
	messages: {
		// Calendar
		openCal: 'string',
		eventsAttached: 'string'
	},
	defaults: {
		init: function() {
			App.settings.language = App.cookie.get('lang') || 'EN';
			App.bus.listen({
				name: 'default init',
				sender: 'eventsAttached',
				callback: function(msg) { App.log(msg); } 
			});
		}
	},
	calendar: {
		init: function() {
			App.test.runJSpec('../spec/unit/spec_calendar.js');
			// TODO: remove
			App.bus.listen({
				sender: 'openCal',
				name: 'calendar init',
				callback: function(msg) { App.log(msg); } 
			});
			// var Cal = new App.widget.Calendar();
		}
	},
	timeout: {
		init: function() {
			App.test.runJSpec('../spec/unit/spec_timeout.js');
			// var Timeout = new App.widget.Timeout(120, 30);
		}
	}
};

//Last function defined... run the app!
App.config.run = function() {
	var page = document.getElementById('pageName');
	// Set cookie to test
	// TODO: remove
	App.cookie.set('lang', 'SE');
	App.config.defaults.init();
	if(!!page) {
		var val = page.value;
		App.config[val].init();
	}
}();