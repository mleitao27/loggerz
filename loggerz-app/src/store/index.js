import { createStore } from 'vuex'
import logs from '../store/modules/logs'
import nav from '../store/modules/nav'

export default createStore({
  modules: {
    logs,
    nav
  }
})