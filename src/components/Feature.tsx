import { For, Show } from "solid-js";

import type { Component } from "solid-js";

import type { Feature } from "../App";

const FeatureComponent: Component<{ features: Feature[] }> = (props) => {
  const selectIcon = (label: string): { icon: string; color: string }[] => {
    switch (label) {
      case "forest":
        return [{ icon: "circle-fill", color: "text-green-700" }];
      case "desert":
        return [{ icon: "circle-fill", color: "text-yellow-500" }];
      case "water":
        return [{ icon: "circle-fill", color: "text-blue-400" }];
      case "swamp":
        return [{ icon: "circle-fill", color: "text-purple-700" }];
      case "mountain":
        return [{ icon: "circle-fill", color: "text-gray-400" }];
      case "either animal territory":
        return [
          { icon: "hexagon", color: "text-red-500" },
          { icon: "hexagon", color: "text-gray-700" },
        ];
      case "standing stone":
        return [{ icon: "hexagon-fill", color: "text-gray-900" }];
      case "abandoned shack":
        return [{ icon: "triangle-fill", color: "text-gray-900" }];
      case "cougar territory":
        return [{ icon: "hexagon", color: "text-red-500" }];
      case "bear territory":
        return [{ icon: "hexagon", color: "text-gray-900" }];
      case "blue structure":
        return [
          { icon: "hexagon-fill", color: "text-blue-700" },
          { icon: "triangle-fill", color: "text-blue-700" },
        ];
      case "white structure":
        return [
          { icon: "hexagon-fill", color: "text-gray-300" },
          { icon: "triangle-fill", color: "text-gray-300" },
        ];
      case "green structure":
        return [
          { icon: "hexagon-fill", color: "text-green-700" },
          { icon: "triangle-fill", color: "text-green-700" },
        ];
      case "black structure":
        return [
          { icon: "hexagon-fill", color: "text-gray-700" },
          { icon: "triangle-fill", color: "text-gray-700" },
        ];

      default:
        throw new Error("A feature style wasn't specified");
    }
  };

  return (
    <>
      &ensp;
      <For each={props.features}>
        {(feature, featureIndex) => (
          <>
            <For each={selectIcon(feature.label)}>
              {(icon) => <i class={`bi-${icon.icon} ${icon.color}`} />}
            </For>
            {featureIndex() + 1 < props.features.length ? <>&hairsp;</> : ""}
          </>
        )}
      </For>
      &thinsp;
      <For each={props.features}>
        {(feature, featureIndex) => (
          <>
            <Show when={feature.prefix}>{feature.prefix}&nbsp;</Show>
            {feature.label}
            {featureIndex() + 1 < props.features.length ? " or " : ""}
          </>
        )}
      </For>
    </>
  );
};
export default FeatureComponent;
