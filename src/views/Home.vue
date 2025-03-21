<template>
  <div class="content-wrapper">
    <div class="chat-container">
      <!-- Slumpmässig karaktär -->
      <RandomImage category="home" />

      <!-- Pratbubbla -->
      <div id="bubble">
        <h2>Välkommen</h2>
        <p>
          Här lär du dig <span style="color: #4cb5f5; font-weight: bold;">glosor</span>,
          <span style="color: #f77f00; font-weight: bold;">matte</span> och
          <span style="color: #ff99cc; font-weight: bold;">stavning</span>
          genom roliga och färgglada spel.
          <br>
          <span style="color: #7dffcb; font-weight: bold;">Lär dig</span>,
          <span style="color: #ff99cc; font-weight: bold;">lek</span> och
          <span style="color: #f77f00; font-weight: bold;">ha kul</span> –
          <br>
          <span style="color: #4cb5f5; font-weight: bold;">äventyret väntar!</span>
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
  transform: rotate(-3deg);
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
  max-width: 60%;
  margin-right: 200px;
  font-family: 'Bangers';
  color: #222;
  /* Nästan svart */
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 0.7px rgba(0, 0, 0, 0.623);
  /* Svagare svart kontur */

  text-align: center;
  line-height: 1.5;
  font-size: 1.45rem;
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
  font-family: 'Bangers';
  font-size: 2.5rem;
  margin-top: 8px;
  margin-bottom: -20px;
  margin-right: 200px;
  color: #F5F5F5;
  text-shadow:
    -2px -2px 0 black,
    2px 2px 0 black,
    3px -2px 0 black,
    -3px 3px 0 black,
    2px 2px 3px rgba(0, 0, 0, 0.5);
  /* Diffusare skugga */
  text-transform: uppercase;
}

/* Anpassa för HD-skärmar */
@media screen and (max-width: 1920px) {
  #bubble {
    left: 30px;
    height: 250px;
  }

  #bubble p {
    max-width: 55%;
    font-size: 1.3rem;
    margin-top: 8px;
    margin-right: 260px;

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
    margin-top: 6px;
    margin-bottom: 1px;
    margin-right: 265px;
    text-shadow:
      -1.5px -1.5px 0 black,
      1.5px 1.5px 0 black,
      2px -1.5px 0 black,
      -2px 2px 0 black,
      1px 1px 2px rgba(0, 0, 0, 0.4);
    /* Mjukare skugga */

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
