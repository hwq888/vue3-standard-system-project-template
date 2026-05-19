<template>
  <div id="h-loginBox">
    <div class="loginBox">
      <el-form
        label-position="left"
        label-width="0px"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="h-loginForm loginform"
      >
        <div class="login-header flex_column flex_center">
          <img class="login-logo" src="../assets/imgs/logo.png" alt="logo" />
          <p class="project-name">{{sysName}}</p>
          <p class="welcome-text">安全 · 高效 · 智能</p>
        </div>
        <el-form-item prop="account">
          <el-input
            name="account"
            v-model="ruleForm.account"
            auto-complete="off"
            placeholder="请输入账号"
            @keyup.enter="submitForm(ruleFormRef)"
            class="login_input"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            name="password"
            v-model="ruleForm.password"
            auto-complete="off"
            placeholder="请输入密码"
            @keyup.enter="submitForm(ruleFormRef)"
            class="login_input"
          ></el-input>
        </el-form-item>
        <el-checkbox
          class="login_check"
          v-model="ruleForm.checked"
          checked
        >
          记住账号
        </el-checkbox>
        <el-form-item class="mt10" style="width: 100%">
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm(ruleFormRef)"
            :disabled="ruleForm.loading"
            :loading="ruleForm.loading"
            >登录</el-button
          >
        </el-form-item>
        <div class="hint-text">推荐使用Chrome浏览器访问本系统</div>
      </el-form>
    </div>
    <div id="login_bg"></div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, onMounted, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import User from '../api/User'
import { sysDomainCode, sysName } from '@/globalSettings'
import utils from '@/assets/js/utils'
let router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  account: '',
  password: '',
  checked: true,
  loading: false
})
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 18, message: '账号长度在3到18个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在6到18个字符', trigger: 'blur' }
  ]
})
// 登录表单提交
const submitForm = (formName: FormInstance | undefined) => {
  if (!formName) return
  formName.validate((valid) => {
    if (valid) {
      console.log('submit!')
      ruleForm.loading = true
      const params = {
        domainCode: sysDomainCode,
        username: ruleForm.account,
        password: ruleForm.password
      }
      User.login(params)
        .then((data: any) => {
          const { code, result, msg } = data
          if (code === 0) {
            User.saveInfo(JSON.stringify(result.user)) // 保存用户信息
            utils.setCookie('UserLoginToken', result.token, '720') // 24小时x30天 = 720小时
            if (ruleForm.checked) {
              utils.setCookie('UserLoginName', ruleForm.account, '720') // 记住用户名24小时x30天 = 720小时
            } else {
              utils.deleteCookie('UserLoginName') // 删除用户名
            }
            router.push({ path: '/home' })
          } else {
            ElMessage({
              message: msg,
              type: 'error'
            })
            ruleForm.loading = false
          }
        })
        .catch((error: any) => {
          ruleForm.loading = false
          // this.CodeImg()
          ElMessage(error)
        })
    } else {
      console.log('error submit!')
      return
    }
  })
}
// 页面加载后执行
onMounted(() => {
  const _name = utils.getCookie('UserLoginName')
  if (_name) {
    ruleForm.account = _name
  }
})
</script>

<style lang="scss" scoped>
.loginBox {
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -210px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 340px;
  padding: 20px 40px 30px;
  border-radius: 20px;
  background: rgba(16, 33, 54, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(64, 158, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 60, 136, 0.3), 0 0 40px rgba(0, 140, 255, 0.1) inset;
  // transform: translateY(0);
  // transition: all 0.5s ease;
  // animation: float 6s ease-in-out infinite;
}
// @keyframes float {
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-10px);
//   }
// }

.login-header {
  margin: 0px auto 30px;
  text-align: center;
  .login-logo {
    display: block;
    width: 80px;
    height: auto;
    margin: 20px 0 0 0;
  }
  .project-name {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
    background: linear-gradient(90deg, #e0f0ff, #4facfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .welcome-text {
    font-size: 16px;
    color: #a0c8ff;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 300;
  }
}
#h-loginBox .h-loginForm {
  position: relative;
  z-index: 999;
  .login_input {
    height: 44px;
    // border: 1px solid #c7cccf;
    border-radius: 4px;
    overflow: hidden;
    :deep(.el-input__wrapper) {
      border-radius: 4px;
      background-color: rgba(12, 26, 44, 0.7);
      border: 1px solid rgba(64, 158, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 60, 136, 0.3), 0 0 40px rgba(0, 140, 255, 0.1) inset;
      input {
        color:#e0f0ff;
      }
      
    }
  }
  .login_check {
    margin: 0px 0px 20px 0px; 
    float: left; 
    color: #545a64;
    :deep(.el-checkbox__label){
      color: #fff;
    }
  }
  .login-btn {
    width: 100%;
    height: 50px;
    border-radius: 10px !important;
    background: linear-gradient(90deg, #1a5cff, #00c6ff) !important;
    border: none !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    letter-spacing: 1px;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(26, 92, 255, 0.4) !important;
    position: relative;
    overflow: hidden;
  }
  .login-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(26, 92, 255, 0.6) !important;
  }
  .login-btn:active {
    transform: translateY(1px);
  }
  .login-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s ease;
  }
  .login-btn:hover::after {
    left: 100%;
  }
  .hint-text {
    text-align: center;
    font-size: 12px;
    color: #5a8cbc;
    margin-top: 20px;
    letter-spacing: 0.5px;
  }
}

#login_bg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: linear-gradient(135deg, #0a1929 0%, #0c223a 100%);
  z-index: 0;
  left: 0;
  top: 0;
}


</style>
