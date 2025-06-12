<script lang="ts" setup></script>

<template>
  <section class="w-full flex flex-col items-center">
    <HeroHeader />

    <span class="mt-12" />

    <div id="about" class="w-full flex flex-col items-start justify-start">
      <h3 class="text-xl mb-2">Hey there!</h3>

      <p class="text-lg">
        Welcome to my blog, here I share a bit of everything from cool stuff
        I've learned, projects I'm working on and tricky challenges I've figured
        out along the way. It's my little corner to document ideas, solutions,
        experiences, and maybe even help people with similar problems!
      </p>
    </div>

    <span class="mt-12" />

    <div id="about" class="w-full flex flex-col items-start justify-start">
      <a href="/blog/posts/date/2024-12">
        <h3 class="text-xl mb-4">Posts of December 2024.</h3>
      </a>

      <div class="w-full p-4 border-2 border-gray-500 rounded-lg">
        <a href="/blog/posts/how-to-setup-a-nitro-backend-application">
          <h3 class="text-lg text-info-500 mb-2">
            How to setup a Nitro Backend application.
          </h3>
        </a>

        <div class="text-sm flex flex-row flex-wrap gap-2">
          <p>14 December 2024, 14:35h</p>
          <p>|</p>
          <a href="/blog/tags/backend" class="text-info-500 underline">
            backend
          </a>
          <a href="/blog/tags/nitro" class="text-info-500 underline"> nitro </a>
          <a href="/blog/tags/database" class="text-info-500 underline">
            database
          </a>
          <a href="/blog/tags/prisma" class="text-info-500 underline">
            prisma
          </a>

          <a href="/blog/tags/js" class="text-info-500 underline"> js </a>
          <a href="/blog/tags/ts" class="text-info-500 underline"> ts </a>
          <a href="/blog/tags/nodejs" class="text-info-500 underline">
            nodejs
          </a>
        </div>

        <div class="w-full h-[1px] bg-gray-700 mb-4 mt-2"></div>

        <p>
          In this post, I'll share why I decided build Backend applications
          using Nitro and how I went about it. I'll dive into the architecture,
          the patterns I used. And I'll also share some tips and tricks I
          learned along the way.
        </p>
      </div>
    </div>
  </section>
</template>
