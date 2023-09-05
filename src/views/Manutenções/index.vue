<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <HistoryManutencao></HistoryManutencao>
      </div>
    </div>
  </div>
</template>

<script>

import HistoryManutencao from "@/views/components/HistoryManutencoes.vue";

export default {
  name: "manutencoes",
  components: {
    HistoryManutencao,
  },
  data() {
    return {

    };
  },
};
</script>
