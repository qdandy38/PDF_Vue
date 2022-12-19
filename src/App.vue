<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>
<style lang="css" scoped>
.app{
  @apply
  w-screen
  h-screen
  bg-gray-50;
}
</style>
