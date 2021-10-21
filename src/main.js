import Vue from "vue";

// import normalize
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// import element
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css'
// 使用新的主题颜色配置，覆盖element ui默认的
import "@/styles/element-variables.scss";

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import global scss
import "@/styles/index.scss";

// import app/store/router
import App from "./App";
import store from "./store";
import router from "./router";

// import icons and permission
import "@/icons";
import "@/permission";

// import vue-meta-info
import MetaInfo from "vue-meta-info";

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// set ElementUI lang to zh
Vue.use(ElementUI, { size: "medium" });

// set vue-meta-info
Vue.use(MetaInfo);

// 设置为false以阻止vue在启动时生成生产提示。
Vue.config.productionTip = false;

// 创建vue实例
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
