<template>
  <div>
    <div class="info-buttons-container">
      <router-link to='/about'>
        <button class="button-green">Om oss</button>
      </router-link>

      <router-link to='/contact'>
        <button class="button-blue">Kontakt</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Ingen ljudfunktionalitet behövs längre
</script>

<style scoped>
.info-buttons-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-green {
  background-color: #7dffcb;
}

.button-blue {
  background-color: #4cb5f5;
}

.button-orange {
  background-color: #f77f00;
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
