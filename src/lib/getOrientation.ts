export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export function getOrientation(orientationMetadata?: string) {
  if (orientationMetadata?.includes("90")) {
    return Orientation.VERTICAL;
  } else {
    return Orientation.HORIZONTAL;
  }
}