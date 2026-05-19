<template>
  <div class="page-container">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-message">
        抱歉，您访问的页面不存在或已丢失
      </div>
      <div class="error-hint">
        请检查网址是否正确，或点击下方按钮返回首页
      </div>
      <!-- 使用Element Plus按钮 -->
      <el-button 
        type="primary" 
        size="large" 
        class="home-button"
        @click="goHome"
      >
        <el-icon><HomeFilled /></el-icon>返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'
const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1929 0%, #0c223a 100%);
}
.error-content {
  text-align: center;
  max-width: 800px;
  padding: 40px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.6s ease-out;
  .error-code {
    font-size: 88px;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 10px 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .error-message {
    font-size: 30px;
    font-weight: 600;
    color: #ecf0f1;
    margin: 20px 0 10px;
    letter-spacing: 1px;
  }
  .error-hint {
    font-size: 18px;
    color: #bdc3c7;
    max-width: 500px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }
  .home-button {
    padding: 15px 40px;
    font-size: 16px;
    border-radius: 50px;
    transition: all 0.3s ease;
    background: linear-gradient(90deg, #1a5cff, #00c6ff);
    border: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }
    &:active {
      transform: translateY(1px);
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-content {
    padding: 30px 20px;

    .error-code {
      font-size: 6rem;
    }

    .error-message {
      font-size: 1.5rem;
    }

    .error-hint {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .error-content {
    .error-code {
      font-size: 4.5rem;
    }
    .error-message {
      font-size: 1.3rem;
    }
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>