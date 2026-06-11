export function getNearbyPlaces(
  currentVillage,
  villages,
  limit = 6
) {
  return villages
    .filter(
      (v) =>
        v.slug !== currentVillage.slug &&
        v.latitude &&
        v.longitude
    )
    .map((v) => {
      const distance =
        Math.sqrt(
          Math.pow(
            currentVillage.latitude -
              v.latitude,
            2
          ) +
            Math.pow(
              currentVillage.longitude -
                v.longitude,
              2
            )
        );

      return {
        ...v,
        distance,
      };
    })
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, limit);
}