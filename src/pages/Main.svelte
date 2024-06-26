<script>
  import { auth } from "../stores/auth.js";
  import Header from '../components/common/Header.svelte';
  import SearchBar from "../components/common/SearchBar.svelte";

  export let member;

  member = {...auth}

</script>


<img class="HeroImg w-full h-[700px] justify-center left-0 top-0 absolute filter grayscale" src="../../src/assets/hero_image.png" />
 <SearchBar/>
 <Header/>


