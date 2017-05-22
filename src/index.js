
import { ButtonRenderer } from './Element/Renderer/ButtonRenderer'
import { PanelRenderer } from './Element/Renderer/PanelRenderer'
import { CheckboxRenderer } from './Element/Renderer/CheckboxRenderer'
import Container from './Container/Container'
import { Panel } from './Element/Panel'
import { Button } from './Element/Button'
import { TextObj } from './Element/Text'
import { DisplayObject } from './Element/DisplayObject'
// import { Slider } from './Element/Slider'
import { TextField } from './Element/TextField'
import { Checkbox } from './Element/Checkbox'
import { TextFieldRenderer } from './Element/Renderer/TextFieldRenderer'

export default class SlickUI {

  constructor (game) {
    this._name = 'SlickUI'

    this.Container = Container
    this.Panel = Panel
    this.Button = Button
    this.Text = TextObj
    this.DisplayObject = DisplayObject
    this.Checkbox = Checkbox
    this.TextField = TextField
    // this.Slider = Slider

    this.game = game
    this.defaultRenderer = {
      'button': new ButtonRenderer(game),
      'panel': new PanelRenderer(game),
      'checkbox': new CheckboxRenderer(game),
      'text_field': new TextFieldRenderer(game)

      /*,
            "checkbox": "SlickUI.Element.Renderer.CheckboxRenderer",
            "panel": "SlickUI.Element.Renderer.PanelRenderer",
            "slider": "SlickUI.Element.Renderer.SliderRenderer",
            "text_field": "SlickUI.Element.Renderer.TextFieldRenderer",
            "keyboard": "SlickUI.Element.Renderer.KeyboardRenderer",
            "key": "SlickUI.Element.Renderer.KeyRenderer" */
    }
  }
  get name () {
    return this._name
  }
  load (theme) {
    this.container = new Container(this)

    var themePath = theme.replace(/\/[^/]+$/, '/')
    this.game.load.json('slick-ui-theme', theme)
    this.game.load.resetLocked = true
    this.game.load.start()
    var isQueued = false
    var queueAssets = function () {
      if (!this.game.cache.checkJSONKey('slick-ui-theme') || isQueued) {
        return
      }
      this.theme = this.game.cache.getJSON('slick-ui-theme')
      for (var k in this.theme.images) {
        this.game.load.image('slick-ui-' + k, themePath + this.theme.images[k])
      }
      for (k in this.theme.fonts) {
        this.game.load.bitmapFont(k, themePath + this.theme.fonts[k][0], themePath + this.theme.fonts[k][1])
      }
      isQueued = true
      this.game.load.onFileComplete.remove(queueAssets)
    }
    this.game.load.onFileComplete.add(queueAssets, this)
  };

  add (element) {
    return this.container.add(element)
  }

  getRenderer (name) {
    return this.defaultRenderer[name]
    /*
    if (typeof this.renderer[name] !== 'undefined') {
      return this.renderer[name]
    }
    var theme = this.game.cache.getJSON('slick-ui-theme')
    var resolveObject = function (name) {
      var namespace = name.split('.')
      var context = window
      for (var i in namespace) {
        context = context[namespace[i]]
      }
      return context
    }

    if (typeof theme.renderer === 'undefined' || typeof theme.renderer[name] === 'undefined') {
      if (typeof this.defaultRenderer[name] === 'undefined') {
        throw new Error('Trying to access undefined renderer \'' + name + '\'.')
      }
      return this.renderer[name] = new (resolveObject(this.defaultRenderer[name]))(this.game)
    }
    return this.renderer[name] = new (resolveObject(theme.renderer[name]))(this.game) */
  }

}
