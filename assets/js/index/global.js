export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select",
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          const optionText = item.textContent;
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
        } else {
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}
export function headerScroll() {
  const header = document.getElementById("header");
  if (!header) return null;

  let lastScroll = 0;

  const trigger = ScrollTrigger.create({
    start: "top top",
    end: 9999,
    onUpdate: (self) => {
      const currentScroll = self.scroll();

      if (currentScroll <= 0) {
        header.classList.remove("scrolled");
      } else if (currentScroll > lastScroll) {
        // Scroll down
        header.classList.add("scrolled");
      } else {
        // Scroll up
        header.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    },
  });

  return trigger;
}

export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    let result;

    const targetSelector = section.dataset.target;
    if (targetSelector) {
      result = document.querySelector(targetSelector);
    } else {
      result = section.querySelector(".filter-section-result");
      if (!result) {
        result = section.nextElementSibling;
        if (!result?.classList.contains("filter-section-result")) return;
      }
    }

    if (!result) return;

    const buttons = section.querySelectorAll(".filter-button[data-type]");

    // Chỉ cần check và filter lần đầu nếu có button active
    const activeBtn = section.querySelector(".filter-button.active");
    if (activeBtn) {
      const activeType = activeBtn.dataset.type;
      if (activeType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.classList.contains(activeType)
            ? ""
            : "none";
        });
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active state
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        // Animate fade out -> filter -> fade in
        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              if (type === "all") {
                item.style.display = "";
              } else {
                item.style.display = item.classList.contains(type)
                  ? ""
                  : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 });
      });
    });
  });
}
export function loading() {
  if (!document.querySelector("#loading")) return;
  const tl = gsap.timeline();
  tl.fromTo(
    "#loading",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1.25,
      ease: "power2.inOut",
    },
  );

  return tl;
}
export function bannerRevealWithContent() {
  const elements = document.querySelectorAll(".reveal-element");
  const heroContent = document.querySelector(".hero-content");

  const masterTl = gsap.timeline();

  elements.forEach((element) => {
    const overlay = element.querySelector(".reveal-overlay");
    const media = element.querySelector("img, video");

    if (!overlay || !media) return;

    gsap.set(overlay, { scaleX: 0, transformOrigin: "left" });

    const tl = gsap.timeline();

    tl.fromTo(
      overlay,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
    )
      .to(
        overlay,
        {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.1",
      )
      .fromTo(
        media,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.4",
      );

    masterTl.add(tl, 0); // tất cả reveal cùng bắt đầu lúc 0
  });

  // ── Hero content - delay ~0.9–1.0 giây (80% của reveal) ──
  if (heroContent) {
    gsap.set(heroContent, { visibility: "visible" });

    const title = heroContent.querySelector(".hero-title");
    const description = heroContent.querySelector(".hero-description");
    const michelin = heroContent.querySelector(".hero-list-michelin");

    const heroStartTime = 0.9;

    if (title) {
      gsap.set(title, { opacity: 0 });

      const split = new SplitText(title, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap.set(split.lines, { opacity: 0, y: 30 });
      gsap.set(title, { opacity: 1 });

      masterTl.to(
        split.lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.01,
          ease: "power2.out",
        },
        heroStartTime, // <--- delay chính
      );
    }

    if (description) {
      masterTl.fromTo(
        description,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        heroStartTime + (title ? 0.15 : 0), // overlap nhẹ nếu có title
      );
    }

    if (michelin) {
      masterTl.fromTo(
        michelin,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        heroStartTime + (title ? 0.25 : 0.1), // xếp sau description tí
      );
    }
  }

  // Optional: để debug thời gian
  // masterTl.seek(0).play();
}
export function revealBgPage() {}
export function chefSectionAnimation() {
  const chefSection = document.querySelector(".chef");

  if (!chefSection) return;

  const chefContent = chefSection.querySelector(".chef-content");
  const chefImageWrapper = chefSection.querySelector(".chef-image-wrapper");

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: chefSection,
      start: "top 60%",
      toggleActions: "play none none none",
      // markers: true,
    },
  });

  // ── 1. Phần hình (reveal từ TRÁI → PHẢI) - chạy trước ──
  if (chefImageWrapper) {
    const revealElement = chefImageWrapper.querySelector(
      ".reveal-element-chef",
    );
    const img = revealElement?.querySelector("img");

    if (revealElement && img) {
      // Tạo overlay nếu chưa có
      let overlay = revealElement.querySelector(".reveal-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "reveal-overlay"; // thêm class màu nếu cần: overlay-blue, overlay-dark...
        revealElement.appendChild(overlay);
      }

      // Set ban đầu
      gsap.set(overlay, { scaleX: 0, transformOrigin: "left" });

      // Timeline cho phần hình
      masterTl
        // 1. Overlay quét từ TRÁI → PHẢI (mở ra)
        .fromTo(
          overlay,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.5, ease: "power3.out" }, // duration ngắn gọn, mạnh mẽ
          0,
        )
        // 2. Overlay rút từ PHẢI → TRÁI (đóng lại)
        .to(
          overlay,
          {
            scaleX: 0,
            transformOrigin: "right", // ← quan trọng: đổi origin sang right để rút ngược
            duration: 0.6,
            ease: "power2.inOut",
          },
          "+=0.1", // delay nhẹ trước khi rút
        )
        // 3. Hình ảnh hiện lên + scale nhẹ
        .fromTo(
          img,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
          "-=0.5", // overlap để hình hiện sớm, mượt
        );
    }
  }

  // ── 2. Phần nội dung text - delay để chạy sau hình một chút ──
  if (chefContent) {
    const title = chefContent.querySelector(".chef-title");
    const description = chefContent.querySelector(".chef-description");
    const button = chefContent.querySelector(".chef-button");

    // Thời điểm text bắt đầu (sau khi hình reveal ~70–80%)
    const textStart = 0.9; // ← 0.7 = sớm hơn, 1.1 = chậm hơn, 0.9 thường tự nhiên

    // Title
    if (title) {
      gsap.set(title, { opacity: 0 });

      const split = new SplitText(title, {
        type: "lines",
        linesClass: "line",
      });

      gsap.set(split.lines, { opacity: 0, y: 30 });
      gsap.set(title, { opacity: 1 });

      masterTl.to(
        split.lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.015,
          ease: "power2.out",
        },
        textStart,
      );
    }

    // Description
    if (description) {
      masterTl.fromTo(
        description,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        textStart + (title ? 0.18 : 0),
      );
    }

    // Button (bỏ scale nếu không cần, hoặc giữ nhẹ)
    if (button) {
      gsap.set(button, { opacity: 0, y: 25 });

      masterTl.to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        textStart + (title || description ? 0.3 : 0.15),
      );
    }
  }

  // masterTl.timeScale(0.7); // uncomment để chậm lại khi test
}

