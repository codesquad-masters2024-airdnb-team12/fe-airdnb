<script>
    import {accommodations} from "../stores/accommodation.js";
    import AccommodationPreview from "../components/AccommodationPreview.svelte";
    import NoAccommodation from "../components/NoAccommodation.svelte";
    import SideBar from "./SideBar.svelte";
    import {onMount} from "svelte";

    onMount(() => {
        try {
            accommodations.fetchAccommodations()
        } catch (e) {
            alert(e)
            throw e
        }
    });

    const onBefore = async () => {
        try {
            await accommodations.fetchAccommodations()
        } catch (e) {
            alert(e)
            throw e
        }
    }

    const onNext = async () => {
        try {
            await accommodations.fetchAccommodations()
        } catch (e) {
            alert(e)
            throw e
        }
    }
</script>

<div>
    <button on:click={onBefore}>이전 페이지</button>
    <button on:click={onNext}>다음 페이지</button>
</div>

<SideBar/>
<div>
    <p>{$accommodations.numberOfElements}개의 숙소</p>

    {#each $accommodations.content as accommodation}
        <AccommodationPreview {accommodation}/>
    {/each}

    {#if $accommodations.numberOfElements === 0}
        <NoAccommodation/>
    {/if}
</div>