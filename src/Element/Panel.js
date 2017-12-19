import Container from '../Container/Container'
import Element from './Element'

export class Panel extends Element {
  constructor (game, x, y, width, height) {
    super(game)
    this._x = x
    this._y = y
    this._offsetX = x
    this._offsetY = y
    this._width = width
    this._height = height
    this.container = null
    this.themeLoaded = false
    /*
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
    }) */

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
  }

  get x () {
    return this._x
  }
  set x (value) {
    this._x = value
    this.container.displayGroup.x = value - this.container.x + this.container.parent.x + this.borderSpacingX
    // this.container.parent.x + this._x // + this.borderSpacingX not-needed???
  }
  get y () {
    return this._y
  }
  set y (value) {
    this._y = value
    this.container.displayGroup.y = this._y - this.container.y + this.container.parent.y + this.borderSpacingY
  }

  get width () {
    return this.container.width
  }

  set width (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.panel['border-x'])
    this.resetSprites()
  }

  get height () {
    return this.container.height
  }

  set height (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.panel['border-y'])
    this.resetSprites()
  }

  loadTheme () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this.borderSpacingX = Math.round(theme.button['border-x'] / 2)
    this.borderSpacingY = Math.round(theme.button['border-y'] / 2)
    this.borderWidthX = theme.button['border-x']
    this.borderWidthY = theme.button['border-y']
  }

  setContainer (container) {
    this.container = new Container(container)
    if (!this.themeLoaded) {
      this.themeLoaded = true
      this.loadTheme()
    }
  }

  setFixedToCamera (follow) {
    this._bodySprite.fixedToCamera = follow
    this._borderSprite.fixedToCamera = follow
  }

  makePanelFollowNPC (group) {
    this._borderSprite.fixedToCamera = false
    this._bodySprite.fixedToCamera = false
    this._bodySprite.x = 38
    this._borderSprite.x = 38
    group.add(this.container.displayGroup)
  }

  init () {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')

    var x = this.container.x = this.container.parent.x + this._x
    var y = this.container.y = this.container.parent.y + this._y
    /* var width = this.container.width = Math.min(this.container.parent.width - this._x, this._width)
    var height = this.container.height = Math.min(this.container.parent.height - this._y, this._height) */
    var width = this.container.width = this._width
    var height = this.container.height = this._height
    this.container.x += Math.round(theme.panel['border-x'] / 2)
    this.container.y += Math.round(theme.panel['border-y'] / 2)
    this.container.width -= theme.panel['border-x']
    this.container.height -= theme.panel['border-y']

    this._bodySprite = this.container.displayGroup.add(this.container.root.getRenderer('panel').renderBody(width, height))
    this._borderSprite = this.container.displayGroup.add(this.container.root.getRenderer('panel').renderBorder(width, height))
    this._bodySprite.x = this._borderSprite.x = x
    this._bodySprite.y = this._borderSprite.y = y
    this._bodySprite.fixedToCamera = true
    this._borderSprite.fixedToCamera = true
    this._offsetX = x
    this._offsetY = y
    // this._groupSprite = this.container.displayGroup.add(this.game.make.sprite(0, 0, 'slick-ui-1x1'))
    // this._groupSprite.addChild(this._bodySprite)
    // this._groupSprite.addChild(this._borderSprite)
  }

  add (element) {
    let retval = this.container.add(element)
    this.container.displayGroup.bringToTop(this._borderSprite)
    return retval
  }

  destroy () {
    this.container.displayGroup.removeAll(true)
    this.container.displayGroup.destroy()
    this.container.children = []
    this.container = undefined
    this.sprite = undefined
  }

  resetSprites () {
    this._bodySprite.destroy()
    this._borderSprite.destroy()
    this.init()
    this.container.displayGroup.sendToBack(this._bodySprite)
    this.container.displayGroup.bringToTop(this._borderSprite)
  }

  setWidth (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._width = Math.round(value + theme.panel['border-x'])
    this.resetSprites()
  }

  setHeight (value) {
    var theme = this.container.root.game.cache.getJSON('slick-ui-theme')
    this._height = Math.round(value + theme.panel['border-y'])
    this.resetSprites()
  }
}
