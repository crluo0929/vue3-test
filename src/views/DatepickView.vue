<template>
  <div class="about">
    <h1>DatepickView( <a href="https://vue3datepicker.com/" target="_blank">文件</a> )</h1>
    <h3>測試vue3-datepicker用法</h3>
    <hr/>

    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date1" :format="format" autoApply></Datepicker>
    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date2" timePicker></Datepicker>

    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date3" :enableTimePicker="false" autoApply></Datepicker>
    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date4" range autoApply></Datepicker>
    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date5" :format="i18nFormat" :locale="locale.toString()" :key="key" autoApply>
        <template #year-overlay="{ value }">
          {{ i18nYearOverlay(value) }}
        </template>
        <template #year="{ year }">
          {{ i18nYearOverlay(year) }}
        </template>
      </Datepicker>
    </div>

    <br> {{ date }} <br>
    <button class="btn btn-primary" @click="click">{{ i18n.locale }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, Ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useI18n } from 'vue-i18n'


const i18n = useI18n();

let date1 = ref(new Date())
let date2 = ref(new Date())
let date3 = ref(new Date())
let date4 = ref([new Date(),new Date()])
let date5 = ref(new Date())
//顯示日期
let date:Ref<object|null> = ref(null)

//for i18n 日期選擇器
const key = ref(1); //當locale有變化時，用來強制更新Datepicker的DOM
let c = computed(()=>i18n.locale.value === 'zh' ? "roc" : "gregory")
let l = computed(()=>i18n.locale.value === 'zh' ? "zh-TW" : "en")
let locale = computed(()=> new Intl.Locale( l.value , { calendar: c.value }))


function format(d:Date){
  const year = d.getFullYear() 
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const mins = d.getMinutes()
  const seconds = d.getSeconds()
  
  return `${year}/${month}/${day}  ${hour}:${mins}:${seconds}`;
}


function i18nFormat(d:Date){
  return d.toLocaleString(
    new Intl.Locale( locale.value ), //重新格式化
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Asia/Taipei"
    }
  )
}

function i18nYearOverlay(year:number){
  return new Date(year+"").toLocaleString(
    new Intl.Locale( locale.value ), //重新格式化
    {
      year: "numeric",
      timeZone: "Asia/Taipei"
    }
  )
}

//切換語系
function click(){
  i18n.locale.value = i18n.locale.value == 'en' ? 'zh' : 'en'
}


watch(date1, (n)=>{
  date.value = n
} )

watch(date2, (n)=>{
  date.value = n
} )

watch(date3, (n)=>{
  date.value = n
} )

watch(date4, (n)=>{
  date.value = n
} )

watch(date5, (n)=>{
  date.value = n
} )

watch(i18n.locale, () => {
  key.value += 1;
});

</script>