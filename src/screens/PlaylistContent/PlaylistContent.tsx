import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-rn";
import { TrackItem } from "~/components/TrackItem";
import { RouteParams } from "~/navigation/RootNavigator";
import { Playlist } from "~/types/Playlist";
import { Track } from "~/types/Track";

export const PlaylistContent: React.FunctionComponent = () => {
  const [playlist, setPlaylist] = useState<Playlist>();

  const route = useRoute<RouteProp<RouteParams, "Playlist">>();
  const playlistId = route.params?.id || "37i9dQZF1DXe5W6diBL5N4";
  useEffect(() => {
    axios
      .get<Playlist>(
        `https://www.wawasensei.dev/api/spotify/playlistContent?playlist_id=${playlistId}`
      )
      .then((response) => {
        setPlaylist(response.data);
      });
  }, []);

  const renderItem: ListRenderItem<Track> = ({ item }) => {
    return <TrackItem track={item} />;
  };

  return (
    <SafeAreaView style={tailwind("flex h-full justify-center items-center")}>
      {playlist ? (
        <FlatList
          data={playlist.tracks}
          renderItem={renderItem}
          style={tailwind("w-full")}
          numColumns={2}
          contentContainerStyle={tailwind("flex")}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={() => (
            <View style={tailwind("h-px bg-gray-200 my-4")} />
          )}
          ListHeaderComponent={() => (
            <View style={tailwind("flex items-center p-4")}>
              <Text style={tailwind("text-lg font-bold")}>{playlist.name}</Text>
              <Text style={tailwind("text-gray-500")}>
                {playlist.description}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={tailwind("flex justify-center items-center")}>
              <Text>Pas de musiques trouvées</Text>
            </View>
          )}
          onRefresh={() => {
            console.log("refetch music");
          }}
          refreshing={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log("load more");
          }}
        />
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </SafeAreaView>
  );
};
