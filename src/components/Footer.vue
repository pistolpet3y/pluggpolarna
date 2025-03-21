<template>
  <div class="social-icons">
    <img src="/socials/social-fb.png" alt="Facebook">
    <img src="/socials/social-ig.png" alt="Instagram">
    <img src="/socials/social-x.png" alt="X">
  </div>

  <Basketball />
  <meta content="width=device-width, initial-scale=1" name="viewport" />

  <footer style="position: relative;">
    <p>&copy; 2025 Pluggpolarna</p>
    <!-- Footer-line visas ovanpå -->
    <div class="footer-line"></div>
    <!-- Footer-span ligger bakom -->
    <div class="footer-span"></div>
  </footer>
</template>

<script>
import Basketball from './Basketball.vue';

export default {
  name: 'App',
  components: {
    Basketball
  }
};
</script>

<style scoped>
.social-icons {
  width: 375px;
  position: relative;
  bottom: -80px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: auto;
  display: flex;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 2;
}

.social-icons img {
  width: 25px;
  height: 25px;
}

.social-icons img:hover {
  transform: scale(1.5);
}

footer {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  text-align: center;

}

footer::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/footer.g.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  z-index: -1;
}

footer p {
  padding-top: 100px;
  justify-content: center;
  display: flex;
  font-family: 'Kidprint';
  font-size: 1.3rem;
  color: #FFF8E1;
}

.footer-line {
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 375px;
  height: 10px;
  z-index: 1;
  background: linear-gradient(90deg, rgba(76, 181, 245, 1) 10%, rgba(247, 127, 0, 1) 28%, rgba(255, 153, 204, 1) 57%, rgba(125, 255, 203, 1) 94%);
  transform: translateX(-50%);
}

.footer-span {
  border-top: 1px solid #9b8a55;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 10px;
  z-index: -1;
  background: linear-gradient(90deg, rgba(76, 181, 245, 1) 50%, rgba(125, 255, 203, 1) 50%);
}

@media screen and (max-width: 480px) {
  footer {
    bottom: 7px;
  }
}
</style>
