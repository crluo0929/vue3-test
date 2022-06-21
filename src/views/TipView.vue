<template>
    <h1>TipView</h1>
    <h3>測試自訂Directive</h3>
    <hr/>

    <button v-tip="{ 'title' : title, 'customClass' : 'yellow' }" >tip test</button>


</template>
<script setup lang="ts">
import { ref } from 'vue'
import vTip  from '../directives/tips'

let title = ref('hello title')

</script>
<style>
.yellow .tooltip-inner{
    color: yellow;
}
</style>
