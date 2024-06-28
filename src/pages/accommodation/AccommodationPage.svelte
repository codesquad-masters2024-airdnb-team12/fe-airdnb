<script>
  import { accommodations } from "../../stores/accommodation.js";
  import NoAccommodation from "../../components/accommodation/NoAccommodation.svelte";
  import Header from "../../components/common/Header.svelte";
  import SearchBar from "../../components/common/SearchBar.svelte";
  import { onMount } from "svelte";
  import AccommodationPreview from "../../components/accommodation/AccommodationPreview.svelte";

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

  // const resultMap = document.querySelector('.result-map')
  //
  // const map = new kakao.maps.Map(resultMap, {
  //   center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //   level: 5
  // })

</script>

<img class="HeroImg w-full h-[700px] justify-center left-0 top-0 absolute filter grayscale" src="../../src/assets/hero_image.png" />


<Header/>
<SearchBar/>

<div class="AccommodationGround relative w-full h-full bg-white justify-center items-center left-0 top-[170px]">
  <div class="absolute bg-white w-[800px] left-0 top-0 ">
    {#if $accommodations.totalElements === 0}
      <NoAccommodation/>
    {:else}
      <div class="relative  left-[20px] top-5 text-zinc-800 text-xl font-bold font-['Noto Sans KR'] uppercase bg-white p-2">
        {$accommodations.totalElements}개의 숙소가 검색됨
      </div>

      <div class="relative ">
        {#each $accommodations.content as accommodation, index}
          <div class="relative left-[25px] h-[220px] w-[790px] mt-4">
            {#if index > 0}
              <hr class="my-6">
            {/if}

            <AccommodationPreview {accommodation} />
          </div>
        {/each}
      </div>

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
<!--  <div id="map" style="width:500px;height:400px;"></div>-->
</div>