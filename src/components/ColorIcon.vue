<script setup lang="ts">
import { availableColors } from "../lib/stuff";

defineProps<{ color: string; checked: boolean }>();

const colorNames = Object.fromEntries(
  Object.entries(availableColors).map((arr) => arr.reverse())
);
</script>

<template>
  <span
    class="inline-block text-4xl"
    :class="color"
    :alt="colorNames[color]"
    aria-hidden
  >
    <i v-if="checked" class="bi-check-circle-fill" />
    <i v-else class="bi-circle-fill" />
  </span>
</template>
