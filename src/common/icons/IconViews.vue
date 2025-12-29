<template>
  <svg width="20" height="19" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 11V1C16 0.45 15.55 0 15 0H1C0.45 0 0 0.45 0 1V11C0 11.55 0.45 12 1 12H15C15.55 12 16 11.55 16 11ZM8 3C10.3 3 12.4 4.14 14 6C12.4 7.86 10.3 9 8 9C5.7 9 3.6 7.86 2 6C3.6 4.14 5.7 3 8 3ZM10 6C10 4.9 9.1 4 8 4C6.9 4 6 4.9 6 6C6 7.1 6.9 8 8 8C9.1 8 10 7.1 10 6ZM12 14H15V15H1V14H4V13H12V14Z"
      :fill="color"
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
