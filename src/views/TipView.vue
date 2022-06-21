<template>
    <h1>TipView</h1>
    <h3>測試自訂Directive</h3>
    <hr/>

    <button v-tip title="default title" >tip test</button> | 
    <button v-tip="{ title : title }" >title binding</button> |
    <button v-tip="{ title : 'click trigger', trigger : 'click'}" > click trigger</button> |
    <button v-tip="{ title : 'test', customClass : 'tips-info', trigger : 'click'}" >warn class</button> |
    <button v-tip="{ title : 'test', customClass : 'tips-danger' }" >danger class</button> 


</template>
<script setup lang="ts">
import { ref } from 'vue'
import vTip  from '../directives/tips'

let title = ref('hello title')

</script>
<style>

</style>
