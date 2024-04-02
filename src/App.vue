<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import {onMounted, reactive} from 'vue'
  function colormain(idname:string){
    let oImg = document.getElementById(idname) as HTMLCanvasElement;
    oImg.addEventListener("load" , function () {
    const w = this.width;
    const h = this.height;
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    // 绘制图片在画布上
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(this, 0, 0);

    let pxArr0 = context.getImageData(0, 0, w, h).data;
    let pxArr = Array.from(pxArr0);
    type stringKey = Record<string, number>
    const colorList:stringKey = {} 
    let i = 0;
    while (i < pxArr.length) {
    const r = pxArr[i];
    const g = pxArr[i + 1];
    const b = pxArr[i + 2];
    const a = pxArr[i + 3];
    i = i + 40000; 
    const key = [r,g,b,a].join(',')
    key in colorList ? ++colorList[key] : (colorList[key] = 1)
    }

    let arr = [];
    for(let key in colorList){
    arr.push({
        rgba: `rgba(${key})`,
        num: colorList[key]
    })}
    arr = arr.sort((a,b) => b.num - a.num)
    let Rand1 = Math.random();
    let range=arr.length-1
		Rand1=Math.round(Rand1*range)
    let Rand2 = Math.random();
		Rand2=Math.round(Rand2*range)
    theme.linnear=arr[Rand2].rgba+','+arr[Rand1].rgba+','+arr[Rand2].rgba
    })  
}
  interface Theme{
    background:string,
    linnear:string
  }
  let background=["../image/sea_sunset_horizon_131804_1280x720.jpg",'../image/wallhaven-43z8x3.jpg','../image/forest_mountains_moon_121180_1280x720.jpg','../image/autumn_forest_path_122375_1280x720.jpg','../image/bridge_river_flow_100663_1280x720.jpg','../image/eruption_lava_volcano_45542_1280x720.jpg','../image/sunset_sky_clouds_121865_1280x720.jpg']
  let rand = Math.random();
  let max=background.length
  console.log(background.length)
	rand=Math.floor(Math.random() * max);
  let theme=reactive({background:background[rand],linnear:""})
  function changetheme(){
    rand=Math.floor(Math.random() * max);
    while(background[rand]==theme.background)
    {
	    rand=Math.floor(Math.random() * max);
    }
    console.log(rand)
    theme.background=background[rand]
  }
  function personalize(){

  }
  onMounted(()=>{
    colormain("back")
  })
</script>

<template>
  <img id="back" :src="theme.background">
  <div id="app">
      <div id="theme">
        <ul>
          <el-button @click="changetheme">更换主题</el-button>
          <el-button @click="personalize">自定义主题</el-button>
        </ul>
      </div>
    <div class="show">
      
      <RouterView :linnear="theme.linnear"></RouterView>
    </div>
    
  </div>
</template>
<style scoped>
  #back{
    position: absolute;
    height: 100%;
    width:100%;
    object-fit: fill;
    background-size:auto;
  }
  #app{
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .show{
    flex:1;
    display: flex;
    justify-content: center;
    z-index: 90;
    margin-top: auto;
    border-radius: 5px;
    height: auto;
  }
  .show #log{
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  }
  #theme ul{
    display: flex;
    flex-direction: row;
    width: 40%;
    list-style: none;
    color: black;
  }
  #theme ul li{
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
    border-bottom-right-radius: 10px;
    padding: 10px 15px;
    margin: 0px 10px;
  }
</style>