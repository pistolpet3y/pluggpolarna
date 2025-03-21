<template>
  <div>
    <div class="button-container">
      <router-link to="/glosquiz">
        <button class="button-green">Glosquiz</button>
      </router-link>

      <router-link to="/customquiz">
        <button class="button-green">Egna glosor</button>
      </router-link>

      <router-link to="/editquiz">
        <button class="button-blue">Redigera glosor</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Inga ljudfunktioner behövs nu.
</script>

<style scoped>
.button-green {
  background-color: #7dffcb;
}

.button-blue {
  background-color: #4cb5f5;
}

.button-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 5px;
  border: 3px solid #111;
  padding: 10px 20px;
  width: 120px;
  color: #111;
  font-size: 1.2em;
  font-family: 'Bangers', sans-serif;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff99cc;
}
</style>
