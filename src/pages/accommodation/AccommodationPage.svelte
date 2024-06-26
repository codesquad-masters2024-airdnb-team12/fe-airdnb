<script>
  import { accommodations } from "../../stores/accommodation.js";
  import NoAccommodation from "../../components/accommodation/NoAccommodation.svelte";
  import Header from "../../components/common/Header.svelte";
  import SearchBar from "../../components/common/SearchBar.svelte";
  import { onMount } from "svelte";
  import AccommodationList from "../../components/accommodation/AccommodationList.svelte";

  onMount(() => {
    try {
      accommodations.fetchAccommodations({page: 1});
    } catch (e) {
      alert(e);
      throw e;
    }
  });

  const onPrevious = async () => {
    try {
      await accommodations.fetchAccommodations({page: Number($accommodations.currentPage) - 1});
    } catch (e) {
      alert(e);
      throw e;
    }
  }

  const onNext = async () => {
    try {
      await accommodations.fetchAccommodations({page: Number($accommodations.currentPage) + 1});
    } catch (e) {
      alert(e);
      throw e;
    }
  }
</script>

<img class="HeroImg w-full h-[700px] justify-center left-0 top-0 absolute filter grayscale" src="../../src/assets/hero_image.png" />


<Header/>
<SearchBar/>

<div class="AccommodationGround relative w-full h-full bg-white justify-center items-center left-0 top-[170px]">
  <div class="absolute bg-white w-[800px] left-0 top-0 z-10">
    {#if $accommodations.totalElements === 0}
      <NoAccommodation/>
    {:else}
      <div class="Title absolute z-20 left-[20px] top-5 text-zinc-800 text-xl font-bold font-['Noto Sans KR'] uppercase">
        {$accommodations.totalElements}개의 숙소가 검색됨
      </div>

      <AccommodationList {$accommodations}/>

      <div class="PageBar relative justify-center bottom-1 flex my-10 space-x-4">
        <button class="text-s font-bold font-['Noto Sans KR'] border border-gray-300 rounded px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300" on:click={onPrevious} disabled={$accommodations.currentPage === 1}>
          이전
        </button>
        <span class="text-s font-normal font-['Noto Sans KR'] flex items-center justify-center">{$accommodations.currentPage}</span>
        <button class="text-s font-bold font-['Noto Sans KR'] border border-gray-300 rounded px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300" on:click={onNext} disabled={$accommodations.currentPage === $accommodations.totalPages || $accommodations.totalElements === 0}>
          다음
        </button>
      </div>

    {/if}


  </div>
</div>
