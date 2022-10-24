import {Text, View, Stylesheet} from "react-native";

function capitalized(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ProfileTab({profileName}) {
    // const 

    return (
        <View style={styles.container}>
            <Text>{capitalized(profileName)}</Text>
        </View>
    )
}

const styles = Stylesheet.create({
    container: {

    }
})