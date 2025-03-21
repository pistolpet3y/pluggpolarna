<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ref gör variabler, onMounted körs när komponenten är klar
import Chart from 'chart.js/auto';

// Definiera props som kommer från föräldern
const { correctAnswers, errorWords } = defineProps({
  correctAnswers: Number,
  errorWords: Array,
});

// Skapa ref för canvas och chart
const chartCanvas = ref(null);
const chartInstance = ref(null);

// Skapa Chart.js-diagrammet
onMounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy(); //Förstör charten om det finns en innan en ny skapas
  }
  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: ['Rätt', 'Fel'],
      datasets: [
        {
          label: 'Ditt resultat',
          data: [correctAnswers, errorWords ? errorWords.length : 0],
          backgroundColor: ['#7dffcb', '#F5505D'],
          borderColor: '#111',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          onClick: (e) => e.stopImmediatePropagation(), // Inaktiverar klickbar label
        },
      },
    },
  });
});
</script>

<style scoped>
canvas {
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  margin: auto;
}
</style>
