<template>

<div>
    <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">email</label>
        <div class="col-sm-10">
            <!-- 綁值 props.modelValue.eamil 可省略 props -->
            <input type="text" class="form-control" id="email" placeholder="Enter email" :value="modelValue.email" @input="updateEmail">
        </div>
    </div>
    <div class="form-group row">
        <label for="tel" class="col-sm-2 col-form-label">tel</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="tel" placeholder="Enter tel" :value="modelValue.tel" @input="updateTel" >
        </div>
    </div>
</div>

</template>
<script setup name="contact-comp" lang="ts">
import { defineProps,defineEmits } from 'vue';

//透過defineEmits取得 emits function
let emits = defineEmits(['update:modelValue'])

//透過defineProps取得props
let props:any = defineProps(['modelValue'])


function updateEmail($event:any){
    //神奇的是送出去不會把整個物件重置，也就是說外面接收時，不會直接assign新值給: form.contact = {...props.modelValue, email: $event.target.value}
    //而是會把 {...props.modelValue, email: $event.target.value} 裡的每個欄位分別更新到 form.contact
    //直接assign整個新物件給form.contact會因為不是reactive而沒反應
    emits('update:modelValue', {...props.modelValue, email: $event.target.value} )
}
function updateTel($event:any){
    emits('update:modelValue', {...props.modelValue, tel: $event.target.value} )
}


</script>