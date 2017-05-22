import Container from '../Container/Container'
import Element from '../Element/Element'
export class Button extends Element {

  constructor (game, x, y, width, height) {
    super(game)
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
  };

  setContainer (container) {
    this.container = new Container(container)
  }

  init () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')

    var x = this.container.x = this.container.parent.x + this._x
    var y = this.container.y = this.container.parent.y + this._y
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width)
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height)
    this.container.x += Math.round(theme.button['border-x'] / 2)
    this.container.y += Math.round(theme.button['border-y'] / 2)
    this.container.width -= theme.button['border-x']
    this.container.height -= theme.button['border-y']

    var renderedSprites = this.container.root.getRenderer('button').render(width, height)
    this.spriteOff = renderedSprites[0]
    this.spriteOn = renderedSprites[1]

    this.sprite = this.container.root.game.make.button(x, y)
    this.sprite.loadTexture(this.spriteOff.texture)
    this.container.displayGroup.add(this.sprite)
    this.sprite.x = x
    this.sprite.y = y
    this._offsetX = x
    this._offsetY = y
    this.sprite.fixedToCamera = true

    var hover = false
    this.sprite.events.onInputOver.add(function () { hover = true }, this)
    this.sprite.events.onInputOut.add(function () { hover = false }, this)

    this.sprite.events.onInputDown.add(function () {
      this.sprite.loadTexture(this.spriteOn.texture)
    }, this)

    this.sprite.events.onInputUp.add(function () {
      this.sprite.loadTexture(this.spriteOff.texture)
      if (!hover) {
        this.sprite.events.onInputUp.halt()
      }
    }, this)

    this.events = this.sprite.events
  };

  add (element) {
    return this.container.add(element)
  }
  setWidth (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.button['border-x'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }
  setHeight (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.button['border-y'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }
}
