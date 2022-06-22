<template>
  <div>
    <h1>This is HelloInject Page</h1>

    這是Inject來的物件: {{ msg }}<br>

  </div>
</template>

<script name="hello-comp" setup lang="ts">
import { inject } from 'vue'
import { STOREKEY } from '../main'

let store:any = inject(STOREKEY)

let msg = store.msg ;


</script>
