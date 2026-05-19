<!-- 顶部个人信息 -->
<template>
  <div class="box">
    <div class="flex_column flex_column_center">
      <el-dropdown placement="bottom-end" split-button size="default">
        {{ state.name }}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="resetPwd">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="密码修改"
      v-model="state.dialogVisible"
      :close-on-click-modal="state.canCloseDialog"
      :close-on-press-escape="state.canCloseDialog"
      :show-close="state.canCloseDialog"
      width="450px"
      @close="resetPwdFormData(formDataRef)"
      append-to-body
    >
      <el-form :model="state.formData" label-position="left" :rules="rules" ref="formDataRef">
        <el-form-item>
          <p class="fc-warning tc" v-if="!state.canCloseDialog">密码已过期，请设置新密码</p>
        </el-form-item>
        <el-form-item label="原密码" label-width="80px" prop="oldPassword">
          <el-col :span="23">
            <el-input
              type="password"
              v-model="state.formData.oldPassword"
              auto-complete="off"
              :maxlength="20"
              placeholder="请输入原密码"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newPassword">
          <el-col :span="23">
            <el-input
              type="password"
              v-model="state.formData.newPassword"
              auto-complete="off"
              :maxlength="20"
              placeholder="请输入新密码"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="cnewPassword">
          <el-col :span="23">
            <el-input
              type="password"
              v-model="state.formData.cnewPassword"
              auto-complete="off"
              :maxlength="20"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer" style="text-align: center">
          <el-button
            type="primary"
            @click="submitForm(formDataRef)"
            :disabled="state.btnDisabled"
            :loading="state.btnDisabled"
            >确认</el-button
          >
        </div>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import User from '@/api/User'
const router = useRouter()
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== state.formData.newPassword) {
    callback(new Error('两次新密码不一致'))
  } else {
    callback()
  }
}
const formDataRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在6到18个字符', trigger: 'blur' }
  ],
  cnewPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})
// 状态管理
const state = reactive({
  userInfo: '', // 用户基本信息
  name: '', // 用户名称
  dialogVisible: false, // 修改密码弹窗
  btnDisabled: false, // 修改密码按钮
  formData: {
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    cnewPassword: '', // 确认密码
    phone: '' // 坐席电话
  },
  canCloseDialog: true
})

// 退出登录
const logout = () => {
  ElMessageBox.confirm('确认退出吗?', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      User.delInfo()
      router.replace('/login')
    })
    .catch(() => {
      return false
    })
}
// 重置表单
const resetPwdFormData = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 修改密码
const resetPwd = () => {
  state.dialogVisible = true
}
// 修改密码表单提交
const submitForm = (formName: FormInstance | undefined) => {
  if (!formName) return
  formName.validate((valid) => {
    if (valid) {
      const params = {
        oldPassword: state.formData.oldPassword,
        newPassword: state.formData.newPassword
      }
      state.btnDisabled = true
      User.resetPassWord(params).then((data) => {
        state.btnDisabled = false
        if (data.code === 0) {
          ElMessageBox.confirm('用户密码修改成功, 是否退出重新登录?', '提示', {
            type: 'success',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              User.delInfo()
              router.replace('/login')
            })
            .catch(() => {
              return false
            })
        } else {
          ElMessage({ message: data.msg, type: 'error' })
        }
      })
    } else {
      console.log('error submit!')
      return
    }
  })
}

// 初始化
const init = () => {
  const userInfo = User.getInfo()
  state.name = userInfo.userName
  state.userInfo = userInfo
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  // padding-right: 15px;
}
:deep(.el-dropdown) {
  background-color: #fff;
}
:deep(.el-dropdown:hover) {
  outline: none;
}
:deep(.el-dropdown-link:hover) {
  outline: none;
}
</style>
