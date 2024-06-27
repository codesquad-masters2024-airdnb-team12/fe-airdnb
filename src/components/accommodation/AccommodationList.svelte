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


