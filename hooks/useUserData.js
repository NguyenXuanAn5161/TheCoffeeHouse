import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserData = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return user;
};

export default useUserData;
