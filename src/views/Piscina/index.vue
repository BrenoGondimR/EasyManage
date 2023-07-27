<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <HistoryPisc></HistoryPisc>
      </div>
    </div>
  </div>
</template>

<script>

import HistoryPisc from "@/views/components/HistoricoTable.vue";

export default {
  name: "piscina",
  components: {
    HistoryPisc,
  },
  data() {
    return {
      formsTratamento: [
        {label: "Cloro", type: "text", value: "", placeholder: "Cloro Da Piscina", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Pha", type: "text", value: "", placeholder: "Pha Da Piscina", error: "", errorMessage: "", col: "col-md-6"},
        {label: "Alcalinidade", type: "text", value: "", placeholder: "Alcalinidade", error: "", errorMessage: "", col: "col-md-4"},
        {label: "Acidez", type: "text", value: "", placeholder: "Acidez Da Piscina", error: "", errorMessage: "", col: "col-md-8"},
      ],
      formsManutencao: [
        {label: "Prioridade Da Manutenção", type: "radio", value: "Baixa", options: [{ label: "Baixa", value: "baixa" }, { label: "Media", value: "media" }, { label: "Alta", value: "alta" }, { label: "Urgente", value: "urgente" }], error: false, errorMessage: "", col: "col-md-6"},
        {label: "Descreva:", type: "text", value: "", placeholder: "Descreva o que esta de errado", error: "", errorMessage: "", col: "col-md-6"},
      ]
    };
  },
};
</script>
