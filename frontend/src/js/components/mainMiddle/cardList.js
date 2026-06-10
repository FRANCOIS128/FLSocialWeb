export class CardList {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }

  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('card-list');
    this.#info.forEach(card => {
      this.#dom.appendChild(new Card(card).dom);
    });
  }

  get dom() {
    return this.#dom;
  }

}

class Card {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('info');
    this.#dom.appendChild(new InfoPofile(this.#info.profile).dom)
    this.#dom.appendChild(new InfoPicture(this.#info.picture).dom)
    this.#dom.appendChild(new InfoContorl(this.#info.control).dom)
    this.#dom.appendChild(new InfoComment(this.#info.comment).dom)
  }

  get dom() {
    return this.#dom;
  }
}

class InfoPofile {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('info-profile');
    this.#dom.innerHTML = `
    <div class="profile">
      <div class="profile-photo">
        <img alt="profile photo" src="${this.#info.src}">
      </div>
      <div class="profile-description">
        <h2>${this.#info.name}</h2>
        <p>${this.#info.position}, ${this.#info.time}</p>
      </div>
    </div>
    <i class="uil uil-ellipsis-h"></i>
    `
  }
  get dom() {
    return this.#dom;
  }
}
class InfoPicture {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('info-picture');
    this.#dom.innerHTML = `
     <img width="100%" src="${this.#info.img_src}">
    `
  }
  get dom() {
    return this.#dom;
  }
}

class InfoContorl {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('info-control');
    this.#dom.innerHTML = `
      <div class="main-control">
        <i class="uil uil-heart control_heart"></i>
        <i class="uil uil-comment-dots"></i>
        <i class="uil uil-share-alt"></i>
      </div>
      <i class="uil uil-bookmark"></i>
    `
  }
  get dom() {
    return this.#dom;
  }
}

class InfoComment {
  #info
  #dom
  constructor(info) {
    this.#info = info
    this.#build()
  }
  #build = () => {
    this.#dom = document.createElement('div');
    this.#dom.classList.add('info-comment');
    this.#createProfileList()
    this.#createCommentInfo()
    this.#createViewMore()
  }

  get dom() {
    return this.#dom;
  }

  #createProfileList = () => {
    const profileList = document.createElement('div')
    profileList.classList.add("profile-photo-list")
    this.#createPhotoList(profileList)
    this.#createLikeInfo(profileList)
    this.#dom.appendChild(profileList)
  }

  #createPhotoList = (father_dom) => {
    this.#info.img_src_list.forEach(img_src => {
      const photo = document.createElement('img')
      photo.classList.add('profile-photo')
      photo.src = img_src
      father_dom.appendChild(photo)
    })
  }

  #createLikeInfo = (father_dom) => {
    const dom = document.createElement('span')
    dom.classList.add('like-info')
    dom.innerHTML = `
      Liked by <strong> ${this.#info.first_people_name}</strong> and <strong> ${this.#info.like_peoples_number}</strong> others
    `
    father_dom.appendChild(dom)
  }

  #createCommentInfo = () => {
    const dom = document.createElement('span')
    dom.classList.add('comment-info')
    dom.textContent = this.#info.comment_info
    this.#dom.appendChild(dom)
  }

  #createViewMore = () => {
    const dom = document.createElement('span')
    dom.classList.add('view-btn')
    dom.textContent = `View all ${this.#info.view_number} comments`
    this.#dom.appendChild(dom)
  }


}