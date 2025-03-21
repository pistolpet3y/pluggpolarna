<template>
  <div class="character-wrapper">
    <img :src="randomImage" alt="Tecknad figur" class="character-image" id="randomImage"
      :style="{ left: `calc(50% + ${leftValue}px)` }">
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const randomImage = ref("");
const leftValue = ref(0);

const props = defineProps({
  category: String
});

// Definiera bildpositioner
const imageSets = {
  home: [
    { src: "/home/boy.png", left: 50 },
    { src: "/home/girl.png", left: 50 }
  ],
  ordstriden: [
    { src: "/ordstriden/battle-boy.png", left: -30 },
    { src: "/ordstriden/battle-girl.png", left: 30 }
  ]
};

// Hämta bilder för vald kategori
const selectedImageSet = computed(() => imageSets[props.category] || imageSets.home);

function choosePic() {
  const randomNum = Math.floor(Math.random() * selectedImageSet.value.length);
  const selectedImage = selectedImageSet.value[randomNum];

  console.log("Laddar bild:", selectedImage.src); // Debugging

  randomImage.value = selectedImage.src;
  leftValue.value = selectedImage.left;
}

// Kör funktionen när komponenten laddas
onMounted(() => {
  choosePic();
});

// Kör funktionen när användaren byter kategori
watch(route, () => {
  choosePic();
});
</script>

<style scoped>
.character-wrapper {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

/* Lägg till skugga under karaktärerna */
.character-wrapper::after {
  content: "";
  position: absolute;
  width: 150px;
  /* Justera storleken på skuggan */
  height: 30px;
  /* Oval form */
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  bottom: -10px;
  /* Justera position */
  left: 130%;
  transform: translateX(-50%);
  filter: blur(8px);
  /* Lägg till oskärpa */
  z-index: -1;
  /* Skuggan placeras under karaktären */
}

/* Karaktärens stil */
</style>
