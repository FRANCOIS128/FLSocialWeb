const body = document.body;
const leftToggle = document.querySelector("#left-toggle");
const rightToggle = document.querySelector("#right-toggle");
const backdrop = document.querySelector("#panel-backdrop");

function closeAll() {
  body.classList.remove("show-left", "show-right");
}

export function initPanelToggle() {
  leftToggle.addEventListener("click", () => {
    body.classList.remove("show-right");
    body.classList.toggle("show-left");
  });

  rightToggle.addEventListener("click", () => {
    body.classList.remove("show-left");
    body.classList.toggle("show-right");
  });

  backdrop.addEventListener("click", closeAll);

  // 窗口拉宽后侧栏恢复常规布局，清掉抽屉状态
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1200) {
      closeAll();
    } else if (window.innerWidth >= 1000) {
      body.classList.remove("show-right");
    }
  });
}
