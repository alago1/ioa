import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { READINGS_API_URL } from "../util/constants";
import { APIResponseToIOAReadings } from "../util/conversion";
import ProfileTab from "./ProfileTab";

import { useQuery } from "@tanstack/react-query";

const fetchIOAReadings = async () =>
  fetch(`${READINGS_API_URL}?number_entries=5`).then((response) =>
    response.json()
  );

export default function ProfileList() {
  const { data } = useQuery(["readings"], fetchIOAReadings);
  const readings = APIResponseToIOAReadings(data);

  return (
    <View style={styles.container}>
      {readings.map((e) => (
        <ProfileTab profileId={e[0]} key={e[0]} data={e[1]} />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171DE8",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 100,
  },
});
