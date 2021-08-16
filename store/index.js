export const state = () => ({
  success: {},
  error: {},
  errors: {},
  user: null,
  pauseStatus: false
})

export const mutations = {
  setSuccess (state, success) {
    state.success = success
  },
  UNSET_USER (state) {
    state.auth.user = null
    state.auth.loggedIn = false
  },
  SET_PAUSE_STATUS (state, status) {
    state.pauseStatus = status
  }
}

export const getters = {
  loggedIn: state => state.auth.user !== null && state.auth.user.player !== null && state.auth.user.player !== false,
  loggedUser: state => state.auth.user !== null ? state.auth.user.player : null,
  getPauseStatus: state => state.pauseStatus
}

export const actions = {
  handleHttpResponse ({ commit }, response) {
    commit('setSuccess', response)
  },
  setPauseStatus ({ commit }, response) {
    commit('SET_PAUSE_STATUS', response)
  }
}
