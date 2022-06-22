<template>
    <h1>VuelidateView( <a href="https://vuelidate-next.netlify.app/#alternative-syntax-composition-api" target="_blank">文件</a> )</h1>
    <h3>測試vuelidate</h3>
    <hr>

    <div class="form">
    <form>
        <div class="form-group row">
            <label for="firstName" class="col-sm-2 col-form-label">firstName</label>
            <div class="col-sm-10">
                <!-- v$.field.$model 可直接綁定欄位 -->
                <!-- 用 $touch 來更新 $ditry -->
                <input type="text" class="form-control" id="firstName" placeholder="Enter firstName" v-model="v$.firstName.$model" >
            </div>
            <!-- $error 只有在 (this.$dirty && !this.$pending && this.$invalid) 成立時才會有效-->
           <div v-if="v$.firstName.$error" class="error">{{ v$.firstName.$errors[0].$message }}</div>
        </div>

        <div class="form-group row">
            <label for="lastName" class="col-sm-2 col-form-label">lastName</label>
            <div class="col-sm-10">
                <!-- 不綁 v$.field.$model，可透過$autoDirty偵測觸發 $touch，或自行加上 @blur="v$.field.$touch" -->
                <input type="text" class="form-control" id="lastName" placeholder="Enter lastName" v-model="form.lastName" >
            </div>
            <p v-for="error of v$.lastName.$errors" :key="error.$uid" class="error">
                {{ error.$message }}
            </p>
        </div>
        <!-- 客製化元件也可以驗證 -->
        <!-- 使用自訂v-tip元件輸出error訊息，訊息靠右呈現  -->
        <Contact v-model="form.contact" v-tip:[`right`]="v$.contact" ></Contact>

        <div class="form-group row">
            <label for="age" class="col-sm-2 col-form-label">age</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="age" placeholder="Enter age" v-model="v$.age.$model" v-tip:[`right`]="v$.age">
            </div>
        </div>

        <div class="form-group row">
            <label for="address" class="col-sm-2 col-form-label">address</label>
            <div class="col-sm-10">
                <!-- 使用自訂v-tip元件輸出error訊息，訊息預設靠上呈現  -->
                <input type="text" class="form-control" id="address" placeholder="Enter address" v-model="v$.address.$model" v-tip="v$.address">
            </div>
        </div>

        <br>
        <button type="button" class="btn btn-primary" @click.prevent="clear">Clear</button> |
        <button type="submit" class="btn btn-primary" @click.prevent="submit">Submit</button> | 
        <button type="button" class="btn btn-primary" @click.prevent="click">Change</button>
    </form><br>

    Submit:<br> {{ submitResult }}

    </div>

</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers, numeric, createI18nMessage } from '@vuelidate/validators'
import Contact from '../components/Contact.vue' 
import { useI18n } from 'vue-i18n'
import vTip  from '../directives/tips'

const {t, locale} = useI18n()

let form = reactive({
    firstName: 'default first',
    lastName: 'default last',
    contact : {
        email : 'default@default.com',
        tel : '0911123456'
    },
    age: 18,
    address: 'address'
})

let submitResult:any = ref(null)

//自訂驗證器
let maxLength = (max:number) =>{
    return {
        $validator : (value:string) => value.length <= max,
        //該驗證器的訊息會經過withI18nMessage轉換，所以指定成i18n訊息檔的位置，或可不設置$message，在createI18nMessage時再指定messagePath
        $message : "validations.customValidator"  
    }
}

//取得i18n客製化訊息
let withI18nMessage = createI18nMessage({ t: t })
// let withI18nMessage = createI18nMessage({ t: t , messagePath : ()=> "validations.customValidator"  })

//自訂i18n驗證器
let maxLength18nValidator = withI18nMessage( maxLength(10), { withArguments : true} ) 

//驗證規則配置
const rules = {
    firstName: { required : required }, 
    lastName: { required,  $autoDirty: true }, //$autoDirty自動偵測更新 $dirty 狀態
    contact: { 
        email : { email, required, $autoDirty: true  }, //可設定多個驗證器
        tel : { required, $autoDirty: true }
    },
    age: { numeric:  helpers.withMessage('這欄需要輸入數字', numeric) }, //驗證器的客製化錯誤訊息
    address: { customValidator : maxLength18nValidator } //設定客製化的驗證器
     
}

const v$ = useVuelidate( rules, form )

async function submit(){
    const ok = await v$.value.$validate()
    if(ok){
        submitResult.value = {...toRefs(form)}
    }else{
        let messages = ''
        v$.value.$errors.forEach((err)=>{
            messages+= (err.$message+"\n")
        })
        alert(messages)
    }

}

function clear(){
    submitResult.value = null
    v$.value.$reset()
}

function click(){
  locale.value = locale.value == 'en' ? 'zh' : 'en'
}

</script>
<style>
.form{
    width: 500px;
    margin: auto;
}
.error{
    color:red;
}
</style>