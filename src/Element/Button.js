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
    this.themeLoaded = false
  }

  loadTheme () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this.borderSpacingX = Math.round(theme.button['border-x'] / 2)
    this.borderSpacingY = Math.round(theme.button['border-y'] / 2)
    this.borderWidthX = theme.button['border-x']
    this.borderWidthY = theme.button['border-y']
  }

  setFixedToCamera (follow) {
    this.sprite.fixedToCamera = follow
  }

  get x () {
    return this._x
  }
  set x (value) {
    this._x = value
    this.container.displayGroup.x = value - this.container.x + this.container.parent.x + this.borderSpacingX // not-needed???
  }
  get y () {
    return this._y
  }
  set y (value) {
    this._y = value
    this.container.displayGroup.y = this._y - this.container.y + this.container.parent.y + this.borderSpacingY
  }

  get visible () {
    return this.container.displayGroup.visible
  }
  set visible (value) {
    this.container.displayGroup.visible = value
  }

  get alpha () {
    return this.container.displayGroup.alpha
  }
  set alpha (value) {
    this.container.displayGroup.alpha = value
  }

  get width () {
    return this.container.width
  }
  set width (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.button['border-x'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }

  get height () {
    return this.container.height
  }
  set height (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.button['border-y'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }

  setContainer (container) {
    this.container = new Container(container)
    if (!this.themeLoaded) {
      this.themeLoaded = true
      this.loadTheme()
    }
  }

  init () {
    var x = this.container.x = this.container.parent.x + this._x
    var y = this.container.y = this.container.parent.y + this._y
    var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width)
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height)
    this.container.x += this.borderSpacingX
    this.container.y += this.borderSpacingY
    this.container.width -= this.borderWidthX
    this.container.height -= this.borderWidthY

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

}
