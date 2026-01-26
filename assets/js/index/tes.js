!(function () {
  "use strict";
  function L(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function Y(t, i) {
    (void 0 === t && (t = {}),
      void 0 === i && (i = {}),
      Object.keys(i).forEach((e) => {
        void 0 === t[e]
          ? (t[e] = i[e])
          : L(i[e]) && L(t[e]) && 0 < Object.keys(i[e]).length && Y(t[e], i[e]);
      }));
  }
  const z = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return { initEvent() {} };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName() {
          return [];
        },
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function I() {
    var e = "undefined" != typeof document ? document : {};
    return (Y(e, z), e);
  }
  const A = {
    document: z,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        },
      };
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
      return {};
    },
    requestAnimationFrame(e) {
      return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0);
    },
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function p() {
    var e = "undefined" != typeof window ? window : {};
    return (Y(e, A), e);
  }
  function N(e, t) {
    (void 0 === t && (t = 0), setTimeout(e, t));
  }
  function V() {
    return Date.now();
  }
  function G(e, t) {
    void 0 === t && (t = "x");
    var i = p();
    let s, n, r;
    e = (function (e) {
      var t = p();
      let i;
      return (i =
        (i =
          !(i = t.getComputedStyle ? t.getComputedStyle(e, null) : i) &&
          e.currentStyle
            ? e.currentStyle
            : i) || e.style);
    })(e);
    return (
      i.WebKitCSSMatrix
        ? (6 < (n = e.transform || e.webkitTransform).split(",").length &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new i.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((r =
            e.MozTransform ||
            e.OTransform ||
            e.MsTransform ||
            e.msTransform ||
            e.transform ||
            e
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (s = r.toString().split(","))),
      "x" === t &&
        (n = i.WebKitCSSMatrix
          ? r.m41
          : 16 === s.length
            ? parseFloat(s[12])
            : parseFloat(s[4])),
      (n =
        "y" === t
          ? i.WebKitCSSMatrix
            ? r.m42
            : 16 === s.length
              ? parseFloat(s[13])
              : parseFloat(s[5])
          : n) || 0
    );
  }
  function Q(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function h(e) {
    var t,
      i = Object(arguments.length <= 0 ? void 0 : e);
    const s = ["__proto__", "constructor", "prototype"];
    for (let e = 1; e < arguments.length; e += 1) {
      var n = e < 0 || arguments.length <= e ? void 0 : arguments[e];
      if (
        null != n &&
        ((t = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? t instanceof HTMLElement
          : t && (1 === t.nodeType || 11 === t.nodeType)))
      ) {
        var r = Object.keys(Object(n)).filter((e) => s.indexOf(e) < 0);
        for (let e = 0, t = r.length; e < t; e += 1) {
          var a = r[e],
            o = Object.getOwnPropertyDescriptor(n, a);
          void 0 !== o &&
            o.enumerable &&
            (Q(i[a]) && Q(n[a])
              ? n[a].__swiper__
                ? (i[a] = n[a])
                : h(i[a], n[a])
              : Q(i[a]) || !Q(n[a]) || ((i[a] = {}), n[a].__swiper__)
                ? (i[a] = n[a])
                : h(i[a], n[a]));
        }
      }
    }
    return i;
  }
  function B(e, t, i) {
    e.style.setProperty(t, i);
  }
  function F(e) {
    let { swiper: i, targetPosition: s, side: n } = e;
    const r = p(),
      a = -i.translate;
    let o = null,
      l;
    const d = i.params.speed,
      c =
        ((i.wrapperEl.style.scrollSnapType = "none"),
        r.cancelAnimationFrame(i.cssModeFrameID),
        s > a ? "next" : "prev"),
      u = (e, t) => ("next" === c && t <= e) || ("prev" === c && e <= t),
      h = () => {
        ((l = new Date().getTime()), null === o && (o = l));
        var e = Math.max(Math.min((l - o) / d, 1), 0),
          e = 0.5 - Math.cos(e * Math.PI) / 2;
        let t = a + e * (s - a);
        (u(t, s) && (t = s),
          i.wrapperEl.scrollTo({ [n]: t }),
          u(t, s)
            ? ((i.wrapperEl.style.overflow = "hidden"),
              (i.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                ((i.wrapperEl.style.overflow = ""),
                  i.wrapperEl.scrollTo({ [n]: t }));
              }),
              r.cancelAnimationFrame(i.cssModeFrameID))
            : (i.cssModeFrameID = r.requestAnimationFrame(h)));
      };
    h();
  }
  function W(e) {
    return (
      e.querySelector(".swiper-slide-transform") ||
      (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
      e
    );
  }
  function R(e, t) {
    return (
      void 0 === t && (t = ""),
      [...e.children].filter((e) => e.matches(t))
    );
  }
  function U(e) {
    try {
      console.warn(e);
    } catch (e) {}
  }
  function $(e, t) {
    void 0 === t && (t = []);
    e = document.createElement(e);
    return (
      e.classList.add(
        ...(Array.isArray(t)
          ? t
          : (t = void 0 === (t = t) ? "" : t)
              .trim()
              .split(" ")
              .filter((e) => !!e.trim())),
      ),
      e
    );
  }
  function H(e, t) {
    return p().getComputedStyle(e, null).getPropertyValue(t);
  }
  function q(e) {
    let t = e,
      i;
    if (t) {
      for (i = 0; null !== (t = t.previousSibling); )
        1 === t.nodeType && (i += 1);
      return i;
    }
  }
  function X(i, s) {
    s &&
      i.addEventListener("transitionend", function e(t) {
        t.target === i &&
          (s.call(i, t), i.removeEventListener("transitionend", e));
      });
  }
  function Z(e, t, i) {
    var s = p();
    return i
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            s
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let J;
  function K() {
    var e, t;
    return (J =
      J ||
      ((e = p()),
      {
        smoothScroll:
          (t = I()).documentElement &&
          t.documentElement.style &&
          "scrollBehavior" in t.documentElement.style,
        touch: !!(
          "ontouchstart" in e ||
          (e.DocumentTouch && t instanceof e.DocumentTouch)
        ),
      }));
  }
  let ee;
  function te(e) {
    return (
      void 0 === e && (e = {}),
      (ee =
        ee ||
        (function (e) {
          var e = (void 0 === e ? {} : e)["userAgent"],
            t = K(),
            i = (r = p()).navigator.platform,
            e = e || r.navigator.userAgent,
            s = { ios: !1, android: !1 },
            n = r.screen.width,
            r = r.screen.height,
            a = e.match(/(Android);?[\s\/]+([\d.]+)?/);
          let o = e.match(/(iPad).*OS\s([\d_]+)/);
          var l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            d = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            c = "Win32" === i,
            i = "MacIntel" === i;
          return (
            !o &&
              i &&
              t.touch &&
              0 <=
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(n + "x" + r) &&
              (o = (o = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]),
            a && !c && ((s.os = "android"), (s.android = !0)),
            (o || d || l) && ((s.os = "ios"), (s.ios = !0)),
            s
          );
        })(e))
    );
  }
  let ie;
  function se() {
    return (ie =
      ie ||
      (function () {
        const t = p();
        let e = !1;
        function i() {
          var e = t.navigator.userAgent.toLowerCase();
          return (
            0 <= e.indexOf("safari") &&
            e.indexOf("chrome") < 0 &&
            e.indexOf("android") < 0
          );
        }
        var s, n;
        return (
          i() &&
            (s = String(t.navigator.userAgent)).includes("Version/") &&
            (([s, n] = s
              .split("Version/")[1]
              .split(" ")[0]
              .split(".")
              .map((e) => Number(e))),
            (e = s < 16 || (16 === s && n < 2))),
          {
            isSafari: e || i(),
            needPerspectiveFix: e,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              t.navigator.userAgent,
            ),
          }
        );
      })());
  }
  const ne = (t, e) => {
      if (t && !t.destroyed && t.params) {
        const i = e.closest(
          t.isElement ? "swiper-slide" : "." + t.params.slideClass,
        );
        if (i) {
          let e = i.querySelector("." + t.params.lazyPreloaderClass);
          (!e &&
            t.isElement &&
            (i.shadowRoot
              ? (e = i.shadowRoot.querySelector(
                  "." + t.params.lazyPreloaderClass,
                ))
              : requestAnimationFrame(() => {
                  i.shadowRoot &&
                    (e = i.shadowRoot.querySelector(
                      "." + t.params.lazyPreloaderClass,
                    )) &&
                    e.remove();
                })),
            e && e.remove());
        }
      }
    },
    re = (e, t) => {
      e.slides[t] &&
        (e = e.slides[t].querySelector('[loading="lazy"]')) &&
        e.removeAttribute("loading");
    },
    ae = (i) => {
      if (i && !i.destroyed && i.params) {
        var t = i.params.lazyPreloadPrevNext,
          s = i.slides.length;
        if (s && t && !(t < 0)) {
          t = Math.min(t, s);
          const o =
            "auto" === i.params.slidesPerView
              ? i.slidesPerViewDynamic()
              : Math.ceil(i.params.slidesPerView);
          var n = i.activeIndex;
          if (i.params.grid && 1 < i.params.grid.rows) {
            const l = n,
              d = [l - t];
            (d.push(...Array.from({ length: t }).map((e, t) => l + o + t)),
              void i.slides.forEach((e, t) => {
                d.includes(e.column) && re(i, t);
              }));
          } else {
            var r = n + o - 1;
            if (i.params.rewind || i.params.loop)
              for (let e = n - t; e <= r + t; e += 1) {
                var a = ((e % s) + s) % s;
                (a < n || r < a) && re(i, a);
              }
            else
              for (
                let e = Math.max(n - t, 0);
                e <= Math.min(r + t, s - 1);
                e += 1
              )
                e !== n && (e > r || e < n) && re(i, e);
          }
        }
      }
    };
  function oe(e) {
    var { swiper: e, runCallbacks: t, direction: i, step: s } = e,
      { activeIndex: n, previousIndex: r } = e;
    let a = i;
    ((a = a || (r < n ? "next" : n < r ? "prev" : "reset")),
      e.emit("transition" + s),
      t &&
        n !== r &&
        ("reset" === a
          ? e.emit("slideResetTransition" + s)
          : (e.emit("slideChangeTransition" + s),
            "next" === a
              ? e.emit("slideNextTransition" + s)
              : e.emit("slidePrevTransition" + s))));
  }
  function le(s, e) {
    return (function e(t) {
      var i;
      return t &&
        t !== I() &&
        t !== p() &&
        ((i = (t = t.assignedSlot || t).closest(s)) || t.getRootNode)
        ? i || e(t.getRootNode().host)
        : null;
    })((e = void 0 === e ? this : e));
  }
  function de(e, t, i) {
    var s = p(),
      e = e["params"],
      n = e.edgeSwipeDetection,
      e = e.edgeSwipeThreshold;
    return (
      !n ||
      !(i <= e || i >= s.innerWidth - e) ||
      ("prevent" === n && (t.preventDefault(), 1))
    );
  }
  function ce() {
    const e = this;
    var t,
      i,
      s,
      n,
      { params: r, el: a } = e;
    (a && 0 === a.offsetWidth) ||
      (r.breakpoints && e.setBreakpoint(),
      ({ allowSlideNext: a, allowSlidePrev: t, snapGrid: i } = e),
      (s = e.virtual && e.params.virtual.enabled),
      (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      (n = s && r.loop),
      !("auto" === r.slidesPerView || 1 < r.slidesPerView) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      n
        ? e.params.loop && !s
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = t),
      (e.allowSlideNext = a),
      e.params.watchOverflow && i !== e.snapGrid && e.checkOverflow());
  }
  const ue = (e, t) => {
    var i = I(),
      { params: s, el: n, wrapperEl: r, device: a } = e,
      o = !!s.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener";
    (i[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
      n[l]("touchstart", e.onTouchStart, { passive: !1 }),
      n[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      i[l]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
      i[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      i[l]("touchend", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      i[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      i[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      i[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      i[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (s.preventClicks || s.preventClicksPropagation) &&
        n[l]("click", e.onClick, !0),
      s.cssMode && r[l]("scroll", e.onScroll),
      s.updateOnWindowResize
        ? e[t](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            ce,
            !0,
          )
        : e[t]("observerUpdate", ce, !0),
      n[l]("load", e.onLoad, { capture: !0 }));
  };
  const he = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
  var pe = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  const me = {
      eventsEmitter: {
        on(e, t, i) {
          const s = this;
          if (s.eventsListeners && !s.destroyed && "function" == typeof t) {
            const n = i ? "unshift" : "push";
            e.split(" ").forEach((e) => {
              (s.eventsListeners[e] || (s.eventsListeners[e] = []),
                s.eventsListeners[e][n](t));
            });
          }
          return s;
        },
        once(s, n, e) {
          const r = this;
          return !r.eventsListeners || r.destroyed || "function" != typeof n
            ? r
            : ((a.__emitterProxy = n), r.on(s, a, e));
          function a() {
            (r.off(s, a), a.__emitterProxy && delete a.__emitterProxy);
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
              t[i] = arguments[i];
            n.apply(r, t);
          }
        },
        onAny(e, t) {
          var i = this;
          return (
            i.eventsListeners &&
              !i.destroyed &&
              "function" == typeof e &&
              ((t = t ? "unshift" : "push"),
              i.eventsAnyListeners.indexOf(e) < 0) &&
              i.eventsAnyListeners[t](e),
            i
          );
        },
        offAny(e) {
          var t = this;
          return (
            t.eventsListeners &&
              !t.destroyed &&
              t.eventsAnyListeners &&
              0 <= (e = t.eventsAnyListeners.indexOf(e)) &&
              t.eventsAnyListeners.splice(e, 1),
            t
          );
        },
        off(e, s) {
          const n = this;
          return (
            n.eventsListeners &&
              !n.destroyed &&
              n.eventsListeners &&
              e.split(" ").forEach((i) => {
                void 0 === s
                  ? (n.eventsListeners[i] = [])
                  : n.eventsListeners[i] &&
                    n.eventsListeners[i].forEach((e, t) => {
                      (e === s ||
                        (e.__emitterProxy && e.__emitterProxy === s)) &&
                        n.eventsListeners[i].splice(t, 1);
                    });
              }),
            n
          );
        },
        emit() {
          const n = this;
          if (n.eventsListeners && !n.destroyed && n.eventsListeners) {
            let e, i, s;
            for (var t = arguments.length, r = new Array(t), a = 0; a < t; a++)
              r[a] = arguments[a];
            ((s =
              "string" == typeof r[0] || Array.isArray(r[0])
                ? ((e = r[0]), (i = r.slice(1, r.length)), n)
                : ((e = r[0].events), (i = r[0].data), r[0].context || n)),
              i.unshift(s),
              (Array.isArray(e) ? e : e.split(" ")).forEach((t) => {
                (n.eventsAnyListeners &&
                  n.eventsAnyListeners.length &&
                  n.eventsAnyListeners.forEach((e) => {
                    e.apply(s, [t, ...i]);
                  }),
                  n.eventsListeners &&
                    n.eventsListeners[t] &&
                    n.eventsListeners[t].forEach((e) => {
                      e.apply(s, i);
                    }));
              }));
          }
          return n;
        },
      },
      update: {
        updateSize: function () {
          var e = this;
          let t, i;
          var s = e.el;
          ((t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : s.clientWidth),
            (i =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : s.clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === i && e.isVertical()) ||
              ((t =
                t -
                parseInt(H(s, "padding-left") || 0, 10) -
                parseInt(H(s, "padding-right") || 0, 10)),
              (i =
                i -
                parseInt(H(s, "padding-top") || 0, 10) -
                parseInt(H(s, "padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(i) && (i = 0),
              Object.assign(e, {
                width: t,
                height: i,
                size: e.isHorizontal() ? t : i,
              })));
        },
        updateSlides: function () {
          const s = this;
          function n(e, t) {
            return parseFloat(e.getPropertyValue(s.getDirectionLabel(t)) || 0);
          }
          const r = s.params,
            {
              wrapperEl: e,
              slidesEl: i,
              size: a,
              rtlTranslate: t,
              wrongRTL: A,
            } = s;
          var o = s.virtual && r.virtual.enabled,
            l = (o ? s.virtual : s).slides.length;
          const d = R(i, `.${s.params.slideClass}, swiper-slide`);
          var c = (o ? s.virtual.slides : d).length;
          let u = [];
          const h = [];
          var p = [];
          let m = r.slidesOffsetBefore,
            g =
              ("function" == typeof m && (m = r.slidesOffsetBefore.call(s)),
              r.slidesOffsetAfter);
          "function" == typeof g && (g = r.slidesOffsetAfter.call(s));
          var f = s.snapGrid.length,
            N = s.slidesGrid.length;
          let y = r.spaceBetween,
            v = -m,
            w = 0,
            b = 0;
          if (void 0 !== a) {
            ("string" == typeof y && 0 <= y.indexOf("%")
              ? (y = (parseFloat(y.replace("%", "")) / 100) * a)
              : "string" == typeof y && (y = parseFloat(y)),
              (s.virtualSize = -y),
              d.forEach((e) => {
                (t ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                  (e.style.marginBottom = ""),
                  (e.style.marginTop = ""));
              }),
              r.centeredSlides &&
                r.cssMode &&
                (B(e, "--swiper-centered-offset-before", ""),
                B(e, "--swiper-centered-offset-after", "")));
            var _ = r.grid && 1 < r.grid.rows && s.grid;
            _ ? s.grid.initSlides(d) : s.grid && s.grid.unsetSlides();
            let i;
            var S,
              x,
              T,
              C,
              D,
              M,
              k,
              E,
              I,
              V =
                "auto" === r.slidesPerView &&
                r.breakpoints &&
                0 <
                  Object.keys(r.breakpoints).filter(
                    (e) => void 0 !== r.breakpoints[e].slidesPerView,
                  ).length;
            for (let t = 0; t < c; t += 1) {
              i = 0;
              let e;
              (d[t] && (e = d[t]),
                _ && s.grid.updateSlide(t, e, d),
                (d[t] && "none" === H(e, "display")) ||
                  ("auto" === r.slidesPerView
                    ? (V && (d[t].style[s.getDirectionLabel("width")] = ""),
                      (E = getComputedStyle(e)),
                      (S = e.style.transform),
                      (x = e.style.webkitTransform),
                      S && (e.style.transform = "none"),
                      x && (e.style.webkitTransform = "none"),
                      (i = r.roundLengths
                        ? s.isHorizontal()
                          ? Z(e, "width", !0)
                          : Z(e, "height", !0)
                        : ((T = n(E, "width")),
                          (C = n(E, "padding-left")),
                          (D = n(E, "padding-right")),
                          (M = n(E, "margin-left")),
                          (k = n(E, "margin-right")),
                          (E = E.getPropertyValue("box-sizing")) &&
                          "border-box" === E
                            ? T + M + k
                            : (({ clientWidth: E, offsetWidth: I } = e),
                              T + C + D + M + k + (I - E)))),
                      S && (e.style.transform = S),
                      x && (e.style.webkitTransform = x),
                      r.roundLengths && (i = Math.floor(i)))
                    : ((i = (a - (r.slidesPerView - 1) * y) / r.slidesPerView),
                      r.roundLengths && (i = Math.floor(i)),
                      d[t] &&
                        (d[t].style[s.getDirectionLabel("width")] = i + "px")),
                  d[t] && (d[t].swiperSlideSize = i),
                  p.push(i),
                  r.centeredSlides
                    ? ((v = v + i / 2 + w / 2 + y),
                      0 === w && 0 !== t && (v = v - a / 2 - y),
                      0 === t && (v = v - a / 2 - y),
                      Math.abs(v) < 0.001 && (v = 0),
                      r.roundLengths && (v = Math.floor(v)),
                      b % r.slidesPerGroup == 0 && u.push(v),
                      h.push(v))
                    : (r.roundLengths && (v = Math.floor(v)),
                      (b - Math.min(s.params.slidesPerGroupSkip, b)) %
                        s.params.slidesPerGroup ==
                        0 && u.push(v),
                      h.push(v),
                      (v = v + i + y)),
                  (s.virtualSize += i + y),
                  (w = i),
                  (b += 1)));
            }
            if (
              ((s.virtualSize = Math.max(s.virtualSize, a) + g),
              t &&
                A &&
                ("slide" === r.effect || "coverflow" === r.effect) &&
                (e.style.width = s.virtualSize + y + "px"),
              r.setWrapperSize &&
                (e.style[s.getDirectionLabel("width")] =
                  s.virtualSize + y + "px"),
              _ && s.grid.updateWrapperSize(i, u),
              !r.centeredSlides)
            ) {
              var O = [];
              for (let t = 0; t < u.length; t += 1) {
                let e = u[t];
                (r.roundLengths && (e = Math.floor(e)),
                  u[t] <= s.virtualSize - a && O.push(e));
              }
              ((u = O),
                1 <
                  Math.floor(s.virtualSize - a) - Math.floor(u[u.length - 1]) &&
                  u.push(s.virtualSize - a));
            }
            if (o && r.loop) {
              var L = p[0] + y;
              if (1 < r.slidesPerGroup) {
                var G = Math.ceil(
                    (s.virtual.slidesBefore + s.virtual.slidesAfter) /
                      r.slidesPerGroup,
                  ),
                  Q = L * r.slidesPerGroup;
                for (let e = 0; e < G; e += 1) u.push(u[u.length - 1] + Q);
              }
              for (
                let e = 0;
                e < s.virtual.slidesBefore + s.virtual.slidesAfter;
                e += 1
              )
                (1 === r.slidesPerGroup && u.push(u[u.length - 1] + L),
                  h.push(h[h.length - 1] + L),
                  (s.virtualSize += L));
            }
            if ((0 === u.length && (u = [0]), 0 !== y)) {
              const P =
                s.isHorizontal() && t
                  ? "marginLeft"
                  : s.getDirectionLabel("marginRight");
              d.filter(
                (e, t) => !(r.cssMode && !r.loop) || t !== d.length - 1,
              ).forEach((e) => {
                e.style[P] = y + "px";
              });
            }
            if (r.centeredSlides && r.centeredSlidesBounds) {
              let t = 0;
              p.forEach((e) => {
                t += e + (y || 0);
              });
              const j = (t -= y) - a;
              u = u.map((e) => (e <= 0 ? -m : e > j ? j + g : e));
            }
            if (r.centerInsufficientSlides) {
              let t = 0;
              if (
                (p.forEach((e) => {
                  t += e + (y || 0);
                }),
                (t -= y) < a)
              ) {
                const Y = (a - t) / 2;
                (u.forEach((e, t) => {
                  u[t] = e - Y;
                }),
                  h.forEach((e, t) => {
                    h[t] = e + Y;
                  }));
              }
            }
            if (
              (Object.assign(s, {
                slides: d,
                snapGrid: u,
                slidesGrid: h,
                slidesSizesGrid: p,
              }),
              r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
            ) {
              (B(e, "--swiper-centered-offset-before", -u[0] + "px"),
                B(
                  e,
                  "--swiper-centered-offset-after",
                  s.size / 2 - p[p.length - 1] / 2 + "px",
                ));
              const z = -s.snapGrid[0],
                F = -s.slidesGrid[0];
              ((s.snapGrid = s.snapGrid.map((e) => e + z)),
                (s.slidesGrid = s.slidesGrid.map((e) => e + F)));
            }
            (c !== l && s.emit("slidesLengthChange"),
              u.length !== f &&
                (s.params.watchOverflow && s.checkOverflow(),
                s.emit("snapGridLengthChange")),
              h.length !== N && s.emit("slidesGridLengthChange"),
              r.watchSlidesProgress && s.updateSlidesOffset(),
              o ||
                r.cssMode ||
                ("slide" !== r.effect && "fade" !== r.effect) ||
                ((l = r.containerModifierClass + "backface-hidden"),
                (f = s.el.classList.contains(l)),
                c <= r.maxBackfaceHiddenSlides
                  ? f || s.el.classList.add(l)
                  : f && s.el.classList.remove(l)));
          }
        },
        updateAutoHeight: function (e) {
          const t = this,
            i = [],
            s = t.virtual && t.params.virtual.enabled;
          let n = 0,
            r;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          var a,
            o = (e) => (s ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
          if ("auto" !== t.params.slidesPerView && 1 < t.params.slidesPerView)
            if (t.params.centeredSlides)
              (t.visibleSlides || []).forEach((e) => {
                i.push(e);
              });
            else
              for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                var l = t.activeIndex + r;
                if (l > t.slides.length && !s) break;
                i.push(o(l));
              }
          else i.push(o(t.activeIndex));
          for (r = 0; r < i.length; r += 1)
            void 0 !== i[r] && ((a = i[r].offsetHeight), (n = a > n ? a : n));
          (!n && 0 !== n) || (t.wrapperEl.style.height = n + "px");
        },
        updateSlidesOffset: function () {
          var t = this,
            i = t.slides,
            s = t.isElement
              ? t.isHorizontal()
                ? t.wrapperEl.offsetLeft
                : t.wrapperEl.offsetTop
              : 0;
          for (let e = 0; e < i.length; e += 1)
            i[e].swiperSlideOffset =
              (t.isHorizontal() ? i[e].offsetLeft : i[e].offsetTop) -
              s -
              t.cssOverflowAdjustment();
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          var n = this;
          const r = n.params;
          var { slides: a, rtlTranslate: o, snapGrid: l } = n;
          if (0 !== a.length) {
            void 0 === a[0].swiperSlideOffset && n.updateSlidesOffset();
            let i = o ? e : -e,
              s =
                (a.forEach((e) => {
                  e.classList.remove(
                    r.slideVisibleClass,
                    r.slideFullyVisibleClass,
                  );
                }),
                (n.visibleSlidesIndexes = []),
                (n.visibleSlides = []),
                r.spaceBetween);
            "string" == typeof s && 0 <= s.indexOf("%")
              ? (s = (parseFloat(s.replace("%", "")) / 100) * n.size)
              : "string" == typeof s && (s = parseFloat(s));
            for (let t = 0; t < a.length; t += 1) {
              var d = a[t];
              let e = d.swiperSlideOffset;
              r.cssMode && r.centeredSlides && (e -= a[0].swiperSlideOffset);
              var c =
                  (i + (r.centeredSlides ? n.minTranslate() : 0) - e) /
                  (d.swiperSlideSize + s),
                u =
                  (i - l[0] + (r.centeredSlides ? n.minTranslate() : 0) - e) /
                  (d.swiperSlideSize + s),
                h = -(i - e),
                p = h + n.slidesSizesGrid[t],
                m = 0 <= h && h <= n.size - n.slidesSizesGrid[t];
              (((0 <= h && h < n.size - 1) ||
                (1 < p && p <= n.size) ||
                (h <= 0 && p >= n.size)) &&
                (n.visibleSlides.push(d),
                n.visibleSlidesIndexes.push(t),
                a[t].classList.add(r.slideVisibleClass)),
                m && a[t].classList.add(r.slideFullyVisibleClass),
                (d.progress = o ? -c : c),
                (d.originalProgress = o ? -u : u));
            }
          }
        },
        updateProgress: function (e) {
          var t = this,
            i =
              (void 0 === e &&
                ((i = t.rtlTranslate ? -1 : 1),
                (e = (t && t.translate && t.translate * i) || 0)),
              t.params),
            s = t.maxTranslate() - t.minTranslate();
          let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = t;
          var l,
            d,
            c,
            u = r,
            h = a;
          (0 == s
            ? ((n = 0), (r = !0), (a = !0))
            : ((n = (e - t.minTranslate()) / s),
              (s = Math.abs(e - t.minTranslate()) < 1),
              (l = Math.abs(e - t.maxTranslate()) < 1),
              (r = s || n <= 0),
              (a = l || 1 <= n),
              s && (n = 0),
              l && (n = 1)),
            i.loop &&
              ((s = t.getSlideIndexByData(0)),
              (l = t.getSlideIndexByData(t.slides.length - 1)),
              (s = t.slidesGrid[s]),
              (l = t.slidesGrid[l]),
              (d = t.slidesGrid[t.slidesGrid.length - 1]),
              (c = Math.abs(e)),
              1 < (o = s <= c ? (c - s) / d : (c + d - l) / d)) &&
              --o,
            Object.assign(t, {
              progress: n,
              progressLoop: o,
              isBeginning: r,
              isEnd: a,
            }),
            (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
              t.updateSlidesProgress(e),
            r && !u && t.emit("reachBeginning toEdge"),
            a && !h && t.emit("reachEnd toEdge"),
            ((u && !r) || (h && !a)) && t.emit("fromEdge"),
            t.emit("progress", n));
        },
        updateSlidesClasses: function () {
          var t = this;
          const { slides: e, params: i, slidesEl: s, activeIndex: n } = t;
          var r = t.virtual && i.virtual.enabled,
            a = t.grid && i.grid && 1 < i.grid.rows,
            o = (e) => R(s, `.${i.slideClass}${e}, swiper-slide` + e)[0];
          e.forEach((e) => {
            e.classList.remove(
              i.slideActiveClass,
              i.slideNextClass,
              i.slidePrevClass,
            );
          });
          let l, d, c;
          if (r)
            if (i.loop) {
              let e = n - t.virtual.slidesBefore;
              ((e = e < 0 ? t.virtual.slides.length + e : e) >=
                t.virtual.slides.length && (e -= t.virtual.slides.length),
                (l = o(`[data-swiper-slide-index="${e}"]`)));
            } else l = o(`[data-swiper-slide-index="${n}"]`);
          else
            a
              ? ((l = e.filter((e) => e.column === n)[0]),
                (c = e.filter((e) => e.column === n + 1)[0]),
                (d = e.filter((e) => e.column === n - 1)[0]))
              : (l = e[n]);
          (l &&
            (l.classList.add(i.slideActiveClass),
            a
              ? (c && c.classList.add(i.slideNextClass),
                d && d.classList.add(i.slidePrevClass))
              : ((c = (function (e, t) {
                  for (var i = []; e.nextElementSibling; ) {
                    var s = e.nextElementSibling;
                    ((!t || s.matches(t)) && i.push(s), (e = s));
                  }
                  return i;
                })(l, `.${i.slideClass}, swiper-slide`)[0]),
                (c = i.loop && !c ? e[0] : c) &&
                  c.classList.add(i.slideNextClass),
                (d = (function (e, t) {
                  for (var i = []; e.previousElementSibling; ) {
                    var s = e.previousElementSibling;
                    ((!t || s.matches(t)) && i.push(s), (e = s));
                  }
                  return i;
                })(l, `.${i.slideClass}, swiper-slide`)[0]),
                (d = i.loop && 0 === !d ? e[e.length - 1] : d) &&
                  d.classList.add(i.slidePrevClass))),
            t.emitSlidesClasses());
        },
        updateActiveIndex: function (e) {
          const i = this;
          var s = i.rtlTranslate ? i.translate : -i.translate,
            {
              snapGrid: n,
              params: r,
              activeIndex: a,
              realIndex: o,
              snapIndex: l,
            } = i;
          let d = e,
            c;
          if (
            ((e = (e) => {
              let t = e - i.virtual.slidesBefore;
              return (
                (t = t < 0 ? i.virtual.slides.length + t : t) >=
                  i.virtual.slides.length && (t -= i.virtual.slides.length),
                t
              );
            }),
            void 0 === d &&
              (d = (function (e) {
                var { slidesGrid: t, params: i } = e,
                  s = e.rtlTranslate ? e.translate : -e.translate;
                let n;
                for (let e = 0; e < t.length; e += 1)
                  void 0 !== t[e + 1]
                    ? s >= t[e] && s < t[e + 1] - (t[e + 1] - t[e]) / 2
                      ? (n = e)
                      : s >= t[e] && s < t[e + 1] && (n = e + 1)
                    : s >= t[e] && (n = e);
                return (n =
                  i.normalizeSlideIndex && (n < 0 || void 0 === n) ? 0 : n);
              })(i)),
            (c =
              0 <= n.indexOf(s)
                ? n.indexOf(s)
                : (s = Math.min(r.slidesPerGroupSkip, d)) +
                  Math.floor((d - s) / r.slidesPerGroup)) >= n.length &&
              (c = n.length - 1),
            d !== a || i.params.loop)
          )
            if (
              d === a &&
              i.params.loop &&
              i.virtual &&
              i.params.virtual.enabled
            )
              i.realIndex = e(d);
            else {
              s = i.grid && r.grid && 1 < r.grid.rows;
              let t;
              if (i.virtual && r.virtual.enabled && r.loop) t = e(d);
              else if (s) {
                n = i.slides.filter((e) => e.column === d)[0];
                let e = parseInt(n.getAttribute("data-swiper-slide-index"), 10);
                (Number.isNaN(e) && (e = Math.max(i.slides.indexOf(n), 0)),
                  (t = Math.floor(e / r.grid.rows)));
              } else
                t =
                  i.slides[d] &&
                  ((e = i.slides[d].getAttribute("data-swiper-slide-index")), e)
                    ? parseInt(e, 10)
                    : d;
              (Object.assign(i, {
                previousSnapIndex: l,
                snapIndex: c,
                previousRealIndex: o,
                realIndex: t,
                previousIndex: a,
                activeIndex: d,
              }),
                i.initialized && ae(i),
                i.emit("activeIndexChange"),
                i.emit("snapIndexChange"),
                (i.initialized || i.params.runCallbacksOnInit) &&
                  (o !== t && i.emit("realIndexChange"),
                  i.emit("slideChange")));
            }
          else c !== l && ((i.snapIndex = c), i.emit("snapIndexChange"));
        },
        updateClickedSlide: function (e, t) {
          var i = this;
          const s = i.params;
          let n = e.closest(`.${s.slideClass}, swiper-slide`),
            r =
              (!n &&
                i.isElement &&
                t &&
                1 < t.length &&
                t.includes(e) &&
                [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
                  !n &&
                    e.matches &&
                    e.matches(`.${s.slideClass}, swiper-slide`) &&
                    (n = e);
                }),
              !1),
            a;
          if (n)
            for (let e = 0; e < i.slides.length; e += 1)
              if (i.slides[e] === n) {
                ((r = !0), (a = e));
                break;
              }
          n && r
            ? ((i.clickedSlide = n),
              i.virtual && i.params.virtual.enabled
                ? (i.clickedIndex = parseInt(
                    n.getAttribute("data-swiper-slide-index"),
                    10,
                  ))
                : (i.clickedIndex = a),
              s.slideToClickedSlide &&
                void 0 !== i.clickedIndex &&
                i.clickedIndex !== i.activeIndex &&
                i.slideToClickedSlide())
            : ((i.clickedSlide = void 0), (i.clickedIndex = void 0));
        },
      },
      translate: {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          var { params: t, rtlTranslate: i, translate: s, wrapperEl: n } = this;
          if (t.virtualTranslate) return i ? -s : s;
          if (t.cssMode) return s;
          let r = G(n, e);
          return ((r += this.cssOverflowAdjustment()), (r = i ? -r : r) || 0);
        },
        setTranslate: function (e, t) {
          var i = this,
            { rtlTranslate: s, params: n, wrapperEl: r, progress: a } = i;
          let o = 0,
            l = 0;
          (i.isHorizontal() ? (o = s ? -e : e) : (l = e),
            n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
            (i.previousTranslate = i.translate),
            (i.translate = i.isHorizontal() ? o : l),
            n.cssMode
              ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  i.isHorizontal() ? -o : -l)
              : n.virtualTranslate ||
                (i.isHorizontal()
                  ? (o -= i.cssOverflowAdjustment())
                  : (l -= i.cssOverflowAdjustment()),
                (r.style.transform = `translate3d(${o}px, ${l}px, 0px)`)));
          let d;
          ((s = i.maxTranslate() - i.minTranslate()),
            (d = 0 == s ? 0 : (e - i.minTranslate()) / s) !== a &&
              i.updateProgress(e),
            i.emit("setTranslate", i.translate, t));
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, i, s, n) {
          (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            void 0 === s && (s = !0));
          const r = this;
          var { params: a, wrapperEl: o } = r;
          if (r.animating && a.preventInteractionOnTransition) return !1;
          var l = r.minTranslate(),
            d = r.maxTranslate();
          let c;
          if (
            ((c = s && l < e ? l : s && e < d ? d : e),
            r.updateProgress(c),
            a.cssMode)
          ) {
            l = r.isHorizontal();
            if (0 === t) o[l ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!r.support.smoothScroll)
                return (
                  F({
                    swiper: r,
                    targetPosition: -c,
                    side: l ? "left" : "top",
                  }),
                  !0
                );
              o.scrollTo({ [l ? "left" : "top"]: -c, behavior: "smooth" });
            }
          } else
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(c),
                i &&
                  (r.emit("beforeTransitionStart", t, n),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(c),
                i &&
                  (r.emit("beforeTransitionStart", t, n),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.wrapperEl.removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd,
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        i) &&
                        r.emit("transitionEnd");
                    }),
                  r.wrapperEl.addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd,
                  )));
          return !0;
        },
      },
      transition: {
        setTransition: function (e, t) {
          (this.params.cssMode ||
            ((this.wrapperEl.style.transitionDuration = e + "ms"),
            (this.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            this.emit("setTransition", e, t));
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          var i = this["params"];
          i.cssMode ||
            (i.autoHeight && this.updateAutoHeight(),
            oe({ swiper: this, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          var i = this["params"];
          ((this.animating = !1),
            i.cssMode ||
              (this.setTransition(0),
              oe({
                swiper: this,
                runCallbacks: e,
                direction: t,
                step: "End",
              })));
        },
      },
      slide: {
        slideTo: function (e, t, i, s, n) {
          (void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            "string" == typeof (e = void 0 === e ? 0 : e) &&
              (e = parseInt(e, 10)));
          const r = this;
          let a = e;
          a < 0 && (a = 0);
          const {
            params: o,
            snapGrid: l,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: u,
            rtlTranslate: h,
            wrapperEl: p,
            enabled: m,
          } = r;
          if (
            (r.animating && o.preventInteractionOnTransition) ||
            (!m && !s && !n)
          )
            return !1;
          let g =
            (e = Math.min(r.params.slidesPerGroupSkip, a)) +
            Math.floor((a - e) / r.params.slidesPerGroup);
          var f = -l[(g = g >= l.length ? l.length - 1 : g)];
          if (o.normalizeSlideIndex)
            for (let e = 0; e < d.length; e += 1) {
              var y = -Math.floor(100 * f),
                v = Math.floor(100 * d[e]),
                w = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1]
                ? v <= y && y < w - (w - v) / 2
                  ? (a = e)
                  : v <= y && y < w && (a = e + 1)
                : v <= y && (a = e);
            }
          if (r.initialized && a !== u) {
            if (
              !r.allowSlideNext &&
              (h
                ? f > r.translate && f > r.minTranslate()
                : f < r.translate && f < r.minTranslate())
            )
              return !1;
            if (
              !r.allowSlidePrev &&
              f > r.translate &&
              f > r.maxTranslate() &&
              (u || 0) !== a
            )
              return !1;
          }
          (a !== (c || 0) && i && r.emit("beforeSlideChangeStart"),
            r.updateProgress(f));
          let b;
          if (
            ((b = a > u ? "next" : a < u ? "prev" : "reset"),
            (h && -f === r.translate) || (!h && f === r.translate))
          )
            return (
              r.updateActiveIndex(a),
              o.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== o.effect && r.setTranslate(f),
              "reset" !== b && (r.transitionStart(i, b), r.transitionEnd(i, b)),
              !1
            );
          if (o.cssMode) {
            const _ = r.isHorizontal(),
              S = h ? f : -f;
            if (0 === t) {
              n = r.virtual && r.params.virtual.enabled;
              (n &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                n && !r._cssModeVirtualInitialSet && 0 < r.params.initialSlide
                  ? ((r._cssModeVirtualInitialSet = !0),
                    requestAnimationFrame(() => {
                      p[_ ? "scrollLeft" : "scrollTop"] = S;
                    }))
                  : (p[_ ? "scrollLeft" : "scrollTop"] = S),
                n &&
                  requestAnimationFrame(() => {
                    ((r.wrapperEl.style.scrollSnapType = ""),
                      (r._immediateVirtual = !1));
                  }));
            } else {
              if (!r.support.smoothScroll)
                return (
                  F({ swiper: r, targetPosition: S, side: _ ? "left" : "top" }),
                  !0
                );
              p.scrollTo({ [_ ? "left" : "top"]: S, behavior: "smooth" });
            }
          } else
            (r.setTransition(t),
              r.setTranslate(f),
              r.updateActiveIndex(a),
              r.updateSlidesClasses(),
              r.emit("beforeTransitionStart", t, s),
              r.transitionStart(i, b),
              0 === t
                ? r.transitionEnd(i, b)
                : r.animating ||
                  ((r.animating = !0),
                  r.onSlideToWrapperTransitionEnd ||
                    (r.onSlideToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.wrapperEl.removeEventListener(
                          "transitionend",
                          r.onSlideToWrapperTransitionEnd,
                        ),
                        (r.onSlideToWrapperTransitionEnd = null),
                        delete r.onSlideToWrapperTransitionEnd,
                        r.transitionEnd(i, b));
                    }),
                  r.wrapperEl.addEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  )));
          return !0;
        },
        slideToLoop: function (s, e, t, i) {
          (void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            "string" == typeof (s = void 0 === s ? 0 : s) &&
              (s = parseInt(s, 10)));
          const n = this;
          var r = n.grid && n.params.grid && 1 < n.params.grid.rows;
          let a = s;
          if (n.params.loop)
            if (n.virtual && n.params.virtual.enabled)
              a += n.virtual.slidesBefore;
            else {
              let e;
              if (r) {
                const l = a * n.params.grid.rows;
                e = n.slides.filter(
                  (e) => +e.getAttribute("data-swiper-slide-index") == l,
                )[0].column;
              } else e = n.getSlideIndexByData(a);
              var s = r
                  ? Math.ceil(n.slides.length / n.params.grid.rows)
                  : n.slides.length,
                o = n.params["centeredSlides"];
              let t = n.params.slidesPerView,
                i =
                  ("auto" === t
                    ? (t = n.slidesPerViewDynamic())
                    : ((t = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
                      o && t % 2 == 0 && (t += 1)),
                  s - e < t);
              if (
                ((i = o ? i || e < Math.ceil(t / 2) : i) &&
                  ((o = o
                    ? e < n.activeIndex
                      ? "prev"
                      : "next"
                    : e - n.activeIndex - 1 < n.params.slidesPerView
                      ? "next"
                      : "prev"),
                  n.loopFix({
                    direction: o,
                    slideTo: !0,
                    activeSlideIndex: "next" == o ? e + 1 : e - s + 1,
                    slideRealIndex: "next" == o ? n.realIndex : void 0,
                  })),
                r)
              ) {
                const d = a * n.params.grid.rows;
                a = n.slides.filter(
                  (e) => +e.getAttribute("data-swiper-slide-index") == d,
                )[0].column;
              } else a = n.getSlideIndexByData(a);
            }
          return (
            requestAnimationFrame(() => {
              n.slideTo(a, e, t, i);
            }),
            n
          );
        },
        slideNext: function (e, t, i) {
          (void 0 === e && (e = this.params.speed), void 0 === t && (t = !0));
          const s = this;
          var { enabled: n, params: r, animating: a } = s;
          if (!n) return s;
          let o = r.slidesPerGroup;
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
          const l = s.activeIndex < r.slidesPerGroupSkip ? 1 : o;
          if (((n = s.virtual && r.virtual.enabled), r.loop)) {
            if (a && !n && r.loopPreventsSliding) return !1;
            if (
              (s.loopFix({ direction: "next" }),
              (s._clientLeft = s.wrapperEl.clientLeft),
              s.activeIndex === s.slides.length - 1 && r.cssMode)
            )
              return (
                requestAnimationFrame(() => {
                  s.slideTo(s.activeIndex + l, e, t, i);
                }),
                !0
              );
          }
          return r.rewind && s.isEnd
            ? s.slideTo(0, e, t, i)
            : s.slideTo(s.activeIndex + l, e, t, i);
        },
        slidePrev: function (e, t, i) {
          (void 0 === e && (e = this.params.speed), void 0 === t && (t = !0));
          const s = this;
          var {
            params: n,
            snapGrid: r,
            slidesGrid: a,
            rtlTranslate: o,
            enabled: l,
            animating: d,
          } = s;
          if (!l) return s;
          if (((l = s.virtual && n.virtual.enabled), n.loop)) {
            if (d && !l && n.loopPreventsSliding) return !1;
            (s.loopFix({ direction: "prev" }),
              (s._clientLeft = s.wrapperEl.clientLeft));
          }
          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const u = c(o ? s.translate : -s.translate);
          d = r.map((e) => c(e));
          let h = r[d.indexOf(u) - 1];
          if (void 0 === h && n.cssMode) {
            let i;
            (r.forEach((e, t) => {
              u >= e && (i = t);
            }),
              void 0 !== i && (h = r[0 < i ? i - 1 : i]));
          }
          let p = 0;
          return (
            void 0 !== h &&
              ((p = a.indexOf(h)) < 0 && (p = s.activeIndex - 1),
              "auto" === n.slidesPerView) &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((p = p - s.slidesPerViewDynamic("previous", !0) + 1),
              (p = Math.max(p, 0))),
            n.rewind && s.isBeginning
              ? ((l =
                  s.params.virtual && s.params.virtual.enabled && s.virtual
                    ? s.virtual.slides.length - 1
                    : s.slides.length - 1),
                s.slideTo(l, e, t, i))
              : n.loop && 0 === s.activeIndex && n.cssMode
                ? (requestAnimationFrame(() => {
                    s.slideTo(p, e, t, i);
                  }),
                  !0)
                : s.slideTo(p, e, t, i)
          );
        },
        slideReset: function (e, t, i) {
          return (
            void 0 === e && (e = this.params.speed),
            this.slideTo(this.activeIndex, e, (t = void 0 === t ? !0 : t), i)
          );
        },
        slideToClosest: function (e, t, i, s) {
          (void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === s && (s = 0.5));
          var n = this;
          let r = n.activeIndex;
          var a,
            o =
              (o = Math.min(n.params.slidesPerGroupSkip, r)) +
              Math.floor((r - o) / n.params.slidesPerGroup),
            l = n.rtlTranslate ? n.translate : -n.translate;
          return (
            l >= n.snapGrid[o]
              ? ((a = n.snapGrid[o]),
                (n.snapGrid[o + 1] - a) * s < l - a &&
                  (r += n.params.slidesPerGroup))
              : l - (a = n.snapGrid[o - 1]) <= (n.snapGrid[o] - a) * s &&
                (r -= n.params.slidesPerGroup),
            (r = Math.max(r, 0)),
            (r = Math.min(r, n.slidesGrid.length - 1)),
            n.slideTo(r, e, t, i)
          );
        },
        slideToClickedSlide: function () {
          const e = this;
          var t,
            { params: i, slidesEl: s } = e,
            n =
              "auto" === i.slidesPerView
                ? e.slidesPerViewDynamic()
                : i.slidesPerView;
          let r = e.clickedIndex;
          var a = e.isElement ? "swiper-slide" : "." + i.slideClass;
          i.loop
            ? e.animating ||
              ((t = parseInt(
                e.clickedSlide.getAttribute("data-swiper-slide-index"),
                10,
              )),
              i.centeredSlides
                ? r < e.loopedSlides - n / 2 ||
                  r > e.slides.length - e.loopedSlides + n / 2
                  ? (e.loopFix(),
                    (r = e.getSlideIndex(
                      R(s, a + `[data-swiper-slide-index="${t}"]`)[0],
                    )),
                    N(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r)
                : r > e.slides.length - n
                  ? (e.loopFix(),
                    (r = e.getSlideIndex(
                      R(s, a + `[data-swiper-slide-index="${t}"]`)[0],
                    )),
                    N(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r))
            : e.slideTo(r);
        },
      },
      loop: {
        loopCreate: function (e) {
          const s = this,
            { params: n, slidesEl: t } = s;
          var i, r, a, o, l;
          !n.loop ||
            (s.virtual && s.params.virtual.enabled) ||
            ((i = () => {
              R(t, `.${n.slideClass}, swiper-slide`).forEach((e, t) => {
                e.setAttribute("data-swiper-slide-index", t);
              });
            }),
            (o = s.grid && n.grid && 1 < n.grid.rows),
            (r = n.slidesPerGroup * (o ? n.grid.rows : 1)),
            (a = s.slides.length % r != 0),
            (o = o && s.slides.length % n.grid.rows != 0),
            (l = (t) => {
              for (let e = 0; e < t; e += 1) {
                var i = s.isElement
                  ? $("swiper-slide", [n.slideBlankClass])
                  : $("div", [n.slideClass, n.slideBlankClass]);
                s.slidesEl.append(i);
              }
            }),
            a
              ? n.loopAddBlankSlides
                ? (l(r - (s.slides.length % r)),
                  s.recalcSlides(),
                  s.updateSlides())
                : U(
                    "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
                  )
              : o &&
                (n.loopAddBlankSlides
                  ? (l(n.grid.rows - (s.slides.length % n.grid.rows)),
                    s.recalcSlides(),
                    s.updateSlides())
                  : U(
                      "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
                    )),
            i(),
            s.loopFix({
              slideRealIndex: e,
              direction: n.centeredSlides ? void 0 : "next",
            }));
        },
        loopFix: function (r) {
          let {
            slideRealIndex: a,
            slideTo: o = !0,
            direction: l,
            setTranslate: d,
            activeSlideIndex: c,
            byController: u,
            byMousewheel: h,
          } = void 0 === r ? {} : r;
          const p = this;
          if (p.params.loop) {
            p.emit("beforeLoopFix");
            const {
              slides: x,
              allowSlidePrev: T,
              allowSlideNext: C,
              slidesEl: D,
              params: M,
            } = p;
            r = M["centeredSlides"];
            if (
              ((p.allowSlidePrev = !0),
              (p.allowSlideNext = !0),
              p.virtual && M.virtual.enabled)
            )
              (o &&
                (M.centeredSlides || 0 !== p.snapIndex
                  ? M.centeredSlides && p.snapIndex < M.slidesPerView
                    ? p.slideTo(
                        p.virtual.slides.length + p.snapIndex,
                        0,
                        !1,
                        !0,
                      )
                    : p.snapIndex === p.snapGrid.length - 1 &&
                      p.slideTo(p.virtual.slidesBefore, 0, !1, !0)
                  : p.slideTo(p.virtual.slides.length, 0, !1, !0)),
                (p.allowSlidePrev = T),
                (p.allowSlideNext = C));
            else {
              let e = M.slidesPerView;
              "auto" === e
                ? (e = p.slidesPerViewDynamic())
                : ((e = Math.ceil(parseFloat(M.slidesPerView, 10))),
                  r && e % 2 == 0 && (e += 1));
              var m = M.slidesPerGroupAuto ? e : M.slidesPerGroup;
              let t = m;
              (t % m != 0 && (t += m - (t % m)),
                (t += M.loopAdditionalSlides),
                (p.loopedSlides = t));
              var g = p.grid && M.grid && 1 < M.grid.rows,
                f =
                  (x.length < e + t
                    ? U(
                        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
                      )
                    : g &&
                      "row" === M.grid.fill &&
                      U(
                        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
                      ),
                  []);
              const k = [];
              let i = p.activeIndex;
              void 0 === c
                ? (c = p.getSlideIndex(
                    x.filter((e) =>
                      e.classList.contains(M.slideActiveClass),
                    )[0],
                  ))
                : (i = c);
              var y = "next" === l || !l,
                v = "prev" === l || !l;
              let s = 0,
                n = 0;
              var w = g ? Math.ceil(x.length / M.grid.rows) : x.length,
                b =
                  (g ? x[c].column : c) +
                  (r && void 0 === d ? -e / 2 + 0.5 : 0);
              if (b < t) {
                s = Math.max(t - b, m);
                for (let e = 0; e < t - b; e += 1) {
                  var _ = e - Math.floor(e / w) * w;
                  if (g) {
                    var S = w - _ - 1;
                    for (let e = x.length - 1; 0 <= e; --e)
                      x[e].column === S && f.push(e);
                  } else f.push(w - _ - 1);
                }
              } else if (b + e > w - t) {
                n = Math.max(b - (w - 2 * t), m);
                for (let e = 0; e < n; e += 1) {
                  const E = e - Math.floor(e / w) * w;
                  g
                    ? x.forEach((e, t) => {
                        e.column === E && k.push(t);
                      })
                    : k.push(E);
                }
              }
              if (
                ((p.__preventObserver__ = !0),
                requestAnimationFrame(() => {
                  p.__preventObserver__ = !1;
                }),
                v &&
                  f.forEach((e) => {
                    ((x[e].swiperLoopMoveDOM = !0),
                      D.prepend(x[e]),
                      (x[e].swiperLoopMoveDOM = !1));
                  }),
                y &&
                  k.forEach((e) => {
                    ((x[e].swiperLoopMoveDOM = !0),
                      D.append(x[e]),
                      (x[e].swiperLoopMoveDOM = !1));
                  }),
                p.recalcSlides(),
                "auto" === M.slidesPerView
                  ? p.updateSlides()
                  : g &&
                    ((0 < f.length && v) || (0 < k.length && y)) &&
                    p.slides.forEach((e, t) => {
                      p.grid.updateSlide(t, e, p.slides);
                    }),
                M.watchSlidesProgress && p.updateSlidesOffset(),
                o &&
                  (0 < f.length && v
                    ? void 0 === a
                      ? ((r = p.slidesGrid[i]),
                        (m = p.slidesGrid[i + s] - r),
                        h
                          ? p.setTranslate(p.translate - m)
                          : (p.slideTo(i + s, 0, !1, !0),
                            d &&
                              ((p.touchEventsData.startTranslate =
                                p.touchEventsData.startTranslate - m),
                              (p.touchEventsData.currentTranslate =
                                p.touchEventsData.currentTranslate - m))))
                      : d &&
                        ((v = g ? f.length / M.grid.rows : f.length),
                        p.slideTo(p.activeIndex + v, 0, !1, !0),
                        (p.touchEventsData.currentTranslate = p.translate))
                    : 0 < k.length &&
                      y &&
                      (void 0 === a
                        ? ((r = p.slidesGrid[i]),
                          (m = p.slidesGrid[i - n] - r),
                          h
                            ? p.setTranslate(p.translate - m)
                            : (p.slideTo(i - n, 0, !1, !0),
                              d &&
                                ((p.touchEventsData.startTranslate =
                                  p.touchEventsData.startTranslate - m),
                                (p.touchEventsData.currentTranslate =
                                  p.touchEventsData.currentTranslate - m))))
                        : ((v = g ? k.length / M.grid.rows : k.length),
                          p.slideTo(p.activeIndex - v, 0, !1, !0)))),
                (p.allowSlidePrev = T),
                (p.allowSlideNext = C),
                p.controller && p.controller.control && !u)
              ) {
                const I = {
                  slideRealIndex: a,
                  direction: l,
                  setTranslate: d,
                  activeSlideIndex: c,
                  byController: !0,
                };
                Array.isArray(p.controller.control)
                  ? p.controller.control.forEach((e) => {
                      !e.destroyed &&
                        e.params.loop &&
                        e.loopFix({
                          ...I,
                          slideTo:
                            e.params.slidesPerView === M.slidesPerView && o,
                        });
                    })
                  : p.controller.control instanceof p.constructor &&
                    p.controller.control.params.loop &&
                    p.controller.control.loopFix({
                      ...I,
                      slideTo:
                        p.controller.control.params.slidesPerView ===
                          M.slidesPerView && o,
                    });
              }
            }
            p.emit("loopFix");
          }
        },
        loopDestroy: function () {
          var e = this;
          const { params: t, slidesEl: i } = e;
          if (!(!t.loop || (e.virtual && e.params.virtual.enabled))) {
            e.recalcSlides();
            const s = [];
            (e.slides.forEach((e) => {
              var t =
                void 0 === e.swiperSlideIndex
                  ? +e.getAttribute("data-swiper-slide-index")
                  : e.swiperSlideIndex;
              s[t] = e;
            }),
              e.slides.forEach((e) => {
                e.removeAttribute("data-swiper-slide-index");
              }),
              s.forEach((e) => {
                i.append(e);
              }),
              e.recalcSlides(),
              e.slideTo(e.realIndex, 0));
          }
        },
      },
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          var i;
          !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode ||
            ((i =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl),
            t.isElement && (t.__preventObserver__ = !0),
            (i.style.cursor = "move"),
            (i.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              }));
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          var e = this,
            t = e["params"];
          ((e.onTouchStart = function (i) {
            var s = this,
              n = I();
            let r = i;
            if (
              (r.originalEvent && (r = r.originalEvent),
              (i = s.touchEventsData),
              "pointerdown" === r.type)
            ) {
              if (null !== i.pointerId && i.pointerId !== r.pointerId) return;
              i.pointerId = r.pointerId;
            } else
              "touchstart" === r.type &&
                1 === r.targetTouches.length &&
                (i.touchId = r.targetTouches[0].identifier);
            if ("touchstart" === r.type) de(s, r, r.targetTouches[0].pageX);
            else {
              var { params: a, touches: o, enabled: l } = s;
              if (
                l &&
                (a.simulateTouch || "mouse" !== r.pointerType) &&
                (!s.animating || !a.preventInteractionOnTransition)
              ) {
                !s.animating && a.cssMode && a.loop && s.loopFix();
                let t = r.target;
                if (
                  ("wrapper" !== a.touchEventsTarget ||
                    s.wrapperEl.contains(t)) &&
                  !(
                    ("which" in r && 3 === r.which) ||
                    ("button" in r && 0 < r.button) ||
                    (i.isTouched && i.isMoved)
                  )
                ) {
                  var l = !!a.noSwipingClass && "" !== a.noSwipingClass,
                    d = r.composedPath ? r.composedPath() : r.path,
                    l =
                      (l && r.target && r.target.shadowRoot && d && (t = d[0]),
                      a.noSwipingSelector || "." + a.noSwipingClass),
                    d = !(!r.target || !r.target.shadowRoot);
                  if (a.noSwiping && (d ? le(l, t) : t.closest(l)))
                    s.allowClick = !0;
                  else if (!a.swipeHandler || t.closest(a.swipeHandler)) {
                    ((o.currentX = r.pageX), (o.currentY = r.pageY));
                    ((d = o.currentX), (l = o.currentY));
                    if (de(s, r, d)) {
                      (Object.assign(i, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0,
                      }),
                        (o.startX = d),
                        (o.startY = l),
                        (i.touchStartTime = V()),
                        (s.allowClick = !0),
                        s.updateSize(),
                        (s.swipeDirection = void 0),
                        0 < a.threshold && (i.allowThresholdMove = !1));
                      let e = !0;
                      (t.matches(i.focusableElements) &&
                        ((e = !1), "SELECT" === t.nodeName) &&
                        (i.isTouched = !1),
                        n.activeElement &&
                          n.activeElement.matches(i.focusableElements) &&
                          n.activeElement !== t &&
                          n.activeElement.blur());
                      d = e && s.allowTouchMove && a.touchStartPreventDefault;
                      ((!a.touchStartForcePreventDefault && !d) ||
                        t.isContentEditable ||
                        r.preventDefault(),
                        a.freeMode &&
                          a.freeMode.enabled &&
                          s.freeMode &&
                          s.animating &&
                          !a.cssMode &&
                          s.freeMode.onTouchStart(),
                        s.emit("touchStart", r));
                    }
                  }
                }
              }
            }
          }.bind(e)),
            (e.onTouchMove = function (t) {
              var n = I(),
                r = this;
              const a = r.touchEventsData;
              var { params: o, touches: l, rtlTranslate: d, enabled: c } = r;
              if (c && (o.simulateTouch || "mouse" !== t.pointerType)) {
                let s = t;
                if (
                  "pointermove" ===
                  (s = s.originalEvent ? s.originalEvent : s).type
                ) {
                  if (null !== a.touchId) return;
                  if (s.pointerId !== a.pointerId) return;
                }
                let e;
                if ("touchmove" === s.type) {
                  if (
                    !(e = [...s.changedTouches].filter(
                      (e) => e.identifier === a.touchId,
                    )[0]) ||
                    e.identifier !== a.touchId
                  )
                    return;
                } else e = s;
                if (a.isTouched) {
                  ((c = e.pageX), (t = e.pageY));
                  if (s.preventedByNestedSwiper)
                    ((l.startX = c), (l.startY = t));
                  else if (r.allowTouchMove) {
                    if (o.touchReleaseOnEdges && !o.loop)
                      if (r.isVertical()) {
                        if (
                          (t < l.startY && r.translate <= r.maxTranslate()) ||
                          (t > l.startY && r.translate >= r.minTranslate())
                        )
                          return ((a.isTouched = !1), void (a.isMoved = !1));
                      } else if (
                        (c < l.startX && r.translate <= r.maxTranslate()) ||
                        (c > l.startX && r.translate >= r.minTranslate())
                      )
                        return;
                    if (
                      n.activeElement &&
                      s.target === n.activeElement &&
                      s.target.matches(a.focusableElements)
                    )
                      ((a.isMoved = !0), (r.allowClick = !1));
                    else {
                      (a.allowTouchCallbacks && r.emit("touchMove", s),
                        (l.previousX = l.currentX),
                        (l.previousY = l.currentY),
                        (l.currentX = c),
                        (l.currentY = t));
                      var n = l.currentX - l.startX,
                        u = l.currentY - l.startY;
                      if (
                        !(
                          r.params.threshold &&
                          Math.sqrt(n ** 2 + u ** 2) < r.params.threshold
                        )
                      )
                        if (
                          (void 0 === a.isScrolling &&
                            ((r.isHorizontal() && l.currentY === l.startY) ||
                            (r.isVertical() && l.currentX === l.startX)
                              ? (a.isScrolling = !1)
                              : 25 <= n * n + u * u &&
                                ((h =
                                  (180 * Math.atan2(Math.abs(u), Math.abs(n))) /
                                  Math.PI),
                                (a.isScrolling = r.isHorizontal()
                                  ? h > o.touchAngle
                                  : 90 - h > o.touchAngle))),
                          a.isScrolling && r.emit("touchMoveOpposite", s),
                          void 0 !== a.startMoving ||
                            (l.currentX === l.startX &&
                              l.currentY === l.startY) ||
                            (a.startMoving = !0),
                          a.isScrolling)
                        )
                          a.isTouched = !1;
                        else if (a.startMoving) {
                          ((r.allowClick = !1),
                            !o.cssMode && s.cancelable && s.preventDefault(),
                            o.touchMoveStopPropagation &&
                              !o.nested &&
                              s.stopPropagation());
                          let i = r.isHorizontal() ? n : u,
                            e = r.isHorizontal()
                              ? l.currentX - l.previousX
                              : l.currentY - l.previousY;
                          (o.oneWayMovement &&
                            ((i = Math.abs(i) * (d ? 1 : -1)),
                            (e = Math.abs(e) * (d ? 1 : -1))),
                            (l.diff = i),
                            (i *= o.touchRatio),
                            d && ((i = -i), (e = -e)));
                          var h = r.touchesDirection,
                            n =
                              ((r.swipeDirection = 0 < i ? "prev" : "next"),
                              (r.touchesDirection = 0 < e ? "prev" : "next"),
                              r.params.loop && !o.cssMode),
                            u =
                              ("next" === r.touchesDirection &&
                                r.allowSlideNext) ||
                              ("prev" === r.touchesDirection &&
                                r.allowSlidePrev);
                          if (
                            (a.isMoved ||
                              (n &&
                                u &&
                                r.loopFix({ direction: r.swipeDirection }),
                              (a.startTranslate = r.getTranslate()),
                              r.setTransition(0),
                              r.animating &&
                                ((d = new window.CustomEvent("transitionend", {
                                  bubbles: !0,
                                  cancelable: !0,
                                })),
                                r.wrapperEl.dispatchEvent(d)),
                              (a.allowMomentumBounce = !1),
                              !o.grabCursor ||
                                (!0 !== r.allowSlideNext &&
                                  !0 !== r.allowSlidePrev) ||
                                r.setGrabCursor(!0),
                              r.emit("sliderFirstMove", s)),
                            new Date().getTime(),
                            a.isMoved &&
                              a.allowThresholdMove &&
                              h !== r.touchesDirection &&
                              n &&
                              u &&
                              1 <= Math.abs(i))
                          )
                            (Object.assign(l, {
                              startX: c,
                              startY: t,
                              currentX: c,
                              currentY: t,
                              startTranslate: a.currentTranslate,
                            }),
                              (a.loopSwapReset = !0),
                              (a.startTranslate = a.currentTranslate));
                          else {
                            (r.emit("sliderMove", s),
                              (a.isMoved = !0),
                              (a.currentTranslate = i + a.startTranslate));
                            let e = !0,
                              t = o.resistanceRatio;
                            if (
                              (o.touchReleaseOnEdges && (t = 0),
                              0 < i
                                ? (n &&
                                    u &&
                                    a.allowThresholdMove &&
                                    a.currentTranslate >
                                      (o.centeredSlides
                                        ? r.minTranslate() -
                                          r.slidesSizesGrid[r.activeIndex + 1]
                                        : r.minTranslate()) &&
                                    r.loopFix({
                                      direction: "prev",
                                      setTranslate: !0,
                                      activeSlideIndex: 0,
                                    }),
                                  a.currentTranslate > r.minTranslate() &&
                                    ((e = !1), o.resistance) &&
                                    (a.currentTranslate =
                                      r.minTranslate() -
                                      1 +
                                      (-r.minTranslate() +
                                        a.startTranslate +
                                        i) **
                                        t))
                                : i < 0 &&
                                  (n &&
                                    u &&
                                    a.allowThresholdMove &&
                                    a.currentTranslate <
                                      (o.centeredSlides
                                        ? r.maxTranslate() +
                                          r.slidesSizesGrid[
                                            r.slidesSizesGrid.length - 1
                                          ]
                                        : r.maxTranslate()) &&
                                    r.loopFix({
                                      direction: "next",
                                      setTranslate: !0,
                                      activeSlideIndex:
                                        r.slides.length -
                                        ("auto" === o.slidesPerView
                                          ? r.slidesPerViewDynamic()
                                          : Math.ceil(
                                              parseFloat(o.slidesPerView, 10),
                                            )),
                                    }),
                                  a.currentTranslate < r.maxTranslate()) &&
                                  ((e = !1), o.resistance) &&
                                  (a.currentTranslate =
                                    r.maxTranslate() +
                                    1 -
                                    (r.maxTranslate() - a.startTranslate - i) **
                                      t),
                              e && (s.preventedByNestedSwiper = !0),
                              !r.allowSlideNext &&
                                "next" === r.swipeDirection &&
                                a.currentTranslate < a.startTranslate &&
                                (a.currentTranslate = a.startTranslate),
                              !r.allowSlidePrev &&
                                "prev" === r.swipeDirection &&
                                a.currentTranslate > a.startTranslate &&
                                (a.currentTranslate = a.startTranslate),
                              r.allowSlidePrev ||
                                r.allowSlideNext ||
                                (a.currentTranslate = a.startTranslate),
                              0 < o.threshold)
                            ) {
                              if (
                                !(
                                  Math.abs(i) > o.threshold ||
                                  a.allowThresholdMove
                                )
                              )
                                return void (a.currentTranslate =
                                  a.startTranslate);
                              if (!a.allowThresholdMove)
                                return (
                                  (a.allowThresholdMove = !0),
                                  (l.startX = l.currentX),
                                  (l.startY = l.currentY),
                                  (a.currentTranslate = a.startTranslate),
                                  void (l.diff = r.isHorizontal()
                                    ? l.currentX - l.startX
                                    : l.currentY - l.startY)
                                );
                            }
                            o.followFinger &&
                              !o.cssMode &&
                              (((o.freeMode &&
                                o.freeMode.enabled &&
                                r.freeMode) ||
                                o.watchSlidesProgress) &&
                                (r.updateActiveIndex(),
                                r.updateSlidesClasses()),
                              o.freeMode &&
                                o.freeMode.enabled &&
                                r.freeMode &&
                                r.freeMode.onTouchMove(),
                              r.updateProgress(a.currentTranslate),
                              r.setTranslate(a.currentTranslate));
                          }
                        }
                    }
                  } else
                    (s.target.matches(a.focusableElements) ||
                      (r.allowClick = !1),
                      a.isTouched &&
                        (Object.assign(l, {
                          startX: c,
                          startY: t,
                          currentX: c,
                          currentY: t,
                        }),
                        (a.touchStartTime = V())));
                } else
                  a.startMoving &&
                    a.isScrolling &&
                    r.emit("touchMoveOpposite", s);
              }
            }.bind(e)),
            (e.onTouchEnd = function (e) {
              const r = this,
                t = r.touchEventsData;
              let a = e,
                i;
              if (
                "touchend" ===
                  (a = a.originalEvent ? a.originalEvent : a).type ||
                "touchcancel" === a.type
              ) {
                if (
                  !(i = [...a.changedTouches].filter(
                    (e) => e.identifier === t.touchId,
                  )[0]) ||
                  i.identifier !== t.touchId
                )
                  return;
              } else {
                if (null !== t.touchId) return;
                if (a.pointerId !== t.pointerId) return;
                i = a;
              }
              if (
                ![
                  "pointercancel",
                  "pointerout",
                  "pointerleave",
                  "contextmenu",
                ].includes(a.type) ||
                (["pointercancel", "contextmenu"].includes(a.type) &&
                  (r.browser.isSafari || r.browser.isWebView))
              ) {
                ((t.pointerId = null), (t.touchId = null));
                var {
                  params: o,
                  touches: e,
                  rtlTranslate: s,
                  slidesGrid: l,
                  enabled: n,
                } = r;
                if (n && (o.simulateTouch || "mouse" !== a.pointerType))
                  if (
                    (t.allowTouchCallbacks && r.emit("touchEnd", a),
                    (t.allowTouchCallbacks = !1),
                    t.isTouched)
                  ) {
                    o.grabCursor &&
                      t.isMoved &&
                      t.isTouched &&
                      (!0 === r.allowSlideNext || !0 === r.allowSlidePrev) &&
                      r.setGrabCursor(!1);
                    var n = V(),
                      d = n - t.touchStartTime;
                    if (
                      (r.allowClick &&
                        ((c = a.path || (a.composedPath && a.composedPath())),
                        r.updateClickedSlide((c && c[0]) || a.target, c),
                        r.emit("tap click", a),
                        d < 300) &&
                        n - t.lastClickTime < 300 &&
                        r.emit("doubleTap doubleClick", a),
                      (t.lastClickTime = V()),
                      N(() => {
                        r.destroyed || (r.allowClick = !0);
                      }),
                      t.isTouched &&
                        t.isMoved &&
                        r.swipeDirection &&
                        (0 !== e.diff || t.loopSwapReset) &&
                        (t.currentTranslate !== t.startTranslate ||
                          t.loopSwapReset))
                    ) {
                      ((t.isTouched = !1),
                        (t.isMoved = !1),
                        (t.startMoving = !1));
                      let n;
                      if (
                        ((n = o.followFinger
                          ? s
                            ? r.translate
                            : -r.translate
                          : -t.currentTranslate),
                        !o.cssMode)
                      )
                        if (o.freeMode && o.freeMode.enabled)
                          r.freeMode.onTouchEnd({ currentPos: n });
                        else {
                          let t = 0,
                            i = r.slidesSizesGrid[0];
                          for (
                            let e = 0;
                            e < l.length;
                            e += e < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup
                          ) {
                            const u =
                              e < o.slidesPerGroupSkip - 1
                                ? 1
                                : o.slidesPerGroup;
                            void 0 !== l[e + u]
                              ? n >= l[e] &&
                                n < l[e + u] &&
                                ((t = e), (i = l[e + u] - l[e]))
                              : n >= l[e] &&
                                ((t = e),
                                (i = l[l.length - 1] - l[l.length - 2]));
                          }
                          let e = null,
                            s = null;
                          o.rewind &&
                            (r.isBeginning
                              ? (s =
                                  o.virtual && o.virtual.enabled && r.virtual
                                    ? r.virtual.slides.length - 1
                                    : r.slides.length - 1)
                              : r.isEnd && (e = 0));
                          var c = (n - l[t]) / i;
                          const u =
                            t < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                          d > o.longSwipesMs
                            ? o.longSwipes
                              ? ("next" === r.swipeDirection &&
                                  (c >= o.longSwipesRatio
                                    ? r.slideTo(o.rewind && r.isEnd ? e : t + u)
                                    : r.slideTo(t)),
                                "prev" === r.swipeDirection &&
                                  (c > 1 - o.longSwipesRatio
                                    ? r.slideTo(t + u)
                                    : null !== s &&
                                        c < 0 &&
                                        Math.abs(c) > o.longSwipesRatio
                                      ? r.slideTo(s)
                                      : r.slideTo(t)))
                              : r.slideTo(r.activeIndex)
                            : o.shortSwipes
                              ? r.navigation &&
                                (a.target === r.navigation.nextEl ||
                                  a.target === r.navigation.prevEl)
                                ? a.target === r.navigation.nextEl
                                  ? r.slideTo(t + u)
                                  : r.slideTo(t)
                                : ("next" === r.swipeDirection &&
                                    r.slideTo(null !== e ? e : t + u),
                                  "prev" === r.swipeDirection &&
                                    r.slideTo(null !== s ? s : t))
                              : r.slideTo(r.activeIndex);
                        }
                    } else
                      ((t.isTouched = !1),
                        (t.isMoved = !1),
                        (t.startMoving = !1));
                  } else
                    (t.isMoved && o.grabCursor && r.setGrabCursor(!1),
                      (t.isMoved = !1),
                      (t.startMoving = !1));
              }
            }.bind(e)),
            (e.onDocumentTouchStart = function () {
              this.documentTouchHandlerProceeded ||
                ((this.documentTouchHandlerProceeded = !0),
                this.params.touchReleaseOnEdges &&
                  (this.el.style.touchAction = "auto"));
            }.bind(e)),
            t.cssMode &&
              (e.onScroll = function () {
                var t = this,
                  { wrapperEl: i, rtlTranslate: s, enabled: n } = t;
                if (n) {
                  ((t.previousTranslate = t.translate),
                    t.isHorizontal()
                      ? (t.translate = -i.scrollLeft)
                      : (t.translate = -i.scrollTop),
                    0 === t.translate && (t.translate = 0),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses());
                  let e;
                  n = t.maxTranslate() - t.minTranslate();
                  ((e = 0 == n ? 0 : (t.translate - t.minTranslate()) / n) !==
                    t.progress &&
                    t.updateProgress(s ? -t.translate : t.translate),
                    t.emit("setTranslate", t.translate, !1));
                }
              }.bind(e)),
            (e.onClick = function (e) {
              var t = this;
              t.enabled &&
                !t.allowClick &&
                (t.params.preventClicks && e.preventDefault(),
                t.params.preventClicksPropagation) &&
                t.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation());
            }.bind(e)),
            (e.onLoad = function (e) {
              var t = this;
              (ne(t, e.target),
                t.params.cssMode ||
                  ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
                  t.update());
            }.bind(e)),
            ue(e, "on"));
        },
        detachEvents: function () {
          ue(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const s = this,
            { realIndex: e, initialized: t, params: n, el: i } = s;
          if ((a = n.breakpoints) && 0 !== Object.keys(a).length) {
            var r = s.getBreakpoint(a, s.params.breakpointsBase, s.el);
            if (r && s.currentBreakpoint !== r) {
              const u = (r in a ? a[r] : void 0) || s.originalParams;
              var a = he(s, n),
                o = he(s, u),
                l = n.enabled,
                a =
                  (a && !o
                    ? (i.classList.remove(
                        n.containerModifierClass + "grid",
                        n.containerModifierClass + "grid-column",
                      ),
                      s.emitContainerClasses())
                    : !a &&
                      o &&
                      (i.classList.add(n.containerModifierClass + "grid"),
                      ((u.grid.fill && "column" === u.grid.fill) ||
                        (!u.grid.fill && "column" === n.grid.fill)) &&
                        i.classList.add(
                          n.containerModifierClass + "grid-column",
                        ),
                      s.emitContainerClasses()),
                  ["navigation", "pagination", "scrollbar"].forEach((e) => {
                    var t, i;
                    void 0 !== u[e] &&
                      ((t = n[e] && n[e].enabled),
                      (i = u[e] && u[e].enabled),
                      t && !i && s[e].disable(),
                      !t) &&
                      i &&
                      s[e].enable();
                  }),
                  u.direction && u.direction !== n.direction),
                o = n.loop && (u.slidesPerView !== n.slidesPerView || a),
                d = n.loop,
                a =
                  (a && t && s.changeDirection(),
                  h(s.params, u),
                  s.params.enabled),
                c = s.params.loop;
              (Object.assign(s, {
                allowTouchMove: s.params.allowTouchMove,
                allowSlideNext: s.params.allowSlideNext,
                allowSlidePrev: s.params.allowSlidePrev,
              }),
                l && !a ? s.disable() : !l && a && s.enable(),
                (s.currentBreakpoint = r),
                s.emit("_beforeBreakpoint", u),
                t &&
                  (o
                    ? (s.loopDestroy(), s.loopCreate(e), s.updateSlides())
                    : !d && c
                      ? (s.loopCreate(e), s.updateSlides())
                      : d && !c && s.loopDestroy()),
                s.emit("breakpoint", u));
            }
          }
        },
        getBreakpoint: function (e, i, s) {
          if ((void 0 === i && (i = "window"), e && ("container" !== i || s))) {
            let t = !1;
            var n = p();
            const l = "window" === i ? n.innerHeight : s.clientHeight;
            var r = Object.keys(e).map((e) => {
              var t;
              return "string" == typeof e && 0 === e.indexOf("@")
                ? ((t = parseFloat(e.substr(1))), { value: l * t, point: e })
                : { value: e, point: e };
            });
            r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < r.length; e += 1) {
              var { point: a, value: o } = r[e];
              "window" === i
                ? n.matchMedia(`(min-width: ${o}px)`).matches && (t = a)
                : o <= s.clientWidth && (t = a);
            }
            return t || "max";
          }
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          var e,
            t = this,
            { isLocked: i, params: s } = t,
            n = s["slidesOffsetBefore"];
          (n
            ? ((e = t.slides.length - 1),
              (e = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * n),
              (t.isLocked = t.size > e))
            : (t.isLocked = 1 === t.snapGrid.length),
            !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
            !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
            i && i !== t.isLocked && (t.isEnd = !1),
            i !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock"));
        },
      },
      classes: {
        addClasses: function () {
          var { classNames: e, params: t, rtl: i, el: s, device: n } = this,
            i = (function (e, i) {
              const s = [];
              return (
                e.forEach((t) => {
                  "object" == typeof t
                    ? Object.keys(t).forEach((e) => {
                        t[e] && s.push(i + e);
                      })
                    : "string" == typeof t && s.push(i + t);
                }),
                s
              );
            })(
              [
                "initialized",
                t.direction,
                { "free-mode": this.params.freeMode && t.freeMode.enabled },
                { autoheight: t.autoHeight },
                { rtl: i },
                { grid: t.grid && 1 < t.grid.rows },
                {
                  "grid-column":
                    t.grid && 1 < t.grid.rows && "column" === t.grid.fill,
                },
                { android: n.android },
                { ios: n.ios },
                { "css-mode": t.cssMode },
                { centered: t.cssMode && t.centeredSlides },
                { "watch-progress": t.watchSlidesProgress },
              ],
              t.containerModifierClass,
            );
          (e.push(...i), s.classList.add(...e), this.emitContainerClasses());
        },
        removeClasses: function () {
          var { el: e, classNames: t } = this;
          (e.classList.remove(...t), this.emitContainerClasses());
        },
      },
    },
    ge = {};
  class d {
    constructor() {
      let e, t;
      for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++)
        s[n] = arguments[n];
      (1 === s.length &&
      s[0].constructor &&
      "Object" === Object.prototype.toString.call(s[0]).slice(8, -1)
        ? (t = s[0])
        : ([e, t] = s),
        (t = h({}, (t = t || {}))),
        e && !t.el && (t.el = e));
      var r = I();
      if (
        t.el &&
        "string" == typeof t.el &&
        1 < r.querySelectorAll(t.el).length
      ) {
        const l = [];
        return (
          r.querySelectorAll(t.el).forEach((e) => {
            e = h({}, t, { el: e });
            l.push(new d(e));
          }),
          l
        );
      }
      const a = this,
        o =
          ((a.__swiper__ = !0),
          (a.support = K()),
          (a.device = te({ userAgent: t.userAgent })),
          (a.browser = se()),
          (a.eventsListeners = {}),
          (a.eventsAnyListeners = []),
          (a.modules = [...a.__modules__]),
          t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules),
          {});
      a.modules.forEach((e) => {
        var s, n;
        e({
          params: t,
          swiper: a,
          extendParams:
            ((s = t),
            (n = o),
            function (e) {
              void 0 === e && (e = {});
              var t = Object.keys(e)[0],
                i = e[t];
              ("object" == typeof i &&
                null !== i &&
                (!0 === s[t] && (s[t] = { enabled: !0 }),
                "navigation" === t &&
                  s[t] &&
                  s[t].enabled &&
                  !s[t].prevEl &&
                  !s[t].nextEl &&
                  (s[t].auto = !0),
                0 <= ["pagination", "scrollbar"].indexOf(t) &&
                  s[t] &&
                  s[t].enabled &&
                  !s[t].el &&
                  (s[t].auto = !0),
                t in s && "enabled" in i) &&
                ("object" != typeof s[t] ||
                  "enabled" in s[t] ||
                  (s[t].enabled = !0),
                s[t] || (s[t] = { enabled: !1 })),
                h(n, e));
            }),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      r = h({}, pe, o);
      return (
        (a.params = h({}, r, ge, t)),
        (a.originalParams = h({}, a.params)),
        (a.passedParams = h({}, t)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal() {
            return "horizontal" === a.params.direction;
          },
          isVertical() {
            return "vertical" === a.params.direction;
          },
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      var { slidesEl: t, params: i } = this,
        t = q(R(t, `.${i.slideClass}, swiper-slide`)[0]);
      return q(e) - t;
    }
    getSlideIndexByData(t) {
      return this.getSlideIndex(
        this.slides.filter(
          (e) => +e.getAttribute("data-swiper-slide-index") === t,
        )[0],
      );
    }
    recalcSlides() {
      var { slidesEl: e, params: t } = this;
      this.slides = R(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      var e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      var e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      var i = this,
        s = ((e = Math.min(Math.max(e, 0), 1)), i.minTranslate()),
        n = i.maxTranslate();
      (i.translateTo((n - s) * e + s, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses());
    }
    emitContainerClasses() {
      const t = this;
      var e;
      t.params._emitClasses &&
        t.el &&
        ((e = t.el.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper") ||
              0 === e.indexOf(t.params.containerModifierClass),
          )),
        t.emit("_containerClasses", e.join(" ")));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const i = this;
      if (i.params._emitClasses && i.el) {
        const s = [];
        (i.slides.forEach((e) => {
          var t = i.getSlideClasses(e);
          (s.push({ slideEl: e, classNames: t }), i.emit("_slideClass", e, t));
        }),
          i.emit("_slideClasses", s));
      }
    }
    slidesPerViewDynamic(e, t) {
      (void 0 === e && (e = "current"), void 0 === t && (t = !1));
      var {
        params: i,
        slides: s,
        slidesGrid: n,
        slidesSizesGrid: r,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if ("number" == typeof i.slidesPerView) return i.slidesPerView;
      if (i.centeredSlides) {
        let t = s[o] ? s[o].swiperSlideSize : 0,
          i;
        for (let e = o + 1; e < s.length; e += 1)
          s[e] &&
            !i &&
            ((t += s[e].swiperSlideSize), (l += 1), t > a) &&
            (i = !0);
        for (let e = o - 1; 0 <= e; --e)
          s[e] &&
            !i &&
            ((t += s[e].swiperSlideSize), (l += 1), t > a) &&
            (i = !0);
      } else if ("current" === e)
        for (let e = o + 1; e < s.length; e += 1)
          (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
      else for (let e = o - 1; 0 <= e; --e) n[o] - n[e] < a && (l += 1);
      return l;
    }
    update() {
      const t = this;
      if (t && !t.destroyed) {
        var i,
          { snapGrid: s, params: n } = t;
        (n.breakpoints && t.setBreakpoint(),
          [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
            e.complete && ne(t, e);
          }),
          t.updateSize(),
          t.updateSlides(),
          t.updateProgress(),
          t.updateSlidesClasses());
        let e;
        function r() {
          var e = t.rtlTranslate ? -1 * t.translate : t.translate,
            e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
          (t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses());
        }
        (n.freeMode && n.freeMode.enabled && !n.cssMode
          ? (r(), n.autoHeight && t.updateAutoHeight())
          : (e =
              ("auto" === n.slidesPerView || 1 < n.slidesPerView) &&
              t.isEnd &&
              !n.centeredSlides
                ? ((i = (t.virtual && n.virtual.enabled ? t.virtual : t)
                    .slides),
                  t.slideTo(i.length - 1, 0, !1, !0))
                : t.slideTo(t.activeIndex, 0, !1, !0)) || r(),
          n.watchOverflow && s !== t.snapGrid && t.checkOverflow(),
          t.emit("update"));
      }
    }
    changeDirection(t, e) {
      void 0 === e && (e = !0);
      var i = this,
        s = i.params.direction;
      return (
        (t = t || ("horizontal" === s ? "vertical" : "horizontal")) === s ||
          ("horizontal" !== t && "vertical" !== t) ||
          (i.el.classList.remove("" + i.params.containerModifierClass + s),
          i.el.classList.add("" + i.params.containerModifierClass + t),
          i.emitContainerClasses(),
          (i.params.direction = t),
          i.slides.forEach((e) => {
            "vertical" === t ? (e.style.width = "") : (e.style.height = "");
          }),
          i.emit("changeDirection"),
          e && i.update()),
        i
      );
    }
    changeLanguageDirection(e) {
      var t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(t.params.containerModifierClass + "rtl"),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(t.params.containerModifierClass + "rtl"),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(i) {
      const s = this;
      if (!s.mounted) {
        let e = i || s.params.el;
        if (!(e = "string" == typeof e ? document.querySelector(e) : e))
          return !1;
        ((e.swiper = s),
          e.parentNode &&
            e.parentNode.host &&
            "SWIPER-CONTAINER" === e.parentNode.host.nodeName &&
            (s.isElement = !0));
        const n = () =>
          "." + (s.params.wrapperClass || "").trim().split(" ").join(".");
        let t =
          e && e.shadowRoot && e.shadowRoot.querySelector
            ? e.shadowRoot.querySelector(n())
            : R(e, n())[0];
        (!t &&
          s.params.createElements &&
          ((t = $("div", s.params.wrapperClass)),
          e.append(t),
          R(e, "." + s.params.slideClass).forEach((e) => {
            t.append(e);
          })),
          Object.assign(s, {
            el: e,
            wrapperEl: t,
            slidesEl:
              s.isElement && !e.parentNode.host.slideSlots
                ? e.parentNode.host
                : t,
            hostEl: s.isElement ? e.parentNode.host : e,
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === H(e, "direction"),
            rtlTranslate:
              "horizontal" === s.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === H(e, "direction")),
            wrongRTL: "-webkit-box" === H(t, "display"),
          }));
      }
      return !0;
    }
    init(e) {
      const t = this;
      return (
        t.initialized ||
          (!1 !== t.mount(e) &&
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled
              ? t.slideTo(
                  t.params.initialSlide + t.virtual.slidesBefore,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0,
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0,
                ),
            t.params.loop && t.loopCreate(),
            t.attachEvents(),
            (e = [...t.el.querySelectorAll('[loading="lazy"]')]),
            t.isElement &&
              e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            e.forEach((e) => {
              e.complete
                ? ne(t, e)
                : e.addEventListener("load", (e) => {
                    ne(t, e.target);
                  });
            }),
            ae(t),
            (t.initialized = !0),
            ae(t),
            t.emit("init"),
            t.emit("afterInit"))),
        t
      );
    }
    destroy(e, t) {
      (void 0 === e && (e = !0), void 0 === t && (t = !0));
      const i = this,
        { params: s, el: n, wrapperEl: r, slides: a } = i;
      if (void 0 !== i.params && !i.destroyed) {
        if (
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          s.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            n.removeAttribute("style"),
            r.removeAttribute("style"),
            a) &&
            a.length &&
            a.forEach((e) => {
              (e.classList.remove(
                s.slideVisibleClass,
                s.slideFullyVisibleClass,
                s.slideActiveClass,
                s.slideNextClass,
                s.slidePrevClass,
              ),
                e.removeAttribute("style"),
                e.removeAttribute("data-swiper-slide-index"));
            }),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e)
        ) {
          i.el.swiper = null;
          {
            t = i;
            const o = t;
            Object.keys(o).forEach((e) => {
              try {
                o[e] = null;
              } catch (e) {}
              try {
                delete o[e];
              } catch (e) {}
            });
          }
        }
        i.destroyed = !0;
      }
      return null;
    }
    static extendDefaults(e) {
      h(ge, e);
    }
    static get extendedDefaults() {
      return ge;
    }
    static get defaults() {
      return pe;
    }
    static installModule(e) {
      d.prototype.__modules__ || (d.prototype.__modules__ = []);
      var t = d.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return (
        Array.isArray(e)
          ? e.forEach((e) => d.installModule(e))
          : d.installModule(e),
        d
      );
    }
  }
  function e(e) {
    let { swiper: l, extendParams: t, on: i, emit: n } = e;
    (t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (l.navigation = { nextEl: null, prevEl: null }));
    const d = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function c(e) {
      let t;
      return !(
        e &&
        "string" == typeof e &&
        l.isElement &&
        (t = l.el.querySelector(e))
      ) &&
        (e &&
          ("string" == typeof e && (t = [...document.querySelectorAll(e)]),
          l.params.uniqueNavElements) &&
          "string" == typeof e &&
          1 < t.length &&
          1 === l.el.querySelectorAll(e).length &&
          (t = l.el.querySelector(e)),
        e) &&
        !t
        ? e
        : t;
    }
    function s(e, t) {
      const i = l.params.navigation;
      (e = d(e)).forEach((e) => {
        e &&
          (e.classList[t ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = t),
          l.params.watchOverflow) &&
          l.enabled &&
          e.classList[l.isLocked ? "add" : "remove"](i.lockClass);
      });
    }
    function r() {
      var { nextEl: e, prevEl: t } = l.navigation;
      l.params.loop
        ? (s(t, !1), s(e, !1))
        : (s(t, l.isBeginning && !l.params.rewind),
          s(e, l.isEnd && !l.params.rewind));
    }
    function u(e) {
      (e.preventDefault(),
        (l.isBeginning && !l.params.loop && !l.params.rewind) ||
          (l.slidePrev(), n("navigationPrev")));
    }
    function h(e) {
      (e.preventDefault(),
        (l.isEnd && !l.params.loop && !l.params.rewind) ||
          (l.slideNext(), n("navigationNext")));
    }
    function a() {
      const i = l.params.navigation;
      var s, n, r, a;
      if (
        ((l.params.navigation =
          ((s = l),
          (n = l.originalParams.navigation),
          (r = l.params.navigation),
          (a = { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }),
          s.params.createElements &&
            Object.keys(a).forEach((t) => {
              if (!r[t] && !0 === r.auto) {
                let e = R(s.el, "." + a[t])[0];
                (e || (((e = $("div", a[t])).className = a[t]), s.el.append(e)),
                  (r[t] = e),
                  (n[t] = e));
              }
            }),
          r)),
        i.nextEl || i.prevEl)
      ) {
        var e = c(i.nextEl),
          t = c(i.prevEl);
        (Object.assign(l.navigation, { nextEl: e, prevEl: t }),
          (e = d(e)),
          (t = d(t)));
        const o = (e, t) => {
          (e && e.addEventListener("click", "next" === t ? h : u),
            !l.enabled && e && e.classList.add(...i.lockClass.split(" ")));
        };
        (e.forEach((e) => o(e, "next")), t.forEach((e) => o(e, "prev")));
      }
    }
    function o() {
      var { nextEl: e, prevEl: t } = l.navigation,
        e = d(e),
        t = d(t);
      const i = (e, t) => {
        (e.removeEventListener("click", "next" === t ? h : u),
          e.classList.remove(...l.params.navigation.disabledClass.split(" ")));
      };
      (e.forEach((e) => i(e, "next")), t.forEach((e) => i(e, "prev")));
    }
    (i("init", () => {
      (!1 === l.params.navigation.enabled ? p : (a(), r))();
    }),
      i("toEdge fromEdge lock unlock", () => {
        r();
      }),
      i("destroy", () => {
        o();
      }),
      i("enable disable", () => {
        var { nextEl: e, prevEl: t } = l.navigation,
          e = d(e),
          t = d(t);
        l.enabled
          ? r()
          : [...e, ...t]
              .filter((e) => !!e)
              .forEach((e) => e.classList.add(l.params.navigation.lockClass));
      }),
      i("click", (e, t) => {
        var { nextEl: i, prevEl: s } = l.navigation,
          i = d(i),
          s = d(s),
          t = t.target;
        if (
          l.params.navigation.hideOnClick &&
          !s.includes(t) &&
          !i.includes(t) &&
          (!(
            l.pagination &&
            l.params.pagination &&
            l.params.pagination.clickable
          ) ||
            (l.pagination.el !== t && !l.pagination.el.contains(t)))
        ) {
          let e;
          (i.length
            ? (e = i[0].classList.contains(l.params.navigation.hiddenClass))
            : s.length &&
              (e = s[0].classList.contains(l.params.navigation.hiddenClass)),
            !0 === e ? n("navigationShow") : n("navigationHide"),
            [...i, ...s]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(l.params.navigation.hiddenClass),
              ));
        }
      }));
    const p = () => {
      (l.el.classList.add(
        ...l.params.navigation.navigationDisabledClass.split(" "),
      ),
        o());
    };
    Object.assign(l.navigation, {
      enable: () => {
        (l.el.classList.remove(
          ...l.params.navigation.navigationDisabledClass.split(" "),
        ),
          a(),
          r());
      },
      disable: p,
      update: r,
      init: a,
      destroy: o,
    });
  }
  function fe(e) {
    let { swiper: c, extendParams: t, on: i } = e;
    t({ parallax: { enabled: !1 } });
    const r =
        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
      a = (e, t) => {
        var i = c["rtl"],
          i = i ? -1 : 1,
          s = e.getAttribute("data-swiper-parallax") || "0";
        let n = e.getAttribute("data-swiper-parallax-x"),
          r = e.getAttribute("data-swiper-parallax-y");
        var a = e.getAttribute("data-swiper-parallax-scale"),
          o = e.getAttribute("data-swiper-parallax-opacity"),
          l = e.getAttribute("data-swiper-parallax-rotate");
        (n || r
          ? ((n = n || "0"), (r = r || "0"))
          : c.isHorizontal()
            ? ((n = s), (r = "0"))
            : ((r = s), (n = "0")),
          (n =
            0 <= n.indexOf("%")
              ? parseInt(n, 10) * t * i + "%"
              : n * t * i + "px"),
          (r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px"),
          null != o &&
            ((s = o - (o - 1) * (1 - Math.abs(t))), (e.style.opacity = s)));
        let d = `translate3d(${n}, ${r}, 0px)`;
        (null != a &&
          ((i = a - (a - 1) * (1 - Math.abs(t))), (d += ` scale(${i})`)),
          l && null != l && (d += ` rotate(${l * t * -1}deg)`),
          (e.style.transform = d));
      },
      s = () => {
        const { el: e, slides: t, progress: s, snapGrid: n } = c;
        var i = R(e, r);
        (c.isElement && i.push(...R(c.hostEl, r)),
          i.forEach((e) => {
            a(e, s);
          }),
          t.forEach((e, t) => {
            let i = e.progress;
            (1 < c.params.slidesPerGroup &&
              "auto" !== c.params.slidesPerView &&
              (i += Math.ceil(t / 2) - s * (n.length - 1)),
              (i = Math.min(Math.max(i, -1), 1)),
              e
                .querySelectorAll(r + ", [data-swiper-parallax-rotate]")
                .forEach((e) => {
                  a(e, i);
                }));
          }));
      };
    (i("beforeInit", () => {
      c.params.parallax.enabled &&
        ((c.params.watchSlidesProgress = !0),
        (c.originalParams.watchSlidesProgress = !0));
    }),
      i("init", () => {
        c.params.parallax.enabled && s();
      }),
      i("setTranslate", () => {
        c.params.parallax.enabled && s();
      }),
      i("setTransition", (e, t) => {
        var i, s;
        c.params.parallax.enabled &&
          (({ el: t, hostEl: s } =
            (void 0 === (i = t) && (i = c.params.speed), c)),
          (t = [...t.querySelectorAll(r)]),
          c.isElement && t.push(...s.querySelectorAll(r)),
          t.forEach((e) => {
            let t =
              parseInt(e.getAttribute("data-swiper-parallax-duration"), 10) ||
              i;
            (0 === i && (t = 0), (e.style.transitionDuration = t + "ms"));
          }));
      }));
  }
  function t(e) {
    let { swiper: r, extendParams: t, on: i, emit: a, params: s } = e;
    ((r.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }));
    let o,
      l,
      d = s && s.autoplay ? s.autoplay.delay : 3e3,
      c = s && s.autoplay ? s.autoplay.delay : 3e3,
      u,
      h = new Date().getTime(),
      n,
      p,
      m,
      g,
      f,
      y,
      v;
    function w(e) {
      !r ||
        r.destroyed ||
        !r.wrapperEl ||
        e.target !== r.wrapperEl ||
        (r.wrapperEl.removeEventListener("transitionend", w), v) ||
        D();
    }
    const b = () => {
        var e;
        !r.destroyed &&
          r.autoplay.running &&
          (r.autoplay.paused ? (n = !0) : n && ((c = u), (n = !1)),
          (e = r.autoplay.paused ? u : h + c - new Date().getTime()),
          (r.autoplay.timeLeft = e),
          a("autoplayTimeLeft", e, e / d),
          (l = requestAnimationFrame(() => {
            b();
          })));
      },
      _ = () => {
        let e;
        if (
          (e =
            r.virtual && r.params.virtual.enabled
              ? r.slides.filter((e) =>
                  e.classList.contains("swiper-slide-active"),
                )[0]
              : r.slides[r.activeIndex])
        )
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
      },
      S = (t) => {
        if (!r.destroyed && r.autoplay.running) {
          (cancelAnimationFrame(l), b());
          let e = void 0 === t ? r.params.autoplay.delay : t;
          ((d = r.params.autoplay.delay), (c = r.params.autoplay.delay));
          var i = _();
          (!Number.isNaN(i) &&
            0 < i &&
            void 0 === t &&
            ((e = i), (d = i), (c = i)),
            (u = e));
          const s = r.params.speed,
            n = () => {
              r &&
                !r.destroyed &&
                (r.params.autoplay.reverseDirection
                  ? !r.isBeginning || r.params.loop || r.params.rewind
                    ? (r.slidePrev(s, !0, !0), a("autoplay"))
                    : r.params.autoplay.stopOnLastSlide ||
                      (r.slideTo(r.slides.length - 1, s, !0, !0), a("autoplay"))
                  : !r.isEnd || r.params.loop || r.params.rewind
                    ? (r.slideNext(s, !0, !0), a("autoplay"))
                    : r.params.autoplay.stopOnLastSlide ||
                      (r.slideTo(0, s, !0, !0), a("autoplay")),
                r.params.cssMode) &&
                ((h = new Date().getTime()),
                requestAnimationFrame(() => {
                  S();
                }));
            };
          return (
            0 < e
              ? (clearTimeout(o),
                (o = setTimeout(() => {
                  n();
                }, e)))
              : requestAnimationFrame(() => {
                  n();
                }),
            e
          );
        }
      },
      x = () => {
        ((h = new Date().getTime()),
          (r.autoplay.running = !0),
          S(),
          a("autoplayStart"));
      },
      T = () => {
        ((r.autoplay.running = !1),
          clearTimeout(o),
          cancelAnimationFrame(l),
          a("autoplayStop"));
      },
      C = (e, t) => {
        !r.destroyed &&
          r.autoplay.running &&
          (clearTimeout(o),
          e || (y = !0),
          (e = () => {
            (a("autoplayPause"),
              r.params.autoplay.waitForTransition
                ? r.wrapperEl.addEventListener("transitionend", w)
                : D());
          }),
          (r.autoplay.paused = !0),
          t
            ? (f && (u = r.params.autoplay.delay), (f = !1), e())
            : ((t = u || r.params.autoplay.delay),
              (u = t - (new Date().getTime() - h)),
              (r.isEnd && u < 0 && !r.params.loop) || (u < 0 && (u = 0), e())));
      },
      D = () => {
        (r.isEnd && u < 0 && !r.params.loop) ||
          r.destroyed ||
          !r.autoplay.running ||
          ((h = new Date().getTime()),
          y ? ((y = !1), S(u)) : S(),
          (r.autoplay.paused = !1),
          a("autoplayResume"));
      },
      M = () => {
        var e;
        !r.destroyed &&
          r.autoplay.running &&
          ("hidden" === (e = I()).visibilityState && ((y = !0), C(!0)),
          "visible" === e.visibilityState) &&
          D();
      },
      k = (e) => {
        "mouse" !== e.pointerType ||
          ((y = !0), (v = !0), r.animating) ||
          r.autoplay.paused ||
          C(!0);
      },
      E = (e) => {
        "mouse" === e.pointerType && ((v = !1), r.autoplay.paused) && D();
      };
    (i("init", () => {
      r.params.autoplay.enabled &&
        (r.params.autoplay.pauseOnMouseEnter &&
          (r.el.addEventListener("pointerenter", k),
          r.el.addEventListener("pointerleave", E)),
        I().addEventListener("visibilitychange", M),
        x());
    }),
      i("destroy", () => {
        (r.el.removeEventListener("pointerenter", k),
          r.el.removeEventListener("pointerleave", E),
          I().removeEventListener("visibilitychange", M),
          r.autoplay.running && T());
      }),
      i("_freeModeStaticRelease", () => {
        (m || y) && D();
      }),
      i("_freeModeNoMomentumRelease", () => {
        r.params.autoplay.disableOnInteraction ? T() : C(!0, !0);
      }),
      i("beforeTransitionStart", (e, t, i) => {
        !r.destroyed &&
          r.autoplay.running &&
          (i || !r.params.autoplay.disableOnInteraction ? C(!0, !0) : T());
      }),
      i("sliderFirstMove", () => {
        !r.destroyed &&
          r.autoplay.running &&
          (r.params.autoplay.disableOnInteraction
            ? T()
            : ((p = !0),
              (m = !1),
              (y = !1),
              (g = setTimeout(() => {
                ((y = !0), (m = !0), C(!0));
              }, 200))));
      }),
      i("touchEnd", () => {
        !r.destroyed &&
          r.autoplay.running &&
          p &&
          (clearTimeout(g),
          clearTimeout(o),
          (p =
            ((m =
              (r.params.autoplay.disableOnInteraction ||
                (m && r.params.cssMode && D()),
              !1)),
            !1)));
      }),
      i("slideChange", () => {
        !r.destroyed && r.autoplay.running && (f = !0);
      }),
      Object.assign(r.autoplay, { start: x, stop: T, pause: C, resume: D }));
  }
  function ye(e) {
    let { swiper: i, duration: t, transformElements: s, allSlides: n } = e;
    const r = i["activeIndex"];
    if (i.params.virtualTranslate && 0 !== t) {
      let t = !1,
        e;
      (e = n
        ? s
        : s.filter((e) => {
            var t,
              e = e.classList.contains("swiper-slide-transform")
                ? (t = e).parentElement ||
                  i.slides.filter(
                    (e) => e.shadowRoot && e.shadowRoot === t.parentNode,
                  )[0]
                : e;
            return i.getSlideIndex(e) === r;
          })).forEach((e) => {
        X(e, () => {
          var e;
          t ||
            (i &&
              !i.destroyed &&
              ((t = !0),
              (i.animating = !1),
              (e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
              })),
              i.wrapperEl.dispatchEvent(e)));
        });
      });
    }
  }
  function ve(t) {
    let { swiper: a, extendParams: e, on: i } = t;
    e({ fadeEffect: { crossFade: !1 } });
    {
      const {
        effect: s,
        swiper: n,
        on: r,
        setTranslate: o,
        setTransition: l,
        overwriteParams: d,
        perspective: c,
        recreateShadows: u,
        getEffectParams: h,
      } = (t = {
        effect: "fade",
        swiper: a,
        on: i,
        setTranslate: () => {
          var s,
            e = a["slides"];
          a.params.fadeEffect;
          for (let i = 0; i < e.length; i += 1) {
            var n = a.slides[i];
            let e = -n.swiperSlideOffset,
              t = (a.params.virtualTranslate || (e -= a.translate), 0);
            a.isHorizontal() || ((t = e), (e = 0));
            var r = a.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(n.progress), 0)
                : 1 + Math.min(Math.max(n.progress, -1), 0),
              n =
                ((s = void 0),
                (s = W((n = n))) !== n &&
                  ((s.style.backfaceVisibility = "hidden"),
                  (s.style["-webkit-backface-visibility"] = "hidden")),
                s);
            ((n.style.opacity = r),
              (n.style.transform = `translate3d(${e}px, ${t}px, 0px)`));
          }
        },
        setTransition: (t) => {
          var e = a.slides.map((e) => W(e));
          (e.forEach((e) => {
            e.style.transitionDuration = t + "ms";
          }),
            ye({
              swiper: a,
              duration: t,
              transformElements: e,
              allSlides: !0,
            }));
        },
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !a.params.cssMode,
        }),
      });
      (r("beforeInit", () => {
        var e;
        n.params.effect === s &&
          (n.classNames.push("" + n.params.containerModifierClass + s),
          c && c() && n.classNames.push(n.params.containerModifierClass + "3d"),
          (e = d ? d() : {}),
          Object.assign(n.params, e),
          Object.assign(n.originalParams, e));
      }),
        r("setTranslate", () => {
          n.params.effect === s && o();
        }),
        r("setTransition", (e, t) => {
          n.params.effect === s && l(t);
        }),
        r("transitionEnd", () => {
          n.params.effect === s &&
            u &&
            h &&
            h().slideShadows &&
            (n.slides.forEach((e) => {
              e.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
              ).forEach((e) => e.remove());
            }),
            u());
        }));
      let e;
      r("virtualUpdate", () => {
        n.params.effect === s &&
          (n.slides.length || (e = !0),
          requestAnimationFrame(() => {
            e && n.slides && n.slides.length && (o(), (e = !1));
          }));
      });
    }
  }
  function we() {
    return (we = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i,
              s = arguments[t];
            for (i in s)
              Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
          }
          return e;
        }).apply(this, arguments);
  }
  function be(e, t, i) {
    return Math.max(e, Math.min(t, i));
  }
  (Object.keys(me).forEach((t) => {
    Object.keys(me[t]).forEach((e) => {
      d.prototype[e] = me[t][e];
    });
  }),
    d.use([
      function (e) {
        let { swiper: r, on: t, emit: i } = e;
        const s = p();
        let n = null,
          a = null;
        const o = () => {
            r &&
              !r.destroyed &&
              r.initialized &&
              (i("beforeResize"), i("resize"));
          },
          l = () => {
            r && !r.destroyed && r.initialized && i("orientationchange");
          };
        (t("init", () => {
          r.params.resizeObserver && void 0 !== s.ResizeObserver
            ? r &&
              !r.destroyed &&
              r.initialized &&
              (n = new ResizeObserver((i) => {
                a = s.requestAnimationFrame(() => {
                  var { width: e, height: t } = r;
                  let s = e,
                    n = t;
                  (i.forEach((e) => {
                    var { contentBoxSize: e, contentRect: t, target: i } = e;
                    (i && i !== r.el) ||
                      ((s = t ? t.width : (e[0] || e).inlineSize),
                      (n = t ? t.height : (e[0] || e).blockSize));
                  }),
                    (s === e && n === t) || o());
                });
              })).observe(r.el)
            : (s.addEventListener("resize", o),
              s.addEventListener("orientationchange", l));
        }),
          t("destroy", () => {
            (a && s.cancelAnimationFrame(a),
              n && n.unobserve && r.el && (n.unobserve(r.el), (n = null)),
              s.removeEventListener("resize", o),
              s.removeEventListener("orientationchange", l));
          }));
      },
      function (e) {
        let { swiper: s, extendParams: t, on: i, emit: n } = e;
        function r(e, t) {
          void 0 === t && (t = {});
          var i = new (o.MutationObserver || o.WebkitMutationObserver)((e) => {
            var t;
            s.__preventObserver__ ||
              (1 === e.length
                ? n("observerUpdate", e[0])
                : ((t = function () {
                    n("observerUpdate", e[0]);
                  }),
                  o.requestAnimationFrame
                    ? o.requestAnimationFrame(t)
                    : o.setTimeout(t, 0)));
          });
          (i.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            a.push(i));
        }
        const a = [],
          o = p();
        (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (s.params.observer) {
              if (s.params.observeParents) {
                var t = (function (e, t) {
                  var i = [];
                  let s = e.parentElement;
                  for (; s; )
                    ((t && !s.matches(t)) || i.push(s), (s = s.parentElement));
                  return i;
                })(s.hostEl);
                for (let e = 0; e < t.length; e += 1) r(t[e]);
              }
              (r(s.hostEl, { childList: s.params.observeSlideChildren }),
                r(s.wrapperEl, { attributes: !1 }));
            }
          }),
          i("destroy", () => {
            (a.forEach((e) => {
              e.disconnect();
            }),
              a.splice(0, a.length));
          }));
      },
    ]));
  class _e {
    advance(t) {
      var i, s, n, r;
      if (this.isRunning) {
        let e = !1;
        if (this.lerp)
          ((this.value =
            ((s = this.value),
            (n = this.to),
            (1 - (r = 1 - Math.exp(-60 * this.lerp * t))) * s + r * n)),
            Math.round(this.value) === this.to &&
              ((this.value = this.to), (e = !0)));
        else {
          this.currentTime += t;
          const i = be(0, this.currentTime / this.duration, 1),
            s = (e = 1 <= i) ? 1 : this.easing(i);
          this.value = this.from + (this.to - this.from) * s;
        }
        (null != (i = this.onUpdate) && i.call(this, this.value, e),
          e && this.stop());
      }
    }
    stop() {
      this.isRunning = !1;
    }
    fromTo(
      e,
      t,
      {
        lerp: i = 0.1,
        duration: s = 1,
        easing: n = (e) => e,
        onStart: r,
        onUpdate: a,
      },
    ) {
      ((this.from = this.value = e),
        (this.to = t),
        (this.lerp = i),
        (this.duration = s),
        (this.easing = n),
        (this.currentTime = 0),
        (this.isRunning = !0),
        null != r && r(),
        (this.onUpdate = a));
    }
  }
  class Se {
    constructor({ wrapper: e, content: t, autoResize: i = !0 } = {}) {
      if (
        ((this.resize = () => {
          (this.onWrapperResize(), this.onContentResize());
        }),
        (this.onWrapperResize = () => {
          this.wrapper === window
            ? ((this.width = window.innerWidth),
              (this.height = window.innerHeight))
            : ((this.width = this.wrapper.clientWidth),
              (this.height = this.wrapper.clientHeight));
        }),
        (this.onContentResize = () => {
          ((this.scrollHeight = this.content.scrollHeight),
            (this.scrollWidth = this.content.scrollWidth));
        }),
        (this.wrapper = e),
        (this.content = t),
        i)
      ) {
        const e = (function (i) {
          let s;
          return function () {
            let e = arguments,
              t = this;
            (clearTimeout(s),
              (s = setTimeout(function () {
                i.apply(t, e);
              }, 250)));
          };
        })(this.resize);
        (this.wrapper !== window &&
          ((this.wrapperResizeObserver = new ResizeObserver(e)),
          this.wrapperResizeObserver.observe(this.wrapper)),
          (this.contentResizeObserver = new ResizeObserver(e)),
          this.contentResizeObserver.observe(this.content));
      }
      this.resize();
    }
    destroy() {
      var e;
      (null != (e = this.wrapperResizeObserver) && e.disconnect(),
        null != (e = this.contentResizeObserver) && e.disconnect());
    }
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height,
      };
    }
  }
  class xe {
    constructor() {
      this.events = {};
    }
    emit(e, ...i) {
      var s = this.events[e] || [];
      for (let e = 0, t = s.length; e < t; e++) s[e](...i);
    }
    on(t, i) {
      var e;
      return (
        (null != (e = this.events[t]) && e.push(i)) || (this.events[t] = [i]),
        () => {
          var e;
          this.events[t] =
            null == (e = this.events[t]) ? void 0 : e.filter((e) => i !== e);
        }
      );
    }
    off(e, t) {
      this.events[e] =
        null == (e = this.events[e]) ? void 0 : e.filter((e) => t !== e);
    }
    destroy() {
      this.events = {};
    }
  }
  class Te {
    constructor(
      e,
      {
        wheelMultiplier: t = 1,
        touchMultiplier: i = 2,
        normalizeWheel: s = !1,
      },
    ) {
      ((this.onTouchStart = (e) => {
        var { clientX: e, clientY: t } = e.targetTouches
          ? e.targetTouches[0]
          : e;
        ((this.touchStart.x = e),
          (this.touchStart.y = t),
          (this.lastDelta = { x: 0, y: 0 }));
      }),
        (this.onTouchMove = (e) => {
          var { clientX: t, clientY: i } = e.targetTouches
              ? e.targetTouches[0]
              : e,
            s = -(t - this.touchStart.x) * this.touchMultiplier,
            n = -(i - this.touchStart.y) * this.touchMultiplier;
          ((this.touchStart.x = t),
            (this.touchStart.y = i),
            (this.lastDelta = { x: s, y: n }),
            this.emitter.emit("scroll", { deltaX: s, deltaY: n, event: e }));
        }),
        (this.onTouchEnd = (e) => {
          this.emitter.emit("scroll", {
            deltaX: this.lastDelta.x,
            deltaY: this.lastDelta.y,
            event: e,
          });
        }),
        (this.onWheel = (e) => {
          let { deltaX: t, deltaY: i } = e;
          (this.normalizeWheel &&
            ((t = be(-100, t, 100)), (i = be(-100, i, 100))),
            (t *= this.wheelMultiplier),
            (i *= this.wheelMultiplier),
            this.emitter.emit("scroll", { deltaX: t, deltaY: i, event: e }));
        }),
        (this.element = e),
        (this.wheelMultiplier = t),
        (this.touchMultiplier = i),
        (this.normalizeWheel = s),
        (this.touchStart = { x: null, y: null }),
        (this.emitter = new xe()),
        this.element.addEventListener("wheel", this.onWheel, { passive: !1 }),
        this.element.addEventListener("touchstart", this.onTouchStart, {
          passive: !1,
        }),
        this.element.addEventListener("touchmove", this.onTouchMove, {
          passive: !1,
        }),
        this.element.addEventListener("touchend", this.onTouchEnd, {
          passive: !1,
        }));
    }
    on(e, t) {
      return this.emitter.on(e, t);
    }
    destroy() {
      (this.emitter.destroy(),
        this.element.removeEventListener("wheel", this.onWheel, {
          passive: !1,
        }),
        this.element.removeEventListener("touchstart", this.onTouchStart, {
          passive: !1,
        }),
        this.element.removeEventListener("touchmove", this.onTouchMove, {
          passive: !1,
        }),
        this.element.removeEventListener("touchend", this.onTouchEnd, {
          passive: !1,
        }));
    }
  }
  class Ce {
    constructor({
      wrapper: e = window,
      content: t = document.documentElement,
      wheelEventsTarget: i = e,
      eventsTarget: s = i,
      smoothWheel: n = !0,
      smoothTouch: r = !1,
      syncTouch: a = !1,
      syncTouchLerp: o = 0.1,
      __iosNoInertiaSyncTouchLerp: l = 0.4,
      touchInertiaMultiplier: d = 35,
      duration: c,
      easing: u = (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
      lerp: h = !c && 0.1,
      infinite: p = !1,
      orientation: m = "vertical",
      gestureOrientation: g = "vertical",
      touchMultiplier: f = 1,
      wheelMultiplier: y = 1,
      normalizeWheel: v = !1,
      autoResize: w = !0,
    } = {}) {
      ((this.onVirtualScroll = ({ deltaX: t, deltaY: i, event: s }) => {
        if (!s.ctrlKey) {
          const n = s.type.includes("touch"),
            r = s.type.includes("wheel");
          if (
            !(
              ("both" === this.options.gestureOrientation &&
                0 === t &&
                0 === i) ||
              ("vertical" === this.options.gestureOrientation && 0 === i) ||
              ("horizontal" === this.options.gestureOrientation && 0 === t) ||
              (n &&
                "vertical" === this.options.gestureOrientation &&
                0 === this.scroll &&
                !this.options.infinite &&
                i <= 0)
            )
          ) {
            let e = s.composedPath();
            if (
              !(e = e.slice(0, e.indexOf(this.rootElement))).find((e) => {
                return (
                  (null == e.hasAttribute
                    ? void 0
                    : e.hasAttribute("data-lenis-prevent")) ||
                  (n &&
                    (null == e.hasAttribute
                      ? void 0
                      : e.hasAttribute("data-lenis-prevent-touch"))) ||
                  (r &&
                    (null == e.hasAttribute
                      ? void 0
                      : e.hasAttribute("data-lenis-prevent-wheel"))) ||
                  (null == (e = e.classList) ? void 0 : e.contains("lenis"))
                );
              })
            )
              if (this.isStopped || this.isLocked) s.preventDefault();
              else if (
                ((this.isSmooth =
                  ((this.options.smoothTouch || this.options.syncTouch) && n) ||
                  (this.options.smoothWheel && r)),
                this.isSmooth)
              ) {
                s.preventDefault();
                let e = i;
                "both" === this.options.gestureOrientation
                  ? (e = Math.abs(i) > Math.abs(t) ? i : t)
                  : "horizontal" === this.options.gestureOrientation && (e = t);
                ((i = n && this.options.syncTouch),
                  (t = n && "touchend" === s.type && 1 < Math.abs(e)));
                (t && (e = this.velocity * this.options.touchInertiaMultiplier),
                  this.scrollTo(
                    this.targetScroll + e,
                    we(
                      { programmatic: !1 },
                      i && {
                        lerp: t
                          ? this.syncTouchLerp
                          : this.options.__iosNoInertiaSyncTouchLerp,
                      },
                    ),
                  ));
              } else ((this.isScrolling = !1), this.animate.stop());
          }
        }
      }),
        (this.onScroll = () => {
          var e;
          this.isScrolling ||
            ((e = this.animatedScroll),
            (this.animatedScroll = this.targetScroll = this.actualScroll),
            (this.velocity = 0),
            (this.direction = Math.sign(this.animatedScroll - e)),
            this.emit());
        }),
        (window.lenisVersion = "1.0.27"),
        (e !== document.documentElement && e !== document.body) || (e = window),
        (this.options = {
          wrapper: e,
          content: t,
          wheelEventsTarget: i,
          eventsTarget: s,
          smoothWheel: n,
          smoothTouch: r,
          syncTouch: a,
          syncTouchLerp: o,
          __iosNoInertiaSyncTouchLerp: l,
          touchInertiaMultiplier: d,
          duration: c,
          easing: u,
          lerp: h,
          infinite: p,
          gestureOrientation: g,
          orientation: m,
          touchMultiplier: f,
          wheelMultiplier: y,
          normalizeWheel: v,
          autoResize: w,
        }),
        (this.animate = new _e()),
        (this.emitter = new xe()),
        (this.dimensions = new Se({ wrapper: e, content: t, autoResize: w })),
        this.toggleClass("lenis", !0),
        (this.velocity = 0),
        (this.isLocked = !1),
        (this.isStopped = !1),
        (this.isSmooth = a || n || r),
        (this.isScrolling = !1),
        (this.targetScroll = this.animatedScroll = this.actualScroll),
        this.options.wrapper.addEventListener("scroll", this.onScroll, {
          passive: !1,
        }),
        (this.virtualScroll = new Te(s, {
          touchMultiplier: f,
          wheelMultiplier: y,
          normalizeWheel: v,
        })),
        this.virtualScroll.on("scroll", this.onVirtualScroll));
    }
    destroy() {
      (this.emitter.destroy(),
        this.options.wrapper.removeEventListener("scroll", this.onScroll, {
          passive: !1,
        }),
        this.virtualScroll.destroy(),
        this.dimensions.destroy(),
        this.toggleClass("lenis", !1),
        this.toggleClass("lenis-smooth", !1),
        this.toggleClass("lenis-scrolling", !1),
        this.toggleClass("lenis-stopped", !1),
        this.toggleClass("lenis-locked", !1));
    }
    on(e, t) {
      return this.emitter.on(e, t);
    }
    off(e, t) {
      return this.emitter.off(e, t);
    }
    setScroll(e) {
      this.isHorizontal
        ? (this.rootElement.scrollLeft = e)
        : (this.rootElement.scrollTop = e);
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      ((this.isLocked = !1),
        (this.isScrolling = !1),
        (this.velocity = 0),
        this.animate.stop());
    }
    start() {
      ((this.isStopped = !1), this.reset());
    }
    stop() {
      ((this.isStopped = !0), this.animate.stop(), this.reset());
    }
    raf(e) {
      var t = e - (this.time || e);
      ((this.time = e), this.animate.advance(0.001 * t));
    }
    scrollTo(
      t,
      {
        offset: i = 0,
        immediate: s = !1,
        lock: e = !1,
        duration: n = this.options.duration,
        easing: r = this.options.easing,
        lerp: a = !n && this.options.lerp,
        onComplete: o = null,
        force: l = !1,
        programmatic: d = !0,
      } = {},
    ) {
      if ((!this.isStopped && !this.isLocked) || l) {
        if (["top", "left", "start"].includes(t)) t = 0;
        else if (["bottom", "right", "end"].includes(t)) t = this.limit;
        else {
          let e;
          if (
            ("string" == typeof t
              ? (e = document.querySelector(t))
              : null != t && t.nodeType && (e = t),
            e)
          ) {
            if (this.options.wrapper !== window) {
              const t = this.options.wrapper.getBoundingClientRect();
              i -= this.isHorizontal ? t.left : t.top;
            }
            const s = e.getBoundingClientRect();
            t = (this.isHorizontal ? s.left : s.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t)
          if (
            ((t += i),
            (t = Math.round(t)),
            this.options.infinite
              ? d && (this.targetScroll = this.animatedScroll = this.scroll)
              : (t = be(0, t, this.limit)),
            s)
          )
            ((this.animatedScroll = this.targetScroll = t),
              this.setScroll(this.scroll),
              this.reset(),
              null != o && o(this));
          else {
            if (!d) {
              if (t === this.targetScroll) return;
              this.targetScroll = t;
            }
            this.animate.fromTo(this.animatedScroll, t, {
              duration: n,
              easing: r,
              lerp: a,
              onStart: () => {
                (e && (this.isLocked = !0), (this.isScrolling = !0));
              },
              onUpdate: (e, t) => {
                ((this.isScrolling = !0),
                  (this.velocity = e - this.animatedScroll),
                  (this.direction = Math.sign(this.velocity)),
                  (this.animatedScroll = e),
                  this.setScroll(this.scroll),
                  d && (this.targetScroll = e),
                  t || this.emit(),
                  t &&
                    requestAnimationFrame(() => {
                      (this.reset(), this.emit(), null != o && o(this));
                    }));
              },
            });
          }
      }
    }
    get rootElement() {
      return this.options.wrapper === window
        ? this.options.content
        : this.options.wrapper;
    }
    get limit() {
      return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal
        ? this.rootElement.scrollLeft
        : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite
        ? ((this.animatedScroll % (e = this.limit)) + e) % e
        : this.animatedScroll;
      var e;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isSmooth() {
      return this.__isSmooth;
    }
    set isSmooth(e) {
      this.__isSmooth !== e &&
        ((this.__isSmooth = e), this.toggleClass("lenis-smooth", e));
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(e) {
      this.__isScrolling !== e &&
        ((this.__isScrolling = e), this.toggleClass("lenis-scrolling", e));
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(e) {
      this.__isStopped !== e &&
        ((this.__isStopped = e), this.toggleClass("lenis-stopped", e));
    }
    get isLocked() {
      return this.__isLocked;
    }
    set isLocked(e) {
      this.__isLocked !== e &&
        ((this.__isLocked = e), this.toggleClass("lenis-locked", e));
    }
    get className() {
      let e = "lenis";
      return (
        this.isStopped && (e += " lenis-stopped"),
        this.isLocked && (e += " lenis-locked"),
        this.isScrolling && (e += " lenis-scrolling"),
        this.isSmooth && (e += " lenis-smooth"),
        e
      );
    }
    toggleClass(e, t) {
      (this.rootElement.classList.toggle(e, t),
        this.emitter.emit("className change", this));
    }
  }
  function De(t, e) {
    let i;
    var s = "LazyLoad::Initialized",
      t = new t(e);
    try {
      i = new CustomEvent(s, { detail: { instance: t } });
    } catch (e) {
      (i = document.createEvent("CustomEvent")).initCustomEvent(s, !1, !1, {
        instance: t,
      });
    }
    window.dispatchEvent(i);
  }
  const a = "undefined" != typeof window,
    Me =
      (a && !("onscroll" in window)) ||
      ("undefined" != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    ke = a && "IntersectionObserver" in window,
    Ee = a && "classList" in document.createElement("p"),
    Ie = a && 1 < window.devicePixelRatio,
    Oe = {
      elements_selector: ".lazy",
      container: Me || a ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      data_bg_hidpi: "bg-hidpi",
      data_bg_multi: "bg-multi",
      data_bg_multi_hidpi: "bg-multi-hidpi",
      data_bg_set: "bg-set",
      data_poster: "poster",
      class_applied: "applied",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      class_entered: "entered",
      class_exited: "exited",
      unobserve_completed: !0,
      unobserve_entered: !1,
      cancel_on_exit: !0,
      callback_enter: null,
      callback_exit: null,
      callback_applied: null,
      callback_loading: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      callback_cancel: null,
      use_native: !1,
      restore_on_error: !1,
    },
    Le = (e) => Object.assign({}, Oe, e);
  const r = "src",
    Pe = "srcset",
    je = "sizes",
    Ye = "llOriginalAttrs",
    ze = "loading",
    Ae = "applied",
    Ne = "error",
    Ve = "native",
    Ge = "data-",
    Qe = "ll-status",
    o = (e, t) => e.getAttribute(Ge + t),
    Fe = (e) => o(e, Qe),
    c = (e, t) => {
      var i = Qe;
      ((i = Ge + i), null === t ? e.removeAttribute(i) : e.setAttribute(i, t));
    },
    Re = (e) => c(e, null),
    He = (e) => null === Fe(e),
    Be = (e) => Fe(e) === Ve,
    We = [ze, "loaded", Ae, Ne],
    u = (e, t, i, s) => {
      e &&
        "function" == typeof e &&
        (void 0 !== s ? e(t, i, s) : void 0 !== i ? e(t, i) : e(t));
    },
    m = (e, t) => {
      Ee ? e.classList.add(t) : (e.className += (e.className ? " " : "") + t);
    },
    l = (e, t) => {
      Ee
        ? e.classList.remove(t)
        : (e.className = e.className
            .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
            .replace(/^\s+/, "")
            .replace(/\s+$/, ""));
    },
    Ue = (e) => {
      e.llTempImage = document.createElement("IMG");
    },
    $e = (e) => e.llTempImage,
    qe = (e, t) => {
      t && (t = t._observer) && t.unobserve(e);
    },
    Xe = (e, t) => {
      e && (e.loadingCount += t);
    },
    Ze = (e, t) => {
      e && (e.toLoadCount = t);
    },
    Je = (i) => {
      var s = [];
      for (let e = 0, t; (t = i.children[e]); e += 1)
        "SOURCE" === t.tagName && s.push(t);
      return s;
    },
    Ke = (e, t) => {
      e = e.parentNode;
      e && "PICTURE" === e.tagName && Je(e).forEach(t);
    },
    et = (e, t) => {
      Je(e).forEach(t);
    },
    tt = [r],
    it = [r, "poster"],
    st = [r, Pe, je],
    nt = ["data"],
    rt = (e) => !!e[Ye],
    at = (e) => e[Ye],
    ot = (e) => delete e[Ye],
    i = (t, e) => {
      if (!rt(t)) {
        const i = {};
        (e.forEach((e) => {
          i[e] = t.getAttribute(e);
        }),
          (t[Ye] = i));
      }
    },
    lt = (e) => {
      rt(e) || (e[Ye] = { backgroundImage: e.style.backgroundImage });
    },
    dt = (e, t, i) => {
      i ? e.setAttribute(t, i) : e.removeAttribute(t);
    },
    g = (t, e) => {
      if (rt(t)) {
        const i = at(t);
        e.forEach((e) => {
          dt(t, e, i[e]);
        });
      }
    },
    ct = (e) => {
      var t;
      rt(e) && ((t = at(e)), (e.style.backgroundImage = t.backgroundImage));
    },
    ut = (e, t, i) => {
      (m(e, t.class_applied),
        c(e, Ae),
        i && (t.unobserve_completed && qe(e, t), u(t.callback_applied, e, i)));
    },
    ht = (e, t, i) => {
      (m(e, t.class_loading),
        c(e, ze),
        i && (Xe(i, 1), u(t.callback_loading, e, i)));
    },
    s = (e, t, i) => {
      i && e.setAttribute(t, i);
    },
    pt = (e, t) => {
      (s(e, je, o(e, t.data_sizes)),
        s(e, Pe, o(e, t.data_srcset)),
        s(e, r, o(e, t.data_src)));
    };
  const mt = (e, t, i) => {
      var s = o(e, t.data_bg),
        n = o(e, t.data_bg_hidpi),
        n = Ie && n ? n : s;
      n &&
        ((e.style.backgroundImage = `url("${n}")`),
        $e(e).setAttribute(r, n),
        ht(e, t, i));
    },
    gt = (e, t, i) => {
      var s = o(e, t.data_bg_multi),
        n = o(e, t.data_bg_multi_hidpi),
        n = Ie && n ? n : s;
      n && ((e.style.backgroundImage = n), ut(e, t, i));
    },
    ft = (t, i, s) => {
      var n = o(t, i.data_bg_set);
      if (n) {
        n = n.split("|");
        let e = n.map((e) => `image-set(${e})`);
        ((t.style.backgroundImage = e.join()),
          "" === t.style.backgroundImage &&
            ((e = n.map((e) => `-webkit-image-set(${e})`)),
            (t.style.backgroundImage = e.join())),
          ut(t, i, s));
      }
    },
    yt = {
      IMG: (e, t) => {
        (Ke(e, (e) => {
          (i(e, st), pt(e, t));
        }),
          i(e, st),
          pt(e, t));
      },
      IFRAME: (e, t) => {
        (i(e, tt), s(e, r, o(e, t.data_src)));
      },
      VIDEO: (e, t) => {
        (et(e, (e) => {
          (i(e, tt), s(e, r, o(e, t.data_src)));
        }),
          i(e, it),
          s(e, "poster", o(e, t.data_poster)),
          s(e, r, o(e, t.data_src)),
          e.load());
      },
      OBJECT: (e, t) => {
        (i(e, nt), s(e, "data", o(e, t.data_src)));
      },
    },
    vt = (e, t) => {
      var i = yt[e.tagName];
      i && i(e, t);
    },
    wt = (e, t, i) => {
      var s = yt[e.tagName];
      s && (s(e, t), ht(e, t, i));
    },
    bt = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
    _t = (e, t) => {
      !t || 0 < t.loadingCount || 0 < t.toLoadCount || u(e.callback_finish, t);
    },
    St = (e, t, i) => {
      (e.addEventListener(t, i), (e.llEvLisnrs[t] = i));
    },
    xt = (e) => !!e.llEvLisnrs,
    Tt = (e) => {
      if (xt(e)) {
        var t,
          i,
          s = e.llEvLisnrs;
        for (t in s) {
          var n = s[t];
          ((i = t), e.removeEventListener(i, n));
        }
        delete e.llEvLisnrs;
      }
    },
    Ct = (e, t, i) => {
      var s;
      (delete e.llTempImage,
        Xe(i, -1),
        (s = i) && --s.toLoadCount,
        l(e, t.class_loading),
        t.unobserve_completed && qe(e, i));
    },
    Dt = (r, a, o) => {
      const l = $e(r) || r;
      var e, t, i, s;
      xt(l) ||
        ((e = l),
        (t = (e) => {
          var t, i, s, n;
          ((t = r),
            (i = a),
            (s = o),
            (n = Be(t)),
            Ct(t, i, s),
            m(t, i.class_loaded),
            c(t, "loaded"),
            u(i.callback_loaded, t, s),
            n || _t(i, s),
            Tt(l));
        }),
        (i = (e) => {
          var t, i, s, n;
          ((t = r),
            (i = a),
            (s = o),
            (n = Be(t)),
            Ct(t, i, s),
            m(t, i.class_error),
            c(t, Ne),
            u(i.callback_error, t, s),
            i.restore_on_error && g(t, st),
            n || _t(i, s),
            Tt(l));
        }),
        xt(e) || (e.llEvLisnrs = {}),
        (s = "VIDEO" === e.tagName ? "loadeddata" : "load"),
        St(e, s, t),
        St(e, "error", i));
    },
    Mt = (e, t, i) => {
      var s, n, r;
      ((r = e),
        -1 < bt.indexOf(r.tagName)
          ? ((r = e), (s = t), (n = i), Dt(r, s, n), wt(r, s, n))
          : ((r = e),
            (s = t),
            (n = i),
            Ue(r),
            Dt(r, s, n),
            lt(r),
            mt(r, s, n),
            gt(r, s, n),
            ft(r, s, n)));
    },
    kt = (e) => {
      (e.removeAttribute(r), e.removeAttribute(Pe), e.removeAttribute(je));
    },
    Et = (e) => {
      (Ke(e, (e) => {
        g(e, st);
      }),
        g(e, st));
    };
  const It = {
      IMG: Et,
      IFRAME: (e) => {
        g(e, tt);
      },
      VIDEO: (e) => {
        (et(e, (e) => {
          g(e, tt);
        }),
          g(e, it),
          e.load());
      },
      OBJECT: (e) => {
        g(e, nt);
      },
    },
    Ot = (e, t) => {
      var i;
      ((i = e),
        (It[i.tagName] || ct)(i),
        (i = e),
        (t = t),
        He(i) ||
          Be(i) ||
          (l(i, t.class_entered),
          l(i, t.class_exited),
          l(i, t.class_applied),
          l(i, t.class_loading),
          l(i, t.class_loaded),
          l(i, t.class_error)),
        Re(e),
        ot(e));
    },
    Lt = (e, t, i, s) => {
      var n;
      i.cancel_on_exit &&
        ((n = e), Fe(n) === ze) &&
        "IMG" === e.tagName &&
        (Tt(e),
        (n = e),
        Ke(n, (e) => {
          kt(e);
        }),
        kt(n),
        Et(e),
        l(e, i.class_loading),
        Xe(s, -1),
        Re(e),
        u(i.callback_cancel, e, t, s));
    },
    Pt = (e, t, i, s) => {
      a = e;
      var n,
        r,
        a = 0 <= We.indexOf(Fe(a));
      (c(e, "entered"),
        m(e, i.class_entered),
        l(e, i.class_exited),
        (n = e),
        (r = s),
        i.unobserve_entered && qe(n, r),
        u(i.callback_enter, e, t, s),
        a || Mt(e, i, s));
    },
    jt = ["IMG", "IFRAME", "VIDEO"],
    Yt = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
    zt = (e, s, n) => {
      (e.forEach((e) => {
        var t, i;
        -1 !== jt.indexOf(e.tagName) &&
          ((t = s),
          (i = n),
          (e = e).setAttribute("loading", "lazy"),
          Dt(e, t, i),
          vt(e, t),
          c(e, Ve));
      }),
        Ze(n, 0));
    },
    At = (e) => ({
      root: e.container === document ? null : e.container,
      rootMargin: e.thresholds || e.threshold + "px",
    }),
    Nt = (e, n, r) => {
      e.forEach((e) => {
        return (s = e).isIntersecting || 0 < s.intersectionRatio
          ? Pt(e.target, e, n, r)
          : ((s = e.target),
            (e = e),
            (t = n),
            (i = r),
            void (
              He(s) ||
              (m(s, t.class_exited),
              Lt(s, e, t, i),
              u(t.callback_exit, s, e, i))
            ));
        var t, i, s;
      });
    },
    Vt = (e) => Array.prototype.slice.call(e),
    Gt = (e) => e.container.querySelectorAll(e.elements_selector),
    Qt = (e) => {
      return ((e = e), Fe(e) === Ne);
    },
    Ft = (e, t) => {
      return ((e = e || Gt(t)), Vt(e).filter(He));
    },
    Rt = (t, e) => {
      var i;
      ((i = Gt(t)),
        Vt(i)
          .filter(Qt)
          .forEach((e) => {
            (l(e, t.class_error), Re(e));
          }),
        e.update());
    };
  function Ht(e, t) {
    var i,
      s,
      n,
      r,
      e = Le(e);
    ((this._settings = e),
      (this.loadingCount = 0),
      (i = e),
      (s = this),
      ke &&
        !Yt(i) &&
        (s._observer = new IntersectionObserver((e) => {
          Nt(e, i, s);
        }, At(i))),
      (n = e),
      (r = this),
      a &&
        ((r._onlineHandler = () => {
          Rt(n, r);
        }),
        window.addEventListener("online", r._onlineHandler)),
      this.update(t));
  }
  if (
    ((Ht.prototype = {
      update: function (e) {
        var t,
          i = this._settings,
          e = Ft(e, i);
        (Ze(this, e.length),
          Me || !ke
            ? this.loadAll(e)
            : Yt(i)
              ? zt(e, i, this)
              : ((i = this._observer),
                (e = e),
                i.disconnect(),
                (t = i),
                e.forEach((e) => {
                  t.observe(e);
                })));
      },
      destroy: function () {
        var e;
        (this._observer && this._observer.disconnect(),
          (e = this),
          a && window.removeEventListener("online", e._onlineHandler),
          Gt(this._settings).forEach((e) => {
            ot(e);
          }),
          delete this._observer,
          delete this._settings,
          delete this._onlineHandler,
          delete this.loadingCount,
          delete this.toLoadCount);
      },
      loadAll: function (e) {
        const t = this._settings;
        Ft(e, t).forEach((e) => {
          (qe(e, this), Mt(e, t, this));
        });
      },
      restoreAll: function () {
        const t = this._settings;
        Gt(t).forEach((e) => {
          Ot(e, t);
        });
      },
    }),
    (Ht.load = (e, t) => {
      t = Le(t);
      Mt(e, t);
    }),
    (Ht.resetStatus = (e) => {
      Re(e);
    }),
    a)
  ) {
    var Bt = Ht,
      Wt = window.lazyLoadOptions;
    if (Wt)
      if (Wt.length) for (let e = 0, t; (t = Wt[e]); e += 1) De(Bt, t);
      else De(Bt, Wt);
  }
  var n = function () {
    return (n =
      Object.assign ||
      function (e) {
        for (var t, i = 1, s = arguments.length; i < s; i++)
          for (var n in (t = arguments[i]))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      }).apply(this, arguments);
  };
  var Ut = "lgAfterAppendSlide",
    $t = "lgInit",
    qt = "lgHasVideo",
    Xt = "lgContainerResize",
    Zt = "lgUpdateSlides",
    Jt = "lgAfterAppendSubHtml",
    Kt = "lgBeforeOpen",
    ei = "lgAfterOpen",
    ti = "lgSlideItemLoad",
    ii = "lgBeforeSlide",
    si = "lgAfterSlide",
    ni = "lgPosterClick",
    ri = "lgDragStart",
    ai = "lgDragMove",
    oi = "lgDragEnd",
    li = "lgBeforeNextSlide",
    di = "lgBeforePrevSlide",
    ci = "lgBeforeClose",
    ui = "lgAfterClose",
    hi = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      resetScrollPosition: !0,
      hideScrollbar: !1,
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      trapFocus: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
      strings: {
        closeGallery: "Close gallery",
        toggleMaximize: "Toggle maximize",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
        download: "Download",
        playVideo: "Play video",
        mediaLoadingFailed: "Oops... Failed to load content...",
      },
    };
  function pi() {
    ("function" != typeof window.CustomEvent &&
      (window.CustomEvent = function (e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: null };
        var i = document.createEvent("CustomEvent");
        return (i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i);
      }),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector));
  }
  ((f.generateUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (e) {
        var t = (16 * Math.random()) | 0;
        return ("x" == e ? t : (3 & t) | 8).toString(16);
      },
    );
  }),
    (f.prototype._getSelector = function (e, t) {
      return (
        void 0 === t && (t = document),
        "string" != typeof e
          ? e
          : ((t = t || document),
            "#" === e.substring(0, 1)
              ? t.querySelector(e)
              : t.querySelectorAll(e))
      );
    }),
    (f.prototype._each = function (e) {
      return (
        this.selector &&
          (void 0 !== this.selector.length
            ? [].forEach.call(this.selector, e)
            : e(this.selector, 0)),
        this
      );
    }),
    (f.prototype._setCssVendorPrefix = function (e, t, i) {
      t = t.replace(/-([a-z])/gi, function (e, t) {
        return t.toUpperCase();
      });
      -1 !== this.cssVenderPrefixes.indexOf(t)
        ? ((e.style[t.charAt(0).toLowerCase() + t.slice(1)] = i),
          (e.style["webkit" + t] = i),
          (e.style["moz" + t] = i),
          (e.style["ms" + t] = i),
          (e.style["o" + t] = i))
        : (e.style[t] = i);
    }),
    (f.prototype._getFirstEl = function () {
      return this.selector && void 0 !== this.selector.length
        ? this.selector[0]
        : this.selector;
    }),
    (f.prototype.isEventMatched = function (e, t) {
      var i = t.split(".");
      return e
        .split(".")
        .filter(function (e) {
          return e;
        })
        .every(function (e) {
          return -1 !== i.indexOf(e);
        });
    }),
    (f.prototype.attr = function (t, i) {
      return void 0 === i
        ? this.firstElement
          ? this.firstElement.getAttribute(t)
          : ""
        : (this._each(function (e) {
            e.setAttribute(t, i);
          }),
          this);
    }),
    (f.prototype.find = function (e) {
      return b(this._getSelector(e, this.selector));
    }),
    (f.prototype.first = function () {
      return this.selector && void 0 !== this.selector.length
        ? b(this.selector[0])
        : b(this.selector);
    }),
    (f.prototype.eq = function (e) {
      return b(this.selector[e]);
    }),
    (f.prototype.parent = function () {
      return b(this.selector.parentElement);
    }),
    (f.prototype.get = function () {
      return this._getFirstEl();
    }),
    (f.prototype.removeAttr = function (e) {
      var i = e.split(" ");
      return (
        this._each(function (t) {
          i.forEach(function (e) {
            return t.removeAttribute(e);
          });
        }),
        this
      );
    }),
    (f.prototype.wrap = function (e) {
      var t;
      return (
        this.firstElement &&
          (((t = document.createElement("div")).className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement)),
        this
      );
    }),
    (f.prototype.addClass = function (e) {
      return (
        void 0 === e && (e = ""),
        this._each(function (t) {
          e.split(" ").forEach(function (e) {
            e && t.classList.add(e);
          });
        }),
        this
      );
    }),
    (f.prototype.removeClass = function (e) {
      return (
        this._each(function (t) {
          e.split(" ").forEach(function (e) {
            e && t.classList.remove(e);
          });
        }),
        this
      );
    }),
    (f.prototype.hasClass = function (e) {
      return !!this.firstElement && this.firstElement.classList.contains(e);
    }),
    (f.prototype.hasAttribute = function (e) {
      return !!this.firstElement && this.firstElement.hasAttribute(e);
    }),
    (f.prototype.toggleClass = function (e) {
      return (
        this.firstElement &&
          (this.hasClass(e) ? this.removeClass(e) : this.addClass(e)),
        this
      );
    }),
    (f.prototype.css = function (t, i) {
      var s = this;
      return (
        this._each(function (e) {
          s._setCssVendorPrefix(e, t, i);
        }),
        this
      );
    }),
    (f.prototype.on = function (e, t) {
      var i = this;
      return (
        this.selector &&
          e.split(" ").forEach(function (e) {
            (Array.isArray(f.eventListeners[e]) || (f.eventListeners[e] = []),
              f.eventListeners[e].push(t),
              i.selector.addEventListener(e.split(".")[0], t));
          }),
        this
      );
    }),
    (f.prototype.once = function (e, t) {
      var i = this;
      return (
        this.on(e, function () {
          (i.off(e), t(e));
        }),
        this
      );
    }),
    (f.prototype.off = function (e) {
      var i = this;
      return (
        this.selector &&
          Object.keys(f.eventListeners).forEach(function (t) {
            i.isEventMatched(e, t) &&
              (f.eventListeners[t].forEach(function (e) {
                i.selector.removeEventListener(t.split(".")[0], e);
              }),
              (f.eventListeners[t] = []));
          }),
        this
      );
    }),
    (f.prototype.trigger = function (e, t) {
      return (
        this.firstElement &&
          ((e = new CustomEvent(e.split(".")[0], { detail: t || null })),
          this.firstElement.dispatchEvent(e)),
        this
      );
    }),
    (f.prototype.load = function (e) {
      var t = this;
      return (
        fetch(e)
          .then(function (e) {
            return e.text();
          })
          .then(function (e) {
            t.selector.innerHTML = e;
          }),
        this
      );
    }),
    (f.prototype.html = function (t) {
      return void 0 === t
        ? this.firstElement
          ? this.firstElement.innerHTML
          : ""
        : (this._each(function (e) {
            e.innerHTML = t;
          }),
          this);
    }),
    (f.prototype.append = function (t) {
      return (
        this._each(function (e) {
          "string" == typeof t
            ? e.insertAdjacentHTML("beforeend", t)
            : e.appendChild(t);
        }),
        this
      );
    }),
    (f.prototype.prepend = function (t) {
      return (
        this._each(function (e) {
          e.insertAdjacentHTML("afterbegin", t);
        }),
        this
      );
    }),
    (f.prototype.remove = function () {
      return (
        this._each(function (e) {
          e.parentNode.removeChild(e);
        }),
        this
      );
    }),
    (f.prototype.empty = function () {
      return (
        this._each(function (e) {
          e.innerHTML = "";
        }),
        this
      );
    }),
    (f.prototype.scrollTop = function (e) {
      return void 0 !== e
        ? ((document.body.scrollTop = e),
          (document.documentElement.scrollTop = e),
          this)
        : window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }),
    (f.prototype.scrollLeft = function (e) {
      return void 0 !== e
        ? ((document.body.scrollLeft = e),
          (document.documentElement.scrollLeft = e),
          this)
        : window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;
    }),
    (f.prototype.offset = function () {
      var e, t;
      return this.firstElement
        ? ((e = this.firstElement.getBoundingClientRect()),
          (t = b("body").style().marginLeft),
          {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          })
        : { left: 0, top: 0 };
    }),
    (f.prototype.style = function () {
      return this.firstElement
        ? this.firstElement.currentStyle ||
            window.getComputedStyle(this.firstElement)
        : {};
    }),
    (f.prototype.width = function () {
      var e = this.style();
      return (
        this.firstElement.clientWidth -
        parseFloat(e.paddingLeft) -
        parseFloat(e.paddingRight)
      );
    }),
    (f.prototype.height = function () {
      var e = this.style();
      return (
        this.firstElement.clientHeight -
        parseFloat(e.paddingTop) -
        parseFloat(e.paddingBottom)
      );
    }),
    (f.eventListeners = {}));
  var mi = f;
  function f(e) {
    return (
      (this.cssVenderPrefixes = [
        "TransitionDuration",
        "TransitionTimingFunction",
        "Transform",
        "Transition",
      ]),
      (this.selector = this._getSelector(e)),
      (this.firstElement = this._getFirstEl()),
      this
    );
  }
  function b(e) {
    return (pi(), new mi(e));
  }
  var gi = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  var fi = function (e, t, i, s) {
      void 0 === i && (i = 0);
      var n = b(e).attr("data-lg-size") || s;
      if (n) {
        var r = n.split(",");
        if (r[1])
          for (var a = window.innerWidth, o = 0; o < r.length; o++) {
            var l = r[o];
            if (a < parseInt(l.split("-")[2], 10)) {
              n = l;
              break;
            }
            o === r.length - 1 && (n = l);
          }
        var e = n.split("-"),
          s = parseInt(e[0], 10),
          e = parseInt(e[1], 10),
          d = t.width(),
          t = t.height() - i,
          i = Math.min(d, s),
          d = Math.min(t, e),
          t = Math.min(i / s, d / e);
        return { width: s * t, height: e * t };
      }
    },
    yi = function (e, t, i, s, n) {
      if (n) {
        var r,
          a,
          o,
          l,
          e = b(e).find("img").first();
        if (e.get())
          return (
            (o = (l = t.get().getBoundingClientRect()).width),
            (t = t.height() - (i + s)),
            (s = e.width()),
            (r = e.height()),
            (a = e.style()),
            (o =
              (o - s) / 2 -
              e.offset().left +
              (parseFloat(a.paddingLeft) || 0) +
              (parseFloat(a.borderLeft) || 0) +
              b(window).scrollLeft() +
              l.left),
            (l =
              (t - r) / 2 -
              e.offset().top +
              (parseFloat(a.paddingTop) || 0) +
              (parseFloat(a.borderTop) || 0) +
              b(window).scrollTop() +
              i),
            "translate3d(" +
              (o *= -1) +
              "px, " +
              (l *= -1) +
              "px, 0) scale3d(" +
              s / n.width +
              ", " +
              r / n.height +
              ", 1)"
          );
      }
    },
    vi = function (e, t, i, s, n, r) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        i +
        "; height: " +
        t +
        "; max-height:" +
        s +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (r ? 'title="' + r + '"' : "") +
        ' src="' +
        n +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    wi = function (e, t, i, s, n, r) {
      ((i =
        "<img " +
        i +
        " " +
        (s ? 'srcset="' + s + '"' : "") +
        "  " +
        (n ? 'sizes="' + n + '"' : "") +
        ' class="lg-object lg-image" data-index="' +
        e +
        '" src="' +
        t +
        '" />'),
        (s = ""));
      return (
        (s = r
          ? ("string" == typeof r ? JSON.parse(r) : r).map(function (t) {
              var i = "";
              return (
                Object.keys(t).forEach(function (e) {
                  i += " " + e + '="' + t[e] + '"';
                }),
                "<source " + i + "></source>"
              );
            })
          : s) + i
      );
    },
    bi = function (e) {
      for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
        var r = e[n].split(" ");
        ("" === r[0] && r.splice(0, 1), i.push(r[0]), t.push(r[1]));
      }
      for (var a = window.innerWidth, o = 0; o < t.length; o++)
        if (parseInt(t[o], 10) > a) {
          s = i[o];
          break;
        }
      return s;
    },
    _i = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Si = function (e, t, i, s, n) {
      return (
        '<div class="lg-video-cont ' +
        (n && n.youtube
          ? "lg-has-youtube"
          : n && n.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
        s +
        '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
        s +
        '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    xi = function (e) {
      e = e.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
      );
      return [].filter.call(e, function (e) {
        e = window.getComputedStyle(e);
        return "none" !== e.display && "hidden" !== e.visibility;
      });
    },
    Ti = function (e, t, d, c) {
      var u = [],
        h = (function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length;
          for (var s = Array(e), n = 0, t = 0; t < i; t++)
            for (var r = arguments[t], a = 0, o = r.length; a < o; a++, n++)
              s[n] = r[a];
          return s;
        })(gi, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, i = 0; i < e.attributes.length; i++) {
            var s,
              n,
              r = e.attributes[i];
            r.specified &&
              ((s =
                "href" === (s = r.name)
                  ? "src"
                  : (s =
                      (s = s.replace("data-", "")).charAt(0).toLowerCase() +
                      s.slice(1)).replace(/-([a-z])/g, function (e) {
                      return e[1].toUpperCase();
                    })),
              (n = ""),
              (n = -1 < h.indexOf(s) ? s : n)) &&
              (t[n] = r.value);
          }
          var a = b(e),
            o = a.find("img").first().attr("alt"),
            l = a.attr("title"),
            a = c ? a.attr(c) : a.find("img").first().attr("src");
          ((t.thumb = a),
            d && !t.subHtml && (t.subHtml = l || o || ""),
            (t.alt = o || l || ""),
            u.push(t));
        }),
        u
      );
    },
    Ci = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    Di = function (e, t, i) {
      var s, n;
      return e
        ? ((s = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i,
          )),
          (n = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i,
          )),
          (e = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/,
          )),
          s ? { youtube: s } : n ? { vimeo: n } : e ? { wistia: e } : void 0)
        : t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/",
            );
    },
    Mi = 0,
    ki =
      ((y.prototype.generateSettings = function (e) {
        ((this.settings = n(n({}, hi), e)),
          (this.settings.isMobile && "function" == typeof this.settings.isMobile
            ? this.settings.isMobile()
            : Ci()) &&
            ((e = n(
              n({}, this.settings.mobileSettings),
              this.settings.mobileSettings,
            )),
            (this.settings = n(n({}, this.settings), e))));
      }),
      (y.prototype.normalizeSettings = function () {
        (this.settings.slideEndAnimation &&
          (this.settings.hideControlOnEnd = !1),
          this.settings.closable || (this.settings.swipeToClose = !1),
          (this.zoomFromOrigin = this.settings.zoomFromOrigin),
          this.settings.dynamic && (this.zoomFromOrigin = !1),
          this.settings.container || (this.settings.container = document.body),
          (this.settings.preload = Math.min(
            this.settings.preload,
            this.galleryItems.length,
          )));
      }),
      (y.prototype.init = function () {
        var e = this;
        (this.addSlideVideoInfo(this.galleryItems),
          this.buildStructure(),
          this.LGel.trigger($t, { instance: this }),
          this.settings.keyPress && this.keyPress(),
          setTimeout(function () {
            (e.enableDrag(), e.enableSwipe(), e.triggerPosterClick());
          }, 50),
          this.arrow(),
          this.settings.mousewheel && this.mousewheel(),
          this.settings.dynamic || this.openGalleryOnItemClick());
      }),
      (y.prototype.openGalleryOnItemClick = function () {
        for (var n = this, r = this, e = 0; e < this.items.length; e++)
          !(function (t) {
            var i = r.items[t],
              e = b(i),
              s = mi.generateUUID();
            e.attr("data-lg-id", s).on(
              "click.lgcustom-item-" + s,
              function (e) {
                e.preventDefault();
                e = n.settings.index || t;
                n.openGallery(e, i);
              },
            );
          })(e);
      }),
      (y.prototype.buildModules = function () {
        var t = this;
        this.settings.plugins.forEach(function (e) {
          t.plugins.push(new e(t, b));
        });
      }),
      (y.prototype.validateLicense = function () {
        this.settings.licenseKey
          ? "0000-0000-000-0000" === this.settings.licenseKey &&
            console.warn(
              "lightGallery: " +
                this.settings.licenseKey +
                " license key is not valid for production use",
            )
          : console.error("Please provide a valid license key");
      }),
      (y.prototype.getSlideItem = function (e) {
        return b(this.getSlideItemId(e));
      }),
      (y.prototype.getSlideItemId = function (e) {
        return "#lg-item-" + this.lgId + "-" + e;
      }),
      (y.prototype.getIdName = function (e) {
        return e + "-" + this.lgId;
      }),
      (y.prototype.getElementById = function (e) {
        return b("#" + this.getIdName(e));
      }),
      (y.prototype.manageSingleSlideClassName = function () {
        this.galleryItems.length < 2
          ? this.outer.addClass("lg-single-item")
          : this.outer.removeClass("lg-single-item");
      }),
      (y.prototype.buildStructure = function () {
        var e,
          t,
          i,
          s,
          n,
          r,
          a,
          o,
          l = this;
        (this.$container && this.$container.get()) ||
          ((t = e = ""),
          this.settings.controls &&
            (e =
              '<button type="button" id="' +
              this.getIdName("lg-prev") +
              '" aria-label="' +
              this.settings.strings.previousSlide +
              '" class="lg-prev lg-icon"> ' +
              this.settings.prevHtml +
              ' </button>\n                <button type="button" id="' +
              this.getIdName("lg-next") +
              '" aria-label="' +
              this.settings.strings.nextSlide +
              '" class="lg-next lg-icon"> ' +
              this.settings.nextHtml +
              " </button>"),
          ".lg-item" !== this.settings.appendSubHtmlTo &&
            (t =
              '<div class="lg-sub-html" role="status" aria-live="polite"></div>'),
          (i = ""),
          this.settings.allowMediaOverlap && (i += "lg-media-overlap "),
          (o = this.settings.ariaLabelledby
            ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
            : ""),
          (s = this.settings.ariaDescribedby
            ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
            : ""),
          (a =
            "lg-container " +
            this.settings.addClass +
            " " +
            (document.body !== this.settings.container ? "lg-inline" : "")),
          (n =
            this.settings.closable && this.settings.showCloseIcon
              ? '<button type="button" aria-label="' +
                this.settings.strings.closeGallery +
                '" id="' +
                this.getIdName("lg-close") +
                '" class="lg-close lg-icon"></button>'
              : ""),
          (r = this.settings.showMaximizeIcon
            ? '<button type="button" aria-label="' +
              this.settings.strings.toggleMaximize +
              '" id="' +
              this.getIdName("lg-maximize") +
              '" class="lg-maximize lg-icon"></button>'
            : ""),
          (a =
            '\n        <div class="' +
            a +
            '" id="' +
            this.getIdName("lg-container") +
            '" tabindex="-1" aria-modal="true" ' +
            o +
            " " +
            s +
            ' role="dialog"\n        >\n            <div id="' +
            this.getIdName("lg-backdrop") +
            '" class="lg-backdrop"></div>\n\n            <div id="' +
            this.getIdName("lg-outer") +
            '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
            i +
            ' ">\n\n              <div id="' +
            this.getIdName("lg-content") +
            '" class="lg-content">\n                <div id="' +
            this.getIdName("lg-inner") +
            '" class="lg-inner">\n                </div>\n                ' +
            e +
            '\n              </div>\n                <div id="' +
            this.getIdName("lg-toolbar") +
            '" class="lg-toolbar lg-group">\n                    ' +
            r +
            "\n                    " +
            n +
            "\n                    </div>\n                    " +
            (".lg-outer" === this.settings.appendSubHtmlTo ? t : "") +
            '\n                <div id="' +
            this.getIdName("lg-components") +
            '" class="lg-components">\n                    ' +
            (".lg-sub-html" === this.settings.appendSubHtmlTo ? t : "") +
            "\n                </div>\n            </div>\n        </div>\n        "),
          b(this.settings.container).append(a),
          document.body !== this.settings.container &&
            b(this.settings.container).css("position", "relative"),
          (this.outer = this.getElementById("lg-outer")),
          (this.$lgComponents = this.getElementById("lg-components")),
          (this.$backdrop = this.getElementById("lg-backdrop")),
          (this.$container = this.getElementById("lg-container")),
          (this.$inner = this.getElementById("lg-inner")),
          (this.$content = this.getElementById("lg-content")),
          (this.$toolbar = this.getElementById("lg-toolbar")),
          this.$backdrop.css(
            "transition-duration",
            this.settings.backdropDuration + "ms",
          ),
          (o = this.settings.mode + " "),
          this.manageSingleSlideClassName(),
          this.settings.enableDrag && (o += "lg-grab "),
          this.outer.addClass(o),
          this.$inner.css("transition-timing-function", this.settings.easing),
          this.$inner.css("transition-duration", this.settings.speed + "ms"),
          this.settings.download &&
            this.$toolbar.append(
              '<a id="' +
                this.getIdName("lg-download") +
                '" target="_blank" rel="noopener" aria-label="' +
                this.settings.strings.download +
                '" download class="lg-download lg-icon"></a>',
            ),
          this.counter(),
          b(window).on(
            "resize.lg.global" +
              this.lgId +
              " orientationchange.lg.global" +
              this.lgId,
            function () {
              l.refreshOnResize();
            },
          ),
          this.hideBars(),
          this.manageCloseGallery(),
          this.toggleMaximize(),
          this.initModules());
      }),
      (y.prototype.refreshOnResize = function () {
        var e, t, i;
        this.lgOpened &&
          ((e = this.galleryItems[this.index].__slideVideoInfo),
          (this.mediaContainerPosition = this.getMediaContainerPosition()),
          (i = (t = this.mediaContainerPosition).top),
          (t = t.bottom),
          (this.currentImageSize = fi(
            this.items[this.index],
            this.outer,
            i + t,
            e && this.settings.videoMaxSize,
          )),
          e && this.resizeVideoSlide(this.index, this.currentImageSize),
          this.zoomFromOrigin &&
            !this.isDummyImageRemoved &&
            ((i = this.getDummyImgStyles(this.currentImageSize)),
            this.outer
              .find(".lg-current .lg-dummy-img")
              .first()
              .attr("style", i)),
          this.LGel.trigger(Xt));
      }),
      (y.prototype.resizeVideoSlide = function (e, t) {
        t = this.getVideoContStyle(t);
        this.getSlideItem(e).find(".lg-video-cont").attr("style", t);
      }),
      (y.prototype.updateSlides = function (e, t) {
        var i, s;
        (this.index > e.length - 1 && (this.index = e.length - 1),
          1 === e.length && (this.index = 0),
          e.length
            ? ((i = this.galleryItems[t].src),
              (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []),
              (s = 0),
              this.galleryItems.some(function (e, t) {
                return e.src === i && ((s = t), !0);
              }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(Zt))
            : this.closeGallery());
      }),
      (y.prototype.getItems = function () {
        var e;
        return (
          (this.items = []),
          this.settings.dynamic
            ? this.settings.dynamicEl || []
            : ("this" === this.settings.selector
                ? this.items.push(this.el)
                : this.settings.selector
                  ? "string" == typeof this.settings.selector
                    ? this.settings.selectWithin
                      ? ((e = b(this.settings.selectWithin)),
                        (this.items = e.find(this.settings.selector).get()))
                      : (this.items = this.el.querySelectorAll(
                          this.settings.selector,
                        ))
                    : (this.items = this.settings.selector)
                  : (this.items = this.el.children),
              Ti(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage,
              ))
        );
      }),
      (y.prototype.shouldHideScrollbar = function () {
        return (
          this.settings.hideScrollbar &&
          document.body === this.settings.container
        );
      }),
      (y.prototype.hideScrollbar = function () {
        var e;
        this.shouldHideScrollbar() &&
          ((this.bodyPaddingRight = parseFloat(b("body").style().paddingRight)),
          (e = document.documentElement.getBoundingClientRect()),
          (e = window.innerWidth - e.width),
          b(document.body).css(
            "padding-right",
            e + this.bodyPaddingRight + "px",
          ),
          b(document.body).addClass("lg-overlay-open"));
      }),
      (y.prototype.resetScrollBar = function () {
        this.shouldHideScrollbar() &&
          (b(document.body).css("padding-right", this.bodyPaddingRight + "px"),
          b(document.body).removeClass("lg-overlay-open"));
      }),
      (y.prototype.openGallery = function (t, e) {
        var i,
          s,
          n,
          r,
          a,
          o = this;
        (void 0 === t && (t = this.settings.index),
          this.lgOpened ||
            ((this.lgOpened = !0),
            this.outer.removeClass("lg-hide-items"),
            this.hideScrollbar(),
            this.$container.addClass("lg-show"),
            (r = this.getItemsToBeInsertedToDom(t, t)),
            (this.currentItemsInDom = r),
            (i = ""),
            r.forEach(function (e) {
              i = i + '<div id="' + e + '" class="lg-item"></div>';
            }),
            this.$inner.append(i),
            this.addHtml(t),
            (s = ""),
            (this.mediaContainerPosition = this.getMediaContainerPosition()),
            (n = (r = this.mediaContainerPosition).top),
            (r = r.bottom),
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(n, r),
            (a = this.galleryItems[t].__slideVideoInfo),
            this.zoomFromOrigin &&
              e &&
              ((this.currentImageSize = fi(
                e,
                this.outer,
                n + r,
                a && this.settings.videoMaxSize,
              )),
              (s = yi(e, this.outer, n, r, this.currentImageSize))),
            (this.zoomFromOrigin && s) ||
              (this.outer.addClass(this.settings.startClass),
              this.getSlideItem(t).removeClass("lg-complete")),
            (a = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration),
            setTimeout(function () {
              o.outer.addClass("lg-components-open");
            }, a),
            (this.index = t),
            this.LGel.trigger(Kt),
            this.getSlideItem(t).addClass("lg-current"),
            (this.lGalleryOn = !1),
            (this.prevScrollTop = b(window).scrollTop()),
            setTimeout(function () {
              var e;
              (o.zoomFromOrigin &&
                s &&
                ((e = o.getSlideItem(t)).css("transform", s),
                setTimeout(function () {
                  (e
                    .addClass("lg-start-progress lg-start-end-progress")
                    .css(
                      "transition-duration",
                      o.settings.startAnimationDuration + "ms",
                    ),
                    o.outer.addClass("lg-zoom-from-image"));
                }),
                setTimeout(function () {
                  e.css("transform", "translate3d(0, 0, 0)");
                }, 100)),
                setTimeout(function () {
                  (o.$backdrop.addClass("in"),
                    o.$container.addClass("lg-show-in"));
                }, 10),
                setTimeout(function () {
                  o.settings.trapFocus &&
                    document.body === o.settings.container &&
                    o.trapFocus();
                }, o.settings.backdropDuration + 50),
                (o.zoomFromOrigin && s) ||
                  setTimeout(function () {
                    o.outer.addClass("lg-visible");
                  }, o.settings.backdropDuration),
                o.slide(t, !1, !1, !1),
                o.LGel.trigger(ei));
            }),
            document.body === this.settings.container &&
              b("html").addClass("lg-on")));
      }),
      (y.prototype.getMediaContainerPosition = function () {
        var e, t;
        return this.settings.allowMediaOverlap
          ? { top: 0, bottom: 0 }
          : ((t = this.$toolbar.get().clientHeight || 0),
            (e = this.outer.find(".lg-components .lg-sub-html").get()),
            (e =
              this.settings.defaultCaptionHeight || (e && e.clientHeight) || 0),
            {
              top: t,
              bottom:
                ((t = this.outer.find(".lg-thumb-outer").get())
                  ? t.clientHeight
                  : 0) + e,
            });
      }),
      (y.prototype.setMediaContainerPosition = function (e, t) {
        (void 0 === t && (t = 0),
          this.$content
            .css("top", (e = void 0 === e ? 0 : e) + "px")
            .css("bottom", t + "px"));
      }),
      (y.prototype.hideBars = function () {
        var e = this;
        setTimeout(function () {
          (e.outer.removeClass("lg-hide-items"),
            0 < e.settings.hideBarsDelay &&
              (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                (e.outer.removeClass("lg-hide-items"),
                  clearTimeout(e.hideBarTimeout),
                  (e.hideBarTimeout = setTimeout(function () {
                    e.outer.addClass("lg-hide-items");
                  }, e.settings.hideBarsDelay)));
              }),
              e.outer.trigger("mousemove.lg")));
        }, this.settings.showBarsAfter);
      }),
      (y.prototype.initPictureFill = function (e) {
        if (this.settings.supportLegacyBrowser)
          try {
            picturefill({ elements: [e.get()] });
          } catch (e) {
            console.warn(
              "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.",
            );
          }
      }),
      (y.prototype.counter = function () {
        var e;
        this.settings.counter &&
          ((e =
            '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
            this.getIdName("lg-counter-current") +
            '" class="lg-counter-current">' +
            (this.index + 1) +
            ' </span> /\n                <span id="' +
            this.getIdName("lg-counter-all") +
            '" class="lg-counter-all">' +
            this.galleryItems.length +
            " </span></div>"),
          this.outer.find(this.settings.appendCounterTo).append(e));
      }),
      (y.prototype.addHtml = function (e) {
        var t, i, s;
        (this.galleryItems[e].subHtmlUrl
          ? (i = this.galleryItems[e].subHtmlUrl)
          : (t = this.galleryItems[e].subHtml),
          i ||
            (t
              ? ("." !== (s = t.substring(0, 1)) && "#" !== s) ||
                (t = (
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? b(this.items).eq(e).find(t)
                    : b(t)
                )
                  .first()
                  .html())
              : (t = "")),
          ".lg-item" !== this.settings.appendSubHtmlTo
            ? i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(t)
            : ((s = b(this.getSlideItemId(e))),
              i
                ? s.load(i)
                : s.append('<div class="lg-sub-html">' + t + "</div>")),
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
          this.LGel.trigger(Jt, { index: e }));
      }),
      (y.prototype.preload = function (e) {
        for (
          var t = 1;
          t <= this.settings.preload && !(t >= this.galleryItems.length - e);
          t++
        )
          this.loadContent(e + t, !1);
        for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
          this.loadContent(e - i, !1);
      }),
      (y.prototype.getDummyImgStyles = function (e) {
        return e
          ? "width:" +
              e.width +
              "px;\n                margin-left: -" +
              e.width / 2 +
              "px;\n                margin-top: -" +
              e.height / 2 +
              "px;\n                height:" +
              e.height +
              "px"
          : "";
      }),
      (y.prototype.getVideoContStyle = function (e) {
        return e
          ? "width:" +
              e.width +
              "px;\n                height:" +
              e.height +
              "px"
          : "";
      }),
      (y.prototype.getDummyImageContent = function (e, t, i) {
        var s;
        return (s = this.settings.dynamic ? s : b(this.items).eq(t)) &&
          ((t = void 0),
          (t = this.settings.exThumbImage
            ? s.attr(this.settings.exThumbImage)
            : s.find("img").first().attr("src")))
          ? ((s =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              t +
              '" />'),
            e.addClass("lg-first-slide"),
            this.outer.addClass("lg-first-slide-loading"),
            s)
          : "";
      }),
      (y.prototype.setImgMarkup = function (e, t, i) {
        var s = this.galleryItems[i],
          n = s.alt,
          r = s.srcset,
          a = s.sizes,
          s = s.sources,
          o = "",
          n = n ? 'alt="' + n + '"' : "",
          o = this.isFirstSlideWithZoomAnimation()
            ? this.getDummyImageContent(t, i, n)
            : wi(i, e, n, r, a, s);
        t.prepend('<picture class="lg-img-wrap"> ' + o + "</picture>");
      }),
      (y.prototype.onSlideObjectLoad = function (e, t, i, s) {
        e = e.find(".lg-object").first();
        _i(e.get()) || t
          ? i()
          : (e.on("load.lg error.lg", function () {
              i && i();
            }),
            e.on("error.lg", function () {
              s && s();
            }));
      }),
      (y.prototype.onLgObjectLoad = function (e, t, i, s, n, r) {
        var a = this;
        this.onSlideObjectLoad(
          e,
          r,
          function () {
            a.triggerSlideItemLoad(e, t, i, s, n);
          },
          function () {
            (e.addClass("lg-complete lg-complete_"),
              e.html(
                '<span class="lg-error-msg">' +
                  a.settings.strings.mediaLoadingFailed +
                  "</span>",
              ));
          },
        );
      }),
      (y.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
        var r = this,
          a = this.galleryItems[t],
          a = n && "video" === this.getSlideType(a) && !a.poster ? s : 0;
        setTimeout(function () {
          (e.addClass("lg-complete lg-complete_"),
            r.LGel.trigger(ti, { index: t, delay: i || 0, isFirstSlide: n }));
        }, a);
      }),
      (y.prototype.isFirstSlideWithZoomAnimation = function () {
        return !(
          this.lGalleryOn ||
          !this.zoomFromOrigin ||
          !this.currentImageSize
        );
      }),
      (y.prototype.addSlideVideoInfo = function (e) {
        var i = this;
        e.forEach(function (e, t) {
          ((e.__slideVideoInfo = Di(e.src, !!e.video, t)),
            e.__slideVideoInfo &&
              i.settings.loadYouTubePoster &&
              !e.poster &&
              e.__slideVideoInfo.youtube &&
              (e.poster =
                "//img.youtube.com/vi/" +
                e.__slideVideoInfo.youtube[1] +
                "/maxresdefault.jpg"));
        });
      }),
      (y.prototype.loadContent = function (t, e) {
        var i,
          s,
          n,
          r = this,
          a = this.galleryItems[t],
          o = b(this.getSlideItemId(t)),
          l = a.poster,
          d = a.srcset,
          c = a.sizes,
          u = a.sources,
          h = a.src,
          p = a.video,
          p = p && "string" == typeof p ? JSON.parse(p) : p,
          m =
            (a.responsive && ((g = a.responsive.split(",")), (h = bi(g) || h)),
            a.__slideVideoInfo),
          g = "",
          f = !!a.iframe,
          y = !this.lGalleryOn,
          v = 0,
          w =
            (y &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            o.hasClass("lg-loaded") ||
              (m &&
                ((n = (i = this.mediaContainerPosition).top),
                (i = i.bottom),
                (n = fi(
                  this.items[t],
                  this.outer,
                  n + i,
                  m && this.settings.videoMaxSize,
                )),
                (g = this.getVideoContStyle(n))),
              f
                ? ((s = vi(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    h,
                    a.iframeTitle,
                  )),
                  o.prepend(s))
                : l
                  ? ((i = ""),
                    y &&
                      this.zoomFromOrigin &&
                      this.currentImageSize &&
                      (i = this.getDummyImageContent(o, t, "")),
                    (s = Si(l, i || "", g, this.settings.strings.playVideo, m)),
                    o.prepend(s))
                  : m
                    ? o.prepend(
                        (s =
                          '<div class="lg-video-cont " style="' +
                          g +
                          '"></div>'),
                      )
                    : (this.setImgMarkup(h, o, t),
                      (d || u) &&
                        ((n = o.find(".lg-object")), this.initPictureFill(n))),
              (l || m) &&
                this.LGel.trigger(qt, {
                  index: t,
                  src: h,
                  html5Video: p,
                  hasPoster: !!l,
                }),
              this.LGel.trigger(Ut, { index: t }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(t)),
            0);
        (v && !b(document.body).hasClass("lg-from-hash") && (w = v),
          this.isFirstSlideWithZoomAnimation() &&
            (setTimeout(function () {
              o.removeClass(
                "lg-start-end-progress lg-start-progress",
              ).removeAttr("style");
            }, this.settings.startAnimationDuration + 100),
            o.hasClass("lg-loaded") ||
              setTimeout(function () {
                var e;
                ("image" === r.getSlideType(a) &&
                  ((e = (e = a.alt) ? 'alt="' + e + '"' : ""),
                  o.find(".lg-img-wrap").append(wi(t, h, e, d, c, a.sources)),
                  d || u) &&
                  ((e = o.find(".lg-object")), r.initPictureFill(e)),
                  ("image" === r.getSlideType(a) ||
                    ("video" === r.getSlideType(a) && l)) &&
                    (r.onLgObjectLoad(o, t, v, w, !0, !1),
                    r.onSlideObjectLoad(
                      o,
                      !(!m || !m.html5 || l),
                      function () {
                        r.loadContentOnFirstSlideLoad(t, o, w);
                      },
                      function () {
                        r.loadContentOnFirstSlideLoad(t, o, w);
                      },
                    )));
              }, this.settings.startAnimationDuration + 100)),
          o.addClass("lg-loaded"),
          (this.isFirstSlideWithZoomAnimation() &&
            ("video" !== this.getSlideType(a) || l)) ||
            this.onLgObjectLoad(o, t, v, w, y, !(!m || !m.html5 || l)),
          (this.zoomFromOrigin && this.currentImageSize) ||
            !o.hasClass("lg-complete_") ||
            this.lGalleryOn ||
            setTimeout(function () {
              o.addClass("lg-complete");
            }, this.settings.backdropDuration),
          (this.lGalleryOn = !0) === e &&
            (o.hasClass("lg-complete_")
              ? this.preload(t)
              : o
                  .find(".lg-object")
                  .first()
                  .on("load.lg error.lg", function () {
                    r.preload(t);
                  })));
      }),
      (y.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
        var s = this;
        setTimeout(function () {
          (t.find(".lg-dummy-img").remove(),
            t.removeClass("lg-first-slide"),
            s.outer.removeClass("lg-first-slide-loading"),
            (s.isDummyImageRemoved = !0),
            s.preload(e));
        }, i + 300);
      }),
      (y.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
        var s = this,
          n = (void 0 === i && (i = 0), []),
          r = Math.max(i, 3),
          r = Math.min(r, this.galleryItems.length),
          i = "lg-item-" + this.lgId + "-" + t;
        if (this.galleryItems.length <= 3)
          this.galleryItems.forEach(function (e, t) {
            n.push("lg-item-" + s.lgId + "-" + t);
          });
        else {
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var a = e; e - r / 2 < a && 0 <= a; a--)
              n.push("lg-item-" + this.lgId + "-" + a);
            for (var o = n.length, a = 0; a < r - o; a++)
              n.push("lg-item-" + this.lgId + "-" + (e + a + 1));
          } else {
            for (a = e; a <= this.galleryItems.length - 1 && a < e + r / 2; a++)
              n.push("lg-item-" + this.lgId + "-" + a);
            for (o = n.length, a = 0; a < r - o; a++)
              n.push("lg-item-" + this.lgId + "-" + (e - a - 1));
          }
          (this.settings.loop &&
            (e === this.galleryItems.length - 1
              ? n.push("lg-item-" + this.lgId + "-0")
              : 0 === e &&
                n.push(
                  "lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1),
                )),
            -1 === n.indexOf(i) && n.push("lg-item-" + this.lgId + "-" + t));
        }
        return n;
      }),
      (y.prototype.organizeSlideItems = function (e, t) {
        var i = this,
          s = this.getItemsToBeInsertedToDom(
            e,
            t,
            this.settings.numberOfSlideItemsInDom,
          );
        return (
          s.forEach(function (e) {
            -1 === i.currentItemsInDom.indexOf(e) &&
              i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
          }),
          this.currentItemsInDom.forEach(function (e) {
            -1 === s.indexOf(e) && b("#" + e).remove();
          }),
          s
        );
      }),
      (y.prototype.getPreviousSlideIndex = function () {
        var t = 0;
        try {
          var e = this.outer.find(".lg-current").first().attr("id"),
            t = parseInt(e.split("-")[3]) || 0;
        } catch (e) {
          t = 0;
        }
        return t;
      }),
      (y.prototype.setDownloadValue = function (e) {
        var t;
        this.settings.download &&
          (!1 === (e = this.galleryItems[e]).downloadUrl ||
          "false" === e.downloadUrl
            ? this.outer.addClass("lg-hide-download")
            : ((t = this.getElementById("lg-download")),
              this.outer.removeClass("lg-hide-download"),
              t.attr("href", e.downloadUrl || e.src),
              e.download && t.attr("download", e.download)));
      }),
      (y.prototype.makeSlideAnimation = function (e, t, i) {
        var s = this;
        (this.lGalleryOn && i.addClass("lg-slide-progress"),
          setTimeout(
            function () {
              (s.outer.addClass("lg-no-trans"),
                s.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-next-slide"),
                "prev" === e
                  ? (t.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                  : (t.addClass("lg-next-slide"), i.addClass("lg-prev-slide")),
                setTimeout(function () {
                  (s.outer.find(".lg-item").removeClass("lg-current"),
                    t.addClass("lg-current"),
                    s.outer.removeClass("lg-no-trans"));
                }, 50));
            },
            this.lGalleryOn ? this.settings.slideDelay : 0,
          ));
      }),
      (y.prototype.slide = function (e, t, i, s) {
        var n,
          r,
          a,
          o,
          l,
          d,
          c = this,
          u = this.getPreviousSlideIndex();
        ((this.currentItemsInDom = this.organizeSlideItems(e, u)),
          (this.lGalleryOn && u === e) ||
            ((n = this.galleryItems.length),
            this.lgBusy ||
              (this.settings.counter && this.updateCurrentCounter(e),
              (r = this.getSlideItem(e)),
              (a = this.getSlideItem(u)),
              (d = (l = this.galleryItems[e]).__slideVideoInfo),
              this.outer.attr("data-lg-slide-type", this.getSlideType(l)),
              this.setDownloadValue(e),
              d &&
                ((o = (l = this.mediaContainerPosition).top),
                (l = l.bottom),
                (o = fi(
                  this.items[e],
                  this.outer,
                  o + l,
                  d && this.settings.videoMaxSize,
                )),
                this.resizeVideoSlide(e, o)),
              this.LGel.trigger(ii, {
                prevIndex: u,
                index: e,
                fromTouch: !!t,
                fromThumb: !!i,
              }),
              (this.lgBusy = !0),
              clearTimeout(this.hideBarTimeout),
              this.arrowDisable(e),
              s || (e < u ? (s = "prev") : u < e && (s = "next")),
              t
                ? (this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide"),
                  (d = l = void 0),
                  2 < n
                    ? ((l = e - 1),
                      (d = e + 1),
                      ((0 === e && u === n - 1) || (e === n - 1 && 0 === u)) &&
                        ((d = 0), (l = n - 1)))
                    : ((l = 0), (d = 1)),
                  "prev" === s
                    ? this.getSlideItem(d).addClass("lg-next-slide")
                    : this.getSlideItem(l).addClass("lg-prev-slide"),
                  r.addClass("lg-current"))
                : this.makeSlideAnimation(s, r, a),
              this.lGalleryOn
                ? setTimeout(
                    function () {
                      (c.loadContent(e, !0),
                        ".lg-item" !== c.settings.appendSubHtmlTo &&
                          c.addHtml(e));
                    },
                    this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay),
                  )
                : this.loadContent(e, !0),
              setTimeout(
                function () {
                  ((c.lgBusy = !1),
                    a.removeClass("lg-slide-progress"),
                    c.LGel.trigger(si, {
                      prevIndex: u,
                      index: e,
                      fromTouch: t,
                      fromThumb: i,
                    }));
                },
                (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (t ? 0 : this.settings.slideDelay),
              )),
            (this.index = e)));
      }),
      (y.prototype.updateCurrentCounter = function (e) {
        this.getElementById("lg-counter-current").html(e + 1 + "");
      }),
      (y.prototype.updateCounterTotal = function () {
        this.getElementById("lg-counter-all").html(
          this.galleryItems.length + "",
        );
      }),
      (y.prototype.getSlideType = function (e) {
        return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
      }),
      (y.prototype.touchMove = function (e, t, i) {
        var s,
          n,
          r = t.pageX - e.pageX,
          t = t.pageY - e.pageY,
          e = !1;
        (this.swipeDirection
          ? (e = !0)
          : 15 < Math.abs(r)
            ? ((this.swipeDirection = "horizontal"), (e = !0))
            : 15 < Math.abs(t) &&
              ((this.swipeDirection = "vertical"), (e = !0)),
          e &&
            ((e = this.getSlideItem(this.index)),
            "horizontal" === this.swipeDirection
              ? (null != i && i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(e, r, 0),
                (s =
                  (15 * (n = e.get().offsetWidth)) / 100 -
                  Math.abs((10 * r) / 100)),
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  r - n - s,
                  0,
                ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  n + r + s,
                  0,
                ))
              : "vertical" === this.swipeDirection &&
                this.settings.swipeToClose &&
                (null != i && i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical"),
                (n = 1 - Math.abs(t) / window.innerHeight),
                this.$backdrop.css("opacity", n),
                (r = 1 - Math.abs(t) / (2 * window.innerWidth)),
                this.setTranslate(e, 0, t, r, r),
                100 < Math.abs(t)) &&
                this.outer
                  .addClass("lg-hide-items")
                  .removeClass("lg-components-open")));
      }),
      (y.prototype.touchEnd = function (i, s, n) {
        var r,
          a = this;
        ("lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
          setTimeout(function () {
            (a.$container.removeClass("lg-dragging-vertical"),
              a.outer
                .removeClass("lg-dragging lg-hide-items")
                .addClass("lg-components-open"));
            var e = !0;
            if ("horizontal" === a.swipeDirection) {
              r = i.pageX - s.pageX;
              var t = Math.abs(i.pageX - s.pageX);
              r < 0 && t > a.settings.swipeThreshold
                ? (a.goToNextSlide(!0), (e = !1))
                : 0 < r &&
                  t > a.settings.swipeThreshold &&
                  (a.goToPrevSlide(!0), (e = !1));
            } else if ("vertical" === a.swipeDirection) {
              if (
                ((r = Math.abs(i.pageY - s.pageY)),
                a.settings.closable && a.settings.swipeToClose && 100 < r)
              )
                return void a.closeGallery();
              a.$backdrop.css("opacity", 1);
            }
            (a.outer.find(".lg-item").removeAttr("style"),
              e &&
                Math.abs(i.pageX - s.pageX) < 5 &&
                ((t = b(n.target)), a.isPosterElement(t)) &&
                a.LGel.trigger(ni),
              (a.swipeDirection = void 0));
          }),
          setTimeout(function () {
            a.outer.hasClass("lg-dragging") ||
              "lg-slide" === a.settings.mode ||
              a.outer.removeClass("lg-slide");
          }, this.settings.speed + 100));
      }),
      (y.prototype.enableSwipe = function () {
        var i = this,
          s = {},
          t = {},
          n = !1,
          r = !1;
        this.settings.enableSwipe &&
          (this.$inner.on("touchstart.lg", function (e) {
            i.dragOrSwipeEnabled = !0;
            var t = i.getSlideItem(i.index);
            (!b(e.target).hasClass("lg-item") && !t.get().contains(e.target)) ||
              i.outer.hasClass("lg-zoomed") ||
              i.lgBusy ||
              1 !== e.touches.length ||
              ((r = !0),
              (i.touchAction = "swipe"),
              i.manageSwipeClass(),
              (s = { pageX: e.touches[0].pageX, pageY: e.touches[0].pageY }));
          }),
          this.$inner.on("touchmove.lg", function (e) {
            r &&
              "swipe" === i.touchAction &&
              1 === e.touches.length &&
              ((t = { pageX: e.touches[0].pageX, pageY: e.touches[0].pageY }),
              i.touchMove(s, t, e),
              (n = !0));
          }),
          this.$inner.on("touchend.lg", function (e) {
            "swipe" === i.touchAction &&
              (n
                ? ((n = !1), i.touchEnd(t, s, e))
                : r &&
                  ((e = b(e.target)), i.isPosterElement(e)) &&
                  i.LGel.trigger(ni),
              (i.touchAction = void 0),
              (r = !1));
          }));
      }),
      (y.prototype.enableDrag = function () {
        var i = this,
          s = {},
          n = {},
          r = !1,
          a = !1;
        this.settings.enableDrag &&
          (this.outer.on("mousedown.lg", function (e) {
            i.dragOrSwipeEnabled = !0;
            var t = i.getSlideItem(i.index);
            (!b(e.target).hasClass("lg-item") && !t.get().contains(e.target)) ||
              i.outer.hasClass("lg-zoomed") ||
              i.lgBusy ||
              (e.preventDefault(), i.lgBusy) ||
              (i.manageSwipeClass(),
              (s = { pageX: e.pageX, pageY: e.pageY }),
              (r = !0),
              (i.outer.get().scrollLeft += 1),
              --i.outer.get().scrollLeft,
              i.outer.removeClass("lg-grab").addClass("lg-grabbing"),
              i.LGel.trigger(ri));
          }),
          b(window).on("mousemove.lg.global" + this.lgId, function (e) {
            r &&
              i.lgOpened &&
              ((a = !0),
              (n = { pageX: e.pageX, pageY: e.pageY }),
              i.touchMove(s, n),
              i.LGel.trigger(ai));
          }),
          b(window).on("mouseup.lg.global" + this.lgId, function (e) {
            var t;
            i.lgOpened &&
              ((t = b(e.target)),
              a
                ? ((a = !1), i.touchEnd(n, s, e), i.LGel.trigger(oi))
                : i.isPosterElement(t) && i.LGel.trigger(ni),
              r) &&
              ((r = !1),
              i.outer.removeClass("lg-grabbing").addClass("lg-grab"));
          }));
      }),
      (y.prototype.triggerPosterClick = function () {
        var t = this;
        this.$inner.on("click.lg", function (e) {
          !t.dragOrSwipeEnabled &&
            t.isPosterElement(b(e.target)) &&
            t.LGel.trigger(ni);
        });
      }),
      (y.prototype.manageSwipeClass = function () {
        var e = this.index + 1,
          t = this.index - 1;
        (this.settings.loop &&
          2 < this.galleryItems.length &&
          (0 === this.index
            ? (t = this.galleryItems.length - 1)
            : this.index === this.galleryItems.length - 1 && (e = 0)),
          this.outer
            .find(".lg-item")
            .removeClass("lg-next-slide lg-prev-slide"),
          -1 < t && this.getSlideItem(t).addClass("lg-prev-slide"),
          this.getSlideItem(e).addClass("lg-next-slide"));
      }),
      (y.prototype.goToNextSlide = function (e) {
        var t = this,
          i = this.settings.loop;
        (e && this.galleryItems.length < 3 && (i = !1),
          this.lgBusy ||
            (this.index + 1 < this.galleryItems.length
              ? (this.index++,
                this.LGel.trigger(li, { index: this.index }),
                this.slide(this.index, !!e, !1, "next"))
              : i
                ? ((this.index = 0),
                  this.LGel.trigger(li, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-right-end");
                  }, 400))));
      }),
      (y.prototype.goToPrevSlide = function (e) {
        var t = this,
          i = this.settings.loop;
        (e && this.galleryItems.length < 3 && (i = !1),
          this.lgBusy ||
            (0 < this.index
              ? (this.index--,
                this.LGel.trigger(di, { index: this.index, fromTouch: e }),
                this.slide(this.index, !!e, !1, "prev"))
              : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(di, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-left-end");
                  }, 400))));
      }),
      (y.prototype.keyPress = function () {
        var t = this;
        b(window).on("keydown.lg.global" + this.lgId, function (e) {
          (t.lgOpened &&
            !0 === t.settings.escKey &&
            27 === e.keyCode &&
            (e.preventDefault(),
            t.settings.allowMediaOverlap &&
            t.outer.hasClass("lg-can-toggle") &&
            t.outer.hasClass("lg-components-open")
              ? t.outer.removeClass("lg-components-open")
              : t.closeGallery()),
            t.lgOpened &&
              1 < t.galleryItems.length &&
              (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()),
              39 === e.keyCode) &&
              (e.preventDefault(), t.goToNextSlide()));
        });
      }),
      (y.prototype.arrow = function () {
        var e = this;
        (this.getElementById("lg-prev").on("click.lg", function () {
          e.goToPrevSlide();
        }),
          this.getElementById("lg-next").on("click.lg", function () {
            e.goToNextSlide();
          }));
      }),
      (y.prototype.arrowDisable = function (e) {
        var t, i;
        !this.settings.loop &&
          this.settings.hideControlOnEnd &&
          ((t = this.getElementById("lg-prev")),
          (i = this.getElementById("lg-next")),
          e + 1 === this.galleryItems.length
            ? i.attr("disabled", "disabled").addClass("disabled")
            : i.removeAttr("disabled").removeClass("disabled"),
          0 === e
            ? t.attr("disabled", "disabled").addClass("disabled")
            : t.removeAttr("disabled").removeClass("disabled"));
      }),
      (y.prototype.setTranslate = function (e, t, i, s, n) {
        e.css(
          "transform",
          "translate3d(" +
            t +
            "px, " +
            i +
            "px, 0px) scale3d(" +
            (s = void 0 === s ? 1 : s) +
            ", " +
            (n = void 0 === n ? 1 : n) +
            ", 1)",
        );
      }),
      (y.prototype.mousewheel = function () {
        var i = this,
          s = 0;
        this.outer.on("wheel.lg", function (e) {
          var t;
          !e.deltaY ||
            i.galleryItems.length < 2 ||
            (e.preventDefault(), (t = new Date().getTime()) - s < 1e3) ||
            ((s = t),
            0 < e.deltaY
              ? i.goToNextSlide()
              : e.deltaY < 0 && i.goToPrevSlide());
        });
      }),
      (y.prototype.isSlideElement = function (e) {
        return (
          e.hasClass("lg-outer") ||
          e.hasClass("lg-item") ||
          e.hasClass("lg-img-wrap")
        );
      }),
      (y.prototype.isPosterElement = function (e) {
        var t = this.getSlideItem(this.index)
          .find(".lg-video-play-button")
          .get();
        return (
          e.hasClass("lg-video-poster") ||
          e.hasClass("lg-video-play-button") ||
          (t && t.contains(e.get()))
        );
      }),
      (y.prototype.toggleMaximize = function () {
        var e = this;
        this.getElementById("lg-maximize").on("click.lg", function () {
          (e.$container.toggleClass("lg-inline"), e.refreshOnResize());
        });
      }),
      (y.prototype.invalidateItems = function () {
        for (var e = 0; e < this.items.length; e++) {
          var t = b(this.items[e]);
          t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
        }
      }),
      (y.prototype.trapFocus = function () {
        var s = this;
        (this.$container.get().focus({ preventScroll: !0 }),
          b(window).on("keydown.lg.global" + this.lgId, function (e) {
            var t, i;
            !s.lgOpened ||
              ("Tab" !== e.key && 9 !== e.keyCode) ||
              ((t = (i = xi(s.$container.get()))[0]),
              (i = i[i.length - 1]),
              e.shiftKey
                ? document.activeElement === t &&
                  (i.focus(), e.preventDefault())
                : document.activeElement === i &&
                  (t.focus(), e.preventDefault()));
          }));
      }),
      (y.prototype.manageCloseGallery = function () {
        var t,
          i = this;
        this.settings.closable &&
          ((t = !1),
          this.getElementById("lg-close").on("click.lg", function () {
            i.closeGallery();
          }),
          this.settings.closeOnTap) &&
          (this.outer.on("mousedown.lg", function (e) {
            e = b(e.target);
            t = !!i.isSlideElement(e);
          }),
          this.outer.on("mousemove.lg", function () {
            t = !1;
          }),
          this.outer.on("mouseup.lg", function (e) {
            e = b(e.target);
            i.isSlideElement(e) &&
              t &&
              (i.outer.hasClass("lg-dragging") || i.closeGallery());
          }));
      }),
      (y.prototype.closeGallery = function (e) {
        var t = this;
        if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
        (this.LGel.trigger(ci),
          this.settings.resetScrollPosition &&
            !this.settings.hideScrollbar &&
            b(window).scrollTop(this.prevScrollTop));
        var i,
          s,
          n,
          r,
          e = this.items[this.index],
          a =
            (this.zoomFromOrigin &&
              e &&
              ((i = (s = this.mediaContainerPosition).top),
              (s = s.bottom),
              (n = (a = this.galleryItems[this.index]).__slideVideoInfo),
              (a = a.poster),
              (n = fi(
                e,
                this.outer,
                i + s,
                n && a && this.settings.videoMaxSize,
              )),
              (r = yi(e, this.outer, i, s, n))),
            this.zoomFromOrigin && r
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms",
                  )
                  .css("transform", r))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            b("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0),
            this.zoomFromOrigin && r
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration,
                )
              : this.settings.backdropDuration);
        return (
          this.$container.removeClass("lg-show-in"),
          setTimeout(function () {
            (t.zoomFromOrigin && r && t.outer.removeClass("lg-zoom-from-image"),
              t.$container.removeClass("lg-show"),
              t.resetScrollBar(),
              t.$backdrop
                .removeAttr("style")
                .css("transition-duration", t.settings.backdropDuration + "ms"),
              t.outer.removeClass("lg-closing " + t.settings.startClass),
              t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
              t.$inner.empty(),
              t.lgOpened && t.LGel.trigger(ui, { instance: t }),
              t.$container.get() && t.$container.get().blur(),
              (t.lgOpened = !1));
          }, a + 100),
          a + 100
        );
      }),
      (y.prototype.initModules = function () {
        this.plugins.forEach(function (e) {
          try {
            e.init();
          } catch (e) {
            console.warn(
              "lightGallery:- make sure lightGallery module is properly initiated",
            );
          }
        });
      }),
      (y.prototype.destroyModules = function (t) {
        this.plugins.forEach(function (e) {
          try {
            t ? e.destroy() : e.closeGallery && e.closeGallery();
          } catch (e) {
            console.warn(
              "lightGallery:- make sure lightGallery module is properly destroyed",
            );
          }
        });
      }),
      (y.prototype.refresh = function (e) {
        (this.settings.dynamic || this.invalidateItems(),
          (this.galleryItems = e || this.getItems()),
          this.updateControls(),
          this.openGalleryOnItemClick(),
          this.LGel.trigger(Zt));
      }),
      (y.prototype.updateControls = function () {
        (this.addSlideVideoInfo(this.galleryItems),
          this.updateCounterTotal(),
          this.manageSingleSlideClassName());
      }),
      (y.prototype.destroyGallery = function () {
        (this.destroyModules(!0),
          this.settings.dynamic || this.invalidateItems(),
          b(window).off(".lg.global" + this.lgId),
          this.LGel.off(".lg"),
          this.$container.remove());
      }),
      (y.prototype.destroy = function () {
        var e = this.closeGallery(!0);
        return (
          e
            ? setTimeout(this.destroyGallery.bind(this), e)
            : this.destroyGallery(),
          e
        );
      }),
      y);
  function y(e, t) {
    if (
      ((this.lgOpened = !1),
      (this.index = 0),
      (this.plugins = []),
      (this.lGalleryOn = !1),
      (this.lgBusy = !1),
      (this.currentItemsInDom = []),
      (this.prevScrollTop = 0),
      (this.bodyPaddingRight = 0),
      (this.isDummyImageRemoved = !1),
      (this.dragOrSwipeEnabled = !1),
      (this.mediaContainerPosition = { top: 0, bottom: 0 }),
      e)
    ) {
      if (
        (Mi++,
        (this.lgId = Mi),
        (this.el = e),
        (this.LGel = b(e)),
        this.generateSettings(t),
        this.buildModules(),
        this.settings.dynamic &&
          void 0 !== this.settings.dynamicEl &&
          !Array.isArray(this.settings.dynamicEl))
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      ((this.galleryItems = this.getItems()),
        this.normalizeSettings(),
        this.init(),
        this.validateLicense());
    }
    return this;
  }
  function Ei(t) {
    return Object.keys(t)
      .map(function (e) {
        return encodeURIComponent(e) + "=" + encodeURIComponent(t[e]);
      })
      .join("&");
  }
  function Ii(e, t) {
    return e.youtube
      ? ((e = e.youtube[2]
          ? e.youtube[2]
              .slice(1)
              .split("&")
              .map(function (e) {
                return e.split("=");
              })
              .reduce(function (e, t) {
                var t = t.map(decodeURIComponent),
                  i = t[0],
                  t = t[1];
                return ((e[i] = t), e);
              }, {})
          : ""),
        (t = t || {}),
        (t = v(
          v(
            v({}, { wmode: "opaque", autoplay: 0, mute: 1, enablejsapi: 1 }),
            t,
          ),
          e,
        )),
        "?" + Ei(t))
      : "";
  }
  var v = function () {
      return (v =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var n in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }).apply(this, arguments);
    },
    Oi = {
      autoplayFirstVideo: !0,
      youTubePlayerParams: !1,
      vimeoPlayerParams: !1,
      wistiaPlayerParams: !1,
      gotoNextSlideOnVideoEnd: !0,
      autoplayVideoOnSlide: !1,
      videojs: !1,
      videojsTheme: "",
      videojsOptions: {},
    },
    Li = "lgHasVideo",
    Pi = "lgSlideItemLoad",
    ji = "lgBeforeSlide",
    Yi = "lgAfterSlide",
    zi = "lgPosterClick",
    Ai =
      ((w.prototype.init = function () {
        var t = this;
        (this.core.LGel.on(Li + ".video", this.onHasVideo.bind(this)),
          this.core.LGel.on(zi + ".video", function () {
            var e = t.core.getSlideItem(t.core.index);
            t.loadVideoOnPosterClick(e);
          }),
          this.core.LGel.on(Pi + ".video", this.onSlideItemLoad.bind(this)),
          this.core.LGel.on(ji + ".video", this.onBeforeSlide.bind(this)),
          this.core.LGel.on(Yi + ".video", this.onAfterSlide.bind(this)));
      }),
      (w.prototype.onSlideItemLoad = function (e) {
        var t = this,
          e = e.detail,
          i = e.isFirstSlide,
          s = e.index;
        (this.settings.autoplayFirstVideo &&
          i &&
          s === this.core.index &&
          setTimeout(function () {
            t.loadAndPlayVideo(s);
          }, 200),
          !i &&
            this.settings.autoplayVideoOnSlide &&
            s === this.core.index &&
            this.loadAndPlayVideo(s));
      }),
      (w.prototype.onHasVideo = function (e) {
        var e = e.detail,
          t = e.index,
          i = e.src,
          s = e.html5Video;
        e.hasPoster ||
          (this.appendVideos(this.core.getSlideItem(t), {
            src: i,
            addClass: "lg-object",
            index: t,
            html5Video: s,
          }),
          this.gotoNextSlideOnVideoEnd(i, t));
      }),
      (w.prototype.onBeforeSlide = function (e) {
        this.core.lGalleryOn && ((e = e.detail.prevIndex), this.pauseVideo(e));
      }),
      (w.prototype.onAfterSlide = function (e) {
        var t = this,
          e = e.detail,
          i = e.index,
          e = e.prevIndex,
          s = this.core.getSlideItem(i);
        this.settings.autoplayVideoOnSlide &&
          i !== e &&
          s.hasClass("lg-complete") &&
          setTimeout(function () {
            t.loadAndPlayVideo(i);
          }, 100);
      }),
      (w.prototype.loadAndPlayVideo = function (e) {
        var t = this.core.getSlideItem(e);
        this.core.galleryItems[e].poster
          ? this.loadVideoOnPosterClick(t, !0)
          : this.playVideo(e);
      }),
      (w.prototype.playVideo = function (e) {
        this.controlVideo(e, "play");
      }),
      (w.prototype.pauseVideo = function (e) {
        this.controlVideo(e, "pause");
      }),
      (w.prototype.getVideoHtml = function (e, t, i, s) {
        var n,
          r = "",
          a = this.core.galleryItems[i].__slideVideoInfo || {},
          o = this.core.galleryItems[i],
          o = (o = o.title || o.alt) ? 'title="' + o + '"' : "",
          l =
            'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
        if (a.youtube)
          var d = "lg-youtube" + i,
            c = Ii(a, this.settings.youTubePlayerParams),
            r =
              '<iframe allow="autoplay" id=' +
              d +
              ' class="lg-video-object lg-youtube ' +
              t +
              '" ' +
              o +
              ' src="' +
              (e.includes("youtube-nocookie.com")
                ? "//www.youtube-nocookie.com/"
                : "//www.youtube.com/") +
              "embed/" +
              (a.youtube[1] + c) +
              '" ' +
              l +
              "></iframe>";
        else if (a.vimeo) {
          var d = "lg-vimeo" + i,
            u =
              ((e = this.settings.vimeoPlayerParams),
              (c = a) && c.vimeo
                ? ((n = c.vimeo[2] || ""),
                  (e = e && 0 !== Object.keys(e).length ? "&" + Ei(e) : ""),
                  (u = (
                    (c.vimeo[0].split("/").pop() || "").split("?")[0] || ""
                  ).split("#")[0]),
                  "?autoplay=0&muted=1" +
                    ((c = c.vimeo[1] !== u) ? "&h=" + u : "") +
                    e +
                    (n =
                      "?" == (n = c ? n.replace("/" + u, "") : n)[0]
                        ? "&" + n.slice(1)
                        : n || ""))
                : "");
          r =
            '<iframe allow="autoplay" id=' +
            d +
            ' class="lg-video-object lg-vimeo ' +
            t +
            '" ' +
            o +
            ' src="//player.vimeo.com/video/' +
            (a.vimeo[1] + u) +
            '" ' +
            l +
            "></iframe>";
        } else if (a.wistia) {
          ((e = "lg-wistia" + i), (u = Ei(this.settings.wistiaPlayerParams)));
          r =
            '<iframe allow="autoplay" id="' +
            e +
            '" src="//fast.wistia.net/embed/iframe/' +
            (a.wistia[4] + (u = u ? "?" + u : "")) +
            '" ' +
            o +
            ' class="wistia_embed lg-video-object lg-wistia ' +
            t +
            '" name="wistia_embed" ' +
            l +
            "></iframe>";
        } else if (a.html5) {
          for (var h = "", p = 0; p < s.source.length; p++)
            h +=
              '<source src="' +
              s.source[p].src +
              '" type="' +
              s.source[p].type +
              '">';
          if (s.tracks)
            for (p = 0; p < s.tracks.length; p++)
              !(function (e) {
                var t = "",
                  i = s.tracks[e];
                (Object.keys(i || {}).forEach(function (e) {
                  t += e + '="' + i[e] + '" ';
                }),
                  (h += "<track " + t + ">"));
              })(p);
          var m = "",
            g = s.attributes || {};
          (Object.keys(g || {}).forEach(function (e) {
            m += e + '="' + g[e] + '" ';
          }),
            (r =
              '<video class="lg-video-object lg-html5 ' +
              (this.settings.videojs && this.settings.videojsTheme
                ? this.settings.videojsTheme + " "
                : "") +
              " " +
              (this.settings.videojs ? " video-js" : "") +
              '" ' +
              m +
              ">\n                " +
              h +
              "\n                Your browser does not support HTML5 video.\n            </video>"));
        }
        return r;
      }),
      (w.prototype.appendVideos = function (e, t) {
        var i = this.getVideoHtml(t.src, t.addClass, t.index, t.html5Video),
          i =
            (e.find(".lg-video-cont").append(i),
            e.find(".lg-video-object").first());
        if (
          (t.html5Video &&
            i.on("mousedown.lg.video", function (e) {
              e.stopPropagation();
            }),
          this.settings.videojs &&
            null != (e = this.core.galleryItems[t.index].__slideVideoInfo) &&
            e.html5)
        )
          try {
            return videojs(i.get(), this.settings.videojsOptions);
          } catch (e) {
            console.error("lightGallery:- Make sure you have included videojs");
          }
      }),
      (w.prototype.gotoNextSlideOnVideoEnd = function (e, t) {
        var i = this,
          s = this.core.getSlideItem(t).find(".lg-video-object").first(),
          t = this.core.galleryItems[t].__slideVideoInfo || {};
        if (this.settings.gotoNextSlideOnVideoEnd)
          if (t.html5)
            s.on("ended", function () {
              i.core.goToNextSlide();
            });
          else if (t.vimeo)
            try {
              new Vimeo.Player(s.get()).on("ended", function () {
                i.core.goToNextSlide();
              });
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included //github.com/vimeo/player.js",
              );
            }
          else if (t.wistia)
            try {
              ((window._wq = window._wq || []),
                window._wq.push({
                  id: s.attr("id"),
                  onReady: function (e) {
                    e.bind("end", function () {
                      i.core.goToNextSlide();
                    });
                  },
                }));
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js",
              );
            }
      }),
      (w.prototype.controlVideo = function (e, t) {
        var i = this.core.getSlideItem(e).find(".lg-video-object").first(),
          e = this.core.galleryItems[e].__slideVideoInfo || {};
        if (i.get())
          if (e.youtube)
            try {
              i.get().contentWindow.postMessage(
                '{"event":"command","func":"' + t + 'Video","args":""}',
                "*",
              );
            } catch (e) {
              console.error("lightGallery:- " + e);
            }
          else if (e.vimeo)
            try {
              new Vimeo.Player(i.get())[t]();
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included //github.com/vimeo/player.js",
              );
            }
          else if (e.html5)
            if (this.settings.videojs)
              try {
                videojs(i.get())[t]();
              } catch (e) {
                console.error(
                  "lightGallery:- Make sure you have included videojs",
                );
              }
            else i.get()[t]();
          else if (e.wistia)
            try {
              ((window._wq = window._wq || []),
                window._wq.push({
                  id: i.attr("id"),
                  onReady: function (e) {
                    e[t]();
                  },
                }));
            } catch (e) {
              console.error(
                "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js",
              );
            }
      }),
      (w.prototype.loadVideoOnPosterClick = function (e, t) {
        var i,
          s,
          n,
          r = this;
        e.hasClass("lg-video-loaded")
          ? t && this.playVideo(this.core.index)
          : e.hasClass("lg-has-video")
            ? this.playVideo(this.core.index)
            : (e.addClass("lg-has-video"),
              (t = void 0),
              (i = this.core.galleryItems[this.core.index].src),
              (n = this.core.galleryItems[this.core.index].video) &&
                (t = "string" == typeof n ? JSON.parse(n) : n),
              (s = this.appendVideos(e, {
                src: i,
                addClass: "",
                index: this.core.index,
                html5Video: t,
              })),
              this.gotoNextSlideOnVideoEnd(i, this.core.index),
              (n = e.find(".lg-object").first().get()),
              e.find(".lg-video-cont").first().append(n),
              e.addClass("lg-video-loading"),
              s &&
                s.ready(function () {
                  s.on("loadedmetadata", function () {
                    r.onVideoLoadAfterPosterClick(e, r.core.index);
                  });
                }),
              e
                .find(".lg-video-object")
                .first()
                .on("load.lg error.lg loadedmetadata.lg", function () {
                  setTimeout(function () {
                    r.onVideoLoadAfterPosterClick(e, r.core.index);
                  }, 50);
                }));
      }),
      (w.prototype.onVideoLoadAfterPosterClick = function (e, t) {
        (e.addClass("lg-video-loaded"), this.playVideo(t));
      }),
      (w.prototype.destroy = function () {
        (this.core.LGel.off(".lg.video"), this.core.LGel.off(".video"));
      }),
      w);
  function w(e) {
    return (
      (this.core = e),
      (this.settings = v(v({}, Oi), this.core.settings)),
      this
    );
  }
  var Ni = function () {
      return (Ni =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var n in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }).apply(this, arguments);
    },
    Vi = {
      scale: 1,
      zoom: !0,
      infiniteZoom: !0,
      actualSize: !0,
      showZoomInOutIcons: !1,
      actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" },
      enableZoomAfter: 300,
      zoomPluginStrings: {
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        viewActualSize: "View actual size",
      },
    },
    Gi = "lgContainerResize",
    Qi = "lgBeforeOpen",
    Fi = "lgAfterOpen",
    Ri = "lgSlideItemLoad",
    Hi = "lgAfterSlide",
    Bi = "lgRotateLeft",
    Wi = "lgRotateRight",
    Ui = "lgFlipHorizontal",
    $i = "lgFlipVertical",
    qi =
      ((_.prototype.buildTemplates = function () {
        var e = this.settings.showZoomInOutIcons
          ? '<button id="' +
            this.core.getIdName("lg-zoom-in") +
            '" type="button" aria-label="' +
            this.settings.zoomPluginStrings.zoomIn +
            '" class="lg-zoom-in lg-icon"></button><button id="' +
            this.core.getIdName("lg-zoom-out") +
            '" type="button" aria-label="' +
            this.settings.zoomPluginStrings.zoomIn +
            '" class="lg-zoom-out lg-icon"></button>'
          : "";
        (this.settings.actualSize &&
          (e +=
            '<button id="' +
            this.core.getIdName("lg-actual-size") +
            '" type="button" aria-label="' +
            this.settings.zoomPluginStrings.viewActualSize +
            '" class="' +
            this.settings.actualSizeIcons.zoomIn +
            ' lg-icon"></button>'),
          this.core.outer.addClass("lg-use-transition-for-zoom"),
          this.core.$toolbar.first().append(e));
      }),
      (_.prototype.enableZoom = function (e) {
        var t = this,
          i = this.settings.enableZoomAfter + e.detail.delay;
        (this.$LG("body").first().hasClass("lg-from-hash") && e.detail.delay
          ? (i = 0)
          : this.$LG("body").first().removeClass("lg-from-hash"),
          (this.zoomableTimeout = setTimeout(function () {
            t.isImageSlide(t.core.index) &&
              (t.core.getSlideItem(e.detail.index).addClass("lg-zoomable"),
              e.detail.index === t.core.index) &&
              t.setZoomEssentials();
          }, i + 30)));
      }),
      (_.prototype.enableZoomOnSlideItemLoad = function () {
        this.core.LGel.on(Ri + ".zoom", this.enableZoom.bind(this));
      }),
      (_.prototype.getDragCords = function (e) {
        return { x: e.pageX, y: e.pageY };
      }),
      (_.prototype.getSwipeCords = function (e) {
        return { x: e.touches[0].pageX, y: e.touches[0].pageY };
      }),
      (_.prototype.getDragAllowedAxises = function (e, t) {
        var i = this.core
            .getSlideItem(this.core.index)
            .find(".lg-image")
            .first()
            .get(),
          s = 0,
          n = 0,
          r = i.getBoundingClientRect(),
          n = e
            ? ((s = i.offsetHeight * e), i.offsetWidth * e)
            : t
              ? ((s = r.height + t * r.height), r.width + t * r.width)
              : ((s = r.height), r.width),
          i = s > this.containerRect.height;
        return { allowX: n > this.containerRect.width, allowY: i };
      }),
      (_.prototype.setZoomEssentials = function () {
        this.containerRect = this.core.$content.get().getBoundingClientRect();
      }),
      (_.prototype.zoomImage = function (e, t, i, s) {
        var n, r, a, o, l, d, c, u;
        Math.abs(t) <= 0 ||
          ((l = this.containerRect.width / 2 + this.containerRect.left),
          (c =
            this.containerRect.height / 2 +
            this.containerRect.top +
            this.scrollTop),
          1 === e && (this.positionChanged = !1),
          (n = (r = this.getDragAllowedAxises(0, t)).allowY),
          (r = r.allowX),
          this.positionChanged &&
            ((a = this.left / (this.scale - t)),
            (o = this.top / (this.scale - t)),
            (this.pageX = l - a),
            (this.pageY = c - o),
            (this.positionChanged = !1)),
          (a = this.getPossibleSwipeDragCords(t)),
          (o = l - this.pageX),
          (l = c - this.pageY),
          (c =
            1 < e - t
              ? ((u = (e - t) / Math.abs(t)),
                (d =
                  (o = (t < 0 ? -o : o) + this.left * (u + (t < 0 ? -1 : 1))) /
                  u),
                (l = (t < 0 ? -l : l) + this.top * (u + (t < 0 ? -1 : 1))) / u)
              : ((d = o * (u = (e - t) * t)), l * u)),
          i &&
            (r
              ? this.isBeyondPossibleLeft(d, a.minX)
                ? (d = a.minX)
                : this.isBeyondPossibleRight(d, a.maxX) && (d = a.maxX)
              : 1 < e &&
                (d < a.minX ? (d = a.minX) : d > a.maxX && (d = a.maxX)),
            n
              ? this.isBeyondPossibleTop(c, a.minY)
                ? (c = a.minY)
                : this.isBeyondPossibleBottom(c, a.maxY) && (c = a.maxY)
              : 1 < e &&
                (c < a.minY ? (c = a.minY) : c > a.maxY && (c = a.maxY))),
          this.setZoomStyles({ x: d, y: c, scale: e }),
          (this.left = d),
          (this.top = c),
          s && this.setZoomImageSize());
      }),
      (_.prototype.resetImageTranslate = function (e) {
        var t;
        this.isImageSlide(e) &&
          ((t = this.core.getSlideItem(e).find(".lg-image").first()),
          (this.imageReset = !1),
          t.removeClass(
            "reset-transition reset-transition-y reset-transition-x",
          ),
          this.core.outer.removeClass("lg-actual-size"),
          t.css("width", "auto").css("height", "auto"),
          setTimeout(function () {
            t.removeClass("no-transition");
          }, 10));
      }),
      (_.prototype.setZoomImageSize = function () {
        var t = this,
          i = this.core.getSlideItem(this.core.index).find(".lg-image").first();
        (setTimeout(function () {
          var e = t.getCurrentImageActualSizeScale();
          t.scale >= e && (i.addClass("no-transition"), (t.imageReset = !0));
        }, 500),
          setTimeout(function () {
            var e = t.getCurrentImageActualSizeScale();
            t.scale >= e &&
              ((e = t.getDragAllowedAxises(t.scale)),
              i
                .css("width", i.get().naturalWidth + "px")
                .css("height", i.get().naturalHeight + "px"),
              t.core.outer.addClass("lg-actual-size"),
              e.allowX && e.allowY
                ? i.addClass("reset-transition")
                : e.allowX && !e.allowY
                  ? i.addClass("reset-transition-x")
                  : !e.allowX && e.allowY && i.addClass("reset-transition-y"));
          }, 550));
      }),
      (_.prototype.setZoomStyles = function (e) {
        var t = this.core
            .getSlideItem(this.core.index)
            .find(".lg-img-wrap")
            .first(),
          i = this.core.getSlideItem(this.core.index).find(".lg-image").first(),
          s = this.core.outer.find(".lg-current .lg-dummy-img").first(),
          i =
            ((this.scale = e.scale),
            i.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)"),
            s.css("transform", "scale3d(" + e.scale + ", " + e.scale + ", 1)"),
            "translate3d(" + e.x + "px, " + e.y + "px, 0)");
        t.css("transform", i);
      }),
      (_.prototype.setActualSize = function (e, i) {
        var s,
          n = this;
        this.zoomInProgress ||
          ((this.zoomInProgress = !0),
          (s = this.core.galleryItems[this.core.index]),
          this.resetImageTranslate(e),
          setTimeout(function () {
            var e, t;
            s.src &&
              !n.core.outer.hasClass("lg-first-slide-loading") &&
              ((e = n.getCurrentImageActualSizeScale()),
              (t = n.scale),
              n.core.outer.hasClass("lg-zoomed")
                ? (n.scale = 1)
                : (n.scale = n.getScale(e)),
              n.setPageCords(i),
              n.beginZoom(n.scale),
              n.zoomImage(n.scale, n.scale - t, !0, !0));
          }, 50),
          setTimeout(function () {
            n.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
          }, 60),
          setTimeout(function () {
            n.zoomInProgress = !1;
          }, 610));
      }),
      (_.prototype.getNaturalWidth = function (e) {
        var t = this.core.getSlideItem(e).find(".lg-image").first(),
          e = this.core.galleryItems[e].width;
        return e ? parseFloat(e) : t.get().naturalWidth;
      }),
      (_.prototype.getActualSizeScale = function (e, t) {
        e = t <= e ? e / t || 2 : 1;
        return e;
      }),
      (_.prototype.getCurrentImageActualSizeScale = function () {
        var e = this.core
            .getSlideItem(this.core.index)
            .find(".lg-image")
            .first()
            .get().offsetWidth,
          t = this.getNaturalWidth(this.core.index) || e;
        return this.getActualSizeScale(t, e);
      }),
      (_.prototype.getPageCords = function (e) {
        var t = {};
        return (
          e
            ? ((t.x = e.pageX || e.touches[0].pageX),
              (t.y = e.pageY || e.touches[0].pageY))
            : ((e = this.core.$content.get().getBoundingClientRect()),
              (t.x = e.width / 2 + e.left),
              (t.y = e.height / 2 + this.scrollTop + e.top)),
          t
        );
      }),
      (_.prototype.setPageCords = function (e) {
        e = this.getPageCords(e);
        ((this.pageX = e.x), (this.pageY = e.y));
      }),
      (_.prototype.manageActualPixelClassNames = function () {
        this.core
          .getElementById("lg-actual-size")
          .removeClass(this.settings.actualSizeIcons.zoomIn)
          .addClass(this.settings.actualSizeIcons.zoomOut);
      }),
      (_.prototype.beginZoom = function (e) {
        return (
          this.core.outer.removeClass(
            "lg-zoom-drag-transition lg-zoom-dragging",
          ),
          1 < e
            ? (this.core.outer.addClass("lg-zoomed"),
              this.manageActualPixelClassNames())
            : this.resetZoom(),
          1 < e
        );
      }),
      (_.prototype.getScale = function (e) {
        var t = this.getCurrentImageActualSizeScale();
        return (e < 1 ? (e = 1) : t < e && (e = t), e);
      }),
      (_.prototype.init = function () {
        var i,
          s = this;
        this.settings.zoom &&
          (this.buildTemplates(),
          this.enableZoomOnSlideItemLoad(),
          (i = null),
          this.core.outer.on("dblclick.lg", function (e) {
            s.$LG(e.target).hasClass("lg-image") &&
              s.setActualSize(s.core.index, e);
          }),
          this.core.outer.on("touchstart.lg", function (e) {
            var t = s.$LG(e.target);
            1 === e.touches.length &&
              t.hasClass("lg-image") &&
              (i
                ? (clearTimeout(i),
                  (i = null),
                  e.preventDefault(),
                  s.setActualSize(s.core.index, e))
                : (i = setTimeout(function () {
                    i = null;
                  }, 300)));
          }),
          this.core.LGel.on(
            Gi +
              ".zoom " +
              Wi +
              ".zoom " +
              Bi +
              ".zoom " +
              Ui +
              ".zoom " +
              $i +
              ".zoom",
            function () {
              var e;
              s.core.lgOpened &&
                s.isImageSlide(s.core.index) &&
                !s.core.touchAction &&
                ((e = s.core
                  .getSlideItem(s.core.index)
                  .find(".lg-img-wrap")
                  .first()),
                (s.top = 0),
                (s.left = 0),
                s.setZoomEssentials(),
                s.setZoomSwipeStyles(e, { x: 0, y: 0 }),
                (s.positionChanged = !0));
            },
          ),
          this.$LG(window).on(
            "scroll.lg.zoom.global" + this.core.lgId,
            function () {
              s.core.lgOpened && (s.scrollTop = s.$LG(window).scrollTop());
            },
          ),
          this.core.getElementById("lg-zoom-out").on("click.lg", function () {
            var e;
            s.isImageSlide(s.core.index) &&
              ((e = 0),
              s.imageReset && (s.resetImageTranslate(s.core.index), (e = 50)),
              setTimeout(function () {
                var e = s.scale - s.settings.scale;
                (s.beginZoom((e = e < 1 ? 1 : e)),
                  s.zoomImage(
                    e,
                    -s.settings.scale,
                    !0,
                    !s.settings.infiniteZoom,
                  ));
              }, e));
          }),
          this.core.getElementById("lg-zoom-in").on("click.lg", function () {
            s.zoomIn();
          }),
          this.core
            .getElementById("lg-actual-size")
            .on("click.lg", function () {
              s.setActualSize(s.core.index);
            }),
          this.core.LGel.on(Qi + ".zoom", function () {
            s.core.outer.find(".lg-item").removeClass("lg-zoomable");
          }),
          this.core.LGel.on(Fi + ".zoom", function () {
            ((s.scrollTop = s.$LG(window).scrollTop()),
              (s.pageX = s.core.outer.width() / 2),
              (s.pageY = s.core.outer.height() / 2 + s.scrollTop),
              (s.scale = 1));
          }),
          this.core.LGel.on(Hi + ".zoom", function (e) {
            e = e.detail.prevIndex;
            ((s.scale = 1),
              (s.positionChanged = !1),
              (s.zoomInProgress = !1),
              s.resetZoom(e),
              s.resetImageTranslate(e),
              s.isImageSlide(s.core.index) && s.setZoomEssentials());
          }),
          this.zoomDrag(),
          this.pinchZoom(),
          this.zoomSwipe(),
          (this.zoomableTimeout = !1),
          (this.positionChanged = !1),
          (this.zoomInProgress = !1));
      }),
      (_.prototype.zoomIn = function () {
        var e;
        this.isImageSlide(this.core.index) &&
          ((e = this.scale + this.settings.scale),
          this.settings.infiniteZoom || (e = this.getScale(e)),
          this.beginZoom(e),
          this.zoomImage(
            e,
            Math.min(this.settings.scale, e - this.scale),
            !0,
            !this.settings.infiniteZoom,
          ));
      }),
      (_.prototype.resetZoom = function (e) {
        this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
        var t = this.core.getElementById("lg-actual-size"),
          e = this.core.getSlideItem(void 0 !== e ? e : this.core.index);
        (t
          .removeClass(this.settings.actualSizeIcons.zoomOut)
          .addClass(this.settings.actualSizeIcons.zoomIn),
          e.find(".lg-img-wrap").first().removeAttr("style"),
          e.find(".lg-image").first().removeAttr("style"),
          (this.scale = 1),
          (this.left = 0),
          (this.top = 0),
          this.setPageCords());
      }),
      (_.prototype.getTouchDistance = function (e) {
        return Math.sqrt(
          (e.touches[0].pageX - e.touches[1].pageX) *
            (e.touches[0].pageX - e.touches[1].pageX) +
            (e.touches[0].pageY - e.touches[1].pageY) *
              (e.touches[0].pageY - e.touches[1].pageY),
        );
      }),
      (_.prototype.pinchZoom = function () {
        var t,
          i = this,
          s = 0,
          n = !1,
          r = 1,
          a = this.core.getSlideItem(this.core.index);
        (this.core.outer.on("touchstart.lg", function (e) {
          ((a = i.core.getSlideItem(i.core.index)),
            i.isImageSlide(i.core.index) &&
              2 === e.touches.length &&
              (e.preventDefault(),
              i.core.outer.hasClass("lg-first-slide-loading") ||
                ((r = i.scale || 1),
                i.core.outer.removeClass(
                  "lg-zoom-drag-transition lg-zoom-dragging",
                ),
                i.setPageCords(e),
                i.resetImageTranslate(i.core.index),
                (i.core.touchAction = "pinch"),
                (s = i.getTouchDistance(e)))));
        }),
          this.core.$inner.on("touchmove.lg", function (e) {
            2 === e.touches.length &&
              "pinch" === i.core.touchAction &&
              (i.$LG(e.target).hasClass("lg-item") ||
                a.get().contains(e.target)) &&
              (e.preventDefault(),
              (e = i.getTouchDistance(e)),
              (e = s - e),
              (n = (!n && 5 < Math.abs(e)) || n)) &&
              ((t = i.scale),
              (e = Math.max(1, r + 0.02 * -e)),
              (i.scale = Math.round(100 * (e + Number.EPSILON)) / 100),
              (e = i.scale - t),
              i.zoomImage(
                i.scale,
                Math.round(100 * (e + Number.EPSILON)) / 100,
                !1,
                !1,
              ));
          }),
          this.core.$inner.on("touchend.lg", function (e) {
            var t;
            "pinch" === i.core.touchAction &&
              (i.$LG(e.target).hasClass("lg-item") ||
                a.get().contains(e.target)) &&
              ((n = !1),
              (s = 0),
              i.scale <= 1
                ? i.resetZoom()
                : ((e = i.getCurrentImageActualSizeScale()),
                  i.scale >= e &&
                    ((t = e - i.scale),
                    i.zoomImage(e, (t = 0 === t ? 0.01 : t), !1, !0)),
                  i.manageActualPixelClassNames(),
                  i.core.outer.addClass("lg-zoomed")),
              (i.core.touchAction = void 0));
          }));
      }),
      (_.prototype.touchendZoom = function (e, t, i, s, n) {
        var r = t.x - e.x,
          t = t.y - e.y,
          e = Math.abs(r) / n + 1,
          n = Math.abs(t) / n + 1,
          e =
            (2 < e && (e += 1),
            2 < n && (n += 1),
            (r *= e),
            (t *= n),
            this.core
              .getSlideItem(this.core.index)
              .find(".lg-img-wrap")
              .first()),
          n = {},
          a =
            ((n.x = this.left + r),
            (n.y = this.top + t),
            this.getPossibleSwipeDragCords());
        (15 < Math.abs(r) || 15 < Math.abs(t)) &&
          (s &&
            (this.isBeyondPossibleTop(n.y, a.minY)
              ? (n.y = a.minY)
              : this.isBeyondPossibleBottom(n.y, a.maxY) && (n.y = a.maxY)),
          i &&
            (this.isBeyondPossibleLeft(n.x, a.minX)
              ? (n.x = a.minX)
              : this.isBeyondPossibleRight(n.x, a.maxX) && (n.x = a.maxX)),
          s ? (this.top = n.y) : (n.y = this.top),
          i ? (this.left = n.x) : (n.x = this.left),
          this.setZoomSwipeStyles(e, n),
          (this.positionChanged = !0));
      }),
      (_.prototype.getZoomSwipeCords = function (e, t, i, s, n) {
        var r = {};
        return (
          s
            ? ((r.y = this.top + (t.y - e.y)),
              this.isBeyondPossibleTop(r.y, n.minY)
                ? ((s = n.minY - r.y), (r.y = n.minY - s / 6))
                : this.isBeyondPossibleBottom(r.y, n.maxY) &&
                  ((s = r.y - n.maxY), (r.y = n.maxY + s / 6)))
            : (r.y = this.top),
          i
            ? ((r.x = this.left + (t.x - e.x)),
              this.isBeyondPossibleLeft(r.x, n.minX)
                ? ((s = n.minX - r.x), (r.x = n.minX - s / 6))
                : this.isBeyondPossibleRight(r.x, n.maxX) &&
                  ((i = r.x - n.maxX), (r.x = n.maxX + i / 6)))
            : (r.x = this.left),
          r
        );
      }),
      (_.prototype.isBeyondPossibleLeft = function (e, t) {
        return t <= e;
      }),
      (_.prototype.isBeyondPossibleRight = function (e, t) {
        return e <= t;
      }),
      (_.prototype.isBeyondPossibleTop = function (e, t) {
        return t <= e;
      }),
      (_.prototype.isBeyondPossibleBottom = function (e, t) {
        return e <= t;
      }),
      (_.prototype.isImageSlide = function (e) {
        e = this.core.galleryItems[e];
        return "image" === this.core.getSlideType(e);
      }),
      (_.prototype.getPossibleSwipeDragCords = function (e) {
        var t = this.core
            .getSlideItem(this.core.index)
            .find(".lg-image")
            .first(),
          i = this.core.mediaContainerPosition.bottom,
          t = t.get().getBoundingClientRect(),
          s = t.height,
          t = t.width;
        return (
          e && ((s += e * s), (t += e * t)),
          {
            minY: (s - this.containerRect.height) / 2,
            maxY: (this.containerRect.height - s) / 2 + i,
            minX: (t - this.containerRect.width) / 2,
            maxX: (this.containerRect.width - t) / 2,
          }
        );
      }),
      (_.prototype.setZoomSwipeStyles = function (e, t) {
        e.css("transform", "translate3d(" + t.x + "px, " + t.y + "px, 0)");
      }),
      (_.prototype.zoomSwipe = function () {
        var i,
          s,
          n = this,
          r = {},
          t = {},
          a = !1,
          o = !1,
          l = !1,
          d = new Date(),
          c = (new Date(), this.core.getSlideItem(this.core.index));
        (this.core.$inner.on("touchstart.lg", function (e) {
          var t;
          n.isImageSlide(n.core.index) &&
            ((c = n.core.getSlideItem(n.core.index)),
            n.$LG(e.target).hasClass("lg-item") ||
              c.get().contains(e.target)) &&
            1 === e.touches.length &&
            n.core.outer.hasClass("lg-zoomed") &&
            (e.preventDefault(),
            (d = new Date()),
            (n.core.touchAction = "zoomSwipe"),
            (s = n.core
              .getSlideItem(n.core.index)
              .find(".lg-img-wrap")
              .first()),
            (t = n.getDragAllowedAxises(0)),
            (l = t.allowY),
            ((o = t.allowX) || l) && (r = n.getSwipeCords(e)),
            (i = n.getPossibleSwipeDragCords()),
            n.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition"));
        }),
          this.core.$inner.on("touchmove.lg", function (e) {
            1 === e.touches.length &&
              "zoomSwipe" === n.core.touchAction &&
              (n.$LG(e.target).hasClass("lg-item") ||
                c.get().contains(e.target)) &&
              (e.preventDefault(),
              (n.core.touchAction = "zoomSwipe"),
              (t = n.getSwipeCords(e)),
              (e = n.getZoomSwipeCords(r, t, o, l, i)),
              15 < Math.abs(t.x - r.x) || 15 < Math.abs(t.y - r.y)) &&
              ((a = !0), n.setZoomSwipeStyles(s, e));
          }),
          this.core.$inner.on("touchend.lg", function (e) {
            "zoomSwipe" === n.core.touchAction &&
              (n.$LG(e.target).hasClass("lg-item") ||
                c.get().contains(e.target)) &&
              (e.preventDefault(),
              (n.core.touchAction = void 0),
              n.core.outer.removeClass("lg-zoom-dragging"),
              a) &&
              ((a = !1),
              (e = new Date().valueOf() - d.valueOf()),
              n.touchendZoom(r, t, o, l, e));
          }));
      }),
      (_.prototype.zoomDrag = function () {
        var i,
          t,
          s,
          n,
          r = this,
          a = {},
          o = {},
          l = !1,
          d = !1,
          c = !1,
          u = !1;
        (this.core.outer.on("mousedown.lg.zoom", function (e) {
          var t;
          r.isImageSlide(r.core.index) &&
            ((t = r.core.getSlideItem(r.core.index)),
            r.$LG(e.target).hasClass("lg-item") ||
              t.get().contains(e.target)) &&
            ((i = new Date()),
            (n = r.core
              .getSlideItem(r.core.index)
              .find(".lg-img-wrap")
              .first()),
            (t = r.getDragAllowedAxises(0)),
            (u = t.allowY),
            (c = t.allowX),
            r.core.outer.hasClass("lg-zoomed")) &&
            r.$LG(e.target).hasClass("lg-object") &&
            (c || u) &&
            (e.preventDefault(),
            (a = r.getDragCords(e)),
            (s = r.getPossibleSwipeDragCords()),
            (l = !0),
            r.core.outer
              .removeClass("lg-grab")
              .addClass(
                "lg-grabbing lg-zoom-drag-transition lg-zoom-dragging",
              ));
        }),
          this.$LG(window).on(
            "mousemove.lg.zoom.global" + this.core.lgId,
            function (e) {
              l &&
                ((d = !0),
                (o = r.getDragCords(e)),
                (e = r.getZoomSwipeCords(a, o, c, u, s)),
                r.setZoomSwipeStyles(n, e));
            },
          ),
          this.$LG(window).on(
            "mouseup.lg.zoom.global" + this.core.lgId,
            function (e) {
              (l &&
                ((t = new Date()),
                (l = !1),
                r.core.outer.removeClass("lg-zoom-dragging"),
                !d ||
                  (a.x === o.x && a.y === o.y) ||
                  ((o = r.getDragCords(e)),
                  (e = t.valueOf() - i.valueOf()),
                  r.touchendZoom(a, o, c, u, e)),
                (d = !1)),
                r.core.outer.removeClass("lg-grabbing").addClass("lg-grab"));
            },
          ));
      }),
      (_.prototype.closeGallery = function () {
        (this.resetZoom(), (this.zoomInProgress = !1));
      }),
      (_.prototype.destroy = function () {
        (this.$LG(window).off(".lg.zoom.global" + this.core.lgId),
          this.core.LGel.off(".lg.zoom"),
          this.core.LGel.off(".zoom"),
          clearTimeout(this.zoomableTimeout),
          (this.zoomableTimeout = !1));
      }),
      _);
  function _(e, t) {
    return (
      (this.core = e),
      (this.$LG = t),
      (this.settings = Ni(Ni({}, Vi), this.core.settings)),
      this
    );
  }
  const Xi = (e) => Array.isArray(e),
    Zi = (e) => (Xi(e) ? e : [e]);
  function Ji(e) {
    function t(e) {
      return (
        Zi(e).forEach((e) => n.set(Symbol(e.char?.innerText), s({ ...e }))),
        this
      );
    }
    let s = (e) => (
        (e.shouldPauseCursor = function () {
          return Boolean(this.typeable || this.cursorable || this.deletable);
        }),
        e
      ),
      i = () => Array.from(n.values()),
      n = new Map();
    return (
      t(e),
      {
        add: t,
        set: function (e, t) {
          var i = [...n.keys()];
          n.set(i[e], s(t));
        },
        wipe: function () {
          ((n = new Map()), t(e));
        },
        reset: function () {
          n.forEach((e) => delete e.done);
        },
        destroy: (e) => n.delete(e),
        done: (e, t = !1) => (t ? n.delete(e) : (n.get(e).done = !0)),
        getItems: (e = !1) => (e ? i() : i().filter((e) => !e.done)),
        getQueue: () => n,
        getTypeable: () => i().filter((e) => e.typeable),
      }
    );
  }
  const Ki = (e) => Array.from(e),
    es = (e) => document.createTextNode(e);
  let ts = (e) => (
    [...e.childNodes].forEach((t) => {
      t.nodeValue
        ? ([...t.nodeValue].forEach((e) => {
            t.parentNode.insertBefore(es(e), t);
          }),
          t.remove())
        : ts(t);
    }),
    e
  );
  const is = (e) => {
      var t = document.implementation.createHTMLDocument();
      return ((t.body.innerHTML = e), ts(t.body));
    },
    ss = "data-typeit-id",
    P = "ti-cursor",
    ns = "END",
    rs = { started: !1, completed: !1, frozen: !1, destroyed: !1 },
    j = {
      breakLines: !0,
      cursor: {
        autoPause: !0,
        autoPauseDelay: 500,
        animation: {
          frames: [0, 0, 1].map((e) => ({ opacity: e })),
          options: {
            iterations: 1 / 0,
            easing: "steps(2, start)",
            fill: "forwards",
          },
        },
      },
      cursorChar: "|",
      cursorSpeed: 1e3,
      deleteSpeed: null,
      html: !0,
      lifeLike: !0,
      loop: !1,
      loopDelay: 750,
      nextStringDelay: 750,
      speed: 100,
      startDelay: 250,
      startDelete: !1,
      strings: [],
      waitUntilVisible: !1,
      beforeString: () => {},
      afterString: () => {},
      beforeStep: () => {},
      afterStep: () => {},
      afterComplete: () => {},
    },
    as = `[${ss}]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}`;
  function os(e, t = !1, i = !1) {
    let s = e.querySelector("." + P);
    for (
      var n,
        r = document.createTreeWalker(e, NodeFilter.SHOW_ALL, {
          acceptNode: (e) => {
            if (s && i) {
              if (e.classList?.contains(P)) return NodeFilter.FILTER_ACCEPT;
              if (s.contains(e)) return NodeFilter.FILTER_REJECT;
            }
            return e.classList?.contains(P)
              ? NodeFilter.FILTER_REJECT
              : NodeFilter.FILTER_ACCEPT;
          },
        }),
        a = [];
      (n = r.nextNode());
    )
      (n.originalParent || (n.originalParent = n.parentNode), a.push(n));
    return t ? a.reverse() : a;
  }
  function ls(e, t = !0) {
    return t ? ((t = e), os(is(t))) : Ki(e).map(es);
  }
  const ds = (e) => document.createElement(e),
    cs = (e, t = "") => {
      var i = ds("style");
      ((i.id = t), i.appendChild(es(e)), document.head.appendChild(i));
    },
    us = (e) => (e = Xi(e) ? e : [e / 2, e / 2]),
    hs = (e, t) => Math.abs(Math.random() * (e + t - (e - t)) + (e - t));
  let ps = (e) => e / 2;
  const ms = (e) => "value" in e;
  let gs = (e) => ("function" == typeof e ? e() : e);
  const fs = (e) => Number.isInteger(e);
  let ys = (e, t = document, i = !1) =>
      t["querySelector" + (i ? "All" : "")](e),
    vs = (e) => /body/i.test(e?.tagName);
  const ws = (e, t) => Object.assign({}, e, t);
  let bs = {
    "font-family": "",
    "font-weight": "",
    "font-size": "",
    "font-style": "",
    "line-height": "",
    color: "",
    transform: "translateX(-.125em)",
  };
  const _s = (e, t) => new Array(t).fill(e),
    Ss = ({ queueItems: e, selector: s, cursorPosition: t, to: i }) => {
      if (fs(s)) return -1 * s;
      let n = new RegExp(ns, "i").test(i),
        r = s
          ? [...e].reverse().findIndex(({ char: e }) => {
              var t = e.parentElement,
                i = t.matches(s);
              return !(!n || !i) || (i && t.firstChild.isSameNode(e));
            })
          : -1;
      r < 0 && (r = n ? 0 : e.length - 1);
      i = n ? 0 : 1;
      return r - t + i;
    };
  let xs = (t) =>
      new Promise((e) => {
        requestAnimationFrame(async () => {
          e(await t());
        });
      }),
    Ts = (t) =>
      t?.getAnimations().find((e) => e.id === t.dataset.tiAnimationId),
    Cs = ({ cursor: e, frames: t, options: i }) => {
      let s = e.animate(t, i);
      return (
        s.pause(),
        (s.id = e.dataset.tiAnimationId),
        xs(() => {
          xs(() => {
            s.play();
          });
        }),
        s
      );
    },
    Ds = ({ cursor: t, options: i, cursorOptions: s }) => {
      if (t && s) {
        var n = Ts(t);
        let e;
        n &&
          ((i.delay = n.effect.getComputedTiming().delay),
          (e = n.currentTime),
          n.cancel());
        n = Cs({ cursor: t, frames: s.animation.frames, options: i });
        return (e && (n.currentTime = e), n);
      }
    },
    Ms = (e) => e.func?.call(null);
  function ks(e, t = {}) {
    let l = async (e, t, i = !1) => {
        var s, n, r;
        (M.frozen &&
          (await new Promise((e) => {
            this.unfreeze = () => {
              ((M.frozen = !1), e());
            };
          })),
          i || (await k.beforeStep(this)),
          (s = e),
          (n = t),
          (r = T),
          await new Promise((e) => {
            r.push(
              setTimeout(async () => {
                (await s(), e());
              }, n || 0),
            );
          }),
          i || (await k.afterStep(this)));
      },
      d = (e, t) =>
        (async ({
          index: e,
          queueItems: t,
          wait: i,
          cursor: s,
          cursorOptions: n,
        }) => {
          let r = t[e][1],
            a = [],
            o = e,
            l = r;
          var d = () => l && !l.delay;
          let c = r.shouldPauseCursor() && n.autoPause;
          for (; d(); ) (a.push(l), d() && o++, (l = t[o] ? t[o][1] : null));
          if (a.length)
            return (
              await xs(async () => {
                for (var e of a) await Ms(e);
              }),
              o - 1
            );
          let u = Ts(s),
            h;
          return (
            u &&
              (h = {
                ...u.effect.getComputedTiming(),
                delay: c ? n.autoPauseDelay : 0,
              }),
            await i(async () => {
              (u && c && u.cancel(),
                await xs(() => {
                  Ms(r);
                }));
            }, r.delay),
            await Ds({ cursor: s, options: h, cursorOptions: n }),
            e
          );
        })({
          index: e,
          queueItems: t,
          wait: l,
          cursor: L,
          cursorOptions: k.cursor,
        }),
      i = (e) => {
        var t, i;
        ((e = e),
          (t = x),
          e &&
            (1 < (i = e.parentNode).childNodes.length || i.isSameNode(t)
              ? e
              : i
            ).remove());
      },
      s = () => ms(x),
      c = (e = 0) =>
        (function (e) {
          var { speed: e, deleteSpeed: t, lifeLike: i } = e,
            t = null !== t ? t : e / 3;
          return i ? [hs(e, ps(e)), hs(t, ps(t))] : [e, t];
        })(k)[e],
      u = () => {
        return (
          (e = x),
          ms(e)
            ? Ki(e.value)
            : os(e, !0).filter((e) => !(0 < e.childNodes.length))
        );
        var e;
      },
      o = (e, t) => {
        I.add(e);
        var [e = {}] = [t];
        return ((e = e.delay) && I.add({ delay: e }), this);
      },
      h = () => D ?? C,
      p = (e = {}) => [{ func: () => b(e) }, { func: () => b(k) }],
      n = (e) => {
        var t = k.nextStringDelay;
        I.add([{ delay: t[0] }, ...e, { delay: t[1] }]);
      },
      r = async () => {
        if ((!s() && L && x.appendChild(L), O)) {
          {
            var e = E;
            var t = x;
            var i = `[${ss}='${e}']` + " ." + P;
            let s = getComputedStyle(t);
            t = Object.entries(bs).reduce(
              (e, [t, i]) => `${e} ${t}: var(--ti-cursor-${t}, ${i || s[t]});`,
              "",
            );
            cs(i + ` { display: inline-block; width: 0; ${t} }`, e);
          }
          L.dataset.tiAnimationId = E;
          var i = k.cursor["animation"],
            { frames: t, options: e } = i;
          Cs({
            frames: t,
            cursor: L,
            options: { duration: k.cursorSpeed, ...e },
          });
        }
      };
    var a,
      m,
      g,
      f = () => {
        let i = k.strings.filter((e) => !!e);
        i.forEach((e, t) => {
          (this.type(e),
            t + 1 !== i.length &&
              ((e = k.breakLines
                ? [{ func: () => w(ds("BR")), typeable: !0 }]
                : _s({ func: S, delay: c(1) }, I.getTypeable().length)),
              n(e)));
        });
      };
    let y = async (i = !0) => {
        M.started = !0;
        let n = (e) => {
          I.done(e, !i);
        };
        try {
          let t = [...I.getQueue()];
          for (let e = 0; e < t.length; e++) {
            var r,
              [a, o] = t[e];
            o.done ||
              ((!o.deletable || (o.deletable && u().length)) &&
                ((r = await d(e, t)),
                Array(r - e)
                  .fill(e + 1)
                  .map((e, t) => e + t)
                  .forEach((e) => {
                    var [e] = t[e];
                    n(e);
                  }),
                (e = r)),
              n(a));
          }
          if (!i) return this;
          if (((M.completed = !0), await k.afterComplete(this), !k.loop))
            throw "";
          let s = k.loopDelay;
          l(async () => {
            var e = s[0],
              t = h(),
              i =
                (t && (await v({ value: t })),
                u().map((e) => [
                  Symbol(),
                  {
                    func: S,
                    delay: c(1),
                    deletable: !0,
                    shouldPauseCursor: () => !0,
                  },
                ]));
            for (let e = 0; e < i.length; e++) await d(e, i);
            (I.reset(), I.set(0, { delay: e }), await 0, y());
          }, s[1]);
        } catch (e) {}
        return this;
      },
      v = async (e) => {
        C =
          ((e = e), (t = C), (i = u()), Math.min(Math.max(t + e, 0), i.length));
        var t = x,
          e = u(),
          i = C;
        ((e = e[i - 1]),
          (i = ys("." + P, t)),
          (t = e?.parentNode || t).insertBefore(i, e || null));
      },
      w = (e) => {
        var t;
        ((t = x),
          (e = e),
          ms(t)
            ? (t.value = "" + t.value + e.textContent)
            : ((e.innerHTML = ""),
              (t =
                (!vs(e.originalParent) && e.originalParent) || t).insertBefore(
                e,
                ys("." + P, t) || null,
              )));
      },
      b = async (e) => (k = ws(k, e)),
      _ = async () => {
        s() ? (x.value = "") : u().forEach(i);
      },
      S = () => {
        var e = u();
        e.length && (s() ? (x.value = x.value.slice(0, -1)) : i(e[C]));
      },
      x =
        ((this.break = function (e) {
          return o({ func: () => w(ds("BR")), typeable: !0 }, e);
        }),
        (this.delete = function (e = null, t = {}) {
          e = gs(e);
          var i = p(t);
          let s = e,
            { instant: n, to: r } = t,
            a = I.getTypeable();
          e =
            null === s
              ? a.length
              : fs(s)
                ? s
                : Ss({
                    queueItems: a,
                    selector: s,
                    cursorPosition: h(),
                    to: r,
                  });
          return o(
            [
              i[0],
              ..._s({ func: S, delay: n ? 0 : c(1), deletable: !0 }, e),
              i[1],
            ],
            t,
          );
        }),
        (this.empty = function (e = {}) {
          return o({ func: _ }, e);
        }),
        (this.exec = function (e, t = {}) {
          var i = p(t);
          return o([i[0], { func: () => e(this) }, i[1]], t);
        }),
        (this.move = function (e, t = {}) {
          e = gs(e);
          var i = p(t),
            { instant: s, to: n } = t,
            e = Ss({
              queueItems: I.getTypeable(),
              selector: null === e ? "" : e,
              to: n,
              cursorPosition: h(),
            });
          let r = e < 0 ? -1 : 1;
          return (
            (D = h() + e),
            o(
              [
                i[0],
                ..._s(
                  { func: () => v(r), delay: s ? 0 : c(), cursorable: !0 },
                  Math.abs(e),
                ),
                i[1],
              ],
              t,
            )
          );
        }),
        (this.options = function (e, t = {}) {
          return ((e = gs(e)), b(e), o({}, t));
        }),
        (this.pause = function (e, t = {}) {
          return o({ delay: gs(e) }, t);
        }),
        (this.type = function (e, t = {}) {
          e = gs(e);
          let i = t["instant"];
          var s = p(t),
            n = ls(e, k.html).map((e) => ({
              func: () => w(e),
              char: e,
              delay: i || /<(.+)>(.*?)<\/(.+)>/.test(e.outerHTML) ? 0 : c(),
              typeable: e.nodeType === Node.TEXT_NODE,
            })),
            n = [
              s[0],
              { func: async () => k.beforeString(e, this) },
              ...n,
              { func: async () => k.afterString(e, this) },
              s[1],
            ];
          return o(n, t);
        }),
        (this.is = function (e) {
          return M[e];
        }),
        (this.destroy = function (e = !0) {
          ((T = (T.forEach(clearTimeout), [])),
            gs(e) && L && i(L),
            (M.destroyed = !0));
        }),
        (this.freeze = function () {
          M.frozen = !0;
        }),
        (this.unfreeze = () => {}),
        (this.reset = function (e) {
          for (var t in (this.is("destroyed") || this.destroy(),
          e ? (I.wipe(), e(this)) : I.reset(),
          (C = 0),
          M))
            M[t] = !1;
          return ((x[s() ? "value" : "innerHTML"] = ""), this);
        }),
        (this.go = function () {
          var i, s;
          return (
            M.started ||
              (r(),
              k.waitUntilVisible
                ? ((i = x),
                  (s = y.bind(this)),
                  new IntersectionObserver(
                    (e, t) => {
                      e.forEach((e) => {
                        e.isIntersecting && (s(), t.unobserve(i));
                      });
                    },
                    { threshold: 1 },
                  ).observe(i))
                : y()),
            this
          );
        }),
        (this.flush = function (e = () => {}) {
          return (r(), y(!1).then(e), this);
        }),
        (this.getQueue = () => I),
        (this.getOptions = () => k),
        (this.updateOptions = (e) => b(e)),
        (this.getElement = () => x),
        "string" == typeof (e = e) ? ys(e) : e),
      T = [],
      C = 0,
      D = null,
      M = ws({}, rs),
      k =
        ((t.cursor =
          "object" == typeof (e = t.cursor ?? j.cursor)
            ? ((a = {}),
              ({ frames: m, options: g } = j.cursor.animation),
              (a.animation = e.animation || {}),
              (a.animation.frames = e.animation?.frames || m),
              (a.animation.options = ws(g, e.animation?.options || {})),
              (a.autoPause = e.autoPause ?? j.cursor.autoPause),
              (a.autoPauseDelay = e.autoPauseDelay || j.cursor.autoPauseDelay),
              a)
            : !0 === e
              ? j.cursor
              : e),
        ws(j, t)),
      E =
        ((k = ws(k, {
          html: !s() && k.html,
          nextStringDelay: us(k.nextStringDelay),
          loopDelay: us(k.loopDelay),
        })),
        Math.random().toString().substring(2, 9)),
      I = Ji([{ delay: k.startDelay }]),
      O = ((x.dataset.typeitId = E), cs(as), !!k.cursor && !s()),
      L = (() => {
        var e;
        if (!s())
          return (
            ((e = ds("span")).className = P),
            O
              ? (e.innerHTML = is(k.cursorChar).innerHTML)
              : (e.style.visibility = "hidden"),
            e
          );
      })();
    ((k.strings =
      ((m = Zi(k.strings)),
      (g = x.innerHTML)
        ? ((x.innerHTML = ""),
          k.startDelete
            ? ((x.innerHTML = g),
              ts(x),
              n(_s({ func: S, delay: c(1), deletable: !0 }, u().length)),
              m)
            : g
                .replace(/<!--(.+?)-->/g, "")
                .trim()
                .split(/<br(?:\s*?)(?:\/)?>/)
                .concat(m))
        : m)),
      k.strings.length && f());
  }
  var S =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
    Es = { exports: {} };
  function ca(e) {
    throw new Error(
      'Could not dynamically require "' +
        e +
        '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
    );
  }
  var Is,
    Os = { exports: {} };
  function Ls() {
    var da;
    return (
      Is ||
        ((Is = 1),
        ((da = Os).exports = (function () {
          var z, A;
          function u() {
            return z.apply(null, arguments);
          }
          function N(e) {
            z = e;
          }
          function a(e) {
            return (
              e instanceof Array ||
              Object.prototype.toString.call(e) === "[object Array]"
            );
          }
          function V(e) {
            return (
              e != null &&
              Object.prototype.toString.call(e) === "[object Object]"
            );
          }
          function l(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          function G(e) {
            if (Object.getOwnPropertyNames)
              return Object.getOwnPropertyNames(e).length === 0;
            else {
              var t;
              for (t in e) if (l(e, t)) return false;
              return true;
            }
          }
          function o(e) {
            return e === void 0;
          }
          function d(e) {
            return (
              typeof e === "number" ||
              Object.prototype.toString.call(e) === "[object Number]"
            );
          }
          function Q(e) {
            return (
              e instanceof Date ||
              Object.prototype.toString.call(e) === "[object Date]"
            );
          }
          function F(e, t) {
            var i = [],
              s,
              n = e.length;
            for (s = 0; s < n; ++s) i.push(t(e[s], s));
            return i;
          }
          function R(e, t) {
            for (var i in t) if (l(t, i)) e[i] = t[i];
            if (l(t, "toString")) e.toString = t.toString;
            if (l(t, "valueOf")) e.valueOf = t.valueOf;
            return e;
          }
          function c(e, t, i, s) {
            return Zi(e, t, i, s, true).utc();
          }
          function H() {
            return {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: false,
              invalidEra: null,
              invalidMonth: null,
              invalidFormat: false,
              userInvalidated: false,
              iso: false,
              parsedDateParts: [],
              era: null,
              meridiem: null,
              rfc2822: false,
              weekdayMismatch: false,
            };
          }
          function h(e) {
            if (e._pf == null) e._pf = H();
            return e._pf;
          }
          if (Array.prototype.some) A = Array.prototype.some;
          else
            A = function (e) {
              var t = Object(this),
                i = t.length >>> 0,
                s;
              for (s = 0; s < i; s++)
                if (s in t && e.call(this, t[s], s, t)) return true;
              return false;
            };
          function B(e) {
            if (e._isValid == null) {
              var t = h(e),
                i = A.call(t.parsedDateParts, function (e) {
                  return e != null;
                }),
                s =
                  !isNaN(e._d.getTime()) &&
                  t.overflow < 0 &&
                  !t.empty &&
                  !t.invalidEra &&
                  !t.invalidMonth &&
                  !t.invalidWeekday &&
                  !t.weekdayMismatch &&
                  !t.nullInput &&
                  !t.invalidFormat &&
                  !t.userInvalidated &&
                  (!t.meridiem || (t.meridiem && i));
              if (e._strict)
                s =
                  s &&
                  t.charsLeftOver === 0 &&
                  t.unusedTokens.length === 0 &&
                  t.bigHour === undefined;
              if (Object.isFrozen == null || !Object.isFrozen(e))
                e._isValid = s;
              else return s;
            }
            return e._isValid;
          }
          function W(e) {
            var t = c(NaN);
            if (e != null) R(h(t), e);
            else h(t).userInvalidated = true;
            return t;
          }
          var U = (u.momentProperties = []),
            $ = false;
          function q(e, t) {
            var i,
              s,
              n,
              r = U.length;
            if (!o(t._isAMomentObject)) e._isAMomentObject = t._isAMomentObject;
            if (!o(t._i)) e._i = t._i;
            if (!o(t._f)) e._f = t._f;
            if (!o(t._l)) e._l = t._l;
            if (!o(t._strict)) e._strict = t._strict;
            if (!o(t._tzm)) e._tzm = t._tzm;
            if (!o(t._isUTC)) e._isUTC = t._isUTC;
            if (!o(t._offset)) e._offset = t._offset;
            if (!o(t._pf)) e._pf = h(t);
            if (!o(t._locale)) e._locale = t._locale;
            if (r > 0)
              for (i = 0; i < r; i++) {
                s = U[i];
                n = t[s];
                if (!o(n)) e[s] = n;
              }
            return e;
          }
          function X(e) {
            q(this, e);
            this._d = new Date(e._d != null ? e._d.getTime() : NaN);
            if (!this.isValid()) this._d = new Date(NaN);
            if ($ === false) {
              $ = true;
              u.updateOffset(this);
              $ = false;
            }
          }
          function p(e) {
            return e instanceof X || (e != null && e._isAMomentObject != null);
          }
          function Z(e) {
            if (
              u.suppressDeprecationWarnings === false &&
              typeof console !== "undefined" &&
              console.warn
            )
              console.warn("Deprecation warning: " + e);
          }
          function e(r, a) {
            var o = true;
            return R(function () {
              if (u.deprecationHandler != null) u.deprecationHandler(null, r);
              if (o) {
                var e = [],
                  t,
                  i,
                  s,
                  n = arguments.length;
                for (i = 0; i < n; i++) {
                  t = "";
                  if (typeof arguments[i] === "object") {
                    t += "\n[" + i + "] ";
                    for (s in arguments[0])
                      if (l(arguments[0], s))
                        t += s + ": " + arguments[0][s] + ", ";
                    t = t.slice(0, -2);
                  } else t = arguments[i];
                  e.push(t);
                }
                Z(
                  r +
                    "\nArguments: " +
                    Array.prototype.slice.call(e).join("") +
                    "\n" +
                    new Error().stack,
                );
                o = false;
              }
              return a.apply(this, arguments);
            }, a);
          }
          var J = {},
            K;
          function ee(e, t) {
            if (u.deprecationHandler != null) u.deprecationHandler(e, t);
            if (!J[e]) {
              Z(t);
              J[e] = true;
            }
          }
          function m(e) {
            return (
              (typeof Function !== "undefined" && e instanceof Function) ||
              Object.prototype.toString.call(e) === "[object Function]"
            );
          }
          function te(e) {
            var t, i;
            for (i in e)
              if (l(e, i)) {
                t = e[i];
                if (m(t)) this[i] = t;
                else this["_" + i] = t;
              }
            this._config = e;
            this._dayOfMonthOrdinalParseLenient = new RegExp(
              (this._dayOfMonthOrdinalParse.source ||
                this._ordinalParse.source) +
                "|" +
                /\d{1,2}/.source,
            );
          }
          function ie(e, t) {
            var i = R({}, e),
              s;
            for (s in t)
              if (l(t, s))
                if (V(e[s]) && V(t[s])) {
                  i[s] = {};
                  R(i[s], e[s]);
                  R(i[s], t[s]);
                } else if (t[s] != null) i[s] = t[s];
                else delete i[s];
            for (s in e) if (l(e, s) && !l(t, s) && V(e[s])) i[s] = R({}, i[s]);
            return i;
          }
          function se(e) {
            if (e != null) this.set(e);
          }
          if (
            ((u.suppressDeprecationWarnings = false),
            (u.deprecationHandler = null),
            Object.keys)
          )
            K = Object.keys;
          else
            K = function (e) {
              var t,
                i = [];
              for (t in e) if (l(e, t)) i.push(t);
              return i;
            };
          var ne = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L",
          };
          function re(e, t, i) {
            var s = this._calendar[e] || this._calendar["sameElse"];
            return m(s) ? s.call(t, i) : s;
          }
          function r(e, t, i) {
            var s = "" + Math.abs(e),
              n = t - s.length,
              r = e >= 0;
            return (
              (r ? (i ? "+" : "") : "-") +
              Math.pow(10, Math.max(0, n)).toString().substr(1) +
              s
            );
          }
          var ae =
              /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            oe = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            le = {},
            de = {};
          function s(e, t, i, s) {
            var n = s;
            if (typeof s === "string")
              n = function () {
                return this[s]();
              };
            if (e) de[e] = n;
            if (t)
              de[t[0]] = function () {
                return r(n.apply(this, arguments), t[1], t[2]);
              };
            if (i)
              de[i] = function () {
                return this.localeData().ordinal(n.apply(this, arguments), e);
              };
          }
          function ce(e) {
            if (e.match(/\[[\s\S]/)) return e.replace(/^\[|\]$/g, "");
            return e.replace(/\\/g, "");
          }
          function ue(s) {
            var n = s.match(ae),
              e,
              r;
            for (e = 0, r = n.length; e < r; e++)
              if (de[n[e]]) n[e] = de[n[e]];
              else n[e] = ce(n[e]);
            return function (e) {
              var t = "",
                i;
              for (i = 0; i < r; i++) t += m(n[i]) ? n[i].call(e, s) : n[i];
              return t;
            };
          }
          function he(e, t) {
            if (!e.isValid()) return e.localeData().invalidDate();
            t = pe(t, e.localeData());
            le[t] = le[t] || ue(t);
            return le[t](e);
          }
          function pe(e, t) {
            var i = 5;
            function s(e) {
              return t.longDateFormat(e) || e;
            }
            oe.lastIndex = 0;
            while (i >= 0 && oe.test(e)) {
              e = e.replace(oe, s);
              oe.lastIndex = 0;
              i -= 1;
            }
            return e;
          }
          var me = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A",
          };
          function ge(e) {
            var t = this._longDateFormat[e],
              i = this._longDateFormat[e.toUpperCase()];
            if (t || !i) return t;
            this._longDateFormat[e] = i
              .match(ae)
              .map(function (e) {
                if (e === "MMMM" || e === "MM" || e === "DD" || e === "dddd")
                  return e.slice(1);
                return e;
              })
              .join("");
            return this._longDateFormat[e];
          }
          var fe = "Invalid date";
          function ye() {
            return this._invalidDate;
          }
          var ve = "%d",
            we = /\d{1,2}/;
          function be(e) {
            return this._ordinal.replace("%d", e);
          }
          var _e = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            w: "a week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years",
          };
          function Se(e, t, i, s) {
            var n = this._relativeTime[i];
            return m(n) ? n(e, t, i, s) : n.replace(/%d/i, e);
          }
          function xe(e, t) {
            var i = this._relativeTime[e > 0 ? "future" : "past"];
            return m(i) ? i(t) : i.replace(/%s/i, t);
          }
          var Te = {};
          function t(e, t) {
            var i = e.toLowerCase();
            Te[i] = Te[i + "s"] = Te[t] = e;
          }
          function g(e) {
            return typeof e === "string"
              ? Te[e] || Te[e.toLowerCase()]
              : undefined;
          }
          function Ce(e) {
            var t = {},
              i,
              s;
            for (s in e)
              if (l(e, s)) {
                i = g(s);
                if (i) t[i] = e[s];
              }
            return t;
          }
          var De = {};
          function i(e, t) {
            De[e] = t;
          }
          function Me(e) {
            var t = [],
              i;
            for (i in e) if (l(e, i)) t.push({ unit: i, priority: De[i] });
            t.sort(function (e, t) {
              return e.priority - t.priority;
            });
            return t;
          }
          function ke(e) {
            return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
          }
          function f(e) {
            if (e < 0) return Math.ceil(e) || 0;
            else return Math.floor(e);
          }
          function y(e) {
            var t = +e,
              i = 0;
            if (t !== 0 && isFinite(t)) i = f(t);
            return i;
          }
          function Ee(t, i) {
            return function (e) {
              if (e != null) {
                Oe(this, t, e);
                u.updateOffset(this, i);
                return this;
              } else return Ie(this, t);
            };
          }
          function Ie(e, t) {
            return e.isValid()
              ? e._d["get" + (e._isUTC ? "UTC" : "") + t]()
              : NaN;
          }
          function Oe(e, t, i) {
            if (e.isValid() && !isNaN(i))
              if (
                t === "FullYear" &&
                ke(e.year()) &&
                e.month() === 1 &&
                e.date() === 29
              ) {
                i = y(i);
                e._d["set" + (e._isUTC ? "UTC" : "") + t](
                  i,
                  e.month(),
                  rt(i, e.month()),
                );
              } else e._d["set" + (e._isUTC ? "UTC" : "") + t](i);
          }
          function Le(e) {
            e = g(e);
            if (m(this[e])) return this[e]();
            return this;
          }
          function Pe(e, t) {
            if (typeof e === "object") {
              e = Ce(e);
              var i = Me(e),
                s,
                n = i.length;
              for (s = 0; s < n; s++) this[i[s].unit](e[i[s].unit]);
            } else {
              e = g(e);
              if (m(this[e])) return this[e](t);
            }
            return this;
          }
          var je = /\d/,
            n = /\d\d/,
            Ye = /\d{3}/,
            ze = /\d{4}/,
            Ae = /[+-]?\d{6}/,
            v = /\d\d?/,
            Ne = /\d\d\d\d?/,
            Ve = /\d\d\d\d\d\d?/,
            Ge = /\d{1,3}/,
            Qe = /\d{1,4}/,
            Fe = /[+-]?\d{1,6}/,
            Re = /\d+/,
            He = /[+-]?\d+/,
            Be = /Z|[+-]\d\d:?\d\d/gi,
            We = /Z|[+-]\d\d(?::?\d\d)?/gi,
            Ue = /[+-]?\d+(\.\d{1,3})?/,
            $e =
              /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            qe;
          function w(e, i, s) {
            qe[e] = m(i)
              ? i
              : function (e, t) {
                  return e && s ? s : i;
                };
          }
          function Xe(e, t) {
            if (!l(qe, e)) return new RegExp(Ze(e));
            return qe[e](t._strict, t._locale);
          }
          function Ze(e) {
            return b(
              e
                .replace("\\", "")
                .replace(
                  /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                  function (e, t, i, s, n) {
                    return t || i || s || n;
                  },
                ),
            );
          }
          function b(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          }
          var qe = {},
            Je = {};
          function _(e, i) {
            var t,
              s = i,
              n;
            if (typeof e === "string") e = [e];
            if (d(i))
              s = function (e, t) {
                t[i] = y(e);
              };
            n = e.length;
            for (t = 0; t < n; t++) Je[e[t]] = s;
          }
          function Ke(e, n) {
            _(e, function (e, t, i, s) {
              i._w = i._w || {};
              n(e, i._w, i, s);
            });
          }
          function et(e, t, i) {
            if (t != null && l(Je, e)) Je[e](t, i._a, i, e);
          }
          var S = 0,
            x = 1,
            T = 2,
            C = 3,
            D = 4,
            M = 5,
            tt = 6,
            it = 7,
            st = 8,
            k;
          function nt(e, t) {
            return ((e % t) + t) % t;
          }
          if (Array.prototype.indexOf) k = Array.prototype.indexOf;
          else
            k = function (e) {
              var t;
              for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
              return -1;
            };
          function rt(e, t) {
            if (isNaN(e) || isNaN(t)) return NaN;
            var i = nt(t, 12);
            e += (t - i) / 12;
            return i === 1 ? (ke(e) ? 29 : 28) : 31 - ((i % 7) % 2);
          }
          (s("M", ["MM", 2], "Mo", function () {
            return this.month() + 1;
          }),
            s("MMM", 0, 0, function (e) {
              return this.localeData().monthsShort(this, e);
            }),
            s("MMMM", 0, 0, function (e) {
              return this.localeData().months(this, e);
            }),
            t("month", "M"),
            i("month", 8),
            w("M", v),
            w("MM", v, n),
            w("MMM", function (e, t) {
              return t.monthsShortRegex(e);
            }),
            w("MMMM", function (e, t) {
              return t.monthsRegex(e);
            }),
            _(["M", "MM"], function (e, t) {
              t[x] = y(e) - 1;
            }),
            _(["MMM", "MMMM"], function (e, t, i, s) {
              var n = i._locale.monthsParse(e, s, i._strict);
              if (n != null) t[x] = n;
              else h(i).invalidMonth = e;
            }));
          var at =
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            ot = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            lt = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            dt = $e,
            ct = $e;
          function ut(e, t) {
            if (!e)
              return a(this._months)
                ? this._months
                : this._months["standalone"];
            return a(this._months)
              ? this._months[e.month()]
              : this._months[
                  (this._months.isFormat || lt).test(t)
                    ? "format"
                    : "standalone"
                ][e.month()];
          }
          function ht(e, t) {
            if (!e)
              return a(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort["standalone"];
            return a(this._monthsShort)
              ? this._monthsShort[e.month()]
              : this._monthsShort[lt.test(t) ? "format" : "standalone"][
                  e.month()
                ];
          }
          function pt(e, t, i) {
            var s,
              n,
              r,
              a = e.toLocaleLowerCase();
            if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
              for (s = 0; s < 12; ++s) {
                r = c([2e3, s]);
                this._shortMonthsParse[s] = this.monthsShort(
                  r,
                  "",
                ).toLocaleLowerCase();
                this._longMonthsParse[s] = this.months(
                  r,
                  "",
                ).toLocaleLowerCase();
              }
            }
            if (i)
              if (t === "MMM") {
                n = k.call(this._shortMonthsParse, a);
                return n !== -1 ? n : null;
              } else {
                n = k.call(this._longMonthsParse, a);
                return n !== -1 ? n : null;
              }
            else if (t === "MMM") {
              n = k.call(this._shortMonthsParse, a);
              if (n !== -1) return n;
              n = k.call(this._longMonthsParse, a);
              return n !== -1 ? n : null;
            } else {
              n = k.call(this._longMonthsParse, a);
              if (n !== -1) return n;
              n = k.call(this._shortMonthsParse, a);
              return n !== -1 ? n : null;
            }
          }
          function mt(e, t, i) {
            var s, n, r;
            if (this._monthsParseExact) return pt.call(this, e, t, i);
            if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
            }
            for (s = 0; s < 12; s++) {
              n = c([2e3, s]);
              if (i && !this._longMonthsParse[s]) {
                this._longMonthsParse[s] = new RegExp(
                  "^" + this.months(n, "").replace(".", "") + "$",
                  "i",
                );
                this._shortMonthsParse[s] = new RegExp(
                  "^" + this.monthsShort(n, "").replace(".", "") + "$",
                  "i",
                );
              }
              if (!i && !this._monthsParse[s]) {
                r = "^" + this.months(n, "") + "|^" + this.monthsShort(n, "");
                this._monthsParse[s] = new RegExp(r.replace(".", ""), "i");
              }
              if (i && t === "MMMM" && this._longMonthsParse[s].test(e))
                return s;
              else if (i && t === "MMM" && this._shortMonthsParse[s].test(e))
                return s;
              else if (!i && this._monthsParse[s].test(e)) return s;
            }
          }
          function gt(e, t) {
            var i;
            if (!e.isValid()) return e;
            if (typeof t === "string")
              if (/^\d+$/.test(t)) t = y(t);
              else {
                t = e.localeData().monthsParse(t);
                if (!d(t)) return e;
              }
            i = Math.min(e.date(), rt(e.year(), t));
            e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, i);
            return e;
          }
          function ft(e) {
            if (e != null) {
              gt(this, e);
              u.updateOffset(this, true);
              return this;
            } else return Ie(this, "Month");
          }
          function yt() {
            return rt(this.year(), this.month());
          }
          function vt(e) {
            if (this._monthsParseExact) {
              if (!l(this, "_monthsRegex")) bt.call(this);
              if (e) return this._monthsShortStrictRegex;
              else return this._monthsShortRegex;
            } else {
              if (!l(this, "_monthsShortRegex")) this._monthsShortRegex = dt;
              return this._monthsShortStrictRegex && e
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
            }
          }
          function wt(e) {
            if (this._monthsParseExact) {
              if (!l(this, "_monthsRegex")) bt.call(this);
              if (e) return this._monthsStrictRegex;
              else return this._monthsRegex;
            } else {
              if (!l(this, "_monthsRegex")) this._monthsRegex = ct;
              return this._monthsStrictRegex && e
                ? this._monthsStrictRegex
                : this._monthsRegex;
            }
          }
          function bt() {
            function e(e, t) {
              return t.length - e.length;
            }
            var t = [],
              i = [],
              s = [],
              n,
              r;
            for (n = 0; n < 12; n++) {
              r = c([2e3, n]);
              t.push(this.monthsShort(r, ""));
              i.push(this.months(r, ""));
              s.push(this.months(r, ""));
              s.push(this.monthsShort(r, ""));
            }
            t.sort(e);
            i.sort(e);
            s.sort(e);
            for (n = 0; n < 12; n++) {
              t[n] = b(t[n]);
              i[n] = b(i[n]);
            }
            for (n = 0; n < 24; n++) s[n] = b(s[n]);
            this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i");
            this._monthsShortRegex = this._monthsRegex;
            this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i");
            this._monthsShortStrictRegex = new RegExp(
              "^(" + t.join("|") + ")",
              "i",
            );
          }
          function _t(e) {
            return ke(e) ? 366 : 365;
          }
          (s("Y", 0, 0, function () {
            var e = this.year();
            return e <= 9999 ? r(e, 4) : "+" + e;
          }),
            s(0, ["YY", 2], 0, function () {
              return this.year() % 100;
            }),
            s(0, ["YYYY", 4], 0, "year"),
            s(0, ["YYYYY", 5], 0, "year"),
            s(0, ["YYYYYY", 6, true], 0, "year"),
            t("year", "y"),
            i("year", 1),
            w("Y", He),
            w("YY", v, n),
            w("YYYY", Qe, ze),
            w("YYYYY", Fe, Ae),
            w("YYYYYY", Fe, Ae),
            _(["YYYYY", "YYYYYY"], S),
            _("YYYY", function (e, t) {
              t[S] = e.length === 2 ? u.parseTwoDigitYear(e) : y(e);
            }),
            _("YY", function (e, t) {
              t[S] = u.parseTwoDigitYear(e);
            }),
            _("Y", function (e, t) {
              t[S] = parseInt(e, 10);
            }),
            (u.parseTwoDigitYear = function (e) {
              return y(e) + (y(e) > 68 ? 1900 : 2e3);
            }));
          var St = Ee("FullYear", true);
          function xt() {
            return ke(this.year());
          }
          function Tt(e, t, i, s, n, r, a) {
            var o;
            if (e < 100 && e >= 0) {
              o = new Date(e + 400, t, i, s, n, r, a);
              if (isFinite(o.getFullYear())) o.setFullYear(e);
            } else o = new Date(e, t, i, s, n, r, a);
            return o;
          }
          function Ct(e) {
            var t, i;
            if (e < 100 && e >= 0) {
              i = Array.prototype.slice.call(arguments);
              i[0] = e + 400;
              t = new Date(Date.UTC.apply(null, i));
              if (isFinite(t.getUTCFullYear())) t.setUTCFullYear(e);
            } else t = new Date(Date.UTC.apply(null, arguments));
            return t;
          }
          function Dt(e, t, i) {
            var s = 7 + t - i,
              n = (7 + Ct(e, 0, s).getUTCDay() - t) % 7;
            return -n + s - 1;
          }
          function Mt(e, t, i, s, n) {
            var r = (7 + i - s) % 7,
              a = Dt(e, s, n),
              o = 1 + 7 * (t - 1) + r + a,
              l,
              d;
            if (o <= 0) {
              l = e - 1;
              d = _t(l) + o;
            } else if (o > _t(e)) {
              l = e + 1;
              d = o - _t(e);
            } else {
              l = e;
              d = o;
            }
            return { year: l, dayOfYear: d };
          }
          function kt(e, t, i) {
            var s = Dt(e.year(), t, i),
              n = Math.floor((e.dayOfYear() - s - 1) / 7) + 1,
              r,
              a;
            if (n < 1) {
              a = e.year() - 1;
              r = n + E(a, t, i);
            } else if (n > E(e.year(), t, i)) {
              r = n - E(e.year(), t, i);
              a = e.year() + 1;
            } else {
              a = e.year();
              r = n;
            }
            return { week: r, year: a };
          }
          function E(e, t, i) {
            var s = Dt(e, t, i),
              n = Dt(e + 1, t, i);
            return (_t(e) - s + n) / 7;
          }
          function Et(e) {
            return kt(e, this._week.dow, this._week.doy).week;
          }
          (s("w", ["ww", 2], "wo", "week"),
            s("W", ["WW", 2], "Wo", "isoWeek"),
            t("week", "w"),
            t("isoWeek", "W"),
            i("week", 5),
            i("isoWeek", 5),
            w("w", v),
            w("ww", v, n),
            w("W", v),
            w("WW", v, n),
            Ke(["w", "ww", "W", "WW"], function (e, t, i, s) {
              t[s.substr(0, 1)] = y(e);
            }));
          var It = { dow: 0, doy: 6 };
          function Ot() {
            return this._week.dow;
          }
          function Lt() {
            return this._week.doy;
          }
          function Pt(e) {
            var t = this.localeData().week(this);
            return e == null ? t : this.add((e - t) * 7, "d");
          }
          function jt(e) {
            var t = kt(this, 1, 4).week;
            return e == null ? t : this.add((e - t) * 7, "d");
          }
          function Yt(e, t) {
            if (typeof e !== "string") return e;
            if (!isNaN(e)) return parseInt(e, 10);
            e = t.weekdaysParse(e);
            if (typeof e === "number") return e;
            return null;
          }
          function zt(e, t) {
            if (typeof e === "string") return t.weekdaysParse(e) % 7 || 7;
            return isNaN(e) ? null : e;
          }
          function At(e, t) {
            return e.slice(t, 7).concat(e.slice(0, t));
          }
          (s("d", 0, "do", "day"),
            s("dd", 0, 0, function (e) {
              return this.localeData().weekdaysMin(this, e);
            }),
            s("ddd", 0, 0, function (e) {
              return this.localeData().weekdaysShort(this, e);
            }),
            s("dddd", 0, 0, function (e) {
              return this.localeData().weekdays(this, e);
            }),
            s("e", 0, 0, "weekday"),
            s("E", 0, 0, "isoWeekday"),
            t("day", "d"),
            t("weekday", "e"),
            t("isoWeekday", "E"),
            i("day", 11),
            i("weekday", 11),
            i("isoWeekday", 11),
            w("d", v),
            w("e", v),
            w("E", v),
            w("dd", function (e, t) {
              return t.weekdaysMinRegex(e);
            }),
            w("ddd", function (e, t) {
              return t.weekdaysShortRegex(e);
            }),
            w("dddd", function (e, t) {
              return t.weekdaysRegex(e);
            }),
            Ke(["dd", "ddd", "dddd"], function (e, t, i, s) {
              var n = i._locale.weekdaysParse(e, s, i._strict);
              if (n != null) t.d = n;
              else h(i).invalidWeekday = e;
            }),
            Ke(["d", "e", "E"], function (e, t, i, s) {
              t[s] = y(e);
            }));
          var Nt =
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            Vt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            Gt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            Qt = $e,
            Ft = $e,
            Rt = $e;
          function Ht(e, t) {
            var i = a(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                  e && e !== true && this._weekdays.isFormat.test(t)
                    ? "format"
                    : "standalone"
                ];
            return e === true ? At(i, this._week.dow) : e ? i[e.day()] : i;
          }
          function Bt(e) {
            return e === true
              ? At(this._weekdaysShort, this._week.dow)
              : e
                ? this._weekdaysShort[e.day()]
                : this._weekdaysShort;
          }
          function Wt(e) {
            return e === true
              ? At(this._weekdaysMin, this._week.dow)
              : e
                ? this._weekdaysMin[e.day()]
                : this._weekdaysMin;
          }
          function Ut(e, t, i) {
            var s,
              n,
              r,
              a = e.toLocaleLowerCase();
            if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._minWeekdaysParse = [];
              for (s = 0; s < 7; ++s) {
                r = c([2e3, 1]).day(s);
                this._minWeekdaysParse[s] = this.weekdaysMin(
                  r,
                  "",
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[s] = this.weekdaysShort(
                  r,
                  "",
                ).toLocaleLowerCase();
                this._weekdaysParse[s] = this.weekdays(
                  r,
                  "",
                ).toLocaleLowerCase();
              }
            }
            if (i)
              if (t === "dddd") {
                n = k.call(this._weekdaysParse, a);
                return n !== -1 ? n : null;
              } else if (t === "ddd") {
                n = k.call(this._shortWeekdaysParse, a);
                return n !== -1 ? n : null;
              } else {
                n = k.call(this._minWeekdaysParse, a);
                return n !== -1 ? n : null;
              }
            else if (t === "dddd") {
              n = k.call(this._weekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._shortWeekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._minWeekdaysParse, a);
              return n !== -1 ? n : null;
            } else if (t === "ddd") {
              n = k.call(this._shortWeekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._weekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._minWeekdaysParse, a);
              return n !== -1 ? n : null;
            } else {
              n = k.call(this._minWeekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._weekdaysParse, a);
              if (n !== -1) return n;
              n = k.call(this._shortWeekdaysParse, a);
              return n !== -1 ? n : null;
            }
          }
          function $t(e, t, i) {
            var s, n, r;
            if (this._weekdaysParseExact) return Ut.call(this, e, t, i);
            if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._minWeekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._fullWeekdaysParse = [];
            }
            for (s = 0; s < 7; s++) {
              n = c([2e3, 1]).day(s);
              if (i && !this._fullWeekdaysParse[s]) {
                this._fullWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdays(n, "").replace(".", "\\.?") + "$",
                  "i",
                );
                this._shortWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$",
                  "i",
                );
                this._minWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$",
                  "i",
                );
              }
              if (!this._weekdaysParse[s]) {
                r =
                  "^" +
                  this.weekdays(n, "") +
                  "|^" +
                  this.weekdaysShort(n, "") +
                  "|^" +
                  this.weekdaysMin(n, "");
                this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i");
              }
              if (i && t === "dddd" && this._fullWeekdaysParse[s].test(e))
                return s;
              else if (i && t === "ddd" && this._shortWeekdaysParse[s].test(e))
                return s;
              else if (i && t === "dd" && this._minWeekdaysParse[s].test(e))
                return s;
              else if (!i && this._weekdaysParse[s].test(e)) return s;
            }
          }
          function qt(e) {
            if (!this.isValid()) return e != null ? this : NaN;
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (e != null) {
              e = Yt(e, this.localeData());
              return this.add(e - t, "d");
            } else return t;
          }
          function Xt(e) {
            if (!this.isValid()) return e != null ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return e == null ? t : this.add(e - t, "d");
          }
          function Zt(e) {
            if (!this.isValid()) return e != null ? this : NaN;
            if (e != null) {
              var t = zt(e, this.localeData());
              return this.day(this.day() % 7 ? t : t - 7);
            } else return this.day() || 7;
          }
          function Jt(e) {
            if (this._weekdaysParseExact) {
              if (!l(this, "_weekdaysRegex")) ti.call(this);
              if (e) return this._weekdaysStrictRegex;
              else return this._weekdaysRegex;
            } else {
              if (!l(this, "_weekdaysRegex")) this._weekdaysRegex = Qt;
              return this._weekdaysStrictRegex && e
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
            }
          }
          function Kt(e) {
            if (this._weekdaysParseExact) {
              if (!l(this, "_weekdaysRegex")) ti.call(this);
              if (e) return this._weekdaysShortStrictRegex;
              else return this._weekdaysShortRegex;
            } else {
              if (!l(this, "_weekdaysShortRegex"))
                this._weekdaysShortRegex = Ft;
              return this._weekdaysShortStrictRegex && e
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
            }
          }
          function ei(e) {
            if (this._weekdaysParseExact) {
              if (!l(this, "_weekdaysRegex")) ti.call(this);
              if (e) return this._weekdaysMinStrictRegex;
              else return this._weekdaysMinRegex;
            } else {
              if (!l(this, "_weekdaysMinRegex")) this._weekdaysMinRegex = Rt;
              return this._weekdaysMinStrictRegex && e
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
            }
          }
          function ti() {
            function e(e, t) {
              return t.length - e.length;
            }
            var t = [],
              i = [],
              s = [],
              n = [],
              r,
              a,
              o,
              l,
              d;
            for (r = 0; r < 7; r++) {
              a = c([2e3, 1]).day(r);
              o = b(this.weekdaysMin(a, ""));
              l = b(this.weekdaysShort(a, ""));
              d = b(this.weekdays(a, ""));
              t.push(o);
              i.push(l);
              s.push(d);
              n.push(o);
              n.push(l);
              n.push(d);
            }
            t.sort(e);
            i.sort(e);
            s.sort(e);
            n.sort(e);
            this._weekdaysRegex = new RegExp("^(" + n.join("|") + ")", "i");
            this._weekdaysShortRegex = this._weekdaysRegex;
            this._weekdaysMinRegex = this._weekdaysRegex;
            this._weekdaysStrictRegex = new RegExp(
              "^(" + s.join("|") + ")",
              "i",
            );
            this._weekdaysShortStrictRegex = new RegExp(
              "^(" + i.join("|") + ")",
              "i",
            );
            this._weekdaysMinStrictRegex = new RegExp(
              "^(" + t.join("|") + ")",
              "i",
            );
          }
          function ii() {
            return this.hours() % 12 || 12;
          }
          function si() {
            return this.hours() || 24;
          }
          function ni(e, t) {
            s(e, 0, 0, function () {
              return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                t,
              );
            });
          }
          function ri(e, t) {
            return t._meridiemParse;
          }
          function ai(e) {
            return (e + "").toLowerCase().charAt(0) === "p";
          }
          (s("H", ["HH", 2], 0, "hour"),
            s("h", ["hh", 2], 0, ii),
            s("k", ["kk", 2], 0, si),
            s("hmm", 0, 0, function () {
              return "" + ii.apply(this) + r(this.minutes(), 2);
            }),
            s("hmmss", 0, 0, function () {
              return (
                "" +
                ii.apply(this) +
                r(this.minutes(), 2) +
                r(this.seconds(), 2)
              );
            }),
            s("Hmm", 0, 0, function () {
              return "" + this.hours() + r(this.minutes(), 2);
            }),
            s("Hmmss", 0, 0, function () {
              return (
                "" + this.hours() + r(this.minutes(), 2) + r(this.seconds(), 2)
              );
            }),
            ni("a", true),
            ni("A", false),
            t("hour", "h"),
            i("hour", 13),
            w("a", ri),
            w("A", ri),
            w("H", v),
            w("h", v),
            w("k", v),
            w("HH", v, n),
            w("hh", v, n),
            w("kk", v, n),
            w("hmm", Ne),
            w("hmmss", Ve),
            w("Hmm", Ne),
            w("Hmmss", Ve),
            _(["H", "HH"], C),
            _(["k", "kk"], function (e, t, i) {
              var s = y(e);
              t[C] = s === 24 ? 0 : s;
            }),
            _(["a", "A"], function (e, t, i) {
              i._isPm = i._locale.isPM(e);
              i._meridiem = e;
            }),
            _(["h", "hh"], function (e, t, i) {
              t[C] = y(e);
              h(i).bigHour = true;
            }),
            _("hmm", function (e, t, i) {
              var s = e.length - 2;
              t[C] = y(e.substr(0, s));
              t[D] = y(e.substr(s));
              h(i).bigHour = true;
            }),
            _("hmmss", function (e, t, i) {
              var s = e.length - 4,
                n = e.length - 2;
              t[C] = y(e.substr(0, s));
              t[D] = y(e.substr(s, 2));
              t[M] = y(e.substr(n));
              h(i).bigHour = true;
            }),
            _("Hmm", function (e, t, i) {
              var s = e.length - 2;
              t[C] = y(e.substr(0, s));
              t[D] = y(e.substr(s));
            }),
            _("Hmmss", function (e, t, i) {
              var s = e.length - 4,
                n = e.length - 2;
              t[C] = y(e.substr(0, s));
              t[D] = y(e.substr(s, 2));
              t[M] = y(e.substr(n));
            }));
          var oi,
            li = Ee("Hours", true);
          function di(e, t, i) {
            if (e > 11) return i ? "pm" : "PM";
            else return i ? "am" : "AM";
          }
          var ci = {
              calendar: ne,
              longDateFormat: me,
              invalidDate: fe,
              ordinal: ve,
              dayOfMonthOrdinalParse: we,
              relativeTime: _e,
              months: at,
              monthsShort: ot,
              week: It,
              weekdays: Nt,
              weekdaysMin: Gt,
              weekdaysShort: Vt,
              meridiemParse: /[ap]\.?m?\.?/i,
            },
            I = {},
            ui = {},
            hi;
          function pi(e, t) {
            var i,
              s = Math.min(e.length, t.length);
            for (i = 0; i < s; i += 1) if (e[i] !== t[i]) return i;
            return s;
          }
          function mi(e) {
            return e ? e.toLowerCase().replace("_", "-") : e;
          }
          function gi(e) {
            var t = 0,
              i,
              s,
              n,
              r;
            while (t < e.length) {
              r = mi(e[t]).split("-");
              i = r.length;
              s = mi(e[t + 1]);
              s = s ? s.split("-") : null;
              while (i > 0) {
                n = yi(r.slice(0, i).join("-"));
                if (n) return n;
                if (s && s.length >= i && pi(r, s) >= i - 1) break;
                i--;
              }
              t++;
            }
            return hi;
          }
          function fi(e) {
            return e.match("^[^/\\\\]*$") != null;
          }
          function yi(t) {
            var e = null,
              i;
            if (
              I[t] === undefined &&
              "object" !== "undefined" &&
              da &&
              da.exports &&
              fi(t)
            )
              try {
                e = hi._abbr;
                i = ca;
                i("./locale/" + t);
                vi(e);
              } catch (e) {
                I[t] = null;
              }
            return I[t];
          }
          function vi(e, t) {
            var i;
            if (e) {
              if (o(t)) i = _i(e);
              else i = wi(e, t);
              if (i) hi = i;
              else if (typeof console !== "undefined" && console.warn)
                console.warn(
                  "Locale " + e + " not found. Did you forget to load it?",
                );
            }
            return hi._abbr;
          }
          function wi(e, t) {
            if (t !== null) {
              var i,
                s = ci;
              t.abbr = e;
              if (I[e] != null) {
                ee(
                  "defineLocaleOverride",
                  "use moment.updateLocale(localeName, config) to change " +
                    "an existing locale. moment.defineLocale(localeName, " +
                    "config) should only be used for creating a new locale " +
                    "See http://momentjs.com/guides/#/warnings/define-locale/ for more info.",
                );
                s = I[e]._config;
              } else if (t.parentLocale != null)
                if (I[t.parentLocale] != null) s = I[t.parentLocale]._config;
                else {
                  i = yi(t.parentLocale);
                  if (i != null) s = i._config;
                  else {
                    if (!ui[t.parentLocale]) ui[t.parentLocale] = [];
                    ui[t.parentLocale].push({ name: e, config: t });
                    return null;
                  }
                }
              I[e] = new se(ie(s, t));
              if (ui[e])
                ui[e].forEach(function (e) {
                  wi(e.name, e.config);
                });
              vi(e);
              return I[e];
            } else {
              delete I[e];
              return null;
            }
          }
          function bi(e, t) {
            if (t != null) {
              var i,
                s,
                n = ci;
              if (I[e] != null && I[e].parentLocale != null)
                I[e].set(ie(I[e]._config, t));
              else {
                s = yi(e);
                if (s != null) n = s._config;
                t = ie(n, t);
                if (s == null) t.abbr = e;
                i = new se(t);
                i.parentLocale = I[e];
                I[e] = i;
              }
              vi(e);
            } else if (I[e] != null)
              if (I[e].parentLocale != null) {
                I[e] = I[e].parentLocale;
                if (e === vi()) vi(e);
              } else if (I[e] != null) delete I[e];
            return I[e];
          }
          function _i(e) {
            var t;
            if (e && e._locale && e._locale._abbr) e = e._locale._abbr;
            if (!e) return hi;
            if (!a(e)) {
              t = yi(e);
              if (t) return t;
              e = [e];
            }
            return gi(e);
          }
          function Si() {
            return K(I);
          }
          function xi(e) {
            var t,
              i = e._a;
            if (i && h(e).overflow === -2) {
              t =
                i[x] < 0 || i[x] > 11
                  ? x
                  : i[T] < 1 || i[T] > rt(i[S], i[x])
                    ? T
                    : i[C] < 0 ||
                        i[C] > 24 ||
                        (i[C] === 24 &&
                          (i[D] !== 0 || i[M] !== 0 || i[tt] !== 0))
                      ? C
                      : i[D] < 0 || i[D] > 59
                        ? D
                        : i[M] < 0 || i[M] > 59
                          ? M
                          : i[tt] < 0 || i[tt] > 999
                            ? tt
                            : -1;
              if (h(e)._overflowDayOfYear && (t < S || t > T)) t = T;
              if (h(e)._overflowWeeks && t === -1) t = it;
              if (h(e)._overflowWeekday && t === -1) t = st;
              h(e).overflow = t;
            }
            return e;
          }
          var Ti =
              /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Ci =
              /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Di = /Z|[+-]\d\d(?::?\d\d)?/,
            Mi = [
              ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
              ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
              ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
              ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
              ["YYYY-DDD", /\d{4}-\d{3}/],
              ["YYYY-MM", /\d{4}-\d\d/, false],
              ["YYYYYYMMDD", /[+-]\d{10}/],
              ["YYYYMMDD", /\d{8}/],
              ["GGGG[W]WWE", /\d{4}W\d{3}/],
              ["GGGG[W]WW", /\d{4}W\d{2}/, false],
              ["YYYYDDD", /\d{7}/],
              ["YYYYMM", /\d{6}/, false],
              ["YYYY", /\d{4}/, false],
            ],
            ki = [
              ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
              ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
              ["HH:mm:ss", /\d\d:\d\d:\d\d/],
              ["HH:mm", /\d\d:\d\d/],
              ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
              ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
              ["HHmmss", /\d\d\d\d\d\d/],
              ["HHmm", /\d\d\d\d/],
              ["HH", /\d\d/],
            ],
            Ei = /^\/?Date\((-?\d+)/i,
            Ii =
              /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            Oi = {
              UT: 0,
              GMT: 0,
              EDT: -4 * 60,
              EST: -5 * 60,
              CDT: -5 * 60,
              CST: -6 * 60,
              MDT: -6 * 60,
              MST: -7 * 60,
              PDT: -7 * 60,
              PST: -8 * 60,
            };
          function Li(e) {
            var t,
              i,
              s = e._i,
              n = Ti.exec(s) || Ci.exec(s),
              r,
              a,
              o,
              l,
              d = Mi.length,
              c = ki.length;
            if (n) {
              h(e).iso = true;
              for (t = 0, i = d; t < i; t++)
                if (Mi[t][1].exec(n[1])) {
                  a = Mi[t][0];
                  r = Mi[t][2] !== false;
                  break;
                }
              if (a == null) {
                e._isValid = false;
                return;
              }
              if (n[3]) {
                for (t = 0, i = c; t < i; t++)
                  if (ki[t][1].exec(n[3])) {
                    o = (n[2] || " ") + ki[t][0];
                    break;
                  }
                if (o == null) {
                  e._isValid = false;
                  return;
                }
              }
              if (!r && o != null) {
                e._isValid = false;
                return;
              }
              if (n[4])
                if (Di.exec(n[4])) l = "Z";
                else {
                  e._isValid = false;
                  return;
                }
              e._f = a + (o || "") + (l || "");
              Hi(e);
            } else e._isValid = false;
          }
          function Pi(e, t, i, s, n, r) {
            var a = [
              ji(e),
              ot.indexOf(t),
              parseInt(i, 10),
              parseInt(s, 10),
              parseInt(n, 10),
            ];
            if (r) a.push(parseInt(r, 10));
            return a;
          }
          function ji(e) {
            var t = parseInt(e, 10);
            if (t <= 49) return 2e3 + t;
            else if (t <= 999) return 1900 + t;
            return t;
          }
          function Yi(e) {
            return e
              .replace(/\([^()]*\)|[\n\t]/g, " ")
              .replace(/(\s\s+)/g, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
          }
          function zi(e, t, i) {
            if (e) {
              var s = Vt.indexOf(e),
                n = new Date(t[0], t[1], t[2]).getDay();
              if (s !== n) {
                h(i).weekdayMismatch = true;
                i._isValid = false;
                return false;
              }
            }
            return true;
          }
          function Ai(e, t, i) {
            if (e) return Oi[e];
            else if (t) return 0;
            else {
              var s = parseInt(i, 10),
                n = s % 100,
                r = (s - n) / 100;
              return r * 60 + n;
            }
          }
          function Ni(e) {
            var t = Ii.exec(Yi(e._i)),
              i;
            if (t) {
              i = Pi(t[4], t[3], t[2], t[5], t[6], t[7]);
              if (!zi(t[1], i, e)) return;
              e._a = i;
              e._tzm = Ai(t[8], t[9], t[10]);
              e._d = Ct.apply(null, e._a);
              e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm);
              h(e).rfc2822 = true;
            } else e._isValid = false;
          }
          function Vi(e) {
            var t = Ei.exec(e._i);
            if (t !== null) {
              e._d = new Date(+t[1]);
              return;
            }
            Li(e);
            if (e._isValid === false) delete e._isValid;
            else return;
            Ni(e);
            if (e._isValid === false) delete e._isValid;
            else return;
            if (e._strict) e._isValid = false;
            else u.createFromInputFallback(e);
          }
          function Gi(e, t, i) {
            if (e != null) return e;
            if (t != null) return t;
            return i;
          }
          function Qi(e) {
            var t = new Date(u.now());
            if (e._useUTC)
              return [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()];
            return [t.getFullYear(), t.getMonth(), t.getDate()];
          }
          function Fi(e) {
            var t,
              i,
              s = [],
              n,
              r,
              a;
            if (e._d) return;
            n = Qi(e);
            if (e._w && e._a[T] == null && e._a[x] == null) Ri(e);
            if (e._dayOfYear != null) {
              a = Gi(e._a[S], n[S]);
              if (e._dayOfYear > _t(a) || e._dayOfYear === 0)
                h(e)._overflowDayOfYear = true;
              i = Ct(a, 0, e._dayOfYear);
              e._a[x] = i.getUTCMonth();
              e._a[T] = i.getUTCDate();
            }
            for (t = 0; t < 3 && e._a[t] == null; ++t) e._a[t] = s[t] = n[t];
            for (; t < 7; t++)
              e._a[t] = s[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t];
            if (
              e._a[C] === 24 &&
              e._a[D] === 0 &&
              e._a[M] === 0 &&
              e._a[tt] === 0
            ) {
              e._nextDay = true;
              e._a[C] = 0;
            }
            e._d = (e._useUTC ? Ct : Tt).apply(null, s);
            r = e._useUTC ? e._d.getUTCDay() : e._d.getDay();
            if (e._tzm != null)
              e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm);
            if (e._nextDay) e._a[C] = 24;
            if (e._w && typeof e._w.d !== "undefined" && e._w.d !== r)
              h(e).weekdayMismatch = true;
          }
          function Ri(e) {
            var t, i, s, n, r, a, o, l, d;
            t = e._w;
            if (t.GG != null || t.W != null || t.E != null) {
              r = 1;
              a = 4;
              i = Gi(t.GG, e._a[S], kt(O(), 1, 4).year);
              s = Gi(t.W, 1);
              n = Gi(t.E, 1);
              if (n < 1 || n > 7) l = true;
            } else {
              r = e._locale._week.dow;
              a = e._locale._week.doy;
              d = kt(O(), r, a);
              i = Gi(t.gg, e._a[S], d.year);
              s = Gi(t.w, d.week);
              if (t.d != null) {
                n = t.d;
                if (n < 0 || n > 6) l = true;
              } else if (t.e != null) {
                n = t.e + r;
                if (t.e < 0 || t.e > 6) l = true;
              } else n = r;
            }
            if (s < 1 || s > E(i, r, a)) h(e)._overflowWeeks = true;
            else if (l != null) h(e)._overflowWeekday = true;
            else {
              o = Mt(i, s, n, r, a);
              e._a[S] = o.year;
              e._dayOfYear = o.dayOfYear;
            }
          }
          function Hi(e) {
            if (e._f === u.ISO_8601) {
              Li(e);
              return;
            }
            if (e._f === u.RFC_2822) {
              Ni(e);
              return;
            }
            e._a = [];
            h(e).empty = true;
            var t = "" + e._i,
              i,
              s,
              n,
              r,
              a,
              o = t.length,
              l = 0,
              d,
              c;
            n = pe(e._f, e._locale).match(ae) || [];
            c = n.length;
            for (i = 0; i < c; i++) {
              r = n[i];
              s = (t.match(Xe(r, e)) || [])[0];
              if (s) {
                a = t.substr(0, t.indexOf(s));
                if (a.length > 0) h(e).unusedInput.push(a);
                t = t.slice(t.indexOf(s) + s.length);
                l += s.length;
              }
              if (de[r]) {
                if (s) h(e).empty = false;
                else h(e).unusedTokens.push(r);
                et(r, s, e);
              } else if (e._strict && !s) h(e).unusedTokens.push(r);
            }
            h(e).charsLeftOver = o - l;
            if (t.length > 0) h(e).unusedInput.push(t);
            if (e._a[C] <= 12 && h(e).bigHour === true && e._a[C] > 0)
              h(e).bigHour = undefined;
            h(e).parsedDateParts = e._a.slice(0);
            h(e).meridiem = e._meridiem;
            e._a[C] = Bi(e._locale, e._a[C], e._meridiem);
            d = h(e).era;
            if (d !== null) e._a[S] = e._locale.erasConvertYear(d, e._a[S]);
            Fi(e);
            xi(e);
          }
          function Bi(e, t, i) {
            var s;
            if (i == null) return t;
            if (e.meridiemHour != null) return e.meridiemHour(t, i);
            else if (e.isPM != null) {
              s = e.isPM(i);
              if (s && t < 12) t += 12;
              if (!s && t === 12) t = 0;
              return t;
            } else return t;
          }
          function Wi(e) {
            var t,
              i,
              s,
              n,
              r,
              a,
              o = false,
              l = e._f.length;
            if (l === 0) {
              h(e).invalidFormat = true;
              e._d = new Date(NaN);
              return;
            }
            for (n = 0; n < l; n++) {
              r = 0;
              a = false;
              t = q({}, e);
              if (e._useUTC != null) t._useUTC = e._useUTC;
              t._f = e._f[n];
              Hi(t);
              if (B(t)) a = true;
              r += h(t).charsLeftOver;
              r += h(t).unusedTokens.length * 10;
              h(t).score = r;
              if (!o) {
                if (s == null || r < s || a) {
                  s = r;
                  i = t;
                  if (a) o = true;
                }
              } else if (r < s) {
                s = r;
                i = t;
              }
            }
            R(e, i || t);
          }
          function Ui(e) {
            if (e._d) return;
            var t = Ce(e._i),
              i = t.day === undefined ? t.date : t.day;
            e._a = F(
              [t.year, t.month, i, t.hour, t.minute, t.second, t.millisecond],
              function (e) {
                return e && parseInt(e, 10);
              },
            );
            Fi(e);
          }
          function $i(e) {
            var t = new X(xi(qi(e)));
            if (t._nextDay) {
              t.add(1, "d");
              t._nextDay = undefined;
            }
            return t;
          }
          function qi(e) {
            var t = e._i,
              i = e._f;
            e._locale = e._locale || _i(e._l);
            if (t === null || (i === undefined && t === ""))
              return W({ nullInput: true });
            if (typeof t === "string") e._i = t = e._locale.preparse(t);
            if (p(t)) return new X(xi(t));
            else if (Q(t)) e._d = t;
            else if (a(i)) Wi(e);
            else if (i) Hi(e);
            else Xi(e);
            if (!B(e)) e._d = null;
            return e;
          }
          function Xi(e) {
            var t = e._i;
            if (o(t)) e._d = new Date(u.now());
            else if (Q(t)) e._d = new Date(t.valueOf());
            else if (typeof t === "string") Vi(e);
            else if (a(t)) {
              e._a = F(t.slice(0), function (e) {
                return parseInt(e, 10);
              });
              Fi(e);
            } else if (V(t)) Ui(e);
            else if (d(t)) e._d = new Date(t);
            else u.createFromInputFallback(e);
          }
          function Zi(e, t, i, s, n) {
            var r = {};
            if (t === true || t === false) {
              s = t;
              t = undefined;
            }
            if (i === true || i === false) {
              s = i;
              i = undefined;
            }
            if ((V(e) && G(e)) || (a(e) && e.length === 0)) e = undefined;
            r._isAMomentObject = true;
            r._useUTC = r._isUTC = n;
            r._l = i;
            r._i = e;
            r._f = t;
            r._strict = s;
            return $i(r);
          }
          function O(e, t, i, s) {
            return Zi(e, t, i, s, false);
          }
          ((u.createFromInputFallback = e(
            "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " +
              "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " +
              "discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
            function (e) {
              e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
            },
          )),
            (u.ISO_8601 = function () {}),
            (u.RFC_2822 = function () {}));
          var Ji = e(
              "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var e = O.apply(null, arguments);
                if (this.isValid() && e.isValid()) return e < this ? this : e;
                else return W();
              },
            ),
            Ki = e(
              "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var e = O.apply(null, arguments);
                if (this.isValid() && e.isValid()) return e > this ? this : e;
                else return W();
              },
            );
          function es(e, t) {
            var i, s;
            if (t.length === 1 && a(t[0])) t = t[0];
            if (!t.length) return O();
            i = t[0];
            for (s = 1; s < t.length; ++s)
              if (!t[s].isValid() || t[s][e](i)) i = t[s];
            return i;
          }
          function ts() {
            var e = [].slice.call(arguments, 0);
            return es("isBefore", e);
          }
          function is() {
            var e = [].slice.call(arguments, 0);
            return es("isAfter", e);
          }
          var ss = function () {
              return Date.now ? Date.now() : +new Date();
            },
            ns = [
              "year",
              "quarter",
              "month",
              "week",
              "day",
              "hour",
              "minute",
              "second",
              "millisecond",
            ];
          function rs(e) {
            var t,
              i = false,
              s,
              n = ns.length;
            for (t in e)
              if (
                l(e, t) &&
                !(k.call(ns, t) !== -1 && (e[t] == null || !isNaN(e[t])))
              )
                return false;
            for (s = 0; s < n; ++s)
              if (e[ns[s]]) {
                if (i) return false;
                if (parseFloat(e[ns[s]]) !== y(e[ns[s]])) i = true;
              }
            return true;
          }
          function as() {
            return this._isValid;
          }
          function os() {
            return L(NaN);
          }
          function ls(e) {
            var t = Ce(e),
              i = t.year || 0,
              s = t.quarter || 0,
              n = t.month || 0,
              r = t.week || t.isoWeek || 0,
              a = t.day || 0,
              o = t.hour || 0,
              l = t.minute || 0,
              d = t.second || 0,
              c = t.millisecond || 0;
            this._isValid = rs(t);
            this._milliseconds = +c + d * 1e3 + l * 6e4 + o * 1e3 * 60 * 60;
            this._days = +a + r * 7;
            this._months = +n + s * 3 + i * 12;
            this._data = {};
            this._locale = _i();
            this._bubble();
          }
          function ds(e) {
            return e instanceof ls;
          }
          function cs(e) {
            if (e < 0) return Math.round(-1 * e) * -1;
            else return Math.round(e);
          }
          function us(e, t, i) {
            var s = Math.min(e.length, t.length),
              n = Math.abs(e.length - t.length),
              r = 0,
              a;
            for (a = 0; a < s; a++)
              if ((i && e[a] !== t[a]) || (!i && y(e[a]) !== y(t[a]))) r++;
            return r + n;
          }
          function hs(e, i) {
            s(e, 0, 0, function () {
              var e = this.utcOffset(),
                t = "+";
              if (e < 0) {
                e = -e;
                t = "-";
              }
              return t + r(~~(e / 60), 2) + i + r(~~e % 60, 2);
            });
          }
          (hs("Z", ":"),
            hs("ZZ", ""),
            w("Z", We),
            w("ZZ", We),
            _(["Z", "ZZ"], function (e, t, i) {
              i._useUTC = true;
              i._tzm = ms(We, e);
            }));
          var ps = /([\+\-]|\d\d)/gi;
          function ms(e, t) {
            var i = (t || "").match(e),
              s,
              n,
              r;
            if (i === null) return null;
            s = i[i.length - 1] || [];
            n = (s + "").match(ps) || ["-", 0, 0];
            r = +(n[1] * 60) + y(n[2]);
            return r === 0 ? 0 : n[0] === "+" ? r : -r;
          }
          function gs(e, t) {
            var i, s;
            if (t._isUTC) {
              i = t.clone();
              s = (p(e) || Q(e) ? e.valueOf() : O(e).valueOf()) - i.valueOf();
              i._d.setTime(i._d.valueOf() + s);
              u.updateOffset(i, false);
              return i;
            } else return O(e).local();
          }
          function fs(e) {
            return -Math.round(e._d.getTimezoneOffset());
          }
          function ys(e, t, i) {
            var s = this._offset || 0,
              n;
            if (!this.isValid()) return e != null ? this : NaN;
            if (e != null) {
              if (typeof e === "string") {
                e = ms(We, e);
                if (e === null) return this;
              } else if (Math.abs(e) < 16 && !i) e = e * 60;
              if (!this._isUTC && t) n = fs(this);
              this._offset = e;
              this._isUTC = true;
              if (n != null) this.add(n, "m");
              if (s !== e)
                if (!t || this._changeInProgress)
                  js(this, L(e - s, "m"), 1, false);
                else if (!this._changeInProgress) {
                  this._changeInProgress = true;
                  u.updateOffset(this, true);
                  this._changeInProgress = null;
                }
              return this;
            } else return this._isUTC ? s : fs(this);
          }
          function vs(e, t) {
            if (e != null) {
              if (typeof e !== "string") e = -e;
              this.utcOffset(e, t);
              return this;
            } else return -this.utcOffset();
          }
          function ws(e) {
            return this.utcOffset(0, e);
          }
          function bs(e) {
            if (this._isUTC) {
              this.utcOffset(0, e);
              this._isUTC = false;
              if (e) this.subtract(fs(this), "m");
            }
            return this;
          }
          function _s() {
            if (this._tzm != null) this.utcOffset(this._tzm, false, true);
            else if (typeof this._i === "string") {
              var e = ms(Be, this._i);
              if (e != null) this.utcOffset(e);
              else this.utcOffset(0, true);
            }
            return this;
          }
          function Ss(e) {
            if (!this.isValid()) return false;
            e = e ? O(e).utcOffset() : 0;
            return (this.utcOffset() - e) % 60 === 0;
          }
          function xs() {
            return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
            );
          }
          function Ts() {
            if (!o(this._isDSTShifted)) return this._isDSTShifted;
            var e = {},
              t;
            q(e, this);
            e = qi(e);
            if (e._a) {
              t = e._isUTC ? c(e._a) : O(e._a);
              this._isDSTShifted = this.isValid() && us(e._a, t.toArray()) > 0;
            } else this._isDSTShifted = false;
            return this._isDSTShifted;
          }
          function Cs() {
            return this.isValid() ? !this._isUTC : false;
          }
          function Ds() {
            return this.isValid() ? this._isUTC : false;
          }
          function Ms() {
            return this.isValid() ? this._isUTC && this._offset === 0 : false;
          }
          u.updateOffset = function () {};
          var ks = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
            Es =
              /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
          function L(e, t) {
            var i = e,
              s = null,
              n,
              r,
              a;
            if (ds(e)) i = { ms: e._milliseconds, d: e._days, M: e._months };
            else if (d(e) || !isNaN(+e)) {
              i = {};
              if (t) i[t] = +e;
              else i.milliseconds = +e;
            } else if ((s = ks.exec(e))) {
              n = s[1] === "-" ? -1 : 1;
              i = {
                y: 0,
                d: y(s[T]) * n,
                h: y(s[C]) * n,
                m: y(s[D]) * n,
                s: y(s[M]) * n,
                ms: y(cs(s[tt] * 1e3)) * n,
              };
            } else if ((s = Es.exec(e))) {
              n = s[1] === "-" ? -1 : 1;
              i = {
                y: Is(s[2], n),
                M: Is(s[3], n),
                w: Is(s[4], n),
                d: Is(s[5], n),
                h: Is(s[6], n),
                m: Is(s[7], n),
                s: Is(s[8], n),
              };
            } else if (i == null) i = {};
            else if (typeof i === "object" && ("from" in i || "to" in i)) {
              a = Ls(O(i.from), O(i.to));
              i = {};
              i.ms = a.milliseconds;
              i.M = a.months;
            }
            r = new ls(i);
            if (ds(e) && l(e, "_locale")) r._locale = e._locale;
            if (ds(e) && l(e, "_isValid")) r._isValid = e._isValid;
            return r;
          }
          function Is(e, t) {
            var i = e && parseFloat(e.replace(",", "."));
            return (isNaN(i) ? 0 : i) * t;
          }
          function Os(e, t) {
            var i = {};
            i.months = t.month() - e.month() + (t.year() - e.year()) * 12;
            if (e.clone().add(i.months, "M").isAfter(t)) --i.months;
            i.milliseconds = +t - +e.clone().add(i.months, "M");
            return i;
          }
          function Ls(e, t) {
            var i;
            if (!(e.isValid() && t.isValid()))
              return { milliseconds: 0, months: 0 };
            t = gs(t, e);
            if (e.isBefore(t)) i = Os(e, t);
            else {
              i = Os(t, e);
              i.milliseconds = -i.milliseconds;
              i.months = -i.months;
            }
            return i;
          }
          function Ps(n, r) {
            return function (e, t) {
              var i, s;
              if (t !== null && !isNaN(+t)) {
                ee(
                  r,
                  "moment()." +
                    r +
                    "(period, number) is deprecated. Please use moment()." +
                    r +
                    "(number, period). " +
                    "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.",
                );
                s = e;
                e = t;
                t = s;
              }
              i = L(e, t);
              js(this, i, n);
              return this;
            };
          }
          function js(e, t, i, s) {
            var n = t._milliseconds,
              r = cs(t._days),
              a = cs(t._months);
            if (!e.isValid()) return;
            s = s == null ? true : s;
            if (a) gt(e, Ie(e, "Month") + a * i);
            if (r) Oe(e, "Date", Ie(e, "Date") + r * i);
            if (n) e._d.setTime(e._d.valueOf() + n * i);
            if (s) u.updateOffset(e, r || a);
          }
          ((L.fn = ls.prototype), (L.invalid = os));
          var Ys = Ps(1, "add"),
            zs = Ps(-1, "subtract");
          function As(e) {
            return typeof e === "string" || e instanceof String;
          }
          function Ns(e) {
            return (
              p(e) ||
              Q(e) ||
              As(e) ||
              d(e) ||
              Gs(e) ||
              Vs(e) ||
              e === null ||
              e === undefined
            );
          }
          function Vs(e) {
            var t = V(e) && !G(e),
              i = false,
              s = [
                "years",
                "year",
                "y",
                "months",
                "month",
                "M",
                "days",
                "day",
                "d",
                "dates",
                "date",
                "D",
                "hours",
                "hour",
                "h",
                "minutes",
                "minute",
                "m",
                "seconds",
                "second",
                "s",
                "milliseconds",
                "millisecond",
                "ms",
              ],
              n,
              r,
              a = s.length;
            for (n = 0; n < a; n += 1) {
              r = s[n];
              i = i || l(e, r);
            }
            return t && i;
          }
          function Gs(t) {
            var e = a(t),
              i = false;
            if (e)
              i =
                t.filter(function (e) {
                  return !d(e) && As(t);
                }).length === 0;
            return e && i;
          }
          function Qs(e) {
            var t = V(e) && !G(e),
              i = false,
              s = [
                "sameDay",
                "nextDay",
                "lastDay",
                "nextWeek",
                "lastWeek",
                "sameElse",
              ],
              n,
              r;
            for (n = 0; n < s.length; n += 1) {
              r = s[n];
              i = i || l(e, r);
            }
            return t && i;
          }
          function Fs(e, t) {
            var i = e.diff(t, "days", true);
            return i < -6
              ? "sameElse"
              : i < -1
                ? "lastWeek"
                : i < 0
                  ? "lastDay"
                  : i < 1
                    ? "sameDay"
                    : i < 2
                      ? "nextDay"
                      : i < 7
                        ? "nextWeek"
                        : "sameElse";
          }
          function Rs(e, t) {
            if (arguments.length === 1)
              if (!arguments[0]) {
                e = undefined;
                t = undefined;
              } else if (Ns(arguments[0])) {
                e = arguments[0];
                t = undefined;
              } else if (Qs(arguments[0])) {
                t = arguments[0];
                e = undefined;
              }
            var i = e || O(),
              s = gs(i, this).startOf("day"),
              n = u.calendarFormat(this, s) || "sameElse",
              r = t && (m(t[n]) ? t[n].call(this, i) : t[n]);
            return this.format(r || this.localeData().calendar(n, this, O(i)));
          }
          function Hs() {
            return new X(this);
          }
          function Bs(e, t) {
            var i = p(e) ? e : O(e);
            if (!(this.isValid() && i.isValid())) return false;
            t = g(t) || "millisecond";
            if (t === "millisecond") return this.valueOf() > i.valueOf();
            else return i.valueOf() < this.clone().startOf(t).valueOf();
          }
          function Ws(e, t) {
            var i = p(e) ? e : O(e);
            if (!(this.isValid() && i.isValid())) return false;
            t = g(t) || "millisecond";
            if (t === "millisecond") return this.valueOf() < i.valueOf();
            else return this.clone().endOf(t).valueOf() < i.valueOf();
          }
          function Us(e, t, i, s) {
            var n = p(e) ? e : O(e),
              r = p(t) ? t : O(t);
            if (!(this.isValid() && n.isValid() && r.isValid())) return false;
            s = s || "()";
            return (
              (s[0] === "(" ? this.isAfter(n, i) : !this.isBefore(n, i)) &&
              (s[1] === ")" ? this.isBefore(r, i) : !this.isAfter(r, i))
            );
          }
          function $s(e, t) {
            var i = p(e) ? e : O(e),
              s;
            if (!(this.isValid() && i.isValid())) return false;
            t = g(t) || "millisecond";
            if (t === "millisecond") return this.valueOf() === i.valueOf();
            else {
              s = i.valueOf();
              return (
                this.clone().startOf(t).valueOf() <= s &&
                s <= this.clone().endOf(t).valueOf()
              );
            }
          }
          function qs(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t);
          }
          function Xs(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t);
          }
          function Zs(e, t, i) {
            var s, n, r;
            if (!this.isValid()) return NaN;
            s = gs(e, this);
            if (!s.isValid()) return NaN;
            n = (s.utcOffset() - this.utcOffset()) * 6e4;
            t = g(t);
            switch (t) {
              case "year":
                r = Js(this, s) / 12;
                break;
              case "month":
                r = Js(this, s);
                break;
              case "quarter":
                r = Js(this, s) / 3;
                break;
              case "second":
                r = (this - s) / 1e3;
                break;
              case "minute":
                r = (this - s) / 6e4;
                break;
              case "hour":
                r = (this - s) / 36e5;
                break;
              case "day":
                r = (this - s - n) / 864e5;
                break;
              case "week":
                r = (this - s - n) / 6048e5;
                break;
              default:
                r = this - s;
            }
            return i ? r : f(r);
          }
          function Js(e, t) {
            if (e.date() < t.date()) return -Js(t, e);
            var i = (t.year() - e.year()) * 12 + (t.month() - e.month()),
              s = e.clone().add(i, "months"),
              n,
              r;
            if (t - s < 0) {
              n = e.clone().add(i - 1, "months");
              r = (t - s) / (s - n);
            } else {
              n = e.clone().add(i + 1, "months");
              r = (t - s) / (n - s);
            }
            return -(i + r) || 0;
          }
          function Ks() {
            return this.clone()
              .locale("en")
              .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          }
          function en(e) {
            if (!this.isValid()) return null;
            var t = e !== true,
              i = t ? this.clone().utc() : this;
            if (i.year() < 0 || i.year() > 9999)
              return he(
                i,
                t
                  ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                  : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ",
              );
            if (m(Date.prototype.toISOString))
              if (t) return this.toDate().toISOString();
              else
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
                  .toISOString()
                  .replace("Z", he(i, "Z"));
            return he(
              i,
              t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ",
            );
          }
          function tn() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var e = "moment",
              t = "",
              i,
              s,
              n,
              r;
            if (!this.isLocal()) {
              e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
              t = "Z";
            }
            i = "[" + e + '("]';
            s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
            n = "-MM-DD[T]HH:mm:ss.SSS";
            r = t + '[")]';
            return this.format(i + s + n + r);
          }
          function sn(e) {
            if (!e) e = this.isUtc() ? u.defaultFormatUtc : u.defaultFormat;
            var t = he(this, e);
            return this.localeData().postformat(t);
          }
          function nn(e, t) {
            if (this.isValid() && ((p(e) && e.isValid()) || O(e).isValid()))
              return L({ to: this, from: e })
                .locale(this.locale())
                .humanize(!t);
            else return this.localeData().invalidDate();
          }
          function rn(e) {
            return this.from(O(), e);
          }
          function an(e, t) {
            if (this.isValid() && ((p(e) && e.isValid()) || O(e).isValid()))
              return L({ from: this, to: e })
                .locale(this.locale())
                .humanize(!t);
            else return this.localeData().invalidDate();
          }
          function on(e) {
            return this.to(O(), e);
          }
          function ln(e) {
            var t;
            if (e === undefined) return this._locale._abbr;
            else {
              t = _i(e);
              if (t != null) this._locale = t;
              return this;
            }
          }
          ((u.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
            (u.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]"));
          var dn = e(
            "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
            function (e) {
              if (e === undefined) return this.localeData();
              else return this.locale(e);
            },
          );
          function cn() {
            return this._locale;
          }
          var un = 1e3,
            hn = 60 * un,
            pn = 60 * hn,
            mn = (365 * 400 + 97) * 24 * pn;
          function gn(e, t) {
            return ((e % t) + t) % t;
          }
          function fn(e, t, i) {
            if (e < 100 && e >= 0) return new Date(e + 400, t, i) - mn;
            else return new Date(e, t, i).valueOf();
          }
          function yn(e, t, i) {
            if (e < 100 && e >= 0) return Date.UTC(e + 400, t, i) - mn;
            else return Date.UTC(e, t, i);
          }
          function vn(e) {
            var t, i;
            e = g(e);
            if (e === undefined || e === "millisecond" || !this.isValid())
              return this;
            i = this._isUTC ? yn : fn;
            switch (e) {
              case "year":
                t = i(this.year(), 0, 1);
                break;
              case "quarter":
                t = i(this.year(), this.month() - (this.month() % 3), 1);
                break;
              case "month":
                t = i(this.year(), this.month(), 1);
                break;
              case "week":
                t = i(this.year(), this.month(), this.date() - this.weekday());
                break;
              case "isoWeek":
                t = i(
                  this.year(),
                  this.month(),
                  this.date() - (this.isoWeekday() - 1),
                );
                break;
              case "day":
              case "date":
                t = i(this.year(), this.month(), this.date());
                break;
              case "hour":
                t = this._d.valueOf();
                t -= gn(t + (this._isUTC ? 0 : this.utcOffset() * hn), pn);
                break;
              case "minute":
                t = this._d.valueOf();
                t -= gn(t, hn);
                break;
              case "second":
                t = this._d.valueOf();
                t -= gn(t, un);
                break;
            }
            this._d.setTime(t);
            u.updateOffset(this, true);
            return this;
          }
          function wn(e) {
            var t, i;
            e = g(e);
            if (e === undefined || e === "millisecond" || !this.isValid())
              return this;
            i = this._isUTC ? yn : fn;
            switch (e) {
              case "year":
                t = i(this.year() + 1, 0, 1) - 1;
                break;
              case "quarter":
                t =
                  i(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
                break;
              case "month":
                t = i(this.year(), this.month() + 1, 1) - 1;
                break;
              case "week":
                t =
                  i(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday() + 7,
                  ) - 1;
                break;
              case "isoWeek":
                t =
                  i(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1) + 7,
                  ) - 1;
                break;
              case "day":
              case "date":
                t = i(this.year(), this.month(), this.date() + 1) - 1;
                break;
              case "hour":
                t = this._d.valueOf();
                t +=
                  pn -
                  gn(t + (this._isUTC ? 0 : this.utcOffset() * hn), pn) -
                  1;
                break;
              case "minute":
                t = this._d.valueOf();
                t += hn - gn(t, hn) - 1;
                break;
              case "second":
                t = this._d.valueOf();
                t += un - gn(t, un) - 1;
                break;
            }
            this._d.setTime(t);
            u.updateOffset(this, true);
            return this;
          }
          function bn() {
            return this._d.valueOf() - (this._offset || 0) * 6e4;
          }
          function _n() {
            return Math.floor(this.valueOf() / 1e3);
          }
          function Sn() {
            return new Date(this.valueOf());
          }
          function xn() {
            var e = this;
            return [
              e.year(),
              e.month(),
              e.date(),
              e.hour(),
              e.minute(),
              e.second(),
              e.millisecond(),
            ];
          }
          function Tn() {
            var e = this;
            return {
              years: e.year(),
              months: e.month(),
              date: e.date(),
              hours: e.hours(),
              minutes: e.minutes(),
              seconds: e.seconds(),
              milliseconds: e.milliseconds(),
            };
          }
          function Cn() {
            return this.isValid() ? this.toISOString() : null;
          }
          function Dn() {
            return B(this);
          }
          function Mn() {
            return R({}, h(this));
          }
          function kn() {
            return h(this).overflow;
          }
          function En() {
            return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
            };
          }
          function In(e, t) {
            var i,
              s,
              n,
              r = this._eras || _i("en")._eras;
            for (i = 0, s = r.length; i < s; ++i) {
              switch (typeof r[i].since) {
                case "string":
                  n = u(r[i].since).startOf("day");
                  r[i].since = n.valueOf();
                  break;
              }
              switch (typeof r[i].until) {
                case "undefined":
                  r[i].until = +Infinity;
                  break;
                case "string":
                  n = u(r[i].until).startOf("day").valueOf();
                  r[i].until = n.valueOf();
                  break;
              }
            }
            return r;
          }
          function On(e, t, i) {
            var s,
              n,
              r = this.eras(),
              a,
              o,
              l;
            e = e.toUpperCase();
            for (s = 0, n = r.length; s < n; ++s) {
              a = r[s].name.toUpperCase();
              o = r[s].abbr.toUpperCase();
              l = r[s].narrow.toUpperCase();
              if (i)
                switch (t) {
                  case "N":
                  case "NN":
                  case "NNN":
                    if (o === e) return r[s];
                    break;
                  case "NNNN":
                    if (a === e) return r[s];
                    break;
                  case "NNNNN":
                    if (l === e) return r[s];
                    break;
                }
              else if ([a, o, l].indexOf(e) >= 0) return r[s];
            }
          }
          function Ln(e, t) {
            var i = e.since <= e.until ? +1 : -1;
            if (t === undefined) return u(e.since).year();
            else return u(e.since).year() + (t - e.offset) * i;
          }
          function Pn() {
            var e,
              t,
              i,
              s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
              i = this.clone().startOf("day").valueOf();
              if (s[e].since <= i && i <= s[e].until) return s[e].name;
              if (s[e].until <= i && i <= s[e].since) return s[e].name;
            }
            return "";
          }
          function jn() {
            var e,
              t,
              i,
              s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
              i = this.clone().startOf("day").valueOf();
              if (s[e].since <= i && i <= s[e].until) return s[e].narrow;
              if (s[e].until <= i && i <= s[e].since) return s[e].narrow;
            }
            return "";
          }
          function Yn() {
            var e,
              t,
              i,
              s = this.localeData().eras();
            for (e = 0, t = s.length; e < t; ++e) {
              i = this.clone().startOf("day").valueOf();
              if (s[e].since <= i && i <= s[e].until) return s[e].abbr;
              if (s[e].until <= i && i <= s[e].since) return s[e].abbr;
            }
            return "";
          }
          function zn() {
            var e,
              t,
              i,
              s,
              n = this.localeData().eras();
            for (e = 0, t = n.length; e < t; ++e) {
              i = n[e].since <= n[e].until ? +1 : -1;
              s = this.clone().startOf("day").valueOf();
              if (
                (n[e].since <= s && s <= n[e].until) ||
                (n[e].until <= s && s <= n[e].since)
              )
                return (this.year() - u(n[e].since).year()) * i + n[e].offset;
            }
            return this.year();
          }
          function An(e) {
            if (!l(this, "_erasNameRegex")) Hn.call(this);
            return e ? this._erasNameRegex : this._erasRegex;
          }
          function Nn(e) {
            if (!l(this, "_erasAbbrRegex")) Hn.call(this);
            return e ? this._erasAbbrRegex : this._erasRegex;
          }
          function Vn(e) {
            if (!l(this, "_erasNarrowRegex")) Hn.call(this);
            return e ? this._erasNarrowRegex : this._erasRegex;
          }
          function Gn(e, t) {
            return t.erasAbbrRegex(e);
          }
          function Qn(e, t) {
            return t.erasNameRegex(e);
          }
          function Fn(e, t) {
            return t.erasNarrowRegex(e);
          }
          function Rn(e, t) {
            return t._eraYearOrdinalRegex || Re;
          }
          function Hn() {
            var e = [],
              t = [],
              i = [],
              s = [],
              n,
              r,
              a = this.eras();
            for (n = 0, r = a.length; n < r; ++n) {
              t.push(b(a[n].name));
              e.push(b(a[n].abbr));
              i.push(b(a[n].narrow));
              s.push(b(a[n].name));
              s.push(b(a[n].abbr));
              s.push(b(a[n].narrow));
            }
            this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i");
            this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i");
            this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i");
            this._erasNarrowRegex = new RegExp("^(" + i.join("|") + ")", "i");
          }
          function Bn(e, t) {
            s(0, [e, e.length], 0, t);
          }
          function Wn(e) {
            return Jn.call(
              this,
              e,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy,
            );
          }
          function Un(e) {
            return Jn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
          }
          function $n() {
            return E(this.year(), 1, 4);
          }
          function qn() {
            return E(this.isoWeekYear(), 1, 4);
          }
          function Xn() {
            var e = this.localeData()._week;
            return E(this.year(), e.dow, e.doy);
          }
          function Zn() {
            var e = this.localeData()._week;
            return E(this.weekYear(), e.dow, e.doy);
          }
          function Jn(e, t, i, s, n) {
            var r;
            if (e == null) return kt(this, s, n).year;
            else {
              r = E(e, s, n);
              if (t > r) t = r;
              return Kn.call(this, e, t, i, s, n);
            }
          }
          function Kn(e, t, i, s, n) {
            var r = Mt(e, t, i, s, n),
              a = Ct(r.year, 0, r.dayOfYear);
            this.year(a.getUTCFullYear());
            this.month(a.getUTCMonth());
            this.date(a.getUTCDate());
            return this;
          }
          function er(e) {
            return e == null
              ? Math.ceil((this.month() + 1) / 3)
              : this.month((e - 1) * 3 + (this.month() % 3));
          }
          (s("N", 0, 0, "eraAbbr"),
            s("NN", 0, 0, "eraAbbr"),
            s("NNN", 0, 0, "eraAbbr"),
            s("NNNN", 0, 0, "eraName"),
            s("NNNNN", 0, 0, "eraNarrow"),
            s("y", ["y", 1], "yo", "eraYear"),
            s("y", ["yy", 2], 0, "eraYear"),
            s("y", ["yyy", 3], 0, "eraYear"),
            s("y", ["yyyy", 4], 0, "eraYear"),
            w("N", Gn),
            w("NN", Gn),
            w("NNN", Gn),
            w("NNNN", Qn),
            w("NNNNN", Fn),
            _(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, i, s) {
              var n = i._locale.erasParse(e, s, i._strict);
              if (n) h(i).era = n;
              else h(i).invalidEra = e;
            }),
            w("y", Re),
            w("yy", Re),
            w("yyy", Re),
            w("yyyy", Re),
            w("yo", Rn),
            _(["y", "yy", "yyy", "yyyy"], S),
            _(["yo"], function (e, t, i, s) {
              var n;
              if (i._locale._eraYearOrdinalRegex)
                n = e.match(i._locale._eraYearOrdinalRegex);
              if (i._locale.eraYearOrdinalParse)
                t[S] = i._locale.eraYearOrdinalParse(e, n);
              else t[S] = parseInt(e, 10);
            }),
            s(0, ["gg", 2], 0, function () {
              return this.weekYear() % 100;
            }),
            s(0, ["GG", 2], 0, function () {
              return this.isoWeekYear() % 100;
            }),
            Bn("gggg", "weekYear"),
            Bn("ggggg", "weekYear"),
            Bn("GGGG", "isoWeekYear"),
            Bn("GGGGG", "isoWeekYear"),
            t("weekYear", "gg"),
            t("isoWeekYear", "GG"),
            i("weekYear", 1),
            i("isoWeekYear", 1),
            w("G", He),
            w("g", He),
            w("GG", v, n),
            w("gg", v, n),
            w("GGGG", Qe, ze),
            w("gggg", Qe, ze),
            w("GGGGG", Fe, Ae),
            w("ggggg", Fe, Ae),
            Ke(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, i, s) {
              t[s.substr(0, 2)] = y(e);
            }),
            Ke(["gg", "GG"], function (e, t, i, s) {
              t[s] = u.parseTwoDigitYear(e);
            }),
            s("Q", 0, "Qo", "quarter"),
            t("quarter", "Q"),
            i("quarter", 7),
            w("Q", je),
            _("Q", function (e, t) {
              t[x] = (y(e) - 1) * 3;
            }),
            s("D", ["DD", 2], "Do", "date"),
            t("date", "D"),
            i("date", 9),
            w("D", v),
            w("DD", v, n),
            w("Do", function (e, t) {
              return e
                ? t._dayOfMonthOrdinalParse || t._ordinalParse
                : t._dayOfMonthOrdinalParseLenient;
            }),
            _(["D", "DD"], T),
            _("Do", function (e, t) {
              t[T] = y(e.match(v)[0]);
            }));
          var tr = Ee("Date", true);
          function ir(e) {
            var t =
              Math.round(
                (this.clone().startOf("day") - this.clone().startOf("year")) /
                  864e5,
              ) + 1;
            return e == null ? t : this.add(e - t, "d");
          }
          (s("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
            t("dayOfYear", "DDD"),
            i("dayOfYear", 4),
            w("DDD", Ge),
            w("DDDD", Ye),
            _(["DDD", "DDDD"], function (e, t, i) {
              i._dayOfYear = y(e);
            }),
            s("m", ["mm", 2], 0, "minute"),
            t("minute", "m"),
            i("minute", 14),
            w("m", v),
            w("mm", v, n),
            _(["m", "mm"], D));
          var sr = Ee("Minutes", false),
            nr =
              (s("s", ["ss", 2], 0, "second"),
              t("second", "s"),
              i("second", 15),
              w("s", v),
              w("ss", v, n),
              _(["s", "ss"], M),
              Ee("Seconds", false)),
            rr,
            ar;
          for (
            s("S", 0, 0, function () {
              return ~~(this.millisecond() / 100);
            }),
              s(0, ["SS", 2], 0, function () {
                return ~~(this.millisecond() / 10);
              }),
              s(0, ["SSS", 3], 0, "millisecond"),
              s(0, ["SSSS", 4], 0, function () {
                return this.millisecond() * 10;
              }),
              s(0, ["SSSSS", 5], 0, function () {
                return this.millisecond() * 100;
              }),
              s(0, ["SSSSSS", 6], 0, function () {
                return this.millisecond() * 1e3;
              }),
              s(0, ["SSSSSSS", 7], 0, function () {
                return this.millisecond() * 1e4;
              }),
              s(0, ["SSSSSSSS", 8], 0, function () {
                return this.millisecond() * 1e5;
              }),
              s(0, ["SSSSSSSSS", 9], 0, function () {
                return this.millisecond() * 1e6;
              }),
              t("millisecond", "ms"),
              i("millisecond", 16),
              w("S", Ge, je),
              w("SS", Ge, n),
              w("SSS", Ge, Ye),
              rr = "SSSS";
            rr.length <= 9;
            rr += "S"
          )
            w(rr, Re);
          function or(e, t) {
            t[tt] = y(("0." + e) * 1e3);
          }
          for (rr = "S"; rr.length <= 9; rr += "S") _(rr, or);
          function lr() {
            return this._isUTC ? "UTC" : "";
          }
          function dr() {
            return this._isUTC ? "Coordinated Universal Time" : "";
          }
          ((ar = Ee("Milliseconds", false)),
            s("z", 0, 0, "zoneAbbr"),
            s("zz", 0, 0, "zoneName"));
          var P = X.prototype;
          if (
            ((P.add = Ys),
            (P.calendar = Rs),
            (P.clone = Hs),
            (P.diff = Zs),
            (P.endOf = wn),
            (P.format = sn),
            (P.from = nn),
            (P.fromNow = rn),
            (P.to = an),
            (P.toNow = on),
            (P.get = Le),
            (P.invalidAt = kn),
            (P.isAfter = Bs),
            (P.isBefore = Ws),
            (P.isBetween = Us),
            (P.isSame = $s),
            (P.isSameOrAfter = qs),
            (P.isSameOrBefore = Xs),
            (P.isValid = Dn),
            (P.lang = dn),
            (P.locale = ln),
            (P.localeData = cn),
            (P.max = Ki),
            (P.min = Ji),
            (P.parsingFlags = Mn),
            (P.set = Pe),
            (P.startOf = vn),
            (P.subtract = zs),
            (P.toArray = xn),
            (P.toObject = Tn),
            (P.toDate = Sn),
            (P.toISOString = en),
            (P.inspect = tn),
            typeof Symbol !== "undefined" && Symbol.for != null)
          )
            P[Symbol.for("nodejs.util.inspect.custom")] = function () {
              return "Moment<" + this.format() + ">";
            };
          function cr(e) {
            return O(e * 1e3);
          }
          function ur() {
            return O.apply(null, arguments).parseZone();
          }
          function hr(e) {
            return e;
          }
          ((P.toJSON = Cn),
            (P.toString = Ks),
            (P.unix = _n),
            (P.valueOf = bn),
            (P.creationData = En),
            (P.eraName = Pn),
            (P.eraNarrow = jn),
            (P.eraAbbr = Yn),
            (P.eraYear = zn),
            (P.year = St),
            (P.isLeapYear = xt),
            (P.weekYear = Wn),
            (P.isoWeekYear = Un),
            (P.quarter = P.quarters = er),
            (P.month = ft),
            (P.daysInMonth = yt),
            (P.week = P.weeks = Pt),
            (P.isoWeek = P.isoWeeks = jt),
            (P.weeksInYear = Xn),
            (P.weeksInWeekYear = Zn),
            (P.isoWeeksInYear = $n),
            (P.isoWeeksInISOWeekYear = qn),
            (P.date = tr),
            (P.day = P.days = qt),
            (P.weekday = Xt),
            (P.isoWeekday = Zt),
            (P.dayOfYear = ir),
            (P.hour = P.hours = li),
            (P.minute = P.minutes = sr),
            (P.second = P.seconds = nr),
            (P.millisecond = P.milliseconds = ar),
            (P.utcOffset = ys),
            (P.utc = ws),
            (P.local = bs),
            (P.parseZone = _s),
            (P.hasAlignedHourOffset = Ss),
            (P.isDST = xs),
            (P.isLocal = Cs),
            (P.isUtcOffset = Ds),
            (P.isUtc = Ms),
            (P.isUTC = Ms),
            (P.zoneAbbr = lr),
            (P.zoneName = dr),
            (P.dates = e(
              "dates accessor is deprecated. Use date instead.",
              tr,
            )),
            (P.months = e(
              "months accessor is deprecated. Use month instead",
              ft,
            )),
            (P.years = e("years accessor is deprecated. Use year instead", St)),
            (P.zone = e(
              "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
              vs,
            )),
            (P.isDSTShifted = e(
              "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
              Ts,
            )));
          var j = se.prototype;
          function pr(e, t, i, s) {
            var n = _i(),
              r = c().set(s, t);
            return n[i](r, e);
          }
          function mr(e, t, i) {
            if (d(e)) {
              t = e;
              e = undefined;
            }
            e = e || "";
            if (t != null) return pr(e, t, i, "month");
            var s,
              n = [];
            for (s = 0; s < 12; s++) n[s] = pr(e, s, i, "month");
            return n;
          }
          function gr(e, t, i, s) {
            if (typeof e === "boolean") {
              if (d(t)) {
                i = t;
                t = undefined;
              }
              t = t || "";
            } else {
              t = e;
              i = t;
              e = false;
              if (d(t)) {
                i = t;
                t = undefined;
              }
              t = t || "";
            }
            var n = _i(),
              r = e ? n._week.dow : 0,
              a,
              o = [];
            if (i != null) return pr(t, (i + r) % 7, s, "day");
            for (a = 0; a < 7; a++) o[a] = pr(t, (a + r) % 7, s, "day");
            return o;
          }
          function fr(e, t) {
            return mr(e, t, "months");
          }
          function yr(e, t) {
            return mr(e, t, "monthsShort");
          }
          function vr(e, t, i) {
            return gr(e, t, i, "weekdays");
          }
          function wr(e, t, i) {
            return gr(e, t, i, "weekdaysShort");
          }
          function br(e, t, i) {
            return gr(e, t, i, "weekdaysMin");
          }
          ((j.calendar = re),
            (j.longDateFormat = ge),
            (j.invalidDate = ye),
            (j.ordinal = be),
            (j.preparse = hr),
            (j.postformat = hr),
            (j.relativeTime = Se),
            (j.pastFuture = xe),
            (j.set = te),
            (j.eras = In),
            (j.erasParse = On),
            (j.erasConvertYear = Ln),
            (j.erasAbbrRegex = Nn),
            (j.erasNameRegex = An),
            (j.erasNarrowRegex = Vn),
            (j.months = ut),
            (j.monthsShort = ht),
            (j.monthsParse = mt),
            (j.monthsRegex = wt),
            (j.monthsShortRegex = vt),
            (j.week = Et),
            (j.firstDayOfYear = Lt),
            (j.firstDayOfWeek = Ot),
            (j.weekdays = Ht),
            (j.weekdaysMin = Wt),
            (j.weekdaysShort = Bt),
            (j.weekdaysParse = $t),
            (j.weekdaysRegex = Jt),
            (j.weekdaysShortRegex = Kt),
            (j.weekdaysMinRegex = ei),
            (j.isPM = ai),
            (j.meridiem = di),
            vi("en", {
              eras: [
                {
                  since: "0001-01-01",
                  until: +Infinity,
                  offset: 1,
                  name: "Anno Domini",
                  narrow: "AD",
                  abbr: "AD",
                },
                {
                  since: "0000-12-31",
                  until: -Infinity,
                  offset: 1,
                  name: "Before Christ",
                  narrow: "BC",
                  abbr: "BC",
                },
              ],
              dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
              ordinal: function (e) {
                var t = e % 10,
                  i =
                    y((e % 100) / 10) === 1
                      ? "th"
                      : t === 1
                        ? "st"
                        : t === 2
                          ? "nd"
                          : t === 3
                            ? "rd"
                            : "th";
                return e + i;
              },
            }),
            (u.lang = e(
              "moment.lang is deprecated. Use moment.locale instead.",
              vi,
            )),
            (u.langData = e(
              "moment.langData is deprecated. Use moment.localeData instead.",
              _i,
            )));
          var _r = Math.abs;
          function Sr() {
            var e = this._data;
            this._milliseconds = _r(this._milliseconds);
            this._days = _r(this._days);
            this._months = _r(this._months);
            e.milliseconds = _r(e.milliseconds);
            e.seconds = _r(e.seconds);
            e.minutes = _r(e.minutes);
            e.hours = _r(e.hours);
            e.months = _r(e.months);
            e.years = _r(e.years);
            return this;
          }
          function xr(e, t, i, s) {
            var n = L(t, i);
            e._milliseconds += s * n._milliseconds;
            e._days += s * n._days;
            e._months += s * n._months;
            return e._bubble();
          }
          function Tr(e, t) {
            return xr(this, e, t, 1);
          }
          function Cr(e, t) {
            return xr(this, e, t, -1);
          }
          function Dr(e) {
            if (e < 0) return Math.floor(e);
            else return Math.ceil(e);
          }
          function Mr() {
            var e = this._milliseconds,
              t = this._days,
              i = this._months,
              s = this._data,
              n,
              r,
              a,
              o,
              l;
            if (
              !((e >= 0 && t >= 0 && i >= 0) || (e <= 0 && t <= 0 && i <= 0))
            ) {
              e += Dr(Er(i) + t) * 864e5;
              t = 0;
              i = 0;
            }
            s.milliseconds = e % 1e3;
            n = f(e / 1e3);
            s.seconds = n % 60;
            r = f(n / 60);
            s.minutes = r % 60;
            a = f(r / 60);
            s.hours = a % 24;
            t += f(a / 24);
            l = f(kr(t));
            i += l;
            t -= Dr(Er(l));
            o = f(i / 12);
            i %= 12;
            s.days = t;
            s.months = i;
            s.years = o;
            return this;
          }
          function kr(e) {
            return (e * 4800) / 146097;
          }
          function Er(e) {
            return (e * 146097) / 4800;
          }
          function Ir(e) {
            if (!this.isValid()) return NaN;
            var t,
              i,
              s = this._milliseconds;
            e = g(e);
            if (e === "month" || e === "quarter" || e === "year") {
              t = this._days + s / 864e5;
              i = this._months + kr(t);
              switch (e) {
                case "month":
                  return i;
                case "quarter":
                  return i / 3;
                case "year":
                  return i / 12;
              }
            } else {
              t = this._days + Math.round(Er(this._months));
              switch (e) {
                case "week":
                  return t / 7 + s / 6048e5;
                case "day":
                  return t + s / 864e5;
                case "hour":
                  return t * 24 + s / 36e5;
                case "minute":
                  return t * 1440 + s / 6e4;
                case "second":
                  return t * 86400 + s / 1e3;
                case "millisecond":
                  return Math.floor(t * 864e5) + s;
                default:
                  throw new Error("Unknown unit " + e);
              }
            }
          }
          function Or() {
            if (!this.isValid()) return NaN;
            return (
              this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              y(this._months / 12) * 31536e6
            );
          }
          function Lr(e) {
            return function () {
              return this.as(e);
            };
          }
          var Pr = Lr("ms"),
            jr = Lr("s"),
            Yr = Lr("m"),
            zr = Lr("h"),
            Ar = Lr("d"),
            Nr = Lr("w"),
            Vr = Lr("M"),
            Gr = Lr("Q"),
            Qr = Lr("y");
          function Fr() {
            return L(this);
          }
          function Rr(e) {
            e = g(e);
            return this.isValid() ? this[e + "s"]() : NaN;
          }
          function Hr(e) {
            return function () {
              return this.isValid() ? this._data[e] : NaN;
            };
          }
          var Br = Hr("milliseconds"),
            Wr = Hr("seconds"),
            Ur = Hr("minutes"),
            $r = Hr("hours"),
            qr = Hr("days"),
            Xr = Hr("months"),
            Zr = Hr("years");
          function Jr() {
            return f(this.days() / 7);
          }
          var Kr = Math.round,
            ea = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
          function ta(e, t, i, s, n) {
            return n.relativeTime(t || 1, !!i, e, s);
          }
          function ia(e, t, i, s) {
            var n = L(e).abs(),
              r = Kr(n.as("s")),
              a = Kr(n.as("m")),
              o = Kr(n.as("h")),
              l = Kr(n.as("d")),
              d = Kr(n.as("M")),
              c = Kr(n.as("w")),
              u = Kr(n.as("y")),
              h =
                (r <= i.ss && ["s", r]) ||
                (r < i.s && ["ss", r]) ||
                (a <= 1 && ["m"]) ||
                (a < i.m && ["mm", a]) ||
                (o <= 1 && ["h"]) ||
                (o < i.h && ["hh", o]) ||
                (l <= 1 && ["d"]) ||
                (l < i.d && ["dd", l]);
            if (i.w != null)
              h = h || (c <= 1 && ["w"]) || (c < i.w && ["ww", c]);
            h = h ||
              (d <= 1 && ["M"]) ||
              (d < i.M && ["MM", d]) ||
              (u <= 1 && ["y"]) || ["yy", u];
            h[2] = t;
            h[3] = +e > 0;
            h[4] = s;
            return ta.apply(null, h);
          }
          function sa(e) {
            if (e === undefined) return Kr;
            if (typeof e === "function") {
              Kr = e;
              return true;
            }
            return false;
          }
          function na(e, t) {
            if (ea[e] === undefined) return false;
            if (t === undefined) return ea[e];
            ea[e] = t;
            if (e === "s") ea.ss = t - 1;
            return true;
          }
          function ra(e, t) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var i = false,
              s = ea,
              n,
              r;
            if (typeof e === "object") {
              t = e;
              e = false;
            }
            if (typeof e === "boolean") i = e;
            if (typeof t === "object") {
              s = Object.assign({}, ea, t);
              if (t.s != null && t.ss == null) s.ss = t.s - 1;
            }
            n = this.localeData();
            r = ia(this, !i, s, n);
            if (i) r = n.pastFuture(+this, r);
            return n.postformat(r);
          }
          var aa = Math.abs;
          function oa(e) {
            return (e > 0) - (e < 0) || +e;
          }
          function la() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var e = aa(this._milliseconds) / 1e3,
              t = aa(this._days),
              i = aa(this._months),
              s,
              n,
              r,
              a,
              o = this.asSeconds(),
              l,
              d,
              c,
              u;
            if (!o) return "P0D";
            s = f(e / 60);
            n = f(s / 60);
            e %= 60;
            s %= 60;
            r = f(i / 12);
            i %= 12;
            a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "";
            l = o < 0 ? "-" : "";
            d = oa(this._months) !== oa(o) ? "-" : "";
            c = oa(this._days) !== oa(o) ? "-" : "";
            u = oa(this._milliseconds) !== oa(o) ? "-" : "";
            return (
              l +
              "P" +
              (r ? d + r + "Y" : "") +
              (i ? d + i + "M" : "") +
              (t ? c + t + "D" : "") +
              (n || s || e ? "T" : "") +
              (n ? u + n + "H" : "") +
              (s ? u + s + "M" : "") +
              (e ? u + a + "S" : "")
            );
          }
          var Y = ls.prototype;
          return (
            (Y.isValid = as),
            (Y.abs = Sr),
            (Y.add = Tr),
            (Y.subtract = Cr),
            (Y.as = Ir),
            (Y.asMilliseconds = Pr),
            (Y.asSeconds = jr),
            (Y.asMinutes = Yr),
            (Y.asHours = zr),
            (Y.asDays = Ar),
            (Y.asWeeks = Nr),
            (Y.asMonths = Vr),
            (Y.asQuarters = Gr),
            (Y.asYears = Qr),
            (Y.valueOf = Or),
            (Y._bubble = Mr),
            (Y.clone = Fr),
            (Y.get = Rr),
            (Y.milliseconds = Br),
            (Y.seconds = Wr),
            (Y.minutes = Ur),
            (Y.hours = $r),
            (Y.days = qr),
            (Y.weeks = Jr),
            (Y.months = Xr),
            (Y.years = Zr),
            (Y.humanize = ra),
            (Y.toISOString = la),
            (Y.toString = la),
            (Y.toJSON = la),
            (Y.locale = ln),
            (Y.localeData = cn),
            (Y.toIsoString = e(
              "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
              la,
            )),
            (Y.lang = dn),
            s("X", 0, 0, "unix"),
            s("x", 0, 0, "valueOf"),
            w("x", He),
            w("X", Ue),
            _("X", function (e, t, i) {
              i._d = new Date(parseFloat(e) * 1e3);
            }),
            _("x", function (e, t, i) {
              i._d = new Date(y(e));
            }),
            (u.version = "2.29.4"),
            N(O),
            (u.fn = P),
            (u.min = ts),
            (u.max = is),
            (u.now = ss),
            (u.utc = c),
            (u.unix = cr),
            (u.months = fr),
            (u.isDate = Q),
            (u.locale = vi),
            (u.invalid = W),
            (u.duration = L),
            (u.isMoment = p),
            (u.weekdays = vr),
            (u.parseZone = ur),
            (u.localeData = _i),
            (u.isDuration = ds),
            (u.monthsShort = yr),
            (u.weekdaysMin = br),
            (u.defineLocale = wi),
            (u.updateLocale = bi),
            (u.locales = Si),
            (u.weekdaysShort = wr),
            (u.normalizeUnits = g),
            (u.relativeTimeRounding = sa),
            (u.relativeTimeThreshold = na),
            (u.calendarFormat = Fs),
            (u.prototype = P),
            (u.HTML5_FMT = {
              DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
              DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
              DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
              DATE: "YYYY-MM-DD",
              TIME: "HH:mm",
              TIME_SECONDS: "HH:mm:ss",
              TIME_MS: "HH:mm:ss.SSS",
              WEEK: "GGGG-[W]WW",
              MONTH: "YYYY-MM",
            }),
            u
          );
        })())),
      Os.exports
    );
  }
  ((S = S),
    (T = function (p) {
      function m(e) {
        return (
          '<div class="lightpick__toolbar"><button type="button" class="lightpick__previous-action">' +
          e.locale.buttons.prev +
          '</button><button type="button" class="lightpick__next-action">' +
          e.locale.buttons.next +
          "</button>" +
          (e.autoclose || e.inline
            ? ""
            : '<button type="button" class="lightpick__close-action">' +
              e.locale.buttons.close +
              "</button>") +
          "</div>"
        );
      }
      function g(e, t, i) {
        return new Date(1970, 0, t, 12, 0, 0, 0).toLocaleString(e.lang, {
          weekday: i || e.weekdayStyle,
        });
      }
      function t(e, t) {
        for (
          var i = "", s = p(t.calendar[0]), n = 0;
          n < t.numberOfMonths;
          n++
        ) {
          var r = p(s),
            i =
              (i =
                i +
                '<section class="lightpick__month">' +
                '<div class="lightpick__month-title-bar">') +
              ('<div class="lightpick__month-title">' +
                (function (e, t) {
                  for (
                    var i = p(e), s = f.createElement("select"), n = 0;
                    n < 12;
                    n++
                  ) {
                    i.set("month", n);
                    var r = f.createElement("option");
                    ((r.value = i.toDate().getMonth()),
                      (r.text = i
                        .toDate()
                        .toLocaleString(t.lang, { month: "long" })),
                      n === e.toDate().getMonth() &&
                        r.setAttribute("selected", "selected"),
                      s.appendChild(r));
                  }
                  return (
                    (s.className =
                      "lightpick__select lightpick__select-months"),
                    (s.dir = "rtl"),
                    (t.dropdowns && t.dropdowns.months) || (s.disabled = !0),
                    s.outerHTML
                  );
                })(r, t) +
                (function (e, t) {
                  var i = p(e),
                    s = f.createElement("select"),
                    n =
                      t.dropdowns && t.dropdowns.years
                        ? t.dropdowns.years
                        : null,
                    r = n && n.min ? n.min : 1900,
                    a =
                      n && n.max ? n.max : Number.parseInt(p().format("YYYY"));
                  (Number.parseInt(e.format("YYYY")) < r &&
                    (r = Number.parseInt(e.format("YYYY"))),
                    Number.parseInt(e.format("YYYY")) > a &&
                      (a = Number.parseInt(e.format("YYYY"))));
                  for (var o = r; o <= a; o++) {
                    i.set("year", o);
                    var l = f.createElement("option");
                    ((l.value = i.toDate().getFullYear()),
                      (l.text = i.toDate().getFullYear()),
                      o === e.toDate().getFullYear() &&
                        l.setAttribute("selected", "selected"),
                      s.appendChild(l));
                  }
                  return (
                    (s.className = "lightpick__select lightpick__select-years"),
                    (t.dropdowns && t.dropdowns.years) || (s.disabled = !0),
                    s.outerHTML
                  );
                })(r, t) +
                "</div>");
          (1 === t.numberOfMonths && (i += m(t)),
            (i = i + "</div>" + '<div class="lightpick__days-of-the-week">'));
          for (var a = t.firstDay + 4; a < 7 + t.firstDay + 4; ++a)
            i +=
              '<div class="lightpick__day-of-the-week" title="' +
              g(t, a, "long") +
              '">' +
              g(t, a) +
              "</div>";
          if (
            ((i = i + "</div>" + '<div class="lightpick__days">'),
            r.isoWeekday() !== t.firstDay)
          )
            for (
              var o =
                  0 < r.isoWeekday() - t.firstDay
                    ? r.isoWeekday() - t.firstDay
                    : r.isoWeekday(),
                l = p(r).subtract(o, "day"),
                d = l.daysInMonth(),
                c = l.get("date");
              c <= d;
              c++
            )
              ((i += y(t, l, 0 < n, "is-previous-month")), l.add(1, "day"));
          for (d = r.daysInMonth(), c = 0; c < d; c++)
            ((i += y(t, r)), r.add(1, "day"));
          var u = p(r),
            h = 7 - u.isoWeekday() + t.firstDay;
          if (h < 7)
            for (c = u.get("date"); c <= h; c++)
              ((i += y(t, u, n < t.numberOfMonths - 1, "is-next-month")),
                u.add(1, "day"));
          ((i = i + "</div>" + "</section>"), s.add(1, "month"));
        }
        ((t.calendar[1] = p(s)),
          (e.querySelector(".lightpick__months").innerHTML = i));
      }
      function o(e, t) {
        var i = e.querySelectorAll(".lightpick__day");
        ([].forEach.call(i, function (e) {
          e.outerHTML = y(
            t,
            parseInt(e.getAttribute("data-time")),
            !1,
            e.className.split(" "),
          );
        }),
          n(e, t));
      }
      function e(e) {
        var a = this,
          i = a.config(e),
          e =
            ((a.el = f.createElement("section")),
            (a.el.className =
              "lightpick lightpick--" +
              i.numberOfColumns +
              "-columns is-hidden"),
            i.inline && (a.el.className += " lightpick--inlined"),
            '<div class="lightpick__inner">' +
              (1 < i.numberOfMonths ? m(i) : "") +
              '<div class="lightpick__months"></div><div class="lightpick__tooltip" style="visibility: hidden"></div>');
        (i.footer &&
          ((e += '<div class="lightpick__footer">'),
          !0 === i.footer
            ? (e =
                (e +=
                  '<button type="button" class="lightpick__reset-action">' +
                  i.locale.buttons.reset +
                  "</button>") +
                '<div class="lightpick__footer-message"></div><button type="button" class="lightpick__apply-action">' +
                i.locale.buttons.apply +
                "</button>")
            : (e += i.footer),
          (e += "</div>")),
          (a.el.innerHTML = e += "</div>"),
          (i.parentEl instanceof Node
            ? i.parentEl
            : "body" === i.parentEl && i.inline
              ? i.field.parentNode
              : f.querySelector(i.parentEl)
          ).appendChild(a.el),
          (a._onMouseDown = function (e) {
            if (a.isShowing) {
              var t = (e = e || window.event).target || e.srcElement;
              if (t) {
                (e.stopPropagation(),
                  t.classList.contains("lightpick__select") ||
                    e.preventDefault());
                e = a._opts;
                if (
                  t.classList.contains("lightpick__day") &&
                  t.classList.contains("is-available")
                ) {
                  var i,
                    s = p(parseInt(t.getAttribute("data-time")));
                  if (
                    !e.disabledDatesInRange &&
                    e.disableDates &&
                    e.startDate
                  ) {
                    var n = s.isAfter(e.startDate) ? p(e.startDate) : p(s),
                      r = s.isAfter(e.startDate) ? p(s) : p(e.startDate);
                    if (
                      e.disableDates.filter(function (e) {
                        var t, i;
                        return e instanceof Array ||
                          "[object Array]" === Object.prototype.toString.call(e)
                          ? ((t = p(e[0])),
                            (i = p(e[1])),
                            t.isValid() &&
                              i.isValid() &&
                              (t.isBetween(n, r, "day", "[]") ||
                                i.isBetween(n, r, "day", "[]")))
                          : p(e).isBetween(n, r, "day", "[]");
                      }).length
                    )
                      return (
                        a.setStartDate(null),
                        a.setEndDate(null),
                        t.dispatchEvent(new Event("mousedown")),
                        (a.el.querySelector(
                          ".lightpick__tooltip",
                        ).style.visibility = "hidden"),
                        void o(a.el, e)
                      );
                  }
                  (e.singleDate ||
                  (!e.startDate && !e.endDate) ||
                  (e.startDate && e.endDate)
                    ? e.repick && e.startDate && e.endDate
                      ? (e.repickTrigger === e.field
                          ? (a.setStartDate(s),
                            t.classList.add("is-start-date"))
                          : (a.setEndDate(s), t.classList.add("is-end-date")),
                        e.startDate.isAfter(e.endDate) && a.swapDate(),
                        e.autoclose &&
                          setTimeout(function () {
                            a.hide();
                          }, 100))
                      : (a.setStartDate(s),
                        a.setEndDate(null),
                        t.classList.add("is-start-date"),
                        e.singleDate && e.autoclose
                          ? setTimeout(function () {
                              a.hide();
                            }, 100)
                          : (e.singleDate && !e.inline && e.autoclose) ||
                            o(a.el, e))
                    : e.startDate &&
                      !e.endDate &&
                      (a.setEndDate(s),
                      e.startDate.isAfter(e.endDate) && a.swapDate(),
                      t.classList.add("is-end-date"),
                      e.autoclose
                        ? setTimeout(function () {
                            a.hide();
                          }, 100)
                        : o(a.el, e)),
                    e.disabledDatesInRange ||
                      (0 ===
                        a.el.querySelectorAll(".lightpick__day.is-available")
                          .length &&
                        (a.setStartDate(null), o(a.el, e), e.footer) &&
                        ("function" == typeof a._opts.onError
                          ? a._opts.onError.call(a, "Invalid range")
                          : (i = a.el.querySelector(
                              ".lightpick__footer-message",
                            )) &&
                            ((i.innerHTML = e.locale.not_allowed_range),
                            setTimeout(function () {
                              i.innerHTML = "";
                            }, 3e3)))));
                } else
                  t.classList.contains("lightpick__previous-action")
                    ? a.prevMonth()
                    : t.classList.contains("lightpick__next-action")
                      ? a.nextMonth()
                      : t.classList.contains("lightpick__close-action") ||
                          t.classList.contains("lightpick__apply-action")
                        ? a.hide()
                        : t.classList.contains("lightpick__reset-action") &&
                          a.reset();
              }
            }
          }),
          (a._onMouseEnter = function (e) {
            var i, s, n, t, r;
            a.isShowing &&
              (e = (e = e || window.event).target || e.srcElement) &&
              ((i = a._opts),
              e.classList.contains("lightpick__day") &&
              e.classList.contains("disabled-tooltip") &&
              i.locale.tooltipOnDisabled
                ? a.showTooltip(e, i.locale.tooltipOnDisabled)
                : (a.hideTooltip(),
                  i.singleDate ||
                    (!i.startDate && !i.endDate) ||
                    ((e.classList.contains("lightpick__day") ||
                      e.classList.contains("is-available")) &&
                      ((i.startDate && !i.endDate) || i.repick) &&
                      (s = p(
                        parseInt(e.getAttribute("data-time")),
                      )).isValid() &&
                      ((n =
                        (i.startDate && !i.endDate) ||
                        (i.repick && i.repickTrigger === i.secondField)
                          ? i.startDate
                          : i.endDate),
                      (r = a.el.querySelectorAll(".lightpick__day")),
                      [].forEach.call(r, function (e) {
                        var t = p(parseInt(e.getAttribute("data-time")));
                        (e.classList.remove("is-flipped"),
                          t.isValid() &&
                          t.isSameOrAfter(n, "day") &&
                          t.isSameOrBefore(s, "day")
                            ? (e.classList.add("is-in-range"),
                              i.repickTrigger === i.field &&
                                t.isSameOrAfter(i.endDate) &&
                                e.classList.add("is-flipped"))
                            : t.isValid() &&
                                t.isSameOrAfter(s, "day") &&
                                t.isSameOrBefore(n, "day")
                              ? (e.classList.add("is-in-range"),
                                ((i.startDate && !i.endDate) ||
                                  i.repickTrigger === i.secondField) &&
                                  t.isSameOrBefore(i.startDate) &&
                                  e.classList.add("is-flipped"))
                              : e.classList.remove("is-in-range"),
                          i.startDate &&
                          i.endDate &&
                          i.repick &&
                          i.repickTrigger === i.field
                            ? e.classList.remove("is-start-date")
                            : e.classList.remove("is-end-date"));
                      }),
                      i.hoveringTooltip &&
                        ((r = Math.abs(
                          s.isAfter(n) ? s.diff(n, "day") : n.diff(s, "day"),
                        )),
                        i.tooltipNights || (r += 1),
                        a.el.querySelector(".lightpick__tooltip"),
                        0 < r && !e.classList.contains("is-disabled")
                          ? ((t = ""),
                            "function" == typeof i.locale.pluralize &&
                              (t = i.locale.pluralize.call(
                                a,
                                r,
                                i.locale.tooltip,
                              )),
                            a.showTooltip(e, r + " " + t))
                          : a.hideTooltip()),
                      i.startDate &&
                      i.endDate &&
                      i.repick &&
                      i.repickTrigger === i.field
                        ? e.classList.add("is-start-date")
                        : e.classList.add("is-end-date")))));
          }),
          (a._onChange = function (e) {
            e = (e = e || window.event).target || e.srcElement;
            e &&
              (e.classList.contains("lightpick__select-months")
                ? ("function" == typeof a._opts.onMonthsChange &&
                    a._opts.onMonthsChange.call(this, e.value),
                  a.gotoMonth(e.value))
                : e.classList.contains("lightpick__select-years") &&
                  ("function" == typeof a._opts.onYearsChange &&
                    a._opts.onYearsChange.call(this, e.value),
                  a.gotoYear(e.value)));
          }),
          (a._onInputChange = function (e) {
            (e.target || e.srcElement,
              a._opts.singleDate &&
                !a._opts.autoclose &&
                a.gotoDate(i.field.value),
              a.syncFields(),
              a.isShowing || a.show());
          }),
          (a._onInputFocus = function (e) {
            e = e.target || e.srcElement;
            a.show(e);
          }),
          (a._onInputClick = function (e) {
            e = e.target || e.srcElement;
            a.show(e);
          }),
          (a._onClick = function (e) {
            var e = (e = e || window.event).target || e.srcElement,
              t = e;
            if (e) {
              do {
                if (
                  (t.classList && t.classList.contains("lightpick")) ||
                  t === i.field ||
                  (i.secondField && t === i.secondField)
                )
                  return;
              } while ((t = t.parentNode));
              a.isShowing &&
                i.hideOnBodyClick &&
                e !== i.field &&
                t !== i.field &&
                a.hide();
            }
          }),
          (a.showTooltip = function (e, t) {
            var i = a.el.querySelector(".lightpick__tooltip"),
              s = a.el.classList.contains("lightpick--inlined"),
              e = e.getBoundingClientRect(),
              s = (s ? a.el.parentNode : a.el).getBoundingClientRect(),
              n = e.left - s.left + e.width / 2,
              r = e.top - s.top,
              e =
                ((i.style.visibility = "visible"),
                (i.textContent = t),
                i.getBoundingClientRect());
            ((r -= e.height),
              (n -= e.width / 2),
              setTimeout(function () {
                ((i.style.top = r + "px"), (i.style.left = n + "px"));
              }, 10));
          }),
          (a.hideTooltip = function () {
            a.el.querySelector(".lightpick__tooltip").style.visibility =
              "hidden";
          }),
          a.el.addEventListener("mousedown", a._onMouseDown, !0),
          a.el.addEventListener("mouseenter", a._onMouseEnter, !0),
          a.el.addEventListener("touchend", a._onMouseDown, !0),
          a.el.addEventListener("change", a._onChange, !0),
          i.inline ? a.show() : a.hide(),
          i.field.addEventListener("change", a._onInputChange),
          i.field.addEventListener("click", a._onInputClick),
          i.field.addEventListener("focus", a._onInputFocus),
          i.secondField &&
            (i.secondField.addEventListener("change", a._onInputChange),
            i.secondField.addEventListener("click", a._onInputClick),
            i.secondField.addEventListener("focus", a._onInputFocus)));
      }
      var f = window.document,
        s = {
          field: null,
          secondField: null,
          firstDay: 1,
          parentEl: "body",
          lang: "auto",
          format: "DD/MM/YYYY",
          separator: " - ",
          numberOfMonths: 1,
          numberOfColumns: 2,
          singleDate: !0,
          autoclose: !0,
          repick: !1,
          startDate: null,
          endDate: null,
          minDate: null,
          maxDate: null,
          disableDates: null,
          selectForward: !1,
          selectBackward: !1,
          minDays: null,
          maxDays: null,
          hoveringTooltip: !0,
          hideOnBodyClick: !0,
          footer: !1,
          disabledDatesInRange: !0,
          tooltipNights: !1,
          orientation: "auto",
          disableWeekends: !1,
          inline: !1,
          weekdayStyle: "short",
          dropdowns: { years: { min: 1900, max: null }, months: !0 },
          locale: {
            buttons: {
              prev: "&leftarrow;",
              next: "&rightarrow;",
              close: "&times;",
              reset: "Reset",
              apply: "Apply",
            },
            tooltip: { one: "day", other: "days" },
            tooltipOnDisabled: null,
            pluralize: function (e, t) {
              return 1 === (e = "string" == typeof e ? parseInt(e, 10) : e) &&
                "one" in t
                ? t.one
                : "other" in t
                  ? t.other
                  : "";
            },
          },
          onSelect: null,
          onSelectStart: null,
          onSelectEnd: null,
          onOpen: null,
          onClose: null,
          onError: null,
          onMonthsChange: null,
          onYearsChange: null,
        },
        y = function (e, t, i, s) {
          if (i) return "<div></div>";
          var t = p(t),
            i = p(t).subtract(1, "month"),
            n = p(t).add(1, "month"),
            r = {
              time: p(t).valueOf(),
              className: ["lightpick__day", "is-available"],
            };
          if (
            (s instanceof Array ||
            "[object Array]" === Object.prototype.toString.call(s)
              ? ((s = s.filter(function (e) {
                  return (
                    0 <=
                    [
                      "lightpick__day",
                      "is-available",
                      "is-previous-month",
                      "is-next-month",
                    ].indexOf(e)
                  );
                })),
                (r.className = r.className.concat(s)))
              : r.className.push(s),
            e.disableDates)
          )
            for (var a, o, l = 0; l < e.disableDates.length; l++)
              (e.disableDates[l] instanceof Array ||
              "[object Array]" ===
                Object.prototype.toString.call(e.disableDates[l])
                ? ((a = p(e.disableDates[l][0], e.format)),
                  (o = p(e.disableDates[l][1], e.format)),
                  a.isValid() &&
                    o.isValid() &&
                    t.isBetween(a, o, "day", "[]") &&
                    r.className.push("is-disabled"))
                : p(e.disableDates[l], e.format).isValid() &&
                  p(e.disableDates[l], e.format).isSame(t, "day") &&
                  r.className.push("is-disabled"),
                0 <= r.className.indexOf("is-disabled") &&
                  (e.locale.tooltipOnDisabled &&
                    (!e.startDate ||
                      t.isAfter(e.startDate) ||
                      (e.startDate && e.endDate)) &&
                    r.className.push("disabled-tooltip"),
                  0 <= r.className.indexOf("is-start-date")
                    ? (this.setStartDate(null), this.setEndDate(null))
                    : 0 <= r.className.indexOf("is-end-date") &&
                      this.setEndDate(null)));
          (e.minDays &&
            e.startDate &&
            !e.endDate &&
            t.isBetween(
              p(e.startDate).subtract(e.minDays - 1, "day"),
              p(e.startDate).add(e.minDays - 1, "day"),
              "day",
            ) &&
            (r.className.push("is-disabled"), e.selectForward) &&
            t.isSameOrAfter(e.startDate) &&
            (r.className.push("is-forward-selected"),
            r.className.push("is-in-range")),
            e.maxDays &&
              e.startDate &&
              !e.endDate &&
              (t.isSameOrBefore(
                p(e.startDate).subtract(e.maxDays, "day"),
                "day",
              ) ||
                t.isSameOrAfter(p(e.startDate).add(e.maxDays, "day"), "day")) &&
              r.className.push("is-disabled"),
            e.repick &&
              (e.minDays || e.maxDays) &&
              e.startDate &&
              e.endDate &&
              ((s = p(e.repickTrigger == e.field ? e.endDate : e.startDate)),
              e.minDays &&
                t.isBetween(
                  p(s).subtract(e.minDays - 1, "day"),
                  p(s).add(e.minDays - 1, "day"),
                  "day",
                ) &&
                r.className.push("is-disabled"),
              e.maxDays) &&
              (t.isSameOrBefore(p(s).subtract(e.maxDays, "day"), "day") ||
                t.isSameOrAfter(p(s).add(e.maxDays, "day"), "day")) &&
              r.className.push("is-disabled"),
            t.isSame(new Date(), "day") && r.className.push("is-today"),
            t.isSame(e.startDate, "day") && r.className.push("is-start-date"),
            t.isSame(e.endDate, "day") && r.className.push("is-end-date"),
            e.startDate &&
              e.endDate &&
              t.isBetween(e.startDate, e.endDate, "day", "[]") &&
              r.className.push("is-in-range"),
            p().isSame(t, "month") ||
              (i.isSame(t, "month")
                ? r.className.push("is-previous-month")
                : n.isSame(t, "month") && r.className.push("is-next-month")),
            e.minDate &&
              t.isBefore(e.minDate, "day") &&
              r.className.push("is-disabled"),
            e.maxDate &&
              t.isAfter(e.maxDate, "day") &&
              r.className.push("is-disabled"),
            e.selectForward &&
              !e.singleDate &&
              e.startDate &&
              !e.endDate &&
              t.isBefore(e.startDate, "day") &&
              r.className.push("is-disabled"),
            e.selectBackward &&
              !e.singleDate &&
              e.startDate &&
              !e.endDate &&
              t.isAfter(e.startDate, "day") &&
              r.className.push("is-disabled"),
            !e.disableWeekends ||
              (6 != t.isoWeekday() && 7 != t.isoWeekday()) ||
              r.className.push("is-disabled"),
            (r.className = r.className.filter(function (e, t, i) {
              return i.indexOf(e) === t;
            })),
            0 <= r.className.indexOf("is-disabled") &&
              0 <= r.className.indexOf("is-available") &&
              r.className.splice(r.className.indexOf("is-available"), 1));
          s = f.createElement("div");
          return (
            (s.className = r.className.join(" ")),
            (s.innerHTML = t.get("date")),
            s.setAttribute("data-time", r.time),
            s.outerHTML
          );
        },
        n = function (e, i) {
          var t, s, n;
          !i.disabledDatesInRange &&
            i.startDate &&
            !i.endDate &&
            i.disableDates &&
            ((e = e.querySelectorAll(".lightpick__day")),
            (t = i.disableDates.map(function (e) {
              return e instanceof Array ||
                "[object Array]" === Object.prototype.toString.call(e)
                ? e[0]
                : e;
            })),
            (s = p(
              t
                .filter(function (e) {
                  return p(e).isBefore(i.startDate);
                })
                .sort(function (e, t) {
                  return p(t).isAfter(p(e));
                })[0],
            )),
            (n = p(
              t
                .filter(function (e) {
                  return p(e).isAfter(i.startDate);
                })
                .sort(function (e, t) {
                  return p(e).isAfter(p(t));
                })[0],
            )),
            [].forEach.call(e, function (e) {
              var t = p(parseInt(e.getAttribute("data-time")));
              ((s && t.isBefore(s) && i.startDate.isAfter(s)) ||
                (n && t.isAfter(n) && n.isAfter(i.startDate))) &&
                (e.classList.remove("is-available"),
                e.classList.add("is-disabled"));
            }));
        };
      return (
        (e.prototype = {
          config: function (e) {
            var t,
              i = Object.assign({}, s, e);
            return (
              (i.field = i.field && i.field.nodeName ? i.field : null),
              (i.calendar = [p().set("date", 1)]),
              1 === i.numberOfMonths &&
                1 < i.numberOfColumns &&
                (i.numberOfColumns = 1),
              (i.minDate =
                i.minDate && p(i.minDate, i.format).isValid()
                  ? p(i.minDate, i.format)
                  : null),
              (i.maxDate =
                i.maxDate && p(i.maxDate, i.format).isValid()
                  ? p(i.maxDate, i.format)
                  : null),
              "auto" === i.lang &&
                ((t = navigator.language || navigator.userLanguage),
                (i.lang = t || "en-US")),
              i.secondField && i.singleDate && (i.singleDate = !1),
              i.hoveringTooltip && i.singleDate && (i.hoveringTooltip = !1),
              "[object Object]" === Object.prototype.toString.call(e.locale) &&
                (i.locale = Object.assign({}, s.locale, e.locale)),
              window.innerWidth < 480 &&
                1 < i.numberOfMonths &&
                ((i.numberOfMonths = 1), (i.numberOfColumns = 1)),
              i.repick && !i.secondField && (i.repick = !1),
              i.inline && ((i.autoclose = !1), (i.hideOnBodyClick = !1)),
              (this._opts = Object.assign({}, i)),
              this.syncFields(),
              this.setStartDate(this._opts.startDate, !0),
              this.setEndDate(this._opts.endDate, !0),
              this._opts
            );
          },
          syncFields: function () {
            var e;
            this._opts.singleDate || this._opts.secondField
              ? (p(this._opts.field.value, this._opts.format).isValid() &&
                  (this._opts.startDate = p(
                    this._opts.field.value,
                    this._opts.format,
                  )),
                this._opts.secondField &&
                  p(
                    this._opts.secondField.value,
                    this._opts.format,
                  ).isValid() &&
                  (this._opts.endDate = p(
                    this._opts.secondField.value,
                    this._opts.format,
                  )))
              : 2 ===
                  (e = this._opts.field.value.split(this._opts.separator))
                    .length &&
                (p(e[0], this._opts.format).isValid() &&
                  (this._opts.startDate = p(e[0], this._opts.format)),
                p(e[1], this._opts.format).isValid()) &&
                (this._opts.endDate = p(e[1], this._opts.format));
          },
          swapDate: function () {
            var e = p(this._opts.startDate);
            this.setDateRange(this._opts.endDate, e);
          },
          gotoToday: function () {
            this.gotoDate(new Date());
          },
          gotoDate: function (e) {
            ((e = (e = p(e, this._opts.format)).isValid() ? e : p()).set(
              "date",
              1,
            ),
              (this._opts.calendar = [p(e)]),
              t(this.el, this._opts));
          },
          gotoMonth: function (e) {
            isNaN(e) ||
              (this._opts.calendar[0].set("month", e), t(this.el, this._opts));
          },
          gotoYear: function (e) {
            isNaN(e) ||
              (this._opts.calendar[0].set("year", e), t(this.el, this._opts));
          },
          prevMonth: function () {
            ((this._opts.calendar[0] = p(this._opts.calendar[0]).subtract(
              this._opts.numberOfMonths,
              "month",
            )),
              t(this.el, this._opts),
              n(this.el, this._opts));
          },
          nextMonth: function () {
            ((this._opts.calendar[0] = p(this._opts.calendar[1])),
              t(this.el, this._opts),
              n(this.el, this._opts));
          },
          updatePosition: function () {
            var e, t, i, s, n;
            this.el.classList.contains("lightpick--inlined") ||
              (this.el.classList.remove("is-hidden"),
              (e = this._opts.field.getBoundingClientRect()),
              (t = this.el.getBoundingClientRect()),
              "auto" != (i = this._opts.orientation.split(" "))[(n = s = 0)] &&
              /top|bottom/.test(i[0])
                ? ((s = e[i[0]] + window.pageYOffset),
                  "top" == i[0] && (s -= t.height))
                : (s =
                    e.bottom + t.height > window.innerHeight &&
                    window.pageYOffset > t.height
                      ? e.top + window.pageYOffset - t.height
                      : e.bottom + window.pageYOffset),
              /left|right/.test(i[0]) ||
              (i[1] && "auto" != i[1] && /left|right/.test(i[1]))
                ? ((n = /left|right/.test(i[0])
                    ? e[i[0]] + window.pageXOffset
                    : e[i[1]] + window.pageXOffset),
                  ("right" != i[0] && "right" != i[1]) || (n -= t.width))
                : (n =
                    e.left + t.width > window.innerWidth
                      ? e.right + window.pageXOffset - t.width
                      : e.left + window.pageXOffset),
              this.el.classList.add("is-hidden"),
              (this.el.style.top = s + "px"),
              (this.el.style.left = n + "px"));
          },
          setStartDate: function (e, t) {
            var i = p(e, p.ISO_8601),
              e = p(e, this._opts.format);
            i.isValid() || e.isValid()
              ? ((this._opts.startDate = p(i.isValid() ? i : e)),
                this._opts.singleDate || this._opts.secondField
                  ? (this._opts.field.value = this._opts.startDate.format(
                      this._opts.format,
                    ))
                  : (this._opts.field.value =
                      this._opts.startDate.format(this._opts.format) +
                      this._opts.separator +
                      "..."),
                t ||
                  "function" != typeof this._opts.onSelect ||
                  this._opts.onSelect.call(
                    this,
                    this.getStartDate(),
                    this.getEndDate(),
                  ),
                t ||
                  this._opts.singleDate ||
                  "function" != typeof this._opts.onSelectStart ||
                  this._opts.onSelectStart.call(this, this.getStartDate()))
              : ((this._opts.startDate = null), (this._opts.field.value = ""));
          },
          setEndDate: function (e, t) {
            var i = p(e, p.ISO_8601),
              e = p(e, this._opts.format);
            i.isValid() || e.isValid()
              ? ((this._opts.endDate = p(i.isValid() ? i : e)),
                this._opts.secondField
                  ? ((this._opts.field.value = this._opts.startDate.format(
                      this._opts.format,
                    )),
                    (this._opts.secondField.value = this._opts.endDate.format(
                      this._opts.format,
                    )))
                  : (this._opts.field.value =
                      this._opts.startDate.format(this._opts.format) +
                      this._opts.separator +
                      this._opts.endDate.format(this._opts.format)),
                t ||
                  "function" != typeof this._opts.onSelect ||
                  this._opts.onSelect.call(
                    this,
                    this.getStartDate(),
                    this.getEndDate(),
                  ),
                t ||
                  this._opts.singleDate ||
                  "function" != typeof this._opts.onSelectEnd ||
                  this._opts.onSelectEnd.call(this, this.getEndDate()))
              : ((this._opts.endDate = null),
                this._opts.secondField
                  ? (this._opts.secondField.value = "")
                  : !this._opts.singleDate &&
                    this._opts.startDate &&
                    (this._opts.field.value =
                      this._opts.startDate.format(this._opts.format) +
                      this._opts.separator +
                      "..."));
          },
          setDate: function (e, t) {
            this._opts.singleDate &&
              (this.setStartDate(e, t), this.isShowing) &&
              o(this.el, this._opts);
          },
          setDateRange: function (e, t, i) {
            this._opts.singleDate ||
              (this.setStartDate(e, !0),
              this.setEndDate(t, !0),
              this.isShowing && o(this.el, this._opts),
              i) ||
              "function" != typeof this._opts.onSelect ||
              this._opts.onSelect.call(
                this,
                this.getStartDate(),
                this.getEndDate(),
              );
          },
          setDisableDates: function (e) {
            ((this._opts.disableDates = e),
              this.isShowing && o(this.el, this._opts));
          },
          getStartDate: function () {
            return p(this._opts.startDate).isValid()
              ? this._opts.startDate.clone()
              : null;
          },
          getEndDate: function () {
            return p(this._opts.endDate).isValid()
              ? this._opts.endDate.clone()
              : null;
          },
          getDate: function () {
            return p(this._opts.startDate).isValid()
              ? this._opts.startDate.clone()
              : null;
          },
          toString: function (e) {
            return this._opts.singleDate
              ? p(this._opts.startDate).isValid()
                ? this._opts.startDate.format(e)
                : ""
              : p(this._opts.startDate).isValid() &&
                  p(this._opts.endDate).isValid()
                ? this._opts.startDate.format(e) +
                  this._opts.separator +
                  this._opts.endDate.format(e)
                : p(this._opts.startDate).isValid() &&
                    !p(this._opts.endDate).isValid()
                  ? this._opts.startDate.format(e) +
                    this._opts.separator +
                    "..."
                  : !p(this._opts.startDate).isValid() &&
                      p(this._opts.endDate).isValid()
                    ? "..." +
                      this._opts.separator +
                      this._opts.endDate.format(e)
                    : "";
          },
          show: function (e) {
            this.isShowing ||
              ((this.isShowing = !0),
              this._opts.repick && (this._opts.repickTrigger = e),
              this.syncFields(),
              this._opts.secondField &&
              this._opts.secondField === e &&
              this._opts.endDate
                ? this.gotoDate(this._opts.endDate)
                : this.gotoDate(this._opts.startDate || this._opts.minDate),
              f.addEventListener("mousedown", this._onClick),
              this.updatePosition(),
              this.el.classList.remove("is-hidden"),
              "function" == typeof this._opts.onOpen &&
                this._opts.onOpen.call(this));
          },
          hide: function () {
            this.isShowing &&
              ((this.isShowing = !1),
              f.removeEventListener("mousedown", this._onClick),
              this.el.classList.add("is-hidden"),
              (this.el.querySelector(".lightpick__tooltip").style.visibility =
                "hidden"),
              "function" == typeof this._opts.onClose) &&
              this._opts.onClose.call(this);
          },
          destroy: function () {
            var e = this._opts;
            (this.hide(),
              this.el.removeEventListener("mousedown", self._onMouseDown, !0),
              this.el.removeEventListener("mouseenter", self._onMouseEnter, !0),
              this.el.removeEventListener("touchend", self._onMouseDown, !0),
              this.el.removeEventListener("change", self._onChange, !0),
              e.field.removeEventListener("change", this._onInputChange),
              e.field.removeEventListener("click", this._onInputClick),
              e.field.removeEventListener("focus", this._onInputFocus),
              e.secondField &&
                (e.secondField.removeEventListener(
                  "change",
                  this._onInputChange,
                ),
                e.secondField.removeEventListener("click", this._onInputClick),
                e.secondField.removeEventListener("focus", this._onInputFocus)),
              this.el.parentNode && this.el.parentNode.removeChild(this.el));
          },
          reset: function () {
            (this.setStartDate(null, !0),
              this.setEndDate(null, !0),
              o(this.el, this._opts),
              "function" == typeof this._opts.onSelect &&
                this._opts.onSelect.call(
                  this,
                  this.getStartDate(),
                  this.getEndDate(),
                ),
              (this.el.querySelector(".lightpick__tooltip").style.visibility =
                "hidden"));
          },
          reloadOptions: function (e) {
            var t = this._opts.dropdowns,
              i = this._opts.locale;
            (Object.assign(this._opts, this._opts, e),
              Object.assign(this._opts.dropdowns, t, e.dropdowns),
              Object.assign(this._opts.locale, i, e.locale));
          },
        }),
        e
      );
    }),
    (Ps = Es).exports
      ? ((x =
          "undefined" != typeof window && void 0 !== window.moment
            ? window.moment
            : Ls()),
        (Ps.exports = T(x)))
      : (S.Lightpick = T(S.moment)));
  var Ps = Es.exports,
    x = Ls();
  Ls().defineLocale("en-au", {
    months:
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_",
      ),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_",
    ),
    weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat: {
      LT: "h:mm A",
      LTS: "h:mm:ss A",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY h:mm A",
      LLLL: "dddd, D MMMM YYYY h:mm A",
    },
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (e) {
      var t = e % 10;
      return (
        e +
        (1 == ~~((e % 100) / 10)
          ? "th"
          : 1 == t
            ? "st"
            : 2 == t
              ? "nd"
              : 3 == t
                ? "rd"
                : "th")
      );
    },
    week: { dow: 0, doy: 4 },
  });
  Ls().defineLocale("vi", {
    months:
      "thĂ¡ng 1_thĂ¡ng 2_thĂ¡ng 3_thĂ¡ng 4_thĂ¡ng 5_thĂ¡ng 6_thĂ¡ng 7_thĂ¡ng 8_thĂ¡ng 9_thĂ¡ng 10_thĂ¡ng 11_thĂ¡ng 12".split(
        "_",
      ),
    monthsShort:
      "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split(
        "_",
      ),
    monthsParseExact: !0,
    weekdays:
      "chá»§ nháº­t_thá»© hai_thá»© ba_thá»© tÆ°_thá»© nÄƒm_thá»© sĂ¡u_thá»© báº£y".split(
        "_",
      ),
    weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysParseExact: !0,
    meridiemParse: /sa|ch/i,
    isPM: function (e) {
      return /^ch$/i.test(e);
    },
    meridiem: function (e, t, i) {
      return e < 12 ? (i ? "sa" : "SA") : i ? "ch" : "CH";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM [nÄƒm] YYYY",
      LLL: "D MMMM [nÄƒm] YYYY HH:mm",
      LLLL: "dddd, D MMMM [nÄƒm] YYYY HH:mm",
      l: "DD/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd, D MMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[HĂ´m nay lĂºc] LT",
      nextDay: "[NgĂ y mai lĂºc] LT",
      nextWeek: "dddd [tuáº§n tá»›i lĂºc] LT",
      lastDay: "[HĂ´m qua lĂºc] LT",
      lastWeek: "dddd [tuáº§n trÆ°á»›c lĂºc] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "%s tá»›i",
      past: "%s trÆ°á»›c",
      s: "vĂ i giĂ¢y",
      ss: "%d giĂ¢y",
      m: "má»™t phĂºt",
      mm: "%d phĂºt",
      h: "má»™t giá»",
      hh: "%d giá»",
      d: "má»™t ngĂ y",
      dd: "%d ngĂ y",
      w: "má»™t tuáº§n",
      ww: "%d tuáº§n",
      M: "má»™t thĂ¡ng",
      MM: "%d thĂ¡ng",
      y: "má»™t nÄƒm",
      yy: "%d nÄƒm",
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (e) {
      return e;
    },
    week: { dow: 1, doy: 4 },
  });
  var T = -1 < navigator.userAgent.indexOf("Firefox");
  const js = -1 < navigator.userAgent.indexOf("Chrome"),
    C =
      !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
        navigator.userAgent,
      );
  (jQuery(".loading").length, jQuery(".hero").length);
  let D;
  const M = 1023 < jQuery(window).width();
  var S = 76 < jQuery(window).width();
  let Ys = 0.01 * window.innerHeight,
    zs =
      (document.documentElement.style.setProperty("--vh", Ys + "px"),
      window.addEventListener("resize", () => {
        ((Ys = 0.01 * window.innerHeight),
          document.documentElement.style.setProperty("--vh", Ys + "px"));
      }),
      M &&
        (".footer".length &&
          (jQuery("body").css(
            "margin-bottom",
            jQuery(".footer-bottom").innerHeight() / 2,
          ),
          jQuery(window).on("resize", function () {
            jQuery("body").css(
              "margin-bottom",
              jQuery(".footer-bottom").innerHeight() / 2,
            );
          })),
        jQuery(window).on("resize", function () {
          jQuery("body").css(
            "margin-bottom",
            jQuery(".footer-bottom").innerHeight(),
          );
        })),
      0);
  if (
    (jQuery(window).on("scroll", function () {
      var e = jQuery(window).scrollTop(),
        t = jQuery("tag-menu"),
        i = jQuery(".book-button-mobile"),
        s =
          jQuery(".wrapper-tag-sticky").length &&
          jQuery(".wrapper-tag-sticky").offset().top;
      (e > zs + 1
        ? (jQuery(".header, .contact-social").addClass("active-scroll"),
          t && jQuery(".tag-menu").removeClass("active-scroll"),
          i && jQuery(".book-button-mobile").addClass("active-scroll"))
        : e < zs - 20 &&
          (jQuery(".header,.contact-social").removeClass("active-scroll"),
          s <= e && t && jQuery(".tag-menu").addClass("active-scroll"),
          i) &&
          jQuery(".book-button-mobile").removeClass("active-scroll"),
        e < s && t && jQuery(".tag-menu").removeClass("active-scroll"),
        e <= 0 &&
          (jQuery(".header, .contact-social, .book-button-mobile").removeClass(
            "active-scroll",
          ),
          t) &&
          jQuery(".tag-menu").removeClass("active-scroll"),
        (zs = e));
    }),
    !S)
  ) {
    let t = 0;
    jQuery(window).on("scroll", function () {
      var e = jQuery(window).scrollTop();
      (e > t + 1
        ? jQuery("header").addClass("active-scroll")
        : e < t - 30 && jQuery("header").removeClass("active-scroll"),
        e <= 0 && jQuery("header").removeClass("active-scroll"),
        (t = e));
    });
  }
  function As() {
    (Qs && D.stop(), Qs || jQuery("body").addClass("scroll-hidden"));
  }
  function Ns() {
    (Qs && D.start(), Qs || jQuery("body").removeClass("scroll-hidden"));
  }
  (T && jQuery("body").addClass("is-firefox"),
    js && jQuery("body").addClass("is-chrome"),
    C && jQuery("body").addClass("is-mobile"));
  let k, E;
  function Vs(e, t) {
    (e.isEnd && gsap.to(t, { opacity: 0.1 }),
      e.isBeginning && gsap.to(t, { opacity: 1 }));
  }
  function Gs(e, t) {
    (e.isEnd && gsap.to(t, { opacity: 1 }),
      e.isBeginning && gsap.to(t, { opacity: 0.1 }));
  }
  if (
    (jQuery(".home-slider").length &&
      new d(".home-slider", {
        modules: [ve, e, t],
        speed: 900,
        loop: 1 < jQuery(".contact-slider .swiper-slide").length,
        lazy: !0,
        autoplay: { delay: 3e3 },
        effect: "fade",
        crossFade: !0,
        on: {
          init: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionStart: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionEnd: function () {
            jQuery(this.slides[this.activeIndex]);
          },
        },
      }),
    jQuery(".contact-slider").length &&
      ((k = new d(".contact-slider", {
        modules: [fe, e, t],
        direction: "horizontal",
        speed: 900,
        loop: 1 < jQuery(".contact-slider .swiper-slide").length,
        lazy: !0,
        autoplay: { delay: 3e3, pauseOnMouseEnter: !0 },
        slidesPerView: 1.75,
        spaceBetween: 80,
        centeredSlides: !0,
        initialSlide: 1,
        parallax: !0,
        breakpoints: {
          320: { slidesPerView: 1.5, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 36 },
          1024: { slidesPerView: 2, spaceBetween: 48 },
          1280: { slidesPerView: 2, spaceBetween: 56 },
        },
        on: {
          init: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionStart: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionEnd: function () {
            jQuery(this.slides[this.activeIndex]);
          },
        },
      })),
      C ||
        jQuery(".magic-cursor-slider.contact-slider").on("click", function (e) {
          e.clientX - jQuery(this).offset().left > jQuery(this).width() / 2
            ? (k.slideNext(), k.isEnd && gsap.to("#ball", { opacity: 0.1 }))
            : (k.slidePrev(),
              k.isBeginning && gsap.to("#ball", { opacity: 0.1 }));
        })),
    jQuery(".footer-slider").length &&
      new d(".footer-slider", {
        modules: [e, t],
        direction: "horizontal",
        speed: 900,
        loop: 1 < jQuery(".footer-slider .swiper-slide").length,
        lazy: !0,
        slidesPerView: 2,
      }),
    jQuery(".offers-slider").length &&
      new d(".offers-slider", {
        modules: [fe, e, t],
        direction: "horizontal",
        speed: 900,
        loop: 1 < jQuery(".offers-slider .swiper-slide").length,
        lazy: !0,
        autoplay: { delay: 3e3, pauseOnMouseEnter: !0 },
        parallax: !0,
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }),
    jQuery(".detail-slider").length &&
      ((E = new d(".detail-slider", {
        modules: [fe, e, t],
        direction: "horizontal",
        speed: 900,
        loop: 1 < jQuery(".detail-slider .swiper-slide").length,
        lazy: !0,
        autoplay: { delay: 3e3, pauseOnMouseEnter: !0 },
        slidesPerView: 1.75,
        spaceBetween: 80,
        centeredSlides: !0,
        parallax: !0,
        initialSlide: 1,
        breakpoints: {
          320: { slidesPerView: 1.2, spaceBetween: 24 },
          768: { slidesPerView: 1.5, spaceBetween: 36 },
          1024: { slidesPerView: 1.5, spaceBetween: 48 },
          1280: { slidesPerView: 1.8, spaceBetween: 48 },
        },
        on: {
          init: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionStart: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionEnd: function () {
            jQuery(this.slides[this.activeIndex]);
          },
        },
      })),
      C ||
        jQuery(".magic-cursor-slider.detail-slider").on("click", function (e) {
          e.clientX - jQuery(this).offset().left > jQuery(this).width() / 2
            ? (E.slideNext(), E.isEnd && gsap.to("#ball", { opacity: 0.1 }))
            : (E.slidePrev(),
              E.isBeginning && gsap.to("#ball", { opacity: 0.1 }));
        })),
    jQuery(".other-slider").length &&
      (new d(".other-slider", {
        modules: [e, t],
        direction: "horizontal",
        speed: 900,
        loop: 1 < jQuery(".other-slider .swiper-slide").length,
        lazy: !0,
        autoplay: { delay: 3e3, pauseOnMouseEnter: !0 },
        slidesPerView: 2,
        spaceBetween: 64,
        parallax: !0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 24 },
          768: { slidesPerView: 1, spaceBetween: 36 },
          1024: { slidesPerView: 2, spaceBetween: 48 },
        },
        on: {
          init: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionStart: function () {
            jQuery(this.slides[this.activeIndex]);
          },
          transitionEnd: function () {
            jQuery(this.slides[this.activeIndex]);
          },
        },
      }),
      (Es = jQuery(".other-slider .swiper-slide .tt-image img").height()),
      jQuery(".other-slider-button").css("top", Es / 2)),
    jQuery("#gallery").length)
  ) {
    if (C && !M) {
      S = document.getElementById("gallery");
      (S.addEventListener("lgInit", (e) => {
        const t = e.detail.instance;
        e = t.outer.find(".lg-content");
        (e.append(`<div class="lg-custom-wrapper">
                                <button type="button" id="lg-toolbar-prev" aria-label="Previous slide" class="lg-toolbar-prev lg-icon button-slider">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                    <g>
                                      <circle cx="28" cy="28" r="27.5" stroke="#011A10"/>
                                      <path d="M16 27.8367C30.9388 27.8367 40 27.8367 40 27.8367M40 27.8367C37.8708 27.4837 33.3011 25.4222 32.0558 20M40 27.8367C37.8708 28.3133 33.3011 30.5478 32.0558 35.6735" stroke="#011A10"/>
                                    </g>
                                  </svg>
                                </button>
                                <button type="button" id="lg-toolbar-next" aria-label="Next slide" class="lg-toolbar-next lg-icon button-slider ">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                    <g>
                                      <circle cx="28" cy="28" r="27.5" stroke="#011A10"/>
                                      <path d="M16 27.8367C30.9388 27.8367 40 27.8367 40 27.8367M40 27.8367C37.8708 27.4837 33.3011 25.4222 32.0558 20M40 27.8367C37.8708 28.3133 33.3011 30.5478 32.0558 35.6735" stroke="#011A10"/>
                                    </g>
                                  </svg>
                                </button>
                              </div>`),
          e.append(`
          <div class="lg-custom-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="39" viewBox="0 0 27 39" fill="none">
              <path d="M1 7L26 31" stroke="#B88D2E"/>
              <path d="M2.38623 32.1836L25.2964 6.1089" stroke="#B88D2E"/>
            </svg>
          </div>
        `),
          jQuery("#lg-toolbar-prev").on("click", () => {
            t.goToPrevSlide();
          }),
          jQuery("#lg-toolbar-next").on("click", () => {
            t.goToNextSlide();
          }),
          jQuery(".lg-custom-close").on("click", () => {
            t.closeGallery();
          }));
      }),
        S.addEventListener("lgBeforeOpen", () => {
          As();
        }),
        S.addEventListener("lgBeforeClose", () => {
          Ns();
        }));
    }
    ((T = document.getElementById("gallery")),
      new ki(T, {
        selector: ".lg-trigger",
        mode: "lg-fade",
        height: "90%",
        width: "80%",
        iframeMaxWidth: "100%",
        loop: !0,
        speed: 500,
        closable: !0,
        escKey: !0,
        keyPress: !0,
        hideBarsDelay: 3e3,
        controls: !0,
        mousewheel: !0,
        download: !1,
        counter: !0,
        swipeThreshold: 50,
        enableDrag: !0,
        enableTouch: !0,
        getCaptionFromTitleOrAlt: !1,
        zoom: !1,
        scale: 0.5,
        enableZoomAfter: 50,
        videoMaxWidth: "1400px",
        loadYoutubeThumbnail: !0,
        youtubeThumbSize: "default",
        youtubePlayerParams: { modestbranding: 0, showinfo: 1, controls: 1 },
        loadVimeoThumbnail: !0,
        vimeoThumbSize: "thumbnail_medium",
        vimeoPlayerParams: {
          byline: 1,
          portrait: 1,
          title: 1,
          color: "CCCCCC",
          autopause: 1,
        },
        plugins: [Ai, qi],
      }));
  }
  const Qs = jQuery("body").hasClass("tt-scroll-smooth") && js;
  if (
    (Qs &&
      M &&
      (gsap.registerPlugin(ScrollTrigger),
      (D = new Ce({
        duration: jQuery("body").data("lenis-duration")
          ? jQuery("body").data("lenis-duration")
          : 0.5,
        lerp: 0,
      })),
      requestAnimationFrame(function e(t) {
        (D.raf(t), requestAnimationFrame(e));
      }),
      jQuery("body").hasClass("tt-transition") && D.stop(),
      D.on("scroll", ScrollTrigger.update),
      gsap.ticker.add((e) => {
        D.raf(1e3 * e);
      })),
    jQuery("body").hasClass("tt-scroll-social") && !M)
  ) {
    let t = 0;
    jQuery(window).on("scroll", function () {
      var e = jQuery(window).scrollTop();
      (e > t + 1
        ? jQuery(".book-button, .contact-social").addClass("active-scroll")
        : e < t - 30 &&
          jQuery(".book-button, .contact-social").removeClass("active-scroll"),
        (t = e));
    });
  }
  if (
    (jQuery("body").hasClass("tt-transition") &&
      (jQuery(window).scrollTop(),
      jQuery(window).on("DOMContentLoaded", function () {}),
      (window.onpageshow = function (e) {
        e.persisted && window.location.reload();
      }),
      jQuery("a")
        .not('[target="_blank"]')
        .not('[href^="#"]')
        .not('[href^="mailto"]')
        .not('[href^="tel"]')
        .not(".lg-trigger")
        .not(".no-transition")
        .on("click", function (e) {
          (e.preventDefault(),
            jQuery(this).data("hash") &&
              localStorage.setItem("hashLink", jQuery(this).data("hash")),
            setTimeout(
              function (e) {
                window.location = e;
              },
              1800,
              this.href,
            ));
        })),
    jQuery("body").not(".is-mobile").hasClass("tt-magic-cursor"))
  ) {
    let t = { x: 0, y: 0 },
      r = { x: 0, y: 0 },
      i = !1,
      a = jQuery("#ball");
    (jQuery(".magnetic-item").wrap('<div class="magnetic-wrap"></div>'),
      jQuery("a.magnetic-item").length &&
        jQuery("a.magnetic-item").addClass("not-hide-cursor"),
      gsap.set(a, {
        xPercent: -50,
        yPercent: -50,
        width: 1,
        height: 1,
        borderWidth: 2,
        opacity: 1,
        backgroundColor: "#ffffff",
      }),
      document.addEventListener("mousemove", function (e) {
        ((t.x = e.clientX), (t.y = e.clientY));
      }),
      gsap.ticker.add(function () {
        i ||
          ((r.x += 0.15 * (t.x - r.x)),
          (r.y += 0.15 * (t.y - r.y)),
          gsap.set(a, { x: r.x, y: r.y }));
      }),
      jQuery(".magnetic-wrap").mousemove(function (e) {
        ((n = e),
          (s = 2),
          (i = (i = this).getBoundingClientRect()),
          (t = n.clientX - i.left),
          (n = n.clientY - i.top),
          (r.x = i.left + i.width / 2 + (t - i.width / 2) / s),
          (r.y = i.top + i.height / 2 + (n - i.height / 2) / s),
          gsap.to(a, { duration: 0.3, x: r.x, y: r.y }));
        var t = e,
          i = (n = this),
          s = n.querySelector(".magnetic-item"),
          e = 25,
          i = i.getBoundingClientRect(),
          n = t.clientX - i.left,
          t = t.clientY - i.top;
        gsap.to(s, {
          duration: 0.3,
          x: ((n - i.width / 2) / i.width) * e,
          y: ((t - i.height / 2) / i.height) * e,
          ease: Power2.easeOut,
        });
      }),
      jQuery(".magnetic-wrap")
        .on("mouseenter", function (e) {
          (gsap.to(a, {
            duration: 0.3,
            width: 2 * jQuery(this).children().width(),
            height: 2 * jQuery(this).children().width(),
            borderWidth: 1,
            opacity: 1,
          }),
            (i = !0));
        })
        .on("mouseleave", function (e) {
          (gsap.to(a, {
            duration: 0.3,
            width: 1,
            height: 1,
            borderWidth: 2,
            opacity: 1,
          }),
            gsap.to(this.querySelector(".magnetic-item"), {
              duration: 0.3,
              x: 0,
              y: 0,
              clearProps: "all",
            }),
            (i = !1));
        }),
      jQuery(".cursor-page-nav").each(function () {
        jQuery(this).find(".cursor-pn-image").length
          ? (jQuery(this)
              .on("mouseenter mouseover", function () {
                (jQuery("#magic-cursor").addClass("pn-hover-on"),
                  jQuery(this).find(".cursor-pn-image").appendTo(a),
                  gsap.to(a, {
                    duration: 0.3,
                    width: "20vw",
                    height: "20vw",
                    opacity: 1,
                  }),
                  a.find(".cursor-pn-image video").each(function () {
                    jQuery(this).get(0).play();
                  }),
                  jQuery(this).parents(".modal") &&
                    jQuery("#magic-cursor").appendTo(
                      jQuery(this).parents(".modal"),
                    ));
              })
              .on("mouseleave", function () {
                (jQuery("#magic-cursor").removeClass("pn-hover-on"),
                  a.find(".cursor-pn-image").appendTo(this),
                  gsap.to(a, {
                    duration: 0.3,
                    width: 1,
                    height: 1,
                    opacity: 1,
                  }),
                  jQuery(this)
                    .parent()
                    .find(".cursor-pn-image video")
                    .each(function () {
                      jQuery(this).get(0).pause();
                    }),
                  jQuery(this)
                    .parents(".modal")
                    .find(jQuery("#magic-cursor"))
                    .appendTo("body"));
              }),
            jQuery(this).addClass("not-hide-cursor"))
          : jQuery(this).removeClass("not-hide-cursor");
      }),
      jQuery("[data-cursor]").each(function () {
        (jQuery(this)
          .on("mouseenter", function () {
            var e = jQuery(".magic-cursor-slider:hover").length;
            (e &&
              (a.find(".ball-view").remove(),
              a.append('<div class="ball-view"></div>'),
              jQuery(".ball-view").append(jQuery(this).attr("data-cursor")),
              gsap.to(ball, { opacity: 1 }),
              gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 })),
              e ||
                (a.append('<div class="ball-view"></div>'),
                jQuery(".ball-view").append(jQuery(this).attr("data-cursor")),
                gsap.to(ball, {
                  duration: 0.3,
                  width: jQuery(this).data("cursor-size")
                    ? jQuery(this).data("cursor-size")
                    : 125,
                  height: jQuery(this).data("cursor-size")
                    ? jQuery(this).data("cursor-size")
                    : 125,
                  opacity: 1,
                  borderWidth: 1,
                  borderColor: jQuery(this).data("cursor-border-color")
                    ? jQuery(this).data("cursor-border-color")
                    : "#ffffff",
                  backgroundColor: "#fff",
                }),
                gsap.to(ball, { borderWidth: 0, duration: 0 }),
                gsap.to(".ball-view", {
                  duration: 0.3,
                  scale: 1,
                  autoAlpha: 1,
                })));
          })
          .on("mouseleave", function () {
            var e = jQuery(".magic-cursor-slider:hover").length;
            (e &&
              (a.find(".ball-view").remove(),
              a.append('<div class="ball-view"></div>'),
              jQuery(".ball-view").append('<div class="cursor-slider"></div>'),
              gsap.to(ball, { borderWidth: 0, duration: 0 }),
              gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 })),
              e ||
                (gsap.to(ball, {
                  duration: 0.3,
                  yPercent: -50,
                  width: 1,
                  height: 1,
                  opacity: 1,
                  borderWidth: 2,
                  backgroundColor: "#fff",
                }),
                gsap.to(".ball-view", {
                  duration: 0.3,
                  scale: 0,
                  autoAlpha: 0,
                  clearProps: "all",
                }),
                a.find(".ball-view").remove()));
          }),
          jQuery(this).addClass("not-hide-cursor"));
      }),
      jQuery(".magic-cursor-slider").each(function () {
        (jQuery(this)
          .on("mouseenter", function () {
            (a.append('<div class="ball-view"></div>'),
              jQuery(".ball-view").append('<div class="cursor-slider"></div>'),
              gsap.to(ball, {
                duration: 0.3,
                yPercent: -75,
                width: 95,
                height: 95,
                opacity: 1,
                borderWidth: 1,
              }),
              gsap.to(ball, { borderWidth: 0, duration: 0 }),
              gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 }));
          })
          .on("mouseleave", function () {
            (jQuery("#magic-cursor").removeClass("!mix-blend-normal"),
              gsap.to(ball, {
                duration: 0.3,
                yPercent: -50,
                width: 1,
                height: 1,
                opacity: 1,
              }),
              gsap.to(".ball-view", {
                duration: 0.3,
                scale: 0,
                autoAlpha: 0,
                clearProps: "all",
              }),
              a.find(".ball-view").remove());
          })
          .on("mousemove", function (e) {
            e.clientX - jQuery(this).offset().left > jQuery(this).width() / 2
              ? (jQuery(".ball-view .cursor-slider").removeClass("prev"),
                jQuery(this).hasClass("detail-slider") &&
                  1 !== a.find(".cursor-pn-discover").length &&
                  Vs(E, ball),
                jQuery(this).hasClass("contact-slider") &&
                  1 !== a.find(".cursor-pn-discover").length &&
                  Vs(k, ball))
              : (jQuery(".ball-view .cursor-slider").addClass("prev"),
                jQuery(this).hasClass("detail-slider") &&
                  1 !== a.find(".cursor-pn-discover").length &&
                  Gs(E, ball),
                jQuery(this).hasClass("contact-slider") &&
                  1 !== a.find(".cursor-pn-discover").length &&
                  Gs(k, ball));
          }),
          jQuery(this).addClass("not-hide-cursor hide-cursor"),
          jQuery(this)
            .find(".swiper-button-prev,.swiper-button-next")
            .addClass("not-hide-cursor"));
      }),
      jQuery(
        "a, button,.hide-cursor,.more-button,.main-button,.filter-button,.custom-select,.swiper-button-prev,.swiper-button-next",
      )
        .not(".not-hide-cursor")
        .on("mouseenter", function () {
          gsap.to(a, { duration: 0.3, scale: 0, opacity: 0 });
        })
        .on("mouseleave", function () {
          gsap.to(a, { duration: 0.3, scale: 1, opacity: 1 });
        }),
      jQuery(document)
        .on("mouseleave", function () {
          gsap.to("#magic-cursor", { duration: 0.3, opacity: 0 });
        })
        .on("mouseenter", function () {
          gsap.to("#magic-cursor", { duration: 0.3, opacity: 1 });
        }),
      jQuery(document).mousemove(function () {
        gsap.to("#magic-cursor", { duration: 0.3, opacity: 1 });
      }));
  }
  if (
    (new Ht({
      elements_selector: ".tt-lazy",
      use_native: !0,
      callback_error: (e) => {
        (e.setAttribute(
          "srcset",
          "fallback_image@1x.jpg 1x, fallback_image@2x.jpg 2x",
        ),
          e.setAttribute("src", "fallback_image@1x.jpg"));
      },
    }),
    jQuery("[data-split-text]").length &&
      (jQuery("[data-split-text]").length &&
        !M &&
        jQuery("[data-split-text]")
          .lettering("words")
          .children("span")
          .lettering("words")
          .find("span:empty")
          .parent()
          .remove(),
      jQuery('[data-split-text="words"]').length &&
        M &&
        jQuery('[data-split-text="words"]')
          .lettering("words")
          .children("span")
          .lettering("words")
          .find("span:empty")
          .parent()
          .remove(),
      jQuery('[data-split-text="lines"]').length &&
        M &&
        jQuery('[data-split-text="lines"]').children("span").lettering("lines"),
      jQuery('[data-split-text="wordchars"]').length &&
        M &&
        ((Es = jQuery('[data-split-text="wordchars"]'))
          .lettering("words")
          .find("span:empty")
          .remove(),
        Es.children("span").lettering()),
      jQuery('[data-split-text="linesWordchars"]').length) &&
      ((S = jQuery('[data-split-text="linesWordchars"]'))
        .children("span")
        .lettering("lines"),
      S.children("span").lettering("words").find("span:empty").remove(),
      S.find("span span").lettering()),
    jQuery(".anim-parallax__item").length &&
      jQuery(".anim-parallax__item").each(function () {
        var e = jQuery(this);
        gsap.to(e, {
          yPercent: e.data("speed") ? e.data("speed") : 35,
          ease: "none",
          scrollTrigger: {
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            scrub: !0,
            markers: !1,
          },
        });
      }),
    jQuery("[data-fade-right-text]").length &&
      jQuery("[data-fade-right-text]").each(function (e, t) {
        var i = jQuery(this),
          s = gsap.timeline({
            scrollTrigger: {
              trigger: i.children("span"),
              start: "top bottom",
              markers: !1,
              once: !0,
              ease: Expo.easeIn,
            },
          });
        (gsap.set(i.find("span span"), { x: 20, opacity: 0 }),
          s.to(i.find("span span"), {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: {
              amount: i.data("stagger") ? i.data("stagger") : 1,
              from: "2",
            },
            delay: i.data("delay") ? i.data("delay") : 0,
            clearProps: "all",
          }));
      }),
    jQuery("[data-split-color-line]").length &&
      ((ki = jQuery("[data-split-color-line]"))
        .children("span")
        .each(function () {
          jQuery(this).append('<span class="text-mask"></span>');
        }),
      ki.each(function (e, t) {
        var i = jQuery(this),
          s = gsap.timeline({
            toggleActions: "play none none reverse",
            scrollTrigger: {
              trigger: i,
              start: "top 90%",
              end: "bottom 50%",
              markers: !1,
              scrub: 1,
            },
          });
        (i.find(".text-mask").addClass(i.data("split-color-line")),
          s.to(i.find(".text-mask"), { xPercent: 100 }));
      })),
    jQuery("[data-change-color-text]").length &&
      jQuery("[data-change-color-text]").each(function (e, t) {
        var i = jQuery(this);
        gsap.to(i.find("span span"), {
          color: i.data("color") ? i.data("color") : "var(--color-primary)",
          stagger: { amount: i.data("stagger") ? i.data("stagger") : 1 },
          ease: "power4.out",
          scrollTrigger: {
            trigger: i,
            start: i.data("start") ? i.data("start") : "top 90%",
            end: i.data("end") ? i.data("end") : "bottom 50%",
            markers: !1,
            scrub: !0,
          },
        });
      }),
    jQuery("[data-fade-in-item]").length &&
      jQuery("[data-fade-in-item]").each(function () {
        var e = jQuery(this);
        gsap.from(e, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 1,
          clearProps: "all",
          delay: e.data("delay") ? e.data("delay") : 0,
          scrollTrigger: {
            trigger: e,
            start: e.data("start")
              ? e.data("start")
              : M
                ? "top 70%"
                : "top bottom",
            scrub: !1,
            markers: !1,
            once: !0,
          },
        });
      }),
    jQuery("[data-fade-in-stagger-item]").length &&
      jQuery("[data-fade-in-stagger-item]").each(function () {
        var e = jQuery(this);
        gsap.from(e.children(), {
          opacity: 0,
          y: 20,
          stagger: e.data("stagger") ? e.data("stagger") : 0.3,
          duration: 1,
          clearProps: "all",
          scrollTrigger: {
            trigger: e,
            start: e.data("start")
              ? e.data("start")
              : M
                ? "top 70%"
                : "top bottom",
            scrub: !1,
            markers: !1,
            once: !0,
          },
        });
      }),
    jQuery("[data-fade-in-background]").length &&
      jQuery("[data-fade-in-background]").each(function () {
        const e = jQuery(this);
        gsap.to(e, {
          delay: e.data("delay") ? e.data("delay") : 0,
          scrollTrigger: {
            trigger: e,
            start: e.data("start")
              ? e.data("start")
              : M
                ? "top 70%"
                : "top bottom",
            scrub: !1,
            markers: !1,
            once: !0,
            toggleClass: { targets: e, className: "active-fade-in" },
          },
          onComplete: function () {
            setTimeout(() => {
              e.addClass("active-faded");
            }, 500);
          },
        });
      }),
    jQuery("[data-type]").length && M)
  ) {
    T = jQuery(".type").data("type").split(", ");
    const O = new ks(".type", {
      speed: 50,
      waitUntilVisible: !0,
      loop: !0,
      deleteSpeed: null,
    })
      .type(T[0])
      .pause(800)
      .delete()
      .pause(300)
      .type(T[1])
      .pause(800)
      .delete()
      .pause(300)
      .type(T[2])
      .pause(800)
      .delete();
    gsap.timeline({
      scrollTrigger: {
        trigger: "[data-type]",
        markers: !1,
        onEnter: () => {
          O.is("frozen") ? O.unfreeze() : O.go();
        },
        onEnterBack: () => O.unfreeze(),
        onLeave: () => O.freeze(),
        onLeaveBack: () => O.freeze(),
      },
    });
  }
  (jQuery(".tt-waves").length &&
    jQuery(".tt-waves").each(function () {
      const e = this;
      let i = this.getContext("2d"),
        t = window.devicePixelRatio || 1;
      var s = e.getAttribute("data-waves-color").split(", "),
        n = jQuery(window).width() < 767;
      let r = [],
        a = !1,
        o,
        l;
      u();
      var d = c(i, {
          amplitude: n ? 35 : 50,
          duration: 6,
          fillStyle: s[0],
          frequency: 3,
          width: o,
          height: l,
          segments: 100,
          waveHeight: 0.25 * l,
        }),
        n = c(i, {
          amplitude: n ? 30 : 100,
          duration: 4,
          fillStyle: s[1],
          frequency: 1.5,
          width: o,
          height: l,
          segments: 100,
          waveHeight: 0.25 * l,
        });
      function c(a, e) {
        let o = {
          amplitude: (e = e || {}).amplitude || 200,
          context: a,
          curviness: e.curviness || 0.75,
          duration: e.duration || 2,
          fillStyle: e.fillStyle || "rgba(33,150,243,1)",
          frequency: e.frequency || 4,
          height: e.height || 600,
          points: [],
          segments: e.segments || 100,
          tweens: [],
          waveHeight: e.waveHeight || 300,
          width: e.width || 800,
          x: e.x || 0,
          y: e.y || 0,
          init: t,
          resize: function (e, t) {
            ((o.width = e), (o.height = t));
            var i = o.points,
              s = i.length,
              n = o.width / o.segments;
            for (let e = 0; e < s; e++) i[e].x = o.x + e * n;
          },
          draw: function () {
            var t = o.points,
              i = t.length,
              s = l - 100,
              n = o.amplitude / 2;
            (a.beginPath(), a.moveTo(t[0].x, s + t[0].y * n));
            for (let e = 1; e < i; e++) {
              var r = t[e];
              a.lineTo(r.x, s + r.y * n);
            }
            (a.lineTo(o.x + o.width, o.y + o.height),
              a.lineTo(o.x, o.y + o.height),
              a.closePath(),
              (a.fillStyle = o.fillStyle),
              a.fill());
          },
          kill: r,
        };
        function r() {
          var t = o.tweens,
            i = t.length;
          for (let e = 0; e < i; e++) t[e].kill();
          ((t.length = 0), (o.points.length = 0));
        }
        function t() {
          r();
          var t = o.segments,
            i = o.width / t;
          for (let e = 0; e <= t; e++) {
            var s = e / t,
              n = { x: o.x + e * i, y: 1.25 },
              s = gsap
                .to(n, {
                  duration: o.duration,
                  y: -1,
                  repeat: -1,
                  yoyo: !0,
                  ease: "sine.inOut",
                })
                .progress(s * o.frequency);
            (o.tweens.push(s), o.points.push(n));
          }
        }
        return (t(), o);
      }
      function u() {
        ((o = window.innerWidth),
          (l = 767 < jQuery(window).width() ? 350 : 150),
          (e.width = o * t),
          (e.height = l * t),
          (e.style.width = o + "px"),
          (e.style.height = l + "px"),
          i.scale(t, t));
      }
      (r.push(d, n),
        gsap.to(r, {
          duration: 100,
          waveHeight: l / 2,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 1,
          yoyo: !0,
        }),
        gsap.to(d, {
          duration: 6,
          amplitude: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: !0,
        }),
        gsap.to(n, {
          duration: 30,
          amplitude: 50,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: !0,
        }),
        window.addEventListener("resize", () => {
          a = !0;
        }),
        gsap.ticker.add(function () {
          var t = r.length;
          if (a) {
            u();
            for (let e = 0; e < t; e++) r[e].resize(o, l);
            a = !1;
          }
          i.clearRect(0, 0, o, l);
          for (let e = 0; e < t; e++) r[e].draw();
        }),
        jQuery(window).on("resize", u()));
    }),
    jQuery(".accommodation-waves").length &&
      jQuery(window).on("load", function () {
        var e, t, i;
        ((e = jQuery('[data-filter-type="villas"]')),
          (t = e.innerHeight()),
          (i = M ? 350 : 180),
          (t = t * e.length + (M ? 208 : 80) * e.length),
          jQuery('[data-filter-type="villas"]').first().css("padding-top", i),
          jQuery(".accommodation-waves").css("height", t));
      }),
    jQuery("[data-map-area]").length &&
      !C &&
      (jQuery("[data-map-area] li")
        .on("mouseenter", function () {
          var e = jQuery(this),
            e =
              (e.addClass("opacity-100").siblings().addClass("opacity-20"),
              jQuery("[data-area]").removeClass("stroke-primary fill-primary"),
              jQuery("[data-area-number]").removeClass("fill-white"),
              e.data("map-area-number")),
            t = jQuery("[data-area='" + e + "']"),
            e = jQuery("[data-area-number='" + e + "']");
          (t.addClass("stroke-primary fill-primary"), e.addClass("fill-white"));
        })
        .on("mouseleave", function () {
          (jQuery(this)
            .removeClass("opacity-100")
            .siblings()
            .removeClass("opacity-20"),
            jQuery("[data-area]").removeClass("stroke-primary fill-primary"),
            jQuery("[data-area-number]").removeClass("fill-white"));
        }),
      jQuery("[data-map-area] li").each(function (e, t) {
        t.setAttribute("data-map-area-number", e);
      })),
    jQuery(".grid-hover").length &&
      M &&
      jQuery(".grid-hover")
        .on("mouseover", function () {
          jQuery(this)
            .css("transform", "scale(1.1)")
            .siblings()
            .css("transform", "scale(0.9)");
        })
        .on("mouseleave", function () {
          jQuery(this).css("transform", "").siblings().css("transform", "");
        }),
    jQuery(".hamburger").length &&
      jQuery(".hamburger").on("click", function (e) {
        (e.stopPropagation(),
          jQuery(".header,.nav-mobile,.hamburger").toggleClass("active"));
        e = jQuery(".nav-mobile").hasClass("active");
        (e &&
          (jQuery(".nav-mobile").css("transition-delay", "0s"),
          jQuery(".nav-mobile .custom-select").css(
            "transition-delay",
            0.1 * (jQuery(".nav-mobile .nav ul li").length + 5) + "s",
          ),
          As()),
          e ||
            (jQuery(".nav-mobile").css(
              "transition-delay",
              0.1 * jQuery(".nav-mobile .nav ul li").length + "s",
            ),
            jQuery(".nav-mobile .custom-select").css("transition-delay", "0s"),
            Ns()));
      }),
    jQuery(".modal").length &&
      (jQuery("[data-type-modal]").on("click", function (e) {
        (e.stopPropagation(), e.key);
        ((e = jQuery(this).data("type-modal")),
          (e = jQuery("[data-modal='" + e + "']")));
        (As(), e.toggleClass("active"));
      }),
      jQuery(".modal-close").on("click", function () {
        (jQuery(this).parents(".modal").removeClass("active"), Ns());
      }),
      jQuery(document).keyup(function (e) {
        "Escape" === e.key &&
          jQuery(".modal").hasClass("active") &&
          (jQuery(".modal").removeClass("active"), Ns());
      })),
    jQuery(".custom-select").length &&
      (jQuery(".custom-select .custom-select__head").on("click", function (e) {
        (e.stopPropagation(),
          jQuery(this).parents(".custom-select").toggleClass("active"));
      }),
      jQuery(".custom-select .custom-select__body").on("click", function () {
        jQuery(this).parents(".custom-select").toggleClass("active");
      })),
    jQuery("[data-filter-type-button]").length &&
      jQuery("[data-filter-type-button]").on("click", function () {
        var e = jQuery(this);
        const t = jQuery(".filters-list");
        jQuery(window).height();
        var i = e.data("filter-type-button"),
          s = jQuery("[data-filter-type='" + i + "']"),
          n = M ? 208 : 180;
        (e.addClass("active-link").siblings().removeClass("active-link"),
          e
            .parents(".custom-select__body")
            .siblings()
            .find(".custom-select__text")
            .text(e.text()),
          "" === i
            ? (jQuery("[data-filter-type]").show(),
              jQuery(".accommodation-waves").length &&
                (jQuery(".accommodation-waves").removeClass("hidden"),
                jQuery('[data-filter-type="villas"]')
                  .first()
                  .css("padding-top", n)))
            : (jQuery("[data-filter-type]").not(s).hide(),
              s.show(),
              jQuery(".accommodation-waves").length &&
                (jQuery(".accommodation-waves").addClass("hidden"),
                jQuery('[data-filter-type="villas"]')
                  .first()
                  .css("padding-top", 0))),
          setTimeout(() => {
            jQuery(window).scrollTop() > jQuery(".hero").height() &&
              (ScrollTrigger.refresh(!0),
              js && !C && D.scrollTo(".filters-list", { offset: -100 }),
              (js && !C) ||
                jQuery("html, body").animate(
                  { scrollTop: t.offset().top - 100 },
                  0,
                ));
          }, 50));
      }),
    jQuery(".date-picker").length &&
      (x.locale(
        jQuery(".date-picker").data("moment")
          ? jQuery(".date-picker").data("moment")
          : "vi",
      ),
      new Ps({
        field: document.getElementById("startDay"),
        secondField: document.getElementById("endDay"),
        lang: jQuery(".date-picker").data("lang")
          ? jQuery(".date-picker").data("lang")
          : "vi",
        minDate: x().startOf("now"),
        numberOfMonths: M ? 2 : 1,
        format: "D MMM YYYY, dddd",
        singleDate: !1,
      })),
    jQuery(".date-picker-mobile").length &&
      (x.locale(
        jQuery(".date-picker-mobile").data("moment")
          ? jQuery(".date-picker").data("moment")
          : "vi",
      ),
      new Ps({
        field: document.getElementById("startDayMobile"),
        secondField: document.getElementById("endDayMobile"),
        lang: jQuery(".date-picker-mobile").data("lang")
          ? jQuery(".date-picker-mobile").data("lang")
          : "vi",
        minDate: x().startOf("now"),
        numberOfMonths: M ? 2 : 1,
        format: "D MMM YYYY, dddd",
        singleDate: !1,
      })),
    jQuery(".date-picker-promotion").length &&
      (x.locale(
        jQuery(".date-picker-promotion").data("moment")
          ? jQuery(".date-picker-promotion").data("moment")
          : "vi",
      ),
      new Ps({
        field: document.getElementById("startDayPromotion"),
        secondField: document.getElementById("endDayPromotion"),
        lang: jQuery(".date-picker-promotion").data("lang")
          ? jQuery(".date-picker-promotion").data("lang")
          : "vi",
        minDate: x().startOf("now"),
        numberOfMonths: M ? 2 : 1,
        format: "D MMM YYYY, dddd",
        singleDate: !1,
      })),
    jQuery(".textarea-custom").length &&
      jQuery(".textarea-custom").on("input", function () {
        ((this.style.height = "5px"),
          (this.style.height = this.scrollHeight + "px"));
      }),
    jQuery(".copy-sharelink").length &&
      jQuery(".copy-sharelink").on("click", function () {
        var e = jQuery("<input>");
        (jQuery("body").append(e),
          e.val(jQuery(".copy-sharelink").data("url")).select(),
          document.execCommand("copy"),
          e.remove());
      }));
  (jQuery(
    ".nav .wrapper, .modal .modal-wrapper__inner > *, .custom-select .custom-select__body",
  ).on("click", function (e) {
    e.stopPropagation();
  }),
    jQuery(window).on("click", function (e) {
      (jQuery(".header,.nav").hasClass("active") &&
        (jQuery(".header,.nav,[data-hamburger]").removeClass("active"), Ns()),
        jQuery(".custom-select").hasClass("active") &&
          jQuery(".custom-select").removeClass("active"));
    }));
})();
