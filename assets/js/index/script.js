import { preloadImages } from "../../main/js/utils.min.js";
import {
  customDropdown,
  createFilterTab,
  headerScroll,
  loading,
  bannerRevealWithContent,
  chefSectionAnimation,
  menuGalleryReveal,
  cursor,
  ctaRun,
  mousetail,
  bannerWithOutHome,
  changeBackgroundColor,
  swiperLocation,
  unionSectionAnimation,
  headerMobile,
  initScrollToSection,
  galleryLoop,
} from "../../main/js/global.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");

  if (loadingElement) {
    loading()
      .then(() => {
        bannerRevealWithContent();
      })
      .catch((err) => console.error("Loading error:", err));
  } else {
    bannerRevealWithContent();
    bannerWithOutHome();
    // changeBackgroundColor();
    swiperLocation();
    menuGalleryReveal();
  }
});
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  createFilterTab();
  headerScroll();
  chefSectionAnimation();
  cursor();
  ctaRun();
  // mousetail();
  unionSectionAnimation();
  headerMobile();
  initScrollToSection();
  galleryLoop();
};
preloadImages("img").then(() => {
  init();
});

// event click element a
let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});

// Kết hợp cả DOMContentLoaded và load
const initFooter = () => {
  const footer = document.querySelector("footer");

  if (!footer) return;

  const updateFooterHeight = () => {
    const height = footer.offsetHeight;
    if (height > 0) {
      // Chỉ update khi có chiều cao thực
      document.documentElement.style.setProperty(
        "--footer-height",
        `${height}px`,
      );
    }
  };

  updateFooterHeight();

  const resizeObserver = new ResizeObserver(updateFooterHeight);
  resizeObserver.observe(footer);
};

// Chạy khi DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooter);
} else {
  initFooter();
}

// Chạy lại khi tất cả resources load xong
window.addEventListener("load", initFooter);
