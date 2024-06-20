<script>
    import {onMount} from "svelte";
    import {accommodations} from "../stores/accommodation.js";

    export let accommodationId;

    let accommodation;

    onMount(async () => {
        try {
            accommodation = await accommodations.fetchAccommodationDetail(accommodationId);
        } catch (e) {
            alert(e);
            throw e;
        }
    });

    const formatAmountWithCommas = (amount) => {
        return amount.toLocaleString('ko-KR');
    };
</script>

<div>
    <hr/>
    <h3>{accommodation.name}</h3>
    <p><b>주소:</b> {accommodation.address.country}, {accommodation.address.zipcode}, {accommodation.address.address}, {accommodation.address.detailedAddress}</p>
    <p><b>좌표:</b> ({accommodation.coordinate.longitude}, {accommodation.coordinate.latitude})</p>
    <p><b>침실:</b> {accommodation.bedroom}개, <b>침대:</b> {accommodation.bed}개, <b>욕조:</b> {accommodation.bath}개</p>
    <p><b>최대 인원:</b> {accommodation.maxGuests}인</p>
    <p><b>금액:</b> {formatAmountWithCommas(accommodation.costPerNight)}\/박</p>
    <hr/>
</div>