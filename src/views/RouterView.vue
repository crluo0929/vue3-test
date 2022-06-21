<template>
    <h1>RouterView</h1>
    <h3>測試Router、Route</h3>
    <hr/>
    <span v-html="routeInfo"></span>
    <button class="btn btn-primary" @click="info">info</button> |
    <button class="btn btn-primary" @click="query">pushWithQuery</button> |
    <button class="btn btn-primary" @click="param">pushWithParam</button>

    <router-view></router-view>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

let router = useRouter()
let routeInfo = ref("")

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

</script>