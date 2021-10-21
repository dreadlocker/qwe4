<template>
  <div class="loader-holder">
    <div class="circles-holder">
      <div class="statc-circle"></div>
      <div class="moving-circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped lang="scss">
.loader-holder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  .circles-holder {
    width: 100px;
    height: 100px;
    position: relative;
    .statc-circle {
      width: 100%;
      height: 100%;
      border: 1px solid #dddddd;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .moving-circle {
      width: 102%;
      height: 100%;
      border-top: 3px solid #2a9f00;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      animation: rotate 1s linear infinite;
    }
  }
}
</style>
