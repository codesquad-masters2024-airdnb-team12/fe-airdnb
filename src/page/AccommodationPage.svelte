<script>
    import {accommodations} from "../stores/accommodation.js";
    import AccommodationPreview from "../components/AccommodationPreview.svelte";
    import NoAccommodation from "../components/NoAccommodation.svelte";
    import SideBar from "./SideBar.svelte";
    import {onMount} from "svelte";

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

<div>
    <button on:click={onPrevious} disabled={$accommodations.currentPage === 1}>이전 페이지</button>
    <span style="margin: 0 10px;">{$accommodations.currentPage}</span>
    <button on:click={onNext} disabled={$accommodations.currentPage === $accommodations.totalPages || $accommodations.totalElements === 0}>다음 페이지</button>
</div>

<SideBar/>
<div>
    <p>{$accommodations.totalElements}개의 숙소</p>

    {#each $accommodations.content as accommodation}
        <AccommodationPreview {accommodation}/>
    {/each}

    {#if $accommodations.totalElements === 0}
        <NoAccommodation/>
    {/if}
</div>
