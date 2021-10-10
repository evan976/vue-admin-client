<template>
  <div class="not-found-container">
    <img class="image" src="@/assets/images/404.svg" />
    <p class="text">
      你好像掉入了知识的万丈深渊
      <el-link class="link" href="/" type="primary">回到首页</el-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image {
    width: 420px;
  }
  .link {
    font-size: 16px;
    vertical-align: 0.5px;
    font-weight: normal;
  }
}
</style>