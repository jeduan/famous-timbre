var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var HeaderFooter = require('famous/views/HeaderFooterLayout')
var ImageSurface = require('famous/surfaces/ImageSurface')
require('famous/inputs/FastClick')

var ViewActions = require('../actions/ViewActions')

function _createLayout() {
  this.layout = new HeaderFooter({
    headerSize: this.options.headerSize
  })

  var layoutModifier = new StateModifier({
    transform: Transform.translate(0, 0, 0.1)
  })

  this.add(layoutModifier).add(this.layout)
}

function _createHeader() {
  var backgroundSurface = new Surface({
    properties: {
      backgroundColor: 'black'
    }
  })

  var backgroundModifier = new StateModifier({
    transform: Transform.behind
  })

  this.layout.header.add(backgroundModifier).add(backgroundSurface)

  this.hamburgerSurface = new ImageSurface({
    size: [44, 44],
    content: 'img/hamburger.png'
  })

  var hamburgerModifier = new StateModifier({
    origin: [0, 0.5],
    align: [0, 0.5]
  })

  var searchSurface = new ImageSurface({
    size: [232, 44],
    content: 'img/search.png'
  })

  var searchModifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  })

  var iconSurface = new ImageSurface({
    size: [44, 44],
    content: 'img/icon.png'
  })

  var iconModifier = new StateModifier({
    origin: [1, 0.5],
    align: [1, 0.5]
  })

  this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface)
  this.layout.header.add(searchModifier).add(searchSurface)
  this.layout.header.add(iconModifier).add(iconSurface)
}

function _createBody() {
  this.bodySurface = new ImageSurface({
    size: [undefined, true],
    content: 'img/body.png'
  })
  this.layout.content.add(this.bodySurface)
}

function _setListeners() {
  this.hamburgerSurface.on('click', function() {
    ViewActions.toggleMenu({animateStripsIfOpened: true})
  })

  this.bodySurface.pipe(this._eventOutput)
}

function _createBacking() {
  var backing = new Surface({
    properties: {
      backgroundColor: 'black',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    }
  })
  this.add(backing)
}

function PageView() {
  View.apply(this, arguments);

  _createBacking.call(this)
  _createLayout.call(this)
  _createHeader.call(this)
  _createBody.call(this)
  _setListeners.call(this)
}

PageView.prototype = Object.create(View.prototype);
PageView.prototype.constructor = PageView;

PageView.DEFAULT_OPTIONS = {
  headerSize: 44
};

module.exports = PageView;
