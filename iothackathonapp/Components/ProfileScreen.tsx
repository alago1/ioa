import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { fetchIOAReadings } from "../util/query";
import { APIResponseToIOAReadings } from "../util/conversion";
import {
  getProfileAlias,
  getTargetMoisture,
  updateProfileAlias,
  updateTargetMoisture,
} from "../util/storage";
import Graph from "./Graph";
import { queryClient } from "../util/query";
import { useRef, useState, useEffect } from "react";

// @ts-ignore
import edit_button from "../assets/edit-button.png";

interface ProfileScreenProps {
  navigation: any;
  route: any;
}

export default function ProfileScreen(props: ProfileScreenProps) {
  const profileId = props.route?.params?.profileId as string;

  const { data } = useQuery(["inDepthReadings"], () => fetchIOAReadings(10));
  const readings = new Map(APIResponseToIOAReadings(data)).get(profileId);

  const storedAlias = useQuery([profileId, "alias"], () =>
    getProfileAlias(profileId)
  );
  const storedTargetMoisture = useQuery([profileId, "targetMoisture"], () =>
    getTargetMoisture(profileId)
  );

  const [profileAlias, setProfileAlias] = useState(
    storedAlias.data ?? profileId
  );
  const [targetMoisture, setTargetMoisture] = useState(
    storedTargetMoisture.data?.toString() ?? "50.0"
  );

  const profileInputRef = useRef<any>();
  const moistureInputRef = useRef<any>();

  const graphData = readings?.map((e: any, index) => {
    const out: any = {
      value: e.moisture,
      dataPointText: `${Math.round(e.moisture * 10) / 10}%`,
    };

    if (index % 2 == 1) {
      out.labelComponent = () => {
        const str = new Date(e.timestamp * 1000).toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <Text style={{ width: 40 }}>{str.substring(0, str.length - 3)}</Text>
        );
      };
    }

    return out;
  });

  useEffect(() => {
    props.navigation.addListener("beforeRemove", async (e: any) => {
      if (profileAlias !== storedAlias.data && profileAlias !== "") {
        await updateProfileAlias(profileId, profileAlias);
        queryClient.invalidateQueries([profileId, "alias"]);
      }

      const target = parseFloat(targetMoisture);
      if (!isNaN(target) && target !== storedTargetMoisture.data) {
        await updateTargetMoisture(profileId, target);
        queryClient.invalidateQueries([profileId, "targetMoisture"]);
      }
    });
  }, [
    props.navigation,
    profileAlias,
    storedAlias.data,
    targetMoisture,
    storedTargetMoisture.data,
  ]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.inputsContainer}>
        <View
          style={styles.profileNameInputContainer}
          onTouchEnd={() => profileInputRef.current?.focus()}
        >
          <TextInput
            style={styles.profileNameInput}
            value={profileAlias}
            onChangeText={setProfileAlias}
            ref={profileInputRef}
            placeholder="Name"
            placeholderTextColor="#00ffff"
          />
          <Image
            source={edit_button}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </View>
        <View
          style={styles.moistureInputContainer}
          onTouchEnd={() => moistureInputRef.current?.focus()}
        >
          <Text>Target Moisture: </Text>
          <TextInput
            keyboardType="numeric"
            value={targetMoisture}
            onChangeText={setTargetMoisture}
            ref={moistureInputRef}
            placeholder="50.0"
            style={{ fontSize: 15 }}
          />
          <Image
            source={edit_button}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </View>
      </View>
      <View>
        <Text></Text>
      </View>
      <View style={styles.graphContainer}>
        <Graph size="large" data={graphData} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EDFDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  graphContainer: {
    width: Dimensions.get("window").width,
    flex: 2,
    paddingTop: 40,
  },
  container: {
    display: "flex",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: -20,
    flexDirection: "column",
  },
  profileNameInput: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileNameInputContainer: {
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  moistureInputContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  moistureInput: {
    fontSize: 20,
  },
});
