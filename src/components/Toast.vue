<template>

    <div ref="_toastRef" v-if="alertItem" class="toast" role="alert" aria-live="assertive"  aria-atomic="true">
        <div :class="clazz">
            <strong class="me-auto ">{{alertItem.title}}</strong>
            <small class="text-white">{{ alertItem.tip }}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            {{alertItem.content}}
        </div>
    </div>

</template>
<script name="toast" setup lang="ts">
import { ref, Ref, defineProps,  onMounted } from 'vue'
import Toast from 'bootstrap/js/dist/toast'
import { useGlobalStore } from '../hook/useGlobalStore'

//可換成其它store
let store = useGlobalStore()

let _toast:Toast ;
let _toastRef:Ref<HTMLElement|null> = ref(null)
let props = defineProps(['alertItem'])

const delay:number = initDelay()
const clazz:Ref<string[]> = initClass()

onMounted(()=>{
    _toast = new Toast(_toastRef.value as Element, { animation: true, autohide: true, delay : delay } )
    _toastRef.value?.addEventListener('hide.bs.toast',()=>{
        store.messages = store.messages.filter( (item:any) => item!=props.alertItem )
    })
    _toast.show()
})

function initDelay(){
    return (props.alertItem.delay ? parseInt(props.alertItem.delay) : 2000) 
}

function initClass(){
    const tmp = ref(['toast-header'])
    if(props.alertItem.style === 'primary'){ tmp.value.push("text-white","bg-primary")}
    else if(props.alertItem.style === 'danger'){ tmp.value.push("text-white","bg-danger")}
    else if(props.alertItem.style === 'success'){ tmp.value.push("text-white","bg-success")}
    else if(props.alertItem.style === 'warning'){ tmp.value.push("text-white","bg-warning")}
    else{ tmp.value.push("text-white","bg-primary") }
    return tmp
}
</script>