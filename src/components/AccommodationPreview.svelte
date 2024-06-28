<script>
    import { router } from "tinro";

    export let accommodation;
    export let map;

    const formatAmountWithCommas = (amount) => {
        return amount.toLocaleString('ko-KR');
    };

    const onDetail = (accommodationId) => {
        router.goto(`/accommodations/${accommodationId}`);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구 반지름 (단위: km)
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // 거리 (단위: km)
        return distance;
    };

    const moveToAccommodationLocation = () => {
        if (map) {
            const { latitude: lat1, longitude: lon1 } = map.getCenter();
            const { latitude: lat2, longitude: lon2 } = accommodation.coordinate;

            const distance = calculateDistance(lat1, lon1, lat2, lon2);
            const duration = Math.min(distance * 5, 3000); // Adjust speed: 5ms per km, max 3 seconds

            const accommodationLatLng = new kakao.maps.LatLng(lat2, lon2);
            map.panTo(accommodationLatLng, duration);
            map.setLevel(1);
        }
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
    <button on:click={moveToAccommodationLocation}>🗺️</button>
    <button on:click={() => onDetail(accommodation.id)}>더보기</button>
    <hr/>
</div>