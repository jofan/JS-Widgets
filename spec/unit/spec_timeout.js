
describe 'App.widget.Timeout'

  before
    TO = new App.widget.Timeout(6000, 2000, 'Your session will expire in {0} seconds. Click "OK" to reset session.', 'The session has expired, you will be redirected to the login page')
  end
  
  describe ' - TO = new App.widget.Timeout()'
    it 'should have App.widget.Timeout as constructor'
      TO.constructor.should.be App.widget.Timeout
    end
    
    it 'should display message after 4 seconds'
      //tick(4000)
      //text = TO.timeoutBox.find('.timeoutMsg').text()
      //text.should.eql 'Your session will expire in 4 seconds. Click "OK" to reset session.'
    end
  end
  
  describe '.resetTimer()'
    it 'should set timer to original value'
      //TO.resetTimer()
    end
  end
  
  describe '.hideWarning()'
    it 'should hide div.timeoutWarning'
      //TO.hideWarning()
      //TO.timeoutBox.should.be_hidden
    end
  end
  
  describe '.showWarning()'
    it 'should, if not present, create div.timeoutWarning and then display it'
      //TO.showWarning()
      //TO.timeoutBox.should.be_visible
    end
  end

end