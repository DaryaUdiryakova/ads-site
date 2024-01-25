<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

import ModalItemRealty from "@/components/ModalItemRealty.vue";
import ModalItemAuto from "@/components/ModalItemAuto.vue";
import ModalItemLaptop from "@/components/ModalItemLaptop.vue";

export default {
  components: {
    VueperSlides,
    VueperSlide,
    ModalItemRealty,
    ModalItemAuto,
    ModalItemLaptop,
  },

  props: ["product"],

  methods: {
    closeModal(id) {
      this.$emit("closeModal", id);
    },
  },
};
</script>
<template>
  <div
    class="modal fade "
    :id="'modalCard' + product.id"
    tabindex="-1"
    :aria-labelledby="'modalCardLabel' + product.id"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <p class="modal-date text-secondary">{{product.date}}</p>
            <h5
              class="modal-title"
              id="modalCardLabel"
            >{{product.title}}</h5>
            <p class="modal-price fw-bold">{{$filters.formatPrice(product.price)}}</p>
          </div>

          <button
            type="button"
            class="btn-close"
            @click="closeModal(product.id)"
          >
          </button>

        </div>
        <div class="modal-body">
          <div class="item-flex">
            <div class="photo-gallery">

              <vueper-slides
                ref="vueperslides1"
                :touchable="false"
                fade
                :autoplay="false"
                :lazy="true"
                :lazyLoadOnDrag="true"
                :bullets="false"
                @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
                fixed-height="250px"
                :arrows="false"
              >
                <vueper-slide
                  v-for="(slide, i) in  product.image"
                  :key="i"
                  :image="slide"
                >
                </vueper-slide>
              </vueper-slides>

              <vueper-slides
                v-if="product.image.length>1"
                class="no-shadow thumbnails"
                ref="vueperslides2"
                @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
                :visible-slides="product.image.length"
                fixed-height="75px"
                :bullets="false"
                :touchable="false"
                :gap="2.5"
                :arrows="false"
              >
                <vueper-slide
                  v-for="(slide, i) in product.image"
                  :key="i"
                  :image="slide"
                  @click="$refs.vueperslides2.goToSlide(i)"
                >
                </vueper-slide>
              </vueper-slides>
            </div>
            <div class="product-info">
              <div class="item-parameters text-name">
                <p class="text-secondary fw-bold">Продавец</p>
                <p>{{product.name}}<span class="badge bg-primary">{{product.rating}}</span> </p>
              </div>
              <div class="item-parameters text-address">
                <p class="text-secondary fw-bold">Адрес</p>
                <p>{{product.address}}</p>
              </div>
            </div>
          </div>

          <component
            :is="product.component"
            :product="product"
          ></component>

        </div>

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.modal-header {
  align-items: flex-start;
  border-bottom: 0;
  padding: 25px 25px 10px 25px;
  .modal-date {
    font-size: 14px;
  }
  .modal-title {
    font-size: 35px;
  }
  .modal-price {
    font-size: 25px;
    margin-bottom: 0;
  }
}
.modal-body {
  padding: 0 25px 25px 25px;
  .item-flex {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .photo-gallery {
      margin-bottom: 20px;

      .vueperslides {
        width: 400px;
        margin-top: 5px;
      }
      .vueperslides--fixed-height.vueperslides--bullets-outside {
        margin-bottom: 0;
      }
      .vueperslide,
      .vueperslide__image {
        background-position: 0 64%;
      }
    }
    .product-info {
      margin-left: 30px;
    }
  }
}
</style>

