<template>
  <div class="mb-4 card" :class="{ 'hover-enabled': hoverEffect }">
    <div class="p-3 card-body">
      <div class="d-flex" :class="directionReverse ? reverseDirection : ''">
        <div>
          <div class="text-center icon icon-shape"
           :class="`${iconBackground} ${this.$store.state.isRTL ? 'border-radius-md' : 'border-radius-2xl'}`">
            <i class="text-lg opacity-10" :class="iconClass" aria-hidden="true"></i>
          </div>
        </div>
        <div :class="contentClass">
          <div class="numbers" v-if="this.$store.state.isRTL">
            <p class="mb-0 text-sm text-uppercase font-weight-bold" :class="titleColor">{{ title }}</p>
            <h5 class="font-weight-bolder" :class="valueColor">{{ value }}
            <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
            </h5>
          </div>
          <div class="numbers" v-else>
            <p class="mb-0 text-sm text-uppercase font-weight-bold" :class="titleColor">{{ title }}</p>
            <h5 class="font-weight-bolder" :class="valueColor">{{ value }}</h5>
            <span class="text-sm"  :class="percentageColor">{{ percentage }}</span> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  props: {
    directionReverse: Boolean,
    title: {
      type: String,
      required: true,
    },
    hoverEffect: {
      type: Boolean,
      default: false, // Por padrão, o hoverEffect está desativado
    },
    titleColor: {
      type: String,
    },
    value: {
      required: true,
    },
    valueColor: {
      type: String,
    },
    percentage: String,
    iconClass: {
      type: String,
      required: true,
    },
    percentageColor: {
      type: String,
      default: "text-success",
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    contentClass: {
      type: String,
    },
  },
};
</script>
<style scoped>
.hover-enabled:hover {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1), 0 6px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>
