<script>
    import {accommodations} from "../stores/accommodation.js";
    import AccommodationPreview from "../components/AccommodationPreview.svelte";
    import NoAccommodation from "../components/NoAccommodation.svelte";
    import SideBar from "./SideBar.svelte";
    import {onMount} from "svelte";

    let mapContainer;
    let map;

    onMount(() => {
        const mapOptions = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // Set initial center to Seoul
            level: 3 // Set zoom level
        };
        map = new kakao.maps.Map(mapContainer, mapOptions);

        try {
            accommodations.fetchAccommodations({page: 1}).then(() => {
                addMarkers();
            });
        } catch (e) {
            alert(e);
            throw e;
        }
    });

    const addMarkers = () => {
        $accommodations.content.forEach(accommodation => {
            const {latitude, longitude} = accommodation.coordinate;
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);
        });
    };

    const onPrevious = async () => {
        try {
            await accommodations.fetchAccommodations({page: Number($accommodations.currentPage) - 1});
            addMarkers(); // Update markers after fetching new data
        } catch (e) {
            alert(e);
            throw e;
        }
    }

    const onNext = async () => {
        try {
            await accommodations.fetchAccommodations({page: Number($accommodations.currentPage) + 1});
            addMarkers(); // Update markers after fetching new data
        } catch (e) {
            alert(e);
            throw e;
        }
    }
</script>

<div bind:this={mapContainer} id="map" style="width:100%;height:300px;margin-bottom:30px"></div>

<div>
    <button on:click={onPrevious} disabled={$accommodations.currentPage === 1}>이전 페이지</button>
    <span style="margin: 0 10px;">{$accommodations.currentPage}</span>
    <button on:click={onNext}
            disabled={$accommodations.currentPage === $accommodations.totalPages || $accommodations.totalElements === 0}>
        다음 페이지
    </button>
</div>

<SideBar/>

<div>
    <p>{$accommodations.totalElements}개의 숙소</p>

    <div class="accommodation-list">
        {#each $accommodations.content as accommodation}
            <AccommodationPreview {accommodation} {map}/>
        {/each}

        {#if $accommodations.totalElements === 0}
            <NoAccommodation/>
        {/if}
    </div>
</div>

<style>
    .accommodation-list {
        max-height: calc(100vh - 400px); /* Adjust based on your layout */
        overflow-y: auto;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    .accommodation-list::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
</style>
