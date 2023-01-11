export const availableColors = {
  orange: "text-orange-500", // border-orange-500
  purple: "text-purple-700", // border-purple-700
  teal: "text-teal-500", // border-teal-500
  sky: "text-sky-200", // border-sky-200
  red: "text-red-500", // border-red-500
} as const;
export type PlayerColors =
  (typeof availableColors)[keyof typeof availableColors];
