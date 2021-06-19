import variables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";

const {
  sideTheme,
  showSettings,
  topNav,
  tagsView,
  fixedHeader,
  sidebarLogo,
  dynamicTitle
} = defaultSettings;

const storageSetting = JSON.parse(localStorage.getItem("layout-setting")) || "";
const state = {
  pageTitle: "", // 当前的网页标题
  theme: storageSetting.theme || variables.theme,
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  tagsView:
    storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader:
    storageSetting.fixedHeader === undefined
      ? fixedHeader
      : storageSetting.fixedHeader,
  sidebarLogo:
    storageSetting.sidebarLogo === undefined
      ? sidebarLogo
      : storageSetting.sidebarLogo,
  dynamicTitle:
    storageSetting.dynamicTitle === undefined
      ? dynamicTitle
      : storageSetting.dynamicTitle
};
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  SET_PAGE_TITLE: (state, pageTitle) => {
    state.pageTitle = pageTitle;
  }
};

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
  // 设置网页标题
  setPageTitle({ commit }, pageTitle) {
    commit("SET_PAGE_TITLE", pageTitle);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
