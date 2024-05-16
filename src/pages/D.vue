<script lang="ts" setup>
import type{ FormInstance, RowInstance } from 'element-plus';
import Header from '../component/header.vue'
import {ref,reactive} from 'vue'
import axios from 'axios'
import {getOrder,getOrderDetail,postOrderDelete} from '@/api/request'
let record=ref([])
const centerDialogVisible=ref(false)
function timestampToTime(timestamp) {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }
getOrder({page:2,pageSize:20}).then((res:any)=>{
    record.value=res.data.records
    record.value.map((item:any)=>{
        item.estimatedDeliveryTime=timestampToTime(item.estimatedDeliveryTime)
    })
})
interface DetailsRes {
    amount: number;/*金额 */
    dishFlavor: string;/*口味 */
    dishId: number;/*菜品id 和套餐id只存其一，必存其一 */
    id: number; /*主键id */
    name: string;/*名称 */
    number: number; /*数量 */
    orderId: number;/*订单id */
    setmealId: number;/*套餐id */
}
let detail=ref<DetailsRes>()
function handleDetail(index:number,id:number){
    getOrderDetail(id).then((res:DetailsRes)=>{
        detail.value=res
        centerDialogVisible.value=true
    })
}
function handleDelete (index:number,id:number){
    postOrderDelete(id).then(()=>{    
        record.value.splice(index , 1)

    })
}
function tableRowClassName(rowIndex:any) {
     if ((rowIndex.rowIndex) % 2 === 0) {
          return 'oddRow';
     }
    else return 'evenRow';
 }
</script>
<template>
    <div id="control">
        <Header>
            <template v-slot:pagename>订单管理</template>
            <template v-slot:name>{{}}</template>
            <template v-slot:rate>{{  }}</template>
        </Header>
        <div class="col">
            <el-table :data="record" max-height="85vh" :row-class-name="tableRowClassName">
                <el-table-column prop="number" label="订单号" />
                <el-table-column prop="userName" label="用户名" />
                <el-table-column prop="orderDishes" label="菜品信息" />    
                <el-table-column prop="address" label="地址" />
                <el-table-column prop="estimatedDeliveryTime" label="预计送达" sortable/>
                <el-table-column prop="tablewareNumber" label="餐具数量" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleDetail(scope.$index, scope.row.id)">
                        详情
                        </el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.id)"
                        >
                        删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog
    v-model="centerDialogVisible"
    title="详情"
    width="500"
    align-center
  >
  <div class="dialog">
    <span>数量：{{ detail?.number }}</span>
    <span>金额：{{ detail?.amount }}</span>
    <span>口味：{{ detail?.dishFlavor }}</span>
    <span>套餐名称：{{ detail?.setmealId }}</span>
  </div>
  </el-dialog>
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
    flex: 1;
    margin: 2vh 2vw;
    border-radius: 10px;
}
/deep/ .oddRow {
    color: black;
    background-color:rgba(255,255,255,0.7);
}
/deep/ .evenRow {
    background-color: rgba(128,128,128, 0.2);
    color: black;
}
.dialog{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
}
.dialog span{
    margin: 3vh 0;
    width: 50%;
}
</style>