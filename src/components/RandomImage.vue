<template>
  <div class="character-wrapper">
    <img :src="randomImage" alt="Tecknad figur" :class="['character-image', category]" id="randomImage"
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
    { src: "/home/girl.png", left: 40 }
  ],
  ordstriden: [
    { src: "/ordstriden/battle-boy.png", left: -70 },
    { src: "/ordstriden/battle-girl.png", left: -70 }
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
.character-image {
  object-fit: contain;
  width: auto;
  display: block;
  overflow: hidden;
}

.character-image.home {
  object-fit: contain;
  width: auto;
  display: block;
  margin-bottom: -20px;
  position: absolute;
  top: 200px;
  overflow: hidden;
}


.character-image.ordstriden {
  max-width: 200px;
  width: 200px;
  height: auto;
  position: absolute;
  top: 30%;
  transform: translateY(-30%);
}

.character-wrapper.home {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  margin-bottom: -20px;
}

/* Lägg till skugga under karaktärerna */
.character-wrapper.home::after {
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
