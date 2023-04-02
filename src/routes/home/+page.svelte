<script>
  import Post from '$lib/components/Post.svelte'
  import { signOut } from '@auth/sveltekit/client'
  let logout = async () => {
    await signOut({ callbackUrl: '/' })
  }
</script>

<div class="flex justify-between items-center w-full h-20 bg-black text-white">
  <div class="w-20 h-20 p-4 relative">
    <div class="sr-only">Super Svelte Stack</div>
    <img src="/icon.png" alt="" />
  </div>
  <div class="flex justify-center items-center space-x-4 text-2xl">
    <a href="#about" class="hover:text-blue-500">About</a>
    <a href="#features" class="hover:text-blue-500">Features</a>
    <a href="#contact" class="hover:text-blue-500">Contact</a>
  </div>

  <div class="flex items-center space-x-4 mr-4 text-xl">
    <button
      on:click={logout}
      class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md px-4 py-2"
    >
      Log Out
    </button>
  </div>
</div>
<div
  class="flex flex-col justify-start items-center w-full h-[calc(100vh-5rem)] py-8 bg-black text-white"
>
  <h1 class="text-4xl">Super Svelte Stack</h1>
  <div class="flex flex-col justify-center items-center flex-1 w-full px-8">
    <Post
      title="Post Title"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      modified={new Date()}
    />
  </div>
</div>
