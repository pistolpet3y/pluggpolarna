import { defineStore } from 'pinia';

export const useWordsStore = defineStore('words', {
  state: () => ({
    words: [],
  }),
  actions: {
    addWord(word) {
      this.words.push(word);
      localStorage.setItem('vocabularyList', JSON.stringify(this.words));
    },
    loadWords() {
      const storedWords = localStorage.getItem('vocabularyList');
      if (storedWords) {
        this.words = JSON.parse(storedWords);
      }
    },
    removeWord(index) {
      this.words.splice(index, 1);
      localStorage.setItem('vocabularyList', JSON.stringify(this.words));
    }
  },
});
