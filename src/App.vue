<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import { reactive,ref,watch,onBeforeUnmount,onMounted} from 'vue'
  import { useRouter } from 'vue-router';
  let router = useRouter()
  interface Theme{
    background:string,linnear:string
  }
  let theme:Theme
  //模拟背景图片
  let day_back=['../image/v2-eb0d1de66109345c19acb153a800bdd2_r.jpg','../image/anime-anime-girls-Furina-Genshin-Impact-Genshin-Impact-2291772-wallhere.com.jpg','../image/wallhaven-43z8x3.jpg','../image/autumn_forest_path_122375_1280x720.jpg','../image/bridge_river_flow_100663_1280x720.jpg','../image/sunset_sky_clouds_121865_1280x720.jpg']
  let night_back=["../image/img1.wallspic.com-ryomen_ta_de_jiao-ka_tong-yi_shu-chuang_kou-hen_ku_de-3840x2160.jpg","../image/sea_sunset_horizon_131804_1280x720.jpg",'../image/forest_mountains_moon_121180_1280x720.jpg','../image/eruption_lava_volcano_45542_1280x720.jpg']
  let background=day_back
  // 设置本地存储，避免因为刷新而更换背景
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
    i = i + 240000; 
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
    let Rand1:number
    let Rand2:number
    do
    {
      Rand1=Math.floor(Math.random()*range)+1
		  Rand2=Math.floor(Math.random()*range)+1
      let rgb=arr[Rand1].rgba.split(",")
      let a =Number(rgb[0].split("(")[1]),b=Number(rgb[1]),c=Number(rgb[2])
      rgb=arr[Rand2].rgba.split(",")
      let d =Number(rgb[0].split("(")[1]),e=Number(rgb[1]),f=Number(rgb[2])
      distance=Math.abs(a-d)+Math.abs(b-e)+Math.abs(c-f)
    }while(distance<100)
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
  let timer:number
  onMounted(()=>{timer=setInterval(changetheme,720000),colormain("back")
  })
  onBeforeUnmount(()=>{clearInterval(timer)})
  //每次改变的时候提取一次渐变色
  let move=ref("")
  //监视路由转化，加入对应的动画效果
  watch(()=>router.currentRoute.value.fullPath,(to,from)=>{
    if(to==="/login" && from==="/signin"){
      move.value="moveleft"
    }
    else if(to==="/signin" && from==="/login"){
      move.value="moveright"
    }
    else if(to==="/home/a" && from==="/login"){
      move.value="fade"
    }
    else{
      move.value=''
    }
  })
  let value1=ref(true)
  let value2=ref(true)
  //切换背景的列表
  function backchange(to:boolean){
    if (to){
      background=day_back
    }
    else{
      background=night_back
    }
    localStorage.setItem("background",JSON.stringify(background))
    //防止按钮滑动不连畅，缺点是没法快速连点

    setTimeout(()=>changetheme(),400)
  }
  //是否自动切换背景
  function timeinterchange(to:boolean){
    if (to){
      setTimeout(()=>changetheme(),400)
      timer=setInterval(changetheme,720000),colormain("back")
    }
    else{
      clearInterval(timer)
    }
  }
  //判断浏览器本地有没有存下theme，并对应读取或初始化
  if (localStorage.getItem('theme')==null){
    let rand = Math.random();
    let max=background.length
    rand=Math.floor(Math.random() * max);  
    theme=reactive({background:background[rand],linnear:""})
  }
  else{
    theme=reactive(JSON.parse(localStorage.getItem('theme') as string))
  }
</script>

<template>
  <div id="app">
    <img id="back" :src="theme.background">
    <div class="show">
      <router-view v-slot="{ Component, route }" :linear="theme.linnear" >
        <!-- 使用任何自定义过渡和回退到 `fade` -->
        <transition :name="move" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </div>
  </div>
  <div id="options">
    <el-switch
      v-model="value1"
      class="ml-2"
      inline-prompt
      size="large"
      style="--el-switch-on-color:grey; --el-switch-off-color: black;"
      active-text="日间模式"
      inactive-text="夜间模式"
      @change="backchange(value1)"
    />
    <el-switch
      v-model="value2"
      class="ml-2"
      size="large"
      inline-prompt
      style="--el-switch-on-color: grey; --el-switch-off-color: black"
      active-text="自动切换"
      inactive-text="停止切换"
      @change="timeinterchange(value2)"
    />
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
  #app{
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    min-width: 1400px;
    min-height: 800px;
    flex-direction: column;
  }
  .show{
    flex:1;
    display: flex;
    justify-content: center;
    margin-top: auto;
    border-radius: 5px;
    height: auto;
  }
  .show #log{
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
  .moveleft-enter-active{
    animation: move1 .3s ease-in;
  }
  @keyframes move1{
    0% {transform: translateX(1200px);}
    100% {transform: translateX(0px);}
  }
  .moveleft-leave-active{
    animation: move2 .3s ease-in;
  }
  @keyframes move2{
    0% {transform: translateX(0px);}
    100% {transform: translateX(-1200px);}
  }
  .moveright-enter-active{
    animation: move3 .3s ease-in;
  }
  @keyframes move3{
    0% {transform: translateX(-1200px);}
    100% {transform: translateX(0px);}
  }
  .moveright-leave-active{
    animation: move4 .3s ease-in;
  }
  @keyframes move4{
    0% {transform: translateX(0px);}
    100% {transform: translateX(1200px);}
  }
  .fade-leave-active{
    animation: fadeout .5s ease-in;
  }
  @keyframes fadeout{
    0% {transform: translateY(0px);}
    100% {transform: translateY(-1200px);}
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
  #options{
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100px;
    bottom: 20px;
    left: 20px;
    z-index: 100;
  }
</style>