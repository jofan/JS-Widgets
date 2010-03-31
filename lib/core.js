
var App = {
  log: function(msg) {
    if(window.console && window.console.log) {
      console.log(msg);
    }
  },
  // Set up namespace for widgets
  widget: {}
};