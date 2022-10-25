import { View, Text } from "react-native";
import { IOA_Reading } from "../util/types";

interface ProfileScreenProps {
  navigation: any;
  route: any;
}

export default function ProfileScreen(props: ProfileScreenProps) {
  return (
    <View>
      <Text>{`Hello ${JSON.stringify(props.route.params.readings)}`}</Text>
    </View>
  );
}
