import exifr from "exifr";

export async function getImageMetadata(file: File) {
  const imageMetadata = await exifr.parse(file, true).then((metadata) => {
    return {
      ...metadata,
      Orientation: metadata?.Orientation,
      Latitude: metadata?.latitude,
      Longitude: metadata?.longitude,
    };
  });
  return imageMetadata;
}

