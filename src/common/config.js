import { constants, func } from 'sinobest-functions';
import guideConfig from './guideConfig';
import * as scriptUrl from '../../public/font/iconfont';
import SaLogoUrl from '../../public/images/SA-logo.svg';
const sggc = window.SinoGearGlobalConfig;
const LOGIN_URL = sggc.loginUrl || '/blank/guide';
const error401URL = '/exception/401';
const error403URL = '/exception/403';
const {
  location
} = window;
const {
  protocol,
  hostname,
  port
} = location;
const applicationKey = `${protocol}-${hostname}-${port}`.replace(':', ''); // 是否开启运行时配置

const enableRuntimeConfig = false;
const defaultConfig = {
  name: '赛姬',
  // 默认登录用户名
  username: '村民',
  messageDuration: 2.5,
  // 全局设置
  globalSetting: JSON.parse(localStorage.getItem(constants.STORE_GLOBAL_SETTING)) || {
    menuLayout: 'side',
    // 菜单布局
    isDarkMode: false,
    // 是否开启暗黑模式
    isCompactMode: false,
    // 是否开启紧凑模式
    isFixedHeader: false,
    // 是否开启固定header
    isFixedSidleMenu: false,
    // 是否开启固定侧边菜单
    isShowBreadcrumb: false,
    // 是否开启显示面包屑
    isGlobalMenuNavigate: false,
    // 是否开启全局菜单导航
    isMultiTab: false,
    // 是否开启多页签模式
    loginLayout: 'right',
    // 登录布局
    themeConfig: undefined // 主题配置

  },
  // 是否展示左上角版本标签
  showVersionLabel: true,
  // 构建版本类型
  versionMark: process.env.RUN_ENV,
  // contextPath不要修改，默认dev代理模式下为空字符串''
  contextPath: process.env.contextPath || '',
  // mock后端上下文地址，默认dev代理模式下为'http://localhost:3004'
  mockContextPath: process.env.mockContextPath || 'http://localhost:3004',
  // 是否开启个性化设置
  enablePersonalization: true,
  reportExceptionConfig: {
    // 是否开启异常上报 默认为false
    enableReportException: false,
    // 是否自动关闭异常提示信息
    autoCloseMessage: false,
    // 不上报错误的状态码配置
    ignoredExceptionStatus: ['400', '401', '403', '404']
  },
  enableUserConfig: true,
  openPages: [LOGIN_URL, error401URL],
  whitePages: [LOGIN_URL, error401URL, error403URL],
  error401Url: error401URL,
  error403Url: error403URL,
  loginUrl: LOGIN_URL,
  // 初次引导所需的配置
  showGuideConfig: {
    // 初次进入页面是否需要引导
    enableShowGuide: true,
    // 初次引导所需的localStorage的key名
    showGuideKey: 'sg-show-guide/2.5.0',
    // 具体的driver配置
    driverConfig: guideConfig
  },
  // 全局静态参数配置
  constants: {},
  // 全局请求配置
  requestConfig: {
    reqEvalJSON: true,
    isNotice: false,
    debug: false,
    // notificationFn: (error) => {console.info('调试输出notification:', error);},
    401: {
      redirect: true,
      path: LOGIN_URL,
      throw: true
    },
    403: {
      redirect: false,
      path: error403URL
    },
    404: {
      redirect: false,
      path: '/exception/404'
    },
    500: {
      redirect: false,
      path: '/exception/500'
    },
    504: {
      redirect: false,
      path: '/exception/504'
    }
  },
  cacheConfig: {
    negotiateCacheKey: `${applicationKey}-SinoGear-negotiate-cache`,
    // 存储本地缓存key值
    localCacheKey: `${applicationKey}-SinoGear-local-cache` // 存储协商缓存key值
    // duration: 86400000,  // 本地缓存有效时间（毫秒），默认1天
    // customGlobalFun: {} // 本地缓存数据全局自定义查询方法

  },
  // 表格列超出文本内容展示形式, 默认全部展示。支持ellipsis、number值、all
  tableCellOverflow: 'all',
  // 操作日志记录配置
  logConfig: {
    pages: ['/management/(.*)', '/component/(.*)'],
    // 匹配所有/management、/component前缀的地址
    elements: ['operation-log:element'] // 配置元素

  },
  api: {
    userLogin: '/api/login',
    userLogout: '/api/logout',
    notices: '/api/notices',
    getMenus: '/api/getMenus',
    forms: '/api/dictForms',
    updateLog: 'http://docs.sinogear.sinobest.cn/update-log'
  },
  icon: {
    filter: ['sg'],
    scriptUrl
  },
  module: {
    login: {
      loginAuth: {
        // 授权码模式，支持配置多个。
        code: [{
          viewInfos: {
            name: 'SinoAuth登录',
            icon: SaLogoUrl // 仅支持svg格式

          },
          auth_url: '/api/thirdparty/oauth/render/sino_auth'
        }],
        psw: {},
        implicit: {}
      }
    },
    layout: {
      enableNotification: true
    },
    management: {}
  }
};
const config = func.mergeConfig(defaultConfig, sggc);

const updateConfig = (newConfigData = {}) => {
  const keyList = Object.keys(newConfigData);
  const configKeys = Object.keys(config);

  if (keyList.length) {
    keyList.forEach(key => {
      if (key in config) {
        if (Object.prototype.toString.call(config[key]) === '[object Object]') {
          config[key] = { ...config[key],
            ...newConfigData[key]
          };
        } else {
          config[key] = newConfigData[key];
        }
      }
    });
  } else {
    // 参数配置为空时，赋值默认的config
    configKeys.forEach(key => {
      if (Object.prototype.toString.call(config[key]) === '[object Object]') {
        config[key] = { ...defaultConfig[key],
          ...sggc[key]
        };
      } else {
        config[key] = sggc[key] ? sggc[key] : defaultConfig[key];
      }
    });
  }
};

export { config, enableRuntimeConfig, updateConfig };