import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { jikanClient } from "../lib/jikan";
import { JikanResponse, Anime } from "@tutkli/jikan-ts";

interface State {
  animeList: Anime[];
}

const Seasons: React.FC = () => {
  const [anime, setAnimeList] = useState<State>({ animeList: [] });
  const numColumns = 3;

  useEffect(() => {
    const fetchAnimeList = async () => {
      await jikanClient.seasons
        .getSeasonNow()
        .then((response: JikanResponse<Anime[]>) => {
          setAnimeList({ animeList: response.data });
        })
        .catch((error) => console.error(error));
    };

    fetchAnimeList();
  }, []);

  const renderAnimeItem = ({ item }: { item: Anime }) => (
    <View style={[styles.item, { width: `${100 / numColumns}%` }]}>
      <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleAnime} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Current Season Airing List:</Text>
      </View>
      <FlatList
        data={anime.animeList}
        key={numColumns}
        numColumns={numColumns}
        renderItem={renderAnimeItem}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default Seasons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  item: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 5,
    marginVertical: 5,
  },
  list: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    flexWrap: "wrap",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  titleAnime: {
    color: "white",
    textAlign: "center",
  },
});
