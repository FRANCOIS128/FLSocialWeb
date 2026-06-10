export class RequestList {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement("div")
    this.#dom.classList.add('request-list')
    this.#dom.innerHTML = `
      <h2>Requests</h2>
    `
    this.#info.forEach(request => {
      this.#dom.appendChild(new Request(request).dom)
    })
  }

  get dom() {
    return this.#dom
  }
}

class Request {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement("div")
    this.#dom.classList.add('request')
    this.#dom.innerHTML = `
      <div class="profile">
        <div class="profile-photo">
        <img alt="profile photo" src="${this.#info.src}">
        </div>
        <div class="profile-description">
          <h2>${this.#info.name}</h2>
          <p>${this.#info.mutualFriendNum} Mutual Friends</p>
        </div>
      </div>

      <div class="request-btn-group">
        <button class="btn btn-primary">Accept</button>
        <button class="btn btn-cancel">Decline</button>
      </div>
    `
  }

  get dom() {
    return this.#dom
  }
}