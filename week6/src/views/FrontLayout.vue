<template>
  前台頁面
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/products">產品頁表</router-link> |
  <router-link to="/cart">購物車</router-link>
  <hr>
  <RouterView> </RouterView>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
