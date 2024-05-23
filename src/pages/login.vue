<script lang="ts" setup>
import router from '@/router'
import {reactive,onMounted,ref} from 'vue'
import {postLoginInfo} from '@/api/request'
import {UserStore} from "@/stores/user"
import pinia from "@/stores/user"
import{ ElMessage, type FormInstance } from 'element-plus';

//数据定义
defineProps(["linear"])
const ruleFormRef=ref<FormInstance>()
const store=UserStore(pinia)
let code=ref<string|null>(localStorage.getItem('code'))
let co=ref("rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")")
let random=new Array<number|string>(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
localStorage.setItem('code',code.value as string)
let validEmpty=(rule:object, value:string, callback:any)=>{
  if (value===''){
    callback(new Error('请输入内容'));
  }
  else{
    callback()
  }
}

//提交表单
const submitForm = (formEl: FormInstance | undefined) => {
if (!formEl) return
    formEl.validate((valid)=>{
        if (valid) {
            postLoginInfo({
            password:ruleForm.pass,
            username:ruleForm.account
        }).then(()=>
        {
            ElMessage({
                message:"登陆成功",
                type:"success",
                plain:true
            })
            store.token="2"
            localStorage.setItem('token',"2")
            router.push('/home')
        }).catch(()=>{
            ElMessage({
                message:"账号密码错误",
                type:"error",
                plain:true
            })
        })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

//表单校验
let checkValid=(rule:object, value:string, callback:any)=>{
  if (!value) {
    return callback(new Error('验证码不能为空'));
  }
  else if(code.value?.toUpperCase!==ruleForm.valid.toUpperCase){
    callback(new Error("验证码错误"))
  }
  else{
    callback()
  }
}
let ruleForm=reactive({
  account: '',
  pass: '',
  valid: ''
})
let rules={
  account: [
    { validator: validEmpty, trigger: 'blur' }
  ],
  pass: [
    { validator: validEmpty, trigger: 'blur' }
  ],
  valid: [
    { validator: checkValid, trigger: 'blur' }
  ]
}

//改变页面验证码
function changeCode(){
  code.value=''
  co.value="rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"
  let codeList=''
  for (let i=0;i<4;i++){
    codeList=codeList+random[Math.floor(Math.random()*62)]
  }
  code.value=codeList
}
function draw() {
  //文字在canvas上的x坐标
  let y;
  let x;
  let i;
  let canvas_width =  (document.querySelector(".validText") as HTMLCanvasElement).clientWidth;
  let canvas_height = (document.querySelector(".validText") as HTMLCanvasElement).clientHeight;
  let canvas = document.getElementsByClassName("validText")[0] as HTMLCanvasElement; //获取到canvas
  let context = canvas.getContext("2d") as CanvasRenderingContext2D; //获取到canvas画图
  canvas.width = canvas_width;
  canvas.height = canvas_height;

  //获取到数组的长度
  changeCode()
  //4个验证码数
  for (i = 0; i <= 3; i++) {
    let deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
    let txt = (code.value as string)[i]; //得到随机的一个内容
    // show_num[i] = txt.toLowerCase();// 依次把取得的内容放到数组里面
    x = 10 + i * 20;
    y = 20 + Math.random() * 8; //文字在canvas上的y坐标
    context.font = "bold 23px 微软雅黑";

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = co.value;
    context.fillText(txt, 0, 0);

    context.rotate(-deg);
    context.translate(-x, -y);
  }
  //验证码上显示6条线条
  for (i = 0; i <= 5; i++) {
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
  for (i = 0; i <= 40; i++) {
    context.strokeStyle = co.value;
    context.beginPath();
    x = Math.random() * canvas_width;
    y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}
if (code.value==="[object Object]"){
  draw()
}
onMounted(()=>{
  if (document.querySelector(".validText"))
    draw()})
</script>

<template>
    <div id="log">
        <div class="left">
            <h2>欢迎登录</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" class="demo-ruleForm" style="margin: auto;" label-width="auto" label-position="right">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="valid">
                    <div class="line">
                        <el-input v-model="ruleForm.valid" autocomplete="off"></el-input>
                        <canvas class="validText" @click="draw()" ref="canvas"></canvas>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" class="blink" autocomplete="off">登录</el-button>
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
        font-family: "Microsoft soft",serif;
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
        font-family: "Microsoft soft",serif;
        border: 1px solid #ccc;
        background-image:linear-gradient(90deg,v-bind(linear));
        background-size: 400%;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        color: white;
    }
    .blink:hover{
        animation: animate 8s linear infinite;
    }
    @keyframes animate{
        from {
            background-position: 0;
        }
        to{
            background-position: 400%;
        }
    }
    .right a{
        width: 70%;
        text-decoration: none;
        color: white;
        font-weight: bold;
    }
    .validText{
        min-width: 100px;
        height: 30px;
        font-family: Arial,serif;
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
