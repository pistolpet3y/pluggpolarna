<template>
  <img :src="randomImage" alt="Tecknad figur" class="character-image" id="randomImage"
    :style="{ left: leftValue, top: isMobile ? mobileTopValue || topValue : topValue }">
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const randomImage = ref("");
const leftValue = ref("");
const topValue = ref("");
const mobileTopValue = ref("");

const isMobile = ref(window.innerWidth <= 480);

const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 480;
};

window.addEventListener("resize", updateScreenSize);
const props = defineProps({
  category: String
});

// Bilderna som ska slumpas fram
const imageSets = {
  home: [
    { src: "/home/boy.png", left: "-170px" },
    { src: "/home/girl.png", left: "370px" }
  ],
  ordstriden: [
    { src: "/ordstriden/battle-boy.png", left: "-45px", top: "0px", mobileTop: "15px" },
    { src: "/ordstriden/battle-girl.png", left: "-45px", top: "0px", mobileTop: "-5px" }
  ]
};

// Hämtar bilderna för den valda kategorin
const selectedImageSet = computed(() => imageSets[props.category] || imageSets.home);

// Funktion för att slumpa fram en bild
function choosePic() {
  const randomNum = Math.floor(Math.random() * selectedImageSet.value.length);
  const selectedImage = selectedImageSet.value[randomNum];
  console.log("Laddar bild:", selectedImage.src); // Debugging
  randomImage.value = selectedImage.src;
  leftValue.value = selectedImage.left;
  topValue.value = selectedImage.top;
  mobileTopValue.value = selectedImage.mobileTop || selectedImage.top;
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
  margin-top: 40px;
  position: absolute;
  z-index: 10;
  transform: translateY(-50%);
}
</style>
