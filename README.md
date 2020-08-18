### 启动前准备

- 安装 eslint `yarn global add eslint`

### 启动程序

- 安装依赖包 `yarn install`
- 运行在开发环境 `yarn run dev`

### 代码自动修复

- `yarn run lint:script`

### 代码提交

- 普通修改 `feat: xxx`
- bug 修复 `fix: xxx`

### 其他说明

1. 外部一个框架，内部一个框架，如果用 Vue 直接在https://registry.code.tuya-inc.top/tuyafe-bgsupport/saas 仓库开发
2. 如果用 React 需要自己搭建一个前端仓库
3. SaaS 前端仓库只有 saas 业务在里面，没有其他的所以可以安心开发
4. 要进行严格的校验：eslint 代码校验、style 样式校验、commit 提交校验
