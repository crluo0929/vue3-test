<template>
<div>
    counter: {{ counter }}<br>
    double counter: {{ double }}<br>
    square counter: {{ square }}<br>
    <button type="button" @click="store.increment">increment</button>
    <button type="button" @click="store.decrement">decrement</button>
    
</div>
</template>
<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { onUnmounted } from 'vue';
import useCounterStore from '../store/useCounterStore'

let store = useCounterStore()
const { counter, double, square } = storeToRefs(store)
//或用一個一個自己轉computed
// let counter = computed(()=> store.counter )
// let double = computed(()=> store.double )
// let square = computed(()=> store.square )

const unsubscribe = store.$onAction(({
    name, // action 的名字
    store, // store instance
    args, // 調用這個 action 的參數
    after, // 在這個 action 執行完畢之後，執行這個函數
    onError, // 在這個 action 拋出異常的時候，執行這個函數
})=>{
    const startTime = Date.now()
    
    console.log(`Start "${name}" with params [${args.join(', ')}].`)
    
    after((result) => {
      console.log(`Finished "${name}" after ${Date.now() - startTime }ms.\nResult: ${result}.`
      )
    })
    
})

onUnmounted(()=>{
    //by default it will be auto closed on unmounted
    unsubscribe()
})
</script>