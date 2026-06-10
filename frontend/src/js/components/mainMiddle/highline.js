export class Highline {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('highline');
    this.#info.forEach(item => {
      this.#dom.appendChild(new Descritpion(item).dom)
    })
  }

  get dom() {
    return this.#dom
  }
}

class Descritpion {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('description');
    this.#dom.style.backgroundImage = `url(${this.#info.background})`
    this.#dom.innerHTML = `
      <div class="profile-photo">
        <img src="${this.#info.img_src}" alt="profile photo">
      </div>
      <p>${this.#info.title}</p>
    `
  }

  get dom() {
    return this.#dom
  }
}