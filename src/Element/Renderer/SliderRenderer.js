export class SliderRenderer {

  constructor (game) {
    this.game = game
  }

    /**
     * Renders the slider and returns it's components as an array
     *
     * @returns Array (0: base; 1: handle off; 2: handle on)
     */
  render (size, vertical) {
    var spriteBase = this.game.make.sprite(0, 0, 'slick-ui-slider_base')
    var spriteEnd = this.game.make.sprite(0, 0, 'slick-ui-slider_end')

    var bmd = this.game.add.bitmapData(size, spriteEnd.height)
    bmd.copy(
            spriteBase,
            0,
            0,
            1,
            spriteBase.height,
            0,
            Math.round(spriteEnd.height / 4),
            size,
            spriteBase.height
        )
    bmd.copy(
            spriteEnd,
            0,
            0,
            spriteEnd.width,
            spriteEnd.height,
            0,
            0,
            spriteEnd.width,
            spriteEnd.height
        )
    bmd.copy(
            spriteEnd,
            0,
            0,
            spriteEnd.width,
            spriteEnd.height,
            size - spriteEnd.width,
            0,
            spriteEnd.width,
            spriteEnd.height
        )

    var handleOff = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_off')
    var handleOn = this.game.make.sprite(0, 0, 'slick-ui-slider_handle_on')

    spriteBase = this.game.make.sprite(0, 0, bmd)

    if (vertical) {
      spriteBase.angle = 90
    }

    return [spriteBase, handleOff, handleOn]
  };
}
