<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                  <p class="mb-0">Coloque seu usuario, senha e estabelecimento.</p>
                </div>
                <div class="card-body">
                  <div class="row">
                    <Notification  v-if="showErrorNotification"  type="erro" :message="this.notificationM" duration="5000" />
                    <div v-for="(form, index) in forms" :key="index" :class="form.col">
                      <label>{{ form.label }}</label>
                      <div>
                        <input v-model="form.value" :type="form.type" :placeholder="form.placeholder" class="form-control"/>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="loginFunc"
                    >Entrar</argon-button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
          background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >"Easy Manage"</h4>
                <p
                  class="text-white position-relative"
                >Na Easy Manage, transformamos complexidade em simplicidade. Para cada desafio diário de uma pousada, oferecemos uma solução fácil e eficaz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import {loginAccount} from "@/views/Login/login_service";
import Notification from "@/views/components/Notify.vue";
import {getAllDados} from "@/views/User/meus_dados_service";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Notification,
    ArgonButton,
  },
  data() {
    return {
      notificationM: '',
      showErrorNotification: false,
      forms: [
        {label: "Usuario", type: "name", value: "", placeholder: "Usuario", error: "", errorMessage: "", col: "col-md-12"},
        {label: "Senha", type: "password", value: "", placeholder: "Password", error: "", errorMessage: "", col: "col-md-12"},
        {label: "Estabelecimento", type: "password", value: "", placeholder: "Estabelecimento", error: "", errorMessage: "", col: "col-md-12"},
      ]
    };
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    getNameEstab() {
      getAllDados(localStorage.getItem('estabId'))
          .then((response) => {
            if (response.data) {
              localStorage.setItem('apelido', response.data.data.apelido);
              console.log(response.data.data.apelido)
            }
          })
          .catch((error) => {
            // Tratar erros aqui, caso ocorram
            console.error(error);
          });
    },
    loginFunc() {
      let data = {
        'user': this.forms[0].value,
        'password': this.forms[1].value,
        'estabelecimento_id': this.forms[2].value,
      };

      // Call the function to send the POST request
      loginAccount(data)
          .then((response) => {
            // Verificar se a resposta tem o campo estab_id
            if(response.data && response.data.estab_id) {
              // Salvar estab_id no localStorage
              localStorage.setItem('estabId', response.data.estab_id);
              this.$store.commit('setIsAuthenticated', true);
              localStorage.setItem('isAuthenticated', 'true');
              this.getNameEstab()
              // Redirecionar para a rota /dashboard-default
              this.$router.push("/dashboard-default");
            } else {
              // Lidar com a situação onde estab_id não está presente na resposta
              console.error('estab_id não recebido na resposta');
            }
          })
          .catch((error) => {
            // Handle errors here
            this.notificationM = 'Erro: Alguma das credenciais inválida.';
            this.showErrorNotification = true; // Ativa a exibição da notificação de erro

            // Opcional: Esconde a notificação após um certo tempo
            setTimeout(() => {
              this.showErrorNotification = false;
            }, 5000); // Esconde após 5 segundos
            console.error(error);
          });
    }
  },
};
</script>
