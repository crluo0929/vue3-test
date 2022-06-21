<template>
  <div>
    <h1>This is Hello Page</h1>
    這是Props裡的: {{ msg }}<br>
    <button @click="click">show query</button><br>
    這是Route裡的(route.query):{{ routeInfo }}<br>
  </div>
</template>

<script name="hello-comp" setup lang="ts">
import { defineProps,ref } from 'vue';
import { useRoute } from 'vue-router'

//在route裡設定了將收到的參數放在props傳送過來
let msg = defineProps({
  msg:String
})

let routeInfo = ref('')

let route = useRoute()

//也可以從route.query裡找到傳過來的參數
function click(){
  routeInfo.value = JSON.stringify(route.query)
}

</script>
