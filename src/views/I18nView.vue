<template>
  <div class="about">
    <h1>i18nView( <a href="https://kazupon.github.io/vue-i18n/introduction.html" target="_blank">文件</a> )</h1>
    <h3>測試i18n用法</h3>
    <hr/>
    <!-- 透過預設 $t() 來轉換訊息，若setup中有解構出t，也可以用 t() 來轉換，兩者是同一個instance -->
    <!-- 用 $t 會每次重新渲染都計算一次 -->
    <h2>{{ $t("message") }}</h2>
    
    <!-- v-t 比 $t 方法具有更好的性能，因為在一次翻譯時自定義指令會進行緩存，但使用"服務器渲染"時要額外設定createRenderer  -->
    <h2 v-t="userName"></h2>

    <h2>{{ userName }}</h2>

    <!-- 對a元素插入i18n，可用<i18n>元件插入連結來避免XSS攻擊 -->
    <i18n path="/" tag="label" for="test">
      <a href="/" target="_blank">{{ $t('message') }}</a>
    </i18n>
    <br>
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