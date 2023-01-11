<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";

import AddPlayer from "./components/AddPlayer.vue";
import Clues from "./components/Clues.vue";
import Feature from "./components/Feature.vue";

export interface Feature {
  label: string;
  prefix?: string;
}
export interface Clue {
  features: [Feature] | [Feature, Feature];
  status: boolean;
}
export interface ClueGroup {
  prefix: string;
  values: Clue[];
}
export interface PossibleClues {
  on_terrain: ClueGroup;
  near_terrain_or_animal: ClueGroup;
  near_animal_or_feature: ClueGroup;
  near_feature: ClueGroup;
}
export interface Player {
  name: string;
  clues: PossibleClues;
}

const savedData = localStorage.getItem("data");
const players = ref<Player[]>(savedData ? JSON.parse(savedData) : []);
watchEffect(() => localStorage.setItem("data", JSON.stringify(players.value)));

const activePlayer = ref<number>(0);
const clues = computed(() =>
  players.value.length > 0 ? players.value[activePlayer.value].clues : null
);
watchEffect(() => console.log(clues.value?.on_terrain.values[0].status));
</script>

<template>
  <div class="flex justify-between">
    <AddPlayer
      :players="players"
      @add-player="(player) => players.push(player)"
    />

    <button type="button" @click="players = []">Reset</button>
  </div>

  <div class="flex gap-x-2">
    <label v-for="(player, index) in players">
      {{ player.name }}
      <input
        type="radio"
        name="player"
        v-model="activePlayer"
        :value="index"
        class="underline"
      />
    </label>
  </div>

  <div class="w-full flex flex-col md:items-center">
    <Clues v-if="clues" :clues="clues" />
  </div>
</template>
