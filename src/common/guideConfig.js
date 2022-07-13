const guideConfig = {
  '/home': [
    {
      element: '.sg-logo',
      stageBackground: 'rgba(255, 255, 255, 0.2)',
      popover: {
        title: '功能说明',
        description: 'logo&系统名称',
        position: 'right'
      }
    },
    {
      element: '.ant-layout-sider-trigger',
      popover: {
        title: '功能说明',
        description: '收缩/展开菜单',
        position: 'bottom'
      }
    },
    {
      element: '#sg-bell-s',
      stageBackground: 'rgba(255, 255, 255, 0.2)',
      popover: {
        title: '功能说明',
        description: '消息提醒功能',
        position: 'left'
      }
    },
    {
      element: '#sg-user',
      stageBackground: 'rgba(255, 255, 255, 0.2)',
      popover: {
        title: '功能说明',
        description: '显示头像&用户名，鼠标移动到此处会展开显示个人设置、退出登录等菜单',
        position: 'left'
      }
    },
    {
      element: '#sg-search',
      popover: {
        title: '功能说明',
        description: '系统菜单搜索功能',
        position: 'bottom'
      }
    },
    {
      element: '#sg-menu',
      popover: {
        title: '功能说明',
        description: '系统菜单，可收缩/展开',
        position: 'right'
      }
    },
    {
      element: '#sg-content',
      popover: {
        title: '功能说明',
        description: '内容页面展示',
        position: 'bottom'
      }
    },
    {
      element: '#sg-footer',
      popover: {
        title: '功能说明',
        description: '系统页脚',
        position: 'top'
      }
    }
  ],
  '/account/reportedErrorLog': [
    {
      element: '.reported-error-log-container',
      popover: {
        title: '功能说明',
        description: '异常日志上报功能',
        position: 'top'
      }
    }
  ]
};

export default guideConfig;
