<template>
  <div class="py-4 container-fluid">
    <div class="card">
      <div class="row">
        <div v-for="(form, index) in formsTratamento" :key="index" :class="formsTratamento.col">
          <label>{{ formsTratamento.label }}</label>
            <input v-if="formsTratamento.type === 'text'" v-model="formsTratamento.value" :type="formsTratamento.type" :placeholder="formsTratamento.placeholder" class="form-control" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "piscina",
  components: {
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
