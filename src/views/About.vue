<template>
  <div>
    <div class="about">
      <h2>Om Oss</h2>
      <p>
        Pluggpolarna är en lekfull och barnvänlig läxhjälpsplattform som gör inlärning roligare och mer engagerande
        förskolbarn.
        Vi fokuserar på att kombinera kunskap och lek, vilket gör att barn lär sig effektivare och med glädje.
      </p>
      <p>
        Med innehåll på svenska som är anpassat efter barns behov erbjuder vi ett stöd som hjälper föräldrar och skolor
        att förbättra barns inlärning och skolprestationer
        – allt i en trygg och inspirerande digital miljö.
      </p>
    </div>

    <div class="its-us">
      <div class="character">
        <p>Francis</p>
        <img src="/developers/francis.png" alt="Francis">
      </div>
      <div class="character">
        <p>Julia</p>
        <img src="/developers/julia.png" alt="Julia">
      </div>
      <div class="character">
        <p>Alex</p>
        <img src="/developers/alex.png" alt="Alex">
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  margin: 0 auto;
  display: flex;
  justify-content: center !important;
  flex-direction: column;
  width: 375px !important;
}

.about h2 {
  width: 100%;
  white-space: nowrap;
  text-align: center;
}

.its-us {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.character {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.its-us img {
  max-height: 200px;
  width: auto;
  z-index: 1;
}

.its-us p {
  font-family: Bangers;
  font-size: 1.3em;
  text-align: center;
  text-shadow:
    -1px -1px 0 #111,
    1px -1px 0 #111,
    -1px 1px 0 #111,
    1px 1px 0 #111;
  letter-spacing: 0.09em;
  margin-bottom: -10px;
}

.character:nth-child(1) p {
  color: #ff99cc;
  transform: rotate(-10deg);
  position: relative;
  left: -6px;
  top: -10px;
}

.character:nth-child(2) p {
  color: #f77f00;
  position: relative;
  top: -14px;
}

.character:nth-child(3) p {
  color: #7dffcb;
  transform: rotate(8deg);
  position: relative;
  left: 8px;
  top: -10px;
}

@media only screen and (max-width: 430px) {
  .its-us {
    display: none;
  }

  p {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
