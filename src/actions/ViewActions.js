var AppDispatcher = require('../dispatcher/AppDispatcher')
var AppConstants = require('../constants')

var ActionTypes = AppConstants.ActionTypes

exports.toggleMenu = function(isOpen) {
  var animateStripsIfOpened

  if (typeof isOpen === 'object' && isOpen.animateStripsIfOpened) {
    isOpen = undefined
    animateStripsIfOpened = true
  }

  AppDispatcher.handleViewAction({
    type:                   ActionTypes.TOGGLE_MENU,
    isOpen:                 isOpen,
    animateStripsIfOpened:  animateStripsIfOpened
  })
}

exports.animateStrips = function() {
  AppDispatcher.handleViewAction({
    type: ActionTypes.ANIMATE_STRIPS
  })
}
