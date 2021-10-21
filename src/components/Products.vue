<template>
  <div>
    <button @click="goBack" v-if="isAuth" class="back-btn">Назад</button>
    <template v-if="hasSomeProducts">
      <div v-for="category in Object.keys(filteredProducts)" :key="category">
        <div>
          <hr />
          <h1>{{ category }}</h1>
          <hr />
          <div
            v-if="filteredProducts[category].length > 0"
            class="cards-holder"
          >
            <div
              v-for="product in filteredProducts[category]"
              :key="product.id"
              class="card"
            >
              <div class="img-holder">
                <div
                  :style="{
                    backgroundImage: `${
                      product.imageUrl
                        ? `url(${baseURL}/${product.imageUrl})`
                        : ''
                    }`,
                  }"
                  class="img"
                ></div>
              </div>
              <div class="content-holder">
                <div v-if="isAuth" class="row-holder">
                  <div class="text-holder">Марка:</div>
                  <!-- TODO: when you edit 1 product it edits all of them -->
                  <input v-model="brandName" class="inp-edit" type="text" />
                </div>
                <div v-else>
                  <span>Марка: </span>
                  <span class="info-2">{{ product.brandName }}</span>
                </div>
                <div v-if="isAuth" class="row-holder">
                  <div class="text-holder">Цена:</div>
                  <input v-model="price" class="inp-edit" type="number" />
                </div>
                <div v-else>
                  <span class="text-holder">Цена: </span>
                  <span class="info-2">{{ product.price }}</span>
                  <span v-if="!isAuth"> лв.</span>
                </div>
                <!-- If we want to upload a new image -->
                <!-- <div v-if="isAuth" class="row-holder new-image">
                <div class="text-holder">Снимка:</div>
                <input
                  ref="file"
                  @change="previewFiles"
                  type="file"
                  name="image"
                  id="image"
                  class="inp-edit"
                />
              </div> -->
                <div class="btns-holder">
                  <button
                    @click="deleteProduct(product._id, product.category)"
                    v-if="isAuth"
                    class="delete-btn"
                  >
                    Изтрий
                  </button>
                  <button @click="editProduct(product._id)" v-if="isAuth">
                    Запази
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h3 v-else>Няма налични продукти</h3>
        </div>
      </div>
    </template>
    <template v-else>
      <h1>Сайтът се обновява.</h1>
      <h3>Моля, посетете ни по-късно.</h3>
    </template>
    <div v-if="!isAuth" class="ghost-holder">
      <div @click="showLoginPage" class="ghost"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import _ from "lodash";
import { BASE_API_URL } from "@/utils/helper.js";
import { baseURL } from "@/utils/helper.js";
import { configUrlEncoded } from "@/utils/helper.js";

export default {
  name: "Products",
  computed: {
    ...mapState({
      filteredProducts: (state) => state.filteredProducts,
      adminStep: (state) => state.adminStep,
      isAuth: (state) => state.isAuth,
      allProducts: (state) => state.allProducts,
    }),
    baseURL() {
      return baseURL;
    },
    hasSomeProducts() {
      return Object.values(this.allProducts)
        .map((productsByCategory) => productsByCategory.length > 0)
        .some((bool) => bool);
    },
  },
  data() {
    return {
      brandName: "",
      price: "",
      // If we want to upload a new image
      // image: null,
    };
  },
  methods: {
    showLoginPage() {
      this.$store.commit("adminStepChange", this.adminStep + 1);
    },
    deleteProduct(productId, category) {
      const condition = confirm(
        "Сигурни ли сте, че искате да изтриете този продукт?"
      );

      if (condition) {
        axios
          .delete(`${BASE_API_URL}products/${productId}`)
          .then(() => {
            const filteredProductsOnCategory = this.allProducts[
              category
            ].filter((product) => product._id !== productId);
            this.allProducts[category] = filteredProductsOnCategory;
            this.$store.commit("saveAllProducts", this.allProducts);

            alert("Продуктът беше изтрит!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async editProduct(productId) {
      const params = {
        params: {
          brandName: this.brandName,
          price: Number(this.price),
        },
      };

      if (this.brandName !== "" || this.price !== "") {
        const firstResponse = await axios.put(
          `${BASE_API_URL}products/${productId}`,
          params.params,
          configUrlEncoded
        );

        let currentImagePath = "";
        if (firstResponse) {
          const { brandName, category, price, _id, imageUrl } =
            firstResponse.data[0];
          this.brandName = "";
          this.price = "";
          currentImagePath = imageUrl;

          const allProductsClone = _.cloneDeep(this.allProducts);
          allProductsClone[category].forEach((product) => {
            if (product._id === _id) {
              product.brandName = brandName;
              product.price = price;
            }
          });

          this.$store.commit("saveAllProducts", allProductsClone);
        }

        alert("Продуктът беше обновен");
      }

      // // Not finished - If we want to upload a new image
      // let secondResponse = null;
      // if (this.image) {
      //   secondResponse = await axios.put(
      //     `${BASE_API_URL}products/${productId}`,
      //     this.image, configFormData
      //   );
      // }
      // if (secondResponse) {
      //   console.log(secondResponse);
      // }
    },
    // // If we want to upload a new image
    // previewFiles(event) {
    //   const file = event.target.files[0];
    //   if (file.size > 5000000) {
    //     alert("Изберете по-малък файл от 5MB!");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("image", file);
    //   this.image = formData;
    // },
    goBack() {
      this.$store.commit("adminStepChange", 2);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

$img-holder-height: 80%;
$text-holder-width: 65px;
$row-holder-width: 95%;

.back-btn {
  color: white;
  background-color: blue;
  padding: 10px;
  margin: 10px 0;
}
.cards-holder {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .card {
    min-width: 250px;
    width: 30%;
    height: 430px;
    box-shadow: 0px 0px 15px grey;
    border-radius: 5px;
    margin-bottom: 10px;
    .img-holder {
      width: 100%;
      height: $img-holder-height;
      display: flex;
      justify-content: center;
      .img {
        width: $row-holder-width;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
    .info-2 {
      font-size: 20px;
      font-weight: bold;
    }
    .new-image {
      display: flex;
      align-items: center;
    }
    .content-holder {
      width: 100%;
      height: calc(100% - #{$img-holder-height});
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row-holder {
        width: $row-holder-width;
        text-align: left;
        display: flex;
        .text-holder {
          width: $text-holder-width;
          display: inline;
        }
        .inp-edit {
          width: calc(#{$row-holder-width} - #{$text-holder-width});
          display: inline;
          input {
            width: inherit;
          }
        }
      }
      .btns-holder {
        display: flex;
        margin-top: 5px;
        .delete-btn {
          color: white;
          background-color: red;
          margin-right: 10px;
        }
      }
    }
  }
}
.ghost-holder {
  display: flex;

  .ghost {
    width: 20px;
    height: 20px;
    background-color: transparent;
    color: transparent;
    border: transparent;
  }
}

@media (max-width: 587px) {
  .cards-holder {
    justify-content: center;
    .card {
      width: 60%;
    }
  }
}
</style>
