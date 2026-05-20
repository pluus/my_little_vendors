<template>
  <footer class="mt-24 border-t border-stone-100 bg-white">
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
    >
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span
            class="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold text-xs"
            >m</span
          >
          <span class="font-semibold text-stone-800">my little vendors</span>
        </div>
        <p class="text-stone-500 text-sm leading-relaxed">
          Discover and support independent small businesses and home
          entrepreneurs in your community.
        </p>
      </div>
      <div>
        <h4 class="font-medium text-stone-700 mb-3 text-sm">Explore</h4>
        <ul class="space-y-2 text-sm text-stone-500">
          <li>
            <NuxtLink to="/" class="hover:text-amber-600 transition-colors"
              >All Businesses</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=food"
              class="hover:text-amber-600 transition-colors"
              >Food & Bakery</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=handmade"
              class="hover:text-amber-600 transition-colors"
              >Handmade & Crafts</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=beauty"
              class="hover:text-amber-600 transition-colors"
              >Beauty & Wellness</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-stone-700 mb-3 text-sm">For Vendors</h4>
        <ul class="space-y-2 text-sm text-stone-500">
          <li>
            <NuxtLink
              to="/submit"
              class="hover:text-amber-600 transition-colors"
              >List Your Business</NuxtLink
            >
          </li>
          <li>
            <a href="#" class="hover:text-amber-600 transition-colors"
              >How It Works</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-amber-600 transition-colors">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="border-t border-stone-100 py-4 text-center text-xs text-stone-400"
    >
      © {{ new Date().getFullYear() }} my little vendors · Made with care for
      small businesses
    </div>
  </footer>
</template>
