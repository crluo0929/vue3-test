import { useRouter,useRoute, onBeforeRouteLeave, } from 'vue-router'
import Modal from 'bootstrap/js/dist/modal';
import { ref,Ref } from 'vue'

export default function(confirmModal:Ref<any>, confirmBtnName:string){

    const router = useRouter()
    const route = useRoute()

    function noConfirmPush(toRoute:any){
        route.meta.noConfirm = true
        router.push(toRoute)
    }

    //add click event listener in promise
    onBeforeRouteLeave((to, from, next) => {
        //如果不想要confirm離開的，就設定route的meta屬性
        if(from?.meta?.noConfirm){
            next()
            return ;
        }

        const myModal = new Modal(confirmModal.value as Element) 
        const confirmPromise = new Promise((resolve,reject)=>{
            const handler = function(e:any){ //偵測click事件
                if(e.target.innerText === confirmBtnName){ //這裡要跟Modal的確認按鈕內容一樣
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