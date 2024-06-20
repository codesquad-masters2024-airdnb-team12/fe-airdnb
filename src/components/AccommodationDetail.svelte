<script>
    import {onMount} from "svelte";
    import {accommodations} from "../stores/accommodation.js";
    import SideBar from "../page/SideBar.svelte";

    export let accommodationId;

    let accommodation = null;
    let loading = true;

    onMount(async () => {
        try {
            accommodation = await accommodations.fetchAccommodationDetail(accommodationId);
        } catch (e) {
            throw e;
        } finally {
            loading = false;
        }
    });

    const formatAmountWithCommas = (amount) => {
        return amount.toLocaleString('ko-KR');
    };
</script>

<SideBar/>
{#if loading}
    <p>Loading...</p>
{:else if accommodation}
    <div>
        <h2>{accommodation.name}</h2>

        <hr>

        <p><b>주소:</b> {accommodation.address.country}, {accommodation.address.zipcode}, {accommodation.address.address}, {accommodation.address.detailedAddress}</p>
        <p><b>좌표:</b> ({accommodation.coordinate.longitude}, {accommodation.coordinate.latitude})</p>
        <p><b>침실:</b> {accommodation.bedroom}개, <b>침대:</b> {accommodation.bed}개, <b>욕조:</b> {accommodation.bath}개</p>
        <p><b>최대 인원:</b> {accommodation.maxGuests}인</p>
        <p><b>금액:</b> {formatAmountWithCommas(accommodation.costPerNight)}\/박</p>

        <hr>

        <h3>호스트</h3>
<!--        <img src="{accommodation.hostImgUrl}" alt="{accommodation.hostName}" width="600"/>-->
        <h4>{accommodation.hostName}</h4>

        <hr>

        <h3>설명</h3>
        <p>{accommodation.description}</p>

        <hr>

        <h3>편의시설</h3>
        {#each Object.entries(accommodation.facilities.facilityTypes) as [facilityCategory, facilities]}
            <h4>{facilityCategory}</h4>
            <ul>
                {#each facilities as facility}
                    <li>{facility.name}</li>
                {/each}
            </ul>
        {/each}

        <hr>
    </div>
{:else}
    <p>숙소를 찾을 수 없습니다.</p>
{/if}

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>