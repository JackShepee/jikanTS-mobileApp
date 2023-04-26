import { Anime, JikanResponse, JikanTopParams } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { jikanClient } from "../lib/jikan";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import type { RootStackParamList } from "../lib/types";
import PaginationButtons from "./utils/PaginationButtons";

interface State {
  topAnime: Anime[];
}

const TopAnime = () => {
  const [loading, setLoading] = useState(false);
  const [topAnimeList, setTopAnimeList] = useState<State>({ topAnime: [] });
  const [currPage, setCurrPage] = useState<number>(1);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const searchParams: JikanTopParams = {
    page: currPage,
    limit: 25,
  };

  useEffect(() => {
    const fetchTopAnime = async () => {
      setLoading(true);
      await jikanClient.top
        .getTopAnime(searchParams)
        .then((response: JikanResponse<Anime[]>) => {
          setTopAnimeList({ topAnime: response.data });
          setLoading(false);
        })
        .catch((error) => console.error(error));
      setLoading(false);
    };

    fetchTopAnime();
  }, [currPage]);

  const renderTopAnime = ({ item }: { item: Anime }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("AnimeDetails", { mal_id: item.mal_id });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images.jpg.image_url }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.rankText}>{item.rank}</Text>
        </View>
        <View style={styles.middleColumn}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.mutedText}>
            {item.type}
            {"\n"}
            {item.rating}
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.scoreContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.scoreText}>{item.score.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Anime List:</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={topAnimeList.topAnime}
          key={currPage}
          numColumns={1}
          renderItem={renderTopAnime}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            <PaginationButtons currPage={currPage} setCurrPage={setCurrPage} />
          }
        />
      )}
    </View>
  );
};

export default TopAnime;

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
  list: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
    flexDirection: "row",
  },
  imageContainer: {
    width: "25%",
    marginRight: 5,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 150,
    borderRadius: 5,
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  leftColumn: {
    width: "15%",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "bold",
    color: "#90caf9",
    fontSize: 18,
  },
  middleColumn: {
    width: "55%",
  },
  titleText: {
    fontWeight: "bold",
    color: "#90caf9",
    fontSize: 16,
  },
  mutedText: {
    color: "grey",
    fontSize: 12,
  },
  rightColumn: {
    width: "30%",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    color: "#FFC107",
    marginLeft: 5,
    fontSize: 16,
  },
});
