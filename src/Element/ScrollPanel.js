import { Panel } from './Panel'
// import Element from './Element'

/*

constrainToBounds : bool: if true, restricts movement to innerWidth & innerHeight
innerWidth : number: width of interior of scrollable area
innerHeight : number: height of interior of scrollable area
vertical : bool: enables (true) or disables (false) vertical scrolling
horizontal : bool: enables (true) or disables (false) horizontal scrolling

 */

/*
  TODO:
  - swag????
 */

export class ScrollPanel extends Panel {

  constructor (game, x, y, width, height, innerWidth, innerHeight) {
    super(game, x, y, width, height)
    if (innerHeight) {
      this.innerHeight = innerHeight
    } else {
      this.innerHeight = height
    }
    if (innerWidth) {
      this.innerWidth = innerWidth
    } else {
      this.innerWidth = width
    }
    this.scrollableHeight = innerHeight - height
    this.scrollableWidth = innerWidth - width
    this.deltaX = 0
    this.deltaY = 0
    this.constrainToBounds = true
    this.horizontal = true
    this.vertical = true
    this.hoverOnly = true
  }
/*
  get x () {
    return this._x
  }

  set x (value) {
    this._x = value
    this.container.displayGroup.x = value - this.container.x + this.container.parent.x + this.borderSpacingX
    // this.container.parent.x + this._x // + this.borderSpacingX not-needed???
    this.renderMask()
  }
  get y () {
    return this._y
  }
  set y (value) {
    this._y = value
    this.container.displayGroup.y = this._y - this.container.y + this.container.parent.y + this.borderSpacingY
    this.renderMask()
  }
*/
  resetScrollVars () {
    this.scrollableHeight = this.innerHeight - this.height
    if (this.scrollableHeight < 0) {
      this.scrollableHeight = this.scrollableHeight * -1
    }
    this.scrollableWidth = this.innerWidth - this.width
  }
  init () {
    super.init()
    this.renderMask()
    this.setupScrolling()
  }

  renderMask () {
    if (!this.mask) {
      this.mask = this.game.add.graphics(this.x, this.y)
      this.container.displayGroup.add(this.mask)
    } else {
      this.mask.clear()
    }
    this.mask.beginFill(0x8bc5ff, 1)
    this.mask.drawRect(0, 0, this._width, this._height)
    this.container.displayGroup.mask = this.mask
  }

  setupScrolling () {
    this.game.input.mouse.mouseWheelCallback = (event) => { this.handleScroll(event) }
  }

  handleScroll (event) {
    event.preventDefault()

    console.log('scroll:')
    console.log(event)
    var allowX = false
    var allowY = false
    var moveX = event.deltaX * -1
    var moveY = event.deltaY * -1

    if (this.hoverOnly) {
      let cx = event.clientX
      let cy = event.clientY
      let minX = this.x + this.borderWidthX
      let minY = this.Y + this.borderWidthY
      let maxX = minX + this.width + this.borderWidthX
      let maxY = minY + this.height + this.borderWidthY
      if ((cx < minX) ||
          (cx > maxX) ||
          (cy < minY) ||
          (cy > maxY)) {
        return
      }
    }

    if (this.constrainToBounds) {
      if (this.horizontal) {
        if (moveX < 0) {
          // left
          if (this.deltaX > (this.scrollableWidth * -1)) {
            allowX = true
            moveX = Math.max(moveX, (this.scrollableWidth + this.deltaX) * -1)
            this.deltaX = this.deltaX + moveX
          }
        } else {
          // right
          if (this.deltaX < 0) {
            allowX = true
            moveX = Math.min(moveX, (this.deltaX * -1))
            this.deltaX = this.deltaX + moveX
          }
        }
      }
      if (this.vertical) {
        if (moveY < 0) {
          // left
          if (this.deltaY > (this.scrollableHeight * -1)) {
            allowY = true
            moveY = Math.max(moveY, (this.scrollableHeight + this.deltaY) * -1)
            this.deltaY = this.deltaY + moveY
          }
        } else {
          // right
          if (this.deltaY < 0) {
            allowY = true
            moveY = Math.min(moveY, (this.deltaY * -1))
            this.deltaY = this.deltaY + moveY
          }
        }
      }
    } else {
      allowX = true
      allowY = true
    }
    console.log(moveX)

    this.container.children.forEach((value, index) => {
      if (allowX) { value.x = value.x + moveX }
      if (allowY) { value.y = value.y + moveY }
    })
  }
}
