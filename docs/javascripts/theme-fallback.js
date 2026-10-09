// 主题兜底:确保 <html> 始终带有 data-md-color-scheme。
// 正常情况下 Material 的 palette 组件会根据 media 查询设置该属性;
// 若其未完成(旧缓存、JS 未运行等),这里按系统偏好补齐,避免主题变量失效。
(function () {
  function ensure() {
    var root = document.documentElement;
    if (root.hasAttribute("data-md-color-scheme")) return;
    var dark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-md-color-scheme", dark ? "slate" : "default");
  }
  ensure();
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(ensure);
  }
})();
