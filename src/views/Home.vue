<template>
  <div class="content-wrapper">
    <div class="chat-container">
      <!-- Slumpmässig karaktär -->
      <RandomImage category="home" />

      <!-- Pratbubbla -->
      <div id="bubble">
        <h2>Välkommen!</h2>
        <p>Här lär du dig glosor, matte och stavning genom roliga och färgglada spel. Lär dig, lek och ha kul –
          <br>äventyret väntar!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import RandomImage from '../components/RandomImage.vue';
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: row-reverse;
  /* Karaktären hamnar alltid till höger */
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  position: relative;
}

#bubble {
  position: relative;
  width: 80%;
  margin-top: -120px;
  max-width: 600px;
  left: 10px;
  height: 300px;
  background-image: url('@/assets/talkbubble.png');
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;
  box-sizing: border-box;
}

.character-image {
  position: relative;
  margin-top: 100px;
  margin-left: 30px;
  height: 380px !important;
  /* Justera så att båda bilderna får samma höjd */
  object-fit: contain;
}

#bubble p {
  text-align: center;
  max-width: 55%;
  margin-right: 200px;
  margin-bottom: auto;
  font-size: 1.2rem;
}

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

h2 {
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: -20px;
  margin-right: 200px;
}

/* Anpassa för HD-skärmar */
@media screen and (max-width: 1920px) {
  #bubble {
    left: 30px;
    height: 250px;
  }

  #bubble p {
    max-width: 50%;
    font-size: .99rem;
    margin-top: 15px;
    margin-right: 250px;

  }

  .character-image {
    position: relative;
    margin-top: 10px !important;
    height: 380px !important;
    /* Justera så att båda bilderna får samma höjd */
    object-fit: contain;
    margin-left: 5px;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 29px;
    margin-bottom: -20px;
    margin-right: 250px;
  }
}

/* Anpassa för surfplattor */
@media screen and (max-width: 1024px) {
  #bubble {
    height: 220px;
    width: 90%;
  }



  #bubble h2 {
    font-size: 1.4rem;
  }

  #bubble p {
    max-width: 60%;
    font-size: 1rem;
  }
}

/* Anpassa för mobil */
@media screen and (max-width: 600px) {
  #bubble {
    height: 180px;
    width: 95%;
    margin-top: 20px;
  }

  #bubble h2 {
    font-size: 1.2rem;
  }

  #bubble p {
    font-size: 0.95rem;
  }
}
</style>
