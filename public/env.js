function getNavigatorInfo() {
  var ua = navigator.userAgent.toLowerCase();
  var Sys = {
    os: 'unknown',
    browser: 'unknown',
    browserVersion: 0
  };
  var isWin = navigator.platform === 'Win32' || navigator.platform === 'Windows';
  var isMac =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel';
  var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
  var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isWin) {
    var isWin2K = ua.indexOf('windows nt 5.0') > -1 || ua.indexOf('windows 2000') > -1;
    if (isWin2K) Sys.os = 'Win2000';
    var isWinXP = ua.indexOf('windows nt 5.1') > -1 || ua.indexOf('windows xp') > -1;
    if (isWinXP) Sys.os = 'WinXP';
    var isWin2003 = ua.indexOf('windows nt 5.2') > -1 || ua.indexOf('windows 2003') > -1;
    if (isWin2003) Sys.os = 'Win2003';
    var isWinVista = ua.indexOf('windows nt 6.0') > -1 || ua.indexOf('windows vista') > -1;
    if (isWinVista) Sys.os = 'WinVista';
    var isWin7 = ua.indexOf('windows nt 6.1') > -1 || ua.indexOf('windows 7') > -1;
    if (isWin7) Sys.os = 'Win7';
  } else if (isMac) {
    Sys.os = 'Mac';
  } else if (isAndroid) {
    Sys.os = 'Android';
  } else if (isiOS) {
    Sys.os = 'iOS';
  } else Sys.os = 'other';
  var s = null;
  if ((s = ua.match(/msie ([\d.]+)/)) != null) {
    Sys.browser = 'ie';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if ((s = ua.match(/edge\/([\d.]+)/)) != null) {
    Sys.browser = 'edge';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if ((s = ua.match(/firefox\/([\d.]+)/)) != null) {
    Sys.browser = 'firefox';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if (Sys.edge == null && (s = ua.match(/chrome\/([\d.]+)/)) != null) {
    Sys.browser = 'chrome';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if ((s = ua.match(/opera.([\d.]+)/)) != null) {
    Sys.browser = 'opera';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if ((s = ua.match(/opr\/([\d.]+)/)) != null) {
    Sys.browser = 'opera';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if ((s = ua.match(/version\/([\d.]+).*safari/)) != null) {
    Sys.browser = 'safari';
    var version = s[1];
    Sys.browserVersion = version;
  }
  if (Sys.firefox == null && ua.match(/windows nt ([\d.]+)/) != null && (s = ua.match(/rv\:([\d.]+)/)) != null) {
    Sys.browser = 'ie';
    var version = s[1];
    Sys.browserVersion = version;
  }
  return Sys;
}
function stopLoading(url) {
  if(url[0] === url[1]){
    document.write(
      `<p>请使用IE10以上、chrome43以上、firefox38以上或者华资浏览器重新打开该网页</p>` +
      `<p>浏览器下载地址:<a href=${url[0]} style="color: blue;text-decoration: none;">${url[0]}</a></p>`
    );
  } else {
    document.write(
      `<p>请使用IE10以上、chrome43以上、firefox38以上或者华资浏览器重新打开该网页</p>` +
      `<p>浏览器下载地址1:<a href=${url[0]} style="color: blue;text-decoration: none;">${url[0]}</a></p>` +
      `<p>浏览器下载地址2:<a href=${url[1]} style="color: blue;text-decoration: none;">${url[1]}</a></p>`
    );
  }
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.abort();
  if(!!(window.attachEvent && !window.opera)){
    document.execCommand("stop");
  } else {
    window.stop();
  }
}
function checkEnvHandle(url) {
  var sys = getNavigatorInfo();
  var version = sys.browserVersion.split('.', 1)[0];
  var content =
    '我们的产品不支持您使用的浏览器。为了产品的最佳使用体验，建议使用Chrome，Safari，Firefox 或 IE 10+等浏览器。' +
    '点击【确定】按钮前往下载Chrome安装使用';
  var message = '没有为当前系统环境，找到适合的Chrome下载地址，请前往Chrome官网下载安装使用';
  if (
    (sys.browser === 'chrome' && version < 43) ||
    (sys.browser === 'ie' && version < 10) ||
    (sys.browser === 'firefox' && version < 37)
  ) {
    // eslint-disable-next-line
    if (confirm(content)) {
      if (url === undefined || url.length < 1) {
        alert(message);
      } else window.open(url[0]);
    }
    stopLoading(url);
  } else if (sys.os === 'WinXP' && sys.browser !== 'chrome') {
    // eslint-disable-next-line
    if (confirm(content)) {
      if (url === undefined || url.length < 2) {
        alert(message);
      } else window.open(url[1]);
    }
    stopLoading(url);
  }
}

function checkEnvDefaultHandle() {
  // 默认配置为华资浏览器，可以修改成其他浏览器下载地址
  checkEnvHandle(['http://192.168.3.17/SinoBrowserManageCenter/xcy3/index.jsp', 'http://192.168.3.17/SinoBrowserManageCenter/xcy3/index.jsp']);
}
checkEnvDefaultHandle();