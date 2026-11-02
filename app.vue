<script setup lang="ts">
const showFallback = ref(true);

onNuxtReady(() => {
  setTimeout(() => {
    showFallback.value = false;
  }, 1200);
});

const head = useLocaleHead({
  dir: true,
  key: "id",
  seo: true,
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang">
    <Head>
      <!-- SEO & Meta tags -->
      <Title>Ícaro Rocha (Pato)</Title>
    </Head>

    <Body>
      <transition name="fade">
        <div
          v-if="showFallback"
          class="w-screen h-screen fixed top-0 left-0 z-50 bg-base-300 flex flex-col items-center justify-center"
        >
          <iframe
            src="https://lottie.host/embed/557823f5-970a-4526-b323-3693230b32a1/98aCcLFpid.lottie"
          ></iframe>
        </div>
      </transition>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss">
@import "~/assets/scss/global.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