// export function menuGalleryReveal() {
//   const galleryLists = document.querySelectorAll(".menu-gallery-list");

//   if (!galleryLists.length) return;

//   galleryLists.forEach((list) => {
//     const galleryItems = list.querySelectorAll(
//       ".menu-gallery-item.reveal-element-stagger",
//     );

//     if (!galleryItems.length) return;

//     // Tạo master timeline với ScrollTrigger cho từng list
//     const masterTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: list,
//         start: "top 80%",
//         toggleActions: "play none none none",
//         // markers: true,
//       },
//     });

//     galleryItems.forEach((item, index) => {
//       const overlay = item.querySelector(".reveal-overlay");
//       const img = item.querySelector(".image img");

//       if (!overlay || !img) return;

//       // Set initial state
//       gsap.set(overlay, {
//         scaleX: 0,
//         transformOrigin: "left",
//       });

//       // Tạo sub-timeline cho từng item
//       const tl = gsap.timeline();

//       tl
//         // 1. Overlay quét từ TRÁI → PHẢI
//         .fromTo(
//           overlay,
//           { scaleX: 0, transformOrigin: "left" },
//           {
//             scaleX: 1,
//             duration: 0.6,
//             ease: "power3.out",
//           },
//         )
//         // 2. Overlay rút từ PHẢI → TRÁI
//         .to(
//           overlay,
//           {
//             scaleX: 0,
//             transformOrigin: "right",
//             duration: 0.6,
//             ease: "power2.inOut",
//           },
//           "+=0.1",
//         )
//         // 3. Hình ảnh scale nhẹ + fade in
//         .fromTo(
//           img,
//           { opacity: 0, scale: 1.05 },
//           { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
//           "-=0.6",
//         );

