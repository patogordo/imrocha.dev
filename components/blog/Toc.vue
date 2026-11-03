<script lang="ts" setup>
import type { TocLink } from "@nuxt/content";

// Notion-like table of contents: a rail of dashes that opens the heading list on hover
const props = defineProps<{ links: TocLink[] }>();

const items = computed(() =>
  props.links
    .filter((link) => link.id !== "footnote-label") // hidden "Footnotes" heading from GFM
    .flatMap((link) => [
      { id: link.id, text: link.text, child: false },
      ...(link.children ?? []).map((c) => ({ id: c.id, text: c.text, child: true })),
    ]),
);

// The current section is the last heading that already passed the top of the screen
const active = ref("");
const updateActive = () => {
  let current = items.value[0]?.id ?? "";
  for (const { id } of items.value) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  }
  active.value = current;
};

onMounted(updateActive);
useEventListener("scroll", updateActive, { passive: true });
</script>

<template>
  <nav
    v-if="items.length > 1"
    class="toc group fixed right-6 top-32 z-30 max-lg:hidden"
    :aria-label="$t('blog.toc')"
  >
    <ul class="flex flex-col items-end py-2" aria-hidden="true">
      <li v-for="item in items" :key="item.id" class="py-1">
        <span
          class="block h-0.5 rounded-full transition-colors"
          :class="[
            item.child ? 'w-2.5' : 'w-4',
            active === item.id ? 'bg-primary-500' : 'bg-base-100',
          ]"
        />
      </li>
    </ul>

    <!-- The padding keeps the hover alive while the mouse moves from the rail to the panel -->
    <div
      class="absolute right-full top-0 pr-3 opacity-0 translate-x-1 pointer-events-none transition duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:pointer-events-auto"
    >
      <ul
        class="w-64 max-h-[calc(100vh-10rem)] overflow-y-auto p-2 bg-base-200 border border-base-100 rounded-lg shadow-xl shadow-black/30"
      >
        <li v-for="item in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="block truncate rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-base-100"
            :class="[
              item.child ? 'pl-6' : '',
              active === item.id ? '!text-primary-400' : 'hover:!text-white',
            ]"
            :title="item.text"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
