import COLORS from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// Screen padding: 20 left + 20 right
// Gap between 5 items: 12 * 4 = 48
const CATEGORY_SIZE = (width - 40 - 48) / 5;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
  },

  seeAll: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.black,
  },

  categoryList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  categoryButton: {
    width: CATEGORY_SIZE,
    height: CATEGORY_SIZE + 2,
    borderRadius: 19,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  categoryText: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },

  icon: {
    width: 30,
    height: 30,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 30,

    minHeight: "70%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 20,
  },

  modalHandle: {
    width: 45,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 24,
    textAlign: "center",
    color: COLORS.black,
    fontFamily: "Poppins_700Bold",
    marginBottom: 22,
  },

  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    fontFamily: "Poppins_400Regular",
  },

  closeButton: {
    marginTop: 12,
    alignSelf: "center",

    backgroundColor: COLORS.primary,

    paddingHorizontal: 40,
    paddingVertical: 14,

    borderRadius: 100,
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  plantName: {
    color: "#FFF",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },

  scientificName: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    marginTop: 2,
  },

  plantItem: {
    height: 190,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,

    backgroundColor: "#EEE",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  plantImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  bookmarkButton: {
      position: "absolute",
      top: 12,
      right: 12,

      width: 38,
      height: 38,
      borderRadius: 19,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "rgba(0,0,0,0.35)",

      zIndex: 5,
  },
});

export default styles;