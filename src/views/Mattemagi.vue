<template>
  <div class="mattemagi-container">
    <div class="header-container">
      <h2>Mattemagi</h2>
      <InfoButton color="blue"
        :infoContent="`Välkommen till Mattemagi, där din mattehjärna får briljera!<br><br>I detta spel ska du lösa spännande multiplikationsproblem. Varje rätt svar ger dig poäng och tar dig ett steg närmare till att bli en riktig mattemagiker.<br><br>Utmana dig själv, ha kul med siffror och visa vad du går för! Lycka till! 🧙‍♂️✨`"
        id="info" />
    </div>

    <div v-if="!gameOver">
      <!-- Visa aktuell fråga, antal frågor och poäng -->
      <p class="styled">Uppgift {{ questionCount + 1 }} av {{ totalQuestions }}</p>
      <p class="styled">Poäng: {{ score }}</p>

      <p>Beräkna: <strong>{{ question.a }} x {{ question.b }}</strong></p>

      <div class="options">
        <button v-for="(option, index) in options" :key="index" :class="{
          selected: selectedOption === option, correct: selectedOption === option && selectedOption === correctAnswer,
          incorrect: selectedOption === option && selectedOption !== correctAnswer
        }" :disabled="selectedOption !== null" @click="checkAnswer(option)">
          {{ option }}
        </button>
      </div>

      <!-- Feedback för rätt/fel svar -->
      <div class="feedback-container">
        <p v-if="feedback" class="feedback" v-html="feedback"></p>
      </div>

      <button @click="nextQuestion" id="next-question">Nästa fråga</button>
    </div>

    <div v-else>
      <h3>Ditt Resultat</h3>
      <p v-if="score === totalQuestions"><strong>{{ score }}</strong> av <strong>{{ totalQuestions }}</strong>
        rätt!<br>Du är en äkta mattemagiker! 🧙‍♂️</p>
      <p v-else><strong>{{ score }}</strong> av <strong>{{ totalQuestions }}</strong> rätt!</p>

      <button @click="restartGame">Spela igen!</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import InfoButton from '../components/InfoButton.vue';

const tableSize = ref(10);
const question = ref({ a: 0, b: 0 });
const correctAnswer = ref(0);
const options = ref([]);
const feedback = ref('');
const selectedOption = ref(null);
const score = ref(0);
const questionCount = ref(0);
const totalQuestions = ref(10);
const gameOver = ref(false);

// Ljudfiler tas bort från koden

// Skapar en ny multiplikationsfråga
function newQuestion() {
  feedback.value = '';
  selectedOption.value = null;
  const a = Math.floor(Math.random() * tableSize.value) + 1;
  const b = Math.floor(Math.random() * tableSize.value) + 1;
  question.value = { a, b };
  correctAnswer.value = a * b;
  generateOptions();
}

// Genererar 6 alternativ där ett är korrekt
function generateOptions() {
  let opts = new Set();
  opts.add(correctAnswer.value);
  while (opts.size < 6) {
    let wrong = (Math.floor(Math.random() * tableSize.value) + 1) *
      (Math.floor(Math.random() * tableSize.value) + 1);
    opts.add(wrong);
  }
  options.value = Array.from(opts).sort(() => Math.random() - 0.5);
}

// Kontrollerar användarens svar
function checkAnswer(selected) {
  if (selectedOption.value !== null) return;
  selectedOption.value = selected;
  // Ge feedback beroende på om svaret är rätt eller fel
  if (selected === correctAnswer.value) {
    feedback.value = '✅ Rätt! Bra jobbat! :)';
    score.value++;
    // Ljudkod togs bort
  } else {
    feedback.value = `❌ Fel! Rätt svar var: <strong>${correctAnswer.value}</strong>`;
    // Ljudkod togs bort
    // Hitta den rätta knappen
    const correctButton = Array.from(document.querySelectorAll('.options button')).find(button =>
      button.textContent == correctAnswer.value.toString()
    );
    // Lägg till klassen 'blink' efter en halv sekund (500 ms)
    if (correctButton) {
      setTimeout(() => {
        correctButton.classList.add('blink');
      }, 500);
    }
  }
}

// Nästa fråga eller avsluta spelet
function nextQuestion() {
  const buttons = document.querySelectorAll('.options button');
  buttons.forEach(button => {
    button.classList.remove('correct', 'incorrect', 'blink');
  });
  if (questionCount.value < totalQuestions.value - 1) {
    questionCount.value++;
    newQuestion();
    // Ljudkod togs bort
  } else {
    questionCount.value++;
    gameOver.value = true;
  }
}

// Confetti för perfekt resultat
watch(gameOver, (value) => {
  if (value && score.value === totalQuestions.value) {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.5 }
    });
  }
});

// Starta om spelet och nollställ poäng
function restartGame() {
  score.value = 0;
  questionCount.value = 0;
  gameOver.value = false;
  newQuestion();
  // Ljudkod togs bort
}

// Starta från första frågan
newQuestion();
</script>

<style scoped>
.mattemagi-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

.header-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

p {
  text-align: center;
  font-size: 1.05rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #4cb5f5;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.15em;
}

.options {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-auto-rows: 100px;
  gap: 5px;
  justify-content: center;
  margin-bottom: 20px;
}

.options button {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #111;
  background-color: #4cb5f5;
  font-family: 'Bangers', sans-serif;
  font-size: 1.8em;
  color: #111;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

.options button:hover:enabled {
  background-color: #ff99cc;
}

.options button.selected.incorrect {
  background-color: #F5505D;
}

.options button.selected.correct {
  background-color: #7dffcb;
}

/* Visar grönt på rätta svaret om man gjort fel */
.options button.correct {
  background-color: #7dffcb;
}

@keyframes blink {
  0% {
    background-color: #7dffcb;
  }

  50% {
    background-color: #4cb5f5;
  }

  100% {
    background-color: #7dffcb;
  }
}

.options button.blink {
  animation: blink 2s infinite;
}

button {
  margin: 0 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #4cb5f5;
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

@media only screen and (max-width: 480px) {
  .mattemagi-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0;
  }

  .header-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  #info {
    position: absolute;
    right: 65px;
    transform: translateY(-70%);
    display: inline-block;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: -15px !important;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem !important;
    margin-top: 4px !important;
    margin-bottom: 10px !important;
  }

  .feedback-container {
    min-height: 35px;
  }

  .options {
    grid-template-columns: repeat(3, 80px);
    grid-auto-rows: 80px;
    gap: 6px;
    justify-content: center;
    margin-bottom: 15px;
  }

  .options button {
    width: 80px;
    height: 80px;
    font-size: 1.8em;
    border-radius: 8px;
  }

  button {
    margin: 10px 3px;
    border: 3px solid #111;
    padding: 8px 13px;
    font-size: 1.1em;
    margin-bottom: -5px;
  }

  #next-question {
    margin-top: 20px;
  }
}
</style>
