import { Text, View, StyleSheet } from "react-native";

function capitalized(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface ProfielTabProps {
  profileName: string;
}

export default function ProfileTab(props: ProfielTabProps) {
  // const

  return (
    <View style={styles.container}>
      <Text>{capitalized(props.profileName)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
