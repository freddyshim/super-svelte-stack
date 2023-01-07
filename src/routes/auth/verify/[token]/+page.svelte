<script lang="ts">
  import { goto } from '$app/navigation'
</script>

<div class="flex flex-col justify-center items-center space-y-4 w-full">
  <h1 class="text-4xl">Your Email is Verified</h1>
  <div class="text-lg">Log in and start exploring Super Svelte Stack.</div>
  <button
    on:click={() => goto('/auth/login')}
    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full"
    >Log In</button
  >
</div>
