<script>
import SortSection from "@/components/SortSection.vue";
import FilterSection from "@/components/FilterSection.vue";
import ItemCard from "@/components/ItemCard.vue";
let propsFilter = {
  selectYearRelease: 0,
  transmission: 0,
  bodyType: [],
  propertyTypeСheck: [],
  minSquareRooms: "",
  countRoomСheck: 0,
  ram: 0,
  diagonal: 0,
  processorType: [],
  minPriceContent: "",
  maxPriceContent: "",
};
export default {
  name: "App",
  components: {
    SortSection,
    ItemCard,
    FilterSection,
  },
  data() {
    return {
      category: { selectCategory: 0 },
      sortKey: "",
      filtersNameDefault: propsFilter,
      filtersName: propsFilter,
      likeProducts: [],
      toggleLikeShow: false,
    };
  },

  created() {
    this.$store.dispatch("initStore");
  },

  methods: {
    filterCategory(category) {
      this.category = { selectCategory: category };
      this.filtersName = this.filtersNameDefault;
    },

    filter(filter) {
      this.filtersName = filter;
    },
    sortProd(elem) {
      this.sortKey = elem;
    },
    addLikeProducts(id) {
      this.$store.dispatch("toggleLike", id - 1);
    },
    toggleLike() {
      this.toggleLikeShow = !this.toggleLikeShow;
    },
  },
  computed: {
    filteredProducts() {
      return this.$store.getters.getSelectCategory(this.category);
    },

    newFilteredProducts() {
      return this.$store.getters.getProductsByFilter(
        this.filtersName,
        this.category,
        this.sortKey,
        this.toggleLikeShow
      );
    },
    minPriceRange() {
      return Math.min(...this.filteredProducts.map((o) => o.price));
    },
    maxPriceRange() {
      return Math.max(...this.filteredProducts.map((o) => o.price));
    },
  },
};
</script>
<template>

  <div class="row">

    <div class="col-3">

      <FilterSection
        @filterCategory="filterCategory"
        @showFiltered="filter"
        :minPrice="minPriceRange"
        :maxPrice="maxPriceRange"
      />

    </div>

    <div class="result-section col">
      <h3 class="title-section"> Результаты</h3>

      <SortSection
        :category='category'
        @sortTest="sortProd"
        @toggleLike="toggleLike"
      />

      <ItemCard
        v-for="product in newFilteredProducts"
        :product="product"
        :key="product.id"
        @addLikeProducts='addLikeProducts'
      />

      <div
        class="no-result"
        v-if="newFilteredProducts.length == 0"
      >
        Ничего не найдено
      </div>

    </div>

  </div>

</template>
<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 30px 70px;
  background: #f5f6f9;
  .result-section {
    padding-left: 40px;
    .no-result {
      font-size: 25px;
      margin-top: 100px;
      text-align: center;
    }
  }
}
</style>
