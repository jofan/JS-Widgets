
describe 'App.widget.Calendar'
  
  before
    Cal = new App.widget.Calendar()
    Cal.build()
	  Cal.reset()
	  Cal.attachCalendarEvents()
	  Cal.isBuilt = true
  end
  
  describe 'Create instance "Cal"'
    it 'should give us access to .today[year, month, day, date]' 
      var thisDate = new Date()
      var thisYear = thisDate.getFullYear()
      var thisMonth = thisDate.getMonth()
      var thisDay = thisDate.getDay()
      var thisDate = thisDate.getDate() 
      Cal.today.year.should.equal thisYear
      Cal.today.month.should.equal thisMonth
      Cal.today.day.should.equal thisDay
      Cal.today.date.should.equal thisDate
    end
  end
  
  describe '.isLeapYear(year)'
    it 'should return true if year is 2008'
      Cal.isLeapYear(2008).should.be true
      Cal.isLeapYear(2010).should.be false
    end
  end
  
  describe '.show()'
    it 'should display calendar'
      Cal.show()
    end
  end
  
  describe '.hide()'
    it 'should hide the calendar'
      Cal.show()
      Cal.hide()
    end
  end
end