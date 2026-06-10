export class FriendList {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement("div")
    this.#dom.classList.add('friend-list')
    this.#info.forEach(item_info => {
      this.#dom.appendChild(new Friend(item_info).dom)
    })
  }

  get dom() {
    return this.#dom
  }
}

class Friend {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement("div")
    this.#dom.classList.add('profile')
    this.#dom.innerHTML = `
      <div class="profile-photo">
        <img alt="profile photo" src="${this.#info.src}">
      </div>
      <div class="profile-description">
        <h2>${this.#info.name}</h2>
        <p>${this.#info.msg}</p>
      </div>
    `
  }

  get dom() {
    return this.#dom
  }
}