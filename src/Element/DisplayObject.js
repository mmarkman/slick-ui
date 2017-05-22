import Element from '../Element/Element'
import Phaser from 'phaser'
import Container from '../Container/Container'
export class DisplayObject extends Element {

  constructor (x, y, displayObject, width, height) {
    super()
    this._x = x
    this._y = y
    this._offsetX = x
    this._offsetY = y
    this.displayObject = displayObject
    this.container = null
    this._width = width
    this._height = height
    Object.defineProperty(this, 'x', {
      get: function () {
        return this._x - this.container.parent.x
      },
      set: function (value) {
        this._x = value
        this.container.displayGroup.x = this.container.parent.x + value - this._offsetX
      }
    })

    Object.defineProperty(this, 'y', {
      get: function () {
        return this._y - this.container.parent.y
      },
      set: function (value) {
        this._y = value
        this.container.displayGroup.y = this.container.parent.y + value - this._offsetY
      }
    })

    Object.defineProperty(this, 'inputEnabled', {
      get: function () {
        return this.sprite.inputEnabled
      },
      set: function (value) {
        this.sprite.inputEnabled = value
        if (value) {
          this.input = this.sprite.input
        } else {
          this.input = null
        }
      }
    })

    Object.defineProperty(this, 'events', {
      get: function () {
        return this.sprite.events
      }
    })

// Try to avoid changing the width or height of elements.

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.container.width
      },
      set: function (value) {
        this._width = value
        this.sprite.destroy()
        this.init()
        this.container.displayGroup.sendToBack(this.sprite)
      }
    })

    Object.defineProperty(this, 'height', {
      get: function () {
        return this.container.height
      },
      set: function (value) {
        this._height = value
        this.sprite.destroy()
        this.init()
        this.container.displayGroup.sendToBack(this.sprite)
      }
    })
  };

    /**
     * Internal Container handling.
     *
     * @param container
     */
  setContainer (container) {
    this.container = Container(container)

    if (typeof this._width === 'undefined') {
      this._width = this.container.root.game.width
    }
    if (typeof this._height === 'undefined') {
      this._height = this.container.root.game.height
    }
  };

    /**
     * Initializer
     */
  init () {
    var x = this.container.x = this.container.parent.x + this._x
    var y = this.container.y = this.container.parent.y + this._y
    this.container.width = Math.min(this.container.parent.width - this._x, this._width)
    this.container.height = Math.min(this.container.parent.height - this._y, this._height)

    if (!(this.displayObject instanceof Phaser.Sprite)) {
      this.sprite = this.container.root.game.make.sprite(x, y, this.displayObject)
    } else {
      this.sprite = this.displayObject
    }
    this.container.displayGroup.add(this.sprite)
    this.sprite.x = x
    this.sprite.y = y
    this._offsetX = x
    this._offsetY = y
    this.sprite.fixedToCamera = true
  };

    /**
     * Add element to the container
     *
     * @param element
     * @returns {SlickUI.Container.Container}
     */
  add (element) {
    return this.container.add(element)
  };

}
