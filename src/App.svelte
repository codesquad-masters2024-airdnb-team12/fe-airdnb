<script>
  import Router from './route.svelte'
  import { loggedInMember, initializeUser } from "./stores/stores";
  import { onMount } from "svelte";

  // const refresh_time = 1000 * 60 * 30;

  onMount(() => {
    initializeUser();
  });

</script>


<div id="main-container w-full h-full">
  <Router {loggedInMember}/>
</div>