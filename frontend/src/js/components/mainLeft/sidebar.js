export class Sidebar {
  #dom = null;
  #menuList = [];
  constructor(menuList = []) {
    this.#menuList = menuList
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement('div')
    this.#dom.classList.add('sidebar')
    this.#menuList.forEach(menuInfo => {
      this.#dom.appendChild(new Menu(menuInfo).dom)
    })
  }

  get dom() {
    return this.#dom
  }
}

class Menu {
  #dom = null;
  #menuInfo = {};
  constructor(menuInfo) {
    this.#menuInfo = menuInfo
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('a')
    this.#dom.classList.add('menu-item')
    this.#dom.innerHTML = `
      <span>
        <i class="${this.#menuInfo.icon_class_list.join(' ')}"></i>
      </span>
      <h2>${this.#menuInfo.name}
    `
  }

  get dom() {
    return this.#dom
  }
}