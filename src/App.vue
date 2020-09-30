<template>
  <div id="app">
    <div id="nav">
    <router-view/>
    </div>
  </div>
</template>
<script>
import { sessionSet, sessionGet } from './utils/mysession'
export default {
  created () {
    // 进入取sessionStorage
    if (sessionGet('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, sessionGet('store')))
    }
    // 刷新存sessionStorage
    window.addEventListener('beforeunload', () => {
      sessionSet('store', this.$store.state)
    })
  }
}
</script>

<style lang="less">
@import url(~@/style/base.css);
</style>
