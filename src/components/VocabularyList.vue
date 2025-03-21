<template>
  <div class="vocabulary-list">
    <h3>Sparade Ord</h3>
    <!-- Redigera glosor-knapp -->
    <button @click="editMode = !editMode" class="edit-button">
      {{ editMode ? 'Sluta redigera' : 'Redigera glosor' }}
    </button>

    <div v-if="wordsStore.words.length > 0">
      <ul>
        <li v-for="(word, index) in wordsStore.words" :key="index">
          {{ word.svenska }} - {{ word.engelska }}
          <!-- Visa radera-knapp om editMode är aktiverad -->
          <button class="delete-button" v-if="editMode" @click="removeWord(index)">Radera</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Inga ord sparade än.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWordsStore } from '../stores/wordsStore';

// Hämta Pinia store
const wordsStore = useWordsStore();

const editMode = ref(false); // Variabel för att hålla reda på om redigeringsläge är aktivt

// Funktion för att ta bort ett ord från listan
const removeWord = (index) => {
  wordsStore.removeWord(index); // Uppdaterar Pinia store och localStorage
};

// Ladda ord från Pinia när komponenten monteras
onMounted(() => {
  wordsStore.loadWords();
});
</script>

<style scoped>
.vocabulary-list {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

p {
  text-align: center;
}

.edit-button {
  border: 3px solid #111;
  padding: 10px 20px;
  background-color: #f77f00;
  color: #111;
  font-size: 1em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

.edit-button:hover {
  background-color: #ff99cc;
}

.delete-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #F5505D;
  color: white;
  text-shadow: 1px 1px 1px #111;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.delete-button:hover {
  background-color: #d32f2f;
}

@media only screen and (max-width: 480px) {
  .edit-button {
    padding: 8px 13px;
  }
}
</style>
