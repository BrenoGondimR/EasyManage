<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <HistoryTreinamentos></HistoryTreinamentos>
      </div>
    </div>
  </div>
</template>

<script>

import HistoryTreinamentos from "@/views/components/HistoryTreinamentos.vue";

export default {
  name: "treinamentos",
  components: {
    HistoryTreinamentos,
  },
  data() {
    return {

    };
  },
};
</script>
