<!-- 消息提示 -->
<template>
  <div class="box">
    <el-popover :width="300" placement="bottom" trigger="hover">
      <template #reference>
        <el-badge :value="state.messageNum" :max="99" class="item">
          <el-icon><Bell /></el-icon>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="state.activeName" @tab-click="fetchData">
          <el-tab-pane label="通知" name="notice">
            <div class="notice-list">
              <el-scrollbar>
                <ul>
                  <li v-for="(item, index) in state.list" :key="index">
                    <el-avatar :size="45" :src="item.image" />
                    <span v-html="item.notice" />
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邮件" name="email">
            <div class="notice-list">
              <el-scrollbar>
                <ul>
                  <li v-for="(item, index) in state.list" :key="index">
                    <el-avatar :size="45" :src="item.image" />
                    <span>{{ item.email }}</span>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="notice-clear" @click="handleClearNotice">
          <el-button link>
            <el-icon><Delete /></el-icon>
            <span>清空消息</span>
          </el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Bell, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
interface List {
  image: string
  notice: string
  email: string
}
// 状态管理
const state = reactive({
  messageNum: 9,
  activeName: 'notice',
  list: [] as List[]
})
// 数据获取
const fetchData = () => {
  state.list = [
    {
      email: 't.vpugk@owevbdtvp.coop',
      image: 'https://i.gtimg.cn/club/item/face/img//8/15918_100.gif',
      notice:
        'Admin Plus（vue3.0）体验地址（不代表最终效果，2021年2月28日前全款购买pro的用户可免费升级）：<a target="_blank" href="http://chu1204505056.gitee.io/admin-plus?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>'
    },
    {
      email: 'd.tqrjyjwq@gnqa.to',
      image: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
      notice:
        '官方QQ群1：972435319、官方QQ群2：1139183756，购买PRO请在演示地址首页付款人民币699元，完成付款后联系QQ 1204505056 即可'
    },
    {
      email: 'm.trqdcex@wedmrecnw.pm',
      image: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
      notice:
        'vue3.0 + element-plus 体验地址：<a target="_blank" href="http://chu1204505056.gitee.io/vue-admin-beautiful-element-plus?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>'
    },
    {
      email: 'x.rki@ktyauks.ke',
      image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
      notice:
        'vue3.0 + antdv 体验地址：<a target="_blank" href="http://chu1204505056.gitee.io/vue-admin-beautiful-antdv?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>'
    },
    {
      email: 'd.yqugdjkoxi@nbceonrie.uy',
      image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
      notice:
        'github开源地址：<a target="_blank" href="https://github.com/chuzhixin/vue-admin-beautiful">点我</a>'
    },
    {
      email: 'h.unuupjimu@iomojgkxx.ma',
      image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
      notice:
        '开源中国地址：<a target="_blank" href="https://www.oschina.net/p/vue-admin-beautiful">点我</a>'
    },
    {
      email: 'x.njpgdbc@deqpodncy.ru',
      image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
      notice:
        "gitee开源地址：<a target='_blank' href='https://gitee.com/chu1204505056/vue-admin-beautiful?_from=gitee_search'>点我</a>"
    }
  ]
}
// 清空数据
const handleClearNotice = () => {
  state.messageNum = 0
  state.list = []
  ElMessage({ message: '清空消息成功', type: 'success' })
}

// 加载完成后执行
onMounted(() => {
  fetchData()
})
</script>
<style lang="scss" scoped>
.box {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.notice-list {
  height: 29vh;
  ul {
    padding: 0 15px 0 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 0;
      :deep(.el-avatar) {
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span {
        margin-left: 10px;
      }
    }
  }
}
.notice-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #e8eaec;

  i {
    margin-right: 3px;
  }
}
</style>
