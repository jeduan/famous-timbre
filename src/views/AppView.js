var View = require('famous/core/View');
// var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing')
var PageView = require('./PageView')
var MenuView = require('./MenuView')
var stripData = require('../data/StripData')

function AppView() {
  View.apply(this, arguments);
  this.pageView = new PageView()
  this.pageModifier = new StateModifier()
  this.pageView.on('menuToggle', this.toggleMenu.bind(this))

  this.add(this.pageModifier).add(this.pageView)

  this.menuView = new MenuView({stripData: stripData})
  var menuModifier = new StateModifier({
    transform: Transform.behind
  })

  this.add(menuModifier).add(this.menuView)
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.prototype.toggleMenu = function() {
  if (this.menuToggle) {
    this.slideLeft()
  } else {
    this.slideRight()
  }
  this.menuToggle = !this.menuToggle
}

AppView.prototype.slideRight = function() {
  this.pageModifier.setTransform(
    Transform.translate(this.options.openPosition, 0, 0),
    this.options.transition)
}

AppView.prototype.slideLeft = function() {
  this.pageModifier.setTransform(
    Transform.translate(0, 0, 0),
    this.options.transition)
}

AppView.DEFAULT_OPTIONS = {
  openPosition: 276,
  transition: {
    duration: 300,
    curve: Easing.inOutBack
  }
};

module.exports = AppView;
