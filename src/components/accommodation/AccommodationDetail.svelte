<script>
  import {onMount} from "svelte";
  import {accommodations} from "../../stores/accommodation.js";
  import SearchBar from "../common/SearchBar.svelte";
  import Header from "../common/Header.svelte";
  import Loading from "../common/Loading.svelte";
  import {router} from "tinro";

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

  const onPhotoDetail = (accommodationId) => {
    router.goto(`/accommodations/${accommodationId}/photos`);
  };

  const onProfileImg = () => {
    return accommodation.hostImgUrl ? accommodation.hostImgUrl : "../../src/assets/profile_icon.svg";
  }
</script>


<img class="HeroImg w-full h-[700px] justify-center left-0 top-0 z-0 absolute filter grayscale"
     src="../../src/assets/hero_image.png"/>

<Header/>
<SearchBar/>

<div class="AccommodationGround fixed relative w-full bg-white justify-center left-0 top-[170px] flex flex-col ">
  {#if loading}
    <Loading/>
  {:else if accommodation}

    <div class="Title w-full bg-white px-[170px] py-5">
      <span class="text-4xl">{accommodation.name}</span>
    </div>

    <div class="Pictures w-full bg-white px-[180px] justify-center">
      <div class="main-photo grid grid-cols-2 gap-2 rounded-[20px] overflow-hidden h-[400px]">
        <!-- 메인 사진 -->
        <div class="photo-container hover:opacity-80 transition-opacity duration-300 cursor-pointer" on:click={() => onPhotoDetail(accommodation.id)}>
          <img src="../../src/assets/common.jpeg" alt="Main Photo" class="object-cover w-full h-full">
        </div>
        <div class="grid grid-cols-2 gap-2">
          <!-- 서브 사진들 -->
          <div class="photo-container hover:opacity-80 transition-opacity duration-300 cursor-pointer" on:click={() => onPhotoDetail(accommodation.id)}>
            <img src="../../src/assets/12345.jpeg" alt="Sub Photo 1" class="object-cover w-full h-full">
          </div>
          <div class="photo-container hover:opacity-80 transition-opacity duration-300 cursor-pointer" on:click={() => onPhotoDetail(accommodation.id)}>
            <img src="../../src/assets/accommodation_image_ex.png" alt="Sub Photo 2" class="object-cover w-full h-full">
          </div>
          <div class="photo-container hover:opacity-80 transition-opacity duration-300 cursor-pointer" on:click={() => onPhotoDetail(accommodation.id)}>
            <img src="../../src/assets/accommodation_image_ex2.png" alt="Sub Photo 3" class="object-cover w-full h-full">
          </div>
          <div class="photo-container hover:opacity-80 transition-opacity duration-300 cursor-pointer" on:click={() => onPhotoDetail(accommodation.id)}>
            <img src="../../src/assets/12345.jpeg" alt="Sub Photo 4" class="object-cover w-full h-full">
          </div>
        </div>
      </div>
    </div>

    <div class="ContentContainer relative flex w-full px-[190px] bg-white">
      <div class="Information flex flex-col w-[650px] bg-white py-5">
    <span class="text-lg text-zinc-600 font-normal font-['Noto Sans KR']">
      최대 인원 {accommodation.maxGuests}명 ∙ 침실 {accommodation.bedroom}개
      {#if accommodation.bath !== 0}
      <span> ∙ 욕실 {accommodation.bath}개</span>
      {/if}
    </span>
        <span class="text-lg flex text-zinc-600 font-normal font-['Noto Sans KR'] pb-3">
      <span class="Icon w-6 h-6"><img src="../../src/assets/point_icon.svg" /></span>
      <button class="underline" on:click={null}>후기 3개</button>
    </span>

        <hr>

        <div class="py-7 flex space-x-5">
          <div class="flex space-x-1">
            <span class="Icon w-5 h-5"><img src="../../src/assets/amenity_icon.svg" /></span>
            <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">사가정역 근처</span>
          </div>
          <div class="flex space-x-1">
            <span class="Icon w-5 h-5"><img src="../../src/assets/amenity_icon.svg" /></span>
            <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">셀프 체크인</span>
          </div>
          <div class="flex space-x-1">
            <span class="Icon w-5 h-5"><img src="../../src/assets/amenity_icon.svg" /></span>
            <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">세탁기 및 건조기</span>
          </div>
          <div class="flex space-x-1">
            <span class="Icon w-5 h-5"><img src="../../src/assets/amenity_icon.svg" /></span>
            <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">무선 인터넷</span>
          </div>
          <div class="flex space-x-1">
            <span class="Icon w-5 h-5"><img src="../../src/assets/amenity_icon.svg" /></span>
            <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">에어컨</span>
          </div>
        </div>

        <hr>

        <div class="flex items-center space-x-5 py-7">
          <div class="user-profile flex-col">
            <img src={onProfileImg()} class="user-profile-icon" />
          </div>
          <span class="text-basic flex flex-col text-zinc-600 font-bold font-['Noto Sans KR']">호스트: {accommodation.hostName}님</span>
        </div>

        <hr>

        <div class="flex items-center space-x-5 py-8">
          <span class="text-basic flex text-zinc-600 font-normal font-['Noto Sans KR']">{accommodation.description}</span>
        </div>
      </div>

      <div class="BookingGround flex flex-col w-[450px] bg-white ml-auto py-5">
        <div class="BookingPage bg-gray-100 flex flex-col py-5 rounded-[20px] shadow-xl relative">
          <div class="Charge flex absolute px-[30px]">
            <span class="flex text-zinc-800 text-xl font-bold font-['Noto Sans KR']">₩{formatAmountWithCommas(accommodation.costPerNight)}</span>
            <span class="flex text-zinc-800 text-xl font-basic font-['Noto Sans KR']">/박</span>
          </div>

          <div class="BookingInfoContainer relative left-1/2 transform -translate-x-1/2 mt-12 justify-center grid grid-rows-2 grid-cols-2 h-[130px] w-[400px] bg-white rounded-xl border">
            <!-- 첫 번째 칸 (체크인 라벨) -->
            <div class="flex flex-col ml-5 mt-3 border-r border-b">
              <div class="Label text-black text-xs font-bold font-['Noto Sans KR'] uppercase">체크인</div>
              <div class="text-neutral-600 text-sm font-normal font-['Noto Sans KR'] uppercase">2022.02.22</div>
            </div>
            <!-- 두 번째 칸 (체크아웃 라벨) -->
            <div class="flex flex-col ml-5 mt-3 border-b">
              <div class="Label text-black text-xs font-bold font-['Noto Sans KR'] uppercase">체크아웃</div>
              <div class="text-neutral-600 text-sm font-normal font-['Noto Sans KR'] uppercase">2022.02.22</div>
            </div>
            <!-- 세 번째 칸 (인원) -->
            <div class="flex flex-col ml-5 mt-3">
              <div class="Label text-black text-xs font-bold font-['Noto Sans KR'] uppercase">인원</div>
              <div class="text-neutral-600 text-sm font-normal font-['Noto Sans KR'] uppercase">게스트 4명</div>
            </div>
            <!-- 빈 칸 -->
            <div class="flex flex-col ml-5 mt-3"></div>
          </div>

          <button on:click={null} class="BookingButton cursor-pointer absolute bg-red-500 left-1/2 top-[210px] transform -translate-x-1/2 h-[50px] w-[400px] bg-white rounded-xl border">
            <div class="text-white text-s font-bold font-['Noto Sans KR'] uppercase">예약하기</div>
          </button>

          <div class="relative flex flex-col left-1/2 transform -translate-x-1/2 pt-20 pb-7 h-[50px] w-[400px] items-center justify-center">
            <span class="absolute text-neutral-900 text-sm font-['Noto Sans KR'] justify-center uppercase">예약 확정 전에는 요금이 청구되지 않습니다.</span>
          </div>

          <div class="PaymentDetails relative left-1/2 transform -translate-x-1/2 mt-1 justify-center w-[400px]  rounded-xl ">
            <div class="flex justify-between px-5 py-2">
              <span class="text-black text-s font-['Noto Sans KR'] underline">₩{formatAmountWithCommas(accommodation.costPerNight)} X 5박</span>
              <span class="text-black text-s font-normal font-['Noto Sans KR']">₩20,000</span>
            </div>
            <div class="flex justify-between px-5 py-2 border-t">
              <span class="text-black text-s font-['Noto Sans KR'] underline">총 할인금액</span>
              <span class="text-black text-s font-normal font-['Noto Sans KR']">₩2,000</span>
            </div>
            <div class="flex justify-between px-5 py-2 border-t">
              <span class="text-black text-s font-['Noto Sans KR'] underline">에어비앤비 서비스 수수료</span>
              <span class="text-black text-s font-normal font-['Noto Sans KR']">₩2,000</span>
            </div>

            <hr>

            <div class="flex justify-between px-5 py-3 border-t">
              <span class="text-black text-s font-bold font-['Noto Sans KR']">총 합계</span>
              <span class="text-black text-s font-bold font-['Noto Sans KR']">₩2,00,000</span>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="Title w-full bg-white px-[170px] py-5">
    <hr>
    </div>

    <div class="Title w-full bg-white px-[170px] py-5">
      <span class="text-2xl">숙소 위치</span>
    </div>

    <div class="Title w-full bg-white px-[170px] py-5">
      <hr>
    </div>

    <div class="Title w-full bg-white px-[170px] py-5">
      <span class="text-2xl">숙소 편의시설</span>
    </div>







<!--      <p><b>주소:</b> {accommodation.address.country}, {accommodation.address.zipcode}, {accommodation.address.address}, {accommodation.address.detailedAddress}</p>-->
<!--      <p><b>좌표:</b> ({accommodation.coordinate.longitude}, {accommodation.coordinate.latitude})</p>-->
<!--      <p><b>침실:</b> {accommodation.bedroom}개, <b>침대:</b> {accommodation.bed}개, <b>욕조:</b> {accommodation.bath}개</p>-->
<!--      <p><b>최대 인원:</b> {accommodation.maxGuests}인</p>-->
<!--      <p><b>금액:</b> {formatAmountWithCommas(accommodation.costPerNight)}\/박</p>-->

<!--      <hr>-->

<!--      <h3>호스트</h3>-->
<!--      &lt;!&ndash;        <img src="{accommodation.hostImgUrl}" alt="{accommodation.hostName}" width="600"/>&ndash;&gt;-->
<!--      <h4>{accommodation.hostName}</h4>-->

<!--      <hr>-->

<!--      <h3>설명</h3>-->
<!--      <p>{accommodation.description}</p>-->

<!--      <hr>-->

<!--      <h3>편의시설</h3>-->
<!--      {#each Object.entries(accommodation.facilities.facilityTypes) as [facilityCategory, facilities]}-->
<!--        <h4>{facilityCategory}</h4>-->
<!--        <ul>-->
<!--          {#each facilities as facility}-->
<!--            <li>{facility.name}</li>-->
<!--          {/each}-->
<!--        </ul>-->
<!--      {/each}-->

<!--      <hr>-->


  {:else}
    <p>숙소를 찾을 수 없습니다.</p>
  {/if}
</div>