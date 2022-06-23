<template>
    <h1>RouterView</h1>
    <h3>測試Router、Route</h3>
    <hr/>
    <span v-html="routeInfo"></span>
    <button class="btn btn-primary" @click="submitAndLeave">確認送出</button> |
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="no">No</button>
            <button type="button" class="btn btn-primary" @click="yes">Yes</button>
          </div>
        </div>
      </div>
    </div>
    </teleport>

</template>
<script setup lang="ts">
import Modal from 'bootstrap/js/dist/modal';
import { useRouter,useRoute, onBeforeRouteLeave, } from 'vue-router'
import { ref,Ref } from 'vue'
import { useGlobalStore } from '../hook/useGlobalStore'
import Button from 'bootstrap/js/dist/button';
import useRouteLeaveConfirm from '../hook/useRouteLeaveConfirm'

let router = useRouter()
let route = useRoute()
let routeInfo = ref("")
let store:any = useGlobalStore()
const confirmModal:Ref<null|Element> = ref(null)

//切出去共用，傳入modal reference和modal確定按鈕的名稱即可
const noConfirmPush = useRouteLeaveConfirm(confirmModal, 'Yes');

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

//一般的送出鈕，不經過確認Modal就能離開
function submitAndLeave(){
    //check business logic...
    //導去自己要的那頁
    noConfirmPush({
        name: 'loading'
    })
}

//確定離開，關視窗
function yes(){
    Modal.getInstance(confirmModal.value as Element)?.hide()
}
//不想離開，一樣關視窗
function no(){
    //也可以在button上加 data-bs-dismiss="modal" 
    // Modal.getInstance(confirmModal.value as Element)?.hide()
}


</script>