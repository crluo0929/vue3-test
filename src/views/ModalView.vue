<template>
  <div>
    <h1>Modal View</h1>
    <h3>測試bootstrap Modal用法</h3>
    <hr/>

     <button class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="maunalOpen"><font-awesome-icon icon="fa-solid fa-bell" />手動open</button> | 
    <button class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="open"><font-awesome-icon icon="fa-solid fa-bell" />toggle open</button>

    <!-- 要加上 ref 屬性參考到script中的屬性 -->
    <!-- teleport 表示該元素邏輯上是div子元素，但呈現上會跑到body層-->
    <!-- data-bs-backdrop="static" 可鎖定視窗 -->
    <teleport to="body">
    <div
      class="modal fade"
      ref="myModalRef"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal 標題文字</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
            <button type="button" class="btn btn-primary" @click="confirm">確定</button>
          </div>
        </div>
      </div>
    </div>
    </teleport>
    
  </div>

</template>

<script setup lang="ts">

import Modal from 'bootstrap/js/dist/modal';
import { ref, Ref } from 'vue';

//提供給template中的 ref 參考
const myModalRef:Ref<null|Element> = ref(null)

//按下確認鈕
function confirm(){
  //透過ref參考到原來dom上的modal元素，並呼叫Modal的hide()來關閉視窗
  Modal.getInstance(myModalRef.value as Element)?.hide()
}

function open(){
  console.log(myModalRef.value)
}

function maunalOpen(){
  Modal.getInstance(myModalRef.value as Element)?.show()
}

</script>
<style>
.home{
  font-size: 20px;
  
}
</style>