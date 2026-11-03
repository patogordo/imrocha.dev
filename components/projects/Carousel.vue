<script lang="ts" setup>
import { TransitionRoot } from "@headlessui/vue";

const { t } = useI18n();

const active = ref(0);

const languageInfo: Record<string, { flag: string; name: string }> = {
  en: { flag: "circle-flags:us", name: "English" },
  pt: { flag: "circle-flags:br", name: "Português" },
  es: { flag: "circle-flags:es", name: "Español" },
};

const items = computed(() => [
  {
    name: "Flaggle Versus",
    imgUrl: "/images/flaggleversus-preview.jpg",
    iconUrl: "/images/flaggleversus-icon.png",
    description: t("projects.flaggleversus.description"),
    languages: ["pt", "en", "es"],
    livePreview: "https://flaggle-versus.vercel.app",
  },
  {
    name: "Tonebook",
    imgUrl: "/images/tonebook-preview.jpg",
    iconUrl: "/images/tonebook-icon.png",
    description: t("projects.tonebook.description"),
    languages: ["pt"],
    sourceCode: "https://github.com/patogordo/Tonebook",
    livePreview: "https://patogordo.github.io/Tonebook/",
  },
  {
    name: "Easy Finance",
    imgUrl: "/images/easyfinance-preview.jpg",
    iconUrl: "/images/easyfinance-icon.png",
    description: t("projects.easyfinance.description"),
    languages: ["pt"],
    livePreview: "https://easyfinance-app.vercel.app",
  },
  {
    name: "PontoDigital",
    imgUrl: "/images/pontodigital-preview.png",
    iconUrl: "/images/pontodigital-icon.png",
    description: t("projects.pontodigital.description"),
    languages: ["pt"],
    livePreview: "https://pontodigital.me",
  },
  {
    name: "GBreath",
    imgUrl: "/images/gbreath-preview.png",
    iconUrl: "/images/gbreath-icon.png",
    description: t("projects.gbreath.description"),
    languages: ["en", "pt"],
    sourceCode: "https://github.com/gbreath",
    livePreview: "https://beta-gbreath.netlify.app",
  },
  // Hidden for now, uncomment to show it again
  // {
  //   name: "RocketLaunches",
  //   imgUrl: "/images/rocketlaunches-preview.png",
  //   iconUrl: "/images/rocketlaunches-icon.png",
  //   description: t("projects.rocketlaunches.description"),
  //   languages: ["en"],
  //   sourceCode: "https://github.com/rocket-launches",
  //   livePreview: "https://rocketlaunches.app",
  // },
]);
</script>

<template>
  <div
    class="w-full max-w-5xl mx-auto text-center flex flex-row max-sm:flex-col items-start gap-6"
  >
    <!-- Items -->
    <div
      class="sm:max-w-sm md:max-w-3xl max-sm:w-full flex flex-col max-sm:grid grid-cols-2 justify-center gap-4"
    >
      <template :key="index" v-for="(item, index) in items">
        <button
          class="relative z-10 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group max-sm:w-full"
          @click="active = index"
        >
          <span
            class="relative z-20 text-center flex flex-col items-center bg-base-300 w-full h-full p-2 border-2 rounded-lg"
            :class="active === index ? 'border-primary-500' : 'border-gray-500'"
          >
            <span
              class="flex items-center justify-center relative w-9 h-9 rounded-full mb-2"
            >
              <LazyNuxtImg
                class="rounded-xl bg-base-100"
                :src="item.iconUrl"
                width="512"
                height="512"
                :alt="`${$t('projects.icons-alt', {
                  project_name: item.name,
                })}`"
              />
            </span>
            <span class="block text-sm font-medium mb-2">{{ item.name }}</span>
          </span>
          <span
            class="z-10 absolute top-1/2 -right-8 w-full h-0.5 bg-primary-500 max-sm:hidden"
            :class="active === index ? '' : 'hidden'"
          ></span>
        </button>
      </template>
    </div>
    <!-- Images -->
    <div
      class="transition-all duration-150 delay-300 ease-in-out border-2 border-primary-500 p-6 rounded-lg bg-base-300 z-20 relative"
    >
      <div class="relative flex flex-col">
        <template :key="index" v-for="(item, index) in items">
          <TransitionRoot
            :show="active === index"
            enter="transition ease-in-out duration-500 delay-200 order-first"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in-out duration-300 absolute"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <LazyNuxtImg
              class="rounded-xl border bg-base-100 border-gray-700"
              :src="item.imgUrl"
              width="1024"
              height="576"
              :alt="`${$t('projects.preview-alt', {
                project_name: item.name,
              })}`"
            />

            <p class="text-start mt-6">
              {{ item.description }}
            </p>

            <div
              class="w-full flex items-center justify-start gap-2 mt-6 flex-wrap"
            >
              <p class="text-start">
                {{ $t("projects.supported-languages") }}:
              </p>

              <div
                v-for="(code, i) in item.languages"
                :key="code"
                class="flex items-center justify-start gap-2"
              >
                <Icon :name="languageInfo[code].flag" size="20" />
                <span class="font-bold"
                  >{{ languageInfo[code].name
                  }}{{ i < item.languages.length - 1 ? "," : "" }}</span
                >
              </div>
            </div>

            <div
              class="w-full flex max-sm:flex-col items-center justify-start mt-6 gap-4"
            >
              <a
                v-if="item?.sourceCode"
                class="px-4 py-3 bg-secondary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 max-sm:w-full"
                :href="item?.sourceCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="tabler:code" size="24" class="text-black" />
                {{ $t("projects.source-code") }}
              </a>

              <a
                v-if="item?.livePreview"
                class="px-4 py-3 bg-primary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 max-sm:w-full"
                :href="item?.livePreview"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t("projects.try-it-out") }}
                <Icon
                  name="tabler:arrow-up-right"
                  size="24"
                  class="text-black"
                />
              </a>
            </div>
          </TransitionRoot>
        </template>
      </div>
    </div>
  </div>
</template>
