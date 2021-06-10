import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: sessionStorage.getItem("USER_NAME") || "",
    avatar: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, validcode } = userInfo;
    return new Promise((resolve, reject) => {
      // 不调用接口登录
      // set user name
      commit("SET_NAME", username.trim());
      sessionStorage.setItem("USER_NAME", username.trim());
      // set token
      commit("SET_TOKEN", 123);
      setToken(123);
      resolve({ code: "0000", message: "OK" });

      // 请求后台登录
      // login({
      //   accountNo: username.trim(),
      //   password: password,
      //   validCode: validcode
      // })
      //   .then(response => {
      //     const { code, data } = response;
      //     if (code == "0000") {
      //       // set user name
      //       commit("SET_NAME", username.trim());
      //       sessionStorage.setItem("USER_NAME", username.trim());
      //       // set token
      //       commit("SET_TOKEN", 123);
      //       setToken(123);
      //     }
      //     // resolve response data
      //     resolve(response);
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // remove token from cookie
      removeToken();
      // reset router
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
