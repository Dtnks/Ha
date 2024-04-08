<script lang="ts" setup>
    defineProps(["linnear"])
    import router from '@/router'
    import {reactive} from 'vue'
    function submitForm(Formname:object){
        console.log(Formname)
        
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

</script>

<template>
    <div id="log">
        <div class="left">
            <h2>欢迎登录</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleform" class="demo-ruleForm" style="margin: auto;">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vali">
                    <el-input v-model.number="ruleForm.vali"></el-input>
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
</style>
