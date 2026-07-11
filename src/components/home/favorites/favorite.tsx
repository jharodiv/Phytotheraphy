import Footer from "@components/home/footer/footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import styles from "@components/home/favorites/favorites.style";
import { plantImages } from "@images/plants/plantImages";
import { db } from "../../../../firebaseConfig";

type Plant = {
    id: string;
    commonName: string;
    scientificName: string;
    favorite: boolean;
};

const { width, height } = Dimensions.get("window");

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState<Plant[]>([]);


    const toggleFavorite = async (plant: Plant) => {
    try {
        const plantRef = doc(db, "plants", plant.id);

        await Haptics.selectionAsync();

        await updateDoc(plantRef, {
            favorite: !plant.favorite,
        });

        if (plant.favorite) {
            // Remove it immediately from the favorites screen
            setFavorites((prev) =>
                prev.filter((p) => p.id !== plant.id)
            );
        } else {
            // Update local state
            setFavorites((prev) =>
                prev.map((p) =>
                    p.id === plant.id
                        ? { ...p, favorite: true }
                        : p
                )
            );
        }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const q = query(
                    collection(db, "plants"),
                    where("favorite", "==", true)
                );

                const snapshot = await getDocs(q);

                const plants = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Plant[];

                setFavorites(plants);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Decorative background leaf */}
            <MaterialCommunityIcons
                name="leaf"
                size={Math.max(width, height) * 0.7}
                color="#2E7D32"
                style={styles.backgroundLeaf}
            />

            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() => router.replace("/(tabs)")}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="#2E7D32"
                    />
                </TouchableOpacity>

                <Text style={styles.header}>
                    Favorite Plants
                </Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No favorite plants yet
                        </Text>

                        <Text style={styles.emptySubtitle}>
                            Tap the bookmark icon on a plant to save it here.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.plantItem}
                        activeOpacity={0.85}
                    >
                        <Image
                            source={plantImages[item.id]}
                            style={styles.plantImage}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={styles.bookmarkContainer}
                            activeOpacity={0.8}
                            onPress={() => toggleFavorite(item)}
                        >
                            <MaterialCommunityIcons
                                name={item.favorite ? "bookmark" : "bookmark-outline"}
                                size={22}
                                color={item.favorite ? "#FFD54F" : "#FFFFFF"}
                            />
                        </TouchableOpacity>
                        <LinearGradient
                            colors={[
                                "transparent",
                                "rgba(0,0,0,0.25)",
                                "rgba(0,0,0,0.9)",
                            ]}
                            style={styles.gradient}
                        >
                            <Text style={styles.plantName}>
                                {item.commonName}
                            </Text>

                            <Text style={styles.scientificName}>
                                {item.scientificName}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />

            <Footer />
        </SafeAreaView>
    );
};

export default FavoritesScreen;