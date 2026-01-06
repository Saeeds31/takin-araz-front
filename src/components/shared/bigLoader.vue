<template>
    <div class="fixed bg-gray-200 z-30 top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
        <span class="loader">
        </span>
    </div>
</template>
<script setup></script>
<style>
/* HTML: <div class="loader"></div> */
.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #514b82;
    -webkit-mask: radial-gradient(circle closest-side at 50% 40%, #0000 94%, #000);
    transform-origin: 50% 40%;
    animation: l25 1s infinite linear;
}

@keyframes l25 {
    100% {
        transform: rotate(1turn)
    }
}
</style>