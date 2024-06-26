<script>
  import {auth} from "../../stores/auth";

  const handleOAuthLogin = (provider) => {
    let loginUrl = '';
    switch (provider) {
      case 'github':
        loginUrl = 'https://github.com/login/oauth/authorize?client_id=Ov23licEiwb7WgUnlhjc';
        break;
      case 'naver':
        loginUrl = 'https://nid.naver.com/oauth2.0/authorize?...';
        break;
      case 'kakao':
        loginUrl = 'https://kauth.kakao.com/oauth/authorize?...';
        break;
      case 'google':
        loginUrl = 'https://accounts.google.com/o/oauth2/auth?...';
        break;
      default:
        break;
    }
    window.location.href = loginUrl;
  };

  const handleClose = () => {
    $$props.closeLoginPopup();
  };
</script>

<div class="auth-popup-container">
  <div class="auth-popup">
    <button class="close-button" on:click={handleClose}>✕</button>
<!--    <h5 class="title">로그인 또는 회원가입</h5>-->
    <button class="oauth-button github" on:click={() => handleOAuthLogin('github')}>
      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub logo" class="oauth-logo" />
      GitHub로 로그인하기
    </button>
    <button class="oauth-button naver" on:click={() => handleOAuthLogin('naver')}>
      <img src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjNfMTYw/MDAxNjE2NTExMTg4ODQ3.pA7ZYc05NGQM3F4zTsp2s9pdk-dOQsDB4bQ5TcHNW04g.I-14B0JAR5QZK3jc_pdr0dSysQyqVVt7c_NjZZK-Miog.JPEG.silver_bean_/%E3%85%87%E3%85%87%E3%85%87-100.jpg?type=w800" alt="Naver logo" class="oauth-logo" />
      Naver로 로그인하기
    </button>
    <button class="oauth-button kakao" on:click={() => handleOAuthLogin('kakao')}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/2048px-KakaoTalk_logo.svg.png" alt="Kakao logo" class="oauth-logo" />
      Kakao로 로그인하기
    </button>
    <button class="oauth-button google" on:click={() => handleOAuthLogin('google')}>
      <img src="https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo.png" alt="Google logo" class="oauth-logo" />
      Google로 로그인하기
    </button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

  .auth-popup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 100;
  }

  .auth-popup {
    background: rgba(30, 30, 30, 0.94);
    padding: 40px;
    border-radius: 12px;
    width: 550px;
    max-width: 100%;
    position: relative;
    text-align: center;
    font-family: 'Noto Sans KR';
  }

  .close-button {
    position: absolute;
    top: 8px;
    right: 12px;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
  }

  .title {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #b5d8ec;
    /*font-weight: bold;*/
  }

  .oauth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .oauth-button:hover {
    transform: translateY(-2px);
  }

  .oauth-logo {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  .github {
    background-color: #333;
  }

  .naver {
    background-color: #03C75A;
  }

  .kakao {
    background-color: #FFEB00;
    color: #3c1e1e;
  }

  .google {
    background-color: rgba(255, 255, 255, 0.94);
    color: rgba(7, 7, 7, 0.87);
  }

</style>
