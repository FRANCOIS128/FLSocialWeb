import { timeAgo, escapeHtml } from "@/js/utils.js";
import { postApi } from "@/js/api.js";

export class CardList {
  #dom

  constructor() {
    this.#dom = document.createElement("div");
    this.#dom.classList.add("card-list");
  }

  get dom() {
    return this.#dom;
  }

  render(posts = []) {
    this.#dom.innerHTML = "";
    if (!posts.length) {
      this.#renderEmpty();
      return;
    }
    posts.forEach((post) => this.#dom.appendChild(new Card(post).dom));
  }

  prepend(post) {
    const empty = this.#dom.querySelector(".feed-empty");
    if (empty) empty.remove();
    this.#dom.prepend(new Card(post).dom);
  }

  #renderEmpty() {
    const empty = document.createElement("p");
    empty.classList.add("feed-empty");
    empty.textContent = "No posts yet. Be the first to share something!";
    this.#dom.appendChild(empty);
  }
}

class Card {
  #post
  #dom
  #heart
  #likeCountEl

  constructor(post) {
    this.#post = post;
    this.#build();
  }

  get dom() {
    return this.#dom;
  }

  #build = () => {
    const { author, content, imageUrl, createdAt } = this.#post;

    this.#dom = document.createElement("div");
    this.#dom.classList.add("info");

    const pictureHtml = imageUrl
      ? `<div class="info-picture"><img width="100%" src="${escapeHtml(imageUrl)}" alt="post image"></div>`
      : "";

    this.#dom.innerHTML = `
      <div class="info-profile">
        <div class="profile">
          <div class="profile-photo">
            <img alt="profile photo" src="${escapeHtml(author.avatar)}">
          </div>
          <div class="profile-description">
            <h2>${escapeHtml(author.displayName || author.username)}</h2>
            <p>@${escapeHtml(author.username)}, ${timeAgo(createdAt)}</p>
          </div>
        </div>
        <i class="uil uil-ellipsis-h"></i>
      </div>
      ${pictureHtml}
      <div class="info-control">
        <div class="main-control">
          <i class="uil uil-heart control_heart"></i>
          <i class="uil uil-comment-dots"></i>
          <i class="uil uil-share-alt"></i>
        </div>
        <i class="uil uil-bookmark"></i>
      </div>
      <div class="info-comment">
        <span class="like-info"><strong class="like-count"></strong> likes</span>
        <span class="comment-info"><strong>${escapeHtml(author.username)}</strong> ${escapeHtml(content)}</span>
      </div>
    `;

    this.#heart = this.#dom.querySelector(".control_heart");
    this.#likeCountEl = this.#dom.querySelector(".like-count");
    this.#syncLikeUI();

    this.#heart.addEventListener("click", this.#onLike);
  };

  #syncLikeUI = () => {
    this.#likeCountEl.textContent = this.#post.likeCount;
    this.#heart.classList.toggle("liked", !!this.#post.likedByMe);
  };

  #onLike = async () => {
    try {
      const res = await postApi.toggleLike(this.#post.id);
      if (res.code === "0") {
        this.#post.likedByMe = res.liked;
        this.#post.likeCount = res.likeCount;
        this.#syncLikeUI();
      }
    } catch (error) {
      // 未登录或网络错误：静默忽略，保持当前 UI
      console.warn("toggle like failed", error?.response?.status);
    }
  };
}
