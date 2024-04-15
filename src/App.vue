<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import {onMounted, reactive,ref,watch} from 'vue'
  import { useRouter } from 'vue-router';
  let router = useRouter()
  let theme:object
  //模拟背景图片
  let background=["../image/sea_sunset_horizon_131804_1280x720.jpg",'../image/wallhaven-43z8x3.jpg','../image/forest_mountains_moon_121180_1280x720.jpg','../image/autumn_forest_path_122375_1280x720.jpg','../image/bridge_river_flow_100663_1280x720.jpg','../image/eruption_lava_volcano_45542_1280x720.jpg','../image/sunset_sky_clouds_121865_1280x720.jpg']
  // 设置本地存储，避免因为刷新而更换背景
  if (localStorage.getItem('theme')==null){
    let rand = Math.random();
    let max=background.length
    rand=Math.floor(Math.random() * max);  
    theme=reactive({background:background[rand],linnear:""})
  }
  else{
    let theme=reactive(JSON.parse(localStorage.getItem('theme') as string))
  }
  //从背景图中抽取颜色，得到主题色
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
    //数字越大，计算的越快
    i = i + 80000; 
    const key = [r,g,b,a].join(',')
    //判断颜色是否存在，存在则num+1，不存在则新加入字典
    key in colorList ? ++colorList[key] : (colorList[key] = 1)
    }
    let arr = [];
    for(let key in colorList){
    arr.push({
        rgba: `rgba(${key})`,
        num: colorList[key]
    })}
    arr = arr.sort((a,b) => b.num - a.num)
    //随机抽取颜色列表
    let range=arr.length-1
    let distance=0
    //避免渐变色相近
    let Rand1:number=0
    let Rand2:number=0
    while(distance<100)
    {
      Rand1=Math.round(Math.random()*range)
		  Rand2=Math.round(Math.random()*range)
      let rgb=arr[Rand1].rgba.split(",")
      let a =Number(rgb[0].split("(")[1]),b=Number(rgb[1]),c=Number(rgb[2])
      rgb=arr[Rand2].rgba.split(",")
      let d =Number(rgb[0].split("(")[1]),e=Number(rgb[1]),f=Number(rgb[2])
      distance=Math.abs(a-d)+Math.abs(b-e)+Math.abs(c-f)
    }
    theme.linnear=arr[Rand2].rgba+','+arr[Rand1].rgba+','+arr[Rand2].rgba
    })  
  }
  //改变主题
  function changetheme(){
    let max=background.length
    let rand=Math.floor(Math.random() * max);
    //避免抽到相同的背景图片，而主题不发生变化
    while(background[rand]==theme.background)
    {
	    rand=Math.floor(Math.random() * max);
    }
    theme.background=background[rand]
    colormain("back")
    localStorage.setItem('theme',JSON.stringify(theme))
    
  }
  setInterval(changetheme,720000)
  //每次改变的时候提取一次渐变色
    
  let move=ref("")
  watch(()=>router.currentRoute.value.fullPath,(to,from)=>{
    if(to==="/login"){
      move.value="moveleft"
    }
    if(to==="/signin"){
      move.value="moveright"
    }
    if(to==="/home/a"){
      move.value="fade"
    }
  })
</script>

<template>
  <div id="app">
    <img id="back" :src="theme.background">
    <div class="show">
      <router-view v-slot="{ Component, route }" :linnear="theme.linnear" >
        <!-- 使用任何自定义过渡和回退到 `fade` -->
        <transition :name="move" >
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </div>
  
    
</div>
</template>
<style scoped>
  #back{
    position: absolute;
    height: 100%;
    width:100%;
    object-fit: fill;
    z-index: -1;
    background-size:auto;
  }
  .high{
    height: 100%;
  }
  #app{
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    min-width: 1200px;
    min-height: 800px;
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
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
  .moveleft-enter-active{
    animation: move1 .5s ease-in;
  }
  @keyframes move1{
    0% {transform: translateX(1000px);}
    100% {transform: translateX(-400px);}
  }
  .moveleft-leave-active{
    animation: move2 .5s ease-in;
  }
  @keyframes move2{
    0% {transform: translateX(400px);}
    100% {transform: translateX(-1000px);}
  }
  .moveright-enter-active{
    animation: move3 .5s ease-in;
  }
  @keyframes move3{
    0% {transform: translateX(-1800px);}
    100% {transform: translateX(-400px);}
  }
  .moveright-leave-active{
    animation: move4 .5s ease-in;
  }
  @keyframes move4{
    0% {transform: translateX(400px);}
    100% {transform: translateX(1800px);}
  }
  .fade-enter-active{
    animation:fadein .2s ease-in;
  }
  @keyframes fadein{
    0%{transform: translateX(400px)};
    100%{transform: translateX(-1000px)};
  }
  .fade-leave-active{
    animation: fadeout .2s ease-in;
  }
  @keyframes fadeout{
    0%{transform: translateX(400px)};
    100%{transform: translateX(400px)};
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