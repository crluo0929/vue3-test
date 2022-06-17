<template>
    <div>
        <h1>LoadingView( <a href="https://github.com/moyoujun/vue3-loading-overlay" target="_blank">文件</a> )</h1>
        <hr/>
        
        <button class="btn btn-primary"  @click.prevent="fromTemplate">From Template</button> | 
        <button class="btn btn-primary"  @click.prevent="fromScript">From Script</button>

    <loading :active="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel"
            :is-full-page="fullPage"></loading>
    
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

const fullPage = ref(true);
const isLoading = ref(false);

//從template中用變數去控制顯示與隱藏loading
function fromTemplate(){
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