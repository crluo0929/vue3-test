<template>
  <div class="about">
    <h1>i18nView( <a href="https://kazupon.github.io/vue-i18n/introduction.html" target="_blank">文件</a> )</h1>
    <h3>測試i18n用法</h3>
    <hr/>
    <!-- 透過 t() 來轉換訊息 -->
    <h2>{{ t("message") }}</h2>

    <h2>{{ userName }}</h2>
    <button class="btn btn-primary" @click="click">Change</button>
  </div>
</template>

<script setup lang="ts">
import { computed} from 'vue'
import { useI18n } from 'vue-i18n'

//透過useI18n，可解構出 t 與 locale 使用
const  {t, locale} = useI18n();

//在程式中也可以使用 t() 來轉換訊息
let userName = computed(()=> t("user.name") )

function click(){
  locale.value = locale.value == 'en' ? 'zh' : 'en'
}

</script>