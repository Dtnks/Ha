<script lang="ts" setup>
import Header from '../component/header.vue'
import {ref} from 'vue'
let isactive=ref(false)
function changeclass(){
    isactive.value=!isactive.value
    console.log(11111)
}
let content=ref("")
const name=ref("")
const amount=ref("")
const kind=ref("")
const time=ref("")
const time_keep=ref("")
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
                <div id="work">
                    <p>物料名称</p>
                    <el-select
                        v-model="name"
                        clearable
                        placeholder="Select"
                        style="width: 320px;"
                        >
                        <el-option
                        v-for="item in option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                    <div id="line1">
                        <div>
                            <p>变化数量</p>
                            <el-select
                            v-model="amount"
                            clearable
                            placeholder="Select"
                            style="width: 120px;"
                            >
                            <el-option
                            v-for="item in option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                            </el-select>
                        </div>
                        <div>
                            <p>变动类型</p>
                            <el-select
                            v-model="kind"
                            clearable
                            placeholder="Select"
                            style="width: 180px;"
                            >
                            <el-option
                            v-for="item in option3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                            </el-select>
                        </div>
                    </div>
                    <div id="line2">
                        <div>
                            <p style="margin-bottom: 10px;">生产日期</p>
                            <el-date-picker
                                v-model="time"
                                type="date"
                                placeholder="Pick a day"
                                size="default"
                                style="width: 180px;"
                            />
                        </div>
                        <div>
                            <p>保质期</p>
                            <el-select
                            v-model="time_keep"
                            clearable
                            placeholder="Select"
                            style="width: 140px;"
                            >
                            <el-option
                            v-for="item in option4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                            </el-select>
                        </div>
                    </div>
                </div>
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
#line1,#line2{
    display: flex;
    flex-direction: row;
}
#work div{
    margin-top: 10px;
    margin-right: 10px;
}
</style>