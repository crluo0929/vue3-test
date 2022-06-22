<template>
    <h1>RouterView</h1>
    <h3>測試Router、Route</h3>
    <hr/>
    <span v-html="routeInfo"></span>
    <button class="btn btn-primary" @click="info">info</button> |
    <button class="btn btn-primary" @click="query">pushWithQuery</button> |
    <button class="btn btn-primary" @click="param">pushWithParam</button> |
    <button class="btn btn-primary" @click="provideInject">pushWithProvideInject</button>

    <router-view></router-view>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useGlobalStore } from '../hook/useGlobalStore'

let router = useRouter()
let routeInfo = ref("")
let store:any = useGlobalStore()

//印出所有routes的資訊
function info(){
    routeInfo.value = ''
    router.getRoutes().forEach((configRoute)=>{
        const path = `path=${configRoute.path}, `
        const name = `name=${configRoute.path}, `
        const meta = `meta=${JSON.stringify(configRoute.meta)}, `
        const props = `props=${JSON.stringify(configRoute.props)}<br>`
        routeInfo.value += (path+name+meta+props)
    })
}

//透過query方式傳遞參數，ex: http://localhost:8080/routerview/hello?msg=helllo~
function query(){

    router.push({
        name : 'hello',
        query : {
            msg : 'hello~'
        }
    })
}

//透過param方式傳遞參數，ex: http://localhost:8080/routerview/hello/msg/world~
function param(){
    router.push({
        name : 'world',
        params : {
            msg: 'world~'
        }
    })
}

//透過main.ts註冊了一個全域的reactive store來給所有元件傳參用
function provideInject(){
    store.msg = { msg : 'this is object' }
    router.push({
        name : 'provideinject',
    })
}

</script>