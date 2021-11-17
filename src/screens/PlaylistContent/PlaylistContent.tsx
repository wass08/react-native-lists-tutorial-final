import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-rn";
import { RouteParams } from "~/navigation/RootNavigator";
import { Playlist } from "~/types/Playlist";

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

  return (
    <SafeAreaView style={tailwind("flex h-full justify-center items-center")}>
      {playlist ? (
        <Text>{playlist.name}</Text>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </SafeAreaView>
  );
};
