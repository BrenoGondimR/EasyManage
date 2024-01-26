<template>
  <div v-if="visible" :class="`notification ${type}`" @click="hideNotification">
    <div class="row">
      <div class="icon col-md-2" style="margin: auto">
        <i v-if="type === 'sucesso'" class="pi pi-check-square" style="color: green; font-size: 20px; display: flex; justify-content: center;"></i>
        <i v-if="type === 'erro'" class="pi pi-times-circle" style="color: red; font-size: 20px; display: flex; justify-content: center;"></i>
        <i v-if="type === 'info'" class="pi pi-info-circle" style="color: yellow; font-size: 20px; display: flex; justify-content: center;"></i>
      </div>
      <div class="content col-md-10">
        <div class="message">{{ message }}</div>
      </div>
      <div class="col-md-12">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Notification",
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      progress: 100
    };
  },
  mounted() {
    this.showNotification();
  },
  methods: {
    showNotification() {
      this.visible = true;
      this.progress = 100;
      const interval = setInterval(() => {
        this.progress -= 100 / (this.duration / 100);
        if (this.progress <= 0) {
          clearInterval(interval);
          this.hideNotification();
        }
      }, 100);
    },
    hideNotification() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px; /* Ajustado de 'bottom' para 'top' */
  right: 20px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column; /* Adicionado para alinhar ícone e conteúdo verticalmente */
  animation: slideIn 0.3s ease-out forwards;
  width: 365px; /* Adicionado para definir uma largura fixa */
  z-index: 1000; /* Garante que a notificação fique acima de outros elementos */
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.icon {
  font-size: 24px;
  align-self: flex-start; /* Alinha o ícone à esquerda */
}

.content {
  flex: 1; /* Faz com que o conteúdo ocupe o restante do espaço */
}

.message {
  margin-bottom: 5px; /* Espaço entre a mensagem e a barra de progresso */
}

.progress {
  height: 3px;
  border-radius: 10px;
  opacity: 30%;
  margin-top: 10px;
  background-color: currentColor;
  transition: width 0.1s linear;
}

/* Estilos para sucesso, erro e info permanecem os mesmos */
.sucesso {
  color: #28a745;
}

.erro {
  color: #dc3545;
}

.info {
  color: #ffc107;
}
</style>