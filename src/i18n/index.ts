import en from './message-en.json'
import zh from './message-zh.json'
import {createI18n} from 'vue-i18n'

export default createI18n({
    locale: localStorage.getItem("locale") ?? "en",
    fallbackLocale: "zh",
    globalInjection: true,
    legacy: false,
    messages: {
      zh,
      en,
    },
});

