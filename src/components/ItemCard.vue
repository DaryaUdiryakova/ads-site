<script>
import VueHoverSlider from "@/vue-hover-slider/VueHoverSlider";
import ModalCard from "@/components/ModalCard.vue";
import { Modal } from "bootstrap";

export default {
  components: {
    VueHoverSlider,
    ModalCard,
  },
  props: ["product"],
  data() {
    return {
      showModalIf: false,
      isHover: false,
      isActive: false,
    };
  },
  methods: {
    idModal(id) {
      let myModalEl = document.getElementById("modalCard" + id);
      let modal = Modal.getOrCreateInstance(myModalEl);
      return modal;
    },
    showModal(id) {
      this.showModalIf = true;
      this.$nextTick(() => {
        this.idModal(id).show();
      });
    },
    closeModal(id) {
      this.$nextTick(() => {
        this.idModal(id).hide();
      });
      this.showModalIf = false;
    },
    addLikeProducts(id) {
      this.isActive = !this.isActive;
      this.$emit("addLikeProducts", id);
    },
  },
};
</script>
<template>
  <div class="wrap-card">
    <div
      class="card"
      @click="showModal(product.id)"
    >
      <div class="row g-0">
        <div class="col-4 col-sm-3 img-box">

          <vue-hover-slider
            :slides="product.image"
            :height="220"
            :max-slides-to-show="3"
          >
            <template #more="{ count }">
              ещё {{ count }} фото
            </template>
          </vue-hover-slider>

        </div>
        <div class="col-8 col-sm-7">
          <div class="card-body">
            <h5 class="card-title text-primary">{{product.title}}</h5>
            <p class="card-price fw-bold">{{$filters.formatPrice(product.price)}}</p>
            <p class="card-address text-secondary">{{product.address}}</p>
            <p class="card-date text-secondary">{{product.date}}</p>
          </div>
        </div>

      </div>

    </div>
    <button
      type="button"
      class="btn btn-heart "
      :class="{ btnHeartFillHover: isHover, btnHeartFillActive: isActive}"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="addLikeProducts(product.id)"
    > </button>
    <ModalCard
      v-if="showModalIf"
      :product="product"
      @closeModal="closeModal"
    />
  </div>
</template>


<style lang="scss" scoped>
.wrap-card {
  position: relative;
  // min-width: 790px;
  .card {
    margin: 20px 0;
    border: 0;
    cursor: pointer;

    .img-box {
      position: relative;
      overflow: hidden;
      width: 260px;
      height: 220px;
    }
    .card-title {
      font-size: 25px;
    }
    .card-price {
      font-size: 28px;
      margin-bottom: 25px;
    }
    .card-address {
      font-size: 20px;
      margin-bottom: 10px;
      &:before {
        content: url("../assets/geo-alt.svg");
        margin-right: 6px;
      }
    }
    .card-date {
      font-size: 15px;
    }
  }
  .btn-heart {
    position: absolute;
    z-index: 1000;
    width: 25px;
    height: 25px;
    top: 15px;
    right: 15px;
    background-image: url("../assets/heart.svg");
    background-repeat: no-repeat;
    background-size: contain;
    color: #b6b7cf;
  }
  .btnHeartFillHover,
  .btnHeartFillActive {
    background-image: url("../assets/heart-fill.svg");
  }
}
</style>
