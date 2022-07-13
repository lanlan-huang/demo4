# sinogear-frontend-pro

基于UmiJS 3.x、React 16.8+、Antd 4.0+开发的赛姬前端框架示例工程。

## 目录介绍

```
├── config                    // umi的配置文件目录
│   ├── config.js             // umi的配置文件
│   └── router.config.js      // 配置路由文件
├── deployment                // 部署相关
│   ├── docker-compose-dev-mock.yml // docker文件
│   ├── Dockerfile                  // docker文件
│   ├── Dockerfile-nginx            // docker文件
│   ├── nginx.conf                  // nginx配置文件
├── config
├── mock                      // mock数据目录
├── public                    // 此目录下的所有文件会被拷贝到输出路径
├── src
│   ├── common                // 公共信息配置目录
│   ├── components            // 组件目录，此目录下存放公共组件
│   ├── layouts               // 全局布局目录
│   ├── models                // 全局models数据目录
│   ├── pages                 // 所有路由组件存放在这里
│   ├── services              // 全局services接口目录
│   ├── themes                // 设置主题目录
│   ├── utils                 // 工具类目录
│   ├── app.js                // 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
│   ├── g2.js                 // 全局G2设置文件
│   ├── global.js             // 全局文件
│   └── global.less           // 全局样式
├── .editorconfig             // 用于跨不同的编辑器和IDE为多个开发人员维护一致的编码风格的配置文件
├── .env                      // 配置umi环境变量文件
├── .eslintignore             // 配置需要忽略eslint规则校验的文件
├── .eslintrc                 // eslint规则配置文件
├── .gitattributes            // git的.gitattributes文件
├── .gitignore                // 忽略提交到git上的文件配置
├── .prettierrc.js            // 格式化文件配置
├── before.dev.js             // 赛姬执行图标文件
├── Jenkinsfile               // jenkins构建配置文件
├── jest.json                 // jest测试配置文件
├── package.json              // 包依赖管理文件
├── README.md                 // 项目说明文件
└── yarn.lock                 // 锁定包依赖版本的文件，自动生成
```

## 使用说明

### 下载

```
git clone http://gitlab.ggjs.sinobest.cn/Frontend/sinogear-frontend-pro.git
```

### 安装

```
yarn install
```

### 启动

```
npm run dev-mock
```

### 打包

```
npm run build
```