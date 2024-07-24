import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import getListings from "../api/listings";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

//MainScreen component
function MainScreen() {
  //State Variables
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [data, setData] = useState<any>();
  const [dates, setDates] = useState<string[]>([]);
  const [mode, setMode] = useState<number[]>([]);

  //Function to call api after the company is selected
  const handleSelectCompany = async (value: string) => {
    const response = await getListings.getListings(value);
    setData(response.data);
    setSelectedValue(value);
    const dates1: string[] = [];

    //Extract 5 objects from the array.
    const entries = Object.entries(response.data["Weekly Adjusted Time Series"]).slice(
      0,
      5
    );

    //if the mode is undefined then make it the mode open
    if(selectedType === undefined)
    {
    const chartMode: number[] = entries.map((entry) =>
      parseFloat(entry[1]["1. open"])
    );

    setMode(chartMode);
  }
  else if (value === "close") {
    const chartMode: number[] = entries.map((entry) =>
      parseFloat(entry[1]["4. close"])
    );

    setMode(chartMode);
  }
  else if (value === "high") {
    const chartMode: number[] = entries.map((entry) =>
      parseFloat(entry[1]["2. high"])
    );

    setMode(chartMode);
  }
  else if (value === "low") {
    const chartMode: number[] = entries.map((entry) =>
      parseFloat(entry[1]["3. low"])
    );

    setMode(chartMode);
  }

    //extracting only the dates
    for (const [date] of entries) {
      dates1.push(date);
    }

    setDates(dates1);
  };


  const handleSelectOptionType = async (value: string) => {
    setSelectedType(value)
    const entries = Object.entries(data["Weekly Adjusted Time Series"]).slice(
      0,
      5
    );

    if (value === "open") {
      const chartMode: number[] = entries.map((entry) =>
        parseFloat(entry[1]["1. open"])
      );

      setMode(chartMode);
    }
    else if (value === "close") {
        const chartMode: number[] = entries.map((entry) =>
          parseFloat(entry[1]["4. close"])
        );

        setMode(chartMode);
      }
      else if (value === "high") {
        const chartMode: number[] = entries.map((entry) =>
          parseFloat(entry[1]["2. high"])
        );

        setMode(chartMode);
      }
      else if (value === "low") {
        const chartMode: number[] = entries.map((entry) =>
          parseFloat(entry[1]["3. low"])
        );

        setMode(chartMode);
      }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text style={{marginBottom:8}}>Please select a company</Text>
        <RNPickerSelect
          onValueChange={handleSelectCompany}
          items={[
            { label: "IBM", value: "ibm" },
            { label: "MSFT", value: "msft" },
          ]}
          style={pickerSelectStyles}
        />
         {selectedValue && <Text style={{marginVertical:8}}>Please select a mode.</Text>}
        {selectedValue && (
          <RNPickerSelect
          value={selectedType}

            onValueChange={handleSelectOptionType}
            items={[
              { label: "OPEN", value: "open" },
              { label: "CLOSE", value: "close" },
              { label: "HIGH", value: "high" },
              { label: "LOW", value: "low" },
            ]}
            style={pickerSelectStyles}
          />
        )}
      </View>

      {selectedType && (
        <LineChart
          data={{
            labels: dates,
            datasets: [
              {
                data: mode,
              },
            ],
          }}
          width={Dimensions.get("window").width -20}
          height={220}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
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
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default MainScreen;
