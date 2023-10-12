import { createStore } from 'vuex'
import logs from '../store/modules/logs'

export default createStore({
  modules: {
    logs
  }
})