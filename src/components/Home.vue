<template>
  <div>
    <Dropdown v-if="!adminStep && allProducts.length > 0" />
    <Products v-if="adminStep === 0" />
    <Login v-if="adminStep === 1" />
    <CategoriesEdit v-if="adminStep === 2" />
    <AddCategory v-if="adminStep === 3" />
    <AddProduct v-if="adminStep === 4" />
    <div class="footer"></div>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import Products from "@/components/Products.vue";
import Login from "@/components/Login.vue";
import CategoriesEdit from "@/components/CategoriesEdit.vue";
import AddCategory from "@/components/AddCategory.vue";
import AddProduct from "@/components/AddProduct.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Dropdown,
    Products,
    Login,
    CategoriesEdit,
    AddCategory,
    AddProduct,
  },
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
      allProducts: (state) => state.allProducts,
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.footer {
  width: 100%;
  height: $footer-height;
}
</style>
