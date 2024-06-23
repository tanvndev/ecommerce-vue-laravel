<template>
  <div class="h-screen w-64 overflow-y-auto bg-white">
    <div class="py-4 text-gray-500">
      <a href="" class="block px-5 text-center"
        ><img
          class="w-[150px] object-contain object-center text-center"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsScWYmyfPv3XdkNdEFVJ1wlDKMOgcSWUcg&s"
          alt="logo"
      /></a>

      <ul>
        <li class="relative">
          <a href="" class="block px-6 py-4 text-[14px]">
            <span
              class="absolute inset-y-0 left-0 w-1 rounded-br-lg rounded-tr-lg bg-emerald-500"
              aria-hidden="true"
            ></span>
            <div
              class="text-gay-500 inline-flex items-center text-[15px] text-emerald-600 transition-colors duration-150 hover:text-emerald-600 active:text-emerald-600"
            >
              <i class="ti-home mr-3"></i>
              <span class="font-semibold"> Dashboard </span>
            </div>
          </a>
        </li>
        <li class="relative px-6 py-4">
          <button type="button" class="block text-[14px]">
            <div
              class="inline-flex items-center text-[15px] text-gray-500 transition-colors duration-150 hover:text-emerald-600"
            >
              <i class="ti-harddrives mr-3"></i>
              <span class="font-semibold"> Catalog </span>
              <i class="ti-angle-right ml-6 text-[10px]"></i>
            </div>
          </button>

          <ul
            class="overflow-hidden rounded-md p-2 text-sm font-medium text-gray-500 dark:bg-gray-900"
          >
            <li v-for="i in 3" :key="i">
              <a
                class="font-serif inline-flex cursor-pointer items-center py-1 text-sm text-gray-600 transition-colors duration-150 hover:text-emerald-600"
                rel="noreferrer"
                href="/products"
              >
                <i class="ti-minus"></i>
                <span class="ml-2">Products</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="fixed bottom-0 mx-auto mt-3 block w-64 px-6 py-6">
        <button
          class="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-transparent bg-emerald-500 px-5 py-3 align-bottom font-medium leading-5 text-white transition-colors duration-150 hover:bg-emerald-600 focus:outline-none active:bg-emerald-600"
          type="button"
        >
          <span class="flex items-center"
            ><svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="mr-3 text-lg"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"
              ></path></svg
            ><span class="text-sm">Log Out</span></span
          >
        </button>
      </div>
    </div>
  </div>
</template>
