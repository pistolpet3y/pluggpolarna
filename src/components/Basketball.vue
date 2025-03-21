<template>
  <img v-if="isVisible" ref="basketball" src="/dino/ball.png" alt="Basketball" id="basketball" />
  <img v-if="isVisible" ref="dino" src="/dino/dino.png" alt="Dino" id="dino" @click="handleClick" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const basketball = ref(null);
const clickCount = ref(0);
const targetClicks = 3;
const isVisible = ref(window.innerWidth > 480);

// Funktion för att hantera klick på bollen
function handleClick() {
  // Kontrollera att det verkligen är ett klick
  if (basketball.value) {
    clickCount.value++;

    basketball.value.classList.remove('bounce', 'drop');
    void basketball.value.offsetWidth;

    // Om användaren inte har klickat tillräckligt många gånger
    if (clickCount.value < targetClicks) {
      basketball.value.classList.add('bounce');
    } else {
      basketball.value.classList.add('drop');
      clickCount.value = 0;
    }
  }
}

const handleResize = () => {
  isVisible.value = window.innerWidth > 480;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
#dino {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  width: 100px;
}

#basketball {
  position: fixed;
  bottom: 25px;
  right: 88px;
  z-index: 10;
  width: 20px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
}

.bounce {
  animation: bounce 1s ease;
}

/* "Drop"-animation med flera rotationer för en smidigare rullning */
.drop {
  animation: drop 2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes drop {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  20% {
    transform: translate(0, 20px) rotate(0deg);
  }

  30% {
    transform: translate(0px, 16px) rotate(-60deg);
  }

  40% {
    transform: translate(0px, 20px) rotate(-90deg);
  }

  45% {
    transform: translate(-0.5px, 17px) rotate(-120deg);
  }

  55% {
    transform: translate(-2px, 20px) rotate(-180deg);
  }

  60% {
    transform: translate(-3.5px, 18px) rotate(-240deg);
  }

  65% {
    transform: translate(-4.5px, 20px) rotate(-300deg);
  }

  70% {
    transform: translate(-5px, 19px) rotate(-360deg);
  }

  75% {
    transform: translate(-6px, 20px) rotate(-420deg);
  }

  80% {
    transform: translate(-7px, 20px) rotate(-480deg);
  }

  85% {
    transform: translate(-7.5px, 20px) rotate(-540deg);
  }

  90% {
    transform: translate(-8px, 20px) rotate(-600deg);
  }

  95% {
    transform: translate(-8.5px, 20px) rotate(-660deg);
  }

  100% {
    transform: translate(-9px, 20px) rotate(-720deg);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(20px);
  }

  50% {
    transform: translateY(0);
  }

  70% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}

@media only screen and (max-width: 480px) {
  #dino,
  #basketball {
    display: none !important;
  }
}
</style>
