<script lang="ts" setup>
import dish from '../component/dish.vue'
function ChangeDish(){
    this.innerHTML="修改完成"
    let div=document.getElementsByClassName("dishname")
    for (let i=0;i<div.length;i++)
    {
        div[i].style.display="block"
    }
}
function hidden(){
    let div=document.getElementsByClassName("dishname")
    for (let i=0;i<div.length;i++)
    {
        div[i].style.display="none"
    }
}
</script>
<template>
    <div class="row">
        <button @click="ChangeDish" class="change">修改</button>
        <button type="submit" style="display: inline;" class="change" @click="hidden">确定</button>
    </div>
    <div class="control">
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
        <dish class="show"></dish>
    </div>

</template>

<style scoped>
.control{
    background-color: rgba(255, 255, 255, 0.7);
    overflow-y: scroll;
    height:700px;
    width: 92%;
    margin: 4%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.display{
    display: none;
}
.change{
    width: 30%;
    margin: auto;
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: 8px;
    padding: 1%;
    font-size: 14px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    font-weight: 700;

}
.change{
    cursor: pointer;
}
</style>