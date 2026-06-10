export const create_post = (profile) => {
  const form = document.createElement('form')
  form.classList.add('create-post')
  form.innerHTML = `
    <div class="profile-photo">
      <img alt="profile photo" src="${profile.img_src}">
    </div>
    <input type="text" id="create-post" placeholder="What is on your mind, ${profile.name} ?">
    <input type="submit" value="Post" class="btn btn-primary">
  `
  return form
}