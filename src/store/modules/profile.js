import api from '../../plugins/api';
import qs from 'qs';

export default {
  state: {
    profile: null,
    loading: false,
    error: null,
    success: null,
  },
  getters: {
    profile: state => state.profile,
    profileLoading: state => state.loading,
    profileError: state => state.error,
    profileSuccess: state => state.success,
  },
  mutations: {
    setProfile(state, data) {
      state.profile = data;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
      state.success = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    setSuccess(state, data) {
      state.success = data;
      state.error = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    reset(state) {
      state.success = null;
      state.error = null;
      state.loggedInUser = null;
    }
  },
  actions: {
    getProfile({commit}) {
      try {
        commit("setLoading", true);
        commit("clearError");
        api.get("/user/profile").then(res => {
          console.log('getProfile response', res);
          commit("setLoading", false);
          if (res.status === 200) {
            commit("setProfile", res.data.data.user);
          } else {
            commit("setError", { message: "Service temporary not available" });
          }
        }).catch(error => {
          commit("setLoading", false);
          console.log('profile error', error);
        })
      } catch (e) {
        console.log('profile error request', e);
        commit("setLoading", false);
        commit("setError", { message: "Service temporary not available" });
      }
    },
    updateProfile({commit}, data) {
      commit("setProfile", data);
    },
    saveProfile({commit}, data) {
      try {
        commit("setLoading", true);
        commit("clearError");
        api.post("/user/profile/save", qs.stringify(data)).then(res => {
          commit("setLoading", false);
          commit("setProfile", res.data.data.user);
          commit("setSuccess", { message: "Profile saved" });
        }).catch(error => {
          commit("setLoading", false);
          console.log('saveProfile error', error);
        })
      } catch (e) {
        console.log('saveProfile error request', e);
        commit("setLoading", false);
        commit("setError", { message: "Service temporary not available" });
      }
    },
  }
};
