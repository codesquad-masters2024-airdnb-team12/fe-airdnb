<script>
  import Map from './Map.svelte';
</script>

<svelte:head>
  <title>Map</title>
  <meta name="description" content="Svelte demo app" />
  <!-- 지도 스크립트 import하는 부분은 app.html에 넣어도 됩니다. -->
  <script src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=821b6b4629dd1d7aa560e4342570cb6e"></script>
</svelte:head>

<section>
  <Map/>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>