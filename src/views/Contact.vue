<template>
  <div class="kontakt-container">
    <h2>Kontakt</h2>
    <form @submit.prevent="saveFormData">
      <label for="name">Ditt namn:</label>
      <input id="name" v-model="formData.name" name="name" type="text" placeholder="Namn">

      <label for="email">Din e-post:</label>
      <input id="email" v-model="formData.email" name="email" type="email" placeholder="E-post">

      <label for="message">Ditt meddelande:</label>
      <textarea id="message" v-model="formData.message" name="message" placeholder="Skriv ditt meddelande här." cols="50" rows="5"></textarea>

      <button>Skicka!</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// ref-objekt för att hantera formulärdata
const formData = ref({
  name: '',
  email: '',
  message: ''
});

// Metod för att spara data i localStorage
const saveFormData = () => {
  localStorage.setItem('contactFormData', JSON.stringify(formData.value));
  alert('Ditt meddelande har skickats, vi återkommer till dig så snart som möjligt!');
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

input[type="text"],
input[type="email"],
textarea,
select {
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
  border: 2px solid #333;
  padding: 10px;
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 1.03rem;
  background-color: #ddd;
  border-radius: 5px;
}

input[type="text"]:hover,
input[type="email"]:hover,
textarea:hover,
select:hover {
  border-color: #222;
  background-color: #eee;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus,
select:focus {
  border: 2px solid #111;
  background-color: #fff;
  outline: none;
}

button {
  margin: 10px;
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
