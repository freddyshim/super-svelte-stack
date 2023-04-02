<script lang="ts">
  import { format } from 'date-fns'
  import Icon from '$lib/components/Icon.svelte'
  export let title: string
  export let content: string
  export let modified: Date
  let editable = false
</script>

<div
  class="relative flex flex-col bg-gray-300 px-4 py-6 w-full max-w-[900px] rounded-md"
>
  {#if editable}
    <h2
      class="text-3xl text-black font-bold mb-4 bg-gray-400 border-2 border-black rounded-md"
      contenteditable="true"
      bind:textContent={title}
    />
  {:else}
    <h2 class="text-3xl text-black font-bold mb-4">
      {title}
    </h2>
  {/if}
  {#if editable}
    <h3
      class="text-2xl text-black mb-2 bg-gray-400 border-2 border-black rounded-md"
      contenteditable="true"
      bind:textContent={content}
    />
  {:else}
    <h3 class="text-2xl text-black mb-2">{content}</h3>
  {/if}
  <div class="flex justify-between align-center">
    <h4 class="text-xl text-gray-800 italic align-middle">
      {format(modified, 'PP, p')}
    </h4>
    {#if editable}
      <div class="flex space-x-4 text-black">
        <Icon type="cancel" onClick={() => (editable = false)} />
        <Icon type="confirm" onClick={() => (editable = false)} />
      </div>
    {:else}
      <div class="flex space-x-4 text-black">
        <Icon type="edit" onClick={() => (editable = true)} />
        <Icon type="delete" onClick={() => console.log(title)} />
      </div>
    {/if}
  </div>
</div>
