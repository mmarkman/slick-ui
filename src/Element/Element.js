export default class Element {

  constructor () {
    Object.defineProperty(this, 'x', {
      get: this.getX,
      set: this.setX
    })
    Object.defineProperty(this, 'y', {
      get: this.getY,
      set: this.setY
    })
    Object.defineProperty(this, 'visible', {
      get: this.getY,
      set: this.setY
    })
    Object.defineProperty(this, 'alpha', {
      get: this.getAlpha,
      set: this.setAlpha
    })
    Object.defineProperty(this, 'width', {
      get: this.getWidth,
      set: this.setWidth
    })
    Object.defineProperty(this, 'height', {
      get: this.getHeight,
      set: this.setHeight
    })
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
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.button['border-x'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }

  getHeight () {
    return this.container.height
  }
  setHeight (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.button['border-y'])
    this.sprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this.sprite)
  }

}
