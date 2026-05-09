<template>
  <section class="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-16 px-6">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

      <!-- Left -->
      <div class="space-y-8">
        <div class="space-y-4">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
            تماس با <span class="text-yellow-300">تاپ‌کار</span>
          </h1>

          <p class="text-gray-300 text-lg leading-relaxed max-w-xl">
            تاپ‌کار واردکننده خودروهای خارجی با پلاک موقت در استان مازندران است.
            برای ارتباط سریع، از شماره‌های پشتیبانی استفاده کنید.
          </p>
        </div>

        <!-- Support -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div class="flex items-center gap-3">
            <!-- Clock Icon (inline SVG) -->
            <svg class="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <h2 class="text-xl font-semibold">ساعات پشتیبانی</h2>
          </div>

          <p class="mt-3 text-gray-200 text-lg">
            همه‌روزه از ساعت
            <span class="font-bold text-white">10 صبح تا 17 عصر</span>
          </p>
        </div>

        <!-- Phones -->
        <div class="rounded-2xl p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_18px_50px_rgba(234,179,8,0.25)]">
          <div class="flex items-center gap-3">
            <!-- Phone Icon -->
            <svg class="w-6 h-6 text-black/90" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 3h3l2 5-2 2c1.5 3 4 5.5 7 7l2-2 5 2v3c0 1-1 2-2 2-10 0-19-9-19-19 0-1 1-2 2-2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
            <h2 class="text-xl font-bold">شماره‌های تماس</h2>
          </div>

          <ul class="mt-4 space-y-3 text-base sm:text-lg font-semibold">
            <li class="flex items-center justify-between gap-4">
              <span class="text-black/90">پشتیبانی</span>
              <a class="hover:opacity-90" :href="`tel:01133400071`">01133400071</a>
            </li>
            <li class="flex items-center justify-between gap-4">
              <span class="text-black/90">پشتیبانی</span>
              <a class="hover:opacity-90" :href="`tel:01133400081`">01133400081</a>
            </li>
            <li class="flex items-center justify-between gap-4">
              <span class="text-black/90">تماس اضطراری</span>
              <a class="hover:opacity-90" :href="`tel:01133700012`">01133700012</a>
            </li>
            <li class="flex items-center justify-between gap-4">
              <span class="text-black/90">تماس اضطراری</span>
              <a class="hover:opacity-90" :href="`tel:01133700013`">01133700013</a>
            </li>
          </ul>

          <p class="mt-4 text-black/80 text-sm">
            (بدون فرم) فقط با تماس سریع، راهنمایی می‌شید.
          </p>
        </div>

        <!-- Address -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div class="flex items-center gap-3">
            <!-- Pin Icon -->
            <svg class="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
            <h2 class="text-xl font-semibold">آدرس</h2>
          </div>

          <div class="mt-3 text-gray-200 text-lg leading-relaxed space-y-2">
            <p class="flex items-start gap-3">
              <span class="text-yellow-300 mt-1" aria-hidden="true">•</span>
              <span>مازندران، ساری، جاده فرح‌آباد، جنب دنیای آرزو</span>
            </p>

            <p class="flex items-start gap-3">
              <span class="text-yellow-300 mt-1" aria-hidden="true">•</span>
              <span>کد پستی: <span class="font-bold text-white">4743186012</span></span>
            </p>
          </div>
        </div>
      </div>

      <!-- Right (SVG decoration) -->
      <div class="relative">
        <!-- Decorative card -->
        <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between gap-4">
              <div class="space-y-1">
                <p class="text-yellow-300 font-bold text-sm tracking-wide">TOPCAR / تماس سریع</p>
                <h3 class="text-2xl font-extrabold">همین حالا با ما صحبت کن</h3>
              </div>

              <!-- Badge -->
              <div class="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold">
                10–17
              </div>
            </div>

            <div class="mt-6 grid gap-4">
              <!-- Info blocks with SVG -->
              <div class="flex items-start gap-4 rounded-2xl bg-black/20 border border-white/10 p-4">
                <!-- Mail/Info icon (bolt-like) -->
                <svg class="w-7 h-7 text-yellow-300 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <div>
                  <p class="font-bold">پاسخ‌گویی سریع</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    در ساعات پشتیبانی آماده راهنمایی هستیم.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 rounded-2xl bg-black/20 border border-white/10 p-4">
                <!-- Phone wave icon -->
                <svg class="w-7 h-7 text-yellow-300 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.2 9.3 19.8 19.8 0 0 1 .1.9 2 2 0 0 1 2  -1?"/>
                </svg>
                <div>
                  <p class="font-bold">تماس از طریق شماره‌ها</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    4 خط پشتیبانی برای پوشش بهتر.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4 rounded-2xl bg-black/20 border border-white/10 p-4">
                <!-- Location icon -->
                <svg class="w-7 h-7 text-yellow-300 mt-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <div>
                  <p class="font-bold">اطلاعات دقیق</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    مازندران، ساری — جاده فرح‌آباد، جنب دنیای آرزو
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Background SVG blobs -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <svg class="absolute -top-10 -left-10 opacity-30" width="220" height="220" viewBox="0 0 220 220" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FACC15"/>
                  <stop offset="1" stop-color="#F59E0B"/>
                </linearGradient>
              </defs>
              <path d="M110 10C155 10 210 55 210 110C210 165 155 210 110 210C65 210 10 165 10 110C10 55 65 10 110 10Z" fill="url(#g1)"/>
            </svg>

            <svg class="absolute -bottom-14 -right-14 opacity-25" width="260" height="260" viewBox="0 0 260 260" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="g2" x1="0" y1="260" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FDE047"/>
                  <stop offset="1" stop-color="#B45309"/>
                </linearGradient>
              </defs>
              <path d="M130 20C185 20 240 70 240 130C240 190 185 240 130 240C75 240 20 190 20 130C20 70 75 20 130 20Z" fill="url(#g2)"/>
            </svg>
          </div>
        </div>

        <!-- Tiny bottom hint -->
        <div class="mt-4 text-center text-gray-400 text-sm">
      همه روزه پشتیبان شما هستیم
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Static page (no logic)
</script>
