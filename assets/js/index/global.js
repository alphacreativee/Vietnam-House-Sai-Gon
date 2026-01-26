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

    masterTl.add(tl, 0);
  });

  // Hero content - RÚT NGẮN THỜI GIAN
  if (heroContent) {
    gsap.set(heroContent, { visibility: "visible" });

    const title = heroContent.querySelector(".hero-title");
    const description = heroContent.querySelector(".hero-description");
    const michelin = heroContent.querySelector(".hero-list-michelin");

    if (title) {
      gsap.set(title, { opacity: 0 });

      const split = new SplitText(title, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap.set(split.lines, { opacity: 0, y: 30 });
      gsap.set(title, { opacity: 1 });

      masterTl.to(split.lines, {
        opacity: 1,
        y: 0,
        duration: 0.3, // Giảm từ 0.4 xuống 0.3
        stagger: 0.01, // Giảm stagger từ 0.02 xuống 0.01
        ease: "power2.out",
      });
    }

    if (description) {
      masterTl.fromTo(
        description,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, // Giảm từ 0.4 xuống 0.3
        "-=0.2", // Overlap nhiều hơn (từ -0.4 lên -0.2)
      );
    }

    if (michelin) {
      masterTl.fromTo(
        michelin,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, // Giảm từ 0.4 xuống 0.3
        "-=0.2", // Overlap nhiều hơn (từ -0.6 lên -0.2)
      );
    }
  }
}
export function revealBgPage() {}
