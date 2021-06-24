const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // user
  token: state => state.user.token,
  name: state => state.user.name,
  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // permission
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  sidebarRoutes: state => state.permission.sidebarRoutes,
  // settings
  dynamicTitle: state => state.settings.dynamicTitle,
  pageTitle: state => state.settings.pageTitle
};
export default getters;
