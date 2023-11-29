import axios from 'axios'
export default {
  state: {
    logs: []
  },
  mutations: {
    SET_LOGS(state, logs) {
      state.logs = logs
    },
  },
  actions: {
    fetchLogs({ commit }) {
      console.log('here2')
      return axios
        .get('http://localhost:5001/api/v1/logs/')
        .then(({data}) => {
          commit('SET_LOGS', data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
  getters: {}
}