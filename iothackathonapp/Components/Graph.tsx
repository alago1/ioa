import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface graphProps {
  data: any;
  size: "mini" | "large";
}

export default function Graph(props: graphProps) {
  if (props.size == "mini") {
    const mini_data = props.data.map((e: any) => ({
      value: e.value,
      dataPointText: e.dataPointText,
    }));

    return (
      <LineChart
        data={mini_data}
        maxValue={100}
        initialSpacing={0}
        height={80}
        // spacing={10}
        width={Dimensions.get("window").width / 1.5}
        adjustToWidth
        textColor="black"
        startFillColor="#87CEFA"
        endFillColor="#B0C4DE"
        textFontSize={10}
        areaChart
        hideRules
        xAxisThickness={0}
        noOfSections={5}
        textShiftY={-5}
        textShiftX={2.5}
      />
    );
  }

  return (
    <LineChart
      data={props.data}
      maxValue={100}
      initialSpacing={0}
      height={200}
      // spacing={10}
      width={Dimensions.get("window").width - 30}
      adjustToWidth
      textColor="black"
      startFillColor="#87CEFA"
      endFillColor="#B0C4DE"
      textFontSize={10}
      areaChart
      // hideRules
      // xAxisThickness={0}
      noOfSections={10}
      textShiftY={-5}
      textShiftX={2.5}
    />
  );
}
