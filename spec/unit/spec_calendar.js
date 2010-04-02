
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
    
    it 'should have a property "calendar" that refers to div.calendar object'
    	Cal.calendar.should.have_class 'calendar'
    end
  end
  
  describe '.isLeapYear(year)'
    it 'should return true if year is 2008, and false if year is 2010'
      Cal.isLeapYear(2008).should.be true
      Cal.isLeapYear(2010).should.be false
    end
  end
  
  describe '.setDateInfo(year, month, selectedDay)'
  	it 'should update the calendar\'s date info'
  		Cal.setDateInfo(2008, 3)
  		Cal.year.should.equal 2008
  		Cal.month.should.equal 3
  	end
  end
  
  describe '.update()'
  	it 'should update table with set year (2009) and month (2)'
  		Cal.setDateInfo(2009, 2)
  		Cal.update()
  		Cal.calendar.find('caption').text().should.match 'March 2009'
  	end
  end
  
  describe '.show()'
    it 'should display calendar'
      var input = $('#dateField1')
      Cal.show(input)
      Cal.calendar.should.be_visible
    end
  end
  
  describe '.hide()'
    it 'should hide the calendar'
      var input = $('#dateField1')
      Cal.show(input)
      Cal.hide()
      Cal.calendar.should.be_hidden
    end
  end
end