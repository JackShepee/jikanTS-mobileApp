import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationButtonsProps {
  currPage: number;
  setCurrPage: (page: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currPage,
  setCurrPage,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, currPage === 1 ? styles.disabledButton : null]}
        disabled={currPage === 1}
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

const styles = StyleSheet.create({
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
  disabledButton: {
    backgroundColor: "#999",
    opacity: 0.5,
  },
});

export default PaginationButtons;
