<script setup lang="ts">
defineProps({
  size: {
    type: String,
    required: true,
  },
  stroke: {
    type: String,
    default: 'black',
  },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :stroke="stroke"
    :fill="stroke"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 837 400C 837 531 731 638 600 638C 548 638 500 621 461 592C 461 592 252 802 252 802C 252 802 198 748 198 748C 198 748 408 539 408 539C 379 500 362 452 362 400C 362 269 469 163 600 163C 731 163 837 269 837 400C 837 400 837 400 837 400M 437 400C 437 490 510 563 600 563C 690 563 763 490 763 400C 763 310 690 238 600 238C 510 238 437 310 437 400C 437 400 437 400 437 400"
    />
  </svg>
</template>
