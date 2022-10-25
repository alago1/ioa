import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfileAlias = async (
  profileId: string
): Promise<string | null> => {
  try {
    const entry = await AsyncStorage.getItem(profileId);

    if (entry == null) return null;

    return JSON.parse(entry).alias;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTargetMoisture = async (
  profileId: string
): Promise<number | null> => {
  try {
    const entry = await AsyncStorage.getItem(profileId);
    if (entry == null) return 50;

    return JSON.parse(entry).targetMoisture;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProfileAlias = async (profileId: string, alias: string) => {
  const newEntry = {
    alias: alias,
    targetMoisture: 50,
  };
  const current = await AsyncStorage.getItem(profileId);
  if (current != null) {
    newEntry.targetMoisture = JSON.parse(current).targetMoisture;
  }
  await AsyncStorage.setItem(profileId, JSON.stringify(newEntry));
};

export const updateTargetMoisture = async (
  profileId: string,
  targetMoisture: number
) => {
  const newEntry = {
    alias: profileId,
    targetMoisture: targetMoisture,
  };

  const current = await AsyncStorage.getItem(profileId);
  if (current != null) {
    newEntry.alias = JSON.parse(current).alias;
  }
  await AsyncStorage.setItem(profileId, JSON.stringify(newEntry));
};
