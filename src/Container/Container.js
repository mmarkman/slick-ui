export default class Container {

  constructor (parent) {
    this.root = null
    if (!(parent instanceof Container)) {
      this.root = parent
      parent = null
    }
    this.parent = parent
    this.children = []
    if (parent) {
      this.root = parent.root
      this.displayGroup = this.root.game.add.group()
      parent.displayGroup.add(this.displayGroup)
      this.x = parent.x
      this.y = parent.y
      this.width = parent.width
      this.height = parent.height
    } else {
      this.displayGroup = this.root.game.add.group()
      this.x = 0
      this.y = 0
      this.width = this.root.game.width
      this.height = this.root.game.height
    }
  };

    /**
     * Add an element to the container
     *
     * @param element
     * @returns SlickUI.Container.Container
     */
  add (element, childIndex) {
    if (!childIndex) {
      childIndex = this.children.length
    }
    element.setContainer(this)
    if (typeof element.init === 'function') {
      element.init()
    }
    this.root.game.world.bringToTop(this.displayGroup)

    this.children.splice(childIndex, 0, element)

    return element // Allows chaining
  };
}
