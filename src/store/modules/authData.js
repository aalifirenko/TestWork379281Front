import api from '../../plugins/api';
import qs from 'qs';

export default {
  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loading: false,
    error: null,
    success: null,
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    authError: state => state.error,
    authSuccess: state => state.success,
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    setSuccess(state, data) {
      state.success = data;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    login({commit}, data) {
      try {
        commit("setLoading", true);
        commit("clearError");
        api.post("/auth/login", qs.stringify(data)).then(res => {
          console.log(res);
          commit("setLoading", false);
          if (res.status === 200) {
            const data = res.data.data;
            commit("setUser", data.user);
            localStorage.setItem("userInfo", JSON.stringify(data.user.api_token));
            commit("setSuccess", { message: 'Authorized' });
          } else if (res.status === 401) {
            commit("setError", { message: "Wrong login or password" });
            setTimeout(() => { commit('clearError'); }, 300);
          } else {
            commit("setError", { message: "Service temporary not available" });
            setTimeout(() => { commit('clearError'); }, 300);
          }
        }).catch(error => {
          commit("setLoading", false);
          console.log('error', error);
        })
      } catch (e) {
        console.log('error request', e);
        commit("setLoading", false);
        commit("setError", { message: "Service temporary not available" });
      }
    },

    signUserUp({commit}, data) {
      try {
        commit("setLoading", true);
        commit("clearError");
        api.post("/auth/register", qs.stringify(data)).then(res => {
          console.log('auth.register', res);
          commit("setLoading", false);
          if (res.status === 200) {
            const data = res.data.data;
            commit("setUser", data.user);
            localStorage.setItem("userInfo", JSON.stringify(data.user.api_token));
            commit("setSuccess", { message: 'Authorized' });
          } else if (res.status === 401) {
            commit("setError", { message: "Validation error" });
            setTimeout(() => { commit('clearError'); }, 300);
          } else {
            commit("setError", { message: "Service temporary not available" });
            setTimeout(() => { commit('clearError'); }, 300);
          }
        }).catch(error => {
          commit("setLoading", false);
          console.log('error', error);
        })
      } catch (e) {
        console.log('error request', e);
        commit("setLoading", false);
        commit("setError", { message: "Service temporary not available" });
      }
    },
    signOut({commit}) {
      localStorage.removeItem("userInfo");
      commit("setLogout");
    }
  }
};
