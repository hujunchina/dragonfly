```js
const menu = {
	name: 'logDetail',
	label: '日志详情',
	hideInNav: true,
};
```

### name 路由名称

对应 src/router/xxx.js 里面 name; 用于精确跳转到某一页面

### label 标题

展示在 顶部导航栏, 面包屑

### hideInNav 是否在 顶部导航栏隐藏

hideInNav 默认 false; 由于面包屑是自动计算生成的, 所以需要先定义好各个页面的父子关系; 但有些页面不需要再导航条里面展示, 比如详情页; 这个时候就需要把 hideInNav 设为 true;
