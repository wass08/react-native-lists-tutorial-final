import React from "react";
import { Image, Text, View } from "react-native";
import { tailwind } from "tailwind";
import { Track } from "~/types/Track";

interface TrackItemProps {
  track: Track;
  type?: "normal" | "small";
}

export const TrackItem: React.FunctionComponent<TrackItemProps> = ({
  track,
  type = "normal",
}) => {
  return (
    <View
      style={tailwind(
        `items-center p-4 flex-1 ${type === "small" ? "w-32" : ""}`
      )}
    >
      <Image
        source={{ uri: track.cover }}
        style={tailwind(
          `${type === "normal" ? "w-40 h-40" : "w-20 h-20"} rounded`
        )}
      />
      <View style={tailwind(`flex-grow ${type === "normal" ? "p-4" : "pt-2"}`)}>
        <Text style={tailwind("font-bold text-center")} numberOfLines={1}>
          {track.name}
        </Text>
        <Text style={tailwind("text-gray-500 text-center")} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
    </View>
  );
};
