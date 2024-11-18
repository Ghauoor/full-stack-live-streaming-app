import { commonStyles } from "@/styles/commonStyles";
import { splashStyles } from "@/styles/splashStyles";
import { StyleSheet, Image, View, Alert } from "react-native";
import { useFonts } from "expo-font";
import { tokenStorage } from "@/service/storage";
import { resetAndNavigate } from "@/utils/Helpers";
import { jwtDecode } from "jwt-decode";
import { refresh_tokens } from "@/service/api/apiInterceptors";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { Colors } from "@/utils/Constants";

interface DecodedToken {
  exp: number;
}

const Page = () => {
  const [loaded] = useFonts({
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Light: require("../assets/fonts/Poppins-Light.ttf"),
    SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000; //epoch time in seconds

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("/auth");
        Alert.alert("Session Expired", "Please login again");
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
        } catch (error) {
          console.log(error);
          Alert.alert("There is an Error");
          return false;
        }
      }

      resetAndNavigate("/home");
      return true;
    }

    resetAndNavigate("/auth");
    return false;
  };

  useEffect(() => {
    if (loaded) {
      SystemUI.setBackgroundColorAsync(Colors.primary);
      tokenCheck();
      const timeoutId = setTimeout(tokenCheck, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [loaded]);

  return (
    <View style={commonStyles.container}>
      <Image
        style={splashStyles.img}
        source={require("@/assets/images/logo_t.png")}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
