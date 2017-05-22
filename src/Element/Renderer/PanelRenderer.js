import Phaser from 'phaser'
export class PanelRenderer {

  constructor (game) {
    this.game = game
  }

  render (width, height) {
    var theme = this.game.cache.getJSON('slick-ui-theme')
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
  };
}
