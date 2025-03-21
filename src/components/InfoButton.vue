<template>
  <div>
    <button class="info-button" @click="openInfo" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <img :src="currentSrc" alt="Info button" />
    </button>

    <!-- Info-rutan som visas när knappen klickas -->
    <teleport to="body">
      <transition name="modal">
        <div v-if="showInfo" class="modal">
          <div class="modal-content">
            <span class="close" @click="openInfo">&times;</span>
            <p v-html="infoContent"></p>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Refs för att hantera info-rutan
const showInfo = ref(false);
const defaultSrc = `/info/info-black.png`;
const hoverSrc = `/info/info-pink.png`;
const currentSrc = ref(defaultSrc);

// Props för att skicka in innehåll till info-rutan
const props = defineProps({
  infoContent: {
    type: String,
    default: ''
  }
});

// Funktion för att öppna/stänga info-rutan
const openInfo = () => {
  showInfo.value = !showInfo.value;
};

// Funktioner för att byta bild på knappen vid hover
const onMouseEnter = () => {
  currentSrc.value = hoverSrc;
};

const onMouseLeave = () => {
  currentSrc.value = defaultSrc;
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.info-button {
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.info-button img {
  width: 100%;
  height: 100%;
}

.modal {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  z-index: 1001;
}

.modal-content {
  position: relative;
  padding: 20px;
  background: #fff;
  max-width: 375px;
  border-radius: 15px;
  border: 3px solid #111;
  background: linear-gradient(to bottom,
      lightblue 0%,
      lightblue 66%,
      #FFF8E1 100%);
}

.close {
  position: absolute;
  top: 1px;
  right: 8px;
  font-size: 1.8em;
  cursor: pointer;
}

@media only screen and (max-width: 480px) {
  .info-button {
    width: 22px;
    height: 22px;
  }
}
</style>
