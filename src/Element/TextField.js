import Phaser from 'phaser'
import Container from '../Container/Container'
import {TextObj} from './Text'

export class TextField {
  constructor (game, x, y, width, height, maxChars, targetDivID, textFieldID) {
    this.game = game
    this.targetDivID = targetDivID
    this.textFieldID = textFieldID
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
      onKeyPress: new Phaser.Signal(),
      onKeyboard: new Phaser.Signal()
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
  updateText (textVal) {
    this.value = textVal
    this.text.text.text = this.value
    this.events.onKeyPress.dispatch(this.value)
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
    input.setAttribute('class', 'hiddenTextBox')
    input.oninput = () => {
      this.value = input.value
      this.text.text.text = this.value
      this.events.onKeyPress.dispatch(this.value)
      /* input.blur()
      input.focus() */
    }
    input.onblur = () => {
      this.events.onToggle.dispatch(false)
      this.events.onKeyboard.dispatch(false)
    }
    input.onsubmit = () => {
      this.events.onOK.dispatch()
    }
    input.alpha = 0
    input.style.width = 0
    input.style.height = 0
    if (this.textFieldID) {
      input.setAttribute('id', this.textFieldID)
    }

    if (this.targetDivID) {
      let target = document.getElementById(this.targetDivID)
      // target.insertBefore(input, target.firstChild)
      var containerDiv = document.createElement('div')
      containerDiv.className = 'textFieldContainer'
      containerDiv.appendChild(input)
      document.body.insertBefore(containerDiv, target)
    } else {
      document.body.appendChild(input)
    }
    /* this.game.input.onDown.add((pointer) => {
      if (!pointer.isMouse) {
        this.events.onKeyboard.dispatch(true)
      }
    }) */
    this.sprite.events.onInputDown.add((event) => {
      console.log(event)
      if (this.sprite.input.pointerDown) {
        this.events.onKeyboard.dispatch(true)
      }
      this.events.onToggle.dispatch(true)
      input.focus()
    })
    this.inputElement = input
    this.game.canvas.addEventListener('touchstart', (event) => {
      this.game.canvas.focus()
    }, false)

    this.text = this.add(new TextObj(this.game, 8, 0, 'A')) // We put in a character to center it correctly
    this.text.centerVertically()
    this.text.text.text = this.value
  };

  add (element) {
    return this.container.add(element)
  };

}
