# vue-admin-client

# 正在重构（react + typescript）

Admin client for my personal blog site, powered by [Vue2](https://cn.vuejs.org/)

个人博客后台管理系统，需要配合服务端代码一起运行，在这 [express-api-server](https://github.com/wujihua118/express-api-server)

## 功能

- 登录 / 注册
- 文章新增 / 修改 / 查询 / 删除
- 分类新增 / 修改 / 查询 / 删除
- 标签新增 / 修改 / 查询 / 删除
- 图片上传 / 查询
- 个人信息查询 / 修改
- ...

## 技术栈

```js
vue + vue-router + vuex + element-ui + axios + vue-meditor + ES6+
```

## 项目结构

```html
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   ├── components             # 全局公用组件
│   ├── layouts                # 布局
│   ├── request                # 网络请求
│   ├── plugin                 # 插件
│   ├── components             # 全局公用组件
│   ├── router                 # 路由配置
│   ├── store                  # 全局状态管理
│   ├── styles                 # 全局样式
│   ├── theme                  # 主题配置
│   ├── utils                  # 工具函数
│   ├── views                  # 页面组件
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件
├── .eslintrc.js               # eslint 配置项
├── babel.config.js            # babel 配置
└── package.json               # package.json
```

## 项目截图

### 首页

<img src="https://raw.githubusercontent.com/wujihua118/vue-admin-client/master/src/screenshots/index.png" />

### 文章

<img src="https://raw.githubusercontent.com/wujihua118/vue-admin-client/master/src/screenshots/article_list.png"  />

### 分类

<img src="https://raw.githubusercontent.com/wujihua118/vue-admin-client/master/src/screenshots/category.png" />

### 标签

![](https://raw.githubusercontent.com/wujihua118/vue-admin-client/master/src/screenshots/tag.png)

### 文件管理

![](https://raw.githubusercontent.com/wujihua118/vue-admin-client/master/src/screenshots/file.png)

## 构建

```bash
# 克隆项目
git clone https://github.com/wujihua118/vue-admin-client.git

# 安装相关依赖
npm install

# 开发环境运行
npm run serve
```

## 计划

使用 `Vite + Vue3 + TypeScript + Element Plus` 重构

**如有问题欢迎 Issues 👏**
