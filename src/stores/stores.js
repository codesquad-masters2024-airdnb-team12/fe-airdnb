// src/stores.js
import { writable } from 'svelte/store';
import {getApi, postApi} from "../service/api";
import { jwtDecode } from 'jwt-decode';
import { urlPrefix } from "../utils/constants";

export const loggedInMember = writable(null);

// 토큰 저장 함수 (Local Storage에 저장)
export function storeTokens(accessToken, refreshToken) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

// accessToken 해석하여 사용자 정보 얻기
export function decodeAccessToken(token) {
  try {
    const decoded = jwtDecode(token);
    loggedInMember.set({
      ...decoded,
      imgUrl: decoded.imgUrl // 프로필 사진 URL 필드 (JWT에서 제공 시)
    });
  } catch (error) {
    console.error('Invalid token', error);
  }
}

// 로그인 함수
export async function handleLogin(loginUrl) {
  try {
    const options = {
      path: loginUrl
    };
    const authResponse = await getApi(options);
    if (authResponse) {
      const data = await authResponse.json();
      const { accessToken, refreshToken } = data;

      // 토큰 저장
      storeTokens(accessToken, refreshToken);

      // accessToken 해석하여 사용자 정보 얻기
      decodeAccessToken(accessToken);
    } else {
      console.error('Failed to login', authResponse.statusText);
    }
  } catch (error) {
    console.error('Error during login', error);
  }
}

// 로그아웃 함수 (Local Storage에서 토큰 제거)
export function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  loggedInMember.set(null);
}

// 페이지 로드 시 토큰 확인 및 사용자 정보 설정
export function initializeUser() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    decodeAccessToken(accessToken);
  }
}
