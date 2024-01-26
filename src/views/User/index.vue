<template>
  <div class="py-4 container-fluid">
    <div class="card">
      <div class="row" style="display: flex; margin: 10px;">
        <div class="col-md-12" style="margin-bottom: 32px;">
          <h3>Meus dados</h3>
        </div>
        <div class="col-md-6">
          <div class="row row-class" style="display: grid; margin-right: 32px;">
            <div class="card col-md-6" style="width: 100%; margin-bottom: 32px">
              <div class="row">
                <h6 class="title-card font-weight-semibold">Empresa</h6>
                <div v-for="(item, index) in infosEmpresa" :key="index" class="col-md-6 span-dados">
                  <label class="label-meusdados" style="margin: 0px !important;">{{ item.label }}</label>
                  <span class="span-dados2">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <div class="card col-md-6" style="width: 100%;">
              <div class="row">
                <h6 class="title-card font-weight-semibold">Contato</h6>
                <div v-for="(item, index) in infosContato" :key="index" class="col-md-6 span-dados">
                  <label class="label-meusdados" style="margin: 0px !important;">{{ item.label }}</label>
                  <span class="span-dados2">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="card col-md-6 endereco-class" style="width: 100%;">
              <div class="row">
                <h6 class="title-card font-weight-semibold">Endereço</h6>
                <div v-for="(item, index) in infosEndereco" :key="index" class="col-md-6 span-dados">
                  <label class="label-meusdados" style="margin: 0px !important;">{{ item.label }}</label>
                  <span class="span-dados2">{{ item.value }}</span>
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
import {getAllDados} from "@/views/User/meus_dados_service";

export default {
  name: "meus_dados",
  components: {

  },
  data() {
    return {
      infosEmpresa: [
        {key: 'apelido', label: 'Apelido:', value: ''},
        {key: 'cpf_cnpj', label: 'CPF/CNPJ:', value: ''},
        {key: 'estabelecimento_id', label: 'ID:', value: ''},
      ],
      infosContato: [
        {key: 'responsavel', label: 'Responsável:', value: ''},
        {key: 'telefone', label: 'Telefone:', value: ''},
        {key: 'email', label: 'Email:', value: ''},
        {key: 'instagram', label: 'Instagram:', value: ''}
      ],
      infosEndereco: [
        {key: 'cep', label: 'Cep:', value: ''},
        {key: 'logradouro', label: 'Logradouro:', value: ''},
        {key: 'numero', label: 'Numero:', value: ''},
        {key: 'cidade', label: 'Cidade:', value: ''},
        {key: 'estado', label: 'Estado:', value: ''}
      ]
    };
  },
  created() {
    this.getAllDadosEstab()
  },
  methods:{
    getAllDadosEstab() {
      getAllDados(localStorage.getItem('estabId'))
          .then((response) => {
            if (response.data) {
              // Preencher infosEmpresa
              this.infosEmpresa.forEach(item => {
                item.value = response.data.data[item.key] || '-';
              });

              // Preencher infosContato
              this.infosContato.forEach(item => {
                item.value = response.data.data[item.key] || '-';
              });

              // Preencher infosEndereco
              this.infosEndereco.forEach(item => {
                if(item.key === 'numero') {
                  item.value = response.data.data[item.key] || 'S/N';
                } else {
                  item.value = response.data.data[item.key] || '-';
                }
              });
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    }


  }
};
</script>
<style scoped>
.title-card{
  font-size: 24px;
}
@media screen and (max-width: 768px) {
  .row-class{
    margin-right: 0px !important;
  }
  .endereco-class{
    margin-top: 32px !important;
    min-height: unset !important;

  }
}

.endereco-class{
  min-height: 410px;
}

.span-dados{
  display: grid;
}
.span-dados2{
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 4px;
}

.label-meusdados{
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
}


</style>