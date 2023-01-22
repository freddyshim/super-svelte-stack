<script lang="ts">
  let email: string
  let status: string
  let error: string

  async function handleResetRequest() {
    status = ''
    error = ''
    const res = await fetch('/auth/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (res.ok) {
      status = `We have sent you a password reset to ${email}. Check your email to reest your password.`
    } else {
      error = ((await res.json()) as App.Error).message
    }
  }
</script>

<form
  on:submit|preventDefault={handleResetRequest}
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
      <span class="sr-only">Email</span>
      <input
        bind:value={email}
        type="email"
        autocomplete="email"
        class="rounded-md text-black w-full pl-2"
        placeholder="Email"
      />
    </label>
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md px-4 py-2 w-full"
  >
    Send Reset Link
  </button>
  <div class="flex w-full justify-between items-center text-base">
    <a
      href="/"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Home
    </a>
    <a
      href="/auth/login"
      class="text-blue-300 hover:text-blue-400 active:text-blue-500 underline"
    >
      Log In
    </a>
  </div>
</form>
