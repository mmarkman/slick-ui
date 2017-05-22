import Container from '../Container/Container'
export default class Text {

  constructor (game, x, y, value, size, font, width, height) {
    this.game = game
    this._x = x
    this._y = y
    this._value = value
    this.width = width
    this.height = height
    this.font = font
    this.size = size
    this.container = null
    Object.defineProperty(this, 'x', {
      get: function () {
        return this.text.cameraOffset.x - this.container.x
      },
      set: function (value) {
        this.text.cameraOffset.x = value + this.container.x
      }
    })

    Object.defineProperty(this, 'y', {
      get: function () {
        return this.text.cameraOffset.y - this.container.y
      },
      set: function (value) {
        this.text.cameraOffset.y = value + this.container.y
      }
    })

    Object.defineProperty(this, 'alpha', {
      get: function () {
        return this.text.alpha
      },
      set: function (value) {
        this.text.alpha = value
      }
    })

    Object.defineProperty(this, 'visible', {
      get: function () {
        return this.text.visible
      },
      set: function (value) {
        this.text.visible = value
      }
    })

    Object.defineProperty(this, 'value', {
      get: function () {
        return this.text.text
      },
      set: function (value) {
        this.text.text = value
      }
    })
  };

    /**
     * Internal Container handling.
     *
     * @param container
     */
  setContainer (container) {
    this.container = new Container(container)

    if (typeof this.width === 'undefined') {
      this.width = this.container.root.game.width
    }
    if (typeof this.height === 'undefined') {
      this.height = this.container.root.game.height
    }
    if (typeof this.size === 'undefined') {
      this.size = 16
    }
  };

    /**
     * Bitmap text objects don't work too well when moved around;
     * that's why we destroy it and re-create it.
     * Feel free to improve this code.
     *
     * @param x
     * @param y
     * @param recalculateWidth
     */
  reset (x, y, recalculateWidth) {
    var width, height
    width = Math.min(this.container.width - x, this.width)
    height = Math.min(this.container.height - y, this.height)
    if (typeof this.text !== 'undefined') {
      if (recalculateWidth === false) {
        width = this.text.maxWidth
        height = this.text.maxHeight
      }
      this.text.destroy()
    }
    x += this.container.x
    y += this.container.y
    this.text = this.game.make.bitmapText(x, y, this.font, this._value, this.size)
    this.text.maxWidth = width
    this.text.maxHeight = height
    this.container.displayGroup.add(this.text)
    this.text.fixedToCamera = true
  };

    /**
     * Initialize text
     */
  init () {
    var theme = this.game.cache.getJSON('slick-ui-theme')

    if (typeof this.font === 'undefined') {
      this.font = Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1]
    }
    if (this.container) {
      this.reset(this._x, this._y)
    }
  };

    /**
     * Center the text horizontally relative to parent container
     *
     * @returns {SlickUI.Element.Text}
     */
  centerHorizontally () {
    this.text.cameraOffset.x = this.text.maxWidth / 2 - this.text.width / 2 + this.container.x
    return this
  };

    /**
     * Center the text vertically relative to parent container
     *
     * @returns {SlickUI.Element.Text}
     */
  centerVertically () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this.text.cameraOffset.y = this.container.height / 2 - this.text.height / 2 - Math.round(theme.button['border-y'] / 2) + this.container.y
    return this
  };

    /**
     * Center the text both horizontally and vertically
     *
     * @returns {SlickUI.Element.Text}
     */
  center () {
    this.centerHorizontally()
    this.centerVertically()
    return this
  };

}
