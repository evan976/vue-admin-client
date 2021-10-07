<template>
  <el-container class="app-layout">
    <Header />
    <el-container>
      <Aside />
      <div class="app-main">
        <Breadcrumb />
        <el-main>
          <router-view />
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Layout',
  components: {
    Header,
    Aside,
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.app-layout {
  height: 100%;
  flex-direction: column;
  .app-main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>