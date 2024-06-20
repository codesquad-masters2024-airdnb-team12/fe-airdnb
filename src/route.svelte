<script>
    import { Route } from 'tinro';
    import AccommodationPage from "./page/AccommodationPage.svelte";
    import AccommodationDetail from "./components/AccommodationDetail.svelte";
</script>

<Route path="/" redirect="/accommodations"/>
<Route path="/accommodations"><AccommodationPage/></Route>
<Route path="/accommodations/:accommodationId" let:params>
    {#if /^\d+$/.test(params.accommodationId)}
        <AccommodationDetail {accommodationId}/>
    {/if}
</Route>