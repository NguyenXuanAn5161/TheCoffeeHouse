import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StepIndicator from "react-native-step-indicator";
import Pendding from "@/app/screens/HistoryOrder/Pending";
import Processing from "@/app/screens/HistoryOrder/Processing";
import Shipped from "@/app/screens/HistoryOrder/Shipped";
import Delivered from "@/app/screens/HistoryOrder/Delivered";
import Canceled from "@/app/screens/HistoryOrder/Canceled";
import { View } from "react-native";
import { orderStatusData } from "@/service/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserData from "@/hooks/useUserData";

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

export default function HistoryOrderTab({ route }) {
  const [currentPosition, setCurrentPosition] = useState(0);
  console.log("route: ", route.params.status);

  useEffect(() => {
    // Kiểm tra trạng thái và thiết lập vị trí tương ứng
    if (route.params.status === "PENDING") {
      setCurrentPosition(0);
    } else if (route.params.status === "PROCESSING") {
      setCurrentPosition(1);
    } else if (route.params.status === "SHIPPED") {
      setCurrentPosition(2);
    } else if (route.params.status === "DELIVERED") {
      setCurrentPosition(3);
    } else if (route.params.status === "CANCELED") {
      setCurrentPosition(4);
    }
  }, [route.params.status]);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Step Process">
        {() => (
          <View style={{ flex: 1, marginTop: 10 }}>
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const user = useUserData();

  useEffect(() => {
    if (user?.id) {
      getOrderData();
    }
  }, [user]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const res = await orderStatusData(user.id);
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.log("error file historyOrderTab: ", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingData = data.filter((order) => order.status === "PENDING");
  const processingData = data.filter((order) => order.status === "PROCESSING");
  const shippedData = data.filter((order) => order.status === "SHIPPED");
  const deliveredData = data.filter((order) => order.status === "DELIVERED");
  const canceledData = data.filter((order) => order.status === "CANCELED");

  const screens = [
    <Pendding data={pendingData} getOrderData={getOrderData} />,
    <Processing data={processingData} />,
    <Shipped data={shippedData} />,
    <Delivered data={deliveredData} />,
    <Canceled data={canceledData} />,
  ];

  return (
    <View style={{ padding: 10, flex: 1 }}>{screens[currentPosition]}</View>
  );
};
