import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'

// Request interceptor
axios.interceptors.request.use((config) => {
  const token = VueCookies.get('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Response interceptor
axios.interceptors.response.use((response) => {
  // Handle the response here
  return response
}, (error) => {
  if(error.response.status === 401 || error.response.status === 403)
    axios.post('http://localhost:5001/api/v1/auth/token/', { username: import.meta.env.VITE_USERNAME })
    .then(({ data }) => {
      VueCookies.set('token', data.token)
      location.reload()
    })
    .catch((e) => {
      console.log(e)
    })
  // Handle errors here
  console.error(error)
  return Promise.reject(error)
})

const app = createApp(App)
app.provide('vue-cookie', VueCookies)
app.use(router)
app.use(store)
app.mount('#app')
