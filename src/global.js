import { SGIconFont, SGMessage } from 'sinogear';
import { io, cache, router, constants, utils } from 'sinobest-functions';
import moment from 'moment';
import { history } from 'umi';
// 需在layout模块前引入引擎模块，方便layout模块注册自定义引擎表格列组件
import { engineExtends } from 'sinogear-module-engine';
import { ReportErrorLog } from 'sinogear-module-layout';
import cssVars from 'css-vars-ponyfill';
import { config } from './common/config';

cssVars({ watch: true, silent: true });

constants.register({ ...config.constants });

const { STORE_USER_KEY } = constants;
const { store } = utils;

// 解决双击选中页面所有文字的缺陷。
// window.document.addEventListener('dblclick', (event) => {
//   if (!/(INPUT)/.test(event.target.nodeName)) {
//     // eslint-disable-next-line
//     window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
//   }
// });

// 处理message显示的最大数
let messageMaxCount = config.messageMaxCount || 1;
const { reportExceptionConfig = {} } = config || {};
if (reportExceptionConfig?.enableReportException) {
  // 开启异常上报功能时，默认报错最大条数为10条；可在common-config中设置messageMaxCount自定义条数
  messageMaxCount = 10;
}
SGMessage.registeredConfig({ messageMaxCount, ...config, ReportErrorLog });

// 注册io配置
io.register({
  ...config.requestConfig,
  headers: async () => {
    const userInfo = store.getItem(STORE_USER_KEY, true);
    /**
     * 如果localStorage中的user_info不为空，并且登录时间比记住密码超时时间长
     */
    if (
      userInfo &&
      moment(new Date()).diff(moment(userInfo.loginTime), 'seconds') >= userInfo.validitySecondsOfRememberMe
    ) {
      store.removeItem(STORE_USER_KEY, true);
      history.push('/user/login');
    }
    /**
     * 合并headers
     */
    const { headers } = config.requestConfig;
    let newHeaders = headers;
    if (headers && typeof headers === 'function') {
      newHeaders = await headers();
    }
    return newHeaders;
  },
  encryptConfig: config.encryptConfig
});
router.register(history);
SGIconFont.registeredCustomIconFontConfig(config.icon);

if (config.enableInitCacheData) {
  // 本地缓存初始化配置
  cache.register(config.cacheConfig);
}

// 紧凑模式
let styleNode = document.getElementById('dynamic_theme_style');
const globalSetting = JSON.parse(localStorage.getItem(constants.STORE_GLOBAL_SETTING));
if (!styleNode && globalSetting?.isCompactMode) {
  styleNode = document.createElement('link');
  styleNode.type = 'text/css';
  styleNode.rel = 'stylesheet';
  styleNode.id = 'dynamic_theme_style';
  styleNode.href = './antd.compact.min.css';
  document.getElementsByTagName('head')[0].appendChild(styleNode);
}
