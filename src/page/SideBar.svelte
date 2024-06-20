<script>
    import { onMount } from 'svelte';

    export let visible = false;

    function toggleSidebar() {
        visible = !visible;
    }

    let showScrollButton = false;

    // Scroll to the top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Detect scroll position
    function handleScroll() {
        showScrollButton = window.scrollY > 300;
    }

    // Add scroll event listener on mount
    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<style>
    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        background-color: #f0f0f0;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 1000;
    }
    .sidebar.visible {
        transform: translateX(0);
    }
    .menu {
        padding: 20px;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .toggle-button {
        position: fixed;
        top: 20px; /* Adjust top position as needed */
        left: 20px; /* Adjust left position as needed */
        padding: 10px;
        background-color: #333;
        color: #fff;
        border: none;
        cursor: pointer;
        z-index: 1001;
        font-size: 24px;
        transition: left 0.3s ease-in-out;
    }
    .toggle-button.visible {
        left: 220px; /* Adjust the left distance when sidebar is visible */
    }
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        background-color: #333;
        color: #fff;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
    }
    .scroll-to-top.show {
        display: block;
    }
</style>

<div>
    <button class="toggle-button {visible ? 'visible' : ''}" on:click={toggleSidebar}>
        {#if visible}
            &times; <!-- X icon -->
        {:else}
            &#9776; <!-- Hamburger icon -->
        {/if}
    </button>
    <div class="sidebar {visible ? 'visible' : ''}">
        <div class="menu">
            <h2>Menu</h2>
            <ul>
                <li><a href="/">숙소 목록조회</a></li>
                <li><a href="/register">숙소 등록</a></li>
            </ul>
        </div>
    </div>
    <button class="scroll-to-top {showScrollButton ? 'show' : ''}" on:click={scrollToTop}>
        맨 위로
    </button>
</div>
