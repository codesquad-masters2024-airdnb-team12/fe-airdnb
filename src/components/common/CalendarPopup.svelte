
<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { createEventDispatcher } from 'svelte';

  export let checkIn;
  export let checkOut;
  export let dowLabels;
  export let monthLabels;
  export let onCalendarPopup;

  const dispatch = createEventDispatcher();

  const handleDateSelected = (e) => {
    const { startDate, endDate } = e.detail;
    checkIn = startDate;
    checkOut = endDate;
    dispatch('dateSelected', { startDate, endDate });
  };

  // const toggleCalendarPopup = () => {
  //   dispatch('toggle');
  // };
</script>

<div class="flex absolute left-[430px] top-[160px]">
{#if onCalendarPopup}
  <DatePicker
      theme="custom-datepicker"
      isOpen={true}
      bind:startDate={checkIn}
      bind:endDate={checkOut}
      {dowLabels}
      {monthLabels}
      isRange
      isMultipane
      enableFutureDates
      enablePastDates={false}
      showYearControls={false}
      on:dateSelected={handleDateSelected}
  />
{/if}
</div>