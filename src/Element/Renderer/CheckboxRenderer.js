export class CheckboxRenderer {

  constructor (game) {
    this.game = game
  }

  render (key) {
    var off = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_off')
    var on = this.game.make.sprite(0, 0, 'slick-ui-' + key + '_on')

    return [off, on]
  };
}
