import Phaser from 'phaser'
import Container from '../Container/Container'
import Text from './Text'

export class TextField {
  constructor (game, x, y, width, height, maxChars) {
    this.game = game
    if (typeof maxChars === 'undefined') {
      maxChars = 7
    }
    this._x = x
    this._y = y
    this._offsetX = x
    this._offsetY = y
    this._width = width
    this._height = height
    this.maxChars = maxChars
    this.container = null
    this.value = ''

    this.events = {
      onOK: new Phaser.Signal(),
      onToggle: new Phaser.Signal(),
      onKeyPress: new Phaser.Signal()
    }

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

    Object.defineProperty(this, 'visible', {
      get: function () {
        return this.container.displayGroup.visible
      },
      set: function (value) {
        this.container.displayGroup.visible = value
      }
    })

    Object.defineProperty(this, 'alpha', {
      get: function () {
        return this.container.displayGroup.alpha
      },
      set: function (value) {
        this.container.displayGroup.alpha = value
      }
    })

// Try to avoid changing the width or height of elements.

    Object.defineProperty(this, 'width', {
      get: function () {
        return this.container.width
      },
      set: function (value) {
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
        this._width = Math.round(value + theme.text_field['border-x'])
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
        var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
        this._height = Math.round(value + theme.text_field['border-y'])
        this.sprite.destroy()
        this.init()
        this.container.displayGroup.sendToBack(this.sprite)
      }
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
    this.container.x += Math.round(theme.text_field['border-x'] / 2)
    this.container.y += Math.round(theme.text_field['border-y'] / 2)
    this.container.width -= theme.text_field['border-x']
    this.container.height -= theme.text_field['border-y']

    this.sprite = this.container.root.game.make.sprite(x, y, this.container.root.getRenderer('text_field').render(width, height).texture)
    this.sprite.inputEnabled = true
    this.sprite.input.useHandCursor = true
    this.container.displayGroup.add(this.sprite)
    this.sprite.x = x
    this.sprite.y = y
    this._offsetX = x
    this._offsetY = y
    this.sprite.fixedToCamera = true

    /* var hover = false
    this.sprite.events.onInputOver.add(function () { hover = true }, this)
    this.sprite.events.onInputOut.add(function () { hover = false }, this) */

/*    var kb = new SlickUI.Keyboard.Keyboard(this.container.root, Object.keys(theme.fonts)[Object.keys(theme.fonts).length - 1])
    kb.group.cameraOffset.y = this.container.root.game.height
    kb.group.visible = false
    var kbAnimating = false

    this.sprite.events.onInputDown.add(function () {
      if (kbAnimating) {
        return
      }
      kbAnimating = true
      if (!kb.group.visible) {
        kb.group.visible = true
        this.container.root.game.add.tween(kb.group.cameraOffset).to({y: this.container.root.game.height - kb.height}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
          kbAnimating = false
        })
        this.events.onToggle.dispatch(true)
      } else {
        this.container.root.game.add.tween(kb.group.cameraOffset).to({y: this.container.root.game.height}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
          kbAnimating = false
          kb.group.visible = false
        })
        this.events.onToggle.dispatch(false)
      }
    }, this) */

    this.text = this.add(new Text(this.game, 8, 0, 'A')) // We put in a character to center it correctly
    this.text.centerVertically()
    this.text.text.text = this.value

    /* kb.events.onKeyPress.add(function (key) {
      if (key == 'DEL') {
        this.value = this.value.substr(0, this.value.length - 1)
      } else {
        this.value = (this.value + key).substr(0, this.maxChars)
      }
      this.text.text.text = this.value

      this.events.onKeyPress.dispatch(key)
    }, this)

    kb.events.onOK.add(function () {
      this.sprite.events.onInputDown.dispatch()

      this.events.onOK.dispatch()
    }, this) */
  };

  add (element) {
    return this.container.add(element)
  };

}
