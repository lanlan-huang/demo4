import { defineConfig } from 'umi';
import SinobestGatherProjectInfo from 'sinobest-gather-projectinfo';
import routes from './router.config';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const { contextPath = '' } = process.env;
const proxyApi = `${contextPath}/api`;
const proxyMock = `/mock`;
const proxyWs = `${contextPath}/ws`;
const proxyDruid = `${contextPath}/druid`;
const proxyImageShow = `${contextPath}/image-show`;
const proxyGenerator = `${contextPath}/generator`;
const processTargetPath = 'http://192.168.14.46:8003';

// 新开的工作流编辑页面需要的代理
const proxyProcess = {
  '/editor': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/libs': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/styles': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/scripts': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/fonts': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/images': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/app': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  },
  '/display': {
    target: processTargetPath, //  需修改为真实后端服务地址
    changeOrigin: true
  }
};

// 代码中可兼容 mock 以及真实后端服务，mock 需实际配置
const proxy = {
  [proxyApi]: {
    target: 'http://192.168.14.46:8003', //  需修改为真实后端服务地址
    changeOrigin: true
  },
  [proxyMock]: {
    target: 'http://192.168.14.33:6020/mock',
    changeOrigin: true,
    pathRewrite: { '^/mock': '' }
  },
  [proxyWs]: {
    target: 'http://192.168.14.46:8003',
    changeOrigin: true,
    ws: true
  },
  [proxyDruid]: {
    target: 'http://192.168.14.46:8003', //  需修改为真实后端服务地址
    changeOrigin: true
  },
  ...proxyProcess,
  [proxyImageShow]: {
    target: 'http://localhost:3004', //  请求图片接口代理
    changeOrigin: true
  },
  [proxyGenerator]: {
    target: 'http://192.168.14.46:9998',
    changeOrigin: true
  }
};

export default defineConfig({
  chunks: ['index'],
  plugins: ['sg-umi-plugin-rename', 'sg-umi-plugin-module-registered'],
  sgModule: {
    includeDemoModule: ['sinogear-module-engine', 'sinogear-module-workflow'],
    layout: {}
  },
  chainWebpack(memo) {
    memo.plugin('SinobestGatherProjectInfo').use(new SinobestGatherProjectInfo());
  },
  headScripts: [{ src: './env.js' }, { src: './config.js' }],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'sinogear',
        customName: (name) => {
          return `sinogear/lib/components/${name.replace(/s-g-/, '')}`;
        }
      }
    ]
  ],
  routes,
  antd: {},
  title: 'SinoGear 赛姬',
  favicon: 'favicon.png',
  dva: {
    hmr: true,
    skipModelValidate: true // 跳过model验证
  },
  theme: {},
  define: {
    'process.env.contextPath': process.env.contextPath,
    'process.env.mockContextPath': process.env.mockContextPath,
    'process.env.NO_PROXY': process.env.NO_PROXY,
    'process.env.version': {
      proVersion: process.env.npm_package_version
    },
    'process.env.runEnv': process.env.runEnv
  },
  ignoreMomentLocale: true,
  hash: true,
  history: {
    type: 'hash'
  },
  mock: false,
  proxy: noProxy ? {} : proxy,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  nodeModulesTransform: {
    type: 'all'
  },
  targets: {
    ie: 10
  },
  mfsu: {
    chunks: ['index']
  },
  webpack5: {}
});
