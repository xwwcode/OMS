import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
        immer: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];
export default {
  plugins,
  history: 'hash',
  hash: true,
  base: '/auth/',
  // publicPath: '/auth/',
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: '登录',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'page',
          icon: 'smile',
          path: '/user/page',
          component: './user/Page',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/basics/goods',
            }, // {
            //   name: '客户管理',
            //   icon: 'switcher',
            //   path: '/customer/page',
            //   component: './customer/Page',
            // },
            // {
            //   name: '应用管理',
            //   icon: 'switcher',
            //   path: '/application/page',
            //   component: './application/Page',
            // },
            // {
            //   name: '用户管理',
            //   icon: 'switcher',
            //   path: '/theuser/page',
            //   component: './theUser/Page',
            // },
            // {
            //   name: '子用户管理',
            //   icon: 'switcher',
            //   path: '/childtheuser/page',
            //   component: './childTheUser/Page',
            // },
            // {
            //   name: '角色管理',
            //   icon: 'switcher',
            //   path: '/role/page',
            //   component: './role/Page',
            // },
            // {
            //   name: '子角色管理',
            //   icon: 'switcher',
            //   path: '/childrole',
            //   component: './childRole',
            // },
            // {
            //   name: '权限管理',
            //   icon: 'switcher',
            //   path: '/permission/page',
            //   component: './permission/Page',
            // },
            // {
            //   name: '菜单管理',
            //   icon: 'switcher',
            //   path: '/menu',
            //   component: './menu',
            // },
            {
              name: '基础信息',
              icon: 'switcher',
              path: '/basics',
              routes: [
                {
                  name: '货品信息',
                  icon: 'switcher',
                  path: '/basics/goods',
                  component: './basics/goods',
                },
                {
                  name: '品牌信息',
                  icon: 'switcher',
                  path: '/basics/brands',
                  component: './basics/brands',
                },
                {
                  name: '店铺信息',
                  icon: 'switcher',
                  path: '/basics/store',
                  component: './basics/store',
                },
                {
                  name: '供应商信息',
                  icon: 'switcher',
                  path: '/basics/supplier',
                  component: './basics/supplier',
                },
                {
                  name: '仓库信息',
                  icon: 'switcher',
                  path: '/basics/warehouse',
                  component: './basics/warehouse',
                },
              ],
            },
            {
              name: '库存管理',
              icon: 'switcher',
              path: '/stock',
              routes: [
                {
                  name: '到货通知单',
                  icon: 'switcher',
                  path: '/stock/notice',
                  component: './stock/notice',
                },
                {
                  name: '到货通知单详情',
                  path: '/stock/notice/detail',
                  component: './stock/notice/detail',
                  hideInMenu: true,
                },
                {
                  name: '退供出库单',
                  icon: 'switcher',
                  path: '/stock/delyvery',
                  component: './stock/delyvery',
                },
                {
                  name: '退供出库单详情',
                  path: '/stock/delyvery/detail',
                  component: './stock/delyvery/detail',
                  hideInMenu: true,
                },
                {
                  name: '调拨单',
                  icon: 'switcher',
                  path: '/stock/requisition',
                  component: './stock/requisition',
                },
                {
                  name: '调拨单详情',
                  path: '/stock/requisition/detail',
                  component: './stock/requisition/detail',
                  hideInMenu: true,
                },
              ],
            },
            {
              name: '订单管理',
              icon: 'switcher',
              path: '/order',
              routes: [
                {
                  name: '订单列表',
                  icon: 'switcher',
                  path: '/order/list',
                  component: './order/list',
                },
                {
                  name: '订单详情',
                  icon: 'switcher',
                  path: '/order/list/detail',
                  component: './order/list/detail',
                  hideInMenu: true,
                },
              ],
            }, // {
            //   name: '基础资料',
            //   icon: 'switcher',
            //   routes: [
            //   ],
            // },
            // {
            //   name: '库存管理',
            //   icon: 'switcher',
            // },
            // {
            //   name: '订单管理',
            //   icon: 'switcher',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ADMIN_API: '',
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: {
    '/eshop/': {
      target: 'http://10.10.67.115:8214/',
      changeOrigin: true,
    },
  },
} as IConfig;
