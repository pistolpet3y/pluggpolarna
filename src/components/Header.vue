<template>
  <header>
    <!-- SVG-logotyp -->
    <svg viewBox="0 -12 375 70" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <!-- Gradienten som texten följer -->
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff6f61" />
          <stop offset="9.09%" stop-color="#ffb645" />
          <stop offset="18.18%" stop-color="#f7e300" />
          <stop offset="27.27%" stop-color="#4cb5f5" />
          <stop offset="36.36%" stop-color="#88d9b2" />
          <stop offset="45.45%" stop-color="#9b7eec" />
          <stop offset="54.54%" stop-color="#f77f00" />
          <stop offset="63.63%" stop-color="#7dffcb" />
          <stop offset="72.72%" stop-color="#c9c9ff" />
          <stop offset="81.81%" stop-color="#ff99cc" />
          <stop offset="90.90%" stop-color="#34d399" />
          <stop offset="100%" stop-color="#f59e42" />
        </linearGradient>
      </defs>

      <!-- Kurvan som texten följer -->
      <path id="MyPath" fill="none" d="M0 50 Q187.5 -10 375 50" />

      <!-- Texten som följer kurvan -->
      <text dy="-10" text-anchor="middle" fill="url(#logoGradient)" font-family="Bangers" font-size="3.5rem">
        <textPath xlink:href="#MyPath" startOffset="50%">
          Pluggpolarna
        </textPath>
      </text>
    </svg>

    <!-- Snyggar till med moln -->
    <div id="cloud">
      <img src="/elements/clouds.png" alt="clouds">
    </div>

    <!-- Appens tagline -->
    <div id="tagLine">
      <p>
        <span style="color: #4cb5f5;">Lär, </span>
        <span style="color: #f77f00;">Lek </span>
        <span style="color: #ff99cc;">och </span>
        <span style="color: #7dffcb;">Lyckas!</span>
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
svg {
  overflow: visible;
  max-width: 550px;
  width: 100%;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

textPath {
  font-family: 'Bangers';
  font-size: 3.5rem;
  letter-spacing: 0.12em;
  text-shadow:
    3px 3px 1px #111,
    -1px 1px 1px #111,
    1px -1px 1px #111,
    -1px -1px 1px #111;
}

#tagLine {
  display: flex;
  margin: auto;
  justify-content: center;
  text-align: center;
  font-family: 'Bangers';
  font-size: 1.5rem;
  letter-spacing: 0.4em;
  margin-bottom: 0;
  margin-top: -10px;
}

#tagLine p {
  color: white;
  -webkit-text-stroke: 1px #111;
  text-shadow: 1px 1px 1px #111;
  text-align: justify;
  line-height: 1.8;
}

#cloud {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

#cloud img {
  position: absolute;
  width: 1035px;
  top: -220px;
  transform: translateX(-80px);
  z-index: -1;
}

@media only screen and (max-width: 480px) {
  textPath {
    font-size: 3.2rem;
    letter-spacing: 0.10em;
  }

  #tagLine {
    font-size: 1.4rem;
    letter-spacing: 0.2em;
    margin-bottom: 0px;
    padding: 0 10px;
  }

  #cloud {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 700px;
    height: 250px;
    overflow: hidden;
    z-index: -1;
  }

  #cloud img {
    width: 700px;
    height: auto;
    position: absolute;
    top: 0;
    left: -125px;
  }

  header {
    padding: 5px 0;
    text-align: center;
  }
}
</style>
