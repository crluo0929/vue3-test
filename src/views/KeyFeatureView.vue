<template>
    <div>
        <h1>KeyFeature View</h1>
        <h3>測試key的用法</h3>
        <hr/>
        <!-- 透過transition來展示dom被更新的過程 -->
        <!-- transition reference: https://cn.vuejs.org/v2/guide/transitions.html -->
        <transition name="fade">
            <span :key="key">{{ text }}</span>
        </transition>
        <br>
        <!-- 更新key，整個DOM會被重新更新 -->
        <button class="btn btn-primary" @click="changeKey">Change Key</button> |
        <!-- 更新text，只會抽換內容，DOM不會整個換掉 -->
        <button class="btn btn-primary" @click="changeText">Change Text</button>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref("Context")
const key = ref(1)

//當key改變，會強制更新dom
function changeKey(){
    key.value++
}

//key沒變，只更新span內容
function changeText(){
    text.value += key.value
}

</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>