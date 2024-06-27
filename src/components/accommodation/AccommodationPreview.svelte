<script>
  import { router } from "tinro";

  export let accommodation;

  const formatAmountWithCommas = (amount) => {
    return amount.toLocaleString('ko-KR');
  };

  const onDetail = (accommodationId) => {
    router.goto(`/accommodations/${accommodationId}`);
  };

  function handleWishlistClick() {
    // Toggle class to change the color of the wishlist icon
    const wishListIcon = document.querySelector('.wishListIcon img');
    wishListIcon.classList.toggle('pink'); // Assuming 'pink' class defines pink color
  }
</script>


<div class="Accommodations justify-start gap-6">
  <button on:click={handleWishlistClick}>
    <img class = "WishListIcon w-6 h-6 right-9 top-1 absolute" src="../../src/assets/heart_icon.svg"/>
  </button>
  <button on:click={() => onDetail(accommodation.id)}>
    <img class="Thumbnail absolute w-[360px] left-0 top-0 absolute rounded-[10px]" src="../../src/assets/accommodation_image_ex.png" />
  </button>

  <div class="Info absolute w-[400px] h-full left-[380px] top-[4px] absolute flex-col justify-start items-start gap-2 inline-flex">
    <button class="Title w-[350px] text-xl flex font-bold font-['Noto Sans KR']" on:click={() => onDetail(accommodation.id)}>{accommodation.name}</button>
    <p class="Address w-full text-sm flex font-normal font-['Noto Sans KR']">{accommodation.address.country}, {accommodation.address.zipcode}, {accommodation.address.address}, {accommodation.address.detailedAddress}</p>
    <div class="Option w-full text-zinc-500 text-sm font-normal font-['Noto Sans KR']">최대 인원 {accommodation.maxGuests}명 ∙ 침실 {accommodation.bedroom}개 ∙ 침대 {accommodation.bed}개 ∙ 욕실 {accommodation.bath}개<br/>
    </div>

    <div class="Charge w-full right-9 bottom-7 absolute text-right"><span class="text-zinc-800 text-s font-bold font-['Noto Sans KR']">₩{formatAmountWithCommas(accommodation.costPerNight)}/박</span></div>

    <div class="Point left-1 bottom-8 absolute flex items-center space-x-1">
      <span class="Icon w-6 h-6"><img src="../../src/assets/point_icon.svg"/></span>

      <span class="Text text-zinc-800 text-s font-normal font-['Noto Sans KR'] ml-16">4.80</span>
      <span class="Rivew w-full left-0 text-zinc-500 text-s font-normal font-['Noto Sans KR']">(후기 127개)</span>
    </div>

  </div>

</div>