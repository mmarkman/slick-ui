export default class Element {

  constructor (game) {
    this.game = game
  }

  getX () {
    return this._x - this.container.parent.x
  }
  setX (value) {
    this._x = value
    this.container.displayGroup.x = this.container.parent.x + value - this._offsetX
  }
  getY () {
    return this._y - this.container.parent.y
  }
  setY (value) {
    this._y = value
    this.container.displayGroup.y = this.container.parent.y + value - this._offsetY
  }
  getVisible () {
    return this.container.displayGroup.visible
  }

  setVisible (value) {
    this.container.displayGroup.visible = value
  }

  getAlpha () {
    return this.container.displayGroup.alpha
  }
  setAlpha (value) {
    this.container.displayGroup.alpha = value
  }

    // Try to avoid changing the width or height of elements.

  getWidth () {
    return this.container.width
  }
  setWidth (value) {
    var theme = this.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.button['border-x'])
    if (this.sprite) {
      this.sprite.destroy()
    }
    this.init()
    if (this.container) {
      this.container.displayGroup.sendToBack(this.sprite)
    }
  }

  getHeight () {
    return this.container.height
  }
  setHeight (value) {
    var theme = this.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.button['border-y'])
    if (this.sprite) {
      this.sprite.destroy()
    }
    this.init()
    if (this.container) {
      this.container.displayGroup.sendToBack(this.sprite)
    }
  }

}
