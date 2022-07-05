
<template>
<div>
    <SlotHello #="{data}" >
        <div class="content">
            這裡是插入插槽的內容，可以取得SlotHello給我的資料: {{data}}
        </div>
    </SlotHello>
</div>
    
</template>

<script setup lang="ts">
import { } from 'vue'
import SlotHello from '../components/SlotHello.vue'

</script>
<style>
.content{
    background-color:aqua;
    height: 50px;
    width: 650px;
    margin: 5px auto;
}
</style>

