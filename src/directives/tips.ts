import { Directive } from "vue";
import Tooltip from "bootstrap/js/dist/tooltip.js";

const vTip: Directive<HTMLElement> =  {
    mounted(el, binding:any) {
        console.log(binding)
        el.setAttribute("data-bs-toggle", "tooltip");
        el.setAttribute("data-bs-placement", "top");
        el.setAttribute("data-bs-trigger", "hover");
        el.setAttribute("data-bs-offset", "0,0");
        el.setAttribute("data-bs-title", binding.value.title);
        el.setAttribute("data-bs-custom-class", binding.value.customClass);
        new Tooltip(el).enable();
    },
    unmounted(el) {
      Tooltip.getInstance(el)?.dispose();
    },

}

export default vTip