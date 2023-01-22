<script lang="ts">
  import { page } from '$app/stores'
  import { loginWithCredentials, loginWithGoogle } from '../helpers'

  let email: string = ''
  let password: string = ''
  let error = $page.url.searchParams.get('error')
</script>

<form
  on:submit|preventDefault={() => loginWithCredentials(email, password)}
  class="flex flex-col justify-center items-center space-y-4 w-full"
>
  <h1 class="text-4xl">Log In</h1>
  {#if error && error === 'CredentialsSignin'}
    <div class="w-full bg-red-500 rounded-md p-4 flex">
      Invalid credentials. Please try again.
    </div>
  {/if}
  <div class="w-full flex flex-col justify-start items-start space-y-4">
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Email</span>
      <input
        bind:value={email}
        name="email"
        type="email"
        class="rounded-md text-black w-full pl-2"
        placeholder="Email"
      />
    </label>
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Password</span>
      <input
        bind:value={password}
        name="password"
        type="password"
        class="rounded-md text-black w-full pl-2"
        placeholder="Password"
      />
    </label>
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full"
    >Log In</button
  >
  <div class="flex w-full justify-between items-center text-base">
    <a
      href="/auth/register"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Register
    </a>
    <a
      href="/auth/reset"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Forgot password?
    </a>
    <a
      href="/"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Home
    </a>
  </div>
</form>
<div class="w-full separator">OR</div>
<button
  on:click={loginWithGoogle}
  class="group bg-google-white hover:bg-google-white-hover active:bg-google-white rounded-md px-4 py-2 w-full relative"
>
  <span class="text-black">Sign in with Google</span>
  <div class="absolute top-0 left-0 h-full aspect-square">
    <div
      class="w-full h-full bg-google bg-cover group-hover:bg-google-hover group-active:bg-google"
    />
  </div>
</button>
