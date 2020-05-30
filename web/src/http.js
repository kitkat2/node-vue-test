import axios from 'axios'
// import Vue from 'vue'
// import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})
http.interceptors.request.use(config =>{
    if(localStorage.token)
        config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
}, err =>{
    return Promise.reject(err)
})

export default http;