<script lang="ts" setup>
import type{ FormInstance } from 'element-plus';
import Header from '../component/header.vue'
import {ref,reactive} from 'vue'
defineProps(["linnear"])
// 获取当前时间
const today = new Date();
// 获取当前时间(today)的年份
const year = today.getFullYear();
// 获取月份
const month = String(today.getMonth() + 1).padStart(2, '0');
// 获取当前日
const day = String(today.getDate()).padStart(2, '0');
// 得到年月日
const thisDayDate = `${year}-${month}-${day}`;
const estimatedDeliveryTime=ref("")
const FormRef=ref<FormInstance>()
let Form=ref({
    addressBookId: undefined,
    amount: undefined,
    deliveryStatus: undefined,
    estimatedDeliveryTime: thisDayDate+" "+estimatedDeliveryTime,
    packAmount: undefined,
    payMethod: undefined,
    remark: "",
    tablewareNumber: undefined,
    tablewareStatus: 0
})
let valiInputEmpty=(rule:object,value:string,callback:any)=>{
    if(typeof(value)==="undefined")
    {
        callback(new Error("请输入内容"));
    }
    else{
        callback()
    }
}
let valiSelectEmpty=(rule:object,value:string,callback:any)=>{
    if(typeof(value)==="undefined")
    {
        callback(new Error("请选择内容"));
    }
    else{
        callback()
    }
}
let valiTime=(rule:object,value:string,callback:any)=>{
    if(value===thisDayDate+" [object Object]"){
        callback(new Error("请选择内容"));
    }
    else{
        callback()
    }
}
const rules=reactive({
    addressBookId: [{validator:valiInputEmpty,trigger:'blur'}],
    amount:[{validator:valiInputEmpty,trigger:'blur'}],
    deliveryStatus: [{validator:valiSelectEmpty,trigger:'blur'}],
    estimatedDeliveryTime: [{validator:valiTime,trigger:'blur'}],
    packAmount:[{validator:valiInputEmpty,trigger:'blur'}],
    payMethod: [{validator:valiSelectEmpty,trigger:'blur'}],
    tablewareNumber:[{validator:valiInputEmpty,trigger:'blur'}],
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
    <div id="control">
        <Header>
            <template v-slot:pagename>订单管理</template>
            <template v-slot:name>{{}}</template>
            <template v-slot:rate>{{  }}</template>
        </Header>
        <div class="row">
            <div class="col left">
                <el-form style="flex-wrap: wrap;" ref="FormRef" :model="Form" class="demo-ruleForm row" :rules="rules" label-position="top">
                    <el-form-item label="地址ID" prop="addressBookId" >
                        <el-input v-model="Form.addressBookId"
                                    clearable
                                    style="width: 130px"></el-input>
                    </el-form-item>
                    <el-form-item label="总金额" prop="amount">
                        <el-input v-model="Form.amount"
                                    clearable
                                    style="width: 130px"></el-input>
                    </el-form-item>
                    <el-form-item label="配送状态" prop="deliveryStatus">
                        <el-select
                        v-model="Form.deliveryStatus"
                        style="width: 150px;">
                            <el-option
                            v-for="item in [{value:1,label:'立刻就送'},{value:0,label:'选定时间'}]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预计送达时间" prop="estimatedDeliveryTime">
                        <el-time-picker
                        v-model="estimatedDeliveryTime"
                        style="width: 200px;"
                        ></el-time-picker>
                    </el-form-item>
                    <el-form-item label="打包费" prop="packAmount">
                        <el-input v-model="Form.packAmount"
                                    clearable
                                    style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式" prop="payMethod">
                        <el-select
                        v-model="Form.payMethod"
                        style="width: 150px;">
                            <el-option 
                            v-for="item in [{value:1,label:'微信'},{value:2,label:'支付宝'}]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="餐具数量" prop="tablewareNumber">
                        <el-input v-model="Form.tablewareNumber"
                                    clearable
                                    style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-form-item prop="remark">
                                <el-input
                                v-model="Form.remark"
                                style="width: 600px"
                                :rows="4"
                                type="textarea"
                                placeholder="Please input"
                                clearable
                                />
                            </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(FormRef)" class="blink">执行操作{{  }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="col right">
                
            </div>
        </div>
    </div>
</template>
<style scoped>
#control{
    background-color: rgba(255, 255, 255, 0.3);
    overflow-y: scroll;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
}
.col{
    display: flex;
    flex-direction: column;
    width: 50%;
}
.row{
    display: flex;
    flex-direction: row;
    flex: 1;
}
.right,
.left{
    background-color: rgba(255,255,255,0.7);
    border-radius: 10px;
    margin: 3vh;
}
.el-form{
    width: 100%;
    margin: 10vh 0;
    justify-content: space-around;
}
.blink{
        width: 100%;
        margin: auto;
        position: relative;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        color: white;
    }
    .blink:hover{
        animation: animate 8s linear infinite;
    }
    @keyframes animate{
        from {
            background-position: 0%;
        }
        to{
            background-position: 400%;
        }
    } 


</style>