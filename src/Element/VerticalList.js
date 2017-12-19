
import { ScrollPanel } from './ScrollPanel'

// indices are zero-based
// 0, 1, 2, etc, i

export class VerticalList extends ScrollPanel {

  constructor (game, x, y, width, height) {
    super(game, x, y, width, height, width, height)
    this.length = 0
    this.contentHeight = 0
    this.spacing = 12
    this.items = []
  }

  insertItem (item) {
    this.addItemAtIndex(item, 0)
  }
  setFixedToCamera (follow) {
    this.mask.fixedToCamera = follow
    this._bodySprite.fixedToCamera = follow
    this._borderSprite.fixedToCamera = follow
  }

  makePanelFollowNPC (group) {
    this._borderSprite.fixedToCamera = false
    this._bodySprite.fixedToCamera = false
    this._bodySprite.x = 38
    this._borderSprite.x = 38
    this.mask.fixedToCamera = false
    this.mask.x = 38
    group.add(this.container.displayGroup)
  }

  addItemAtIndex (item, index) {
    item = this.add(item)
    if (index === this.items.length && index !== 0) {
      item._y = this.items[this.items.length - 1]._y + this.items[this.items.length - 1].height + this.spacing
    }
    item._x = 44
    item.width = this.width - 24
    this.items.splice(index, 0, item)
    this.length = this.items.length
    this.contentHeight += item.height + this.spacing
    this.innerHeight = this.contentHeight
    console.log(this.contentHeight)
    console.log(this.innerHeight)
    this.resetScrollVars()
    for (let i = index; i <= (this.length - 1); i++) {
      if (i === index) {
        if (this.items[i + 1]) {
          this.items[i]._y = this.items[i + 1]._y
        }
      } else {
        this.items[i]._y += item.height + this.spacing
      }
    }
  }

  append (item) {
    this.addItemAtIndex(item, this.length)
  }

  removeItemAtIndex () {

  }

  removeAllItems () {

  }

}
