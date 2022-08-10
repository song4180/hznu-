/*
 * @Author: XN
 * @Date: 2020-02-20 12:54:42
 * @LastEditTime: 2020-08-05 20:26:57
 * @LastEditors: XN
 * @Description: 进行local数据存储管理的工具模块 使用store库管理user
 * @FilePath: /gitee-nsvep/src/utils/storageUtils.js
 */ 

import store from 'store'

const USER_KEY = 'user'
const EXP_KEY = 'expId'
const PORT_KEY = 'port'
const PORTAINER_KEY = 'portainer'

export default{
    /**
     * @description: 保存userStudentNumber
     * @param {type} 
     * @return: 
     */
    saveUser(user){
        store.set(USER_KEY,user)
    },
    
    /**
     * @description: 读取userStudentNumber
     * @param {type} 
     * @return: 如果有 返回，没有返回空对象
     */
    getUser(){
        return store.get(USER_KEY) || {}
    },
    /**
     * @description: 删除userStudentNumber
     * @param {type} 
     * @return: 
     */
    removeUser(){
        store.remove(USER_KEY)
    },

    saveExpId(expId){
        store.set(EXP_KEY,expId)
    },
    getExpId(){
        return store.get(EXP_KEY) || {}
    },

    removeExpId(){
        store.remove(EXP_KEY)
    },

    savePort(port){
        store.set(PORT_KEY,port)
    },
    getPort(){
        return store.get(PORT_KEY) || {}
    },

    removePort(){
        store.remove(PORT_KEY)
    },

    savePortainer(portainer){
        store.set(PORTAINER_KEY,portainer)
    },
    getPortainer(){
        return store.get(PORTAINER_KEY) || {}
    },

    removePortainer(){
        store.remove(PORTAINER_KEY)
    },


};