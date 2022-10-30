import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { fetchIOAReadings } from "../util/query";
import { APIResponseToIOAReadings } from "../util/conversion";
import ProfileTab from "./ProfileTab";

import { useQuery } from "@tanstack/react-query";

interface ProfileListProps {
  navigation: any;
}

export default function ProfileList(props: ProfileListProps) {
  const { data } = useQuery(["readings"], () => fetchIOAReadings(5));
  const readings = APIResponseToIOAReadings(data);

  return (
    <SafeAreaView style={styles.container}>
      {readings.map((e) => (
        <ProfileTab
          profileId={e[0]}
          key={e[0]}
          data={e[1]}
          navigation={props.navigation}
        />
      ))}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDFDFF",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 100,
  },
});
