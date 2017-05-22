import Container from '../Container/Container'
import Phaser from 'phaser'
export class Slider {
  constructor (game, x, y, size, value, vertical) {
    this.game = game
    this._x = x
    this._y = y
    this._size = size
    this._value = value
    this._vertical = vertical === true
    this.container = null
    if (typeof value === 'undefined') {
      this._value = 1
    }
    if (this._vertical) {
      this._value = Math.abs(this._value - 1)
    }
    Object.defineProperty(this, 'x', {
      get: function () {
        return this.displayGroup.x + this._x
      },
      set: function (value) {
        this.displayGroup.x = value - this._x
      }
    })

    Object.defineProperty(this, 'y', {
      get: function () {
        return this.displayGroup.y + this._y
      },
      set: function (value) {
        this.displayGroup.y = value - this._y
      }
    })

    Object.defineProperty(this, 'alpha', {
      get: function () {
        return this.displayGroup.alpha
      },
      set: function (value) {
        this.displayGroup.alpha = value
      }
    })

    Object.defineProperty(this, 'visible', {
      get: function () {
        return this.displayGroup.visible
      },
      set: function (value) {
        this.displayGroup.visible = value
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
  }

    /**
     * Adds the slider and makes it interactable
     */
  init () {
    this.onDragStart = new Phaser.Signal()
    this.onDrag = new Phaser.Signal()
    this.onDragStop = new Phaser.Signal()
    this.displayGroup = this.game.add.group()

    var x = this.container.x + this._x
    var y = this.container.y + this._y
    var position = this._vertical ? y : x
    var modulatingVariable = this._vertical ? 'y' : 'x'
    var size = Math.min(this.container.width - this._x, this._size)
    if (this._vertical) {
      size = Math.min(this.container.height - this._y, this._size)
    }
    var initialPosition = Math.min(1, Math.max(0, this._value)) * size + position

    var renderedSprites = this.container.root.getRenderer('slider').render(size, this._vertical)
    var spriteBase = renderedSprites[0]
    var handleOff = renderedSprites[1]
    var handleOn = renderedSprites[2]
    spriteBase.x = x
    spriteBase.y = y

    var spriteHandle = this.container.root.game.make.sprite(this._vertical ? x : initialPosition, this._vertical ? initialPosition : y, handleOff.texture)
    spriteHandle.anchor.setTo(0.5)

    if (this._vertical) {
      spriteHandle.angle = 270
    }
    spriteBase.fixedToCamera = true
    spriteHandle.fixedToCamera = true
    spriteHandle.inputEnabled = true
    spriteHandle.input.useHandCursor = true
    var dragging = false

    var getValue = function () {
      var value = (spriteHandle.cameraOffset[modulatingVariable] - position) / size
      if (this._vertical) {
        value = Math.abs(value - 1)
      }
      return value
    }

    spriteHandle.events.onInputDown.add(function () {
      spriteHandle.loadTexture(handleOn.texture)
      dragging = true
      this.onDragStart.dispatch(getValue.apply(this))
    }, this)
    spriteHandle.events.onInputUp.add(function () {
      spriteHandle.loadTexture(handleOff.texture)
      dragging = false
      this.onDragStop.dispatch(getValue.apply(this))
    }, this)

    this.container.root.game.input.addMoveCallback(function (pointer, pointerX, pointerY) {
      if (!dragging) {
        return
      }
      var _pos = (this._vertical ? pointerY : pointerX) - this.displayGroup[modulatingVariable]
      spriteHandle.cameraOffset[modulatingVariable] = Math.min(position + size, Math.max(position, _pos - this.container.displayGroup[modulatingVariable]))
      this.onDrag.dispatch(getValue.apply(this))
    }, this)

    this.displayGroup.add(spriteBase)
    this.displayGroup.add(spriteHandle)
    this.container.displayGroup.add(this.displayGroup)
  };

}
