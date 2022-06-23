<template>
    <h1>ToastView</h1>
    <h3>測試自訂Toast</h3>
    <hr/>
    <div v-for="(item,index) of store.messages" :key="index">
        {{item.content}}
    </div>


    <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <toast :alert="item" v-for="(item,index) of store.messages" :key="index"></toast>
        </div>
    </div>
    
    <br>
    <button @click="click">show me the toast</button>

</template>
<script setup lang="ts">
import Toast from '../components/Toast.vue'
import { ref, Ref, reactive, watch } from 'vue'
import { useGlobalStore } from '../hook/useGlobalStore'


let store = useGlobalStore()
store.messages = reactive([])
let time = ref(0)

function click(){
    time.value++
    store.messages.push({
        title : '這是title',
        tip: '1s ago...',
        content: '這是內容'+time.value
    })
    return ""
}


</script>