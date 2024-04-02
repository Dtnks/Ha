<script lang="ts" setup name="dish">
import{reactive} from "vue"
interface Dish{
    path:string,name:string,content:string,sell:string,score:string
}
let dish:Dish=reactive({
    path:'../image/autumn_forest_path_122375_1280x720.jpg',
    name:'egsdsgs',
    content:'gsesh',
    sell:'shdhfj',
    score:'jfgvnc',
})
let flag=1
</script>
<template>
    <div class="all">
        <div class="rightshow">
            <img :src="dish.path" class="showimg">
        
            <h3 class="title">
                菜品名称：{{ dish.name }}
                <input class="dishname" v-model="dish.name" >
            </h3>
        </div>
        <div class="content">
            <p class="introduce">
                介绍：{{ dish.content }}
                <input class="dishname" v-model="dish.content" >
            </p>
        
            <div class="small">
                <p class="sell">
                    卖出：{{ dish.sell }}
                </p>
                <p class="score">
                    评分：{{ dish.score }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    template{
        width:100%;
        height: 100%;
    }
    .all{
        padding: 3%;
        display: flex;
        height: 150px;
        flex-direction: row;
        border-radius:20px ;
        justify-content:space-around ;
    }
    .rightshow{
        flex:1.5;
        width:100px;
        height: 100px;
    }
    .showimg{
        width:100px;
        height: 100px;
    }
    .content{
        text-align: left;
        position: relative;
        flex:3;

    }
    .small{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .dishname{
    width: 70%;
    margin: auto;
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: 8px;
    padding: 3%;
    font-size: 14px;
    font-weight: 700;
    display: none;
}
    
</style>