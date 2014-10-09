var View = require('famous/core/View');
// var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var StripView = require('./StripView')
var Timer = require('famous/utilities/Timer')

var viewStore = require('../stores/ViewStore')

function _createStripViews() {
  this.stripModifiers = []
  var yOffset = this.options.topOffset

  this.options.stripData.forEach(function(item) {
    var stripView = new StripView({
      iconUrl: item.iconUrl,
      title: item.title
    })
    var stripModifier = new StateModifier({
      transform: Transform.translate(0, yOffset, 0)
    })
    this.stripModifiers.push(stripModifier)
    this.add(stripModifier).add(stripView)
    yOffset += this.options.stripOffset
  }, this)
}

function _createListeners() {
  viewStore.on('animate_strips', this.animateStrips.bind(this))
}

function MenuView() {
  View.apply(this, arguments);
  _createStripViews.call(this)
  _createListeners.call(this)
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {
  stripData: [],
  angle: -0.2,
  stripWidth: 320,
  stripHeight: 54,
  topOffset: 37,
  stripOffset: 58,
  staggerDelay: 35,
  transition: {
    duration: 400,
    curve: 'easeOut'
  }
};

MenuView.prototype.resetStrips = function resetStrips() {
  var opts = this.options
  var initX = - opts.stripWidth

  for (var i = 0; i < this.stripModifiers.length; i++) {
    var initY = opts.topOffset + (opts.stripOffset * i) +
                opts.stripWidth * Math.tan(-opts.angle)
    this.stripModifiers[i].setTransform(Transform.translate(initX, initY, 0))
  }
}

MenuView.prototype.animateStrips = function animateStrips() {
  this.resetStrips()

  var transition = this.options.transition
  var delay = this.options.staggerDelay
  var stripOffset = this.options.stripOffset
  var topOffset = this.options.topOffset

  for (var i = 0; i < this.stripModifiers.length; i++) {
    Timer.setTimeout(function(i) {
      var yOffset = topOffset + stripOffset * i
      this.stripModifiers[i].setTransform(
        Transform.translate(0, yOffset, 0), transition)
    }.bind(this, i), i * delay)
  }
}

module.exports = MenuView;
