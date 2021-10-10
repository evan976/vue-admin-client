<template>
  <Markdown v-model="content"/>
</template>

<script>
import Markdown from 'vue-meditor'

export default {
  name: 'Meditor',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  components: {
    Markdown
  }
}
</script>

<style>

</style>