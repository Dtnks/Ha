<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import firstLine from '../component/home-first-line.vue'
import person from '../component/person.vue'
import * as echarts from 'echarts';
defineProps(["linnear"])
import {ref,onMounted} from "vue"
interface employee{
    name:string,
    position:string
}
let person1:employee={
    name:"杨小黑",
    position:"外卖员"
}
let person2:employee={
    name:"杨小白",
    position:"店员"
}
let person3:employee={
    name:"杨小不黑不白",
    position:"外卖员"
}
let first_chart:HTMLElement
let second_chart:HTMLElement
let myChart:echarts.ECharts
let myChart1:echarts.ECharts
let option:EChartsOption
let option1:EChartsOption
onMounted(()=>{
    first_chart=document.getElementById("first-chart")!
    second_chart=document.getElementById("second-chart")!
    myChart=echarts.init(first_chart)
    myChart1=echarts.init(second_chart)
    option= {
        title: {
          text: "物料管理",
        },
        tooltip: {},
        legend: {
            data: ["储备量","警戒量"],
            orient: 'horizontal',
            bottom: 10,
            },
        yAxis: {
            data: ["包装袋", "吸管", "糖浆", "咖啡豆", "牛奶", "纸杯"],
        },
        xAxis: {},
        series: [
          {
            name: "储备量",
            type: "bar",
            color:"lightblue",
            data: [15, 20, 36, 18, 24, 20],
          },
          {
            name: "警戒量",
            type: "bar",
            color:"red",
            data: [5, 8, 15, 10, 10, 16],
          },
        ],
        };
    option1 = {
        title: {
          text: "销量统计",
        },
        legend: {
            data: ["点单量"],
            bottom: 10,
            },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月','四月','五月','六月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [10,20,15,26,34,28],
            type: 'line'
            }
        ]
    };
    myChart.setOption(option);
    myChart1.setOption(option1);
})
console.log(111)
let name=ref("管理员姓名")
let rate=ref("权限等级")
let month=ref("三")
window.addEventListener('resize',()=>{
    myChart.resize()
    myChart1.resize()
})
</script>
<template>
    <div class="control">
        <div id="header">
            <h2 style="padding-top: 15px;">首页</h2>
            <div id="person">
                <img src="">
                <div>
                    <p>{{ name }}</p>
                    <p>{{ rate }}</p>
                </div>
            </div>
        </div>
        <hr>
        <div id="first-line">
            <firstLine :linnear="linnear" class="first-line">
                <template v-slot:title>总点单量</template>
                <template v-slot:number>16465136</template>
            </firstLine>
            <firstLine :linnear="linnear" class="first-line">
                <template v-slot:title>今日成交额</template>
                <template v-slot:number>16465136</template>
            </firstLine>
            <firstLine :linnear="linnear" class="first-line">
                <template v-slot:title>季度物料成本</template>
                <template v-slot:number>16465136</template>
            </firstLine>
            <firstLine :linnear="linnear" class="first-line">
                <template v-slot:title>极度平均利润率</template>
                <template v-slot:number>16.4%</template>
            </firstLine>
            <firstLine :linnear="linnear" class="first-line">
                <template v-slot:title>月度工时统计</template>
                <template v-slot:number>16465136h</template>
            </firstLine>
        </div>
        <div id="second-line">
            <div id="first-chart">
            </div>
            <div id="first-list">
                <h3 style="margin-bottom: 10px;">最新表单列表：</h3>
                <table id="list-one">
                        <tr>第{{month}}季度财报</tr>
                        <tr>1 WordPress Install</tr>
                        <tr>25,000 visits/mo.</tr>
                        <tr>Unlimited Data Transfer</tr>
                        <tr>10GB Local Storage</tr>
                </table>
            </div>
            <div id="second-list">
                <h3 style="margin-bottom: 10px;">正在作业员工</h3>
                <table id="list-one">
                        <tr>
                            <person>
                                <template v-slot:name>{{ person1.name }}</template>
                                <template v-slot:position>{{ person1.position }}</template>
                            </person>
                        </tr>
                        <tr>
                            <person>
                                <template v-slot:name>{{ person2.name }}</template>
                                <template v-slot:position>{{ person2.position }}</template>
                            </person>
                        </tr>
                        <tr>
                            <person>
                                <template v-slot:name>{{ person3.name }}</template>
                                <template v-slot:position>{{ person3.position }}</template>
                            </person>
                        </tr>
                </table>
            </div>
        </div>
        <div id="third-line">
            <div id="second-chart">
            </div>
            <div id="two-chart">
                <div class="col">
                    <div id="one"></div>
                    <div id="two"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.control{
    background-color: rgba(255, 255, 255, 0.3);
    overflow-y: scroll;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
}
#header{
    display: flex;
    flex-direction: row;
    padding: 15px 15px 5px 15px;
    justify-content: space-between;
}
.col{
    display: flex;
    flex-direction: row;
    flex: 1;
}
#first-line,#second-line,#third-line{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content: space-between;
}
#first-line{
    flex: 1.2;
}
#second-line,#third-line{
    flex: 2.5;
}
.first-line{
    background-image:linear-gradient(90deg,v-bind(linnear));
    background-size: 400%;
    color: white;
    flex: 1;
    padding: 15px;
    margin: 15px;
    border-radius: 10px;
}
#first-chart,#first-list,#second-chart,#second-list,#two-chart{
    padding: 15px;
    margin: 15px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    text-align: left;
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
@keyframes scale{
    0% {
        scale: 1;
    }
    50%{
        scale: 1.1;
    }
    100%{
        scale: 1;
    }
} 
@keyframes animate{
        from {
            background-position: 0%;
        }
        to{
            background-position: 400%;
        }
    } 
.first-line:hover{
    animation: scale .5s ease-in-out,animate 8s linear infinite;
}
#first-chart,#second-chart{
    border: 2px solid rgba(128,128,128,0.5);
    flex: 2;
    display: flex;
    flex-direction: column;
}
#first-list{
    border: 2px solid rgba(128,128,128,0.5);
    flex:2;
    display:flex;
    flex-direction: column;
}
#second-list{
    border: 2px solid rgba(128,128,128,0.5);
    flex:1
}
#two-chart{
    border: 2px solid rgba(128,128,128,0.5);
    flex:3.3;
    display: flex;
    flex-direction: column;
}
#one,#two{
    flex:1;
}
#one{
    border-right: 2px solid rgba(128,128,128,0.5);
}
#list-one{
    flex: 1;
    width: 100%;
}
#list-one tr:hover{
    font-weight: bold;
    animation: scaleY .5s ease-in-out reverse;
    cursor: pointer;
    z-index: 120;
}
</style>