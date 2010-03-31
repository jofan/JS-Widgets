App.widget.calendar = function() {
  var today = new Date();
  this.year = today.getFullYear();
  this.month = today.getMonth();
  this.day = today.getDay();
  this.date = today.getDate();
};

App.widget.calendar.prototype = {
  model: {}
};