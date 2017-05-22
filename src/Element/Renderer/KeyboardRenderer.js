export class KeyboardRenderer {

  constructor (game) {
    this.game = game
  }

  render (height) {
    var bmd = this.game.make.bitmapData(this.game.width, height)
    bmd.ctx.beginPath()
    bmd.ctx.rect(0, 0, this.game.width, height)
    bmd.ctx.fillStyle = '#cccccc'
    bmd.ctx.fill()
    bmd.ctx.beginPath()
    bmd.ctx.rect(0, 2, this.game.width, height - 2)
    bmd.ctx.fillStyle = '#f0f0f0'
    bmd.ctx.fill()

    return this.game.make.sprite(0, 0, bmd)
  };
}
