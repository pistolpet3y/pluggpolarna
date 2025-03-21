<template>
  <div class="no-blur">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <div class="ordstriden-container">
      <div class="header-container">
        <h2>Ordstriden</h2>
        <InfoButton color="orange"
          :infoContent="`I det här spelet hjälper du till att besegra det busiga trollet Lurifax.<br><br>Din uppgift är att pussla ihop bokstäver och klura ut ordet. Varje gång du lyckas, tappar trollet lite av sin kraft.<br><br>Så samla modet, använd din klurighet och hjälp oss att besegra Lurifax! Lycka till! 🙌`"
          id="info" />
      </div>

      <!-- Container för att visa HP-status -->
      <div class="player-health-status">
        <div class="player">
          <p class="styled">Hjälte<br>HP: {{ playerHP }}</p>
        </div>

        <div class="opponent">
          <p class="styled">Lurifax<br>HP: {{ opponentHP }}</p>
        </div>
      </div>

      <!-- Karaktärscontainer -->
      <div class="character-container">
        <div class="image-container hero-container">
          <RandomImage category="ordstriden" class="ordstriden-hero" />
          <div id="hero-shadow"></div>
        </div>

        <div class="image-container monster-container">
          <img src="/ordstriden/lurifax.png" alt="monster" class="monster-img" />
          <div id="monster-shadow"></div>
        </div>
      </div>

      <!-- Spelinnehåll -->
      <div id="input-container">
        <div v-if="!gameOver">
          <p>Klura ut ordet: <strong>{{ scrambledWord }}</strong></p>

          <input v-model="userAnswer" :class="inputClass" @keyup.enter="onEnterPress"
            placeholder="Skriv ditt svar här..." />

          <button v-if="!feedback" @click="surrenderRound" class="surrender-button">Ge upp</button>
          <button v-if="!feedback" @click="submitAnswer">Attack!</button>
          <p v-if="feedback" v-html="feedback"></p>
          <button v-if="feedback" @click="nextRound">Nästa runda</button>
        </div>

        <div v-else>
          <h3 v-if="playerHP === 100">Flawless Victory!</h3>
          <h3 v-else-if="playerHP > 0">Victory!</h3>
          <h3 v-else>Game Over!</h3>

          <p v-if="playerHP <= 0">😢 Du förlorade!<br>💪 Ge inte upp och försök igen!</p>
          <p v-else-if="playerHP === 100">👑 Felfri seger!<br>🥳 Den onda trollen Lurifax är totalt krossad!</p>
          <p v-else>👑 Du vann!<br>🥳 Den onda trollen Lurifax är besegrad!</p>

          <button @click="restartGame">Spela igen!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import confetti from 'canvas-confetti';
import InfoButton from '../components/InfoButton.vue';
import RandomImage from '../components/RandomImage.vue';

// Variabler för att hantera spelarens och motståndarens HP samt skada (vid rätt/fel svar)
const damageOnCorrect = 10;
const damageOnIncorrect = 10;

// Skapar reaktiva variabler med ref
const playerHP = ref(100);
const opponentHP = ref(100);
const currentWord = ref("");
const scrambledWord = ref("");
const userAnswer = ref("");
const feedback = ref("");
const gameOver = ref(false);

// Definierar en array med 50 ord för spelet
const vocabularyList = [
  // 10 Djur
  "Katt",
  "Hund",
  "Björn",
  "Räv",
  "Örn",
  "Häst",
  "Får",
  "Säl",
  "Varg",
  "Uggla",
  // 10 Frukt & Grönsaker
  "Äpple",
  "Banan",
  "Apelsin",
  "Morot",
  "Tomat",
  "Päron",
  "Paprika",
  "Vindruva",
  "Potatis",
  "Melon",
  // 10 Klädesplagg
  "Tröja",
  "Byxa",
  "Skjorta",
  "Mössa",
  "Handske",
  "Strumpa",
  "Kappa",
  "Klänning",
  "Sko",
  "Jacka",
  // 10 Fordon
  "Bil",
  "Tåg",
  "Cykel",
  "Båt",
  "Motorcykel",
  "Lastbil",
  "Helikopter",
  "Raket",
  "Buss",
  "Moped",
  // 10 Saker i hemmet
  "Bord",
  "Stol",
  "Säng",
  "Fönster",
  "Soffa",
  "Dator",
  "Gardin",
  "Lampa",
  "Klocka",
  "Spegel"
];

// Skapar en variabel för att hålla koll på vilka ord som inte använts än
const unusedWords = ref(vocabularyList);

// Funktion för att blanda om bokstäverna i ett ord
const scramble = (word) => {
  // Delar upp ordet i en array, blandar slumpmässigt och slår ihop igen
  let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
  // Om scramble:ade ordet är samma som originalet, försök igen
  if (scrambled === word) {
    return scramble(word);
  } else {
    return scrambled;
  }
};

// Funktion för att starta en ny runda
const newRound = () => {
  // Om det inte finns några ord kvar i unusedWords, återställ listan
  if (unusedWords.value.length === 0) {
    unusedWords.value = [...vocabularyList];
  }
  // Välj ett slumpmässigt ord från listan och blanda om det
  const randomIndex = Math.floor(Math.random() * unusedWords.value.length);
  currentWord.value = unusedWords.value[randomIndex];
  // Ta bort ordet från unusedWords så att den inte kan användas igen
  unusedWords.value.splice(randomIndex, 1);
  // Skapa ett scramble:at ord för spelaren att gissa
  scrambledWord.value = scramble(currentWord.value);
  // Rensa spelarens tidigare svar och feedback
  userAnswer.value = "";
  feedback.value = "";
};

