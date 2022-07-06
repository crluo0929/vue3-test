import { useRouter,useRoute, onBeforeRouteLeave, RouteLocationRaw, } from 'vue-router'
import Modal from 'bootstrap/js/dist/modal';
import { Ref } from 'vue'
import { Validation,ValidationArgs } from '@vuelidate/core'

export default function(confirmModal:Ref<any>, confirmBtnName:string, v$?:Ref<Validation<ValidationArgs, any>>){

    const router = useRouter()
    const route = useRoute()

    function noConfirmPush(toRoute:RouteLocationRaw){
        route.meta.noConfirm = true
        router.push(toRoute)
    }

    //add click event listener in promise
    onBeforeRouteLeave((to, from, next) => {
        if(v$ && !v$.value.$dirty){  //頁面完全沒dirty
            next() ;
            return ;
        }

        //如果不想要confirm離開的，就設定route的meta屬性
        if(from?.meta?.noConfirm){
            next() ;
            return ;
        }

        const myModal = new Modal(confirmModal.value as Element) 
        const confirmPromise = new Promise((resolve)=>{
            const handler = function(e:Event){ //偵測click事件
                if((e.target as HTMLElement).innerText === confirmBtnName){ //這裡要跟Modal的確認按鈕內容一樣
                    resolve(true)
                }else{
                    resolve(false)
                }
                //要移除，不然會累加click handler
                confirmModal.value?.removeEventListener('click',handler) 
            }
            myModal.show()
            confirmModal.value?.addEventListener('click',handler)
            
        })
        confirmPromise.then((result)=>{ 
            if(result) next() //確認結果是true就放行
        })
    })

    return noConfirmPush ;

}