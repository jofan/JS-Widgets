
var App = {
  log: function(msg) {
    if(window.console && window.console.log) {
      console.log(msg);
    }
  },
  // From Professional JavaScript for Web Developers
  cookie: {
  	get: function(name) {
  		var cookieName = encodeURIComponent(name) + "=",
  			cookieStart = document.cookie.indexOf(cookieName),
  			cookieValue = null;
  		if(cookieStart > -1) {
  			var cookieEnd = document.cookie.indexOf(";", cookieStart);
  			if(cookieEnd == -1) {
  				cookieEnd = document.cookie.length;
  			}
  			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
  		}
  		return cookieValue;
  	},
  	set: function(name, value, expires, path, domain, secure) {
  		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  		if(expires instanceof Date) {
  			cookieText += "; expires=" + expires.toGMTString();
  		}
  		if(path) { cookieText += "; path=" + path; }
  		if(domain) { cookieText += "; domain=" + domain; }
  		if(secure) { cookieText += "; secure"; }
  		document.cookie = cookieText;
  	},
  	unset: function(name, path, domain, secure) {
  		this.set(name, "", new Date(0), path, domain, secure);
  	}	
  },
  
  /* -------------------------------------------------
  * @description: Internal App data to be used by 
  *	widgets and other parts of the app. 
  * @return: object
  * -------------------------------------------------- */
  data: {
  	DATE: function() {
  		var today = new Date();
  		return {
  			year: today.getFullYear(),
  			month: today.getMonth(),
  			day: today.getDay(),
  			date: today.getDate()
  		}
  	},
  	LANG: function() {
  		var lang = App.settings.language;
  		if(lang === 'DK') {
  			return {
  				date_format: 'dd.mm.YYYY',
  				months: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
  				today: 'i dag',
  				weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
  				weekdays_short: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn']
  			}
  		}
  		else if(lang === 'SE') {
  			return {
  				date_format: 'dd-mm-YYYY',
  				months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
  				today: 'idag',
  				weekdays: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
  				weekdays_short: ['Mån', 'Tir', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
  			}
  		}
  		else {
  			return {
  				date_format: 'mm/dd/YYYY',
  				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  				today: 'today',
  				weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  				weekdays_short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  			}
  		}
  		
  	}
  },
  
  lang: {
  	
  },
  
  msg: {},
  
  settings: {
  	language: 'EN'
  },
  
  // Set up namespace for widgets
  widget: {}
};