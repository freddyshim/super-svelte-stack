<script lang="ts">
  import type { PageServerData } from './$types'
  import { signIn } from '@auth/sveltekit/client'

  export let data: PageServerData
  let password: string
  let confirmPassword: string
  let status: string
  let error: string

  async function handleReset() {
    status = ''
    error = ''

    if (password !== confirmPassword) {
      error = 'Passwords do not match.'
      return
    }

    const res = await fetch('/auth/reset/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: data.token,
        newPassword: password,
      }),
    })
    console.log(res)

    if (res.ok) {
      status = 'Your password has been reset. Redirecting you shortly...'
      setTimeout(() => {
        signIn()
      }, 3000)
    } else {
      error = ((await res.json()) as App.Error).message
    }
  }
</script>

<form
  on:submit|preventDefault={handleReset}
  class="flex flex-col justify-center items-center space-y-4 w-full"
>
  <h1 class="text-4xl">Reset Password</h1>
  {#if error}
    <div class="w-full bg-red-500 rounded-md p-4 flex">
      {error}
    </div>
  {:else if status}
    <div class="w-full bg-green-500 rounded-md p-4 flex">
      {status}
    </div>
  {/if}
  <div class="w-full flex flex-col justify-start items-start space-y-4">
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">New Password</span>
      <input
        bind:value={password}
        type="password"
        autocomplete="new-password"
        placeholder="New Password"
        class="rounded-md text-black w-full pl-2"
      />
    </label>
    <label class="flex flex-col justify-start items-start w-full">
      <span class="sr-only">Confirm Password</span>
      <input
        bind:value={confirmPassword}
        type="password"
        autocomplete="new-password"
        placeholder="Confirm Password"
        class="rounded-md text-black w-full pl-2"
      />
    </label>
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full"
  >
    Reset Password
  </button>
</form>
