<script>
    import { Route } from 'tinro';
    import AccommodationPage from "./page/AccommodationPage.svelte";
    import AccommodationDetail from "./components/AccommodationDetail.svelte";
    import NotFound from "./page/NotFound.svelte";

    // 여기에 정의된 경로 외에는 모두 NotFound 페이지로 연결됩니다.
    const validPaths = ['/accommodations', '/', '/register'];

    // 현재 경로가 유효한지 확인하는 함수
    function isValidPath(path) {
        return validPaths.includes(path);
    }
</script>

<Route path="/" redirect="/accommodations"/>
<Route path="/accommodations"><AccommodationPage/></Route>
<Route path="/accommodations/:accommodationId" let:params>
    {#if /^\d+$/.test(params.accommodationId)}
        <AccommodationDetail accommodationId={params.accommodationId}/>
    {:else}
        <NotFound />
    {/if}
</Route>

{#if !isValidPath(window.location.pathname)}
    <NotFound />
{/if}