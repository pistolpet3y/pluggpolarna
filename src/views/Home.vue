<template>
  <div class="content-wrapper">
    <!-- Skickar in "home" som kategori -->
    <RandomImage category="home" />
    
    <div class="text-content">
      <h2>Välkommen!</h2>
      <p>
        Välkommen till Pluggpolarna - en lekfull och interaktiv plattform där barn utvecklar sina kunskaper i glosor,
        matematik och stavning genom roliga spel och utmaningar!
      </p>
    </div>
  </div>
</template>

<script setup>
import RandomImage from '../components/RandomImage.vue';
</script>

<style>
.content-wrapper {
  margin-top: 80px;
  position: relative;
}

.text-content {
  flex: 1;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.character-image {
  margin-top: 40px;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
}
</style>
