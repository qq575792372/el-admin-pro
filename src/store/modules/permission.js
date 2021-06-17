import { asyncRoutes, constantRoutes } from "@/router";

const state = {
  routes: [],
  addRoutes: []
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    // state.routes = constantRoutes.concat(routes);
    state.routes=routes;
  }
};
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = [];
      accessedRoutes = constantRoutes;
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
