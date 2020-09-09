const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;

  //顶部导航
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  //置顶按钮
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

//幻灯片
const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10], 0)],
  });
});
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});
glide.mount();

// 成功案例
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    isotope.arrange({ filter: filterOption });
  }
});

//关于我们&服务流程动画
const staggeringOption = {
  delay: 300, //延迟300毫秒之后再出现
  distance: "50px", //下到上50像素的移动
  origin: "bottom",
  duration: 500, //动画执行500毫秒
  easing: "ease-in-out", //动画效果，开头和结尾慢
};

ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 200 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 200 });

//数据部分动画
const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1, //按整数1来增长
      easing: "easeInExpo", //动画效果，越来越快
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});

//监听滚动事件
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;

  //判断是否在可见区域
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      bottom / 5
    }px)`;
  }
});

//鼠标滚动
const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80,
});

document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

const exploreBtnEl = document.querySelectorAll(".explore-btn");
exploreBtnEl.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

//折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
