export function create_post() {
  const label = document.createElement("label")
  label.classList.add('btn', 'btn-primary')
  label.setAttribute('for', 'create-post')
  label.textContent = "Create Post"
  return label
}