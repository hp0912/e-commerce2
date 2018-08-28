<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.body.removeChild(document.getElementById('Loading'))
  },
  mounted () {
    let cartList = JSON.parse(localStorage.getItem('cartList'))
    if (cartList) {
      this.$store.dispatch('updateCart', {cartList})
    }
  }
}
</script>

<style>

</style>
