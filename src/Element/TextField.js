import Phaser from 'phaser'
import Container from '../Container/Container'
import {TextObj} from './Text'

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
    var input = document.createElement('INPUT')
    input.setAttribute('type', 'text')
    input.onkeyPress = function () {
      this.updateText(input.value)
    }
    input.alpha = 0
    input.style.width = 0
    input.style.height = 0
    document.body.appendChild(input)
    this.sprite.events.onInputDown.add(function () {
      input.focus()
    })

    this.text = this.add(new TextObj(this.game, 8, 0, 'A')) // We put in a character to center it correctly
    this.text.centerVertically()
    this.text.text.text = this.value
  };

  updateText (textVal) {
    this.value = textVal
    this.text.text.text = this.value
    this.events.onKeyPress.dispatch(this.value)
  }

  add (element) {
    return this.container.add(element)
  };

}
