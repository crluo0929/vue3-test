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
            <button type="button" class="btn btn-secondary" @click="no">No</button>
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

let router = useRouter()
let route = useRoute()
let routeInfo = ref("")
let store:any = useGlobalStore()
const confirmModal:Ref<null|Element> = ref(null)

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
    //補個meta屬性，不跳出確認就離開
    route.meta.noConfirm = true
    router.push({
        name: 'loading'
    })
}

//確定離開，則關閉視窗，並且設定canxit為真
function yes(){
    Modal.getInstance(confirmModal.value as Element)?.hide()
}

function no(){
    Modal.getInstance(confirmModal.value as Element)?.hide()
}

//離開前先把目地的存起來，再看canExit是否為真，若否則彈出視窗確認是否離開
onBeforeRouteLeave((to, from, next) => {
    //如果不想要confirm離開的，就設定route的meta屬性
    if(from?.meta?.noConfirm){
        next()
        return ;
    }

    var myModal = new Modal(confirmModal.value as Element) 
    const confirmPromise = new Promise((resolve,reject)=>{
        const handler = function(e:any){ //偵測click事件
            if(e.target.innerText === 'Yes'){ //這裡要跟Modal的確認按鈕內容一樣
                resolve(true)
            }else{
                resolve(false)
            }
            //要移除，不然會累加click handler
            confirmModal.value?.removeEventListener('click',handler) 
        }
        myModal.show()
        confirmModal.value?.addEventListener('click',handler)
        
    })
    confirmPromise.then((result)=>{ 
        if(result) next() //確認結果是true就放行
    })
})

</script>