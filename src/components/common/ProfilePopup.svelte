<script>
  import {get} from "svelte/store"
  import { loggedInMember, handleLogout } from "../../stores/stores";
  import AuthPopup from "./AuthPopup.svelte";

  export let isProfileMenuClick
  export let isLoggedIn = $loggedInMember
  export let isLoginClick

  const onLoginPopupClick = () => {
    isLoginClick = !isLoginClick;
  }

  const closeLoginPopup = () => {
    isLoginClick = false;
  }

  const onLogout = () => {
    isProfileMenuClick = !isProfileMenuClick;
    handleLogout()
  }

  const onWithdraw = () => {
    isProfileMenuClick = !isProfileMenuClick;
  }
</script>

{#if isLoggedIn}

  <div class="user-menu-popup-container">
    <div class="Modal w-[200px] h-[199px] left-0 top-0 absolute bg-white rounded-[10px] shadow"></div>
    <div class="TravelCencle w-[136px] left-[32px] top-[32px] absolute text-black text-base font-normal font-['Noto Sans KR']">
      <a href="/accommodations/cancel">예약 취소</a>
    </div>
    <div class="Logout w-[136px] left-[32px] top-[88px] absolute text-black text-base font-normal font-['Noto Sans KR']">
      <a href="/accommodations/like">위시리스트</a>
    </div>
    <div class="Line w-[136px] h-px left-[32px] top-[71px] absolute bg-stone-300"></div>
    <div class="Logout w-[136px] left-[32px] top-[144px] absolute text-black text-base font-normal font-['Noto Sans KR']">
      <a href="/logout">로그아웃</a>
    </div>
    <div class="Line w-[136px] h-px left-[32px] top-[127px] absolute bg-stone-300"></div>
  </div>

  {:else}

  <div class="user-menu-popup-container">
    <div class="Modal w-[200px] h-[60px] top-0 absolute bg-white rounded-[10px] shadow flex">
      <button on:click={onLoginPopupClick}>
        <a class="login-button relative flex left-[35px] justify-center text-black text-base font-normal font-['Noto Sans KR']">로그인</a>
      </button>
    </div>

    {#if isLoginClick}
      <div class="overlay fixed bg-black " on:click={closeLoginPopup}></div>
      <div>
        <AuthPopup closeLoginPopup={closeLoginPopup} />
      </div>
    {/if}
  </div>

{/if}

