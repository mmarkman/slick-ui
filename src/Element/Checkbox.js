import Element from './Element'

export class Checkbox extends Element {

  static get TYPE_CHECKBOX () {
    return 0
  }
  static get TYPE_RADIO () {
    return 1
  }
  static get TYPE_CROSS () {
    return 2
  }

  constructor (game, x, y, type) {
    super(game)

    // some constants
    /*
    this.TYPE_CHECKBOX = 0
    this.TYPE_RADIO = 1
    this.TYPE_CROSS = 2 */

    this._x = x
    this._y = y
    this.container = null
    this._checked = false
    this.type = type
    if (typeof type === 'undefined') {
      this.type = this.TYPE_CHECKBOX
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

    Object.defineProperty(this, 'visible', {
      get: function () {
        return this.sprite.visible
      },
      set: function (value) {
        this.sprite.visible = value
      }
    })

    Object.defineProperty(this, 'alpha', {
      get: function () {
        return this.sprite.alpha
      },
      set: function (value) {
        this.sprite.alpha = value
      }
    })

    Object.defineProperty(this, 'events', {
      get: function () {
        return this.sprite.events
      }
    })

    Object.defineProperty(this, 'input', {
      get: function () {
        return this.sprite.input
      }
    })

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.sprite.width
      },
      set: function (value) {
        this.sprite.width = value
      }
    })

    Object.defineProperty(this, 'height', {
      get: function () {
        return this.sprite.height
      },
      set: function (value) {
        this.sprite.height = value
      }
    })

    Object.defineProperty(this, 'checked', {
      get: function () {
        return this._checked
      },
      set: function (value) {
        this._checked = value
        if (value) {
          this.sprite.loadTexture(this._spriteOn.texture)
        } else {
          this.sprite.loadTexture(this._spriteOff.texture)
        }
      }
    })
  }

  setContainer (container) {
    this.container = container
  };

  init () {
    var x = this.container.x + this._x
    var y = this.container.y + this._y

    var key
    switch (this.type) {
      case this.TYPE_RADIO:
        key = 'radio'
        break
      case this.TYPE_CROSS:
        key = 'cross'
        break
      default:
        key = 'check'
        break
    }
    var sprites = this.container.root.getRenderer('checkbox').render(key)
    this.sprite = this.container.root.game.make.sprite(0, 0, sprites[0].texture)
    this.sprite.x = x
    this.sprite.y = y
    this._spriteOff = sprites[0]
    this._spriteOn = sprites[1]
    this.displayGroup = this.container.root.game.add.group()
    this.displayGroup.add(this.sprite)
    this.container.displayGroup.add(this.displayGroup)
    this.sprite.inputEnabled = true
    this.sprite.fixedToCamera = true
    this.input.useHandCursor = true

    this.events.onInputDown.add(function () {
      this.checked = !this.checked
    }, this)
  }
}
