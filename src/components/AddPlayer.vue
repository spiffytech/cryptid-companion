<script setup lang="ts">
import { ref } from "vue";

import type { Player, PossibleClues } from "../App.vue";

const emit = defineEmits<{ (e: "add-player", player: Player): void }>();

const availablePlayers = {
  orange: "text-orange-500",
  purple: "text-purple-700",
  teal: "text-teal-500",
  sky: "text-sky-200",
  red: "text-red-500",
} as const;
type PlayerColors = (typeof availablePlayers)[keyof typeof availablePlayers];

const addPlayer = (color: PlayerColors) => {
  const clues: PossibleClues = {
    on_terrain: {
      prefix: "On",
      values: [
        { features: [{ label: "forest" }, { label: "desert" }], status: false },
        { features: [{ label: "forest" }, { label: "water" }], status: false },
        { features: [{ label: "forest" }, { label: "swamp" }], status: false },
        {
          features: [{ label: "forest" }, { label: "mountain" }],
          status: false,
        },
        { features: [{ label: "desert" }, { label: "water" }], status: false },
        { features: [{ label: "desert" }, { label: "swamp" }], status: false },
        {
          features: [{ label: "desert" }, { label: "mountain" }],
          status: false,
        },
        { features: [{ label: "water" }, { label: "swamp" }], status: false },
        {
          features: [{ label: "water" }, { label: "mountain" }],
          status: false,
        },
        {
          features: [{ label: "swamp" }, { label: "mountain" }],
          status: false,
        },
      ],
    },
    near_terrain_or_animal: {
      prefix: "Within one space of",
      values: [
        { features: [{ label: "forest" }], status: false },
        { features: [{ label: "desert" }], status: false },
        { features: [{ label: "swamp" }], status: false },
        { features: [{ label: "mountain" }], status: false },
        { features: [{ label: "water" }], status: false },
        { features: [{ label: "either animal territory" }], status: false },
      ],
    },
    near_animal_or_feature: {
      prefix: "Within two spaces of",
      values: [
        { features: [{ prefix: "a", label: "standing stone" }], status: false },
        {
          features: [{ prefix: "an", label: "abandoned shack" }],
          status: false,
        },
        { features: [{ label: "cougar territory" }], status: false },
        { features: [{ label: "bear territory" }], status: false },
      ],
    },
    near_feature: {
      prefix: "On",
      values: [
        { features: [{ prefix: "a", label: "blue structure" }], status: false },
        {
          features: [{ prefix: "a", label: "white structure" }],
          status: false,
        },
        {
          features: [{ prefix: "a", label: "green structure" }],
          status: false,
        },
        {
          features: [{ prefix: "a", label: "black structure" }],
          status: false,
        },
      ],
    },
  };

  emit("add-player", { color, clues });
};

const addPlayers = () => {
  players.value.forEach((color) => addPlayer(color));
};

const players = ref<PlayerColors[]>([]);
</script>

<template>
  <label v-for="(color, name) in availablePlayers" :key="name">
    <span
      class="w-8 h-8 inline-block text-4xl"
      :class="color"
      :alt="name"
      aria-hidden
    >
      <i v-if="players.includes(color)" class="bi-check-circle-fill" />
      <i v-else class="bi-circle-fill" />
    </span>
    <input
      type="checkbox"
      :value="color"
      v-model="players"
      name="players"
      class="hidden"
    />
  </label>

  <button type="submit" @click.prevent="addPlayers">Select players</button>
</template>
