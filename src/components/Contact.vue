<template>

<div>
    <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">email</label>
        <div class="col-sm-10">
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

let emits = defineEmits(['update:modelValue'])

let props:any = defineProps(['modelValue'])


function updateEmail($event:any){
    emits('update:modelValue', {...props.modelValue, email: $event.target.value} )
}
function updateTel($event:any){
    emits('update:modelValue', {...props.modelValue, tel: $event.target.value} )
}


</script>