/*
 * @Author: XN
 * @Date: 2020-07-16 21:09:02
 * @LastEditTime: 2020-11-11 14:08:42
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/config/config.js
 */ 
import axios from 'axios'

// export const BASE_URL = 'http://localhost:8080/docker' 
export const BASE_URL = 'http://172.22.236.111/docker'  
export const portURL = "http://172.22.236.111:9000"

axios.defaults.baseURL = BASE_URL;

export const TOKEN_KEY = 'cnb_client_token'