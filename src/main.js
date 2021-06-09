import Vue from 'vue'

// import normalize
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import element
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 使用新的主题颜色配置，覆盖element ui默认的
import '@/styles/element-variables.scss'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import global scss
import '@/styles/index.scss' // global scss

// import app/store/router
import App from './App'
import store from './store'
import router from './router'

// import icons and permission
import '@/icons' // icon svg components
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
//  去除mock，elementui上传组件的progress进度条在线上环境报错是引用mock造成的
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// set ElementUI lang to zh
Vue.use(ElementUI)

// 设置为false以阻止vue在启动时生成生产提示。
Vue.config.productionTip = false

// 创建vue实例
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
