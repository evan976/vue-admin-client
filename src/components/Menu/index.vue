<template>
  <el-menu
    router
    class="menu"
    :default-active="$route.path"
    :unique-opened="true"
  >
    <div v-for="item in menuData" :key="item.path">
      <template v-if="!item.children">
          <el-menu-item :index="item.path">
              <i :class="item.meta.icon"></i>
              {{item.meta.title}}
          </el-menu-item>
      </template>
      <el-submenu v-else :index="item.path">
        <template slot="title">
            <i :class="item.meta.icon"></i>
            {{item.meta.title}}
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            {{child.meta.title}}
        </el-menu-item>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
import routes from '@/router/routes'

export default {
  name: 'Menu',
  data () {
    return {
      menuData: routes[1].children
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.menu {
  border: none;
  background-color: #1f1f1f;
  color: #fff;
}
</style>