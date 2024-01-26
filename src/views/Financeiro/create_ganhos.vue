<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="row">
            <div v-for="(form, index) in forms" :key="index" :class="form.col">
              <label>{{ form.label }}</label>
              <div>
                <input v-if="form.type === 'num'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" @input="restrictToNumbers(index)"/>
                <input v-else-if="form.type === 'data'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control" @input="formatarDataInput"/>
                <input v-if="form.type === 'text'" v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control"/>
              </div>
            </div>
            <div class="row mt-4" style="justify-content: right;">
              <div class="col-6" style="display: flex">
                <div class="col-6" style="margin-right: 15px;">
                  <button id="btn-dark" @click="getPage" class="btn w-100 px-3 mb-2 bg-gradient-success">
                    Cancelar
                  </button>
                </div>
                <div class="col-6">
                  <button id="btn-white" @click="createFinanceiro" class="btn w-100 px-3 mb-2 btn-outline-success" :disabled="isFormInvalid">
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createFinanceiro} from "@/views/Financeiro/financeiro_service";
export default {
  name: "create_ganhos",
  components: {

  },
  data() {
    return {
      status: "Ganho",
      forms: [
        {label: "Origem", type: "text", value: "", placeholder: "Origem Do Ganho", error: "", errorMessage: "", col: "col-md-8"},
        {label: "Ganho", type: "num", value: "", placeholder: "Valor", error: "", errorMessage: "", col: "col-md-4"},
        {label: "Tipo Transação", type: "text", value: "", placeholder: "Tipo Da Transação", error: "", errorMessage: "", col: "col-md-8"},
        { label: "Data", type: "data", value: "", placeholder: "Data (DD/MM/YYYY)", col: "col-md-4" },
      ]
    };
  },
  methods: {
    getPage() {
      this.$router.push('/dashboard-default')
    },
    restrictToNumbers(index) {
      let value = this.forms[index].value;

      // Remove todos os caracteres não numéricos, exceto "." e ","
      value = value.replace(/[^0-9.,]/g, '');

      // Substitua "," por "." para garantir que seja um número decimal válido
      value = value.replace(",", ".");

      // Verifique se há mais de um ponto decimal e remova os extras
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      // Atualize o valor do campo
      this.forms[index].value = value;
    },
    formatarDataInput() {
      // Obtém o valor atual do campo
      let value = this.forms[3].value;

      // Remove caracteres não numéricos
      value = value.replace(/\D/g, '');

      // Aplica a máscara DD/MM/YYYY
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9);
      }

      // Atualiza o valor do campo
      this.forms[3].value = value;
    },
    isValidDate(dateString) {
      // Validação básica para a data (formato DD/MM/YYYY)
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!pattern.test(dateString)) {
        return false;
      }

      const parts = dateString.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (year < 1000 || year > 9999 || month == 0 || month > 12) {
        return false;
      }

      const daysInMonth = new Date(year, month, 0).getDate();
      return day <= daysInMonth;
    },
    createFinanceiro() {
      // Split the date into day, month, and year
      const parts = this.forms[3].value.split('/');
      const dia = parts[0];
      const mes = parts[1];
      const ano = parts[2];

      // Format the date as "AAAA-MM-DD" to ensure it's correctly parsed by Go's time package
      const dataFormatada = `${ano}-${mes}-${dia}T00:00:00Z`;
      const custos = {
        'ganhos': parseFloat(this.forms[1].value),
        'origem': this.forms[0].value,
        'tipo_transacao': this.forms[2].value,
        'data': dataFormatada,
        'status': this.status,
        'estabelecimento_id': localStorage.getItem('estabId'),
      };

      // Chamar a função para enviar a requisição POST
      createFinanceiro(custos)
          .then((response) => {
            // Tratar a resposta do backend aqui
            console.log(response.data);
            this.$router.push("/dashboard-default"); // Redirecionar após a criação do funcionário
          })
          .catch((error) => {
            // Tratar erros aqui
            console.error(error);
          });
    },
  },
  computed: {
    isFormInvalid() {
      return isNaN(parseFloat(this.forms[1].value)) || !this.isValidDate(this.forms[3].value);
    },
  },
};
</script>

<style>
.card{
  padding: 25px !important;
}
.form-check-label{
  margin-right: 30px !important;
}
.form-check-input:checked[type=radio]{
  background-image: linear-gradient(310deg, #2dce89 0%, #2dcecc 100%) !important;
}
</style>
