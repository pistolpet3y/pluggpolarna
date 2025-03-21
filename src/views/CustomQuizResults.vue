<template>
  <div class="custom-quiz-results-container">
    <h2>Ditt Resultat</h2>
    <Chart :correctAnswers="correctAnswers" :errorWords="errorWords" />

    <p v-if="isPerfectScore">Du hade alla rätt! Enastående, vilken stjärna! ✨</p>
    <p v-else-if="isMediumScore">
      <span class="styled">Du har {{ correctAnswers }} rätt av {{ totalQuestions }}!</span><br>
      Bra jobbat! 👏<br>
      Du behöver jobba vidare på följande ord:
    </p>

    <p v-else>
      <span class="styled">Du hade {{ correctAnswers }} rätt av {{ totalQuestions }}!</span><br>
      Fortsätt kämpa! 💪<br>
      Du behöver jobba vidare på följande ord:
    </p>

    <ul v-if="errorWords.length">
      <li v-for="(word, index) in errorWords" :key="index">{{ word }}</li>
    </ul>

    <button class="start-new-quiz-button" @click="startNewQuiz">Spela igen!</button>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// Importera stores från Pinia
import { useQuizStore } from '../stores/quizStore';
import { useWordsStore } from '../stores/wordsStore';
// Importera diagram och confetti
import Chart from '../components/Chart.vue';
import confetti from 'canvas-confetti';

const router = useRouter();

// Skapa instans av stores
const quizStore = useQuizStore();
const wordsStore = useWordsStore();

// Reaktiva referenser från store för rätt och fel svar
const correctAnswers = quizStore.correctAnswers;
const errorWords = quizStore.errorWords;

// Ljudfil
const startQuizAudio = new Audio('/audio/start-quiz.mp3');

// Längd på ordlistan
let totalQuestions = computed(() => {
  return wordsStore.words.length || 0; // Hämta ordlistans längd från store
});

// Beräkna procent
const percentage = computed(() => {
  return totalQuestions.value === 0 ? 0 : (correctAnswers / totalQuestions.value) * 100;
});

// Beräkna om resultatet är perfekt (100%)
const isPerfectScore = computed(() => {
  if (percentage.value === 100) {
    showStars(); // Visa stjärnor om perfekt resultat
    console.log('Stjärnor')
    return true;
  }
  return false;
});

// Beräkna om resultatet är mellan 70-99%
const isMediumScore = computed(() => {
  return percentage.value >= 70 && percentage.value < 100;
});

// Funktion för att visa stjärnor (när 100% är korrekt)
const showStars = () => {
  console.log('Grattis! Du fick alla rätt, här är dina stjärnor! ✨');
  // Confetti för perfekt resultat
  confetti({
    particleCount: 300,
    spread: 360,
    origin: { y: 0.5 }
  })
};

// Ladda ord från Pinia store när komponenten monteras
onMounted(() => {
  console.log("correctAnswers:", correctAnswers);
  console.log("errorWords:", errorWords.length);
  wordsStore.loadWords();  // Ladda ord från localStorage från Pinia store när komponenten monteras
});

// Funktion för att starta nytt quiz
const startNewQuiz = () => {
  quizStore.startQuiz();
  router.push('/quizselector');
  startQuizAudio.play();
};
</script>

<style scoped>
.custom-quiz-results-container {
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
