import { AreaDimension } from "./createCanvas";

// Here we want the height and the width from the image resize (the size of the image display on the screen not the real dimension)
export function getVerticalDimension(
  regionArea: AreaDimension,
  imageWidth: number,
  imageHeight: number,
) {
  const dimension = {
    x: (1 - regionArea.x) * (imageWidth - regionArea.w * imageWidth),
    y: regionArea.y * (imageHeight - regionArea.h * imageHeight),
    w: regionArea.w * imageWidth,
    h: regionArea.h * imageHeight,
  };

  return dimension;
}

export function getHorizontalDimension(
  regionArea: AreaDimension,
  imageWidth: number,
  imageHeight: number,
) {
  const dimension = {
    x: regionArea.x * imageWidth,
    y: regionArea.y * (imageHeight - regionArea.w * imageHeight),
    w: regionArea.w * imageWidth,
    h: regionArea.h * imageHeight,
  };

  return dimension;
}

