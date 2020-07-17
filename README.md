# 优托邦经销存系统

## 环境

Install `node_modules`:

```bash
npm install
// or
yarn
```

使用 umi 自动新增区块，要全局安装 umi

```bash
yarn global add umi # 或者 npm install -g umi
```

> 有的电脑用 yarn 安装后环境变量还出问题，可以尝试手动添加 umi 环境变量; 添加的路径为 C:/Users/{你的用户名}/AppData/Local/Yarn/bin

### 启动

```bash
npm start
```

### 构建

```bash
npm run build
```

### 代码检查

```bash
npm run lint

// 按照规范自动修复
npm run lint:fix

// 代码风格格式化
npm run prettier
```

## 技术栈

- [React](https://react.docschina.org)
- [Rudex](http://cn.redux.js.org/index.html)
- [Rudex-saga](https://redux-saga-in-chinese.js.org)
- [Ant Design](https://ant.design/index-cn)
- [Ant Design Pro](https://pro.ant.design/docs/getting-started-cn)
- [UmiJS](https://umijs.org/)
- [Dva](http://github.com/dvajs/dva)
- [G2](https://antv.alipay.com)
- [表单规则 async-validator](https://github.com/yiminghe/async-validator)
- [moment](http://momentjs.com/)
- [Immer](https://github.com/immerjs/immer)

## 使用方法

大体上可以参考[antd pro](https://pro.ant.design/docs/new-page-cn)

### 新增页面

1. 在`/page/`新增一级路由文件夹，在`/page/xxx/`下新增二级页面文件夹；

   > 尽量不要弄三层级了，即使做类似详情页，作为二级页面就好

2. 一个页面文件夹包含：

   - `index.tsx`：主页面文件；
   - `style.less`: 样式文件，作用域是当前引用页面的，设置全局要加`:global{ }`，但主意不要影响到其它组件；
   - `model.ts`: `dva`模型文件，只针对当前页面有效，其它页面调用不了；需要全局数据请把逻辑代码写到`@/models/xxx.ts`里作为全局数据模型；如果只用在一级菜单下共享，写在`@/pages/xxx/models/aaa.ts`中
     > 分模块的作用是为了避免互相变量污染，同时在打包的时候，model 也是会分包的
   - `service.ts`：页面级别的请求函数
   - `_mock.ts`： 开发框架底层使用 express mock 的数据，假如匹配上了是不会向服务器发起请求的；
   - `schema.tsx`：已经把列表的排列封装成一个组件`FormList`, 制作简单的表单就直接写好 json 格式的 schema 就可以了，不需要写太多冗余的表单 dom;

3. 页面路径与属性放到`@/config/config.ts`的`routes`变量里；我们约定，带参数统一使用`query`【类似"/order/pdOrder/details?id=1234"】的方法，这样对后续做某些匹配页面 path 的操作简单点;

### 新增页面（区块）

一个命令生成通用代码，可以极大的提升我们开发效率，可参考 [UmiJS](https://umijs.org/zh/guide/block.html#%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9D%97)

目前在根目录下`block`文件夹已经写好了一个标准型表格区块，使用方法：

```bash
umi block add ./block/CurdTable --path=/PageLevel1/Page
// path 为新增页面路径
```

> 生成的代码只是最基本的代码，一般情况都是要在此基础上修改成符合页面业务的代码； block 只是生成代码给我们使用，更新 block 不会影响到已生成的代码；

后续我们根据不断的积累，可以整合更多通用的代码，更加方便后续的开发效率；

### 理解模型 Model

model 是 dva 对于数据管理的一种抽象叫法，它整合了`redux`和`redux-saga`，并且规范了一套写法；

而`redux-saga`是在`redux`的基础上加上了副作用操作`Effect`

想理解标准化的`rudex`和`rudex-saga`可以参考:

- [Rudex](http://cn.redux.js.org/index.html)
- [Rudex-saga](https://redux-saga-in-chinese.js.org/index.html)

#### **根据 Vuex 简单理解下 model**

- model: 类似于 vuex 分模块的一个个`module`
- state：与 vuex 一样是存储数据的
- reducers：类似 vuex 的`mutation`，这里也是唯一改变 state 数据的地方，只能做同步操作;
- effects: 类似 vuex 的`Action`，如果说改变 state 是正经的操作，那么其他都是**副作用**操作（不正经的）,这里就是做**副作用**操作的地方，比如请求接口，获取其他 state 做比较，缓存，路由跳转等等都可以写在这里；同时配合上一些特有的 effects 方法和`generator`可以做出比较好的异步控制流；
- subscriptions: 可以写一些监听的操作，例如监听浏览器路径变化，一般在 model 初始化就执行；
