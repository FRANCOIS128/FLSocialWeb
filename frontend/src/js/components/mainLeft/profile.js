const img_url = null;
const name = null;
const info = null;

function create_profile(img_url, name, info) {
  const profile = document.createElement('a')
  profile.classList.add('profile')

  profile.innerHTML = `
    <div class="profile-photo">
      <img alt="profile photo" src="${img_url}">
    </div>
    <div class="profile-description">
      <h2>${name}</h2>
      <p>${info}</p>
    </div>
  `
}

// create_profile(img_url, name, info)

export class Profile {
  static list = []
  #profile = { name: null, info: null, img_url: null };
  #dom = null;
  constructor(profile) {
    this.#profile.name = profile.name;
    this.#profile.info = profile.at;
    this.#profile.img_url = profile.img_src;

    this.#build()
  }

  #build = () => {
    const profile = document.createElement('a')
    profile.classList.add('profile')

    profile.innerHTML = `
      <div class="profile-photo">
        <img alt="profile photo" src="${this.#profile.img_url}">
      </div>
      <div class="profile-description">
        <h2>${this.#profile.name}</h2>
        <p>${this.#profile.info}</p>
      </div>
    `

    Profile.list.push(profile)
    this.#dom = profile
  }

  get dom() {
    return this.#dom
  }
}
