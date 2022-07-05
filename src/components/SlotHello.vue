<template>
    <div class="slotscopt">
        這裡是SlotHello，在下面插入一個插槽，SlotHello有資料: {{slotData}}<br>
        <slot :data="slotData"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let slotData = ref({
    name : 'this is slot name'
})

</script>
<style>
.slotscopt{
    background-color: antiquewhite;
    height: 100px;
    width: 800px;
    margin: 0 auto;
}
</style>