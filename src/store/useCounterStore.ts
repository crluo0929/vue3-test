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

//也可以用類似setup方式定義sotre，但這樣IDE不好找變數
// import {ref, computed} from 'vue'

// const useCounterStore = defineStore('counter', function () {
//     const counter = ref(0)
//     const double = computed(() => counter.value * 2)
//     const square = computed(() => counter.value * counter.value)
//     function increment() { counter.value++ }
//     function decrement() { counter.value-- }
//     return {
//         counter, double,square, increment, decrement
//     }
// })
// export default useCounterStore ;