// Funktion som hanterar inlämning av svar
const submitAnswer = () => {
  if (!userAnswer.value.trim()) return;
  // Rätt/fel svar ger feedback och skadar spelare/motståndare
  if (userAnswer.value.trim().toLowerCase() === currentWord.value.toLowerCase()) {
    feedback.value = `✅ Så ja!<br>🗡️ Du attackerade Lurifax!`;
    opponentHP.value -= damageOnCorrect;
  } else {
    feedback.value = `❌ Aj då: <strong>${currentWord.value}</strong> var rätt svar.<br>⚔️ Lurifax attackerade dig!`;
    playerHP.value -= damageOnIncorrect;
  }
  // Om spelarens eller motståndarens HP är noll eller mindre, sätt gameOver till true
  if (playerHP.value <= 0 || opponentHP.value <= 0) {
    gameOver.value = true;
  }
};

// Computed property för att bestämma inputfältets klass
const inputClass = computed(() => {
  if (!feedback.value) return '';
  if (feedback.value.startsWith('✅')) return 'correct-input';
  if (feedback.value.startsWith('❌') || feedback.value.startsWith('😞')) return 'incorrect-input';
  return '';
});

// Funktion som hanterar vad som sker vid Enter-tryck
const onEnterPress = () => {
  if (feedback.value === '') {
    submitAnswer();
  } else {
    nextRound();
  }
};

// Funktion för att ge upp rundan
const surrenderRound = () => {
  feedback.value = `😞 Du gav upp!<br>💔 Lurifax attackerade dig!`;
  playerHP.value -= damageOnIncorrect;
};

// Funktion för att gå vidare till nästa runda
const nextRound = () => {
  if (!gameOver.value) {
    newRound();
  }
};

// Konfetti vid perfekt resultat, körs om gameOver är true och spelaren har 100 HP
watch(gameOver, (value) => {
  if (value && playerHP.value === 100) {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.5 }
    });
  }
});

// Funktion för att starta om spelet
const restartGame = () => {
  playerHP.value = 100;
  opponentHP.value = 100;
  gameOver.value = false;
  feedback.value = "";
  userAnswer.value = "";
  unusedWords.value = [...vocabularyList];
  newRound();
};

// Starta spelet när komponenten laddas
newRound();
</script>

<style scoped>
.ordstriden-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

.header-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  margin: 0 auto;
  text-align: center;
  margin-bottom: -10px;
}

#info {
  display: inline-block;
  position: absolute;
  right: 30px;
  transform: translateY(15%);
}

.ordstriden-hero {
  width: 180px;
  height: auto;
  position: absolute;
  top: 0px;
}

.image-container {
  position: absolute;
}

.hero-img {
  width: 180px;
  height: auto;
}

.monster-img {
  width: 165px;
  height: auto;
  position: relative;
  margin-left: 241px;
}

#monster-shadow {
  position: absolute;
  width: 100px;
  height: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  bottom: -8px;
  left: 102%;
  filter: blur(10px);
  z-index: -1;
  transform: translateX(-140%);
}

#hero-shadow {
  position: absolute;
  width: 100px;
  height: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  bottom: -175px;
  filter: blur(10px);
  z-index: 10;
}

.player-health-status {
  display: flex;
  justify-content: space-around;
  margin: 5px;
  padding-bottom: 30px;
  gap: 170px;
}

.player-health-status .player,
.player-health-status .opponent {
  padding: -41px;
  border-radius: 10px;
  width: 40%;
  font-family: 'Bangers', sans-serif;
  font-size: 1.2em;
}

.player-health-status p {
  line-height: 1.2;
}

p {
  text-align: center;
  font-size: 1.25rem;
}

.styled {
  font-family: 'Bangers', sans-serif;
  font-size: 1.35em;
  color: #f77f00;
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

#input-container {
  padding-top: 160px;
}

.incorrect-input {
  border: 3px solid #F5505D;
  color: #F5505D;
}

input:focus {
  outline: none;
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

button {
  margin: 0 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #f77f00;
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

.surrender-button {
  background-color: #d32f2f;
  color: #fff;
  text-shadow: 1px 1px 1px #111;
  transition: all 0.3s ease-in-out;
}

.surrender-button:hover {
  background-color: #ff99cc;
  color: #111;
  text-shadow: none;
}

@media only screen and (max-width: 480px) {

  .no-blur .blur-enter-active,
  .no-blur .blur-leave-active {
    transition: none !important;
  }

  .no-blur .blur-enter-from,
  .no-blur .blur-leave-to {
    filter: none !important;
    opacity: 1;
  }

  .header-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  h2 {
    text-align: center;
    font-size: 1.5rem;
    padding-top: 0px;
    margin-top: -15px !important;
    margin-bottom: 10px;
  }

  #info {
    display: inline-block;
    position: absolute;
    right: 60px;
    transform: translateY(-80%);
  }

  #info img {
    width: 100%;
    height: 100%;
  }

  .ordstriden-hero {
    display: block;
    width: 110px;
    height: auto;
    position: absolute;
    top: 5px !important;
    left: 20px !important;
  }

  .monster-img {
    width: 100px;
    margin-left: 240px;
    padding-top: 18px;
    margin-top: -10px;
  }

  .player-health-status {
    gap: 50px;
  }

  .player-health-status .player,
  .player-health-status .opponent {
    font-size: 1em;
    width: 30%;
  }

  #hero-shadow {
    width: 70px;
    height: 12px;
    bottom: -145px;
    left: 40px;
  }

  #monster-shadow {
    left: 104%;
    width: 70px;
    height: 12px;
  }

  p {
    font-size: 1.1rem !important;
    margin-top: 0 !important;
  }

  input {
    width: 75%;
  }

  button {
    padding: 8px 13px;
  }
}
</style>
