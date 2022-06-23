<template>

    <div ref="_toastRef" class="toast" role="alert" aria-live="assertive"  aria-atomic="true">
        <div class="toast-header text-white bg-primary">
            <strong class="me-auto ">{{alert.title}}</strong>
            <small class="text-white">{{ alert.tip }}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            {{alert.content}}
        </div>
    </div>

</template>

<!--
<toast :show="showToast"></toast>

-->

<script name="toast" setup lang="ts">
import { ref, Ref, defineProps, reactive, watch, watchEffect, onMounted, onUnmounted } from 'vue'
import Toast from 'bootstrap/js/dist/toast'
import { useGlobalStore } from '../hook/useGlobalStore'

let _toast:Toast ;
let _toastRef:any = ref(null)
let store = useGlobalStore()
defineProps(['alert'])
let addListener = false

let handler = ()=>{
    console.log('handle')
    store.messages.pop()
}

watch(_toastRef, (n)=>{
    // console.log('watch',n)
    _toast.show()
})


onMounted(()=>{
    console.log('add')
    _toast = new Toast(_toastRef.value as Element, { animation: true, autohide: false, delay: 2000} )
    
})

onUnmounted(()=>{
    console.log('remove')
})


</script>