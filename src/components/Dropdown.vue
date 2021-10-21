<template>
  <div class="wrapper">
    <label v-if="!hideText" for="products">Филтър за протукти: </label>
    <select
      @change="onChange($event)"
      :value="dropdownValue"
      name="products"
      id="products"
    >
      <option :value="filterAll">{{ filterAll }}</option>
      <option
        v-for="(category, index) in this.$store.state.categories"
        :key="index"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
import { filterAll } from "@/assets/constants.js";
import { mapState } from "vuex";

export default {
  name: "Dropdown",
  props: {
    hideText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterAll: filterAll,
    };
  },
  computed: {
    dropdownValue() {
      const dropdownValue = this.$store.state.dropdownValue;
      return dropdownValue ? dropdownValue : filterAll;
    },
  },
  methods: {
    onChange(e) {
      const category = e.target.value;

      this.$store.commit("saveFilteredProducts", category);
      this.$store.commit("saveDropdownSelect", category);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.wrapper {
  margin-top: $navbar-margin-bottom;
}
</style>
