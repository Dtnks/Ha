<script lang="ts" setup>
    defineProps(["linnear"])
    import router from '@/router'
    import {reactive,onMounted,ref} from 'vue'
    let code=ref<string|null>(localStorage.getItem('code'))
  // 设置本地存储，避免因为刷新而更换背景
    let co=ref("rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")")
    let random=new Array<number|string>(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    localStorage.setItem('code',code.value as string)
    function submitForm(Formname:object){

        router.push({path:'/home'})
    }
    let validatePass=(rule:object,value:string,callback:any)=>{
        if (value===''){
            console.log(value)
            callback(new Error('请输入账号'));
        }
        else{
            callback()
        }
    }
    let validatePass2=(rule:object,value:string,callback:any)=>{
        if (value===''){
            callback(new Error('请输入密码'));
        }
        else{
            callback()
        }
    }
    let checkVali=(rule:object,value:string,callback:any)=>{
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else if(code.value!=ruleForm.vali){
            callback(new Error("验证码错误"))
        }
        else{
            callback()
        }
    }
    let ruleForm=reactive({
          account: '',
          pass: '',
          vali: ''
        })
    let rules={
        account: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          vali: [
            { validator: checkVali, trigger: 'blur' }
          ]
    }
    function changeCode(){
        code.value=''
        co.value="rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"
        let codelis=''
        for (let i=0;i<4;i++){
            codelis=codelis+random[Math.floor(Math.random()*62)]
        }
        code.value=codelis
    }
    function draw() {
      let canvas_width =  (document.querySelector(".valitext") as HTMLCanvasElement).clientWidth;
      let canvas_height = (document.querySelector(".valitext") as HTMLCanvasElement).clientHeight;
      let canvas = document.getElementsByClassName("valitext")[0] as HTMLCanvasElement; //获取到canvas
      let context = canvas.getContext("2d") as CanvasRenderingContext2D; //获取到canvas画图
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      
      var aLength = 4; //获取到数组的长度
      changeCode()
      //4个验证码数
      for (var i = 0; i <= 3; i++) {
        var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = (code.value as string)[i]; //得到随机的一个内容
        // show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = co.value;
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
      }
      //验证码上显示6条线条
      for (var i = 0; i <= 5; i++) {
        context.strokeStyle = co.value;
        context.beginPath();
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        );
        context.stroke();
      }
      //验证码上显示41个小点
      for (var i = 0; i <= 40; i++) {
        context.strokeStyle = co.value;
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    }
    if (code.value==="[object Object]"){
        draw()
    }
    onMounted(()=>{
        if (document.querySelector(".valitext")!==null)
            draw()})
</script>

<template>
    <div id="log">
        <div class="left">
            <h2>欢迎登录</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleform" class="demo-ruleForm" style="margin: auto;" label-width="auto" label-position="right">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vali">
                    <div class="line">
                        <el-input v-model.number="ruleForm.vali" ></el-input>
                        <canvas class="valitext" @click="draw()" ref="convas"></canvas>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleForm)" class="blink">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <RouterLink to="/signin" class="blink">没有账号，点击注册</RouterLink>
        </div>
    </div>
</template>

<style scoped>
    #log{
        margin: auto;
        display: flex;
        border-radius: 5px;
        justify-content: space-around;
        flex-direction: row;
        width: 40%;
        height: 50%;
        font-family: "Microsoft soft";
    }
    .left h2{
        margin-top: 30px;
    }
    .left{
        flex:1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        padding: 0 15px;
        background-color:#f0f0f0  ;
    }
    .right{
        flex:1;
        display: flex;
        backdrop-filter: blur(4px);
        justify-content: center;
    }
    input{
        width: 70%;
        margin: auto;
        outline-style: none ;
        border: 1px solid #ccc; 
        border-radius: 8px;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
    }
    .blink{
        width: 50%;
        margin: auto;
        position: relative;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
    }
    .blink{
        color: white;
    }
    .blink:hover{
        animation: animate 8s linear infinite;
    }
    @keyframes animate{
        from {
            background-position: 0%;
        }
        to{
            background-position: 400%;
        }
    } 
    #forget{
        cursor: pointer;
        font-size: 14px;
    }
    .right a{
    width: 70%;
    text-decoration: none;
    color: white;
    font-weight: bold;
    }
    .valitext{
        min-width: 100px;
        height: 30px;
        font-family: Arial;
        font-style: italic;
        font-weight: bold;
        border: 0;
        user-select:none;
        letter-spacing: 2px;
        background-color: white ;
    }
    .line{
        display: flex;
        flex-direction: row;
    }
</style>
