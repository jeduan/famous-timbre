var Dispatcher = require('flux').Dispatcher
var AppConstants = require('../constants')
var inherits = require('inherits')

var PayloadSources = AppConstants.PayloadSources

function AppDispatcher() {
  Dispatcher.apply(this, arguments)
}
inherits(AppDispatcher, Dispatcher)

AppDispatcher.prototype.handleViewAction = function handleViewAction(action){
  var payload = {
    source: PayloadSources.VIEW_ACTION,
    action: action
  }
  this.dispatch(payload)
}

AppDispatcher.prototype.handleServerAction = function handleServer(action) {
  var payload = {
    source: PayloadSources.SERVER_ACTION,
    action: action
  }
  this.dispatch(payload)
}

module.exports = new AppDispatcher()