//       // Add sub-timeline vào master với stagger
//       masterTl.add(tl, index * 0.15);
//     });
//   });
// }
export function menuGalleryReveal() {
  const galleryItems = document.querySelectorAll(
    ".menu-gallery-item.reveal-element-stagger",
  );

  if (!galleryItems.length) return;

  galleryItems.forEach((item) => {
    const overlay = item.querySelector(".reveal-overlay");
    const img = item.querySelector(".image img");

    if (!overlay || !img) return;

    gsap.set(overlay, {
      scaleX: 0,
      transformOrigin: "left",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      overlay,
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
      },
    )

      .to(
        overlay,
        {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.1",
      )

      .fromTo(
        img,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
        "-=0.6",
      );
  });
}
export function cursor() {
  MouseFollower.registerGSAP(gsap);

  const cursor = new MouseFollower();
}
export function ctaRun() {
  const cta = document.getElementById("cta");
  if (!cta) return;

  gsap.registerPlugin(ScrollTrigger);

  const isShortPage = () => document.body.scrollHeight <= window.innerHeight;

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (!isShortPage()) {
        cta.classList.toggle("run-right", self.direction === 1);
      }
    },
  });
}
export function mousetail() {
  const mouseContainer = document.querySelector(".mouse-trail");
  if (!mouseContainer) return;

  const hiddenImages = document.querySelectorAll(".hidden-images img");
  const images = Array.from(hiddenImages).map((img) => img.src);

  let currentImageIndex = 0;
  let lastX = 0;
  let lastY = 0;
  let distanceThreshold = window.innerWidth < 991 ? 100 : 140;

  // Kiểm tra xem có phải mobile không
  const isMobile = window.innerWidth < 991;

  if (isMobile) {
    // Mobile: tạo hình ảnh ngẫu nhiên xuất hiện và biến mất
    function createRandomFallingImage() {
      const img = document.createElement("img");
      img.classList.add("image-trail");
      img.src = images[currentImageIndex];
      mouseContainer.appendChild(img);
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // Vị trí ngẫu nhiên trên màn hình
      const randomX = Math.random() * (window.innerWidth - 100);
      const randomY = Math.random() * (window.innerHeight - 100);

      gsap.set(img, {
        x: randomX,
        y: randomY,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-20, 20),
      });

      // Hiện hình
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Biến mất sau 1 khoảng thời gian
      gsap.to(img, {
        scale: 0.2,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.in",
        onComplete: () => {
          img.remove();
        },
      });
    }

    function startRandomImageFall() {
      createRandomFallingImage();

      const nextDelay = Math.random() * 1000 + 700;
      setTimeout(startRandomImageFall, nextDelay);
    }

    // Bắt đầu hiệu ứng
    startRandomImageFall();
  } else {
    // Desktop: lắng nghe mousemove chỉ trên mouseContainer
    mouseContainer.addEventListener("mousemove", (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > distanceThreshold) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });
  }

  function createTrail(x, y) {
    const img = document.createElement("img");
    img.classList.add("image-trail");
    img.src = images[currentImageIndex];
    mouseContainer.appendChild(img);
    currentImageIndex = (currentImageIndex + 1) % images.length;

    gsap.set(img, {
      x: x - 40,
      y: y - 40,
      scale: 0,
      opacity: 0,
      rotation: gsap.utils.random(-20, 20),
    });

    gsap.to(img, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(img, {
      scale: 0.2,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.in",
      onComplete: () => {
        img.remove();
      },
    });
  }
}
export function bannerWithOutHome() {
  const sections = document.querySelectorAll(".banner-description"); // Đổi thành querySelectorAll
  if (!sections.length) return;

  gsap.registerPlugin(ScrollTrigger);

  sections.forEach((section) => {
    // Set trạng thái ban đầu cho từng section
    gsap.set(section.querySelectorAll(".tag, .description, .button"), {
      opacity: 0,
      y: 20,
    });

    // Check nếu có class scroll-trigger
    const hasScrollTrigger = section.classList.contains("scroll-trigger");

    const timeline = gsap.timeline(
      hasScrollTrigger
        ? {
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none none",
              // markers: true,
            },
          }
        : {},
    );

    timeline
      .to(section.querySelector(".tag"), {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        section.querySelector(".description"),
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(
        section.querySelector(".button"),
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      );
  });
}
export function changeBackgroundColor() {
  const main = document.querySelector("main.change-background-color");
  if (!main) return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    // markers: true,
    onUpdate: () => {
      const scrollThreshold = window.innerHeight * 0.4;
      if (window.scrollY > 120) {
        main.classList.add("active");
      } else {
        main.classList.remove("active");
      }
    },
  });
}
export function swiperLocation() {
  if (!document.querySelector(".swiper-location")) return;

  const swiper = new Swiper(".swiper-location", {
    slidesPerView: 3,
    spaceBetween: 30,
    // loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const tag = document.querySelector(".all-location .tag");
  const locationItems = document.querySelectorAll(
    ".all-location .location-item",
  );

  if (!locationItems.length) return;

  // Animate tag trước
  if (tag) {
    gsap.set(tag, {
      opacity: 0,
      y: 20,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".all-location",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
      .to(tag, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
  }

  // Animate location items
  locationItems.forEach((item, index) => {
    const revealElement = item.querySelector(".reveal-element-stagger");
    const overlay = revealElement?.querySelector(".reveal-overlay");
    const img = revealElement?.querySelector(".image img");
    const h4 = item.querySelector(".location-content h4");
    const desc = item.querySelector(".location-content .desc");
    const button = item.querySelector(".location-content .button");

    if (!overlay || !img || !h4 || !desc || !button) return;

    // Set initial state
    gsap.set(overlay, {
      scaleX: 0,
      transformOrigin: "left",
    });

    gsap.set([h4, desc, button], {
      opacity: 0,
      y: 20,
    });

    // Timeline với ScrollTrigger - delay để tag chạy trước
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
        toggleActions: "play none none none",
        // markers: true,
      },
      delay: 0.3, // Delay để tag có thời gian chạy trước
    });

    tl
      // 1. Overlay quét từ TRÁI → PHẢI (0.6s)
      .fromTo(
        overlay,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.out",
        },
      )
      // 2. Overlay rút từ PHẢI → TRÁI (0.6s)
      .to(
        overlay,
        {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "+=0.1",
      )
      // 3. Hình ảnh scale nhẹ + fade in
      .fromTo(
        img,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
        "-=0.6",
      )
      // 4. H4 fade in
      .to(
        h4,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.9,
      )
      // 5. Desc fade in + slide up
      .to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // 6. Button fade in + slide up
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );
  });
}
