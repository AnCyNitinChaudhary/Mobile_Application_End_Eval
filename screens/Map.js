import React,{useContext, useEffect,useState} from "react";
import MapView, { Heatmap } from "react-native-maps";
import { View, StyleSheet,Text } from "react-native";
import Context from "../ContextAPI";
const HeatmapExample = () => {
  const context=useContext(Context);
  const initialRegion = {
    latitude: 20.5937, 
    longitude: 78.9629, 
    latitudeDelta: 20, 
    longitudeDelta: 20,
  };
const [heatmapData, setheatmapData] = useState([]);
useEffect(() => {
  async function dataset(){
    // const response=await context.getPoints();
    // console.log("printing response",response);
    // setheatmapData(response);
    const response = await context.getPoints();
console.log("printing response", response);

// Filter out objects with empty latitude or longitude
const filteredResponse = response.filter(
  (point) => point.latitude && point.longitude
);

console.log("filtered response", filteredResponse);

// Set the heatmap data with the cleaned response
setheatmapData(filteredResponse);
  }
  dataset();
}, [])
console.log(heatmapData);

  return (
    <View style={styles.container}>
      {heatmapData.length===0 ? <Text>No certain Emergency right now!</Text>:<MapView style={styles.map} 
      initialRegion={initialRegion}
      >
        <Heatmap
          points={heatmapData}
          radius={40}
          opacity={1}
          gradient={{
            colors: ["green", "yellow", "red"],
            startPoints: [0.01, 0.3, 1],
          }}
        />
      </MapView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HeatmapExample;
