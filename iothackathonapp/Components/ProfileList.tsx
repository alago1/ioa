import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { READINGS_API_URL } from "../util/constants";
import { APIResponseToIOAReadings } from "../util/conversion";
import ProfileTab from "./ProfileTab";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIOAReadings = async () =>
  fetch(`${READINGS_API_URL}?number_entries=5`).then((response) =>
    response.json()
  );

export default function ProfileList() {
  const { data } = useQuery(["readings"], fetchIOAReadings);
  const readings = APIResponseToIOAReadings(data);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <View>
        {/* {JSON.stringify(readings)} */}
        {readings.map((e) => (
          <Text>{JSON.stringify(e[1])}</Text>
        ))}
        {/* ?.map((e) => (
          <Text>{JSON.stringify(e[1])}</Text>
        ))} */}
      </View>
      {/* <ProfileTab profileName="Plant1" /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
