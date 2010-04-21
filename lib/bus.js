/* Bus handles communication between different parts of the app */

App.bus = {
	cache: {},
	// Get data from the app and cache it, ie Date, Lang
	get: function(obj, params) {
		try {
			var data;
			if(this.cache[obj]) {
				return this.cache[obj];
			}
			else {
				data = App.data[obj];
				if(typeof data === "function") {
					data = data();
				}
				
				this.cache[obj] = data;	
				return data;
			}
		}
		catch(err) {
			App.log('App.bus.get failed: ' + err.message);
		}
	},
	listen: function(event) {
		var sender = event.sender,
			name = event.name,
			callback = event.callback;
		// TODO: remove duplication in conditional
		if(sender in this.listeners) {
			this.listeners[sender][name] = callback;
		}
		else {
			this.listeners[sender] = {};
			this.listeners[sender][name] = callback;
		}
	},
	listeners: {},
	notify: function(name, msg) {
		if(name in App.config.messages && typeof msg === App.config.messages[name].toLowerCase()) {
			if(name in this.listeners) {
				for(callback in this.listeners[name]) {
					this.listeners[name][callback](msg);
				};
			}
		}
	},
	// Request data asynchronously
	request: function() {
	
	}
};