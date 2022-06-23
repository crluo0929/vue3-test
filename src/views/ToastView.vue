<template>
    <h1>ToastView</h1>
    <h3>測試自訂Toast</h3>
    <hr/>

    <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <template v-for="item of store.messages" :key="item">
                <toast :alertItem="item" ></toast>
            </template>
        </div>
    </div>

    <br>
    <button @click="click">create an new toast</button>
    <br>
    <div v-for="item of store.messages" :key="item">
        {{item.content}}
    </div>

</template>
<script setup lang="ts">
import Toast from '../components/Toast.vue'
import { ref, Ref, reactive } from 'vue'
import { useGlobalStore } from '../hook/useGlobalStore'

let store = useGlobalStore()
store.messages = reactive([])

function click(){
    const styleList = ['primary','danger','success','warning']
    store.messages.push({
        title : '這是title',
        tip: '1s ago...',
        content: '這是內容'+ Math.floor(Math.random() * 100),
        style : styleList[Math.floor(Math.random()*4)],
        delay: 5000
    })
    return ""
}

</script>