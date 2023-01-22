<script lang="ts">
  import { goto } from '$app/navigation'
  import { loginWithCredentials, loginWithGoogle } from '../helpers'

  let error: string
  let name: string
  let email: string
  let password: string

  async function handleRegister() {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    if (res.ok) {
      await loginWithCredentials(email, password, '/auth/verify')
      await goto('/auth/verify')
    } else {
      error = ((await res.json()) as App.Error).message
    }
  }
</script>

<form
  on:submit|preventDefault={handleRegister}
  class="flex flex-col justify-center items-center space-y-4 w-full"
>
  <h1 class="text-4xl">Register</h1>
  {#if error}
    <div class="w-full bg-red-500 rounded-md p-4 flex">
      {error}
    </div>
  {/if}
  <div class="w-full flex flex-col justify-start items-start space-y-4">
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Name</span>
      <input
        bind:value={name}
        type="text"
        autocomplete="name"
        class="rounded-md text-black w-full pl-2"
        placeholder="Full Name"
      />
    </label>
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Email</span>
      <input
        bind:value={email}
        type="email"
        autocomplete="email"
        class="rounded-md text-black w-full pl-2"
        placeholder="Email"
      />
    </label>
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Password</span>
      <input
        bind:value={password}
        type="password"
        autocomplete="new-password"
        class="rounded-md text-black w-full pl-2"
        placeholder="Password"
      />
    </label>
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full"
  >
    Create Account
  </button>
  <div class="flex w-full justify-between items-center text-base">
    <a
      href="/auth/login"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Have an account? Log In
    </a>
  </div>
</form>
<div class="w-full separator">OR</div>
<button
  on:click={loginWithGoogle}
  class="group bg-google-white hover:bg-google-white-hover active:bg-google-white rounded-md px-4 py-2 w-full relative"
>
  <span class="text-black">Sign up with Google</span>
  <div class="absolute top-0 left-0 h-full aspect-square">
    <div
      class="w-full h-full bg-google bg-cover group-hover:bg-google-hover group-active:bg-google"
    />
  </div>
</button>
