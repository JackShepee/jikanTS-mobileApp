import { RouteProp, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../lib/types";
import { useEffect, useState } from "react";
import { Anime, AnimeCharacter, JikanResponse } from "@tutkli/jikan-ts";
import { jikanClient } from "../lib/jikan";
import { Ionicons } from "@expo/vector-icons";

interface State {
  characterData: AnimeCharacter[];
}

const AnimeDetails = () => {
  const [animeDetails, setAnimeDetails] = useState<Anime>();
  const [animeCharacter, setAnimeCharacter] = useState<State>({
    characterData: [],
  });
  const route = useRoute<RouteProp<RootStackParamList, "AnimeDetails">>();
  const animeId = route.params.mal_id;

  useEffect(() => {
    const fetchAnimeById = async () => {
      await jikanClient.anime
        .getAnimeFullById(animeId)
        .then((response: JikanResponse<Anime>) => {
          setAnimeDetails(response.data);
        })
        .catch((error) => console.error(error));
    };

    const fetchAnimeCharacters = async () => {
      await jikanClient.anime
        .getAnimeCharacters(animeId)
        .then((response: JikanResponse<AnimeCharacter[]>) => {
          setAnimeCharacter({ characterData: response.data });
        })
        .catch((error) => console.error(error));
    };

    fetchAnimeById();
    fetchAnimeCharacters();
  }, []);

  const renderCharacter = ({ item }: { item: AnimeCharacter }) => (
    <View style={styles.characterContainer}>
      {item.role === "Main" && (
        <View>
          <Image
            source={{ uri: item.character.images.jpg.image_url }}
            style={styles.characterImage}
          />
          <Text style={styles.characterName}>{item.character.name}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {animeDetails?.images.jpg.large_image_url && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: animeDetails.images.jpg.large_image_url }}
            style={styles.image}
          />
          <Text style={styles.title}>{animeDetails.title}</Text>
          <Text style={styles.textScore}>
            <Ionicons name="star" size={16} color="#FFC107" />
            &nbsp;
            {animeDetails?.score}
          </Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Synopsis:</Text>
        <Text style={styles.text}>{animeDetails?.synopsis}</Text>
        <Text style={styles.heading}>Type:</Text>
        <Text style={styles.text}>{animeDetails?.type}</Text>
        <Text style={styles.heading}>Genres:</Text>
        <Text style={styles.text}>
          {animeDetails?.genres.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={styles.heading}>Rating:</Text>
        <Text style={styles.text}>{animeDetails?.rating}</Text>
        <Text style={styles.heading}>Episodes:</Text>
        <Text style={styles.text}>{animeDetails?.episodes}</Text>
        <Text style={styles.heading}>Duration:</Text>
        <Text style={styles.text}>{animeDetails?.duration}</Text>
      </View>
      <View style={styles.characterListContainer}>
        <Text style={styles.characterListTitle}>Characters</Text>
        <FlatList
          data={animeCharacter.characterData}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.character.mal_id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.characterList}
        />
      </View>
    </ScrollView>
  );
};

export default AnimeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    margin: 0,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#90caf9",
    marginTop: 15,
    textAlign: "center",
  },
  detailsContainer: {
    margin: 0,
    backgroundColor: "#1E1E1E",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  textScore: {
    fontSize: 16,
    marginBottom: 0,
    marginTop: 5,
    color: "#fff",
    textAlign: "center",
  },
  characterListContainer: {
    margin: 0,
  },
  characterListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    color: "#fff",
  },
  characterList: {
    paddingVertical: 10,
    gap: 10,
  },
  characterContainer: {
    margin: 0,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    maxWidth: 100,
  },
  characterImage: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    marginBottom: 8,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 3,
    alignSelf: "flex-start",
  },
  characterName: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});
