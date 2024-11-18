import AnimatedButton from "@/components/auth/AnimatedButton";
import AnimatedImage from "@/components/auth/AnimatedImage";
import AnimatedOverlay from "@/components/auth/AnimatedOverlay";
import { handleTouch, startMainAnimation } from "@/components/auth/animations";
import { useWS } from "@/service/sockets/WSProvider";
import { commonStyles } from "@/styles/commonStyles";

import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const Page = () => {
  const [isButtonVisiable, setIsButtonVisiable] = useState(false);
  const { updateAccessToken } = useWS();
  useEffect(() => {
    setTimeout(() => {
      startMainAnimation(setIsButtonVisiable);
    }, 1000);
  });
  return (
    <View style={commonStyles.container}>
      <AnimatedImage />
      <AnimatedOverlay />

      {isButtonVisiable && (
        <TouchableOpacity
          onPress={() => handleTouch(updateAccessToken)}
          style={commonStyles.center}
        >
          <AnimatedButton />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Page;
