<template>
    <h1>TipView</h1>
    <h3>測試自訂Directive</h3>
    <hr/>

    <!-- 預設style，可以帶要彈出的方向參數 -->
    <button v-tip:[`left`] title="default title" >tip test</button> | 
    <!-- 可以傳入物件，綁定 title -->
    <button v-tip="{ title : title }" >title binding</button> |
    <!-- 傳入的物件也可以指定觸發方式: click、hover、focus -->
    <button v-tip="{ title : 'click trigger', trigger : 'click'}" > click trigger</button> |
    <!-- 傳入的物件也可以指定樣式，tips-default/success/primary/secondary/info/warn/danger -->
    <button v-tip="{ title : 'test', customClass : 'tips-warn', trigger : 'click'}" >warn class</button> |
    <button v-tip="{ title : 'test', customClass : 'tips-info', trigger : 'click'}" >info class</button> |
    <button v-tip:[`bottom`]="{ title : 'danger', customClass : 'tips-danger', trigger : 'click' }" >danger class</button> |
    <button v-tip:[`right`]="{ title : 'primary', customClass : 'tips-primary', trigger : 'click' }" >primary class</button> |
    <br><br>
    <!-- 也可以用在 a 或 input 元素上 -->
    <a href="#" v-tip title="this is a link">info</a> | 
    <input type="text" v-tip="{customClass : 'tips-secondary'}" value="" placeholder="輸入點什麼" title="this is an inputText" />

</template>
<script setup lang="ts">
import { ref } from 'vue'
import vTip  from '../directives/tips'

let title = ref('hello title')

</script>
<style>

</style>
