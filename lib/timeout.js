
App.widget.Timeout = function(timeToExpire, timeToDisplay, countdownText, expiredText) {
  this.timeToExpire = timeToExpire;
  this.timeToDisplay = timeToDisplay;
  this.whenToDisplay = timeToExpire - timeToDisplay;
  this.countdownText = countdownText;
  this.expiredText = expiredText;
  
  this.resetTimer();
  this.attachEvents();
};

App.widget.Timeout.prototype = {
  constructor: App.widget.Timeout,
  
  // PROPERTIES
  cdTimer: null,
  hasExpired: false,
  isBuilt: false,
  
  // METHODS
  attachEvents: function() {
    var self = this;
    $(document).click(function(e) {
      var ele = $(e.target);
			if(ele.hasClass("resetTimer")) {
			  self.onClickReset();
			}
			else if(ele.hasClass("cancelTimer")) {
			  self.onClickCancel();
			}
    });
  },
  build: function() {
    this.timeoutBox = $(App.template.timeout);
    $(document.body).append(this.timeoutBox);
    this.isBuilt = true;
  },
  countdown: function() {
    var self = this,
        displayText;
    if(this.timeInSec === 0) {
      displayText = this.expiredText;
      this.hasExpired = true;
      this.timeoutBox.show();
    }
    else {
      displayText = this.countdownText.replace('{0}', this.timeInSec);
      this.timeInSec--;
      this.cdTimer = setTimeout(function() {
        self.countdown();
      }, 1000);
    }
    this.msgContainer.text(displayText);
  },
  onClickCancel: function() {
    if(this.hasExpired) {
      
    }
    else {
      this.hideWarning();
    }
  },
  onClickReset: function() {
    if(this.hasExpired) {
      
    }
    else {
      clearTimeout(this.cdTimer);
      this.resetTimer();
      this.hideWarning();
    }
  },
  resetTimer: function() {
    var self = this;
    setTimeout(function() {
     self.showWarning();
    }, this.whenToDisplay);
  },
  hideWarning: function() {
    this.timeoutBox.hide();
  },
  showWarning: function() {
    if(!this.isBuilt) {
      this.build();
    }
    this.startCountdown();
    this.timeoutBox.show();  
  },
  startCountdown: function() {
    this.timeInSec = this.whenToDisplay/1000;
    this.msgContainer = this.timeoutBox.find('.timeoutMsg');
    this.countdown();
  }
};