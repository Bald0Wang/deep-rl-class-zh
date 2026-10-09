// 主题兜底:确保 <html> 始终带有 data-md-color-scheme。
// 正常情况下 Material 的 palette 组件会在加载时根据 media 查询设置该属性;
// 若其未运行(或旧版缓存状态异常),这里补一个浅色默认值,避免主题变量整体失效。
(function () {
  function ensure() {
    var root = document.documentElement;
    if (!root.hasAttribute("data-md-color-scheme")) {
      root.setAttribute("data-md-color-scheme", "default");
    }
  }
  ensure();
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(ensure);
  }
})();
