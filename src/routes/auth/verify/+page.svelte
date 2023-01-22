<script lang="ts">
  import { signOut } from '@auth/sveltekit/client'
  import type { PageData } from './$types'

  let error: string
  let data: PageData

  async function handleVerifyRequest() {
    const res = await fetch('/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      // TODO
    } else {
      error = ((await res.json()) as App.Error).message
    }
  }

  let logout = async () => {
    await signOut({ callbackUrl: '/' })
  }
</script>

<div class="flex flex-col justify-center items-center space-y-4 w-full">
  <h1 class="text-4xl">Verify Email</h1>
  {#if error}
    <div class="w-full bg-red-500 rounded-md p-4 flex">
      {error}
    </div>
  {/if}
  <div
    class="w-full max-w-md flex flex-col justify-center items-center space-y-4 text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-48 h-48 text-red-600"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
    <span>
      We have sent you a verification request to your email. Confirm your email
      by clicking the confirmation link provided in the sent message.
    </span>
  </div>
  <div class="w-full flex justify-between items-center">
    <button
      on:click={handleVerifyRequest}
      class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full max-w-[200px]"
    >
      Resend Reset Link
    </button>
    <button
      on:click={logout}
      class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 rounded-md px-4 py-2 w-full max-w-[200px]"
    >
      Logout
    </button>
  </div>
</div>
