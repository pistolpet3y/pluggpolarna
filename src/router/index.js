// Importerar funktioner från Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importerar komponenter (vyer) som ska användas som sidor i routningen
import Home from '../views/Home.vue';
import Play from '../views/Play.vue';
import Info from '../views/Info.vue';
import Glosquiz from '../views/Glosquiz.vue';
import Mattemagi from '../views/Mattemagi.vue';
import Ordstriden from '../views/Ordstriden.vue';
import QuizSelector from '../views/QuizSelector.vue';
import CustomQuiz from '../views/CustomQuiz.vue';
import CustomQuizResults from '../views/CustomQuizResults.vue';
import EditQuiz from '../views/EditQuiz.vue';
import Results from '../views/Results.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';

// Definierar en array med rutter
const routes = [
  { path: '/', component: Home },
  { path: '/play', component: Play },
  { path: '/info', component: Info },
  { path: '/glosquiz', component: Glosquiz },
  { path: '/mattemagi', component: Mattemagi },
  { path: '/ordstriden', component: Ordstriden },
  { path: '/quizselector', component: QuizSelector },
  { path: '/customquiz', component: CustomQuiz },
  { path: '/customquizresults', component: CustomQuizResults },
  { path: '/editquiz', component: EditQuiz },
  { path: '/results', component: Results },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
];

// Skapar en router-instans
const router = createRouter({
  history: createWebHistory(),
  routes, // Tilldelar sidans rutter till vår router
  scrollBehavior() {
    return { top: 0 }; // Scrollar upp till toppen av sidan vid sidbyte
  }
});

// Koden nedan är för att byta bakgrundsbild på sidorna
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(route, () => {
  choosePic(); // Triggar om vid varje sidbyte
});

// Exporterar routern så att den kan användas i main.js
export default router;
