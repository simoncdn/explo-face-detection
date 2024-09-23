import { AreaDimension } from "./createCanvas";

export function getPointerVerticalDimension(
  regionArea: AreaDimension,
  imageWidth: number,
  imageHeight: number,
) {
  const dimension = {
    x: (1 - regionArea.y) * imageWidth,
    y: regionArea.x * imageHeight,
    w: 10,
    h: 10,
  };
  return dimension;
}

export function getPointerHorizontalDimension(
  regionArea: AreaDimension,
  imageWidth: number,
  imageHeight: number,
) {
  const dimension = {
    x: (1 - regionArea.x) * imageWidth,
    y: (1 - regionArea.y) * imageHeight,
    w: 10,
    h: 10,
  };
  return dimension;
}
