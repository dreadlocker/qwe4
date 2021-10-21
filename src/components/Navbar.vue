<template>
  <div id="nav">
    <router-link to="/">Продукти</router-link> |
    <router-link to="/about">Контакти</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

#nav {
  height: $navbar-height;
  margin: 10px $navbar-margin-top 0 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
