<script lang="ts" setup>
    import router from '@/router';
import {reactive} from 'vue'
    import {} from 'vue-router'
    defineProps(["linnear"])
    let ruleForm=reactive({
          account: '',
          pass: '',
          vali: '',
          checkPass:''
        })
    let user=reactive({Username:'',Email:'',Password:''})
    function submitForm(Formname:string){
        console.log(Formname)
        alert("注册成功")
        router.push({path:'/login'})
    }
    let validatePass=(rule:object,value:string,callback:any)=>{
        if (value===''){
            console.log(value)
           return  callback(new Error('请输入账号'));
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
    let validatePass3=(rule:object,value:string,callback:any)=>{
        if (value===''){
            callback(new Error('请确定密码'));
        }
        else if (value!==ruleForm.pass){
            callback(new Error('两次密码输入不一致'))
        }
        else{
                console.log(ruleForm)
                callback()
            }
        }
    let checkVali=(rule:object,value:string,callback:any)=>{
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else{
            callback()
        }
    }
    let rules={
        account: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkPass: [
            {validator: validatePass3, trigger: 'blur'}
          ],
          vali: [
            { validator: checkVali, trigger: 'blur' }
          ]
    }

</script>

<template>
    <div id="log">
        <div class="left">
            <RouterLink to="/login" class="blink">已有账号，点击登录</RouterLink>
        </div>
        <div class="right">
            <h2>注册账号</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleform" class="demo-ruleForm" style="margin: auto;">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确定密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vali">
                    <el-input v-model.number="ruleForm.vali"></el-input>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="blink">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
    #log{
        margin: auto;
        display: flex;
        z-index: 90;
        border-radius: 5px;
        justify-content: space-around;
        flex-direction: row;
        width: 40%;
        height: 50%;
        font-family: "Microsoft soft";
    }
    .right h2{
        margin-top: 30px;
    }
    .right{
        flex:1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        background-color:#f0f0f0  ;
    }
    .left{
        flex:1;
        display: flex;
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
        position:relative;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transform-style: preserve-3d;
    }
    .blink:hover{
        animation: animate 8s linear infinite;
    }
    .blink::before{
        content: '';
        position:absolute;
        width: 100%;
        height: 100%;
        inset: -5px;
        z-index: -1;
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        border-radius: 40px;
        opacity: 0;
    }
    .blink:hover::before{
        filter: blur(20px);
        opacity: 1;
        transform: translateZ(-1px);
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
    }
    .left a{
    width: 70%;
    text-decoration: none;
    color: white;
    font-weight: bold;
    }


</style>
