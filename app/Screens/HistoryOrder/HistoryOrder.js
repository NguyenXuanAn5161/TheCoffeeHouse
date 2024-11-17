import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StepIndicator from "react-native-step-indicator";
import Pendding from "@screens/HistoryOrder/Pendding";
import Processing from "@screens/HistoryOrder/Processing";
import Shipped from "@screens/HistoryOrder/Shipped";
import Delivered from "@screens/HistoryOrder/Delivered";
import Canceled from "@screens/HistoryOrder/Canceled";
import { View } from "react-native";

const labels = ["Pendding", "Processing", "Shipped", "Delivered", "Canceled"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

const Stack = createStackNavigator();

export default function HistoryOrderTab() {
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Step Process">
        {() => (
          <View style={{ flex: 1 }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={labels.length}
              onPress={(position) => setCurrentPosition(position)}
            />
            <CurrentStepScreen currentPosition={currentPosition} />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Pendding" component={Pendding} />
      <Stack.Screen name="Processing" component={Processing} />
      <Stack.Screen name="Shipped" component={Shipped} />
      <Stack.Screen name="Delivered" component={Delivered} />
      <Stack.Screen name="Canceled" component={Canceled} />
    </Stack.Navigator>
  );
}

// Component để điều hướng giữa các bước
const CurrentStepScreen = ({ currentPosition }) => {
  const screens = [
    <Pendding />,
    <Processing />,
    <Shipped />,
    <Delivered />,
    <Canceled />,
  ];

  return screens[currentPosition];
};
