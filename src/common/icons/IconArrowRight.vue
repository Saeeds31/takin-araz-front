<template>
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 4.5L0.500001 4.5"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.0859 6.10255L14.1194 6.86388C12.5536 8.09736 11.7707 8.7141 11.1354 8.43279C10.5 8.15147 10.5 7.18809 10.5 5.26132L10.5 3.73868C10.5 1.81191 10.5 0.84853 11.1354 0.567215C11.7707 0.285898 12.5536 0.902639 14.1194 2.13612L15.0858 2.89745C16.0286 3.64013 16.5 4.01147 16.5 4.5C16.5 4.98853 16.0286 5.35987 15.0859 6.10255Z"
      :stroke="color"
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
