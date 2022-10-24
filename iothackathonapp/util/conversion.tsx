import { IOA_Reading, ProfileReadingsMap } from "./types";

export const APIResponseToIOAReadings = (
  data: any
): Array<[string, IOA_Reading[]]> => {
  console.log("Data being converted:");
  console.log(data);
  if (!Array.isArray(data)) return [];

  const profileToReadings: ProfileReadingsMap = new Map();
  data.forEach((e) => {
    const reading: IOA_Reading = {
      timestamp: 0,
      moisture: 0.0,
      profile: "profile",
    };

    if (
      !Object.hasOwn(e, "timestamp") ||
      typeof e.timestamp != "number" ||
      e.timestamp < 0
    )
      return;

    reading.timestamp = e.timestamp;

    if (!Object.hasOwn(e, "moisture")) return;

    if (typeof e.moisture === "string") {
      try {
        e.moisture = parseFloat(e.moisture);
      } catch (error) {
        return;
      }
    } else if (typeof e.moisture !== "number") return;

    if (e.moisutre < 0 || e.moisture > 100) return;

    if (!Object.hasOwn(e, "profile") || e.profile == null) return;

    if (!profileToReadings.has(e.profile))
      profileToReadings.set(e.profile, new Array());

    profileToReadings.get(e.profile)?.push({
      timestamp: e.timestamp,
      moisture: e.moisture,
      profile: e.profile,
    });
  });

  return Array.from(profileToReadings);
};
