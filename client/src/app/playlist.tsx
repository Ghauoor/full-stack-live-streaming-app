import Interactions from "@/components/playlist/Interactions";
import PlaylistHeader from "@/components/playlist/PlaylistHeader";
import VideoPlayer from "@/components/playlist/VideoPlayer";
import { Anime } from "@/service/animeStore";
import { commonStyles } from "@/styles/commonStyles";
import { splashStyles } from "@/styles/splashStyles";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Image, View } from "react-native";

const Page = () => {
  const route = useRoute() as any;
  const item = route?.params as Anime;

  return (
    <View style={commonStyles.containerBlack}>
      <PlaylistHeader title={item.title} genre={item.genre} />
      <VideoPlayer item={item} />
      <Interactions item={item} key={item._id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
