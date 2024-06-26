<script>

  import {onMount} from "svelte";
  import AccommodationPreview from "./AccommodationPreview.svelte";

  export let accommodations
  let accommodationsData

  onMount(() => {
    try {
      accommodationsData = accommodations.content;
    } catch (e) {
      alert(e);
      throw e;
    }
  });

</script>



{#each accommodationsData as accommodation}

  <div class="WarpScroll relative z-20 left-[25px] h-[220px] w-[790px]">
    <AccommodationPreview {accommodation} />
  </div>

{/each}