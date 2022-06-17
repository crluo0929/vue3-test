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

let msg = defineProps({
  msg:String
})

let routeInfo = ref('')

let route = useRoute()

function click(){
  routeInfo.value = JSON.stringify(route.query)
}

</script>
