import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface graphProps {
  data: any;
  size: "mini" | "large";
}

const chartConfigMini = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const chartConfigLarge = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default function Graph(props: graphProps) {
  if (props.size == "mini") {
    return (
      <LineChart
        data={props.data}
        maxValue={100}
        initialSpacing={0}
        // width={Dimensions.get("window").width / 4}
        height={80}
        // spacing={10}
        adjustToWidth
        // height={200}
        areaChart
        hideRules
        xAxisThickness={0}
        noOfSections={5}
        textShiftY={-5}
        textShiftX={3}
        // chartConfig={chartConfigMini}
        // fromZero={true}
        // withVerticalLabels={false}
        // withHorizontalLabels={false}
      />
    );
  }

  return (
    <LineChart
      data={props.data}
      //   width={Dimensions.get("window").width}
      //   height={500}
      //   chartConfig={chartConfigLarge}
      //   fromZero={true}
      // withVerticalLabels={false}
    />
  );
}
