import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { jikanClient } from "../lib/jikan";
import {
  JikanResponse,
  Anime,
  JikanSeasonsParams,
  AnimeType,
} from "@tutkli/jikan-ts";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import type { RootStackParamList } from "../lib/types";
import PaginationButtons from "./utils/PaginationButtons";

interface State {
  animeList: Anime[];
}

const Seasons = () => {
  const [loading, setLoading] = useState(false);
  const [anime, setAnimeList] = useState<State>({ animeList: [] });
  const [currPage, setCurrPage] = useState<number>(1);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const numColumns = 2;
  const { tv } = AnimeType;

  const searchParams: JikanSeasonsParams = {
    page: currPage,
    limit: 24,
    filter: tv,
  };

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      await jikanClient.seasons
        .getSeasonNow(searchParams)
        .then((response: JikanResponse<Anime[]>) => {
          setAnimeList({ animeList: response.data });
          setLoading(false);
        })
        .catch((error) => console.error(error));
      setLoading(false);
    };

    fetchAnimeList();
  }, [currPage]);

  const renderAnimeItem = ({ item }: { item: Anime }) => (
    <TouchableOpacity
      style={[styles.item, { width: `${100 / numColumns}%` }]}
      onPress={() => {
        navigation.navigate("AnimeDetails", { mal_id: item.mal_id });
      }}
    >
      <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleAnime} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Current Season Airing List:</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={anime.animeList}
          key={numColumns}
          numColumns={numColumns}
          renderItem={renderAnimeItem}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={
            <PaginationButtons currPage={currPage} setCurrPage={setCurrPage} />
          }
        />
      )}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
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
    height: 300,
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
