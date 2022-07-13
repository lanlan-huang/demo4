export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        component: './home/views/HomePage'
      },
      {
        path: '/userDetail',
        component: './userDetail/views/UserDetail'
      }
    ]
  }
];
