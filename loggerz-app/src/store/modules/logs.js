import axios from 'axios'
import store from '../index'

export default {
  state: {
    logs: null,
    log: null,
    filterOptions: null,
    filters: null
  },
  mutations: {
    SET_LOGS(state, logs) {
      state.logs = logs
    },
    SET_LOG(state, log) {
      state.log = log
    },
    SET_FILTER_OPTIONS(state, data) {
      if(!state.filterOptions) state.filterOptions = {}
      state.filterOptions[data.type] = data.options
    },
    SET_FILTERS(state, data) {
      if(!state.filters) state.filters = {}

      if(state.filters[data.type] && state.filters[data.type].length && state.filters[data.type].includes(data.option)) {
        const index = state.filters[data.type].indexOf(data.option);
        state.filters[data.type].splice(index, 1);
      }
      else if(!state.filters[data.type])
        state.filters[data.type] = [data.option]
      else
        state.filters[data.type].push(data.option )
    },
  },
  actions: {
    fetchLogs({ commit }) {
      return axios
        .get(
          'http://localhost:5001/api/v1/logs',
          {
            params: {
              page: store.state.nav.page,
              logsPerPage: store.state.nav.logsPerPage
            }
          }
        )
        .then((data) => {
          store.dispatch('setHasNextPage', !!parseInt(data.headers['has-next-page']))
          store.dispatch('setTotalLogCount', parseInt(data.headers['total-log-count']))
          commit('SET_LOGS', data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    fetchLog({ commit }, id) {
      return axios
        .get('http://localhost:5001/api/v1/logs/' + id)
        .then(({data}) => {
          commit('SET_LOG', data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    fetchNextLog({ commit }, id) {
      return axios
        .get('http://localhost:5001/api/v1/logs/next/' + id)
        .then(({data}) => {
          commit('SET_LOG', data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    fetchPreviousLog({ commit }, id) {
      return axios
        .get('http://localhost:5001/api/v1/logs/previous/' + id)
        .then(({data}) => {
          commit('SET_LOG', data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    fetchFilterOptions({ commit }, type) {
      return axios
        .post('http://localhost:5001/api/v1/logs/options/', { type })
        .then(({data}) => {
          commit('SET_FILTER_OPTIONS', {options: data, type})
        })
        .catch((e) => {
          console.log(e)
        })
    },
    setFilters({ commit }, data) {
      commit('SET_FILTERS', data)
    }
  },
  getters: {}
}