<script lang="ts" setup>
import Header from '../component/header.vue'
import {ref} from 'vue'
let isactive=ref(false)
function changeclass(){
    isactive.value=!isactive.value
    console.log(11111)
}
let content=ref("")
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
                <div id="search">
                    <div class="middle">
                        <form class="search-box">
                        <input type="text" name="" :class="{'inclicked':isactive,'input':true}" v-model="content">
                        <button type="button" name="button" :class="{'close':isactive,'btn':true}" @click="changeclass()"></button>
                        </form>
                    </div>
                </div>
                <div id="work">
                    <h3>物料快捷操作</h3>
                    
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
#list,#chart{
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
    background-color: rgba(255, 255, 255, 0.7);
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
  text-transform: uppercase;
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
</style>