<script setup lang="ts">
import { ref } from "vue";

import ColorIcon from "./ColorIcon.vue";
import { availableColors } from "@/lib/stuff";

import type { Player, PossibleClues } from "../App.vue";
import type { PlayerColors } from "@/lib/stuff";

const emit = defineEmits<{ (e: "add-player", player: Player): void }>();

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
  selectedColors.value.forEach((color) => addPlayer(color));
};

const selectedColors = ref<PlayerColors[]>([]);
</script>

<template>
  <label v-for="(color, name) in availableColors" :key="name">
    <ColorIcon :color="color" :checked="selectedColors.includes(color)" />
    <input
      type="checkbox"
      :value="color"
      v-model="selectedColors"
      name="players"
      class="hidden"
    />
  </label>

  <button type="submit" @click.prevent="addPlayers">Select players</button>
</template>
