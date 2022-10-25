import { useQuery } from "@tanstack/react-query";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { getProfileAlias, getTargetMoisture } from "../util/storage";
import { IOA_Reading } from "../util/types";
import Graph from "./Graph";

function capitalized(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface ProfileTabProps {
  profileId: string;
  data: Array<IOA_Reading>;
}

export default function ProfileTab(props: ProfileTabProps) {
  const alias = useQuery([props.profileId], () =>
    getProfileAlias(props.profileId)
  );
  const targetMoisture = useQuery([props.profileId], () =>
    getTargetMoisture(props.profileId)
  );
  const shownName = alias.data || props.profileId;

  const graphData = props.data.map((e) => ({
    value: e.moisture,
    dataPointText: `${Math.round(e.moisture * 10) / 10}%`,
  }));

  // const graphData = {
  //   labels: props.data.map((e) =>
  //     new Date(e.timestamp * 1000).toLocaleTimeString("en-US", {
  //       timeZone: "America/New_York",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  //   ),
  //   datasets: [
  //     {
  //       data: props.data.map((e) => e.moisture),
  //       strokeWidth: 5,
  //       color: (opacity = 1) => `rgba(0, 0, 244, ${opacity})`,
  //     },
  //   ],
  // };

  return (
    <View style={styles.tab}>
      <Text style={styles.profileName} numberOfLines={1}>
        {capitalized(shownName)}
      </Text>
      <View style={styles.container}>
        <View>
          <Graph size="mini" data={graphData} />
        </View>
        <View style={styles.textColumn}>
          <Text>{`Moisture: ${
            Math.round(props.data[props.data.length - 1].moisture * 10) / 10
          }%`}</Text>
          <Text>{`Target: ${
            Math.round((targetMoisture.data ?? 50) * 10) / 10
          }%`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    padding: 10,
    width: Dimensions.get("window").width - 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#4D38FA",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    overflow: "hidden",
  },
  textColumn: {
    // flex: 1,
  },
});
