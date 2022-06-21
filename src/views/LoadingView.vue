<template>
    <div>
        <h1>LoadingView( <a href="https://github.com/moyoujun/vue3-loading-overlay" target="_blank">文件</a> )</h1>
        <hr/>
        <!-- 從template操作Loading，可以綁定active方式 -->
        <button class="btn btn-primary"  @click.prevent="fromTemplate">From Template</button> | 
        <!-- 從script裡操作Loading，可以用useLoading()的方法 -->
        <button class="btn btn-primary"  @click.prevent="fromScript">From Script</button>

    <loading :active="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel"
            :is-full-page="fullPage">
      <!-- 套bootstrap5 spinner -->
      <div :class="loadingClass" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </loading>
    
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const fullPage = ref(true);
const isLoading = ref(false);
let loadingClass:Ref<Array<string>> = ref(["spinner-grow", "text-primary"])
const randomClass = ["text-primary","text-secondary","text-success","text-danger","text-warning","text-info","text-light","text-dark"]

//從template中用變數去控制顯示與隱藏loading
function fromTemplate(){

    //隨機挑個loading style
    const select = Math.floor(Math.random() * randomClass.length)
    loadingClass.value[1] = randomClass[select] 

    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false
    },1000)
}

//從script中調用loading的顯示與隱藏
function fromScript(){
    let loader = useLoading();
    loader.show({
      canCancel: true,
      onCancel: onCancel,
    });
    setTimeout(() => {
      loader.hide()
    },1000)    
}

//讀取中，點其它地方中斷讀取
function onCancel(){
  isLoading.value = false;
  console.log("強制結束")
}
</script>