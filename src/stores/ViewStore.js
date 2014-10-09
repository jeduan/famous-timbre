var AppDispatcher = require('../dispatcher/AppDispatcher')
var AppConstants = require('../constants')
var EventEmitter = require('famous/core/EventEmitter')
var inherits = require('inherits')

var ActionTypes = AppConstants.ActionTypes
var CHANGE_EVENT = 'change'

var _state = {
  menuOpen: false
}

var ViewStore = new EventEmitter()

ViewStore.emitChange = function(value) {
  this.emit(CHANGE_EVENT)
}

ViewStore.addListener = function(listener) {
  this.on(CHANGE_EVENT, listener)
}

ViewStore.isMenuOpen = function() {
  return _state.menuOpen
}

ViewStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action
  switch(action.type) {
    case ActionTypes.TOGGLE_MENU:
      var previousValue = _state.menuOpen
      if (action.isOpen !== undefined)
        _state.menuOpen = action.isOpen
      else
        _state.menuOpen = !_state.menuOpen

      if (action.animateStripsIfOpened && _state.menuOpen)
        ViewStore.emit('animate_strips')

      if (previousValue !== _state.menuOpen)
        ViewStore.emitChange()
      break

    case ActionTypes.ANIMATE_STRIPS:
      ViewStore.emit('animate_strips')
      break
  }
})

module.exports = ViewStore
