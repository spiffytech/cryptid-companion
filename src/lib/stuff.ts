export const availableColors = {
  orange: "text-orange-500", // border-orange-500 bg-orange-500 bg-orange-50
  purple: "text-purple-700", // border-purple-700 bg-purple-700 bg-purple-50
  teal: "text-teal-500", // border-teal-500 bg-teal-500 bg-teal-50
  sky: "text-sky-200", // border-sky-200 bg-sky-200 bg-sky-50
  red: "text-red-500", // border-red-500 bg-red-500 bg-red-50
} as const;
export type PlayerColors = typeof availableColors[keyof typeof availableColors];
