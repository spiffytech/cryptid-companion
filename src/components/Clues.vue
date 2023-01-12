<script setup lang="ts">
import { computed } from "vue";

import Feature from "./Feature.vue";

import type { Clue, PossibleClues } from "../App.vue";

const props = defineProps<{
  clues: PossibleClues;
}>();

const groups = computed(() => [
  {
    header: "On one of two types of terrain",
    ...props.clues.on_terrain,
  },
  {
    header: "Within one space of a terrain type or animal territory",
    ...props.clues.near_terrain_or_animal,
  },
  {
    header:
      "Within two spaces of a type of animal territory or a type of structure",
    ...props.clues.near_animal_or_feature,
  },
  {
    header: "Within three spaces of a colour of structure",
    ...props.clues.near_feature,
  },
]);

const toggleClue = (clue: Clue) => {
  clue.status = !clue.status;
};

const subgroups = (group: (typeof groups.value)[number]) => [
  group.values.slice(0, group.values.length / 2),
  group.values.slice(group.values.length / 2),
];
</script>

<template>
  <div
    v-for="group in groups"
    class="md:w-4/5 lg:w-3/5 flex flex-col md:items-center px-4"
  >
    <h2 class="font-bold border-b-2 w-full md:text-center">
      {{ group.header }}
    </h2>
    <div class="flex flex-wrap w-full justify-between mb-8">
      <ul v-for="subgroup in subgroups(group)">
        <li v-for="value in subgroup" class="flex">
          <input
            type="checkbox"
            :checked="value.status"
            @change="() => toggleClue(value)"
            class="mr-2"
          />
          <!-- CSS text-decoration strikethrough breaks up anytime it encounters
          margin or padding. So we have to hack around it with a positioned
          border instead :( -->
          <span
            class="flex"
            :class="{
              'strikethrough text-gray-400 grayscale-[80%]': value.status,
            }"
          >
            <span>{{ group.prefix ?? "" }}</span>
            <Feature :features="value.features" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
