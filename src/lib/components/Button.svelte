<script lang="ts">
  export let classes: string | undefined
</script>

<button
  class={`cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md px-4 py-2 ${classes}`}
>
  <slot />
</button>
