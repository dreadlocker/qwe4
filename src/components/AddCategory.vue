<template>
  <div class="wrapper">
    <label for="category">Име на НОВА категория за добавяне</label>
    <input v-model="name" id="category" type="text" autofocus />
    <button @click="addCategory">Добави</button>
    <button @click="goBack" class="btn">Назад</button>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";
import Dropdown from "@/components/Dropdown.vue";
import { mapState } from "vuex";
import { configUrlEncoded } from "@/utils/helper.js";

export default {
  name: "AddCategory",
  components: {
    Dropdown,
  },
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
    }),
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addCategory() {
      if (!this.name) return;

      const params = {
        name: this.name,
      };

      axios
        .post(`${BASE_API_URL}categories`, params, configUrlEncoded)
        .then(({ data }) => {
          this.name = "";
          this.$store.commit("saveCategories", data);
          alert("Категорията беше добавена");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$store.commit("adminStepChange", this.adminStep - 1);
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  #category {
    margin: 10px 0;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>
