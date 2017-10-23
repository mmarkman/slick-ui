
import { ScrollPanel } from './ScrollPanel'

// indices are zero-based
// 0, 1, 2, etc, i

export class VerticalList extends ScrollPanel {

  constructor (game, x, y, width, height) {
    super(game, x, y, width, height, width, height)
    this.length = 0
    this.contentHeight = 0
    this.spacing = 5
    this.items = []
  }

  insertItem (item) {
    this.addItemAtIndex(item, 0)
  }

  addItemAtIndex (item, index) {
    item = this.add(item)
    if (index === this.items.length) {
      item.y = this.contentHeight += this.spacing
    }
    item._x = 8
    item.width = this.width - 24
    this.items.splice(index, 0, item)
    this.length = this.items.length
    this.contentHeight += item.height
    if (this.length > 1) {
      this.contentHeight += this.spacing
    }
    this.innerHeight = this.contentHeight
    console.log(this.contentHeight)
    console.log(this.innerHeight)
    this.resetScrollVars()
// this.container.children
    /* for (let i = 0; i <= (this.length - 1); i++) {
      if (i < index) {
        // do I need this?
      } else if (i === index) {
        if (this.items[i + 1]) {
          this.items.y = this.items[i + 1].y
        }
      } else {
        this.items[i].y += item.height + this.spacing
      }
    } */
    for (let i = index; i <= (this.length - 1); i++) {
      if (i === index) {
        if (this.items[i + 1]) {
          this.items[i].y = this.items[i + 1].y
        }
      } else {
        this.items[i].y += item.height + this.spacing
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
