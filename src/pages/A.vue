<script lang="ts" setup>
import firstLine from '../component/home-first-line.vue'
defineProps(["linnear"])
import {ref} from "vue"
let name=ref("管理员姓名")
let rate=ref("权限等级")
</script>
<template>
    <div class="control">
        <div id="header">
            <h2 style="padding-top: 15px ;">首页</h2>
            <div id="person">
                <img src="">
                <div id="col">
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
            <div id="first-chart"></div>
            <div id="first-list"></div>
            <div id="second-list"></div>
        </div>
        <div id="third-line">
            <div id="second-chart"></div>
            <div id="two-chart">
                <div id="one"></div>
                <div id="two"></div>
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
#first-line,#second-line,#third-line{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content: space-between;
}
.first-line{
    background-image:linear-gradient(90deg,v-bind(linnear));
    background-size: 250%;
    color: white;
    padding: 15px;
    flex: 1;
    border-radius: 10px;
}
@keyframes scale{
    0% {
        background-position: 0%;
        scale: 1;
    }
    50%{
        background-position: 200%;
        scale: 1.1;
    }
    100%{
        background-position: 400%;
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

</style>