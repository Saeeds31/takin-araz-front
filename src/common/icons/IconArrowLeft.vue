<template>
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 4.5L16.5 4.5"
      :stroke="color"
      stroke-opacity="0.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.91415 2.89745L2.88058 2.13612C4.44638 0.90264 5.22928 0.285898 5.86464 0.567214C6.5 0.84853 6.5 1.81191 6.5 3.73868L6.5 5.26132C6.5 7.18809 6.5 8.15147 5.86464 8.43279C5.22928 8.7141 4.44638 8.09736 2.88059 6.86388L1.91415 6.10255C0.971384 5.35987 0.5 4.98853 0.5 4.5C0.5 4.01147 0.971384 3.64013 1.91415 2.89745Z"
      :stroke="color"
      stroke-opacity="0.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>
