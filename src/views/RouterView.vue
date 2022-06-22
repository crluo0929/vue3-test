<template>
    <h1>RouterView</h1>
    <h3>測試Router、Route</h3>
    <hr/>
    <span v-html="routeInfo"></span>
    <button class="btn btn-primary" @click="goModalView">直接離開</button> |
    <button class="btn btn-primary" @click="submitAndLeave">一般的確認送出</button> |
    <button class="btn btn-primary" @click="info">info</button> |
    <button class="btn btn-primary" @click="query">pushWithQuery</button> |
    <button class="btn btn-primary" @click="param">pushWithParam</button> |
    <button class="btn btn-primary" @click="provideInject">pushWithProvideInject</button>

    <router-view></router-view>

    <!-- modal -->
    <teleport to="body">
    <!-- Modal -->
    <div class="modal fade" 
    ref="confirmModal"
    id="confirmModal" 
    data-bs-backdrop="static" 
    data-bs-keyboard="false" 
    tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">確認視窗</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            確定要離開?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button type="button" class="btn btn-primary" @click="yes">Yes</button>
          </div>
        </div>
      </div>
    </div>
    </teleport>

</template>
<script setup lang="ts">
import Modal from 'bootstrap/js/dist/modal';
import { useRouter, onBeforeRouteLeave,RouteLocationNormalized,RouteLocationRaw } from 'vue-router'
import { ref,Ref,nextTick, watch } from 'vue'
import { useGlobalStore } from '../hook/useGlobalStore'

let router = useRouter()
let routeInfo = ref("")
let store:any = useGlobalStore()
const confirmModal:Ref<null|Element> = ref(null)
const canExit = ref(false);
const leaveTo:Ref<any> = ref(null);

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

function goModalView(){
    router.push({
        name : 'modal'
    })
}

//一般的送出鈕，不經過確認Modal就能離開
function submitAndLeave(){
    //check business login...if ok then leave
    //設定好要離開的目地的
    leaveTo.value = {
        name : 'loading'
    }
    //觸發watch
    canExit.value = true
    
}

//確定離開，則關閉視窗，並且設定canxit為真
function yes(){
    Modal.getInstance(confirmModal.value as Element)?.hide()
    canExit.value = true
}

//監控canExit，如果為真就push
watch(canExit , (n,o)=>{
    if(n){
        router.push(leaveTo.value)
    } 
})

//離開前先把目地的存起來，再看canExit是否為真，若否則彈出視窗確認是否離開
onBeforeRouteLeave((to:RouteLocationNormalized, from:any, next:any) => {
    if(canExit.value){
        next()
    }else{
        leaveTo.value = to
        var myModal = new Modal(confirmModal.value as Element) 
        myModal.show()
    }
})

</script>