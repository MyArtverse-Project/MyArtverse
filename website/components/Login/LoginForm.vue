
<template>
  <form class="w-3/6 p-48 m-auto">
    <div class="flex flex-col relative my-3">
      <label for="username" class="hidden absolute top-[-33px] text-white  ">Username</label>
      <input name="username" id="username" type="username" class="text-black px-3 py-2 outline-none border-none"
        v-model="username" placeholder="Username" />
    </div>
    <div class="flex flex-col bg-transparent border border-solid border-[#1834c9]">
      <label for="password" class="peer-placeholder-shown:block ">Password</label>
      <input name="password" id="password" class="peer text-black" type="password" placeholder="Password"
        v-model="password" />
    </div>
  </form>
</template> 
<script lang="tsx" setup>
import { ref } from 'vue'
const username = ref("")
const password = ref("")

</script>
