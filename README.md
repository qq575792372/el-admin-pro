## 开始

```bash
# 克隆项目
git clone https://gitee.com/qq1020431880/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 该步骤非必须
# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 或者npm start命令启动服务
npm start
```

服务启动成功后，浏览器访问 [http://localhost:9528](http://localhost:9528)

## 环境

```bash
# 修改接口连接地址
在 .env.[development/staging/production].js 中修改 VUE_APP_BASE_API='http://接口地址'

# 运行环境
在使用npm run dev 和 build dev/stage/prod 会根据.env.XXX.js里的配置来连接不同环境的接口地址
```

具体环境配置可以参考 vue-cli 官网的 [环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)

## 发布

```bash
# 构建本地环境
npm run build:dev

# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

本模板基于 vue-element-admin，更多使用信息参考 [使用文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
