<template>
  <div class="content-wrapper">
    <div class="chat-container">
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

      <!-- Slumpmässig karaktär under bubblan -->
      <RandomImage category="home" />
    </div>
  </div>
</template>


<script setup>
import RandomImage from '../components/RandomImage.vue';
</script>

<style>
.chat-container {
  margin-top: -120px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  gap: 10px;
  padding-bottom: 0;
}

#bubble {
  position: relative;
  width: 80%;
  margin-bottom: -20px;
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
  z-index: 2;
  box-sizing: border-box;
  transform: rotate(-3deg);
}

.character-image {
  display: block;
  position: relative;
  height: 450px !important;
  object-fit: contain;
  margin-top: 40px;
  z-index: 1;
  /* Säkerställer att den ligger UNDER pratbubblan */
}

#bubble p {
  max-width: 60%;
  margin-right: 200px;
  font-family: 'Bangers';
  color: #191919;
  /* Nästan svart */
  text-align: center;
  line-height: 1.5;
  font-size: 1.45rem;
}

#bubble p span {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 0.7px rgba(0, 0, 0, 0.637);
}


.content-wrapper {
  margin-top: 80px;
  position: relative;
  margin-bottom: -160px;
  padding-bottom: 0;
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
    font-size: 1.32rem;
    margin-top: 8px;
    margin-right: 260px;

  }

  .character-image {
    position: relative;
    height: 360px !important;
    /* Justera så att båda bilderna får samma höjd */
    object-fit: contain;
    margin-top: -40px;
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
