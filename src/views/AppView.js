var View = require('famous/core/View');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing')
var GenericSync = require('famous/inputs/GenericSync')
var TouchSync = require('famous/inputs/TouchSync')
var Transitionable = require('famous/transitions/Transitionable')
var Modifier = require('famous/core/Modifier')
var inherits = require('inherits')

var PageView = require('./PageView')
var MenuView = require('./MenuView')
var stripData = require('../data/StripData')
var ViewStore = require('../stores/ViewStore')
var ViewActions = require('../actions/ViewActions')

GenericSync.register({
  touch: TouchSync
})

function _createPageView() {
  this.pageView = new PageView()
  this.pageModifier = new Modifier({
    transform: function() {
      return Transform.translate(this.pageViewPos.get(), 0, 0)
    }.bind(this)
  })

  this.add(this.pageModifier).add(this.pageView)
}

function _createMenuView() {
  this.menuView = new MenuView({stripData: stripData})
  var menuModifier = new StateModifier({
    transform: Transform.behind
  })

  this.add(menuModifier).add(this.menuView)
}

function _handleSwipe() {
  var sync = new GenericSync(['touch'], {
    direction: GenericSync.DIRECTION_X
  })
  this.pageView.pipe(sync)

  sync.on('update', function(data) {
    var currentPosition = this.pageViewPos.get()
    if (currentPosition === 0 && data.velocity > 0) {
      ViewActions.animateStrips()
    }
    this.pageViewPos.set(Math.max(0, currentPosition + data.delta))
  }.bind(this))

  sync.on('end', function (data) {
    var velocity = data.velocity
    var position = this.pageViewPos.get()

    if (position > this.options.posThreshold) {
      if (velocity < -this.options.velThreshold) {
        this.slideLeft()
      } else {
        this.slideRight()
      }
    } else {
      if (velocity > this.options.velThreshold) {
        this.slideRight()
      } else {
        this.slideLeft()
      }
    }
  }.bind(this))
}

function AppView() {
  View.apply(this, arguments);

  this.pageViewPos = new Transitionable(0)

  _createPageView.call(this)
  _createMenuView.call(this)
  _handleSwipe.call(this)
  ViewStore.addListener(function() {
    if (ViewStore.isMenuOpen()) {
      this.slideRight()
    } else {
      this.slideLeft()
    }
  }.bind(this))
}
inherits(AppView, View)

AppView.prototype.slideLeft = function() {
  this.pageViewPos.set(0, this.options.transition)
}

AppView.prototype.slideRight = function() {
  this.pageViewPos.set(
    this.options.openPosition,
    this.options.transition,
    function() {
      this.menuToggle = true
    }.bind(this)
  )
}

AppView.DEFAULT_OPTIONS = {
  openPosition: 276,
  transition: {
    duration: 300,
    curve: Easing.inOutBack
  },
  posThreshold: 138,
  velThreshold: 0.75
};

module.exports = AppView;
