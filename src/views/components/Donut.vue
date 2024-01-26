<template>
  <div class="doughnut-chart">
    <svg width="200" height="200" viewBox="-100 -100 200 200">
      <defs>
        <filter id="sliceShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g transform="rotate(-90)">
        <path
            v-for="(slice, index) in slices"
            :key="index"
            :d="getPath(slice)"
            :fill="slice.color"
            class="slice"
            @mouseover="event => showTooltip(event, index)"
            @mouseleave="hoveredIndex = null"
        />
      </g>
    </svg>
    <div v-if="hoveredIndex !== null" class="tooltipclass" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
      {{ titles[hoveredIndex] }}: {{ values[hoveredIndex] }}
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: 'DoughnutChart',
  props: {
    values: Array,
    titles: Array,
    colors: Array,
  },
  data() {
    return {
      hoveredIndex: null,
      tooltipX: 0,
      tooltipY: 0,
    };
  },
  mounted() {
    this.animateSlices();
  },
  computed: {
    total() {
      return this.values.reduce((acc, value) => acc + value, 0);
    },
    slices() {
      let startAngle = 0;
      return this.values.map((value, index) => {
        const angle = (value / this.total) * 2 * Math.PI;
        const endAngle = startAngle + angle;
        const slice = {
          startAngle,
          endAngle,
          color: this.colors[index],
        };
        startAngle += angle;
        return slice;
      });
    },
  },
  methods: {
    calculateTooltipPosition(index) {
      const slice = this.slices[index];
      const midAngle = slice.startAngle + (slice.endAngle - slice.startAngle) / 2 - Math.PI / 2; // Ajustando para a rotação de -90 graus
      const radius = 75; // Raio médio entre o raio interno e externo

      // Coordenadas do centro do gráfico Doughnut
      const svgCenterX = this.$el.clientWidth / 2;
      const svgCenterY = this.$el.clientHeight / 2;

      // Calculando a posição da tooltip baseada no centro do SVG e no ponto médio da fatia
      this.tooltipX = svgCenterX + radius * Math.cos(midAngle);
      this.tooltipY = svgCenterY + radius * Math.sin(midAngle);

      // Ajustando as coordenadas para o posicionamento global na página
      const svgRect = this.$el.getBoundingClientRect();
      this.tooltipX += svgRect.left;
      this.tooltipY += svgRect.top;
    },
    showTooltip(event, index) {
      this.hoveredIndex = index;
      this.calculateTooltipPosition(index);
    },
    getPath({ startAngle, endAngle }) {
      const innerRadius = 60;
      const outerRadius = 90;
      const largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

      const startOuter = this.getPoint(outerRadius, startAngle);
      const endOuter = this.getPoint(outerRadius, endAngle);
      const startInner = this.getPoint(innerRadius, endAngle);
      const endInner = this.getPoint(innerRadius, startAngle);

      return [
        `M ${startOuter}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter}`,
        `L ${startInner}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner}`,
        'Z',
      ].join(' ');
    },
    animateSlices() {
      this.$nextTick(() => {
        const slices = this.$el.querySelectorAll('.slice');

        slices.forEach((slice, index) => {
          // Preparação para a animação
          slice.style.opacity = 0;

          // Animação com GSAP
          gsap.to(slice, {
            opacity: 1,
            delay: index * 0.5, // Aumente o delay para uma animação mais lenta
            duration: 0.5, // Duração da animação para cada fatia
            ease: "power2.inOut",
            onComplete: () => {
              // Callback opcional para quando a animação da fatia terminar
            }
          });
        });
      });
    },
    getPoint(radius, angle) {
      return `${radius * Math.cos(angle - Math.PI / 2)} ${radius * Math.sin(angle - Math.PI / 2)}`;
    },
  },
};
</script>

<style scoped>
.doughnut-chart {
  position: relative;
  width: 200px;
  height: 200px;
}

.tooltipclass {
  position: fixed; /* Use fixed para posicionar em relação à janela do navegador */
  transform: translate(20px, 20px); /* Deslocamento para evitar sobreposição com o cursor */
  background: #fff;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  pointer-events: none; /* Evita que a tooltip interfira com outros eventos de mouse */
  z-index: 100; /* Assegura que a tooltip fique acima de outros elementos */
}

.slice {
  transition: transform 0.3s ease-out;
}

.slice:hover {
  transform: scale(1.05);
  filter: url(#sliceShadow);
}
</style>