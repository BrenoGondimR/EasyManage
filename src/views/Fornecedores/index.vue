<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <HistoryFornecedor></HistoryFornecedor>
      </div>
    </div>
  </div>
</template>

<script>

import HistoryFornecedor from "@/views/components/FornecedoresTable.vue";

export default {
  name: "fornecedores",
  components: {
    HistoryFornecedor,
  },
  data() {
    return {

    };
  },
};
</script>
