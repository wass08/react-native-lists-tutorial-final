import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tailwind } from "tailwind";
import { Button } from "~/components/Button";
import { RouteParams } from "~/navigation/RootNavigator";
import { Playlist } from "~/types/Playlist";

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = ({}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>();
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  useEffect(() => {
    axios
      .get<Playlist[]>(`https://www.wawasensei.dev/api/spotify/homePlaylists`)
      .then((response) => {
        setPlaylists(response.data);
      });
  }, []);
  return (
    <SafeAreaView
      style={tailwind("flex h-full justify-center items-center p-6")}
    >
      {playlists ? (
        playlists.map((playlist) => (
          <View key={playlist.id} style={tailwind("w-full py-4")}>
            <Text>{playlist.name}</Text>
            <Button
              onPress={() =>
                navigation.navigate("Playlist", { id: playlist.id })
              }
            >
              Ouvrir
            </Button>
          </View>
        ))
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </SafeAreaView>
  );
};
