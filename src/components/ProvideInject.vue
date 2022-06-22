<template>
  <div>
    <h1>This is HelloInject Page</h1>

    這是Inject來的物件: {{ msg }}<br>
    <button @click="click">change msg</button>
  </div>
</template>

<script name="hello-comp" setup lang="ts">
import { inject, ref } from 'vue'
import { STOREKEY } from '../hook/useGlobalStore'


let store:any = inject(STOREKEY)

let msg = ref(store.msg) ;

function click(){
  msg.value.msg = "other msg"
}

</script>
