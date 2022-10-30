import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchIOAReadings } from "../util/query";
import { APIResponseToIOAReadings } from "../util/conversion";
import ProfileTab from "./ProfileTab";
import { useQuery } from "@tanstack/react-query";

// @ts-ignore
import ioa_logo from "../assets/ioa-logo.png";

interface ProfileListProps {
  navigation: any;
}

export default function ProfileList(props: ProfileListProps) {
  const { data } = useQuery(["readings"], () => fetchIOAReadings(5));
  const readings = APIResponseToIOAReadings(data);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={ioa_logo}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 10 }}>
          Your IOA Devices
        </Text>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}

          {readings.map((e) => (
            <View style={styles.tabView}>
              <ProfileTab
                profileId={e[0]}
                key={e[0]}
                data={e[1]}
                navigation={props.navigation}
              />
            </View>
          ))}
          <StatusBar style="auto" />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDFDFF",
    paddingTop: 50,
  },
  scrollview: {
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabView: {
    marginBottom: 10,
  },
});
