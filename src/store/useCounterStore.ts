import { defineStore } from "pinia"

const useCounterStore = defineStore({
    id: 'counter',
    state: ()=> {
        return {
            counter: 0
        }
    },
    getters:{
        double():number{
            return this.counter*2
        },
        //如果是箭頭函數，則不能用this
        square : (state)=>{
            return state.counter*state.counter
        },
    },
    actions:{
        increment(){
            this.counter++
        },
        decrement(){
            this.counter--
        }
    }
})
export default useCounterStore ;

//也可以用類似setup方式定義sotre
// import {ref, computed} from 'vue'

// const useCounterStore = defineStore('counter', function () {
//     const count = ref(0)
//     const double = computed(() => count.value * 2)
//     function increment() {
//       count.value++
//     }
//     return {
//         count, double, increment
//     }
// })
// export default useCounterStore ;