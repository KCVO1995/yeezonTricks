yhsd.ready(Jssdk => {
  if (!Jssdk.util.getCookie("front_custom_variable")) {
    const lang = navigator.language;
    if (lang.search("zh") !== -1) {
      Jssdk.util.setCookie("front_custom_variable", "zh_CN", false);
    } else {
      Jssdk.util.setCookie("front_custom_variable", "EN", false);
    }
    return location.reload();
  } else if (Jssdk.util.getCookie("front_custom_variable") === "zh_CN") {
    if (location.href.search("pages") !== -1) {
      if (!location.pathname.endsWith("contact-us")) {
        if (location.href.search("-eng") !== -1) {
          return (location.href = location.href.replace("-eng", ""));
        }
      }
    } else if (location.href.search("posts") !== -1) {
      if (location.href.search("dir_id=70084") !== -1) {
        return (location.href = location.href.replace("dir_id=70084", "dir_id=69212"));
      }
    }
  } else {
    Jssdk.util.setCookie("front_custom_variable", "EN", false);
    if (location.href.search("pages") !== -1) {
      if (!location.pathname.endsWith("contact-us")) {
        if (location.href.search("-eng") === -1) {
          return (location.href = location.href.split("?")[0] + "-eng");
        }
      }
    } else if (location.href.search("posts") !== -1) {
      if (location.href.search("dir_id=69212") !== -1) {
        return (location.href = location.href.replace("dir_id=69212", "dir_id=70084"));
      }
    }
  }
});

window.setLang = function (lang, goHomePage) {
  // 不允许第二次点击
  if (Jssdk.util.getCookie("front_custom_variable") === lang) return;
  // 设置 cookie 为相应语言
  Jssdk.util.setCookie("front_custom_variable", lang, false);
  // 自定义页面、文章页面跳转判断
  if (goHomePage) {
    // 自定义页面
    if (goHomePage === "pages") {
      if (location.href.search("contact-us") !== -1) return location.reload();
      return (location.href =
        lang === "zh_CN" ? location.href.replace("-eng", "") : location.href.split("?")[0] + "-eng");
      // 文章页面
    } else if (goHomePage === "posts" && location.href.search("dir_id") !== -1) {
      return (location.href =
        lang === "zh_CN"
          ? location.href.replace("dir_id=70084", "dir_id=69212")
          : location.href.replace("dir_id=69212", "dir_id=70084"));
    } else {
      // 单篇文章
      return (location.href = location.origin);
    }
  }
  // 默认情况下当前页面刷新
  return location.reload();
};

function setLangAgent (lang) {
  const href = location.href;
  let goHomePage;
  if (href.search("pages") !== -1) {
    goHomePage = "pages";
  } else if (href.search("posts") !== -1) {
    goHomePage = "posts";
  }
  window.setLang(lang, goHomePage);
}
