import "bootstrap-icons/font/bootstrap-icons.css";
import { Show } from "solid-js";

import type { Component } from "solid-js";

import { availableColors } from "../lib/stuff";

const ColorIcon: Component<{ color: string; checked: boolean }> = (props) => {
  const colorNames = Object.fromEntries(
    Object.entries(availableColors).map((arr) => arr.reverse())
  );

  return (
    <span
      class={`inline-block text-4xl ${props.color}`}
      title={colorNames[props.color]}
      aria-hidden
    >
      <Show when={props.checked} fallback={<i class="bi-circle-fill" />}>
        <i class="bi-check-circle-fill" />
      </Show>
    </span>
  );
};
export default ColorIcon;
