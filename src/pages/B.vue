<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import Header from '../component/header.vue'
import {reactive, ref,onMounted, triggerRef} from 'vue'
const ruleFormRef = ref<FormInstance>()
defineProps(["linnear"])
let isactive=ref(false)
function changeclass(){
    isactive.value=!isactive.value
    console.log(11111)
}
let content=ref("")
interface ListItem {
  value: string
  label: string
}
let option1=[
    {
        value:"糖浆",
        label:"糖浆"
    },
    {
        value:"牛奶",
        label:"牛奶"
    },
    {
        value:"咖啡豆",
        label:"咖啡豆"
    },
    {
        value:"纸杯",
        label:"纸杯"
    }
]
let option2=[
    {
        value:"增加",
        label:"增加"
    },
    {
        value:"减少",
        label:"减少"
    }
]
let option3=[
    {
        value:"采购",
        label:"采购"
    },
    {
        value:"售出",
        label:"售出"
    },
    {
        value:"抽样",
        label:"抽样"
    },
    {
        value:"损耗",
        label:"损耗"
    },
]
let option4=[
{
        value:"一个月",
        label:"一个月"
    },
    {
        value:"三个月",
        label:"三个月"
    },
    {
        value:"五个月",
        label:"五个月"
    },
    {
        value:"半年",
        label:"半年"
    },
    {
        value:"一年",
        label:"一年"
    },
    {
        value:"两年",
        label:"两年"
    },
    {
        value:"三年",
        label:"三年"
    },
]
let option6=[
    {
        value:"SD-CJSNDK676",
        label:"SD-CJSNDK676"
    }
]
let valiInputEmpty=(rule:object,value:string,callback:any)=>{
    if(value==="")
    {
        callback(new Error("请输入内容"));
    }
    else{
        callback()
    }
}
let valiTimeEmpty=(rule:object,value:string,callback:any)=>{
    if(value==="")
    {
        callback(new Error("请选择日期"));
    }
    else{
        callback()
    }
}
let valiSelectEmpty=(rule:object,value:string,callback:any)=>{
    if(value==="")
    {
        callback(new Error("请选择内容"));
    }
    else{
        callback()
    }
}
let valimust=(rule:object,value:string,callback:any)=>{
    if(value==="" && ruleForm.Amount!=="减少")
    {
        callback(new Error("请输入内容"));
    }
    else{
        callback()
    }
}
const rules=reactive({
Name:[{validator:valiSelectEmpty,trigger:'blur'}],
Amount:[{validator:valiSelectEmpty,trigger:'blur'}],
Kind:[{validator:valiSelectEmpty,trigger:'blur'}],
Time:[{validator:valimust,trigger:'blur'}],
Time_keep:[{validator:valiSelectEmpty,trigger:'blur'}],
Adress:[{validator:valiSelectEmpty,trigger:'blur'}],
Price:[{validator:valimust,trigger:'blur'}],
Prices:[{validator:valimust,trigger:'blur'}],
Storage:[{validator:valiSelectEmpty,trigger:'blur'}],
Time_change:[{validator:valiTimeEmpty,trigger:'blur'}],
Operator:[{validator:valiInputEmpty,trigger:'blur'}],
Content:[{validator:valiInputEmpty,trigger:'blur'}]
})
const list = ref<ListItem[]>([])
const option5 = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',]
onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      option5.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    option5.value = []
  }
}
//只能用const否则页面会报错，不知道为啥
const ruleForm=reactive({
    Name:"",
    Amount:"",
    Kind:"",
    Time:"",
    Time_keep:"",
    Adress:"",
    Price:"",
    Prices:"",
    Storage:"",
    Time_change:"",
    Operator:"",
    Content:""
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
        console.log(ruleForm)
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
            <template v-slot:pagename>物料管理</template>
            <template v-slot:name>{{}}</template>
            <template v-slot:rate>{{  }}</template>
        </Header>
        <div id="show">
            <div id="left">
                <div id="chart">
                </div>
                <div id="list">
                    <h3>近期仓位变动明细</h3>
                    <span>vzddzv</span>
                    <span>vzvzxvd</span>
                </div>
            </div>
            <div id="right">
                <h3>物料快捷操作</h3>
                <div id="search">
                    <div class="middle">
                        <form class="search-box">
                        <input type="text" name="" :class="{'inclicked':isactive,'input':true}" v-model="content">
                        <button type="button" name="button" :class="{'close':isactive,'btn':true}" @click="changeclass()"></button>
                        </form>
                    </div>
                </div>
                <el-form id="work" :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleFormRef">
                    <div class="col">
                        <p>物料名称</p>
                        <el-form-item prop="Name">
                            <el-select
                            v-model="ruleForm.Name"
                            placeholder="Select"
                            style="width: 320px;"
                            clearable
                            >
                            <el-option
                            v-for="item in option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <div class="col">
                            <p>变化数量</p>
                            <el-form-item prop="Amount">
                                <el-select
                                v-model="ruleForm.Amount"
                                placeholder="Select"
                                style="width: 150px;"
                                clearable
                                >
                                <el-option
                                v-for="item in option2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="col">
                            <p>变动类型</p>
                            <el-form-item prop="Kind">
                                <el-select
                                v-model="ruleForm.Kind"
                                placeholder="Select"
                                style="width: 155px;"
                                clearable
                                >
                                <el-option
                                v-for="item in option3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line">
                        <div class="col">
                            <p>生产日期</p>
                            <el-form-item prop="Time">
                                <el-date-picker
                                    v-model="ruleForm.Time"
                                    type="date"
                                    placeholder="Pick a day"
                                    size="default"
                                    style="width: 170px;"
                                />
                            </el-form-item>
                        </div>
                        <div class="col">
                            <p>保质期</p>
                            <el-form-item prop="Time_keep">
                                <el-select
                                v-model="ruleForm.Time_keep"
                                placeholder="Select"
                                style="width: 135px;"
                                clearable
                                >
                                <el-option
                                v-for="item in option4"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="col">
                        <p>物料来源</p>
                        <el-form-item prop="Adress">
                            <el-select
                            v-model="ruleForm.Adress"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="Please enter a keyword"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            style="width: 415px"
                            clearable
                        >
                            <el-option
                            v-for="item in option5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <div class="col">
                            <p>单价</p>
                            <el-form-item prop="Price">
                                <el-input
                                v-model="ruleForm.Price"
                                style="width: 200px"
                                placeholder="Please input"
                                clearable
                            />
                            </el-form-item>
                        </div>
                        <div class="col">
                            <p>总价</p>
                            <el-form-item prop="Prices">
                                <el-input
                                v-model="ruleForm.Prices"
                                style="width: 200px"
                                placeholder="Please input"
                                clearable
                            />
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line">
                        <div class="col">
                            <p>仓位</p>
                            <el-form-item prop="Storage">
                                <el-select
                                v-model="ruleForm.Storage"
                                placeholder="Select"
                                style="width: 250px;"
                                clearable
                                >
                                <el-option
                                v-for="item in option6"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="col">
                            <p>变动时间</p>
                            <el-form-item prop="Time_change">
                                <el-date-picker
                                    v-model="ruleForm.Time_change"
                                    type="date"
                                    placeholder="Pick a day"
                                    size="default"
                                    style="width: 150px;"
                                />
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line">
                        <div class="col">
                            <p>备注：</p>
                            <el-form-item prop="Content">
                                <el-input
                                v-model="ruleForm.Content"
                                style="width: 300px"
                                :rows="4"
                                type="textarea"
                                placeholder="Please input"
                                clearable
                                />
                            </el-form-item>
                        </div>
                        <div class="col">
                            <p>操作员</p>
                            <el-form-item prop="Operator">
                                <el-input
                                v-model="ruleForm.Operator"
                                style="width: 200px"
                                placeholder="Please input"
                                clearable
                            />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)" class="blink">执行操作{{  }}</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
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
#show{
    display: flex;
    text-align: left;
    padding: 15px;
    flex:1;
    flex-direction: row;
}
#left{
    flex: 1.4;
    display: flex;
    flex-direction: column;
}
#right{
    flex: 1;
    display: flex;
    color: #000000;
    flex-direction: column;
}
#chart{
    flex: 1;
}
#list{
    flex: 1.2;
    border: 2px solid rgba(128,128,128,0.5);
    display:flex;
    flex-direction: column;
}
#list,#chart,#right{
    padding: 15px;
    margin: 15px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
}
@keyframes scaleY{
    0% {
        transform:scale(1,1);
    }
    50%{
        transform:scale(1,1.3);
    }
    100%{
        transform:scale(1,1);
    }
} 
#list span:hover{
    font-weight: bold;
    animation: scaleY .5s ease-in-out reverse;
    z-index: 120;
}
#list span{
    cursor: pointer;
    margin-top: 10px;
}
#search{
    position: relative;
    margin: 0 30px;
    flex: 1;
}
#work{
    flex:7;
}
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.input {
  width: 60px;
  height: 60px;
  background: none;
  border-radius: 50%;
  border: 4px solid #000000;
  box-sizing: border-box;
  outline: none;
  transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    padding 0.2s;
  transition-delay: 0.4s;
  color: rgb(0, 0, 0);
  font-size: 20px;
}
.inclicked {
  width: 400px;
  border-radius: 0;
  padding: 0 15px;
  padding-right: 40px;
}

.btn {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 0;
  right: 0;
  box-sizing: border-box;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.btn::before {
  content: "";
  width: 4px;
  height: 25px;
  background: #000000;
  position: absolute;
  transform: rotate(-45deg);
  bottom: -16px;
  right: -6px;
  transition: 0.3s;
}

.close::before,
.close::after {
  content: "";
  width: 4px;
  height: 34px;
  background: #000000;
  position: absolute;
  bottom: 12px;
  right: 28px;
}

.close::before {
  transform: rotate(-45deg);
}

.close::after {
  transform: rotate(45deg);
}
.line{
    display: flex;
    flex-direction: row;
}
.col{
    display: flex;
    flex-direction: column;
    margin-right: 15px;
}
.col p{
    margin-bottom: 10px;
    font-size: 14px;
    cursor:default;
}
.blink{
        width: 50%;
        margin: auto;
        position: relative;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        padding: 3%;
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