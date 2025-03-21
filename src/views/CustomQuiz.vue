<template>
  <div class="quiz-container">
    <div class="header-container">
      <h2>Glosquiz</h2>
      <InfoButton color="green"
        :infoContent="`Välkommen till ditt egna Glosquiz där du får öva på de ord du lagt in.<br><br>Varje rätt svar ger dig poäng och visar hur duktig du är på engelska!<br><br>Tänk efter, skriv in din översättning och ha kul medan du lär dig nya ord! Lycka till! 🙌`"
        id="info" />
    </div>

    <!-- Meddelande som visas om inga ord finns i quiz:et -->
    <p v-if="vocabularyList.length === 0">
      Du har inga ord i din lista än! Lägg till ord först!
    </p>

    <!-- Knapp för att gå tillbaka till EditQuiz.vue -->
    <router-link to="/editquiz">
      <button v-if="vocabularyList.length === 0" class="edit-quiz-button">
        Redigera glosor
      </button>
    </router-link>

    <!-- Om quiz:et inte är avslutat visas innehållet -->
    <div v-if="!quizFinished">
      <!-- Renderar aktuell fråga, poäng och quizfrågan -->
      <p class="styled">Fråga {{ currentIndex + 1 }} av {{ questions.length }}</p>
      <p class="styled">
        Poäng: <strong>{{ score }}</strong>
      </p>

      <p v-if="currentQuestion">
        Vad är det engelska ordet för:
        <strong>{{ questions[currentIndex].svenska }}</strong>
      </p>

      <!-- Inmatningsfält för svar -->
      <input v-model="userAnswer" :class="inputClass" type="text" placeholder="Skriv översättningen..."
        @keyup.enter="onEnterPress" />

      <!-- Visar feedback (rätt eller fel) om den finns -->
      <p v-if="feedback" v-html="feedback"></p>

      <!-- Navigeringsknappar -->
      <button v-if="feedback !== '' && currentIndex < questions.length - 1" @click="nextQuestion">
        Nästa fråga
      </button>
      <button v-if="feedback !== '' && currentIndex === questions.length - 1" @click="finishQuiz">
        Avsluta
      </button>
      <button v-if="feedback === '' && currentIndex < questions.length - 1" @click="skipQuestion" class="skip-button">
        Hoppa över
      </button>
      <button @click="checkAnswer" v-show="feedback === ''">Ok!</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quizStore';
import { useWordsStore } from '../stores/wordsStore';
import InfoButton from '../components/InfoButton.vue';

const router = useRouter();
const quizStore = useQuizStore();
const wordsStore = useWordsStore();

const currentIndex = ref(0);
const questions = ref([]);
const userAnswer = ref("");
const feedback = ref("");
const score = ref(0);
const quizFinished = ref(false);
const errorWords = ref([]);
const vocabularyList = ref([]);

// Antal frågor
const totalQuestions = computed(() => vocabularyList.value.length);

// Returnerar aktuell fråga eller null
const currentQuestion = computed(() => {
  return questions.value[currentIndex.value] || null;
});

// Funktion som blandar en array slumpmässigt
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// Startar (eller startar om) quiz:et
const startQuiz = () => {
  errorWords.value = []; // Nollställ felaktiga ord
  if (vocabularyList.value.length === 0) return; // Inga glosor
  questions.value = shuffle([...vocabularyList.value]).slice(0, totalQuestions.value);
  currentIndex.value = 0;
  userAnswer.value = "";
  feedback.value = "";
  score.value = 0;
  quizFinished.value = false;
};

// Watcher för att ladda glosor
watch(
  () => wordsStore.words,
  (newWords) => {
    if (Array.isArray(newWords) && newWords.length > 0) {
      vocabularyList.value = newWords;
      startQuiz();
    }
  },
  { immediate: true }
);

// Ladda glosor när komponenten monteras
onMounted(() => {
  wordsStore.loadWords();
});

// Kontrollerar användarens svar och ger feedback
const checkAnswer = () => {
  const userInput = userAnswer.value.trim().toLowerCase();
  const currentEntry = questions.value[currentIndex.value];
  let isCorrect = false;
  if (Array.isArray(currentEntry.engelska)) {
    isCorrect = currentEntry.engelska
      .map((word) => word.toLowerCase())
      .includes(userInput);
  } else {
    isCorrect = userInput === currentEntry.engelska.toLowerCase();
  }
  if (isCorrect) {
    feedback.value = "✅ Rätt! Bra jobbat! :)";
    score.value++;
  } else {
    feedback.value = `❌ Fel! Rätt svar var: <strong>${questions.value[currentIndex.value].engelska}</strong>`;
    errorWords.value.push(currentEntry.svenska);
  }
};

// Bestämmer inputfältets klass baserat på feedback
const inputClass = computed(() => {
  if (!feedback.value) return '';
  return feedback.value.startsWith('✅') ? 'correct-input' : 'incorrect-input';
});

// Vad som händer när Enter trycks
const onEnterPress = () => {
  if (feedback.value === '') {
    checkAnswer();
  } else if (currentIndex.value < questions.value.length - 1) {
    nextQuestion();
  } else {
    finishQuiz();
  }
};

// Går vidare till nästa fråga
const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    userAnswer.value = "";
    feedback.value = "";
  } else {
    quizFinished.value = true;
  }
};

// Hoppar över frågan
const skipQuestion = () => {
  errorWords.value.push(questions.value[currentIndex.value].svenska);
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    userAnswer.value = "";
    feedback.value = "";
  } else {
    quizFinished.value = true;
  }
};

// Avslutar quizet
const finishQuiz = () => {
  quizFinished.value = true;
  showResults();
};

// Navigerar till resultatvyn
const showResults = () => {
  quizStore.setQuizResults(score.value, errorWords.value);
  router.push('/customquizresults');
};
</script>

<style scoped>
.header-container {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

.quiz-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

#info {
  margin-left: 10px;
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

input {
  width: 80%;
  display: block;
  margin: 20px auto;
  border: 3px solid #111;
  padding: 10px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  background-color: #fff;
  border-radius: 5px;
}

.correct-input {
  border: 3px solid #7dffcb;
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
  color: #7dffcb;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
}

.incorrect-input {
  border: 3px solid #F5505D;
  color: #F5505D;
}

input:focus {
  outline: none;
}

button {
  margin: 0 5px;
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

.edit-quiz-button {
  margin-bottom: 10px;
  background-color: #f77f00;
}

button:hover {
  background-color: #ff99cc;
}

.skip-button {
  background-color: #d32f2f;
  color: #fff;
  text-shadow: 1px 1px 1px #111;
  transition: all 0.3s ease-in-out;
}

.skip-button:hover {
  background-color: #ff99cc;
  color: #111;
  text-shadow: none;
}

@media only screen and (max-width: 480px) {
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

  input {
    width: 75%;
  }

  button {
    padding: 8px 13px;
  }

  #info {
    transform: translateY(-60%);
    display: inline-block;
  }
}
</style>
