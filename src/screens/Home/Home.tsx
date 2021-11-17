import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tailwind } from "tailwind";
import { Button } from "~/components/Button";
import { TrackItem } from "~/components/TrackItem";
import { RouteParams } from "~/navigation/RootNavigator";
import { Playlist } from "~/types/Playlist";
import { Track } from "~/types/Track";

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

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<Playlist>;
  }) => {
    return (
      <View style={tailwind("bg-gray-200 px-5 py-3")}>
        <Text style={tailwind("font-bold")}>{section.title}</Text>
      </View>
    );
  };

  const renderTrackItem: ListRenderItem<Track> = ({ item }) => (
    <TrackItem track={item} type="small" />
  );

  const renderItem: SectionListRenderItem<Playlist> = ({ item }) => {
    return (
      <>
        <FlatList
          horizontal
          data={item.tracks}
          renderItem={renderTrackItem}
          keyExtractor={(track) => track.name}
        />
        <Button
          onPress={() => navigation.navigate("Playlist", { id: item.id })}
        >
          Voir plus...
        </Button>
      </>
    );
  };

  return (
    <SafeAreaView style={tailwind("flex h-full justify-center items-center")}>
      {playlists ? (
        <SectionList
          style={tailwind("w-full h-full")}
          sections={playlists.map((playlist) => {
            return {
              title: playlist.name,
              data: [playlist],
            };
          })}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        />
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </SafeAreaView>
  );
};
