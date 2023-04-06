import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { jikanClient } from "../lib/jikan";
import { JikanTopParams } from "@tutkli/jikan-ts";
import { Ionicons } from "@expo/vector-icons";

interface State {
  topAnime: Anime[];
}

const TopAnime = () => {
  const [topAnimeList, setTopAnimeList] = useState<State>({ topAnime: [] });
  const [currPage, setCurrPage] = useState<number>(1);

  const searchParams: JikanTopParams = {
    page: currPage,
    limit: 25,
  };

  useEffect(() => {
    const fetchTopAnime = async () => {
      await jikanClient.top
        .getTopAnime(searchParams)
        .then((response: JikanResponse<Anime[]>) => {
          setTopAnimeList({ topAnime: response.data });
        })
        .catch((error) => console.error(error));
    };

    fetchTopAnime();
  }, [currPage]);

  const renderTopAnime = ({ item }: { item: Anime }) => (
    <View style={styles.item}>
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
    </View>
  );

  const PaginationButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrPage(currPage === 1 ? currPage : currPage - 1)}
        >
          <Text style={styles.buttonText}> &#8592; Prev Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrPage(currPage + 1)}
        >
          <Text style={styles.buttonText}>Next Page &#8594;</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Anime List:</Text>
      </View>
      <FlatList
        data={topAnimeList.topAnime}
        key={currPage}
        numColumns={1}
        renderItem={renderTopAnime}
        contentContainerStyle={styles.list}
        ListFooterComponent={<PaginationButtons />}
      />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#414052",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
    width: "30%",
    marginRight: 10,
  },
  image: {
    width: "100%",
    resizeMode: "center",
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
