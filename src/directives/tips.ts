import { Directive } from "vue";
import Tooltip from "bootstrap/js/dist/tooltip.js";
import './tips.css'

const trigger = "hover"
const customClass = "tips-default"

const vTip: Directive<HTMLElement> =  {
    
    mounted(el, binding:any) {
      //結合錯誤訊息的tips和一般的tooltips，當如果沒有$error，則視為一般tooltips，mounted起來，否則先不mounted
      if(binding.value?.$errors === undefined){
        el.setAttribute("data-bs-toggle", "tooltip");
        el.setAttribute("data-bs-placement", "top");
        el.setAttribute("data-bs-trigger", binding.value?.trigger===undefined ? trigger : binding.value.trigger);
        el.setAttribute("data-bs-offset", "0,0");
        el.setAttribute("data-bs-title", binding.value?.title);
        el.setAttribute("data-bs-custom-class", binding.value?.customClass===undefined ? customClass : binding.value.customClass);
        new Tooltip(el)?.enable()
      }
      
    },

    updated(el, binding:any){
      //只要有update，就先把tooltips砍掉
      Tooltip.getInstance(el)?.dispose();
      //如果有$errors，則重長一個給錯誤用的tips，並且將$errors中的錯誤訊息設定到tips上
      if(binding.value?.$errors && binding.value?.$errors.length>0){
        el.setAttribute("data-bs-toggle", "tooltip");
        el.setAttribute("data-bs-placement", binding.arg === undefined ? "top" : binding.arg);
        el.setAttribute("data-bs-trigger", "manual");
        el.setAttribute("data-bs-offset", "0,0");
        el.setAttribute("data-bs-html", "true");
        let msg = ''
        binding.value.$errors.forEach( (err:any) =>{
          msg += (err.$message+'<br>')
        })
        el.setAttribute("data-bs-title", msg );
        el.setAttribute("data-bs-custom-class", "tips-danger");
        new Tooltip(el).show();
      }
    },

    unmounted(el) {
      Tooltip.getInstance(el)?.dispose();
    },

}

export default vTip