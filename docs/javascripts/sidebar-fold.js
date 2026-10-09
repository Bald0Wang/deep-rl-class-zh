// 侧边栏章节折叠行为(配合 custom.css 的桌面端折叠样式):
// 1) 加载/换页时,自动展开当前页所在的章节;
// 2) 手动展开/收起的状态存入 localStorage,跨页面保持;
// 3) 当前章节始终展开(优先级高于记录的状态)。
(function () {
  var KEY = "md-section-fold-v1";

  function store() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function save(map) {
    try {
      localStorage.setItem(KEY, JSON.stringify(map));
    } catch (e) {}
  }

  function sections() {
    return document.querySelectorAll(
      ".md-sidebar--primary .md-nav__item--nested"
    );
  }

  function setExpanded(item, on) {
    var input = item.querySelector(":scope > input.md-nav__toggle");
    if (!input || input.checked === on) return;
    input.checked = on;
    input.dispatchEvent(new Event("change", { bubbles: false }));
  }

  function restoreAndExpandCurrent() {
    var saved = store();
    sections().forEach(function (item) {
      var input = item.querySelector(":scope > input.md-nav__toggle");
      if (input) input.checked = !!saved[input.id];
    });
    var link = document.querySelector(
      ".md-sidebar--primary .md-nav__link--active"
    );
    if (link) {
      var li = link.closest("li.md-nav__item");
      while (li) {
        if (li.classList.contains("md-nav__item--nested")) {
          setExpanded(li, true);
        }
        li = li.parentElement.closest("li.md-nav__item");
      }
    }
  }

  function bind() {
    sections().forEach(function (item) {
      var input = item.querySelector(":scope > input.md-nav__toggle");
      if (!input || input.dataset.foldBound) return;
      input.dataset.foldBound = "1";
      input.addEventListener("change", function () {
        var map = store();
        sections().forEach(function (item2) {
          var i2 = item2.querySelector(":scope > input.md-nav__toggle");
          if (i2) map[i2.id] = i2.checked;
        });
        save(map);
        var nav = item.querySelector(":scope > .md-nav");
        if (nav) nav.setAttribute("aria-expanded", String(input.checked));
      });
    });
  }

  function run() {
    restoreAndExpandCurrent();
    bind();
  }

  run();
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  }
})();
