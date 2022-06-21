<template>
  <div class="about">
    <h1>DatepickView( <a href="https://vue3datepicker.com/" target="_blank">文件</a> )</h1>
    <h3>測試vue3-datepicker用法</h3>
    <hr/>

    <!-- 客製化時間格式 -->
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date1" :format="format" autoApply></Datepicker>
    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date2" timePicker></Datepicker>

    <!-- autoApply -->
    </div>
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date3" :enableTimePicker="false" autoApply></Datepicker>
    </div>

    <!-- range -->
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date4" range autoApply></Datepicker>
    </div>

    <!-- i18n格式轉換 -->
    <div style="width:500px;margin:auto;">
      <Datepicker v-model="date5" :format="i18nFormat" :locale="locale.toString()" :key="key" autoApply>
        <template #year-overlay="{ value }"> <!-- 選年份時的顯示也要客製化成i18n的樣子，但月份好像會依locale自動變(不知道為啥) -->
          {{ i18nYearOverlay(value) }}
        </template>
        <template #year="{ year }">  <!-- Datepicker元件在呈現年份時的顯示也要客製化成i18n的樣子 -->
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

//格式化時間
function format(d:Date){
  const year = d.getFullYear() 
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const mins = d.getMinutes()
  const seconds = d.getSeconds()
  
  return `${year}/${month}/${day}  ${hour}:${mins}:${seconds}`;
}

//將Date轉換為i18n格式
function i18nFormat(d:Date){
  //Date.toLocaleString(locale, option)可傳入Locale，第二個參數則可設定Date的格式
  //Locale由 Intl.Locale 來生成，則可以透過Intl來指定日曆的形式為 roc(有民國年) 或 gregory(西元年為主)
  return d.toLocaleString(
    locale.value , //重新格式化
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

//將年份轉換為i18n格式
function i18nYearOverlay(year:number){
  return new Date(year+"").toLocaleString(
    locale.value , 
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


//只要date1~date5有變，就更新一下date的值
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

//只要locale有變，就更新key強制更新Datepicker元件DOM，否則Datepicker內的值不會跟著轉i18n
watch(i18n.locale, () => {
  key.value += 1;
});

</script>