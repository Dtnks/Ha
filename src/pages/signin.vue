<script lang="ts" setup>
    import router from '@/router';
    import {reactive,ref} from 'vue'
    import{type FormInstance } from 'element-plus';
    import {postSignInfo} from '@/api/request'

    //数据定义
    const ruleFormRef=ref<FormInstance>()
    defineProps(["linear","back"])
    let ruleForm=reactive({
          account: '',
          pass: '',
          vali: '',
          checkPass:''
        })

    //表单提交
    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                postSignInfo({password:ruleForm.pass,username:ruleForm.account,role:1,shopId:1}).then((res)=>{
                    if (res){
                        ElMessage({
                        message: '注册成功',
                        grouping: true,
                        type: 'success',
                        })
                        router.push({path:'/login'})
                    }
                    else{
                        ElMessage({
                        message: '用户已被注册',
                        grouping: true,
                        type: 'error',
                        })
                    }
                }).catch(()=>{
                    ElMessage({
                    message: '网络错误',
                    grouping: true,
                    type: 'error',
                    })
                })
                
           
                
            } else {
            console.log('error submit!')
            return false
            }
        })
        }

    //表单校验
    let valiempty=(rule:object,value:string,callback:any)=>{
        if (value===''){
           callback(new Error('请输入内容'));
        }
        else{
            callback();
        }
    }
    let validatePass3=(rule:object,value:string,callback:any)=>{
        if (value===''){
            callback(new Error('请确定密码'));
        }
        else if (value!==ruleForm.pass){
            callback(new Error('两次密码输入不一致'));
        }
        else{
                callback();
            }
        }
    let checkVali=(rule:object,value:string,callback:any)=>{
        if (!value) {
            callback(new Error('验证码不能为空'));
        }
        else{
            callback();
        }
    }
    let rules=reactive({
        account: [
            { validator: valiempty, trigger: 'blur' }
          ],
          pass: [
            { validator: valiempty, trigger: 'blur' }
          ],
          checkPass: [
            {validator: validatePass3, trigger: 'blur'}
          ],
          vali: [
            { validator: checkVali, trigger: 'blur' }
          ]
    })

</script>

<template>
    <div id="log">
        <div class="left">
            <RouterLink to="/login" class="blink">已有账号，点击登录</RouterLink>
        </div>
        <div class="right">
            <h2>注册账号</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" class="demo-ruleForm" style="margin: auto;">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确定密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" class="blink">注册</el-button>
                </el-form-item>
            </el-form>
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
    .right h2{
        margin-top: 30px;
    }
    .right{
        flex:1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        padding: 0 15px;
        background-color:#f0f0f0  ;
    }
    .left{
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
        position:relative;
        font-family: "Microsoft soft",serif;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linear));
        background-size: 400%;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
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
    }
    .left a{
    width: 70%;
    text-decoration: none;
    color: white;
    font-weight: bold;
    }
</style>
