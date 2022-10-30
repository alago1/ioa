import { useQuery } from "@tanstack/react-query";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { getProfileAlias, getTargetMoisture } from "../util/storage";
import { IOA_Reading } from "../util/types";
import { Chip } from "@react-native-material/core";
import Graph from "./Graph";

function capitalized(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface ProfileTabProps {
  profileId: string;
  data: Array<IOA_Reading>;
  navigation: any;
}

export default function ProfileTab(props: ProfileTabProps) {
  const alias = useQuery([props.profileId, "alias"], () =>
    getProfileAlias(props.profileId)
  );
  const targetMoisture = useQuery([props.profileId, "targetMoisture"], () =>
    getTargetMoisture(props.profileId)
  );

  const shownName = alias.data || props.profileId;

  const graphData = props.data.map((e) => ({
    value: e.moisture,
    dataPointText: `${Math.round(e.moisture * 10) / 10}%`,
    label: new Date(e.timestamp * 1000).toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <View
      style={styles.tab}
      onTouchEnd={() =>
        props.navigation.navigate("Detailed Report", {
          profileId: props.profileId,
        })
      }
    >
      <Text style={styles.profileName} numberOfLines={1}>
        {capitalized(shownName)}
      </Text>
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Graph size="mini" data={graphData} />
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: "flex-start",
            flexDirection: "column",
          }}
        >
          <View style={styles.text_region}>
            <Text style={styles.text_region_text}>Current</Text>
            <Chip
              style={styles.chip_obj}
              variant="outlined"
              label={`${
                Math.round(props.data[props.data.length - 1].moisture * 10) / 10
              }%`}
            />
            <Text style={styles.text_region_text}>Target</Text>
            <Chip
              style={styles.chip_obj}
              variant="outlined"
              label={`${Math.round((targetMoisture.data ?? 50) * 10) / 10}%`}
            />
          </View>
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
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "#B0C4DE",
    alignContent: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: -20,
    flexDirection: "row",
  },
  text_region: {
    alignItems: "center",
    flex: 0,
  },
  text_region_text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    overflow: "hidden",
  },
  chip_obj: {
    borderRadius: 25,
    backgroundColor: "#90EE90",
  },
});
