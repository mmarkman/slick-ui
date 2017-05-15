import Container from '../Container/Container'
import Element from './Element'

export class Panel extends Element {
  constructor (x, y, width, height) {
    super()
    this._x = x
    this._y = y
    this._offsetX = x
    this._offsetY = y
    this._width = width
    this._height = height
    this.container = null
    Object.defineProperty(this, 'width', {
      get: super.getWidth,
      set: this.setWidth
    })
    Object.defineProperty(this, 'height', {
      get: super.getHeight,
      set: this.setHeight
    })
  }

  setContainer (container) {
    this.container = new Container(container)
  }

  init () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')

    var x = this.container.x = this.container.parent.x + this._x
    var y = this.container.y = this.container.parent.y + this._y
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width)
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height)
    this.container.x += Math.round(theme.panel['border-x'] / 2)
    this.container.y += Math.round(theme.panel['border-y'] / 2)
    this.container.width -= theme.panel['border-x']
    this.container.height -= theme.panel['border-y']

    this._sprite = this.container.displayGroup.add(this.container.root.getRenderer('panel').render(width, height))
    this._sprite.x = x
    this._sprite.y = y
    this._sprite.fixedToCamera = true
    this._offsetX = x
    this._offsetY = y
  }

  add (element) {
    return this.container.add(element)
  };

  destroy () {
    this.container.displayGroup.removeAll(true)
    this.container.displayGroup.destroy()
    this.container.children = []
    this.container = undefined
    this.sprite = undefined
  }

  setWidth (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.panel['border-x'])
    this._sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this._sprite)
  }

  setHeight (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.panel['border-y'])
    this._sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this._sprite)
  }
}
