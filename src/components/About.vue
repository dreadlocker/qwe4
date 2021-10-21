<template>
  <div class="about">
    <div class="info-holder">
      <img class="pic" alt="shop image" src="https://i.ibb.co/rfyWFBv/TJs6gLJg.jpg">
    </div>
    <div class="info-holder">
      <div>Адрес:</div>
      <div class="info">улица „Кольо Ганчев“ 45, Стара Загора, 6000 </div>
    </div>
    <div class="info-holder">
      <div>Телефони:</div>
      <a class="phones" href="tel:+359876505078">+359 876 505 078</a>
      <a class="phones" href="tel:+359885542229">+359 885 542 229</a>
    </div>
    <div class="info-holder">
      <div>
        <a
          class="info"
          target="_blank"
          href="https://maps.app.goo.gl/wT4B5bbjFavDa73P8"
          >Google Maps</a
        >
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.about {
  width: 100%;
  height: fit-content;
  min-height: $about-content-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .info-holder {
    margin: 20px 0;
    .pic {
      width: auto;
      height: 300px;
    }
    .info {
      font-weight: bold;
    }
    .phones {
      display: block;
    }
  }
}

@media only screen and (orientation: landscape) {
  .pic {
    height: 150px !important;
  }
}
</style>
