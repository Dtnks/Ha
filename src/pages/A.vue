<script lang="ts" setup>
import firstLine from '../component/home-first-line.vue'
defineProps(["linnear"])
</script>
<template>
    <div class="control">
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
#first-line,#second-line,#third-line{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content: space-between;
}
.first-line{
    background-image:linear-gradient(60deg,v-bind(linnear));
    background-size: 250%;
    color: white;
    padding: 15px;
    flex: 1;
    border-radius: 10px;
}
</style>