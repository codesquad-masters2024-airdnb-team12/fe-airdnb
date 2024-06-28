<script>
  import { onMount, onDestroy } from 'svelte';

  export let card;
  export let onClose;

  let selectedCard

  const updateCardName = () => {
    card = selectedCard;
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.popup')) {
      updateCardName();
      onClose(card);
    }
  };

  const selectCard = (name) => {
    selectedCard = name;
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
</script>

<div class="fixed left-1/2 transform -translate-x-1/2 top-1/4 rounded-lg text-black">
  <div class="popup bg-white p-6 rounded-lg shadow-lg w-80 flex space-x-4">
    <div class="card flex-1 p-4 rounded-lg shadow-md cursor-pointer"
         class:selected={selectedCard === 'SYLVE'}
         on:click={() => selectCard('SYLVE')}>
      <div class="font-bold text-gray-800">SYLVE</div>
      <div class="text-gray-500 text-sm">실브 카드</div>
    </div>
    <div class="card flex-1 p-4 rounded-lg shadow-md cursor-pointer"
         class:selected={selectedCard === 'SHARPIE'}
         on:click={() => selectCard('SHARPIE')}>
      <div class="font-bold text-gray-800">SHARPIE</div>
      <div class="text-gray-500 text-sm">샤피 카드</div>
    </div>
  </div>
</div>

<style>
  .popup {
    z-index: 50; /* Ensure the popup is above other elements */
  }
  button {
    cursor: pointer;
  }
  .card {
    border: 2px solid transparent;
    transition: border-color 0.3s;
  }
  .card.selected {
    border-color: blue;
  }
</style>
