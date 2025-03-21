<template>
  <div class="results-container">
    <h2>Ditt Resultat</h2>
    <Chart :correctAnswers="correctAnswers" :errorWords="errorWords" />

    <p v-if="perfectScore">Du hade alla rätt! Enastående, vilken stjärna! ✨</p>

    <p v-else-if="mediumScore">
      <span class="styled">Du har {{ correctAnswers }} rätt av 10!</span><br>Bra jobbat! 👏<br>Du behöver jobba vidare
      på följande ord:
    </p>

    <p v-else>
      <span class="styled">Du hade {{ correctAnswers }} rätt av 10.</span><br>Fortsätt kämpa! 💪<br>Du behöver jobba
      vidare på följande ord:
    </p>

    <ul v-if="errorWords.length">
      <li v-for="(word, index) in errorWords" :key="index">{{ word }}</li>
    </ul>

    <button class="start-new-quiz-button" @click="startNewQuiz">Spela igen!</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quizStore';
import Chart from '../components/Chart.vue';
import confetti from 'canvas-confetti';

const router = useRouter();
const quizStore = useQuizStore();

const correctAnswers = quizStore.correctAnswers;
const errorWords = quizStore.errorWords;

const perfectScore = ref(false);
const mediumScore = ref(false);
const lowerScore = ref(false);

const showStars = () => {
  confetti({
    particleCount: 300,
    spread: 360,
    origin: { y: 0.5 }
  });
};

onMounted(() => {
  if (quizStore.correctAnswers === 10) {
    perfectScore.value = true;
    showStars();
  } else if (quizStore.correctAnswers >= 7) {
    mediumScore.value = true;
  } else {
    lowerScore.value = true;
  }
});

const startNewQuiz = () => {
  quizStore.startQuiz();
  router.push('/quizselector');
};
</script>

<style scoped>
.results-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.05rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
}

ul {
  list-style-position: inside;
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}

ul li {
  display: block;
  margin: 5px;
}

.start-new-quiz-button {
  margin-top: 20px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #7dffcb;
  color: #111;
  font-size: 1.2em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #ff99cc;
}
</style>
