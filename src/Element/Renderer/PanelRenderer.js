import Phaser from 'phaser'

export class PanelRenderer {

  constructor (game) {
    this.game = game
    this.theme = this.game.cache.getJSON('slick-ui-theme')
  }

  renderBorder (width, height) {
    if (!this.theme) {
      this.theme = this.game.cache.getJSON('slick-ui-theme')
    }

    var theme = this.theme
    var bmd = this.game.add.bitmapData(this.game.width, this.game.height)
    var panel = this.game.make.sprite(0, 0, 'slick-ui-panel')

    bmd.copyRect(panel, new Phaser.Rectangle(0, 0, theme.panel['border-x'], theme.panel['border-y'])) // Left corner
    bmd.copy(
            panel,
            theme.panel['border-x'] + 1,
            0,
            1,
            theme.panel['border-y'],
            theme.panel['border-x'],
            0,
            width - theme.panel['border-x'] * 2,
            theme.panel['border-y']
        ) // Top border

    bmd.copyRect(panel, new Phaser.Rectangle(panel.width - theme.panel['border-x'], 0, theme.panel['border-x'], theme.panel['border-y']), width - theme.panel['border-x']) // Right corner

    bmd.copy(
            panel,
            0,
            theme.panel['border-y'] + 1,
            theme.panel['border-x'],
            1,
            0,
            theme.panel['border-y'],
            theme.panel['border-x'],
            height - theme.panel['border-y'] * 2
        ) // Left border

    bmd.copy(
            panel,
            panel.width - theme.panel['border-x'],
            theme.panel['border-y'] + 1,
            theme.panel['border-x'],
            1,
            width - theme.panel['border-x'],
            theme.panel['border-y'],
            theme.panel['border-x'],
            height - theme.panel['border-y'] * 2
        ) // Right border

    bmd.copyRect(panel, new Phaser.Rectangle(0, panel.height - theme.panel['border-y'], theme.panel['border-x'], theme.panel['border-y']), 0, height - theme.panel['border-y']) // Left bottom corner
    bmd.copyRect(panel, new Phaser.Rectangle(panel.width - theme.panel['border-x'], panel.height - theme.panel['border-y'], theme.panel['border-x'], theme.panel['border-y']), width - theme.panel['border-x'], height - theme.panel['border-y']) // Right bottom corner
    bmd.copy(
            panel,
            theme.panel['border-x'] + 1,
            panel.height - theme.panel['border-y'],
            1,
            theme.panel['border-y'],
            theme.panel['border-x'],
            height - theme.panel['border-y'],
            width - theme.panel['border-x'] * 2,
            theme.panel['border-y']
        ) // Bottom border

    return this.game.make.sprite(0, 0, bmd)
/*
    var rect = this.game.add.graphics(this.x, this.y)
    rect.lineStyle(this.theme.panel.borderWidth, this.theme.color.border, 1.0)
    rect.beginFill(this.theme.color.background, 0)
    this.roundRect(rect, 0, 0, width, height, this.theme.border.radius)
    return this.game.make.sprite(0, 0, rect.generateTexture()) */
  }

  renderBody (width, height) {
    if (!this.theme) {
      this.theme = this.game.cache.getJSON('slick-ui-theme')
    }

    var theme = this.theme
    var bmd = this.game.add.bitmapData(this.game.width, this.game.height)
    var panel = this.game.make.sprite(0, 0, 'slick-ui-panel')

    bmd.copy(
            panel,
            theme.panel['border-x'],
            theme.panel['border-y'],
            1,
            1,
            theme.panel['border-x'],
            theme.panel['border-y'],
            width - theme.panel['border-x'] * 2,
            height - theme.panel['border-y'] * 2
        ) // Body

    return this.game.make.sprite(0, 0, bmd)
/*
    var rect = this.game.add.graphics(this.x, this.y)
    rect.lineStyle(this.theme.panel.borderWidth, this.theme.color.border, 0)
    rect.beginFill(this.theme.color.background, 1)
    this.roundRect(rect, 0, 0, width, height, this.theme.border.radius)
    return this.game.make.sprite(0, 0, rect.generateTexture()) */
  }

  /**
 *
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 *
 * thanks Juan Mendes! src:
 * https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 *
 * @param {Phaser.Graphics} rect The graphics object that will be drawing
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 *
  roundRect (rect, x, y, width, height, radius) {
    if (typeof radius === 'undefined') {
      radius = 5
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius}
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0}
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side]
      }
    }

    // rect.beginPath()
    rect.moveTo(x + radius.tl, y)
    rect.lineTo(x + width - radius.tr, y)
    rect.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
    rect.lineTo(x + width, y + height - radius.br)
    rect.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
    rect.lineTo(x + radius.bl, y + height)
    rect.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
    rect.lineTo(x, y + radius.tl)
    rect.quadraticCurveTo(x, y, x + radius.tl, y)
    // rect.closePath()
  } */
}
