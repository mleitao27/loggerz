export default {
  state: {
    page: 0,
    logsPerPage: 10,
    hasNextPage: false,
    totalLogCount: 0,
  },
  mutations: {
    SET_PAGE(state, page) {
      state.page = page
    },
    GO_TO_NEXT_PAGE(state) {
        state.page = state.page + 1
    },
    GO_TO_PREVIOUS_PAGE(state) {
        state.page = state.page > 0 ? state.page - 1 : 0
    },
    SET_LOGS_PER_PAGE(state, logsPerPage) {
      state.logsPerPage = logsPerPage
    },
    SET_HAS_NEXT_PAGE(state, hasNextPage) {
      state.hasNextPage = hasNextPage
    },
    SET_TOTAL_LOG_COUNT(state, totalLogCount) {
      state.totalLogCount = totalLogCount
    },
  },
  actions: {
    setPage({ commit }, page) {
        commit('SET_PAGE', page)
    },
    goToNextPage({ commit }) {
        commit('GO_TO_NEXT_PAGE')
    },
    goToPreviousPage({ commit }) {
        commit('GO_TO_PREVIOUS_PAGE')
    },
    setLogsPerPage({ commit }, logsPerPage) {
        commit('SET_LOGS_PER_PAGE', logsPerPage)
    },
    setHasNextPage({ commit }, hasNextPage) {
      commit('SET_HAS_NEXT_PAGE', hasNextPage)
    },
    setTotalLogCount({ commit }, totalLogCount) {
      commit('SET_TOTAL_LOG_COUNT', totalLogCount)
    },
  },
  getters: {}
}