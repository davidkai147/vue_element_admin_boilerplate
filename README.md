<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

## Preparation

Cần cài sẵn Node và git.

## Features

Giải thích cấu trúc thư mục của Project.
```
- build
  - index.js
```
File index này dùng để cấu hình phần build ra thư mục dist, chunk nhỏ các file css và js ra để deloy. 

```
- mock
```
Thư mục này không quan tâm.

```
- plop-templates
  ├── component
  │   ├── index.hbs
  │   └── prompt.js
  ├── store
  │   ├── index.hbs
  │   └── prompt.js
  ├── utils.js
  └── view
      ├── index.hbs
      └── prompt.js
```
Thư mục này là nơi chứa các template mẫu dùng để tạo nhanh component, store và view.
Câu lệnh: `npm run new`

```
src
├── App.vue         <-- Root gốc của App. Chỉ khai báo router-view
├── api             <-- Nơi khai báo các function request gọi API
│   └── user.js
├── assets          <-- Thư mục chứa hình
├── components      <-- Thư mục chứa các component
├── directive       <-- Nơi khai báo các directive tự custom
├── enums           <-- Khai báo các enums const để sử dụng cho toàn App
├── filters         <-- Các function hỗ trợ trong file template vue
├── icons           <-- Chưa các icon svg của Menu Sidebar
│   ├── index.js
│   ├── svg
│   └── svgo.yml
├── lang            <-- Thư mục chưa các text đa ngôn ngữ
│   ├── en.js
│   ├── index.js    <-- Xem giải thích ở dưới (*)
│   └── vi.js
├── layout          <-- Thư mục chứa các Layout
├── main.js         <-- Nơi khai báo của Vue
├── permission.js   <-- File handle xử lý 1 request. Gồm có: beforeEach & afterEach
├── router          <-- Thư mục chứ các router
│   └── index.js    <-- Xem giải thích ở dưới (*)
├── settings.js     <-- Setting mặc định cơ bản của App
├── store           <-- Nơi chứa các store của App
│   ├── getters.js  <-- Hàm getter để get giá trị của 1 state
│   ├── index.js    <-- Nơi khai báo load động trong thư mục modules 
│   └── modules     <-- Chứa các state của từng modules. Luôn có: state, mutations & actions
├── styles          <-- CSS của App
├── utils           <-- Các function hỗ trợ
└── views           <-- Chứa các template view
```

## Giải thích
### Language
```
├── lang
│   ├── index.js 
```
Đây là nơi khai báo các config sử dụng package vue-i18n. Sau này, nếu muốn thêm một ngôn ngữ chỉ cần làm theo flow như sau:

Đầu tiên: import locale ngôn ngữ và file text.
```
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi' // element-ui lang
import enLocale from './en'
import viLocale from './vi'
```
Vì locale mặc định không hỗ trợ nhiều text nên bắt buộc phải custom sử dụng detructing của ES6.
```
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  vi: {
    ...viLocale,
    ...elementViLocale
  }
}
```
Sau đó export i18n với tham số là locale & message đã custom
```
const i18n = new VueI18n({
  // set locale
  // options: en | vi
  locale: getLanguage(),
  // set locale messages
  messages
})
```
### Router
```
├── router
│   └── index.js
```
Router sử dụng kiểu lazy-load nên sẽ tối ưu performance.

Router này sử dụng 2 loại: constantRoute & asyncRoute.

constantRoute sẽ khai báo các route nào mà mọi user đều có thể truy cập được.
asyncRoute sẽ linh động import vào tùy vào permission của user.

Cấu trúc 1 route:
```
{
    path: '/server-config',     <-- path sẽ truy cập
    component: Layout,          <-- Layout
    redirect: '/server-config', <-- Redirect. Có hay ko đều được
    children: [                 <-- Children có thể được dùng khai báo submenu con
      {
        path: '',
        component: () => import('@/views/server-config/index'),
        name: 'ServerConfig',   <-- Khai báo name để dùng router.push
        meta: { title: 'server_config', icon: 'config' }
      }
    ]
}
```
Lưu ý: `title` phải trùng với key trong file `lang` để có thể đa ngôn ngữ được.

## Getting started

```bash
# clone the project

# install dependency
npm install / yarn install

# develop
npm run dev / yarn dev
```

This will automatically open http://localhost:9527

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)

Copyright (c) 2017-present based on PanJiaChen