import { gsap } from "gsap";

class Animation {
  constructor(target) {
    this.target = target;
  }

  in(timeline) {
    timeline = timeline || gsap.timeline();
    timeline.to(this.target, {
      duration: 0, display: "none", opacity: 0,
      x: 0, y: 40
    });
    timeline.to(this.target, {
      duration: 0.5, display: "flex", opacity: 1,
      x: 0, y: 0
    });
  }

  out(timeline) {
    timeline = timeline || gsap.timeline();
    timeline.to(this.target, {
      duration: 0, display: "flex", opacity: 1,
      x: 0, y: 0
    });
    timeline.to(this.target, {
      duration: 0.5, display: "none", opacity: 0,
      x: 0, y: -40
    });
  }
}

function AtoB(a, b, delay = 0) {
  const timeline = gsap.timeline({ delay: delay });
  a.out(timeline);
  b.in(timeline);
}

const animation = {
  login: new Animation('.auth-panel.login'),
  register: new Animation('.auth-panel.register'),
};

function LoginToRegister() {
  AtoB(animation.login, animation.register);
}

function RegisterToLogin() {
  AtoB(animation.register, animation.login);
}

// 登录成功：淡出整个 auth 遮罩，露出主应用
function AuthToApp() {
  gsap.timeline()
    .to("#auth", { duration: 0.5, opacity: 0, ease: "power2.inOut" })
    .set("#auth", { display: "none" });
}

// 退出登录：重新盖上 auth 遮罩并回到登录面板
function AppToAuth() {
  gsap.timeline()
    .set(".auth-panel.register", { display: "none", opacity: 0 })
    .set(".auth-panel.login", { display: "flex", opacity: 1, y: 0 })
    .set("#auth", { display: "flex", opacity: 0 })
    .to("#auth", { duration: 0.5, opacity: 1, ease: "power2.inOut" });
}

function backgroundColorFlash(color) {
  const timeline = gsap.timeline();
  timeline.to("#auth", {
    duration: 0,
    backgroundColor: "rgba(250, 250, 255, 1)"
  });
  timeline.to("#auth", {
    duration: 0.6,
    backgroundColor: color,
    ease: "power2.inOut"
  });
  timeline.to("#auth", {
    duration: 0.6,
    backgroundColor: "rgba(250, 250, 255, 1)",
    ease: "power2.inOut"
  });
}

function showError() {
  backgroundColorFlash("#ffd6d4");
}

function showCorrect() {
  backgroundColorFlash("#d9f7be");
}

function showUnknown() {
  backgroundColorFlash("#ffe7ba");
}

export {
  LoginToRegister,
  RegisterToLogin,
  AuthToApp,
  AppToAuth,
  showCorrect,
  showError,
  showUnknown
};
