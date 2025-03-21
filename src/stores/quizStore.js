import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  // Håller de tillståndsvariabler vi behöver
  state: () => ({
    correctAnswers: 0,
    errorWords: [],
  }),
  // Funktioner för att uppdatera tillståndet
  actions: {
    setQuizResults(correctAnswers, errorWords) {
      this.correctAnswers = correctAnswers;
      this.errorWords = errorWords;
    },
    startQuiz() {
      this.correctAnswers = 0;
      this.errorWords = [];
    },
  },
});
