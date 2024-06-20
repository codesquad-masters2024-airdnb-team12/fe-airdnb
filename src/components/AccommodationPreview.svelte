<script>
    import { router } from "tinro";

    export let accommodation;

    const formatAmountWithCommas = (amount) => {
        return amount.toLocaleString('ko-KR');
    };

    const onDetail = (accommodationId) => {
        router.goto(`/accommodations/${accommodationId}`);
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
    <button on:click={() => onDetail(accommodation.id)}>더보기</button>
    <hr/>
</div>