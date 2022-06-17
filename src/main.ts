import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/alert";
import "bootstrap/js/dist/base-component";
import "bootstrap/js/dist/button";
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/popover";
import "bootstrap/js/dist/scrollspy";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";

//引入fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//引入i18n
import i18n from './i18n'

//引入datepicker元件
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import LoadingVue from 'vue3-loading-overlay'

//加入fas,far pack
library.add(fas,far)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component('Datepicker', Datepicker)
.component('loading', LoadingVue)
.use(i18n)
.use(router)
.mount('#app')
