<script>
  import { auth } from "../../stores/auth.js";
  import ProfilePopup from "./ProfilePopup.svelte";

  export let member;

  let isProfileMenuClick = false;
  let isLoggedIn = false;

  member = {...auth}
  isLoggedIn = member.isLoggedIn;

  const onProfileImg = () => {
    return member.profileImgUrl ? member.profileImgUrl : "../../src/assets/profile_icon.svg";
  }

  const onProfileMenuClick = () => {
    isProfileMenuClick = !isProfileMenuClick;
  }

  const closePopup = () => {
    isProfileMenuClick = false;
  }
</script>



<header class="w-[1440px] h-[94px] absolute left-0 top-0 items-center">
  <div class="GnbField w-full h-full absolute left-0 top-0"></div>
  <div id="logo relative">
    <a class="absolute top-10 left-[90px] text-zinc-800 text-[32px] font-black" href="/">airdnb</a>
  </div>
  <div class="left-[630px] top-[30px] absolute justify-center gap-10 inline-flex">
    <a class="menu-item" href="/accommodations">숙소</a>
    <a class="menu-item" href="/experiences">체험</a>
    <a class="menu-item" href="/online-experiences">온라인 체험</a>
  </div>
  <div class="user-menu-container">
    <button on:click={onProfileMenuClick} class="user-menu-icon">
      <img src="../../src/assets/menu_icon.svg" alt="User Menu Icon" />
    </button>
    <div class="user-profile">
      <img src={onProfileImg()} alt="User Profile Icon" class="user-profile-icon"/>
    </div>

    {#if isProfileMenuClick}
      <div class="overlay" on:click={closePopup}></div>
      <ProfilePopup bind:isProfileMenuClick={isProfileMenuClick} bind:isLoggedIn={isLoggedIn}/>
    {/if}
  </div>


</header>