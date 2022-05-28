export class Section {
  // constructor({ items, renderer }, containerSelector) {
  //   this._items = items;
  //   this._renderer = renderer;
  //   this._containerSelector = document.querySelector(containerSelector);
  // }
  constructor(containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
  
  // renderItems() {
  //   this._items.forEach((item) => {
  //     const element = this._renderer(item);
  //     this.addItem(element);
  //   });
  // }
}
