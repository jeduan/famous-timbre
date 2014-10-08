var View = require('famous/core/View');
// var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var StripView = require('./StripView')

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

function MenuView() {
  View.apply(this, arguments);
  _createStripViews.call(this)
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {
  stripData: [],
  topOffset: 37,
  stripOffset: 58
};

module.exports = MenuView;